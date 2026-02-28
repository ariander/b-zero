export const metadata = {
    title: 'B-Zero Racing Studio',
    description: 'Sanity Studio for B-Zero Racing',
}

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="no">
            <body style={{ margin: 0, padding: 0 }}>{children}</body>
        </html>
    )
}
