import { getPresentationDrivers } from "@/sanity/lib/client";
import PresentationSlider from "./PresentationSlider";

export const revalidate = 300; // Safety-net; ekte oppdateringer skjer via Sanity webhook (on-demand revalidation)

export default async function SkjermPage() {
    const drivers = await getPresentationDrivers();

    return (
        <div className="fixed inset-0 z-100 bg-black overflow-hidden flex flex-col">
            {drivers && drivers.length > 0 ? (
                <PresentationSlider drivers={drivers} />
            ) : (
                <div className="flex-1 flex items-center justify-center text-white text-3xl font-conthrax">
                    Ingen sjåfører funnet.
                </div>
            )}
        </div>
    );
}
