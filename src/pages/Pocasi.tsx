import React, { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Cloud, CloudRain, Sun, Wind, CloudSun, Droplets, Thermometer, MapPin, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Pocasi = () => {
  const [activeTab, setActiveTab] = useState("aktualni");
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Volání API pro aktuální počasí (OpenWeatherMap, CHMI, apod.)
    // Zde je ukázka s OpenWeatherMap, upravte podle svého API
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=50.7&longitude=13.85&current_weather=true&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weathercode,cloudcover,windspeed_10m,winddirection_10m,pressure_msl` // Komáří vížka
        );
        const data = await res.json();
        if (data.current_weather) {
          setCurrentWeather({
            temperature: Math.round(data.current_weather.temperature),
            wind: Math.round(data.current_weather.windspeed),
            windDirection: data.current_weather.winddirection,
            pressure: Math.round(data.current_weather.pressure_msl),
            description: "Aktuální počasí",
            humidity: data.hourly?.relative_humidity_2m?.[0] ?? 0,
            icon: <CloudSun className="h-12 w-12" />,
          });
        } else {
          setError("Nepodařilo se načíst aktuální počasí.");
        }
      } catch (e) {
        setError("Chyba při načítání počasí.");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
    // Volání každý den (24h)
    const interval = setInterval(fetchWeather, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, []);

  // Forecast data z API Open-Meteo
  const [forecast, setForecast] = useState<any[]>([]);

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
            day: new Date(date).toLocaleDateString('cs-CZ', { weekday: 'long' }),
            date: new Date(date).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric' }),
            maxTemp: Math.round(data.daily.temperature_2m_max[i]),
            minTemp: Math.round(data.daily.temperature_2m_min[i]),
            description: getWeatherDescription(data.daily.weathercode[i]),
            icon: <Sun className="h-8 w-8" /> // Lze vylepšit podle kódu
          }));
          setForecast(days);
        }
      } catch {}
    };
    fetchForecast();
  }, []);

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

  return (
    <PageLayout 
      title="Počasí & Webkamery" 
      description="Aktuální počasí, předpověď a živé záběry z kamer v okolí."
    >
      <div className="space-y-8 md:space-y-12">
        <Tabs defaultValue="aktualni" onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="aktualni">Aktuální počasí</TabsTrigger>
            <TabsTrigger value="predpoved">Předpověď</TabsTrigger>
          </TabsList>
          
          <TabsContent value="aktualni">
            {loading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <span>Načítám aktuální počasí…</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center min-h-[200px] text-red-600">
                {error}
              </div>
            ) : currentWeather ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-tjk-blue/10 to-transparent pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-semibold text-tjk-blue">Komáří vížka</h2>
                        <p className="text-sm text-gray-500 font-normal">{new Date().toLocaleDateString('cs-CZ')}</p>
                      </div>
                      <div className="text-tjk-orange">
                        {currentWeather.icon}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end mb-6">
                      <span className="text-4xl font-bold text-tjk-blue">{currentWeather.temperature}°C</span>
                      <span className="text-lg text-gray-600 ml-2 mb-1">{currentWeather.description}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 bg-white/60 p-3 rounded-md shadow-sm transition-transform hover:scale-102">
                        <Wind className="text-tjk-blue h-5 w-5" />
                        <div>
                          <div className="text-sm text-gray-600">Vítr</div>
                          <div className="font-medium">{(currentWeather.wind / 3.6).toFixed(1)} m/s ({currentWeather.windDirection})</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/60 p-3 rounded-md shadow-sm transition-transform hover:scale-102">
                        <Thermometer className="text-tjk-blue h-5 w-5" />
                        <div>
                          <div className="text-sm text-gray-600">Tlak</div>
                          <div className="font-medium">{currentWeather.pressure} hPa</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/60 p-3 rounded-md shadow-sm transition-transform hover:scale-102">
                        <Droplets className="text-tjk-blue h-5 w-5" />
                        <div>
                          <div className="text-sm text-gray-600">Vlhkost</div>
                          <div className="font-medium">{currentWeather.humidity}%</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/60 p-3 rounded-md shadow-sm transition-transform hover:scale-102">
                        <Sun className="text-tjk-blue h-5 w-5" />
                        <div>
                          <div className="text-sm text-gray-600">Západ slunce</div>
                          <div className="font-medium">20:32</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="bg-image relative rounded-lg overflow-hidden shadow-lg h-[350px]">
                  <img 
                    src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b" 
                    alt="Aktuální pohled na Komáří vížka" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-1">Aktuální pohled na areál</h3>
                    <p className="text-sm text-white/80">Webkamera je aktualizována každých 5 minut.</p>
                    <p className="text-xs text-white/70 mt-1">Poslední aktualizace: {new Date().toLocaleTimeString('cs-CZ')}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </TabsContent>
          
          <TabsContent value="predpoved">
            <Card className="glass mb-8">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-tjk-blue">Předpověď na další dny</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {forecast.map((day, index) => (
                    <div key={index} className="bg-white/60 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-center card-hover">
                      <h3 className="font-medium capitalize">{day.day}</h3>
                      <p className="text-xs text-gray-500 mb-2">{day.date}</p>
                      <div className="flex justify-center text-tjk-orange mb-3">
                        {day.icon}
                      </div>
                      <div className="flex justify-between items-center px-2">
                        <span className="text-lg font-bold">{day.maxTemp}°</span>
                        <span className="text-sm text-gray-500">{day.minTemp}°</span>
                      </div>
                      <p className="text-sm mt-2">{day.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="bg-tjk-gray/70 p-6 rounded-lg">
              <h3 className="font-semibold text-tjk-blue mb-2">Poznámka k předpovědi</h3>
              <p className="text-sm text-gray-600">
                Předpověď počasí je orientační a může se měnit. Pro aktuální informace o počasí v horských 
                oblastech doporučujeme sledovat specializované meteorologické služby nebo náš widget s aktuálním počasím.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <section className="bg-image relative rounded-lg overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
              alt="Horská krajina" 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 backdrop-blur-sm"></div>
          <div className="relative p-8 text-white z-10">
            <h2 className="text-2xl font-semibold mb-4">Důležité informace o počasí v horách</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/90 mb-4">
                Počasí v horských oblastech se může velmi rychle měnit. Pro vaši bezpečnost doporučujeme:
              </p>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-start">
                  <span className="bg-tjk-orange/20 p-1 rounded-full mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-tjk-orange" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Vždy zkontrolujte aktuální předpověď před výletem do hor
                </li>
                <li className="flex items-start">
                  <span className="bg-tjk-orange/20 p-1 rounded-full mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-tjk-orange" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Mějte s sebou vhodné oblečení i pro případ náhlého zhoršení počasí
                </li>
                <li className="flex items-start">
                  <span className="bg-tjk-orange/20 p-1 rounded-full mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-tjk-orange" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Při bouřce se nezdržujte na hřebenech a v blízkosti osamělých stromů
                </li>
                <li className="flex items-start">
                  <span className="bg-tjk-orange/20 p-1 rounded-full mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-tjk-orange" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Sledujte varování horské služby a respektujte jejich doporučení
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Pocasi;
