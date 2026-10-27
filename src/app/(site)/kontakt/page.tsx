import { FacebookLogo, YoutubeLogo, EnvelopeSimple, Phone, User, UsersThree, Flag, TreeEvergreen, Globe, Wrench } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 3600

export const metadata = {
    title: 'Kontakt oss - B-Zero Racing & Rally',
    description: 'Finn riktig kontaktperson for B-Zero generelt, asfaltracing, rally, eller nettside og merkevare.',
}

interface ContactPerson {
    name: string
    role: string
    description: string
    phone?: string
    phoneDisplay?: string
    emailUser?: string
    emailDomain?: string
    fallbackImage?: string
    driverSlug?: string
    isPlaceholder?: boolean
}

interface ContactCategory {
    title: string
    subtitle: string
    icon: React.ReactNode
    badgeColor: string
    persons: ContactPerson[]
}

const contactCategories: ContactCategory[] = [
    {
        title: 'Ledelse, Teknisk ogGenerelt',
        subtitle: 'Overordnet ledelse, klasseadministrasjon og teknisk reglement',
        icon: <UsersThree size={24} weight="fill" className="text-brand-red" />,
        badgeColor: 'border-brand-red/30 bg-brand-red/10 text-brand-red',
        persons: [
            {
                name: 'Dan René Larsen',
                role: 'Klasseleder og generell kontakt',
                description: 'Klassens drift, administrasjon, organisering og generelle spørsmål.',
                phone: '+4793817745',
                phoneDisplay: '+47 93 81 77 45',
                emailUser: 'dan.rene.larsen',
                emailDomain: 'live.no',
                fallbackImage: '/DanReneLarsen.jpg',
            },
            {
                name: 'Jon Renstrøm',
                role: 'Teknisk Leder',
                description: 'Teknisk reglement, sikkerhetsbur og bil.',
                phone: '+4793048706',
                phoneDisplay: '+47 93 04 87 06',
                emailUser: 'jon.renstrom',
                emailDomain: 'gmail.com',
                driverSlug: 'jon',
                fallbackImage: '/JonRenstrom.jpg',
            },
        ],
    },
    {
        title: 'B-Zero Racing (Asfalt)',
        subtitle: 'Asfaltracing, baneløp, arrangementer og trening',
        icon: <Flag size={24} weight="fill" className="text-blue-500" />,
        badgeColor: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
        persons: [
            {
                name: 'Roger Iversen',
                role: 'Førerkontakt racing',
                description: 'Kontaktperson mellom ledelse og utdøver, sportslig veiledning på og utenfor banen.',
                phone: '+4795060401',
                phoneDisplay: '+47 95 06 04 01',
                emailUser: 'roger.iversen007',
                emailDomain: 'gmail.com',
                driverSlug: 'roger',
                fallbackImage: '/roger.png',
            },
            {
                name: 'Fornavn Etternavn',
                role: 'Assisterende førerkontakt racing',
                description: 'Kontaktperson mellom ledelse og utdøver, sportslig veiledning på og utenfor banen..',
                isPlaceholder: true,
            },
        ],
    },
    {
        title: 'B-Zero Rally',
        subtitle: 'Rallykjøring, utstyr, oppsett, sikkerhet og råd for skogsetapper',
        icon: <TreeEvergreen size={24} weight="fill" className="text-amber-500" />,
        badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
        persons: [
            {
                name: 'Lars Brænna',
                role: 'Kontaktperson Rally',
                description: 'Rallyerfaring, førerutvikling, lisenser og deltakelse på grus og snø.',
                phone: '+4746171707',
                phoneDisplay: '+47 46 17 17 07',
                emailUser: 'lars',
                emailDomain: 'vtkl.no',
                driverSlug: 'lars-braenna',
                fallbackImage: '/lars.jpg',
            },
            {
                name: 'Ståle Hovda',
                role: 'Kontaktperson Rally',
                description: 'Rallyerfaring, bygging og preparering av rallybil og bil- og kjøretekniske tips.',
                phone: '+4791627880',
                phoneDisplay: '+47 91 62 78 80',
                emailUser: 'stale.hovda',
                emailDomain: 'gmail.com',
                driverSlug: 'stale',
                fallbackImage: '/stale.png',
            },
        ],
    },
    {
        title: 'Nettside og Merkevare',
        subtitle: 'Digital plattform, profilering, leiebørs, sponsorer og media',
        icon: <Globe size={24} weight="fill" className="text-emerald-400" />,
        badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
        persons: [
            {
                name: 'Arild Andersen',
                role: 'Nettside og merkevare',
                description: 'Spørsmål om nettsiden, profilering og mediehenvendelser.',
                phone: '+4795126802',
                phoneDisplay: '+47 95 12 68 02',
                emailUser: 'arild.andersen',
                emailDomain: 'gmail.com',
                driverSlug: 'arild',
                fallbackImage: '/arild.jpg',
            },
        ],
    },
]

