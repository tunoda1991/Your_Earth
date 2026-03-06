import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Thermometer, 
  RefreshCw,
  Info,
  Calendar,
  Globe,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';

interface GlobalTemperatureMapProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function GlobalTemperatureMap({ autoRefresh = false, refreshInterval = 300000 }: GlobalTemperatureMapProps) {
  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const temperatureLayerRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [opacity, setOpacity] = useState([70]);
  const [temperatureData, setTemperatureData] = useState<any[]>([]);

  // Temperature data grid - simulating Climate Reanalyzer's global coverage
  const generateGlobalTemperatureGrid = () => {
    const grid: any[] = [];
    const currentDate = new Date();
    const month = currentDate.getMonth(); // 0-11
    const isWinterNH = month >= 11 || month <= 2; // Dec, Jan, Feb
    const isSummerNH = month >= 5 && month <= 8; // Jun, Jul, Aug

    // Generate temperature grid points (lat/lng grid)
    for (let lat = -85; lat <= 85; lat += 5) {
      for (let lng = -180; lng <= 175; lng += 5) {
        // Calculate base temperature based on latitude
        let baseTemp = 30 - Math.abs(lat) * 0.5; // Hotter at equator, colder at poles
        
        // Seasonal adjustments
        if (lat > 23.5) { // Northern Hemisphere
          if (isWinterNH) baseTemp -= 10;
          if (isSummerNH) baseTemp += 8;
        } else if (lat < -23.5) { // Southern Hemisphere
          if (isWinterNH) baseTemp += 8;
          if (isSummerNH) baseTemp -= 10;
        }

        // Continental adjustments (land vs ocean)
        // Simulate land masses with higher temperature variability
        const isLand = (
          // North America
          (lng >= -170 && lng <= -50 && lat >= 15 && lat <= 75) ||
          // South America
          (lng >= -85 && lng <= -35 && lat >= -55 && lat <= 15) ||
          // Europe
          (lng >= -10 && lng <= 40 && lat >= 35 && lat <= 70) ||
          // Africa
          (lng >= -20 && lng <= 55 && lat >= -35 && lat <= 38) ||
          // Asia
          (lng >= 40 && lng <= 150 && lat >= -10 && lat <= 75) ||
          // Australia
          (lng >= 110 && lng <= 155 && lat >= -45 && lat <= -10)
        );

        if (isLand) {
          baseTemp += Math.random() * 10 - 5; // More variation on land
        } else {
          baseTemp += Math.random() * 3 - 1.5; // Less variation on ocean
        }

        // Add some regional anomalies
        // Arctic warming
        if (lat > 66) {
          baseTemp += 3;
        }
        
        // Desert regions (hot)
        if ((lng >= -20 && lng <= 55 && lat >= 15 && lat <= 35) || // Sahara
            (lng >= 40 && lng <= 65 && lat >= 20 && lat <= 35)) {  // Middle East
          baseTemp += 8;
        }

        grid.push({
          lat,
          lng,
          temp: parseFloat(baseTemp.toFixed(1)),
          type: isLand ? 'land' : 'ocean'
        });
      }
    }

    return grid;
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      
      const map = L.map(mapRef.current, {
        zoomControl: false,
        minZoom: 2,
        maxZoom: 6,
        worldCopyJump: true
      }).setView([30, 0], 2);

      // Dark base map for better temperature visualization
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      setMapLoaded(true);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Fetch and update temperature data
  const updateTemperatureData = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const data = generateGlobalTemperatureGrid();
      setTemperatureData(data);
      setLastUpdate(new Date());
      setLoading(false);
    }, 1000);
  };

  // Initial data load
  useEffect(() => {
    if (mapLoaded) {
      updateTemperatureData();
    }
  }, [mapLoaded]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh || !mapLoaded) return;

    const interval = setInterval(() => {
      updateTemperatureData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, mapLoaded]);

  // Render temperature layer
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || temperatureData.length === 0) return;

    const updateTemperatureLayer = async () => {
      const L = (await import('leaflet')).default;
      
      // Remove existing layer
      if (temperatureLayerRef.current) {
        mapInstanceRef.current.removeLayer(temperatureLayerRef.current);
      }

      const rectangles: any[] = [];

      temperatureData.forEach((point: any) => {
        const color = getTemperatureColor(point.temp);
        
        // Create rectangle for each grid cell
        const bounds: [[number, number], [number, number]] = [
          [point.lat - 2.5, point.lng - 2.5],
          [point.lat + 2.5, point.lng + 2.5]
        ];

        const rectangle = L.rectangle(bounds, {
          color: color,
          fillColor: color,
          fillOpacity: opacity[0] / 100,
          weight: 0,
          interactive: true
        }).bindTooltip(
          `<div style="text-align: center;">
            <strong>${point.temp > 0 ? '+' : ''}${point.temp}°C</strong><br/>
            <span style="font-size: 10px;">Lat: ${point.lat.toFixed(1)}°, Lng: ${point.lng.toFixed(1)}°</span><br/>
            <span style="font-size: 10px;">${point.type === 'land' ? '🌍 Land' : '🌊 Ocean'}</span>
          </div>`,
          { 
            direction: 'top',
            opacity: 0.95
          }
        );

        rectangles.push(rectangle);
      });

      const layerGroup = L.layerGroup(rectangles);
      layerGroup.addTo(mapInstanceRef.current);
      temperatureLayerRef.current = layerGroup;
    };

    updateTemperatureLayer();
  }, [temperatureData, opacity, mapLoaded]);

  // Color scheme matching Climate Reanalyzer
  const getTemperatureColor = (temp: number): string => {
    if (temp < -40) return '#0d0033';
    if (temp < -30) return '#1a0066';
    if (temp < -20) return '#2600cc';
    if (temp < -10) return '#0040ff';
    if (temp < -5) return '#0080ff';
    if (temp < 0) return '#00bfff';
    if (temp < 5) return '#00ffff';
    if (temp < 10) return '#00ff80';
    if (temp < 15) return '#00ff00';
    if (temp < 20) return '#80ff00';
    if (temp < 25) return '#ffff00';
    if (temp < 30) return '#ffcc00';
    if (temp < 35) return '#ff9900';
    if (temp < 40) return '#ff6600';
    if (temp < 45) return '#ff3300';
    if (temp < 50) return '#cc0000';
    return '#990000';
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleReset = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([30, 0], 2);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-950">
      <div ref={mapRef} className="w-full h-full" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center text-white">
            <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-3" />
            <p className="font-medium">Updating temperature data...</p>
          </div>
        </div>
      )}

      {/* Header Info - Top Left */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <Card className="bg-background/95 backdrop-blur-sm border-2 shadow-xl">
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/20">
                <Thermometer className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Global Temperature Map</h3>
                <p className="text-xs text-muted-foreground">Real-time 2m air temperature</p>
              </div>
            </div>

            <div className="pt-2 border-t space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(lastUpdate)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  Updated: {formatTime(lastUpdate)}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2"
                  onClick={updateTemperatureData}
                  disabled={loading}
                >
                  <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Temperature Legend - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <Card className="bg-background/95 backdrop-blur-sm border shadow-xl">
          <div className="p-3">
            <h4 className="font-semibold text-xs mb-2">Temperature (°C)</h4>
            <div className="space-y-1">
              {[
                { temp: '> 45', color: '#990000' },
                { temp: '40-45', color: '#ff3300' },
                { temp: '35-40', color: '#ff6600' },
                { temp: '30-35', color: '#ff9900' },
                { temp: '25-30', color: '#ffcc00' },
                { temp: '20-25', color: '#ffff00' },
                { temp: '15-20', color: '#80ff00' },
                { temp: '10-15', color: '#00ff00' },
                { temp: '5-10', color: '#00ff80' },
                { temp: '0-5', color: '#00ffff' },
                { temp: '-5-0', color: '#00bfff' },
                { temp: '-10--5', color: '#0080ff' },
                { temp: '-20--10', color: '#0040ff' },
                { temp: '< -20', color: '#2600cc' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div 
                    className="w-6 h-3 rounded border border-white/20"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs">{item.temp}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Opacity Control - Bottom Left */}
      <div className="absolute bottom-4 left-4 z-10">
        <Card className="bg-background/95 backdrop-blur-sm border shadow-xl">
          <div className="p-4 w-[240px]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium">Layer Opacity</label>
              <span className="text-xs text-muted-foreground">{opacity[0]}%</span>
            </div>
            <Slider
              value={opacity}
              onValueChange={setOpacity}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
        </Card>
      </div>

      {/* Zoom Controls - Bottom Right */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomIn}
          className="bg-background/95 backdrop-blur-sm shadow-lg"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomOut}
          className="bg-background/95 backdrop-blur-sm shadow-lg"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleReset}
          className="bg-background/95 backdrop-blur-sm shadow-lg"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Data Info Badge */}
      <div className="absolute top-20 left-4 z-10">
        <Badge className="bg-blue-600 text-white shadow-lg">
          <Info className="h-3 w-3 mr-1" />
          {temperatureData.length} data points
        </Badge>
      </div>

      {/* Leaflet CSS */}
      <style>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
      `}</style>
    </div>
  );
}