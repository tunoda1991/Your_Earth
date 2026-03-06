import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, 
  Globe, 
  ZoomIn, 
  ZoomOut, 
  Home, 
  Camera, 
  Play, 
  Pause,
  Layers
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export function MapVisualizationsTab() {
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [isAnimating, setIsAnimating] = useState(false);
  const [timelineYear, setTimelineYear] = useState(2024);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [activeLayers, setActiveLayers] = useState({
    temperature: true,
    emissions: false,
    renewables: false,
    powerPlants: false,
    seaLevel: false,
    deforestation: false,
    disasters: false,
  });

  const layers = [
    {
      id: 'temperature',
      label: 'Temperature Anomaly',
      icon: '🌡️',
      color: 'from-blue-500 to-red-500',
      source: 'NASA GISS',
      description: 'Red-blue heat map showing temperature variations'
    },
    {
      id: 'emissions',
      label: 'CO2 Emissions',
      icon: '💨',
      color: 'from-purple-500 to-pink-500',
      source: 'Climate TRACE',
      description: 'Purple particle streams showing emission flows'
    },
    {
      id: 'renewables',
      label: 'Renewable Energy Sites',
      icon: '⚡',
      color: 'from-emerald-500 to-green-500',
      source: 'IRENA',
      description: 'Green glowing markers for clean energy'
    },
    {
      id: 'powerPlants',
      label: 'Power Plant Locations',
      icon: '🏭',
      color: 'from-gray-500 to-slate-500',
      source: 'Global Energy Monitor',
      description: 'Coal (black), Gas (gray), Nuclear (blue)'
    },
    {
      id: 'seaLevel',
      label: 'Sea Level Rise Risk',
      icon: '🌊',
      color: 'from-blue-400 to-cyan-500',
      source: 'NOAA',
      description: 'Coastal blue overlay showing at-risk areas'
    },
    {
      id: 'deforestation',
      label: 'Deforestation Hotspots',
      icon: '🌲',
      color: 'from-yellow-600 to-brown-600',
      source: 'Global Forest Watch',
      description: 'Brown-yellow areas of forest loss'
    },
    {
      id: 'disasters',
      label: 'Climate Disasters',
      icon: '⚠️',
      color: 'from-orange-500 to-red-500',
      source: 'EM-DAT',
      description: 'Orange pulsing markers (live data)'
    },
  ];

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId as keyof typeof prev]
    }));
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === '2d' ? '3d' : '2d');
  };

  const handleExport = () => {
    console.log('Exporting screenshot...');
    // Would implement actual screenshot functionality
  };

  const activeLayersList = layers.filter(layer => activeLayers[layer.id as keyof typeof activeLayers]);

  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Main Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden"
          style={{ height: '70vh' }}
        >
          {/* Map Canvas */}
          <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {viewMode === '2d' ? (
                  /* 2D Map View */
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-950" />
                    
                    {/* Map placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl mb-4">🗺️</div>
                        <div className="text-2xl font-bold mb-2">2D Interactive Map</div>
                        <div className="text-slate-400">Flat projection with layer overlays</div>
                      </div>
                    </div>

                    {/* Active Layer Indicators */}
                    {activeLayersList.map((layer, index) => (
                      <motion.div
                        key={layer.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.3 + (index * 0.1), y: 0 }}
                        className={`absolute inset-0 bg-gradient-to-br ${layer.color} mix-blend-overlay pointer-events-none`}
                        style={{ zIndex: index }}
                      />
                    ))}
                  </div>
                ) : (
                  /* 3D Globe View */
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-slate-900 to-slate-950" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.5, rotateY: 0 }}
                        animate={{ scale: 1, rotateY: 360 }}
                        transition={{ 
                          scale: { duration: 0.6 },
                          rotateY: { duration: 20, repeat: Infinity, ease: 'linear' }
                        }}
                        className="text-center"
                      >
                        <div className="text-8xl mb-4 drop-shadow-2xl">🌍</div>
                        <div className="text-2xl font-bold mb-2">3D Interactive Globe</div>
                        <div className="text-slate-400">Rotating sphere with layer overlays</div>
                      </motion.div>
                    </div>

                    {/* Active Layer Glow Effects for 3D */}
                    {activeLayersList.map((layer, index) => (
                      <motion.div
                        key={layer.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        className={`absolute inset-0 bg-gradient-radial ${layer.color} blur-3xl pointer-events-none`}
                        style={{ zIndex: index }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* 2D/3D Toggle Button - Prominent Feature */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-6 right-6 z-50"
            >
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full p-1 shadow-2xl">
                <div className="relative flex items-center w-[140px] h-[48px]">
                  {/* Sliding Background */}
                  <motion.div
                    className="absolute h-full w-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg"
                    initial={false}
                    animate={{
                      x: viewMode === '2d' ? 0 : '100%'
                    }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 400,
                      damping: 30
                    }}
                  />

                  {/* 2D Button */}
                  <button
                    onClick={() => setViewMode('2d')}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-1 h-full rounded-full transition-all duration-300 ${
                      viewMode === '2d' 
                        ? 'text-white' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Map className="w-4 h-4" />
                    <span className="text-sm font-semibold">2D</span>
                  </button>

                  {/* 3D Button */}
                  <button
                    onClick={() => setViewMode('3d')}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-1 h-full rounded-full transition-all duration-300 ${
                      viewMode === '3d' 
                        ? 'text-white' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-semibold">3D</span>
                  </button>
                </div>
              </div>
              
              {/* Toggle Hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-slate-400"
              >
                Switch perspective
              </motion.div>
            </motion.div>

            {/* Layer Toggle Panel - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 left-6 z-40 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 shadow-2xl max-w-xs"
            >
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Data Layers</h3>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {layers.map((layer, index) => (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                      activeLayers[layer.id as keyof typeof activeLayers]
                        ? 'bg-white/10 border-white/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => toggleLayer(layer.id)}
                  >
                    <Checkbox
                      checked={activeLayers[layer.id as keyof typeof activeLayers]}
                      onCheckedChange={() => toggleLayer(layer.id)}
                      className="mt-0.5"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{layer.icon}</span>
                        <span className="text-sm font-medium">{layer.label}</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{layer.description}</p>
                      <Badge variant="outline" className="text-xs bg-white/5 border-white/20">
                        {layer.source}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Zoom Controls - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-24 right-6 z-40 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-2 shadow-2xl flex flex-col gap-2"
            >
              <Button
                size="icon"
                variant="ghost"
                className="bg-white/10 hover:bg-white/20 border border-white/20"
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="bg-white/10 hover:bg-white/20 border border-white/20"
              >
                <ZoomOut className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="bg-white/10 hover:bg-white/20 border border-white/20"
              >
                <Home className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Export Button - Top Right */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-24 right-20 z-40"
            >
              <Button
                onClick={handleExport}
                className="backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 shadow-2xl"
              >
                <Camera className="w-4 h-4 mr-2" />
                Screenshot
              </Button>
            </motion.div>

            {/* Legend Panel - Bottom */}
            {activeLayersList.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-40 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-6 py-3 shadow-2xl"
              >
                <div className="flex items-center gap-6">
                  {activeLayersList.map(layer => (
                    <div key={layer.id} className="flex items-center gap-3">
                      <span className="text-lg">{layer.icon}</span>
                      <div>
                        <div className="text-xs text-slate-400">{layer.label}</div>
                        <div className={`h-2 w-32 rounded-full bg-gradient-to-r ${layer.color} mt-1`} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Time Slider - Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 shadow-2xl w-[600px]"
            >
              <div className="flex items-center gap-4">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsAnimating(!isAnimating)}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 flex-shrink-0"
                >
                  {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Timeline</span>
                    <span className="text-sm font-bold">{timelineYear}</span>
                  </div>
                  <Slider
                    value={[timelineYear]}
                    onValueChange={(value) => setTimelineYear(value[0])}
                    min={2000}
                    max={2024}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>2000</span>
                    <span>2024</span>
                  </div>
                </div>

                <div className="flex gap-1 flex-shrink-0">
                  {[1, 2, 5].map(speed => (
                    <Button
                      key={speed}
                      size="sm"
                      variant={animationSpeed === speed ? 'default' : 'ghost'}
                      onClick={() => setAnimationSpeed(speed)}
                      className={animationSpeed === speed 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                      }
                    >
                      {speed}x
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Active Layers Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Active Visualization Layers</h3>
          
          {activeLayersList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeLayersList.map(layer => (
                <div key={layer.id} className="bg-slate-900/50 border border-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{layer.icon}</span>
                    <div>
                      <h4 className="font-semibold text-sm">{layer.label}</h4>
                      <p className="text-xs text-slate-400">Source: {layer.source}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">{layer.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <Layers className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No layers selected. Choose from the panel to visualize climate data.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