// Henter profilbilder med Sanity crop og hotspot
async function getDriverImagesMap() {
    try {
        const drivers = await client.fetch(
            `*[_type == "driver" && defined(slug.current) && defined(profileImage)] {
                "slug": slug.current,
                profileImage
            }`,
            {},
            { next: { tags: ['driver'] } }
        )

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const map: Record<string, any> = {}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        drivers?.forEach((d: any) => {
            if (d.slug && d.profileImage) {
                map[d.slug] = d.profileImage
            }
        })
        return map
    } catch (err) {
        console.error('Feil under henting av sjåførbilder fra Sanity:', err)
        return {}
    }
}

export default async function KontaktPage() {
    const driverImagesMap = await getDriverImagesMap()

    return (
        <div className="bg-neutral-950 min-h-screen text-slate-100">
            {/* Hero Section */}
            <div className="border-b border-neutral-800 bg-linear-to-b from-neutral-900 via-neutral-950 to-neutral-950">
                <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-conthrax uppercase tracking-widest border border-brand-red/40 bg-brand-red/10 text-brand-red mb-4">
                        B-Zero Kontakt
                    </div>
                    <h1 className="text-3xl md:text-5xl font-conthrax text-white uppercase tracking-wider mb-4">
                        Kontaktpersoner
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-300 font-light max-w-3xl leading-relaxed">
                        Har du spørsmål om regelverket, vurderer du å bygge en bil til asfaltracing eller rally, eller har du henvendelser rundt nettsiden? Finn riktig kontaktperson nedenfor.
                    </p>
                </div>
            </div>

            {/* Main Content: Categories & Persons */}
            <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 space-y-16">
                {contactCategories.map((category) => (
                    <section key={category.title} className="space-y-6">
                        {/* Category Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 shrink-0">
                                    {category.icon}
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-conthrax text-white uppercase tracking-wide">
                                        {category.title}
                                    </h2>
                                    <p className="text-sm text-neutral-400 font-light">
                                        {category.subtitle}
                                    </p>
                                </div>
                            </div>
                            <span className={`self-start md:self-auto text-xs font-semibold px-3 py-1 rounded-full border ${category.badgeColor}`}>
                                {category.persons.length} {category.persons.length === 1 ? 'kontaktperson' : 'kontaktpersoner'}
                            </span>
                        </div>

                        {/* Persons Grid */}
                        <div className={`grid gap-6 ${category.persons.length === 1 ? 'grid-cols-1 md:max-w-md' : 'grid-cols-1 md:grid-cols-2'}`}>
                            {category.persons.map((person, idx) => {
                                const sanityProfileImage = person.driverSlug ? driverImagesMap[person.driverSlug] : null
                                const imageSrc = sanityProfileImage
                                    ? urlFor(sanityProfileImage).width(400).height(400).auto('format').url()
                                    : person.fallbackImage

                                return (
                                    <div
                                        key={idx}
                                        className="bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/40 group relative overflow-hidden"
                                    >
                                        <div className="space-y-5">
                                            {/* Avatar & Name */}
                                            <div className="flex items-start gap-4 sm:gap-5">
                                                <div className="w-20 h-20 rounded-2xl bg-neutral-800 border-2 border-neutral-700 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
                                                    {imageSrc ? (
                                                        <Image
                                                            src={imageSrc}
                                                            alt={person.name}
                                                            width={160}
                                                            height={160}
                                                            className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                                                        />
                                                    ) : (
                                                        <User size={36} className="text-neutral-500" />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-xl font-conthrax text-white tracking-wide truncate group-hover:text-brand-red transition-colors">
                                                        {person.name}
                                                    </h3>
                                                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-1">
                                                        {person.role}
                                                    </p>
                                                    {person.isPlaceholder && (
                                                        <span className="inline-block mt-2 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                            Info kommer
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-sm text-neutral-300 font-light leading-relaxed">
                                                {person.description}
                                            </p>
                                        </div>

                                        {/* Contact Details */}
                                        <div className="mt-6 pt-5 border-t border-neutral-800 space-y-3">
                                            {person.emailUser && person.emailDomain ? (
                                                <div className="flex items-center gap-3 text-sm text-neutral-300 hover:text-white transition">
                                                    <EnvelopeSimple size={18} className="text-neutral-500 shrink-0" />
                                                    <ObfuscatedEmail
                                                        user={person.emailUser}
                                                        domain={person.emailDomain}
                                                        className="truncate hover:underline text-neutral-200 hover:text-white"
                                                    />
                                                </div>
                                            ) : null}

                                            {person.phone ? (
                                                <a
                                                    href={`tel:${person.phone}`}
                                                    className="flex items-center gap-3 text-sm text-neutral-300 hover:text-white transition group/link"
                                                >
                                                    <Phone size={18} className="text-neutral-500 shrink-0 group-hover/link:text-brand-red transition-colors" />
                                                    <span className="font-medium">{person.phoneDisplay || person.phone}</span>
                                                </a>
                                            ) : null}

                                            {!person.phone && !person.emailUser && !person.isPlaceholder && (
                                                <p className="text-xs text-neutral-400 italic flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                                    Kontaktinformasjon oppdateres om kort tid
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                ))}

                {/* Community & Social Channels */}
                <section className="mt-20 pt-12 border-t border-neutral-800">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-[#1877F2]/10 text-[#1877F2] p-3 rounded-2xl border border-[#1877F2]/20">
                                        <FacebookLogo size={28} weight="fill" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-conthrax text-white uppercase tracking-wider">
                                        Fellesskapet på Facebook
                                    </h3>
                                </div>
                                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                                    Bli med i den offisielle Facebook-gruppen for B-Zero Racing &amp; Rally. Her diskuteres bygging, deleutveksling, løpsrapporter og kameratskap i depotet.
                                </p>
                            </div>
                            <a
                                href="https://www.facebook.com/groups/bzermotorsport/"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1864D9] text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md text-sm uppercase tracking-wide"
                            >
                                <FacebookLogo size={20} weight="fill" />
                                Bli med i Facebook-gruppen
                            </a>
                        </div>

                        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-red-500/10 text-red-500 p-3 rounded-2xl border border-red-500/20">
                                        <YoutubeLogo size={28} weight="fill" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-conthrax text-white uppercase tracking-wider">
                                        B-Zero på YouTube
                                    </h3>
                                </div>
                                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                                    Se actionfylte onboard-videoer, løpshøydepunkter og innslag fra både asfalt og skogsetapper.
                                </p>
                            </div>
                            <a
                                href="https://www.youtube.com/@bzeroracing"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md text-sm uppercase tracking-wide"
                            >
                                <YoutubeLogo size={20} weight="fill" />
                                Se videoer på YouTube
                            </a>
                        </div>
                    </div>
                </section>

                {/* Practical Links / Self Service CTA */}
                <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800/80 border border-neutral-700/60 rounded-3xl p-8 md:p-10 text-center max-w-3xl mx-auto shadow-2xl">
                    <Wrench size={36} className="text-brand-red mx-auto mb-4" />
                    <h3 className="text-xl md:text-2xl font-conthrax text-white uppercase tracking-wider mb-3">
                        Lurer du på hvordan du bygger bil eller skaffer utstyr?
                    </h3>
                    <p className="text-sm md:text-base text-neutral-300 font-light mb-6 max-w-xl mx-auto leading-relaxed">
                        Sjekk ut vår komplette byggeguide for både racing og rally, eller les alt om lisenser, FIA-godkjent sikkerhetsutstyr og klassens historie under Kom i gang.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/kom-i-gang"
                            className="bg-brand-red hover:bg-red-700 text-white font-conthrax text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl transition shadow-md"
                        >
                            Gå til Kom i gang
                        </Link>
                        <Link
                            href="/byggeguide"
                            className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600 font-conthrax text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl transition shadow-md"
                        >
                            Åpne Byggeguiden
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
