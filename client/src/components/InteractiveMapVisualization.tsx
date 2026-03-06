import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Map, 
  Layers, 
  Thermometer, 
  Wind, 
  Factory, 
  Users, 
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlobalMap } from "./GlobalMap";

interface DataLayer {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  enabled: boolean;
  description: string;
}

interface TimelineData {
  year: number;
  temperature: number;
  co2: number;
  events: string[];
}

const dataLayers: DataLayer[] = [
  {
    id: "temperature",
    name: "Temperature",
    icon: Thermometer,
    color: "bg-red-500",
    enabled: true,
    description: "Global temperature anomalies"
  },
  {
    id: "co2",
    name: "CO₂ Levels",
    icon: Wind,
    color: "bg-orange-500",
    enabled: false,
    description: "Atmospheric carbon dioxide concentration"
  },
  {
    id: "power-plants",
    name: "Power Plants",
    icon: Factory,
    color: "bg-gray-500",
    enabled: true,
    description: "Coal, gas, and renewable energy facilities"
  },
  {
    id: "communities",
    name: "Communities",
    icon: Users,
    color: "bg-blue-500",
    enabled: true,
    description: "Active climate action communities"
  }
];

const timelineData: TimelineData[] = [
  { year: 1950, temperature: -0.2, co2: 310, events: ["Post-war industrialization begins"] },
  { year: 1970, temperature: 0.0, co2: 325, events: ["First Earth Day", "Clean Air Act"] },
  { year: 1990, temperature: 0.3, co2: 354, events: ["IPCC First Assessment", "Kyoto Protocol negotiations"] },
  { year: 2000, temperature: 0.5, co2: 370, events: ["Millennium Development Goals"] },
  { year: 2010, temperature: 0.8, co2: 390, events: ["Cancun Agreements", "Arab Spring"] },
  { year: 2015, temperature: 1.0, co2: 400, events: ["Paris Agreement signed", "SDGs launched"] },
  { year: 2020, temperature: 1.1, co2: 414, events: ["COVID-19 pandemic", "Net-zero commitments surge"] },
  { year: 2023, temperature: 1.2, co2: 420, events: ["Hottest year on record", "COP28 Dubai"] }
];

export function InteractiveMapVisualization() {
  const [layers, setLayers] = useState<DataLayer[]>(dataLayers);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const toggleLayer = (layerId: string) => {
    setLayers(prev =>
      prev.map(layer =>
        layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer
      )
    );
  };

  const currentData = timelineData.find(d => d.year === selectedYear) || timelineData[timelineData.length - 1];

  return (
    <section className="py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Interactive Climate Map
          </h2>
          <p className="text-slate-400">
            Explore historical climate data and infrastructure across the globe
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Map Container with Glassmorphism */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
            {/* Map Area */}
            <div className="relative h-[600px] bg-slate-950">
              <GlobalMap />
              
              {/* Map Overlay Indicators */}
              <div className="absolute top-4 left-4 space-y-2 pointer-events-none">
                {layers.filter(l => l.enabled).map((layer) => {
                  const Icon = layer.icon;
                  return (
                    <motion.div
                      key={layer.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700/50"
                    >
                      <div className={`w-3 h-3 rounded-full ${layer.color}`} />
                      <Icon className="h-4 w-4 text-slate-300" />
                      <span className="text-sm text-slate-300">{layer.name}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-slate-900/80 backdrop-blur-md border-slate-700/50 hover:bg-slate-800/80"
                >
                  <ZoomIn className="h-4 w-4 text-slate-300" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-slate-900/80 backdrop-blur-md border-slate-700/50 hover:bg-slate-800/80"
                >
                  <ZoomOut className="h-4 w-4 text-slate-300" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-slate-900/80 backdrop-blur-md border-slate-700/50 hover:bg-slate-800/80"
                >
                  <Maximize2 className="h-4 w-4 text-slate-300" />
                </Button>
              </div>

              {/* Current Data Overlay */}
              <div className="absolute bottom-24 left-4 right-4 md:right-auto md:w-80">
                <Card className="bg-slate-900/80 backdrop-blur-md border-slate-700/50">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Temperature Anomaly</div>
                        <div className="text-2xl font-bold text-red-400">
                          +{currentData.temperature.toFixed(1)}°C
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">CO₂ Level</div>
                        <div className="text-2xl font-bold text-orange-400">
                          {currentData.co2} ppm
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Timeline Slider */}
            <div className="bg-slate-900/90 backdrop-blur-md border-t border-slate-700/50 p-6">
              <div className="flex items-center gap-4">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Historical Timeline</span>
                    <span className="text-lg font-bold text-white">{selectedYear}</span>
                  </div>
                  <Slider
                    value={[selectedYear]}
                    onValueChange={(value) => setSelectedYear(value[0])}
                    min={1950}
                    max={2023}
                    step={1}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-slate-500">1950</span>
                    <span className="text-xs text-slate-500">2023</span>
                  </div>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  {showDetails ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Key Events */}
              {currentData.events.length > 0 && (
                <div className="mt-4 space-y-1">
                  {currentData.events.map((event, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {event}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Side Panel with Glassmorphism */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 right-0 w-80 h-full"
              >
                <Card className="h-full bg-slate-900/90 backdrop-blur-md border-slate-700/50 rounded-l-2xl rounded-r-none overflow-y-auto">
                  <CardHeader className="border-b border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <Layers className="h-5 w-5" />
                        Data Layers
                      </CardTitle>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setShowDetails(false)}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6 space-y-4">
                    {/* Layer Toggles */}
                    {layers.map((layer) => {
                      const Icon = layer.icon;
                      return (
                        <div key={layer.id} className="space-y-2">
                          <div
                            onClick={() => toggleLayer(layer.id)}
                            className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 cursor-pointer transition-colors border border-slate-700/30"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded ${layer.color} ${!layer.enabled && 'opacity-30'}`} />
                              <Icon className={`h-5 w-5 ${layer.enabled ? 'text-white' : 'text-slate-500'}`} />
                              <span className={`font-medium ${layer.enabled ? 'text-white' : 'text-slate-500'}`}>
                                {layer.name}
                              </span>
                            </div>
                            <div
                              className={`w-10 h-6 rounded-full transition-colors ${
                                layer.enabled ? 'bg-blue-500' : 'bg-slate-600'
                              } relative`}
                            >
                              <div
                                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                                  layer.enabled && 'translate-x-4'
                                }`}
                              />
                            </div>
                          </div>
                          {layer.enabled && (
                            <p className="text-xs text-slate-400 pl-3">
                              {layer.description}
                            </p>
                          )}
                        </div>
                      );
                    })}

                    {/* Legend */}
                    <div className="mt-8 pt-6 border-t border-slate-700/50">
                      <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Legend
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <span className="text-xs text-slate-400">High Temperature</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <span className="text-xs text-slate-400">Moderate Temperature</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span className="text-xs text-slate-400">Low Temperature</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Factory className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-slate-400">Power Plant</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-3 h-3 text-blue-400" />
                          <span className="text-xs text-slate-400">Active Community</span>
                        </div>
                      </div>
                    </div>

                    {/* Location Details */}
                    {selectedLocation && (
                      <div className="mt-6 pt-6 border-t border-slate-700/50">
                        <h3 className="text-sm font-medium text-white mb-3">Location Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Region</span>
                            <span className="text-white">{selectedLocation}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Local Temp Change</span>
                            <span className="text-red-400">+1.5°C</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Communities</span>
                            <span className="text-white">23</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
