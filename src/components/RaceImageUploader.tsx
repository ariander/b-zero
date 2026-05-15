'use client';

import { useState } from 'react';
import { UploadSimple, CheckCircle, WarningCircle, Spinner } from '@phosphor-icons/react';
import imageCompression from 'browser-image-compression';

interface RaceImageUploaderProps {
    raceId: string;
}

export function RaceImageUploader({ raceId }: RaceImageUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [submitterName, setSubmitterName] = useState('');
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setStatus('idle');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!file) {
            setErrorMessage('Vennligst velg et bilde først.');
            setStatus('error');
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB grense
            setErrorMessage('Bildet er for stort. Maks filstørrelse er 10MB.');
            setStatus('error');
            return;
        }

        setStatus('uploading');
        setErrorMessage('');

        const formData = new FormData();
        
        // Komprimer bildet for å unngå Vercel's 4.5MB Serverless Function begrensning
        let fileToUpload = file;
        try {
            const options = {
                maxSizeMB: 2,          // Mål for maksimal filstørrelse
                maxWidthOrHeight: 2000, // Maksimal dimensjon (bevarer aspect ratio)
                useWebWorker: true,
            };
            fileToUpload = await imageCompression(file, options);
        } catch (error) {
            console.error('Kunne ikke komprimere bildet:', error);
            // Fallback: prøv å laste opp ukomprimert hvis det feilet
        }

        // Pass på å sende med opprinnelig filnavn for å unngå problemer i noen nettlesere
        formData.append('image', fileToUpload, file.name);
        formData.append('raceId', raceId);
        if (submitterName.trim()) {
            formData.append('submitterName', submitterName);
        }

        try {
            const response = await fetch('/api/upload-race-image', {
                method: 'POST',
                body: formData,
            });

            // Sjekk om responsen faktisk er JSON før vi prøver å parse den
            // Safari krasjer med "The string did not match the expected pattern" hvis vi prøver å parse HTML som JSON
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Feil ved opplasting');
                }
            } else {
                // Håndter feil (f.eks. Vercel 413 Payload Too Large som returnerer HTML)
                const text = await response.text();
                if (!response.ok) {
                    if (response.status === 413) {
                        throw new Error('Bildet er for stort for serveren selv etter komprimering. Prøv et mindre bilde.');
                    }
                    console.error('Server returnerte ikke JSON:', text.substring(0, 200) + '...');
                    throw new Error(`Det oppstod en uventet feil (Status ${response.status}). Prøv igjen senere.`);
                }
            }

            setStatus('success');
            setFile(null);
            setSubmitterName('');
            
            // Resetter input feltet (hack siden vi ikke har en direkte ref lett tilgjengelig her)
            const fileInput = document.getElementById('image-upload') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
            
        } catch (error: any) {
            console.error('Upload error:', error);
            setErrorMessage(error.message || 'Klarte ikke laste opp bildet. Prøv igjen senere.');
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-slate-900 text-slate-200 p-8 rounded-2xl border border-slate-800 text-center shadow-sm w-full mt-12">
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" weight="fill" />
                <h3 className="text-xl font-conthrax uppercase tracking-wider mb-2 text-white">Tusen takk!</h3>
                <p className="mb-6 text-slate-400">Bildet ditt er mottatt og sendt til godkjenning. Det vil vises i galleriet så snart det er godkjent av administrator.</p>
                <button 
                    onClick={() => setStatus('idle')}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-6 py-2 rounded-xl font-semibold transition"
                >
                    Last opp et bilde til
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-800 mt-12 w-full">
            <h3 className="text-xl font-conthrax uppercase tracking-wider text-slate-100 mb-2">
                Har du tatt et blinkskudd fra løpet? 📸
            </h3>
            <p className="text-slate-400 mb-6">
                Del bildene dine med oss! Bildet blir lagt til i galleriet for dette løpet (etter en rask godkjenning).
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
                <div>
                    <label htmlFor="image-upload" className="block text-sm font-semibold text-slate-300 mb-2">
                        Velg bilde (Maks 10MB) <span className="text-brand-red">*</span>
                    </label>
                    <input 
                        type="file" 
                        id="image-upload"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-slate-400
                            file:mr-4 file:py-2.5 file:px-4
                            file:rounded-xl file:border-0
                            file:text-sm file:font-semibold
                            file:bg-brand-red file:text-white
                            hover:file:bg-red-700 file:transition-colors
                            cursor-pointer border border-slate-700 rounded-xl p-2 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                        disabled={status === 'uploading'}
                    />
                </div>

                <div>
                    <label htmlFor="submitter-name" className="block text-sm font-semibold text-slate-300 mb-2">
                        Ditt navn (Valgfritt)
                    </label>
                    <input 
                        type="text" 
                        id="submitter-name"
                        value={submitterName}
                        onChange={(e) => setSubmitterName(e.target.value)}
                        placeholder="Slik at vi kan kreditere deg for bildet"
                        className="w-full px-4 py-3 rounded-xl border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red bg-slate-800"
                        disabled={status === 'uploading'}
                    />
                </div>

                {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-950/30 p-4 rounded-lg border border-red-900/50">
                        <WarningCircle size={24} weight="fill" className="shrink-0" />
                        <span className="text-sm font-medium">{errorMessage}</span>
                    </div>
                )}

                <button 
                    type="submit"
                    disabled={!file || status === 'uploading'}
                    className={`w-full py-4 px-4 rounded-xl font-conthrax uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all shadow-md mt-4
                        ${(!file || status === 'uploading') 
                            ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed' 
                            : 'bg-brand-red hover:bg-red-700 text-white'}`}
                >
                    {status === 'uploading' ? (
                        <>
                            <Spinner size={24} className="animate-spin" /> 
                            Laster opp...
                        </>
                    ) : (
                        <>
                            <UploadSimple size={24} weight="bold" />
                            Send inn bilde
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
