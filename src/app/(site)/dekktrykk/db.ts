import type { Reading } from './types'

const DB_NAME = 'bzero-dekktrykk'
const DB_VERSION = 1
const READINGS_STORE = 'readings'
const TRACKS_STORE = 'tracks'

// Norske, svenske og danske racerbaner — holdes i sync med TRACK_COORDS i weather.ts
const DEFAULT_TRACKS = [
  // Norge
  'Arctic Circle Raceway',
  'Motorcenter Norway',
  'Rudskogen',
  'Vålerbanen',
  'Lånkebanen',
  // Sverige
  'Anderstorp Raceway',
  'Falkenbergs Motorbana',
  'Karlskoga Motorstadion',
  'Kinnekulle Ring',
  'Ljungbyheds Motorbana',
  'Mantorp Park',
  'Mittsverigebanan',
  'Ring Knutstorp',
  'Drivecenter Arena',
  'Sturup Raceway',
  'Tierp Arena',
  // Danmark
  'Jyllandsringen',
  'Padborg Park',
  'Ring Djursland',
]

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)

    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(READINGS_STORE)) {
        const store = db.createObjectStore(READINGS_STORE, { keyPath: 'id' })
        store.createIndex('timestamp', 'timestamp')
      }
      if (!db.objectStoreNames.contains(TRACKS_STORE)) {
        db.createObjectStore(TRACKS_STORE, { keyPath: 'name' })
      }
    }

    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function seedDefaultTracks(db: IDBDatabase) {
  const tx = db.transaction(TRACKS_STORE, 'readwrite')
  const store = tx.objectStore(TRACKS_STORE)
  for (const name of DEFAULT_TRACKS) {
    store.put({ name })
  }
  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

// Seeds default tracks once per app load (put() upserts, so this never duplicates or
// overwrites user-added tracks — it just guarantees the predefined list is always present,
// including for installs from before a track was added to DEFAULT_TRACKS).
let seeded = false
async function withSeed(db: IDBDatabase) {
  if (seeded) return db
  await seedDefaultTracks(db)
  seeded = true
  return db
}

export async function getAllReadings(): Promise<Reading[]> {
  const db = await withSeed(await openDb())
  return new Promise((resolve, reject) => {
    const tx = db.transaction(READINGS_STORE, 'readonly')
    const req = tx.objectStore(READINGS_STORE).getAll()
    req.onsuccess = () => {
      const rows = (req.result as Reading[]).sort((a, b) => b.timestamp - a.timestamp)
      resolve(rows)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function saveReading(reading: Reading): Promise<void> {
  const db = await withSeed(await openDb())
  const tx = db.transaction([READINGS_STORE, TRACKS_STORE], 'readwrite')
  tx.objectStore(READINGS_STORE).put(reading)
  tx.objectStore(TRACKS_STORE).put({ name: reading.track })
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function deleteReading(id: string): Promise<void> {
  const db = await withSeed(await openDb())
  const tx = db.transaction(READINGS_STORE, 'readwrite')
  tx.objectStore(READINGS_STORE).delete(id)
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getTracks(): Promise<string[]> {
  const db = await withSeed(await openDb())
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TRACKS_STORE, 'readonly')
    const req = tx.objectStore(TRACKS_STORE).getAll()
    req.onsuccess = () => resolve((req.result as { name: string }[]).map((r) => r.name))
    req.onerror = () => reject(req.error)
  })
}

export async function getLastTrack(): Promise<string | null> {
  const readings = await getAllReadings()
  return readings[0]?.track ?? null
}

/** Import readings, skipping any whose id already exists. Returns counts. */
export async function importReadings(rows: Reading[]): Promise<{ imported: number; skipped: number }> {
  const db = await withSeed(await openDb())
  const existing = await getAllReadings()
  const existingIds = new Set(existing.map((r) => r.id))

  let imported = 0
  let skipped = 0
  const tx = db.transaction([READINGS_STORE, TRACKS_STORE], 'readwrite')
  const readingsStore = tx.objectStore(READINGS_STORE)
  const tracksStore = tx.objectStore(TRACKS_STORE)

  for (const row of rows) {
    if (existingIds.has(row.id)) {
      skipped++
      continue
    }
    readingsStore.put(row)
    tracksStore.put({ name: row.track })
    existingIds.add(row.id)
    imported++
  }

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve({ imported, skipped })
    tx.onerror = () => reject(tx.error)
  })
}
