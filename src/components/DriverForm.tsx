'use client';

import { useState } from 'react';
import { Upload, X, CheckCircle, WarningCircle, CircleNotch } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';

export function DriverForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);

    const [carFile, setCarFile] = useState<File | null>(null);
    const [carPreview, setCarPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'car') => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);

            if (type === 'profile') {
                setProfileFile(file);
                setProfilePreview(url);
            } else {
                setCarFile(file);
                setCarPreview(url);
            }
        }
    };

    const removeFile = (type: 'profile' | 'car') => {
        if (type === 'profile') {
            if (profilePreview) URL.revokeObjectURL(profilePreview);
            setProfileFile(null);
            setProfilePreview(null);
        } else {
            if (carPreview) URL.revokeObjectURL(carPreview);
            setCarFile(null);
            setCarPreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        // Helper to compress single image
        const compressImage = async (file: File) => {
            const options = {
                maxSizeMB: 1.5,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };
            try {
                return await imageCompression(file, options);
            } catch (error) {
                console.error('Error compressing image:', error);
                return file; // Fallback
            }
        };

        // Compress and add explicit images if they exist
        if (profileFile) formData.append('profileImage', await compressImage(profileFile));
        if (carFile) formData.append('carImage', await compressImage(carFile));

        try {
            const response = await fetch('/api/drivers', {
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
                <h3 className="text-2xl font-conthrax uppercase tracking-wider text-white mb-4">Takk for at du blir med!</h3>
                <p className="text-slate-300 text-lg mb-8 max-w-md mx-auto">
                    Din profil er mottatt og lagret som et utkast. Vi vil se over den og publisere den på nettsiden så snart som mulig.
                </p>
                <button
                    onClick={() => {
                        setIsSuccess(false);
                        removeFile('profile');
                        removeFile('car');
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white font-conthrax text-sm tracking-wider uppercase py-3 px-8 rounded-xl transition-all border border-white/20"
                >
                    Registrer en annen sjåfør
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
                <h3 className="text-lg md:text-xl font-conthrax uppercase tracking-wider text-white border-b border-slate-700 pb-2">Personalia</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300">Ditt navn *</label>
                        <input type="text" id="name" name="name" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-slate-300">Din E-post (synes ikke på nettsiden) *</label>
                        <input type="email" id="contactEmail" name="contactEmail" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="teamName" className="block text-sm font-medium text-slate-300">Teamnavn (valgfritt)</label>
                        <input type="text" id="teamName" name="teamName" placeholder="F.eks. B-Zero Racing Team" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="startNumber" className="block text-sm font-medium text-slate-300">Startnummer</label>
                            <input type="text" id="startNumber" name="startNumber" placeholder="F.eks. 42" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="debutYear" className="block text-sm font-medium text-slate-300">Debutår</label>
                            <input type="number" id="debutYear" name="debutYear" placeholder="F.eks. 2023" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-lg md:text-xl font-conthrax uppercase tracking-wider text-white border-b border-slate-700 pb-2">Bil og Historie</h3>

                <div className="space-y-2">
                    <label htmlFor="carMake" className="block text-sm font-medium text-slate-300">Bil (Merke og modell) *</label>
                    <input type="text" id="carMake" name="carMake" required placeholder="F.eks. Citroën C1" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                </div>
                
                <div className="space-y-2">
                    <label htmlFor="bio" className="block text-sm font-medium text-slate-300">Din historie</label>
                    <textarea id="bio" name="bio" rows={6} placeholder="Skriv en kort biografi og gjerne en morsom historie! Hvorfor startet du med B-Zero?" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all resize-none"></textarea>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-lg md:text-xl font-conthrax uppercase tracking-wider text-white border-b border-slate-700 pb-2">Bilder</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Profile Image Upload */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-300">Portrettbilde</label>
                        {!profilePreview ? (
                            <div className="relative border-2 border-dashed border-slate-600 rounded-2xl p-6 hover:bg-slate-800/50 transition-colors group text-center cursor-pointer h-48 flex flex-col items-center justify-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'profile')}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <Upload size={32} className="mx-auto text-slate-400 group-hover:text-brand-red transition-colors mb-2" />
                                <p className="text-slate-300 font-medium text-sm">Last opp bilde av deg selv</p>
                                <p className="text-slate-500 text-xs mt-1">(Maks 20 MB)</p>
                            </div>
                        ) : (
                            <div className="relative aspect-square md:h-48 md:w-full rounded-2xl overflow-hidden group border border-slate-700">
                                <Image src={profilePreview} alt="Portrettbilde preview" fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeFile('profile')}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-20"
                                >
                                    <X size={16} weight="bold" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Car Image Upload */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-300">Bilde av bilen</label>
                        {!carPreview ? (
                            <div className="relative border-2 border-dashed border-slate-600 rounded-2xl p-6 hover:bg-slate-800/50 transition-colors group text-center cursor-pointer h-48 flex flex-col items-center justify-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'car')}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <Upload size={32} className="mx-auto text-slate-400 group-hover:text-brand-red transition-colors mb-2" />
                                <p className="text-slate-300 font-medium text-sm">Last opp et bilde av bilen</p>
                                <p className="text-slate-500 text-xs mt-1">(Maks 20 MB)</p>
                            </div>
                        ) : (
                            <div className="relative aspect-square md:h-48 md:w-full rounded-2xl overflow-hidden group border border-slate-700">
                                <Image src={carPreview} alt="Bilde av bil preview" fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeFile('car')}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-20"
                                >
                                    <X size={16} weight="bold" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
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
                        'Send inn sjåførprofil'
                    )}
                </button>
            </div>
        </form>
    );
}
