import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  ZoomIn,
  ZoomOut,
  Thermometer,
  Factory,
  Sun,
  Wind,
  Atom,
  Fuel,
} from "lucide-react";
import { motion } from "framer-motion";

interface DataPoint {
  x?: number;
  y?: number;
  latitude?: number;
  longitude?: number;
  [key: string]: any;
}

interface InteractiveMapViewProps {
  data: DataPoint[];
  activeView: string;
  onPointClick: (point: DataPoint) => void;
  getColor?: (point: DataPoint) => string;
  getIcon?: (point: DataPoint) => any;
  getSize?: (point: DataPoint) => number;
}

export function InteractiveMapView({
  data,
  activeView,
  onPointClick,
  getColor,
  getIcon,
  getSize,
}: InteractiveMapViewProps) {
  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Convert percentage coordinates to lat/lng if needed
  const getLatLng = (point: DataPoint) => {
    if (
      point.latitude !== undefined &&
      point.longitude !== undefined
    ) {
      return [point.latitude, point.longitude];
    }
    // Convert x/y percentages to lat/lng
    const lat = 90 - (point.y || 0) * 1.8; // y: 0-100 -> lat: 90 to -90
    const lng = (point.x || 0) * 3.6 - 180; // x: 0-100 -> lng: -180 to 180
    return [lat, lng];
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      const map = L.map(mapRef.current, {
        zoomControl: false,
      }).setView([20, 0], 3);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        },
      ).addTo(map);

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

  // Update markers when data or view changes
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    const L = require("leaflet");

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers based on active view
    data.forEach((point) => {
      const [lat, lng] = getLatLng(point);
      let marker;

      if (activeView === "temperature") {
        const color = getColor?.(point) || "#3b82f6";
        const icon = L.divIcon({
          html: `
            <div style="
              width: 16px;
              height: 16px;
              background-color: ${color};
              border: 2px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
              </svg>
            </div>
          `,
          className: "data-marker",
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        marker = L.marker([lat, lng], { icon }).addTo(
          mapInstanceRef.current,
        );
        marker.bindTooltip(
          `<strong>${point.country}</strong><br/>${point.temp}°C<br/>${point.change > 0 ? "+" : ""}${point.change}°C change`,
          { direction: "top", className: "custom-tooltip" },
        );
      } else if (activeView === "co2") {
        const color = getColor?.(point) || "#ef4444";
        const size = getSize?.(point) || 16;
        const icon = L.divIcon({
          html: `
            <div style="
              width: ${size}px;
              height: ${size}px;
              background-color: ${color};
              border: 2px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0.8;
            ">
              <svg width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="m21.5 12.5-1.556-4.667a2 2 0 0 0-1.897-1.333H18a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v7"/>
                <path d="M16 16a2 2 0 1 0 0 4 2 2 0 1 0 0-4z"/>
                <path d="M8 16a2 2 0 1 0 0 4 2 2 0 1 0 0-4z"/>
                <path d="M12 18H5a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2h7"/>
              </svg>
            </div>
          `,
          className: "data-marker",
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        marker = L.marker([lat, lng], { icon }).addTo(
          mapInstanceRef.current,
        );
        marker.bindTooltip(
          `<strong>${point.country}</strong><br/>${point.emissions} Mt CO₂/year<br/>${point.change > 0 ? "+" : ""}${point.change}% change`,
          { direction: "top", className: "custom-tooltip" },
        );
      } else if (activeView === "power") {
        const color = getColor?.(point) || "#6b7280";
        const iconSvg =
          point.type === "solar"
            ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>'
            : point.type === "wind"
              ? '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>'
              : point.type === "nuclear"
                ? '<circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>'
                : '<path d="m21.5 12.5-1.556-4.667a2 2 0 0 0-1.897-1.333H18a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v7"/>';

        const icon = L.divIcon({
          html: `
            <div style="
              width: 24px;
              height: 24px;
              background-color: ${color};
              border: 2px solid white;
              border-radius: 6px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                ${iconSvg}
              </svg>
            </div>
          `,
          className: "data-marker",
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        marker = L.marker([lat, lng], { icon }).addTo(
          mapInstanceRef.current,
        );
        marker.bindTooltip(
          `<strong>${point.name}</strong><br/>${point.country}<br/>${point.capacity}<br/>${point.type}`,
          { direction: "top", className: "custom-tooltip" },
        );
      } else if (activeView === "community") {
        const icon = L.divIcon({
          html: `
            <div style="position: relative;">
              <div style="
                width: 32px;
                height: 32px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                overflow: hidden;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 12px;
              ">
                ${point.initials || "?"}
              </div>
              <div style="
                position: absolute;
                bottom: -2px;
                right: -2px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: ${point.status === "online" ? "#10b981" : "#f59e0b"};
                border: 2px solid white;
              "></div>
            </div>
          `,
          className: "data-marker",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        marker = L.marker([lat, lng], { icon }).addTo(
          mapInstanceRef.current,
        );
        marker.bindTooltip(
          `<strong>${point.name}</strong><br/>${point.city}, ${point.country}<br/>${point.expertise}<br/><span style="color: ${point.status === "online" ? "#10b981" : "#f59e0b"}">${point.status}</span>`,
          { direction: "top", className: "custom-tooltip" },
        );

        // Add pulse effect for online members
        if (point.status === "online") {
          const pulseCircle = L.circle([lat, lng], {
            radius: 100000, // 100km radius
            color: "#10b981",
            fillColor: "#10b981",
            fillOpacity: 0,
            weight: 2,
            opacity: 0,
          }).addTo(mapInstanceRef.current);

          let opacity = 0.6;
          let growing = false;
          const pulseInterval = setInterval(() => {
            opacity = growing ? opacity + 0.05 : opacity - 0.05;
            if (opacity <= 0) growing = true;
            if (opacity >= 0.6) growing = false;
            pulseCircle.setStyle({
              opacity: opacity,
              fillOpacity: opacity * 0.3,
            });
          }, 100);

          markersRef.current.push({
            remove: () => {
              clearInterval(pulseInterval);
              pulseCircle.remove();
            },
          });
        }
      }

      if (marker) {
        marker.on("click", () => onPointClick(point));
        markersRef.current.push(marker);
      }
    });
  }, [data, activeView, mapLoaded]);

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
      <div ref={mapRef} className="w-full h-full" />

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

      {/* Custom CSS */}
      <style>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
        
        .data-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .custom-tooltip {
          background: rgba(0, 0, 0, 0.85);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 6px 10px;
          font-size: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        
        .custom-tooltip strong {
          font-weight: 600;
        }
        
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}