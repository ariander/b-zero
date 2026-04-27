'use client';

import { useState } from 'react';
import { Upload, X, CheckCircle, WarningCircle, CircleNotch } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';

export function RentalForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
            setSelectedFiles(files);

            // Create preview URLs
            const urls = files.map(file => URL.createObjectURL(file));
            setPreviewUrls(urls);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);

        const newUrls = [...previewUrls];
        URL.revokeObjectURL(newUrls[index]);
        newUrls.splice(index, 1);
        setPreviewUrls(newUrls);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        // Add and compress images
        for (const file of selectedFiles) {
            const options = {
                maxSizeMB: 1.5,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };
            try {
                const compressedFile = await imageCompression(file, options);
                formData.append('images', compressedFile);
            } catch (error) {
                console.error('Error compressing image:', error);
                formData.append('images', file);
            }
        }

        try {
            const response = await fetch('/api/rentals', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Noe gikk galt under innsending.');
            }

            setIsSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-green-50/10 border border-green-500/30 rounded-2xl p-8 text-center backdrop-blur-sm">
                <div className="flex justify-center mb-6">
                    <CheckCircle size={64} weight="fill" className="text-green-500" />
                </div>
                <h3 className="text-2xl font-conthrax uppercase tracking-wider text-white mb-4">Takk for din annonse!</h3>
                <p className="text-slate-300 text-lg mb-8 max-w-md mx-auto">
                    Din annonse er mottatt og lagret som et utkast. Vi vil se over den og publisere den på nettsiden så snart som mulig.
                </p>
                <button
                    onClick={() => {
                        setIsSuccess(false);
                        setSelectedFiles([]);
                        setPreviewUrls([]);
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white font-conthrax text-sm tracking-wider uppercase py-3 px-8 rounded-xl transition-all border border-white/20"
                >
                    Legg ut ny bil
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 md:p-8 space-y-8">
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                    <WarningCircle size={24} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-red-200">{error}</p>
                </div>
            )}

            {/* Honeypot field - Bots will fill this, humans will not see it */}
            <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="website_url">Website (leave blank)</label>
                <input type="text" id="website_url" name="website_url" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="space-y-6">
                <h3 className="text-lg md:text-xl font-conthrax uppercase tracking-wider text-white border-b border-slate-700 pb-2">Bilinformasjon</h3>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-300">Kategori *</label>
                    <div className="flex flex-col md:flex-row gap-4">
                        <label className="flex items-center gap-2 cursor-pointer bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl hover:border-brand-red transition-colors w-full">
                            <input type="radio" name="raceCategory" value="racing" defaultChecked className="accent-brand-red w-4 h-4" />
                            <span className="text-white">Racing (Asfalt)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl hover:border-brand-red transition-colors w-full">
                            <input type="radio" name="raceCategory" value="rally" className="accent-brand-red w-4 h-4" />
                            <span className="text-white">Rally</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl hover:border-brand-red transition-colors w-full">
                            <input type="radio" name="raceCategory" value="both" className="accent-brand-red w-4 h-4" />
                            <span className="text-white">Begge deler</span>
                        </label>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-slate-300">Overskrift *</label>
                        <input type="text" id="title" name="title" required placeholder="F.eks. Løpsklar C1 leies ut" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="carInfo" className="block text-sm font-medium text-slate-300">Kort info om bilen</label>
                        <input type="text" id="carInfo" name="carInfo" placeholder="F.eks. Citroën C1, 2008-modell" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-slate-300">Beskrivelse</label>
                    <textarea id="description" name="description" rows={5} placeholder="Betingelser, hva er inkludert, tilstand på bilen, transport, krav til fører, etc..." className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all resize-none"></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="price" className="block text-sm font-medium text-slate-300">Pris</label>
                        <input type="text" id="price" name="price" placeholder="F.eks. 5000 kr pr løp" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="availability" className="block text-sm font-medium text-slate-300">Når er bilen ledig?</label>
                        <input type="text" id="availability" name="availability" placeholder="F.eks. Hele sesongen, eller kun spesifikke løp" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-lg md:text-xl font-conthrax uppercase tracking-wider text-white border-b border-slate-700 pb-2">Kontakt</h3>

                <div className="space-y-2">
                    <label htmlFor="contactName" className="block text-sm font-medium text-slate-300">Ditt navn *</label>
                    <input type="text" id="contactName" name="contactName" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-slate-300">E-post *</label>
                        <input type="email" id="contactEmail" name="contactEmail" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="contactPhone" className="block text-sm font-medium text-slate-300">Telefon</label>
                        <input type="tel" id="contactPhone" name="contactPhone" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-conthrax uppercase tracking-wider text-white border-b border-slate-700 pb-2">Bilder</h3>

                <div className="relative border-2 border-dashed border-slate-600 rounded-2xl p-8 hover:bg-slate-800/50 transition-colors group text-center cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <Upload size={48} className="mx-auto text-slate-400 group-hover:text-brand-red transition-colors mb-4" />
                    <p className="text-slate-300 font-medium">Klikk eller dra filer hit for å laste opp (Maks 5 bilder)</p>
                    <p className="text-slate-500 text-sm mt-2">Støttede formater: JPG, PNG, WEBP (Maks 20 MB pr. bilde)</p>
                </div>

                {previewUrls.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                        {previewUrls.map((url, index) => (
                            <div key={url} className="relative aspect-square rounded-xl overflow-hidden group border border-slate-700">
                                <Image src={url} alt={`Preview ${index}`} fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                >
                                    <X size={16} weight="bold" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-red hover:bg-red-700 text-white font-conthrax tracking-wider uppercase py-4 rounded-xl transition-all shadow-lg shadow-brand-red/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <CircleNotch size={24} className="animate-spin" />
                            Sender inn...
                        </>
                    ) : (
                        'Send inn annonse'
                    )}
                </button>
            </div>
        </form>
    );
}
