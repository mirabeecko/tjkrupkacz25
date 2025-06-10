import React, { useEffect, useState } from "react";
import { CloudSun, Wind, Droplets, Sun, Cloud, CloudRain, CloudLightning, CloudSnow, CloudDrizzle, CloudFog } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Převod km/h na m/s
  function kmhToMs(kmh: number) {
    return (kmh / 3.6).toFixed(1);
  }

  // Dynamická barva pozadí podle počasí
  function getWeatherBg(code: number) {
    if (code === 0) return "bg-gradient-to-r from-yellow-200 to-orange-200"; // jasno
    if ([1,2,3].includes(code)) return "bg-gradient-to-r from-blue-100 to-gray-200"; // polojasno/oblačno
    if ([45,48].includes(code)) return "bg-gradient-to-r from-gray-300 to-gray-400"; // mlha
    if ([51,53,55,61,63,65,80,81,82].includes(code)) return "bg-gradient-to-r from-blue-200 to-blue-400"; // déšť
    if ([71,73,75].includes(code)) return "bg-gradient-to-r from-sky-100 to-sky-300"; // sněžení
    if ([95].includes(code)) return "bg-gradient-to-r from-purple-200 to-purple-400"; // bouřky
    return "bg-gradient-to-r from-gray-100 to-gray-300";
  }

  // Ikona podle kódu počasí
  function getWeatherIcon(code: number) {
    if (code === 0) return <Sun className="h-4 w-4 text-yellow-400" />;
    if ([1,2,3].includes(code)) return <CloudSun className="h-4 w-4 text-tjk-orange" />;
    if ([45,48].includes(code)) return <CloudFog className="h-4 w-4 text-gray-400" />;
    if ([51,53,55].includes(code)) return <CloudDrizzle className="h-4 w-4 text-blue-300" />;
    if ([61,63,65,80,81,82].includes(code)) return <CloudRain className="h-4 w-4 text-blue-400" />;
    if ([71,73,75].includes(code)) return <CloudSnow className="h-4 w-4 text-sky-200" />;
    if ([95].includes(code)) return <CloudLightning className="h-4 w-4 text-purple-500" />;
    return <Cloud className="h-4 w-4 text-gray-400" />;
  }

  // Pomocná funkce pro převod kódu počasí na popis
  function getWeatherDescription(code: number) {
    switch (code) {
      case 0: return "Jasno";
      case 1:
      case 2:
      case 3: return "Polojasno";
      case 45:
      case 48: return "Mlha";
      case 51:
      case 53:
      case 55: return "Mrholení";
      case 61:
      case 63:
      case 65: return "Déšť";
      case 71:
      case 73:
      case 75: return "Sněžení";
      case 80:
      case 81:
      case 82: return "Přeháňky";
      case 95: return "Bouřky";
      default: return "Oblačno";
    }
  }

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=50.7&longitude=13.85&current_weather=true&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weathercode,cloudcover,windspeed_10m,winddirection_10m,pressure_msl`
        );
        const data = await res.json();
        if (data.current_weather) {
          setWeather({
            temperature: Math.round(data.current_weather.temperature),
            wind: Math.round(data.current_weather.windspeed),
            windDirection: data.current_weather.winddirection,
            pressure: Math.round(data.current_weather.pressure_msl),
            humidity: data.hourly?.relative_humidity_2m?.[0] ?? 0,
            description: "Aktuální počasí",
            code: data.current_weather.weathercode,
          });
        } else {
          setError("Nepodařilo se načíst počasí.");
        }
      } catch (e) {
        setError("Chyba při načítání počasí.");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
    // Aktualizace každých 24 hodin (stejně jako stránka počasí)
    const interval = setInterval(fetchWeather, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch forecast
    const fetchForecast = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=50.7&longitude=13.85&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe%2FPrague`
        );
        const data = await res.json();
        if (data.daily) {
          const days = data.daily.time.map((date: string, i: number) => ({
            day: new Date(date).toLocaleDateString('cs-CZ', { weekday: 'short' }),
            maxTemp: Math.round(data.daily.temperature_2m_max[i]),
            minTemp: Math.round(data.daily.temperature_2m_min[i]),
            code: data.daily.weathercode[i],
          }));
          setForecast(days);
        }
      } catch {}
    };
    fetchForecast();
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className={`text-primary gap-1 hover:bg-primary/5 ${weather && weather.code !== undefined ? getWeatherBg(weather.code) : ''}`}>
            {weather && weather.code !== undefined ? getWeatherIcon(weather.code) : <CloudSun className="h-4 w-4 text-accent" />}
            <span className="hidden md:inline text-sm">
              {loading ? "--°C" : error ? "--°C" : `${weather.temperature}°C`}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="glass p-4 border-white/30 rounded-xl shadow-elevation min-w-[220px]">
          <div className="text-sm space-y-3">
            <div className="font-semibold text-primary">Počasí Komáří vížka</div>
            {loading ? (
              <div>Načítám...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : weather ? (
              <>
                <div className="flex items-center gap-2 mt-1">
                  {getWeatherIcon(weather.code)}
                  <span>{weather.temperature}°C, {getWeatherDescription(weather.code)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-gray-600" />
                  <span>Vítr: {kmhToMs(weather.wind)} m/s ({weather.windDirection}°)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-400" />
                  <span>{weather.humidity}% vlhkost</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Tlak:</span>
                  <span>{weather.pressure} hPa</span>
                </div>
                <div className="mt-3">
                  <div className="font-semibold mb-1">Předpověď</div>
                  <div className="flex gap-2">
                    {forecast.map((day, i) => (
                      <div key={i} className={`flex flex-col items-center px-2 py-1 rounded-lg ${getWeatherBg(day.code)}`}>
                        {getWeatherIcon(day.code)}
                        <span className="text-xs font-medium mt-1">{day.day}</span>
                        <span className="text-xs">{day.maxTemp}°/{day.minTemp}°</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WeatherWidget;