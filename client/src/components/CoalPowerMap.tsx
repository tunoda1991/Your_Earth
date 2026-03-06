import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { projectId, publicAnonKey } from "@/utils/supabase/info";
import { 
  Factory,
  Flame,
  AlertCircle,
  Construction,
  XCircle,
  CheckCircle,
  Info,
  ZoomIn,
  ZoomOut,
  Maximize2,
  TrendingUp,
  TrendingDown,
  Database,
  Calendar
} from 'lucide-react';

interface CoalPowerMapProps {
  onPlantClick?: (plant: any) => void;
}

export function CoalPowerMap({ onPlantClick }: CoalPowerMapProps) {
  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [coalPowerPlants, setCoalPowerPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [filters, setFilters] = useState({
    operating: true,
    construction: true,
    planned: true,
    retired: false,
    cancelled: false
  });

  // Load coal plant data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log('Fetching full coal plant dataset from server...');
        
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-73b87161/coal-plants-full`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server response error:', errorText);
          throw new Error(`Server returned error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.dataSourceUnavailable) {
          console.log('⚠️ Data source unavailable, showing empty dataset');
          setCoalPowerPlants([]);
          setLoadError('External data source temporarily unavailable.');
        } else {
          console.log(`Successfully loaded ${data.totalPlants} coal plants from full dataset`);
          setCoalPowerPlants(data.plants);
        }
        
        setLoading(false);
        
      } catch (error) {
        console.log('⚠️ Error fetching coal plant data, showing empty dataset');
        setCoalPowerPlants([]);
        setLoadError('External data source temporarily unavailable.');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'operating':
        return { color: '#ef4444', icon: Factory, label: 'Operating', size: 1.0 };
      case 'construction':
        return { color: '#f97316', icon: Construction, label: 'Under Construction', size: 0.8 };
      case 'planned':
        return { color: '#eab308', icon: AlertCircle, label: 'Planned', size: 0.6 };
      case 'retired':
        return { color: '#6b7280', icon: XCircle, label: 'Retired', size: 0.7 };
      case 'cancelled':
        return { color: '#10b981', icon: CheckCircle, label: 'Cancelled', size: 0.5 };
      default:
        return { color: '#6b7280', icon: Factory, label: 'Unknown', size: 1.0 };
    }
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      
      const map = L.map(mapRef.current, {
        zoomControl: false,
        minZoom: 2,
        maxZoom: 10,
        worldCopyJump: true
      }).setView([30, 15], 2);

      // Light base map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
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

  // Render coal plants based on filters and year range
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    const updateMarkers = async () => {
      const L = (await import('leaflet')).default;
      
      // Clear existing markers
      mapInstanceRef.current.eachLayer((layer: any) => {
        if (layer instanceof L.CircleMarker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Filter plants based on current filters and selected year
      const visiblePlants = coalPowerPlants.filter(plant => {
        // Status filter
        if (!filters[plant.status as keyof typeof filters]) return false;
        
        // Year-based filtering logic
        // Determine what status the plant had in the selected year
        const startYear = plant.startYear;
        const retireYear = plant.retireYear;
        
        // Skip plants with no year data
        if (!startYear) return false;
        
        // Operating: Plant started on or before selected year AND (not retired OR retired after selected year)
        if (plant.status === 'operating') {
          if (startYear > selectedYear) return false; // Not built yet
          if (retireYear && retireYear <= selectedYear) return false; // Already retired by this year
          return true;
        }
        
        // Retired: Plant was retired on or before selected year
        if (plant.status === 'retired') {
          if (!retireYear) return false;
          return retireYear <= selectedYear && startYear <= selectedYear;
        }
        
        // Construction/Planned: Show if start year is close to selected year (within 5 years)
        if (plant.status === 'construction' || plant.status === 'planned') {
          return Math.abs(startYear - selectedYear) <= 5 && startYear >= selectedYear;
        }
        
        // Cancelled: Show if it was cancelled around this time (no precise date, so show if start year is near)
        if (plant.status === 'cancelled') {
          return Math.abs(startYear - selectedYear) <= 5;
        }
        
        return true;
      });

      // Add markers for each visible plant
      visiblePlants.forEach((plant) => {
        const config = getStatusConfig(plant.status);
        
        // Size based on capacity
        const baseRadius = 4;
        const capacityRadius = Math.sqrt(plant.capacity / 100) * 2;
        const radius = Math.min(baseRadius + capacityRadius * config.size, 20);
        
        // Color intensity based on CO2 emissions
        let color = config.color;
        let fillOpacity = 0.7;
        
        if (plant.annualCO2) {
          // Higher CO2 = more intense color
          fillOpacity = Math.min(0.4 + (plant.annualCO2 / 10), 0.95);
        }

        const marker = L.circleMarker([plant.lat, plant.lng], {
          radius: radius,
          fillColor: color,
          color: '#ffffff',
          weight: 2,
          opacity: 0.9,
          fillOpacity: fillOpacity
        }).bindPopup(
          `<div style="min-width: 250px;">
            <strong style="font-size: 14px;">${plant.name}</strong><br/>
            <div style="margin-top: 6px; color: #666;">
              <strong>Country:</strong> ${plant.country}<br/>
              <strong>Capacity:</strong> ${plant.capacity.toLocaleString()} MW<br/>
              <strong>Status:</strong> <span style="color: ${config.color}; font-weight: bold;">${config.label}</span><br/>
              ${plant.startYear ? `<strong>Start Year:</strong> ${plant.startYear}<br/>` : ''}
              ${plant.retireYear ? `<strong>Retire Year:</strong> ${plant.retireYear}<br/>` : ''}
              ${plant.annualCO2 ? `<strong>Annual CO₂:</strong> ${plant.annualCO2.toFixed(2)} Mt/year<br/>` : ''}
              ${plant.owner ? `<strong>Owner:</strong> ${plant.owner}<br/>` : ''}
              <strong>Region:</strong> ${plant.region}
            </div>
          </div>`,
          {
            maxWidth: 350
          }
        );

        marker.on('click', () => {
          if (onPlantClick) {
            onPlantClick(plant);
          }
        });

        marker.addTo(mapInstanceRef.current);
      });
    };

    updateMarkers();
  }, [filters, selectedYear, mapLoaded, coalPowerPlants, onPlantClick]);

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
      mapInstanceRef.current.setView([30, 15], 2);
    }
  };

  const toggleFilter = (status: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  const getFilteredCount = (status: string) => {
    return coalPowerPlants.filter(p => p.status === status).length;
  };

  const getTotalCapacity = () => {
    return coalPowerPlants
      .filter(plant => filters[plant.status as keyof typeof filters])
      .reduce((sum, plant) => sum + plant.capacity, 0);
  };

  const getVisibleCount = () => {
    return coalPowerPlants.filter(plant => {
      if (!filters[plant.status as keyof typeof filters]) return false;
      
      const startYear = plant.startYear;
      const retireYear = plant.retireYear;
      
      if (!startYear) return false;
      
      if (plant.status === 'operating') {
        if (startYear > selectedYear) return false;
        if (retireYear && retireYear <= selectedYear) return false;
        return true;
      }
      
      if (plant.status === 'retired') {
        if (!retireYear) return false;
        return retireYear <= selectedYear && startYear <= selectedYear;
      }
      
      if (plant.status === 'construction' || plant.status === 'planned') {
        return Math.abs(startYear - selectedYear) <= 5 && startYear >= selectedYear;
      }
      
      if (plant.status === 'cancelled') {
        return Math.abs(startYear - selectedYear) <= 5;
      }
      
      return true;
    }).length;
  };
  
  const getTotalCO2 = () => {
    return coalPowerPlants
      .filter(plant => {
        if (!filters[plant.status as keyof typeof filters]) return false;
        
        const startYear = plant.startYear;
        const retireYear = plant.retireYear;
        
        if (!startYear) return false;
        
        if (plant.status === 'operating') {
          if (startYear > selectedYear) return false;
          if (retireYear && retireYear <= selectedYear) return false;
          return true;
        }
        
        if (plant.status === 'retired') {
          if (!retireYear) return false;
          return retireYear <= selectedYear && startYear <= selectedYear;
        }
        
        if (plant.status === 'construction' || plant.status === 'planned') {
          return Math.abs(startYear - selectedYear) <= 5 && startYear >= selectedYear;
        }
        
        if (plant.status === 'cancelled') {
          return Math.abs(startYear - selectedYear) <= 5;
        }
        
        return true;
      })
      .reduce((sum, plant) => sum + (plant.annualCO2 || 0), 0);
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-100">
      <div ref={mapRef} className="w-full h-full" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-20 flex items-center justify-center">
          <Card className="p-6">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm">Loading coal plant data...</p>
            </div>
          </Card>
        </div>
      )}

      {/* Header - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="bg-background/95 backdrop-blur-sm border-2 shadow-xl">
          <div className="p-4 space-y-3 max-w-[280px]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20">
                <Flame className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Global Coal Power Plants</h3>
                <p className="text-xs text-muted-foreground">Worldwide distribution</p>
              </div>
            </div>

            <div className="pt-2 border-t space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Visible Plants:</span>
                <span className="font-semibold">{getVisibleCount()}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Total Capacity:</span>
                <span className="font-semibold">{getTotalCapacity().toLocaleString()} MW</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Total CO₂:</span>
                <span className="font-semibold">{getTotalCO2().toFixed(2)} Mt/year</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <Card className="bg-background/95 backdrop-blur-sm border shadow-xl">
          <div className="p-4 space-y-3 min-w-[240px]">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Factory className="h-4 w-4" />
              Filter by Status
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <Label htmlFor="operating" className="text-xs cursor-pointer">
                    Operating ({getFilteredCount('operating')})
                  </Label>
                </div>
                <Switch
                  id="operating"
                  checked={filters.operating}
                  onCheckedChange={() => toggleFilter('operating')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <Label htmlFor="construction" className="text-xs cursor-pointer">
                    Construction ({getFilteredCount('construction')})
                  </Label>
                </div>
                <Switch
                  id="construction"
                  checked={filters.construction}
                  onCheckedChange={() => toggleFilter('construction')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <Label htmlFor="planned" className="text-xs cursor-pointer">
                    Planned ({getFilteredCount('planned')})
                  </Label>
                </div>
                <Switch
                  id="planned"
                  checked={filters.planned}
                  onCheckedChange={() => toggleFilter('planned')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                  <Label htmlFor="retired" className="text-xs cursor-pointer">
                    Retired ({getFilteredCount('retired')})
                  </Label>
                </div>
                <Switch
                  id="retired"
                  checked={filters.retired}
                  onCheckedChange={() => toggleFilter('retired')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <Label htmlFor="cancelled" className="text-xs cursor-pointer">
                    Cancelled ({getFilteredCount('cancelled')})
                  </Label>
                </div>
                <Switch
                  id="cancelled"
                  checked={filters.cancelled}
                  onCheckedChange={() => toggleFilter('cancelled')}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Statistics - Bottom Left */}
      <div className="absolute bottom-4 left-4 z-10">
        <Card className="bg-background/95 backdrop-blur-sm border shadow-xl">
          <div className="p-3 space-y-2">
            <h4 className="font-semibold text-xs mb-2">Global Statistics</h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Total Plants:</span>
                <span className="font-semibold">{coalPowerPlants.length}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Operating:</span>
                <span className="font-semibold text-red-500">{getFilteredCount('operating')}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Planned/Building:</span>
                <span className="font-semibold text-yellow-600">
                  {getFilteredCount('construction') + getFilteredCount('planned')}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Retired:</span>
                <span className="font-semibold text-gray-500">{getFilteredCount('retired')}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Cancelled:</span>
                <span className="font-semibold text-green-600">{getFilteredCount('cancelled')}</span>
              </div>
            </div>
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

      {/* Data Source Badge */}
      <div className="absolute top-20 left-4 z-10">
        <Badge className="bg-blue-600 text-white shadow-lg">
          <Info className="h-3 w-3 mr-1" />
          Global Energy Monitor Data
        </Badge>
      </div>

      {/* Year Filter - Below Data Source Badge */}
      <div className="absolute top-28 left-4 z-10 w-64">
        <Card className="bg-background/95 backdrop-blur-sm border shadow-xl">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Filter by Year
              </Label>
              <span className="text-xs text-muted-foreground">
                {selectedYear}
              </span>
            </div>
            <Slider
              min={1950}
              max={2030}
              step={1}
              value={[selectedYear]}
              onValueChange={(value) => setSelectedYear(value[0])}
              className="w-full"
            />
          </div>
        </Card>
      </div>

      {/* Leaflet CSS */}
      <style>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
      `}</style>
    </div>
  );
}