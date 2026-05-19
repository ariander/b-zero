'use client';

import { useEffect, useState } from 'react';
import { 
    Sun, 
    Moon,
    Cloud, 
    CloudSun, 
    CloudMoon,
    CloudRain, 
    CloudSnow, 
    CloudLightning, 
    CloudFog,
    Wind,
    Thermometer
} from '@phosphor-icons/react';

interface WeatherWidgetProps {
    latitude: number;
    longitude: number;
    startDate: string;
    endDate?: string | null;
}

interface WeatherData {
    temperature: number;
    windSpeed: number;
    symbolCode: string;
    isForecast: boolean;
    dateStr: string;
}

export function WeatherWidget({ latitude, longitude, startDate, endDate }: WeatherWidgetProps) {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!latitude || !longitude) {
            setLoading(false);
            return;
        }

        async function fetchWeather() {
            try {
                // Fetch directly from Yr API
                const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`;
                
                // Yr requires a custom User-Agent, but in a browser fetch, we can't easily set a custom User-Agent 
                // without getting CORS issues if we try to override the browser's default User-Agent.
                // Actually, Yr API allows CORS but we should be careful. 
                // Let's create an API route to proxy it safely.
                
                const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}&start=${startDate}&end=${endDate || ''}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch weather');
                }

                const data = await response.json();
                setWeatherData(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching weather:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchWeather();
    }, [latitude, longitude, startDate, endDate]);

    if (loading) {
        return (
            <div className="bg-slate-900 rounded-2xl p-6 shadow-md animate-pulse">
                <div className="h-6 bg-slate-800 rounded w-1/2 mb-4"></div>
                <div className="h-16 bg-slate-800 rounded mb-4"></div>
                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
            </div>
        );
    }

    if (error || weatherData.length === 0) {
        // Silently hide if there is no data or error, to not clutter the UI
        return null; 
    }

    // Map Yr symbol codes to Phosphor icons
    const renderIcon = (symbolCode: string, size = 48) => {
        const code = symbolCode.split('_')[0]; // Remove _day, _night etc.
        const isNight = symbolCode.includes('_night');

        switch (code) {
            case 'clearsky':
                return isNight ? <Moon size={size} weight="fill" className="text-slate-300" /> : <Sun size={size} weight="fill" className="text-yellow-400" />;
            case 'fair':
            case 'partlycloudy':
                return isNight ? <CloudMoon size={size} weight="fill" className="text-slate-300" /> : <CloudSun size={size} weight="fill" className="text-slate-200" />;
            case 'cloudy':
                return <Cloud size={size} weight="fill" className="text-slate-400" />;
            case 'lightrain':
            case 'rain':
            case 'heavyrain':
            case 'lightrainshowers':
            case 'rainshowers':
            case 'heavyrainshowers':
                return <CloudRain size={size} weight="fill" className="text-blue-400" />;
            case 'snow':
            case 'sleet':
            case 'snowshowers':
            case 'sleetshowers':
                return <CloudSnow size={size} weight="fill" className="text-white" />;
            case 'fog':
                return <CloudFog size={size} weight="fill" className="text-slate-400" />;
            case 'lightning':
            case 'rainandthunder':
            case 'snowandthunder':
                return <CloudLightning size={size} weight="fill" className="text-amber-400" />;
            default:
                return <Cloud size={size} weight="fill" className="text-slate-400" />;
        }
    };

    const isForecast = weatherData[0]?.isForecast;

    return (
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xl border border-slate-700/50 relative overflow-hidden mt-8 mb-12">
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 border-b border-slate-700/50 pb-4">
                    <h2 className="text-xl font-conthrax uppercase tracking-wider text-brand-red flex items-center gap-2">
                        {isForecast ? 'Værvarsel for løpet' : 'Været på banen akkurat nå'}
                    </h2>
                    <div className="text-xs text-slate-400">
                        Data fra Yr
                    </div>
                </div>

                <div className={`grid grid-cols-1 gap-4 ${weatherData.length === 1 ? 'md:grid-cols-1 max-w-sm mx-auto' : weatherData.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' : 'md:grid-cols-3'}`}>
                    {weatherData.map((day, idx) => (
                        <div key={idx} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 flex flex-col items-center text-center relative overflow-hidden group hover:bg-slate-800 transition-colors">
                            {/* Subtle background decoration */}
                            <div className="absolute -top-4 -right-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                                {renderIcon(day.symbolCode, 100)}
                            </div>
                            
                            <div className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider relative z-10">
                                {day.dateStr || 'Akkurat nå'}
                            </div>
                            
                            <div className="drop-shadow-lg mb-3 relative z-10">
                                {renderIcon(day.symbolCode, 56)}
                            </div>
                            
                            <div className="text-3xl font-conthrax tracking-tighter mb-4 relative z-10 flex items-start justify-center">
                                {Math.round(day.temperature)}<span className="text-xl text-slate-400 align-super -mt-1">°</span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-xs text-slate-300 w-full justify-center pt-3 border-t border-slate-700/50 relative z-10">
                                <div className="flex items-center gap-1.5" title="Vindstyrke">
                                    <Wind size={16} className="text-slate-400" />
                                    <span>{day.windSpeed.toFixed(1)} m/s</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
