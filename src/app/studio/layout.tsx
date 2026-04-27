import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-slate-100">
      <header className="bg-black text-white py-4 shadow-md z-50 border-b-[10px] border-brand-red shrink-0">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/B-ZERO-logo.svg"
              alt="B-Zero Racing Logo"
              width={75}
              height={20}
              className="h-6 w-auto"
            />
          </Link>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-conthrax uppercase tracking-wider text-slate-300 hover:text-brand-red transition-colors"
          >
            <ArrowLeft size={18} weight="bold" /> 
            <span className="hidden sm:inline">Tilbake til nettsiden</span>
            <span className="sm:hidden">Tilbake</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 relative">
        {children}
      </main>
    </div>
  );
}
