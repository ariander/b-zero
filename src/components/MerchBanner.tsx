import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "@phosphor-icons/react/dist/ssr";

const SHOP_URL = "https://bzero.myspreadshop.no";

export function MerchBanner() {
    return (
        <section className="relative overflow-hidden bg-neutral-950 border-t-2 border-brand-red">
            {/* Background product images */}
            <div className="absolute inset-0 flex pointer-events-none select-none">
                <div className="relative w-1/2 h-full opacity-20">
                    <Image
                        src="/shop1.jpg"
                        alt="B-Zero merchandise"
                        fill
                        className="object-cover object-center"
                        unoptimized
                    />
                </div>
                <div className="relative w-1/2 h-full opacity-20">
                    <Image
                        src="/shop2.jpg"
                        alt="B-Zero merchandise"
                        fill
                        className="object-cover object-center"
                        unoptimized
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-6 md:py-8 flex flex-col sm:flex-row items-center gap-5 md:gap-10">
                {/* Icon */}
                <div className="shrink-0 bg-brand-red/20 border border-brand-red/40 text-brand-red p-3 rounded-xl hidden sm:flex items-center justify-center">
                    <ShoppingBag size={28} weight="fill" />
                </div>

                {/* Text */}
                <div className="flex-1 text-center sm:text-left">
                    <p className="text-xs font-conthrax text-brand-red uppercase tracking-widest mb-1">B-Zero Merchandise</p>
                    <h2 className="text-lg md:text-2xl font-conthrax text-white uppercase leading-tight">
                        Caps, hettegensere og mer — <span className="text-brand-red">vis at du er B-Zero!</span>
                    </h2>
                </div>

                {/* Product image thumbnails */}
                <div className="shrink-0 hidden md:flex gap-3">
                    <div className="relative w-14 h-16 rounded-lg overflow-hidden border border-neutral-700 -rotate-2 shadow-lg">
                        <Image src="/shop1.jpg" alt="Merch" fill className="object-cover" unoptimized />
                    </div>
                    <div className="relative w-14 h-16 rounded-lg overflow-hidden border border-neutral-700 rotate-2 shadow-lg">
                        <Image src="/shop2.jpg" alt="Merch" fill className="object-cover" unoptimized />
                    </div>
                </div>

                {/* CTA */}
                <Link
                    href={SHOP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 bg-brand-red hover:bg-white text-white hover:text-brand-red font-conthrax uppercase tracking-widest py-2.5 px-6 rounded-full text-sm transition-all duration-300 shadow-md border-2 border-brand-red whitespace-nowrap"
                >
                    <ShoppingBag size={16} weight="fill" />
                    Gå til butikken
                </Link>
            </div>
        </section>
    );
}
