// Map of Norwegian postal code ranges to current counties (Fylker as of 2024+)
// Note: Postal codes in Norway are 4 digits.
export function getCountyFromPostalCode(postalCodeStr: string): string {
    const code = parseInt(postalCodeStr.trim(), 10);
    if (isNaN(code)) return 'Ukjent';

    if (code >= 0 && code <= 1299) return 'Oslo';
    if (code >= 1300 && code <= 1499) return 'Akershus';
    if (code >= 1500 && code <= 1899) return 'Østfold';
    if (code >= 1900 && code <= 2099) return 'Akershus';
    if (code >= 2100 && code <= 2699) return 'Innlandet'; // Hedmark + Oppland
    if (code >= 2700 && code <= 2999) return 'Innlandet'; // Hadeland/Valdres (Oppland) -> Innlandet (some Akershus/Buskerud overlaps but mainly Innlandet)
    // Adjusting 2700-2999 mapping slightly: 2700-2799 (Oppland/Akershus area), 2800-2999 (Oppland) -> Innlandet.
    // Let's refine based on typical regions if needed. Gran is 2750 -> Innlandet.

    if (code >= 3000 && code <= 3699) return 'Buskerud';
    // 3000-3099 Drammen area, 3100-3299 Vestfold, 3300-3699 Buskerud
    if (code >= 3100 && code <= 3299) return 'Vestfold';

    if (code >= 3700 && code <= 3999) return 'Telemark';

    if (code >= 4000 && code <= 4499) return 'Rogaland';
    // Flekkefjord area is 4400-4499 (Agder) but 4000-4399 is Rogaland. 
    // Let's make it more precise
    if (code >= 4400 && code <= 4499) return 'Agder';
    if (code >= 4500 && code <= 4999) return 'Agder';

    if (code >= 5000 && code <= 5999) return 'Vestland';
    if (code >= 6000 && code <= 6699) return 'Møre og Romsdal';
    if (code >= 6700 && code <= 6999) return 'Vestland'; // Sogn og Fjordane

    if (code >= 7000 && code <= 7999) return 'Trøndelag';

    if (code >= 8000 && code <= 8999) return 'Nordland';

    if (code >= 9000 && code <= 9499) return 'Troms';
    if (code >= 9500 && code <= 9999) return 'Finnmark';

    return 'Ukjent';
}
