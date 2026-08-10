'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// ---------- Hjelpere ----------
const num = (v: string) => {
    const n = parseFloat(String(v).replace(',', '.'));
    return isNaN(n) ? 0 : n;
};
const deg = (r: number) => (r * 180) / Math.PI;
const rad = (d: number) => (d * Math.PI) / 180;
const fmt = (v: number, dec = 2) =>
    (v >= 0 ? '+' : '') + v.toFixed(dec).replace('.', ',');

type BoltKey = 'FO' | 'BO' | 'FN' | 'BN';
type Bolts = Record<BoltKey, string>;
type BoltsNum = Record<BoltKey, number>;

const inputClass =
    'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:border-brand-red';
const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5';
const cardClass = 'bg-white rounded-lg shadow-sm border border-slate-200 p-6';
const sectionTitleClass = 'font-conthrax uppercase tracking-wider text-lg text-slate-900 border-b-2 border-slate-200 pb-3 mb-6';

// Input med ±-knapp foran — for felt som ofte trenger negative tall
// (mobiltastatur har ofte ikke "-" på num/decimal-tastatur).
function SignedInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const toggleSign = () => {
        const trimmed = value.trim();
        if (trimmed.startsWith('-')) onChange(trimmed.slice(1));
        else if (trimmed === '' || trimmed === '0') onChange('-' + (trimmed || '0'));
        else onChange('-' + trimmed);
    };
    return (
        <div className="flex gap-1.5">
            <button
                type="button"
                onClick={toggleSign}
                aria-label="Bytt fortegn"
                className="shrink-0 w-9 rounded-md border border-slate-300 bg-slate-100 text-slate-700 font-conthrax text-sm hover:bg-slate-200 active:bg-slate-300"
            >
                ±
            </button>
            <input
                className={inputClass}
                inputMode="decimal"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

function tabBtnClass(active: boolean) {
    return `flex-1 px-4 py-2.5 font-conthrax text-xs uppercase tracking-wider rounded-md border transition-colors ${
        active
            ? 'bg-slate-900 text-white border-slate-900'
            : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
    }`;
}

// ---------- Boltdiagram (sett fra hjulsiden, venstre bakhjul, trapesform) ----------
function BoltDiagram({ shims, onChange }: { shims: Bolts; onChange: (k: BoltKey, v: string) => void }) {
    // Oppe smalere, nede bredere — matcher typisk twist-beam flens.
    const pos: Record<BoltKey, { x: number; y: number }> = {
        FO: { x: 80, y: 50 },
        BO: { x: 180, y: 50 },
        FN: { x: 95, y: 170 },
        BN: { x: 165, y: 170 },
    };
    return (
        <div className="max-w-xs mx-auto">
            <svg viewBox="0 0 260 240" className="w-full block">
                <polygon points="50,30 210,30 190,190 70,190" fill="#f1f5f9" stroke="#1e293b" strokeWidth="2" />
                <circle cx="130" cy="110" r="34" fill="#fff" stroke="#1e293b" strokeWidth="2" />
                <circle cx="130" cy="110" r="5" fill="#1e293b" />
                {/* målelinje H oppe */}
                <line x1="65" y1="18" x2="195" y2="18" stroke="#FF1E00" strokeWidth="1.5" />
                <line x1="65" y1="12" x2="65" y2="24" stroke="#FF1E00" strokeWidth="1.5" />
                <line x1="195" y1="12" x2="195" y2="24" stroke="#FF1E00" strokeWidth="1.5" />
                <text x="130" y="10" textAnchor="middle" fontSize="9" fill="#FF1E00">H oppe</text>
                {/* målelinje H nede */}
                <line x1="85" y1="222" x2="175" y2="222" stroke="#FF1E00" strokeWidth="1.5" />
                <line x1="85" y1="216" x2="85" y2="228" stroke="#FF1E00" strokeWidth="1.5" />
                <line x1="175" y1="216" x2="175" y2="228" stroke="#FF1E00" strokeWidth="1.5" />
                <text x="130" y="236" textAnchor="middle" fontSize="9" fill="#FF1E00">H nede</text>
                {/* målelinje V */}
                <line x1="228" y1="50" x2="228" y2="170" stroke="#FF1E00" strokeWidth="1.5" />
                <line x1="222" y1="50" x2="234" y2="50" stroke="#FF1E00" strokeWidth="1.5" />
                <line x1="222" y1="170" x2="234" y2="170" stroke="#FF1E00" strokeWidth="1.5" />
                <text x="242" y="115" textAnchor="middle" fontSize="9" fill="#FF1E00" transform="rotate(90 242 115)">V (mm)</text>
                {(Object.entries(pos) as [BoltKey, { x: number; y: number }][]).map(([k, p]) => (
                    <g key={k}>
                        <circle cx={p.x} cy={p.y} r="11" fill="#fff" stroke="#1e293b" strokeWidth="2" />
                        <circle cx={p.x} cy={p.y} r="4" fill="#FF1E00" />
                    </g>
                ))}
                <text x="20" y="60" textAnchor="middle" fontSize="12" fill="#64748b">←</text>
                <text x="16" y="130" textAnchor="middle" fontSize="9" fill="#64748b" transform="rotate(90 16 130)">FORAN (kjøreretning)</text>
            </svg>
            <div className="grid grid-cols-2 gap-3 mt-4">
                {(
                    [
                        ['FO', 'Foran-oppe'],
                        ['BO', 'Bak-oppe'],
                        ['FN', 'Foran-nede'],
                        ['BN', 'Bak-nede'],
                    ] as [BoltKey, string][]
                ).map(([k, lbl]) => (
                    <div key={k}>
                        <label className={labelClass}>{lbl} (mm)</label>
                        <input
                            className={inputClass}
                            inputMode="decimal"
                            value={shims[k]}
                            onChange={(e) => onChange(k, e.target.value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ---------- Hoved-app ----------
export default function ShimCalculator() {
    const [mode, setMode] = useState<'frem' | 'tilbake'>('frem');

    // geometri (trapes: ulik boltbredde oppe og nede)
    const [Ho, setHo] = useState('80'); // boltavstand oppe
    const [Hn, setHn] = useState('71'); // boltavstand nede
    const [V, setV] = useState('52'); // vertikal avstand mellom radene

    // dekk
    const [bredde, setBredde] = useState('155');
    const [profil, setProfil] = useState('55');
    const [felg, setFelg] = useState('14');

    // frem-modus: shims per bolt
    const [shims, setShims] = useState<Bolts>({ FO: '0', BO: '0', FN: '0', BN: '0' });

    // tilbake-modus
    const [toeEnhet, setToeEnhet] = useState<'deg' | 'mm'>('mm');
    const [maltToe, setMaltToe] = useState('0');
    const [malToe, setMalToe] = useState('1');
    const [maltCamber, setMaltCamber] = useState('0');
    const [malCamber, setMalCamber] = useState('-2');
    const [dagensShims, setDagensShims] = useState<Bolts>({ FO: '0', BO: '0', FN: '0', BN: '0' });

    const hjulDia = useMemo(() => {
        return num(felg) * 25.4 + 2 * num(bredde) * (num(profil) / 100);
    }, [bredde, profil, felg]);
    const felgDia = num(felg) * 25.4;

    // ---- FREM: shims → vinkler (plan-modell, trapes-mønster) ----
    const frem = useMemo(() => {
        const ho = num(Ho), hn = num(Hn), v = num(V);
        if (ho <= 0 || hn <= 0 || v <= 0) return null;
        const fo = num(shims.FO), bo = num(shims.BO), fn = num(shims.FN), bn = num(shims.BN);
        // Toe-helning per rad: slope = (foran − bak) / radbredde
        const bTop = (fo - bo) / ho;
        const bBot = (fn - bn) / hn;
        const b = (bTop + bBot) / 2; // felles plan-helning (snitt av radene)
        const oppeAvg = (fo + bo) / 2;
        const nedeAvg = (fn + bn) / 2;
        const c = (oppeAvg - nedeAvg) / v;
        const toeDeg = deg(Math.atan(b));
        const camberDeg = deg(Math.atan(c));
        const toeMmFelg = Math.tan(rad(toeDeg)) * felgDia;
        const toeMmDekk = Math.tan(rad(toeDeg)) * hjulDia;
        // Planhetssjekk: radene må gi SAMME toe-vinkel, ellers vris flensen
        const twistDeg = deg(Math.atan(bTop)) - deg(Math.atan(bBot));
        const minShim = Math.min(fo, bo, fn, bn);
        return { toeDeg, camberDeg, toeMmFelg, toeMmDekk, twistDeg, minShim };
    }, [Ho, Hn, V, shims, felgDia, hjulDia]);

    // ---- TILBAKE: målt + ønsket → shim-oppskrift (plan-modell) ----
    const tilbake = useMemo(() => {
        const ho = num(Ho), hn = num(Hn), v = num(V);
        if (ho <= 0 || hn <= 0 || v <= 0 || felgDia <= 0) return null;
        const deltaToe = num(malToe) - num(maltToe);
        const toeDeg = toeEnhet === 'deg' ? deltaToe : deg(Math.atan(deltaToe / felgDia));
        const toeMm = Math.tan(rad(toeDeg)) * felgDia;
        const camDeg = num(malCamber) - num(maltCamber);
        const bDelta = Math.tan(rad(toeDeg));
        const cDelta = Math.tan(rad(camDeg));
        const dFO = num(dagensShims.FO), dBO = num(dagensShims.BO),
            dFN = num(dagensShims.FN), dBN = num(dagensShims.BN);
        const bDagens = ((dFO - dBO) / ho + (dFN - dBN) / hn) / 2;
        const cDagens = ((dFO + dBO) / 2 - (dFN + dBN) / 2) / v;
        const dagensTwistDeg = deg(Math.atan((dFO - dBO) / ho)) - deg(Math.atan((dFN - dBN) / hn));
        const b = bDagens + bDelta;
        const c = cDagens + cDelta;
        // Boltverdier fra planet: z = b·x + c·y ved hver boltposisjon
        // Oppe: x = ±ho/2, y = +v/2. Nede: x = ±hn/2, y = −v/2.
        const raw: BoltsNum = {
            FO: (b * ho) / 2 + (c * v) / 2,
            BO: (-b * ho) / 2 + (c * v) / 2,
            FN: (b * hn) / 2 - (c * v) / 2,
            BN: (-b * hn) / 2 - (c * v) / 2,
        };
        const minRaw = Math.min(raw.FO, raw.BO, raw.FN, raw.BN);
        const bolter: BoltsNum = {
            FO: Math.round((raw.FO - minRaw) * 10) / 10,
            BO: Math.round((raw.BO - minRaw) * 10) / 10,
            FN: Math.round((raw.FN - minRaw) * 10) / 10,
            BN: Math.round((raw.BN - minRaw) * 10) / 10,
        };
        const bNy = ((bolter.FO - bolter.BO) / ho + (bolter.FN - bolter.BN) / hn) / 2;
        const cNy = ((bolter.FO + bolter.BO) / 2 - (bolter.FN + bolter.BN) / 2) / v;
        const oppnaddToeDeg = deg(Math.atan(bNy)) - deg(Math.atan(bDagens));
        const oppnaddToeMm = Math.tan(rad(oppnaddToeDeg)) * felgDia;
        const oppnaddCamberDeg = deg(Math.atan(cNy)) - deg(Math.atan(cDagens));
        const nyTwistDeg = deg(Math.atan((bolter.FO - bolter.BO) / ho)) - deg(Math.atan((bolter.FN - bolter.BN) / hn));
        const diffOppe = b * ho;
        const diffNede = b * hn;
        const diffV = c * v;
        return {
            toeDeg, diffOppe, diffNede, diffV, bolter,
            oppnaddToeDeg, oppnaddToeMm, oppnaddCamberDeg, nyTwistDeg,
            deltaToeMm: toeMm, deltaToeDeg: toeDeg, deltaCamber: camDeg, dagensTwistDeg,
        };
    }, [Ho, Hn, V, toeEnhet, maltToe, malToe, maltCamber, malCamber, dagensShims, felgDia]);

    const setShim = (k: BoltKey, val: string) => setShims((s) => ({ ...s, [k]: val }));

    return (
        <div className="space-y-8">
            {/* Modusvalg */}
            <div className="flex gap-2 max-w-lg">
                <button className={tabBtnClass(mode === 'frem')} onClick={() => setMode('frem')}>
                    Shims → endring
                </button>
                <button className={tabBtnClass(mode === 'tilbake')} onClick={() => setMode('tilbake')}>
                    Ønsket endring → shims
                </button>
            </div>

            {/* Geometri + dekk */}
            <div className={cardClass}>
                <h2 className={sectionTitleClass}>1 · Geometri og hjul</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className={labelClass}>Boltavstand oppe H (mm)</label>
                        <input className={inputClass} inputMode="decimal" value={Ho} onChange={(e) => setHo(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>Boltavstand nede H (mm)</label>
                        <input className={inputClass} inputMode="decimal" value={Hn} onChange={(e) => setHn(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>Vertikal avstand V (mm)</label>
                        <input className={inputClass} inputMode="decimal" value={V} onChange={(e) => setV(e.target.value)} />
                    </div>
                </div>
                <p className="text-sm text-slate-500 mt-3">
                    Mål senter-til-senter mellom bolthullene. Boltmønsteret er trapes (ulik bredde oppe/nede) —
                    standardmål B-Zero: 80 mm oppe, 71 mm nede, 52 mm mellom radene. V måles mellom radenes senterlinjer.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                        <label className={labelClass}>Dekkbredde</label>
                        <input className={inputClass} inputMode="decimal" value={bredde} onChange={(e) => setBredde(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>Profil (%)</label>
                        <input className={inputClass} inputMode="decimal" value={profil} onChange={(e) => setProfil(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>Felg (tommer)</label>
                        <input className={inputClass} inputMode="decimal" value={felg} onChange={(e) => setFelg(e.target.value)} />
                    </div>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                    Hjuldiameter: <b className="text-slate-700">{hjulDia.toFixed(0)} mm</b> · Felgdiameter:{' '}
                    <b className="text-slate-700">{felgDia.toFixed(0)} mm</b>. Toe i mm avhenger av hvor du måler —
                    kalkulatoren viser begge.
                </p>
            </div>

            {mode === 'frem' ? (
                <>
                    <div className={cardClass}>
                        <h2 className={sectionTitleClass}>2 · Shims per bolt</h2>
                        <BoltDiagram shims={shims} onChange={setShim} />
                    </div>

                    <div className={cardClass}>
                        <h2 className={sectionTitleClass}>3 · Resultat (per hjul)</h2>
                        {frem ? (
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Toe-endring</label>
                                    <div className="font-conthrax text-3xl text-brand-red">{fmt(frem.toeDeg)}°</div>
                                    <p className="text-sm text-slate-500 mt-1">
                                        {fmt(frem.toeMmFelg, 1)} mm på felg · {fmt(frem.toeMmDekk, 1)} mm på dekk
                                        <br />
                                        <b className="text-slate-700">{frem.toeDeg >= 0 ? 'Mer toe-ut' : 'Mer toe-in'}</b>
                                    </p>
                                </div>
                                <div>
                                    <label className={labelClass}>Camber-endring</label>
                                    <div className="font-conthrax text-3xl text-brand-red">{fmt(frem.camberDeg)}°</div>
                                    <p className="text-sm text-slate-500 mt-1">
                                        <b className="text-slate-700">
                                            {frem.camberDeg >= 0 ? 'Mer positiv (topp ut)' : 'Mer negativ (topp inn)'}
                                        </b>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">Fyll inn boltavstander over 0.</p>
                        )}
                        {frem && Math.abs(frem.twistDeg) > 0.03 && (
                            <div className="mt-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 leading-relaxed">
                                <b>⚠ Flensen er ikke i plan!</b> Øvre og nedre boltrad gir ulik toe-vinkel (avvik{' '}
                                {Math.abs(frem.twistDeg).toFixed(2).replace('.', ',')}°). Denne kombinasjonen vrir
                                flensen — juster shimsene til radene gir samme toe.
                            </div>
                        )}
                        {frem && Math.abs(frem.twistDeg) <= 0.03 && frem.minShim > 0 && (
                            <div className="mt-4 rounded-md bg-slate-50 border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-600 leading-relaxed">
                                <b className="text-slate-800">Tips (reglement):</b> minst én bolt skal være uten shims.
                                Trekk {frem.minShim.toFixed(2).replace('.', ',')} mm fra alle fire — vinklene forblir
                                identiske, kun sporvidden endres marginalt.
                            </div>
                        )}
                        <p className="text-sm text-slate-500 mt-4 border-t border-dashed border-slate-200 pt-4">
                            Fortegn: shims på <b className="text-slate-700">foran-boltene</b> gir toe-ut. Shims på{' '}
                            <b className="text-slate-700">oppe-boltene</b> gir mer positiv camber. Lik tykkelse på
                            alle fire gir kun sporviddeendring. Planhetskrav (trapes): begge boltrader må gi samme
                            toe-vinkel, dvs. foran–bak-differansen må være proporsjonal med radbredden.
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className={cardClass}>
                        <h2 className={sectionTitleClass}>2 · Målt i dag → ønsket (per hjul)</h2>
                        <p className="text-sm text-slate-500 mb-4">
                            Disse akslene er sjelden rette fra fabrikk — og aldri etter noen år med kantstein. Mål
                            hvert hjul for seg med snorer og vinkelmåler. Venstre og høyre trenger som regel ulike
                            shims.
                        </p>
                        <div className="flex gap-2 max-w-xs mb-4">
                            <button className={tabBtnClass(toeEnhet === 'deg')} onClick={() => setToeEnhet('deg')}>
                                Toe i grader
                            </button>
                            <button className={tabBtnClass(toeEnhet === 'mm')} onClick={() => setToeEnhet('mm')}>
                                Toe i mm
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>
                                    Toe målt i dag ({toeEnhet === 'deg' ? '°, + = ut' : 'mm på felg, + = ut'})
                                </label>
                                <SignedInput value={maltToe} onChange={setMaltToe} />
                            </div>
                            <div>
                                <label className={labelClass}>
                                    Toe ønsket ({toeEnhet === 'deg' ? '°' : 'mm på felg'})
                                </label>
                                <SignedInput value={malToe} onChange={setMalToe} />
                            </div>
                            <div>
                                <label className={labelClass}>Camber målt i dag (grader)</label>
                                <SignedInput value={maltCamber} onChange={setMaltCamber} />
                            </div>
                            <div>
                                <label className={labelClass}>Camber ønsket (grader)</label>
                                <SignedInput value={malCamber} onChange={setMalCamber} />
                            </div>
                        </div>
                        {tilbake && (
                            <div className="text-sm text-slate-600 mt-4 space-y-2">
                                <p>
                                    Endring som må gjøres: <b className="text-slate-800">{fmt(tilbake.deltaToeDeg)}° toe</b>{' '}
                                    ({fmt(tilbake.deltaToeMm, 1)} mm på felg) ·{' '}
                                    <b className="text-slate-800">{fmt(tilbake.deltaCamber)}° camber</b>
                                </p>
                                <p className="font-semibold text-slate-700">
                                    Tolkning:{' '}
                                    {tilbake.deltaCamber < -0.01
                                        ? 'mer negativ camber (topp inn) — tykkest shims NEDE.'
                                        : tilbake.deltaCamber > 0.01
                                        ? 'mindre negativ / mer positiv camber (topp ut) — tykkest shims OPPE.'
                                        : 'ingen camber-endring.'}{' '}
                                    {tilbake.deltaToeDeg > 0.01
                                        ? 'Mer toe-ut → mer shims FORAN.'
                                        : tilbake.deltaToeDeg < -0.01
                                        ? 'Mer toe-in → mer shims BAK.'
                                        : 'Ingen toe-endring.'}
                                </p>
                                <p>
                                    Stemmer ikke dette med det du vil oppnå, har du byttet om «målt» og «ønsket» —
                                    eller glemt minustegnet.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className={cardClass}>
                        <h2 className={sectionTitleClass}>3 · Dagens shims per bolt</h2>
                        <p className="text-sm text-slate-500 mb-4">
                            Mål eller les av hva som står på bolten i dag. Oppskriften under blir da{' '}
                            <b className="text-slate-700">ny total stack</b> — riv dagens og bygg denne.
                        </p>
                        <BoltDiagram
                            shims={dagensShims}
                            onChange={(k, val) => setDagensShims((s) => ({ ...s, [k]: val }))}
                        />
                        {tilbake && Math.abs(tilbake.dagensTwistDeg) > 0.03 && (
                            <div className="mt-4 rounded-md bg-red-50 border border-dashed border-red-300 px-4 py-3 text-sm text-slate-700 leading-relaxed">
                                <b>Obs:</b> dagens stack er ikke i plan — radene gir ulik toe (avvik{' '}
                                {Math.abs(tilbake.dagensTwistDeg).toFixed(2).replace('.', ',')}°). Den nye
                                oppskriften retter dette automatisk — geometrien bevares, vridningen fjernes.
                            </div>
                        )}
                    </div>

                    <div className={cardClass}>
                        <h2 className={sectionTitleClass}>4 · Nødvendige shims</h2>
                        {tilbake ? (
                            <>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClass}>Toe-differanse per rad (foran − bak)</label>
                                        <div className="font-conthrax text-3xl text-brand-red">{fmt(tilbake.diffOppe)} mm</div>
                                        <p className="text-sm text-slate-500 mt-1">
                                            oppe · nede: <b className="text-slate-700">{fmt(tilbake.diffNede)} mm</b> —
                                            ulike fordi radbreddene er ulike (samme vinkel, {fmt(tilbake.toeDeg)}° endring)
                                        </p>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Camber-differanse (oppe − nede)</label>
                                        <div className="font-conthrax text-3xl text-brand-red">{fmt(tilbake.diffV)} mm</div>
                                        <p className="text-sm text-slate-500 mt-1">
                                            {tilbake.diffV >= 0
                                                ? 'Tyngden på oppe-boltene'
                                                : 'Tyngden på nede-boltene'}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 border-t-2 border-slate-200 pt-5">
                                    <label className={labelClass}>Ny total stack per bolt (normalisert — én bolt = 0)</label>
                                    <div className="grid grid-cols-2 gap-3 mt-2">
                                        {(
                                            [
                                                ['FO', 'Foran-oppe'],
                                                ['BO', 'Bak-oppe'],
                                                ['FN', 'Foran-nede'],
                                                ['BN', 'Bak-nede'],
                                            ] as [BoltKey, string][]
                                        ).map(([k, lbl]) => (
                                            <div
                                                key={k}
                                                className={`rounded-md border border-slate-200 px-4 py-3 ${
                                                    tilbake.bolter[k] === 0 ? 'bg-slate-50' : 'bg-white'
                                                }`}
                                            >
                                                <div className="text-xs uppercase tracking-wide text-slate-500">{lbl}</div>
                                                <div className="font-conthrax text-xl text-slate-900">
                                                    {tilbake.bolter[k].toFixed(2).replace('.', ',')} mm
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm text-slate-500 mt-4">
                                        Boltene er rundet til nærmeste 0,1 mm (minste shims-tykkelse). Reelt oppnådd
                                        endring: <b className="text-slate-700">{fmt(tilbake.oppnaddToeMm, 2)} mm toe på felg</b>{' '}
                                        ({fmt(tilbake.oppnaddToeDeg)}°) og{' '}
                                        <b className="text-slate-700">{fmt(tilbake.oppnaddCamberDeg)}° camber</b>. Rest-vridning
                                        etter avrunding: {fmt(tilbake.nyTwistDeg)}° (neglisjerbart under 0,05°). Minst én
                                        bolt er alltid uten shims. Bygg hver stack med færrest mulig shims (1,0 + 0,5
                                        fremfor fem à 0,3) — og mål etterpå.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-slate-500">Fyll inn geometri først.</p>
                        )}
                    </div>
                </>
            )}

            {/* Forbehold */}
            <div className="rounded-lg bg-slate-900 text-slate-300 shadow-sm p-6">
                <h2 className="font-conthrax uppercase tracking-wider text-lg text-white border-b-2 border-brand-red pb-3 mb-4">
                    Forutsetninger
                </h2>
                <p className="text-sm leading-relaxed text-slate-400">
                    · Små vinkler og plan flens — gyldig for typiske shims (0–3 mm).
                    <br />
                    · Beregningen gjelder per hjul. Total toe på akselen = begge hjul summert.
                    <br />
                    · <b className="text-slate-200">Mål alltid etter justering.</b> Kalkulatoren erstatter ikke
                    snorer og vinkelmåler — den forteller deg hvor du skal starte.
                    <br />
                    · Husk å trekke til nav-/bærebrubolter med riktig moment etter justering — se{' '}
                    <Link href="/tiltrekkingsmomenter" className="text-white underline hover:text-brand-red">
                        tiltrekkingsmomenter
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
