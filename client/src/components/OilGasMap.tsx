import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Factory, Flame, Droplet } from 'lucide-react';
import { projectId, publicAnonKey } from "@/utils/supabase/info";

interface OilGasPlant {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  capacity: number;
  type: 'oil' | 'gas' | 'mixed';
  status: string;
  fuel: string;
  year: number | null;
  owner: string;
  city: string;
  region: string;
  wikiUrl: string;
}

interface OilGasMapProps {
  onPlantClick?: (plant: OilGasPlant) => void;
}

export function OilGasMap({ onPlantClick }: OilGasMapProps) {
  const [plants, setPlants] = useState<OilGasPlant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapInstanceRef = useRef<any>(null);
  const markerClusterGroupRef = useRef<any>(null);

  const [stats, setStats] = useState({
    total: 0,
    totalCapacity: 0,
    byType: { oil: 0, gas: 0, mixed: 0 },
    byStatus: {} as Record<string, number>,
  });

  console.log('🏭 OilGasMap component mounted/rendered, loading:', loading, 'plants:', plants.length);

  // Callback ref for map initialization
  const mapRef = useRef<HTMLDivElement | null>(null);
  const setMapRef = React.useCallback((node: HTMLDivElement | null) => {
    if (node && !mapInstanceRef.current) {
      console.log('🗺️ Map ref attached, initializing map...');
      mapRef.current = node;
      initializeMap(node);
    }
  }, []);

  // Initialize map function
  const initializeMap = async (container: HTMLDivElement) => {
    if (mapInstanceRef.current) {
      console.log('⏭️ Map already initialized');
      return;
    }

    try {
      console.log('🗺️ Initializing Oil & Gas map...');
      
      // Import Leaflet and MarkerCluster
      const L = (await import('leaflet')).default;
      await import('leaflet');
      
      // Create map
      const map = L.map(container, {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 18,
        worldCopyJump: true,
      });

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      setMapLoaded(true);
      console.log('✅ Map initialized successfully');
    } catch (err) {
      console.error('❌ Map initialization error:', err);
      setError('Failed to initialize map');
    }
  };

  // Fetch data from server
  useEffect(() => {
    fetchOilGasData();

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const fetchOilGasData = async () => {
    try {
      setLoading(true);
      console.log('📥 [v2] Fetching Oil & Gas data from backend server...');

      // Fetch from our backend server (which handles CORS)
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73b87161/oil-gas-plants-data`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.status}`);
      }

      const csvText = await response.text();
      console.log(`✅ CSV loaded: ${csvText.length} bytes`);

      // Check if data source is unavailable
      const dataSourceUnavailable = response.headers.get('X-Data-Source-Unavailable') === 'true';
      
      if (dataSourceUnavailable || csvText.length === 0) {
        console.log('⚠️ Data source unavailable, showing empty dataset');
        setPlants([]);
        calculateStats([]);
        setError('External data source temporarily unavailable.');
        setLoading(false);
        return;
      }

      const parsedData = parseCSV(csvText);
      console.log(`✅ Parsed ${parsedData.length} plants`);

      setPlants(parsedData);
      calculateStats(parsedData);
      setLoading(false);
    } catch (err) {
      console.log('⚠️ Error fetching data, showing empty dataset');
      setPlants([]);
      calculateStats([]);
      setError('External data source temporarily unavailable.');
      setLoading(false);
    }
  };

  const parseCSV = (csvText: string): OilGasPlant[] => {
    const lines = csvText.split('\n');
    if (lines.length < 2) return [];

    // Parse header
    const headers = parseCSVLine(lines[0]);
    console.log('📋 CSV Headers:', headers.slice(0, 10));

    // Find column indices
    const getIndex = (names: string[]) => {
      for (const name of names) {
        const idx = headers.findIndex(h => h.toLowerCase().trim() === name.toLowerCase());
        if (idx !== -1) return idx;
      }
      return -1;
    };

    const indices = {
      id: getIndex(['GEM unit ID']),
      name: getIndex(['Plant name']),
      country: getIndex(['Country/Area']),
      lat: getIndex(['Latitude']),
      lng: getIndex(['Longitude']),
      capacity: getIndex(['Capacity (MW)']),
      status: getIndex(['Status']),
      fuel: getIndex(['Fuel']),
      year: getIndex(['Start year']),
      owner: getIndex(['Owner(s)']),
      city: getIndex(['City']),
      region: getIndex(['Region']),
      wiki: getIndex(['Wiki URL']),
    };

    console.log('📍 Column indices:', indices);

    // Parse data rows
    const plants: OilGasPlant[] = [];
    let skipped = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = parseCSVLine(line);
      
      // Extract coordinates
      const lat = parseFloat(values[indices.lat] || '');
      const lng = parseFloat(values[indices.lng] || '');

      if (isNaN(lat) || isNaN(lng)) {
        skipped++;
        continue;
      }

      // Determine plant type from fuel
      const fuel = (values[indices.fuel] || '').toLowerCase();
      let type: 'oil' | 'gas' | 'mixed' = 'gas';
      
      if (fuel.includes('oil') && fuel.includes('gas')) {
        type = 'mixed';
      } else if (fuel.includes('oil') || fuel.includes('petroleum')) {
        type = 'oil';
      } else if (fuel.includes('gas')) {
        type = 'gas';
      }

      plants.push({
        id: values[indices.id] || `plant-${i}`,
        name: values[indices.name] || 'Unknown Plant',
        country: values[indices.country] || 'Unknown',
        latitude: lat,
        longitude: lng,
        capacity: parseFloat(values[indices.capacity] || '0') || 0,
        type,
        status: values[indices.status] || 'unknown',
        fuel: values[indices.fuel] || '',
        year: parseInt(values[indices.year] || '') || null,
        owner: values[indices.owner] || '',
        city: values[indices.city] || '',
        region: values[indices.region] || '',
        wikiUrl: values[indices.wiki] || '',
      });
    }

    console.log(`✅ Parsed ${plants.length} plants (skipped ${skipped} invalid rows)`);
    return plants;
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const calculateStats = (plants: OilGasPlant[]) => {
    const byType = { oil: 0, gas: 0, mixed: 0 };
    const byStatus: Record<string, number> = {};
    let totalCapacity = 0;

    plants.forEach(plant => {
      byType[plant.type]++;
      totalCapacity += plant.capacity;
      
      const status = plant.status.split(' ')[0]; // Get first word (operating, cancelled, etc)
      byStatus[status] = (byStatus[status] || 0) + 1;
    });

    setStats({
      total: plants.length,
      totalCapacity,
      byType,
      byStatus,
    });
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'oil': return '#92400e'; // Brown
      case 'gas': return '#dc2626'; // Red
      case 'mixed': return '#ea580c'; // Orange
      default: return '#6b7280';
    }
  };

  // Render markers with clustering
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || plants.length === 0) return;

    const renderMarkers = async () => {
      const L = (await import('leaflet')).default;

      // Remove existing marker cluster group
      if (markerClusterGroupRef.current) {
        mapInstanceRef.current.removeLayer(markerClusterGroupRef.current);
      }

      console.log(`🎨 Rendering ${plants.length} markers with clustering...`);

      // Create marker cluster group
      const markerClusterGroup = (L as any).markerClusterGroup({
        chunkedLoading: true,
        chunkInterval: 200,
        chunkDelay: 50,
        maxClusterRadius: 80,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
      });

      // Add markers to cluster group
      plants.forEach(plant => {
        const color = getTypeColor(plant.type);
        const size = Math.min(Math.max(Math.sqrt(plant.capacity) / 10, 6), 16);

        // Create custom marker icon
        const iconHtml = `
          <div style="
            background-color: ${color};
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>
        `;

        const icon = L.divIcon({
          html: iconHtml,
          className: 'oil-gas-marker',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const marker = L.marker([plant.latitude, plant.longitude], { icon });

        // Add popup
        const popupContent = `
          <div style="min-width: 200px;">
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${plant.name}</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 8px;">${plant.city ? plant.city + ', ' : ''}${plant.country}</div>
            <div style="display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap;">
              <span style="background: ${color}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; text-transform: capitalize;">
                ${plant.type}
              </span>
              ${plant.capacity > 0 ? `<span style="background: #e5e7eb; padding: 2px 8px; border-radius: 4px; font-size: 11px;">${plant.capacity.toFixed(0)} MW</span>` : ''}
            </div>
            <div style="font-size: 11px; color: #666; line-height: 1.5;">
              <div><strong>Status:</strong> ${plant.status}</div>
              ${plant.fuel ? `<div><strong>Fuel:</strong> ${plant.fuel}</div>` : ''}
              ${plant.year ? `<div><strong>Start year:</strong> ${plant.year}</div>` : ''}
              ${plant.owner ? `<div style="margin-top: 4px;"><strong>Owner:</strong> ${plant.owner}</div>` : ''}
            </div>
            ${plant.wikiUrl ? `<div style="margin-top: 8px;"><a href="${plant.wikiUrl}" target="_blank" style="color: #2563eb; font-size: 11px;">View on GEM Wiki →</a></div>` : ''}
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on('click', () => {
          onPlantClick?.(plant);
        });

        markerClusterGroup.addLayer(marker);
      });

      mapInstanceRef.current.addLayer(markerClusterGroup);
      markerClusterGroupRef.current = markerClusterGroup;

      console.log('✅ Markers rendered with clustering');
    };

    renderMarkers();
  }, [plants, mapLoaded]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading global oil & gas infrastructure...</p>
          <p className="text-sm text-muted-foreground mt-2">Fetching data from Global Energy Monitor</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-red-500">
          <p className="font-medium">Failed to load data</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden" style={{ minHeight: '600px' }}>
      {/* Map Container */}
      <div ref={setMapRef} className="w-full h-full" style={{ minHeight: '600px' }} />

      {/* Stats Overlay */}
      <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm border rounded-lg p-4 shadow-lg z-10 max-w-[280px]">
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Factory className="h-4 w-4 text-primary" />
              <span className="font-semibold">{stats.total.toLocaleString()} Facilities</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {(stats.totalCapacity / 1000).toFixed(1)} GW Total Capacity
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getTypeColor('oil') }} />
                <span>Oil</span>
              </div>
              <span className="text-muted-foreground">{stats.byType.oil.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getTypeColor('gas') }} />
                <span>Gas</span>
              </div>
              <span className="text-muted-foreground">{stats.byType.gas.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getTypeColor('mixed') }} />
                <span>Mixed</span>
              </div>
              <span className="text-muted-foreground">{stats.byType.mixed.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Badge */}
      <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-lg z-10">
        <div className="text-xs text-muted-foreground">
          Data: Global Energy Monitor
        </div>
      </div>

      {/* Leaflet CSS */}
      <style>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
        @import url('https://unpkg.com/leaflet@1.5.3/dist/MarkerCluster.css');
        @import url('https://unpkg.com/leaflet@1.5.3/dist/MarkerCluster.Default.css');
        
        .oil-gas-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-container {
          font-family: inherit;
          background: #f8fafc;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
        }
        
        .marker-cluster-small,
        .marker-cluster-medium,
        .marker-cluster-large {
          background-color: rgba(220, 38, 38, 0.6);
        }
        
        .marker-cluster-small div,
        .marker-cluster-medium div,
        .marker-cluster-large div {
          background-color: rgba(220, 38, 38, 0.8);
          color: white;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}