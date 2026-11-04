const SHOP_URL = "https://bzero.myspreadshop.no/";

export function MerchBanner() {
    return (
        <section className="w-full overflow-hidden bg-[#d4d4d4]">
            <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kjøp B-Zero klær på bzero.myspreadshop.no"
                className="relative flex w-full items-stretch justify-between h-[22.3vw] max-h-[220px] bg-repeat-x select-none hover:brightness-[1.02] transition"
                style={{
                    backgroundImage: "url('/shop-background.webp')",
                    backgroundSize: "auto 100%",
                    backgroundPosition: "left top",
                }}
            >
                {/* Venstre bilde */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/shop-left.webp"
                    alt="B-Zero jakke og t-skjorte"
                    width={916}
                    height={580}
                    className="h-full w-auto block shrink-0 pointer-events-none"
                />

                {/* Senter bilde (tekst/CTA) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/shop-center.webp"
                    alt="Kjøp B-Zero klær – bzero.myspreadshop.no"
                    width={776}
                    height={580}
                    className="h-full w-auto block shrink-0 pointer-events-none"
                />

                {/* Høyre bilde */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/shop-right.webp"
                    alt="B-Zero hettegenser og jakke"
                    width={908}
                    height={580}
                    className="h-full w-auto block shrink-0 pointer-events-none"
                />
            </a>
        </section>
    );
}
