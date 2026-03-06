import { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  X,
  Loader2,
  ZoomIn,
  ZoomOut,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { projectId, publicAnonKey } from "@/utils/supabase/info";

interface Flight {
  icao24: string;
  callsign: string;
  origin_country: string;
  longitude: number;
  latitude: number;
  baro_altitude: number;
  velocity: number;
  true_track: number;
  vertical_rate: number;
  on_ground: boolean;
  last_contact: number;
}

interface FlightTrackerProps {
  autoRefresh?: boolean;
  onFlightsUpdate?: (count: number) => void;
}

export function FlightTracker({ autoRefresh = true, onFlightsUpdate }: FlightTrackerProps) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSuccessfulFetch, setLastSuccessfulFetch] = useState<number | null>(null);
  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Fetch flights data from OpenSky Network API
  const fetchFlights = async () => {
    try {
      console.log('✈️ Fetching flights data...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73b87161/flights-data`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch flight data');
      }
      
      const data = await response.json();
      
      // Check for error response (API might be down but returned gracefully)
      if (data.error) {
        console.log('⚠️ OpenSky API temporarily unavailable');
        // Set flights to empty array and clear error (don't show error message)
        if (flights.length === 0) {
          setFlights([]);
          setError(null); // Don't show error, just empty state
        }
        setLoading(false);
        return;
      }
      
      // Transform the data - only airborne flights with valid coordinates
      const flightData: Flight[] = (data.states || [])
        .filter((state: any) => 
          state[5] !== null && 
          state[6] !== null && 
          !state[8] && // Not on ground
          state[7] !== null && state[7] > 0 // Has altitude
        )
        .map((state: any) => ({
          icao24: state[0],
          callsign: state[1]?.trim() || 'N/A',
          origin_country: state[2],
          longitude: state[5],
          latitude: state[6],
          baro_altitude: state[7] || 0,
          velocity: state[9] || 0,
          true_track: state[10] || 0,
          vertical_rate: state[11] || 0,
          on_ground: state[8] || false,
          last_contact: state[4],
        }));
      
      console.log(`✅ Loaded ${flightData.length} flights`);
      setFlights(flightData);
      onFlightsUpdate?.(flightData.length);
      setLoading(false);
      setLastSuccessfulFetch(Date.now());
      setError(null); // Clear error on success
    } catch (err) {
      console.log('⚠️ Flight data temporarily unavailable');
      // Don't show error, just set empty state
      if (flights.length === 0) {
        setFlights([]);
        setError(null); // No error message
        setLoading(false);
      }
      // Keep existing flights visible if we have them
    }
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet
    const initMap = async () => {
      const L = (await import('leaflet')).default;
      
      // Create map
      const map = L.map(mapRef.current, {
        zoomControl: false,
      }).setView([20, 0], 3);

      // Add OpenStreetMap tiles (Google Maps style)
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

  // Update flight markers on map
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    const L = require('leaflet');
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers for each flight
    flights.forEach(flight => {
      const color = getAltitudeColor(flight.baro_altitude || 0);
      
      // Create airplane icon SVG
      const planeIcon = L.divIcon({
        html: `
          <div style="transform: rotate(${flight.true_track || 0}deg); display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
            </svg>
          </div>
        `,
        className: 'flight-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker([flight.latitude, flight.longitude], {
        icon: planeIcon,
      }).addTo(mapInstanceRef.current);

      // Add click event
      marker.on('click', () => {
        setSelectedFlight(flight);
      });

      // Add tooltip
      marker.bindTooltip(
        `${flight.callsign} • ${metersToFeet(flight.baro_altitude || 0).toLocaleString()} ft`,
        {
          permanent: false,
          direction: 'top',
          className: 'flight-tooltip'
        }
      );

      markersRef.current.push(marker);
    });
  }, [flights, mapLoaded]);

  // Initial load and auto-refresh
  useEffect(() => {
    fetchFlights();
    
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchFlights();
      }, 15000); // Refresh every 15 seconds (less aggressive to avoid API timeout)

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const metersToFeet = (meters: number) => Math.round(meters * 3.28084);
  const mpsToKnots = (mps: number) => Math.round(mps * 1.94384);

  // Color based on altitude
  const getAltitudeColor = (altitude: number) => {
    if (altitude > 10000) return '#3b82f6'; // Blue
    if (altitude > 5000) return '#10b981';   // Green
    return '#f59e0b';                         // Orange
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

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {/* Leaflet Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Loading Overlay */}
      {loading && flights.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 z-10">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-sm">Loading live flight data...</p>
            <p className="text-xs text-muted-foreground mt-2">Connecting to OpenSky Network</p>
          </div>
        </div>
      )}

      {/* Non-intrusive Error Toast */}
      {error && (
        <motion.div 
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-orange-500/95 text-white px-4 py-2 rounded-lg z-10 flex items-center gap-2 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <div className="text-sm">
            <span className="">{error}</span>
            {lastSuccessfulFetch && (
              <div className="text-xs opacity-90 mt-0.5">
                Showing last known data
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomIn}
          className="bg-background/90 backdrop-blur-sm"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomOut}
          className="bg-background/90 backdrop-blur-sm"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border z-10 text-xs">
        <h4 className="text-sm mb-2">Altitude Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>&gt; 10,000 ft</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>5,000 - 10,000 ft</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>&lt; 5,000 ft</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
          <strong>{flights.length}</strong> flights tracked
          {lastSuccessfulFetch && error && (
            <div className="text-xs text-orange-500 mt-1">
              ⚠️ Live updates paused
            </div>
          )}
        </div>
      </div>

      {/* Selected Flight Info */}
      {selectedFlight && (
        <motion.div 
          className="absolute top-4 right-20 bg-background/95 backdrop-blur-sm p-4 rounded-lg border max-w-xs z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              <h4>Flight Details</h4>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedFlight(null)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Callsign:</span>
              <span className="">{selectedFlight.callsign}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ICAO24:</span>
              <span className="font-mono text-xs">{selectedFlight.icao24}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Country:</span>
              <span>{selectedFlight.origin_country}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Altitude:</span>
              <span>{metersToFeet(selectedFlight.baro_altitude || 0).toLocaleString()} ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Speed:</span>
              <span>{mpsToKnots(selectedFlight.velocity || 0)} kts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Heading:</span>
              <span>{Math.round(selectedFlight.true_track || 0)}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Position:</span>
              <span className="font-mono text-xs">
                {selectedFlight.latitude.toFixed(2)}°, {selectedFlight.longitude.toFixed(2)}°
              </span>
            </div>
            {selectedFlight.vertical_rate !== 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vertical Rate:</span>
                <span className={selectedFlight.vertical_rate > 0 ? 'text-green-500' : 'text-orange-500'}>
                  {selectedFlight.vertical_rate > 0 ? '↑' : '↓'} {Math.abs(Math.round(selectedFlight.vertical_rate * 196.85))} ft/min
                </span>
              </div>
            )}
            
            <div className="pt-3 border-t mt-3">
              <p className="text-xs text-muted-foreground">
                💡 A typical flight emits ~90kg CO₂ per passenger per hour
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Data Source Attribution */}
      <div className="absolute bottom-4 right-4 bg-background/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground z-10">
        Live data from OpenSky Network
      </div>

      {/* Custom CSS for Leaflet */}
      <style>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
        
        .flight-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .flight-tooltip {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 11px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .leaflet-container {
          font-family: inherit;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}