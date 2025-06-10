
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Sun, Cloud, CloudRain, Wind, Thermometer, Droplets, ArrowDownUp, ArrowRight,
  CloudLightning, CloudSnow, CloudDrizzle, CloudFog, Compass, CloudSun
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

// Sample data for temperature chart
const temperatureData = [
  { time: '6:00', temp: 8 },
  { time: '9:00', temp: 10 },
  { time: '12:00', temp: 12 },
  { time: '15:00', temp: 14 },
  { time: '18:00', temp: 13 },
  { time: '21:00', temp: 11 }
];

// Sample data for forecast
const forecastData = [
  { day: 'Dnes', icon: <Sun className="h-6 w-6 text-tjk-orange" />, maxTemp: 12, minTemp: 8 },
  { day: 'Zítra', icon: <CloudRain className="h-6 w-6 text-blue-400" />, maxTemp: 10, minTemp: 6 },
  { day: 'Po', icon: <Cloud className="h-6 w-6 text-gray-400" />, maxTemp: 11, minTemp: 7 },
  { day: 'Út', icon: <Sun className="h-6 w-6 text-tjk-orange" />, maxTemp: 13, minTemp: 9 }
];

// Weather condition components with animations
const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition) {
    case 'sunny':
      return <Sun className="h-16 w-16 text-tjk-orange animate-pulse-soft" />;
    case 'cloudy':
      return <Cloud className="h-16 w-16 text-gray-400" />;
    case 'partially-cloudy':
      return <CloudSun className="h-16 w-16 text-tjk-orange" />;
    case 'rain':
      return <CloudRain className="h-16 w-16 text-blue-400" />;
    case 'storm':
      return <CloudLightning className="h-16 w-16 text-purple-500" />;
    case 'snow':
      return <CloudSnow className="h-16 w-16 text-sky-200" />;
    case 'drizzle':
      return <CloudDrizzle className="h-16 w-16 text-blue-300" />;
    case 'fog':
      return <CloudFog className="h-16 w-16 text-gray-300" />;
    default:
      return <Sun className="h-16 w-16 text-tjk-orange" />;
  }
};

const WeatherSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("weather");
  const [selectedWebcam, setSelectedWebcam] = useState<string>("main");

  return (
    <section id="pocasi" className="py-16 md:py-20 bg-gradient-to-b from-tjk-gray to-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-tjk-blue mb-3">
            Počasí & Webkamery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-balance">
            Zjistěte aktuální počasí a pohled z webkamer na areál Komáří vížka
          </p>
        </div>

        <Tabs defaultValue="weather" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8 shadow-sm">
            <TabsTrigger value="weather">Počasí</TabsTrigger>
            <TabsTrigger value="webcams">Webkamery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weather" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Weather Widget - Glassmorphism style */}
              <Card className="lg:col-span-2 glass overflow-hidden border-white/20 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-tjk-blue/10 to-transparent pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl text-tjk-blue mb-0.5">Aktuální počasí</CardTitle>
                      <CardDescription>Komáří vížka, 800 m n.m.</CardDescription>
                    </div>
                    <WeatherIcon condition="partially-cloudy" />
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="text-4xl font-bold text-tjk-blue">12°C</div>
                      <div className="text-gray-500 ml-3 text-sm">Pocitově 10°C</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium">Jasno</div>
                      <div className="text-gray-500 text-sm">Středa, 12:30</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Dnešní teplota</h4>
                    <div className="h-36">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={temperatureData}
                          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FF7A00" stopOpacity={0.6} />
                              <stop offset="95%" stopColor="#FF7A00" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                          <XAxis 
                            dataKey="time" 
                            tick={{ fontSize: 12 }} 
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 12 }}
                            domain={['dataMin - 1', 'dataMax + 1']}
                            tickCount={5}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `${value}°`}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.8)',
                              borderRadius: '0.375rem',
                              backdropFilter: 'blur(8px)',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                              fontSize: '12px',
                              padding: '8px 10px'
                            }}
                            formatter={(value) => [`${value}°C`, 'Teplota']} 
                            labelFormatter={(label) => `Čas: ${label}`}
                          />
                          <Area
                            type="monotone"
                            dataKey="temp"
                            stroke="#FF7A00"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#tempGradient)"
                            activeDot={{ r: 6, strokeWidth: 1, stroke: '#fff' }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="glass p-3 rounded-lg shadow-sm transition-all hover:scale-102">
                      <div className="flex items-center gap-2">
                        <Wind className="h-5 w-5 text-tjk-blue" />
                        <div>
                          <div className="text-sm text-gray-600">Vítr</div>
                          <div className="font-medium">3 m/s</div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Compass className="h-3 w-3 mr-1" />
                            <span>SV</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass p-3 rounded-lg shadow-sm transition-all hover:scale-102">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-5 w-5 text-blue-400" />
                        <div>
                          <div className="text-sm text-gray-600">Vlhkost</div>
                          <div className="font-medium">45%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass p-3 rounded-lg shadow-sm transition-all hover:scale-102">
                      <div className="flex items-center gap-2">
                        <ArrowDownUp className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="text-sm text-gray-600">Tlak</div>
                          <div className="font-medium">1013 hPa</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gradient-to-r from-transparent to-tjk-blue/5 p-4">
                  <Link to="/pocasi" className="w-full">
                    <Button className="w-full bg-tjk-blue hover:bg-tjk-blue/90 transition-all duration-300">
                      <span>Podrobná předpověď</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Forecast Card */}
              <Card className="glass border-white/20 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-tjk-blue">Předpověď</CardTitle>
                  <CardDescription>Na nejbližší dny</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {forecastData.map((day, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-3 rounded-lg bg-white/60 shadow-sm transition-all hover:scale-102"
                      >
                        <div className="flex items-center">
                          {day.icon}
                          <span className="ml-3 font-medium">{day.day}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold text-lg">{day.maxTemp}°</span>
                          <span className="text-gray-500 text-sm ml-2">{day.minTemp}°</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="webcams" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <div className="glass p-4 rounded-lg border-white/20 shadow-lg">
                  <h3 className="font-medium text-lg mb-4 text-tjk-blue">Vyberte kameru</h3>
                  <div className="space-y-2">
                    <Button 
                      variant={selectedWebcam === "main" ? "default" : "outline"} 
                      className="w-full justify-start"
                      onClick={() => setSelectedWebcam("main")}
                    >
                      <span>Hlavní pohled</span>
                    </Button>
                    <Button 
                      variant={selectedWebcam === "trail" ? "default" : "outline"} 
                      className="w-full justify-start"
                      onClick={() => setSelectedWebcam("trail")}
                    >
                      <span>Trailpark</span>
                    </Button>
                    <Button 
                      variant={selectedWebcam === "restaurant" ? "default" : "outline"} 
                      className="w-full justify-start"
                      onClick={() => setSelectedWebcam("restaurant")}
                    >
                      <span>Restaurace</span>
                    </Button>
                    <Button 
                      variant={selectedWebcam === "parking" ? "default" : "outline"} 
                      className="w-full justify-start"
                      onClick={() => setSelectedWebcam("parking")}
                    >
                      <span>Parkoviště</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <Card className="glass overflow-hidden border-white/20 shadow-lg h-full">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-md overflow-hidden relative">
                    <img 
                      src={
                        selectedWebcam === "main" ? "/lovable-uploads/webcam.jpg" :
                        selectedWebcam === "trail" ? "https://images.unsplash.com/photo-1491555103944-7c647fd857e6" :
                        selectedWebcam === "restaurant" ? "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" :
                        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98"
                      } 
                      alt={`Webkamera - ${selectedWebcam}`} 
                      className="w-full h-full object-cover transition-opacity duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://images.unsplash.com/photo-1491555103944-7c647fd857e6";
                      }}
                    />
                    <div className="absolute bottom-3 right-3 glass-dark text-white text-xs py-1 px-2 rounded-full flex items-center">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>
                      <span className="font-medium">Live</span>
                    </div>
                  </div>
                  <CardContent className="py-4">
                    <h3 className="text-xl font-semibold mb-1 text-tjk-blue">
                      {selectedWebcam === "main" ? "Hlavní pohled na areál" :
                       selectedWebcam === "trail" ? "Trailpark" :
                       selectedWebcam === "restaurant" ? "Restaurace" : "Parkoviště"}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Aktualizováno: {new Date().toLocaleTimeString('cs-CZ')}
                    </p>
                    <p className="text-gray-700 text-sm">
                      {selectedWebcam === "main" ? "Celkový pohled na areál Komáří vížky a okolní krajinu." :
                       selectedWebcam === "trail" ? "Pohled na část trailparku se skoky a klopkami." :
                       selectedWebcam === "restaurant" ? "Pohled na restauraci a odpočinkovou zónu." : 
                       "Aktuální situace na hlavním parkovišti."}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-end px-4 pb-4">
                    <Button variant="outline" size="sm" className="flex items-center text-sm">
                      <span>Zobrazit v plném rozlišení</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Link to="/pocasi">
            <Button 
              variant="outline" 
              className="bg-tjk-blue/5 hover:bg-tjk-blue/10 text-tjk-blue border-none transition-all duration-300"
            >
              Zobrazit všechny informace o počasí
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WeatherSection;
