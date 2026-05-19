import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const start = searchParams.get('start');
    const end = searchParams.get('end');
    
    if (!lat || !lon) {
        return NextResponse.json({ error: 'Missing lat or lon' }, { status: 400 });
    }

    try {
        // Fetch from Yr API with custom User-Agent
        const yrResponse = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`, {
            headers: {
                'User-Agent': 'B-Zero-Racing-Web/1.0 github.com/arildandersen'
            },
            next: { revalidate: 3600 } // Cache for 1 hour to avoid hitting Yr API too often
        });

        if (!yrResponse.ok) {
            throw new Error(`Yr API responded with ${yrResponse.status}`);
        }

        const yrData = await yrResponse.json();
        
        const timeseries = yrData.properties.timeseries;
        if (!timeseries || timeseries.length === 0) {
            throw new Error('No timeseries data');
        }

        const results = [];
        const lastForecastDate = new Date(timeseries[timeseries.length - 1].time);

        if (start) {
            const startDate = new Date(start);
            const endDate = end && end !== 'null' ? new Date(end) : new Date(start);
            
            // Set time to noon for comparison
            startDate.setHours(12, 0, 0, 0);
            endDate.setHours(12, 0, 0, 0);

            // If the race starts in the future AND before the last forecast date
            if (startDate > new Date() && startDate <= lastForecastDate) {
                // Loop through days from start to end (inclusive)
                let currentDate = new Date(startDate);
                
                while (currentDate <= endDate && currentDate <= lastForecastDate) {
                    const targetTime = currentDate.getTime();
                    let closest = timeseries[0];
                    let minDiff = Math.abs(new Date(closest.time).getTime() - targetTime);

                    for (const ts of timeseries) {
                        const diff = Math.abs(new Date(ts.time).getTime() - targetTime);
                        if (diff < minDiff) {
                            minDiff = diff;
                            closest = ts;
                        }
                    }

                    // Format "Lørdag", "Søndag" etc
                    let dateStr = new Date(closest.time).toLocaleDateString('no-NB', { weekday: 'long' });
                    // Capitalize first letter
                    dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

                    results.push({
                        temperature: closest.data.instant.details.air_temperature,
                        windSpeed: closest.data.instant.details.wind_speed,
                        symbolCode: closest.data.next_1_hours?.summary?.symbol_code || closest.data.next_6_hours?.summary?.symbol_code || 'cloudy',
                        isForecast: true,
                        dateStr
                    });

                    currentDate.setDate(currentDate.getDate() + 1);
                }
            }
        }

        // If no forecast results were found (past race, or > 10 days away), return "Akkurat nå"
        if (results.length === 0) {
            const selectedData = timeseries[0];
            results.push({
                temperature: selectedData.data.instant.details.air_temperature,
                windSpeed: selectedData.data.instant.details.wind_speed,
                symbolCode: selectedData.data.next_1_hours?.summary?.symbol_code || selectedData.data.next_6_hours?.summary?.symbol_code || 'cloudy',
                isForecast: false,
                dateStr: ''
            });
        }

        return NextResponse.json(results);

    } catch (error) {
        console.error('Weather API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
    }
}
