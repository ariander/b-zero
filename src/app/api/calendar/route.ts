import { NextResponse } from 'next/server';
import { createEvents, EventAttributes } from 'ics';
import { getSeasons } from '@/sanity/lib/client';
import type { Race } from '@/app/sesonger/page';

export const revalidate = 60; // Cache revalidation

export async function GET() {
    try {
        // Fetch all races
        const races = await getSeasons();

        const events: EventAttributes[] = races.map((race: Race) => {
            const startDate = new Date(race.date);
            // If there's no end date, we assume it's a 1-day event
            const endDate = race.endDate ? new Date(race.endDate) : startDate;

            // For ICS, date arrays are [year, month, date, hours, minutes]
            // Note: Month is 1-indexed in the `ics` library (1 = January)
            const startArray: [number, number, number, number, number] = [
                startDate.getFullYear(),
                startDate.getMonth() + 1,
                startDate.getDate(),
                8, // Starts around 08:00
                0
            ];

            const endArray: [number, number, number, number, number] = [
                endDate.getFullYear(),
                endDate.getMonth() + 1,
                endDate.getDate(),
                18, // Ends around 18:00
                0
            ];

            return {
                title: race.title,
                start: startArray,
                end: endArray,
                description: `B-Zero ${race.raceCategory === 'rally' ? 'Rally' : 'Racing'}\n\nLes mer om løpet på: https://b-zeroracing.com/sesonger/${race.slug.current}`,
                location: race.track?.name || 'Bane ikke annonsert ennå',
                url: `https://b-zeroracing.com/sesonger/${race.slug.current}`,
                categories: ['B-Zero', race.raceCategory === 'rally' ? 'Rally' : 'Racing'],
                status: 'CONFIRMED',
                busyStatus: 'BUSY',
                organizer: { name: 'B-Zero Racing', email: 'post@b-zeroracing.com' }
            };
        });

        const { error, value } = createEvents(events);

        if (error) {
            console.error('Error creating ICS schema:', error);
            return new NextResponse('Error generating calendar format', { status: 500 });
        }

        // Return the ICS feed!
        return new NextResponse(value, {
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': 'attachment; filename="b-zero-terminliste.ics"',
            },
        });
    } catch (error) {
        console.error('Calendar generation failed:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
