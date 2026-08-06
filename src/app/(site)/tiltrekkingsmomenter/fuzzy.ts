// Enkel fuzzy-matching: tolererer skrivefeil (Levenshtein) og fanger opp
// vanlige alternative/engelske betegnelser via et synonymoppslag.

const SYNONYM_GROUPS: string[][] = [
    ['clutch', 'kopling', 'klotsj', 'kløtsj'],
    ['eksos', 'exhaust', 'potte', 'lyddemper', 'katalysator', 'cat'],
    ['brems', 'bremse', 'bremser', 'brake', 'brakes'],
    ['hjul', 'felg', 'dekk', 'wheel', 'tire', 'tyre'],
    ['styring', 'ratt', 'steering', 'rattstamme'],
    ['motor', 'engine'],
    ['gir', 'girkasse', 'gearbox', 'transmission', 'clutch'],
    ['fjæring', 'oppheng', 'suspension', 'fjærbein', 'støtdemper', 'demper', 'shock'],
    ['tennplugg', 'tennplugger', 'sparkplug', 'spark', 'plugg'],
    ['kjøling', 'kjølevæske', 'cooling', 'kjølevann', 'radiator', 'termostat', 'thermostat'],
    ['drivstoff', 'bensin', 'fuel', 'tank', 'diesel'],
    ['karosseri', 'body', 'dør', 'door', 'sete', 'seat'],
    ['nav', 'hub', 'hjulnav'],
    ['generator', 'alternator', 'dynamo'],
    ['pakning', 'gasket', 'tetning', 'seal'],
];

const normalize = (s: string): string =>
    s
        .toLowerCase()
        .replace(/æ/g, 'ae')
        .replace(/ø/g, 'o')
        .replace(/å/g, 'a')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

const SYNONYM_LOOKUP: Map<string, string[]> = new Map();
for (const group of SYNONYM_GROUPS) {
    const normalizedGroup = group.map(normalize);
    for (const word of normalizedGroup) {
        SYNONYM_LOOKUP.set(word, normalizedGroup);
    }
}

function levenshtein(a: string, b: string): number {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = new Array(n + 1);
    for (let j = 0; j <= n; j++) dp[j] = j;
    for (let i = 1; i <= m; i++) {
        let prev = dp[0];
        dp[0] = i;
        for (let j = 1; j <= n; j++) {
            const tmp = dp[j];
            dp[j] = a[i - 1] === b[j - 1]
                ? prev
                : 1 + Math.min(prev, dp[j], dp[j - 1]);
            prev = tmp;
        }
    }
    return dp[n];
}

function expandWords(words: string[]): string[] {
    const out = new Set<string>();
    for (const w of words) {
        out.add(w);
        const synonyms = SYNONYM_LOOKUP.get(w);
        if (synonyms) synonyms.forEach((s) => out.add(s));
    }
    return Array.from(out);
}

function tokenMatchesCorpus(token: string, corpusWords: string[]): boolean {
    if (!token) return true;
    for (const w of corpusWords) {
        if (w.includes(token) || token.includes(w)) return true;
        const maxLen = Math.max(w.length, token.length);
        if (maxLen < 3) continue;
        const tolerance = maxLen <= 4 ? 1 : maxLen <= 7 ? 2 : 3;
        if (levenshtein(token, w) <= tolerance) return true;
    }
    return false;
}

export function buildCorpus(text: string): string[] {
    return expandWords(normalize(text).split(' ').filter(Boolean));
}

export function fuzzyMatch(query: string, corpus: string[]): boolean {
    const tokens = normalize(query).split(' ').filter(Boolean);
    if (tokens.length === 0) return true;
    return tokens.every((t) => tokenMatchesCorpus(t, corpus));
}
