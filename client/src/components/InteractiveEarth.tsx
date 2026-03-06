import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/glass/GlassCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Thermometer, 
  Factory, 
  Zap, 
  Wind, 
  Sun, 
  Atom, 
  Fuel,
  Info,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Eye,
  EyeOff,
  Users,
  MapPin,
  Clock,
  Plane,
  AlertTriangle,
  Maximize2,
  Minimize2,
  Flame,
  Droplet
} from "lucide-react";

import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { MapViewToggle } from "./MapViewToggle";
import dottedWorldMap from '@/assets/649ed38e5c2f915692ba14a3d93e86d0f28d2f13.png';
import climateDataGif from '@/assets/fa4e365597fe5691d96561dcd64593ed0e59e0e9.png';
import { FlightTracker } from "./FlightTracker";
import { InteractiveMapView } from "./InteractiveMapView";
import { ClimateRiskMap } from "./ClimateRiskMap";
import { GlobalTemperatureMap } from "./GlobalTemperatureMap";
import { CoalPowerMap } from "./CoalPowerMap";
import { OilGasMap } from "./OilGasMap";

// Mock climate data
const temperatureData = [
  { country: "Arctic", x: 50, y: 15, temp: -15.2, change: +2.1 },
  { country: "Russia", x: 70, y: 25, temp: -5.8, change: +1.8 },
  { country: "Canada", x: 25, y: 25, temp: -3.2, change: +1.5 },
  { country: "USA", x: 20, y: 40, temp: 12.8, change: +0.9 },
  { country: "Europe", x: 52, y: 35, temp: 9.4, change: +1.2 },
  { country: "China", x: 78, y: 42, temp: 14.7, change: +1.1 },
  { country: "India", x: 72, y: 52, temp: 25.3, change: +0.8 },
  { country: "Africa", x: 52, y: 60, temp: 22.1, change: +1.0 },
  { country: "Brazil", x: 32, y: 70, temp: 24.9, change: +0.7 },
  { country: "Australia", x: 82, y: 75, temp: 21.9, change: +1.3 },
  { country: "Antarctica", x: 50, y: 90, temp: -18.7, change: +1.9 }
];

const co2Data = [
  { country: "China", x: 78, y: 42, emissions: 10065, change: -2.1 },
  { country: "USA", x: 20, y: 40, emissions: 5416, change: -5.2 },
  { country: "India", x: 72, y: 52, emissions: 2654, change: +1.8 },
  { country: "Russia", x: 70, y: 25, emissions: 1711, change: -3.0 },
  { country: "Japan", x: 85, y: 42, emissions: 1162, change: -4.1 },
  { country: "Germany", x: 52, y: 35, emissions: 759, change: -6.3 },
  { country: "South Korea", x: 82, y: 42, emissions: 616, change: -2.8 },
  { country: "Canada", x: 25, y: 25, emissions: 572, change: -1.9 },
  { country: "Brazil", x: 32, y: 70, emissions: 462, change: +2.3 },
  { country: "UK", x: 50, y: 35, emissions: 368, change: -8.1 }
];

const powerPlantData = [
  // Solar
  { type: "solar", x: 28, y: 45, name: "Mojave Solar", capacity: "280 MW", country: "USA", status: "operating" },
  { type: "solar", x: 35, y: 68, name: "Noor Complex", capacity: "580 MW", country: "Morocco", status: "operating" },
  { type: "solar", x: 75, y: 52, name: "Kamuthi Solar", capacity: "648 MW", country: "India", status: "operating" },
  { type: "solar", x: 80, y: 75, name: "Kurnool Solar", capacity: "1000 MW", country: "Australia", status: "operating" },
  
  // Wind
  { type: "wind", x: 52, y: 30, name: "Hornsea One", capacity: "1200 MW", country: "UK", status: "operating" },
  { type: "wind", x: 25, y: 35, name: "Shepherds Flat", capacity: "845 MW", country: "USA", status: "operating" },
  { type: "wind", x: 78, y: 35, name: "Gansu Wind", capacity: "7965 MW", country: "China", status: "operating" },
  { type: "wind", x: 54, y: 30, name: "Kriegers Flak", capacity: "600 MW", country: "Denmark", status: "operating" },
  
  // Nuclear
  { type: "nuclear", x: 53, y: 38, name: "Flamanville", capacity: "1650 MW", country: "France", status: "operating" },
  { type: "nuclear", x: 22, y: 42, name: "Vogtle", capacity: "2234 MW", country: "USA", status: "operating" },
  { type: "nuclear", x: 85, y: 45, name: "Kashiwazaki", capacity: "8212 MW", country: "Japan", status: "operating" },
  { type: "nuclear", x: 75, y: 30, name: "Balakovo", capacity: "4000 MW", country: "Russia", status: "operating" },
  
  // Fossil Fuels
  { type: "fossil", x: 76, y: 40, name: "Tuoketuo", capacity: "6720 MW", country: "China", status: "operating" },
  { type: "fossil", x: 24, y: 45, name: "W.A. Parish", capacity: "3653 MW", country: "USA", status: "operating" },
  { type: "fossil", x: 74, y: 50, name: "Mundra", capacity: "4620 MW", country: "India", status: "operating" },
  { type: "fossil", x: 68, y: 25, name: "Surgut-2", capacity: "5597 MW", country: "Russia", status: "operating" }
];

// Community members data
const communityMembersData = [
  { name: "Alex Chen", x: 78, y: 42, city: "Beijing", country: "China", expertise: "Solar Energy", status: "online", avatar: "https://images.unsplash.com/photo-1758600432264-b8d2a0fd7d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzU4NzYxNzk0fDA&ixlib=rb-4.1.0&q=80&w=1080", initials: "AC" },
  { name: "Emma Silva", x: 32, y: 70, city: "São Paulo", country: "Brazil", expertise: "Forest Conservation", status: "online", avatar: "https://images.unsplash.com/photo-1712168567859-e24cbc155219?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbm8lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODc2MTgwMXww&ixlib=rb-4.1.0&q=80&w=1080", initials: "ES" },
  { name: "David Johnson", x: 20, y: 40, city: "Seattle", country: "USA", expertise: "Wind Power", status: "online", avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODY0MjcyNXww&ixlib=rb-4.1.0&q=80&w=1080", initials: "DJ" },
  { name: "Priya Patel", x: 72, y: 52, city: "Mumbai", country: "India", expertise: "Sustainable Agriculture", status: "away", avatar: "https://images.unsplash.com/flagged/photo-1573582677725-863b570e3c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4NzEzOTk5fDA&ixlib=rb-4.1.0&q=80&w=1080", initials: "PP" },
  { name: "Lars Andersson", x: 54, y: 25, city: "Stockholm", country: "Sweden", expertise: "Climate Policy", status: "online", avatar: "https://images.unsplash.com/photo-1657152042392-c1f39e52e7c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTg2OTY4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080", initials: "LA" },
  { name: "Sophie Dubois", x: 50, y: 35, city: "Paris", country: "France", expertise: "Green Technology", status: "online", avatar: "https://images.unsplash.com/flagged/photo-1573582677725-863b570e3c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4NzEzOTk5fDA&ixlib=rb-4.1.0&q=80&w=1080", initials: "SD" },
  { name: "Kofi Asante", x: 48, y: 58, city: "Accra", country: "Ghana", expertise: "Renewable Energy", status: "away", avatar: "https://images.unsplash.com/photo-1668752741330-8adc5cef7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg3NjE3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080", initials: "KA" },
  { name: "Maria Rodriguez", x: 15, y: 55, city: "Mexico City", country: "Mexico", expertise: "Urban Planning", status: "online", avatar: "https://images.unsplash.com/photo-1712168567859-e24cbc155219?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbm8lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODc2MTgwMXww&ixlib=rb-4.1.0&q=80&w=1080", initials: "MR" },
  { name: "Yuki Tanaka", x: 85, y: 42, city: "Tokyo", country: "Japan", expertise: "Ocean Conservation", status: "online", avatar: "https://images.unsplash.com/photo-1758600432264-b8d2a0fd7d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzU4NzYxNzk0fDA&ixlib=rb-4.1.0&q=80&w=1080", initials: "YT" },
  { name: "Ahmed Hassan", x: 58, y: 55, city: "Cairo", country: "Egypt", expertise: "Desert Solar", status: "away", avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODY0MjcyNXww&ixlib=rb-4.1.0&q=80&w=1080", initials: "AH" },
  { name: "Fatima Al-Zahra", x: 65, y: 50, city: "Dubai", country: "UAE", expertise: "Green Buildings", status: "online", avatar: "https://images.unsplash.com/photo-1668752741330-8adc5cef7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg3NjE3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080", initials: "FA" },
  { name: "Isabella Romano", x: 52, y: 38, city: "Rome", country: "Italy", expertise: "Mediterranean Ecology", status: "online", avatar: "https://images.unsplash.com/flagged/photo-1573582677725-863b570e3c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4NzEzOTk5fDA&ixlib=rb-4.1.0&q=80&w=1080", initials: "IR" }
];

const EarthSVG = ({ showCountries = true }: { showCountries?: boolean }) => (
  <div className="w-full h-full relative">
    {/* Custom dotted world map image */}
    {showCountries && (
      <ImageWithFallback
        src={dottedWorldMap}
        alt="Dotted World Map"
        className="w-full h-full object-contain"
      />
    )}
    
    {/* Ocean background for when map is not shown */}
    {!showCountries && (
      <div className="w-full h-full bg-gradient-to-br from-blue-800 to-blue-900" />
    )}
  </div>
);

export function InteractiveEarth() {
  const [activeView, setActiveView] = useState("temperature");
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [showLegend, setShowLegend] = useState(true);
  const [flightCount, setFlightCount] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const [mapViewMode, setMapViewMode] = useState<"2d" | "3d">("2d");

  const handleMapViewChange = (view: "2d" | "3d") => {
    setMapViewMode(view);
    // Add your 2D/3D map transition logic here
    console.log(`Map view changed to: ${view}`);
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < -10) return "#1e40af"; // Cold blue
    if (temp < 0) return "#3b82f6";   // Blue
    if (temp < 10) return "#06b6d4";  // Light blue
    if (temp < 20) return "#10b981";  // Green
    if (temp < 30) return "#f59e0b";  // Orange
    return "#ef4444";                 // Hot red
  };

  const getCO2Color = (emissions: number) => {
    if (emissions < 500) return "#10b981";   // Low - Green
    if (emissions < 1000) return "#f59e0b";  // Medium - Orange
    if (emissions < 3000) return "#f97316";  // High - Red-orange
    return "#ef4444";                        // Very high - Red
  };

  const getPowerPlantIcon = (type: string) => {
    switch (type) {
      case "solar": return Sun;
      case "wind": return Wind;
      case "nuclear": return Atom;
      case "fossil": return Factory;
      default: return Zap;
    }
  };

  const getPowerPlantColor = (type: string) => {
    switch (type) {
      case "solar": return "#f59e0b";
      case "wind": return "#06b6d4";
      case "nuclear": return "#8b5cf6";
      case "fossil": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const renderDataPoints = () => {
    if (activeView === "temperature") {
      return temperatureData.map((point, index) => {
        const IconComponent = Thermometer;
        return (
          <motion.div
            key={`temp-${index}`}
            className="absolute cursor-pointer group"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              backgroundColor: getTemperatureColor(point.temp)
            }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.5, zIndex: 10 }}
            onClick={() => setSelectedPoint(point)}
          >
            <div 
              className="w-4 h-4 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              style={{ backgroundColor: getTemperatureColor(point.temp) }}
            >
              <IconComponent className="h-2 w-2 text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
              <div className="bg-background border rounded-lg p-3 shadow-lg min-w-32 text-center">
                <div className="font-medium text-sm">{point.country}</div>
                <div className="text-lg font-bold">{point.temp}°C</div>
                <div className={`text-xs ${point.change > 0 ? 'text-red-500' : 'text-blue-500'}`}>
                  {point.change > 0 ? '+' : ''}{point.change}°C change
                </div>
              </div>
            </div>
          </motion.div>
        );
      });
    }

    if (activeView === "co2") {
      return co2Data.map((point, index) => {
        const size = Math.min(Math.max(point.emissions / 200, 8), 24);
        return (
          <motion.div
            key={`co2-${index}`}
            className="absolute cursor-pointer group"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.2, opacity: 1, zIndex: 10 }}
            onClick={() => setSelectedPoint(point)}
          >
            <div 
              className="rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              style={{ 
                backgroundColor: getCO2Color(point.emissions),
                width: size,
                height: size
              }}
            >
              <Factory className="text-white" style={{ width: size * 0.4, height: size * 0.4 }} />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
              <div className="bg-background border rounded-lg p-3 shadow-lg min-w-36 text-center">
                <div className="font-medium text-sm">{point.country}</div>
                <div className="text-lg font-bold">{point.emissions} Mt</div>
                <div className={`text-xs ${point.change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {point.change > 0 ? '+' : ''}{point.change}% change
                </div>
              </div>
            </div>
          </motion.div>
        );
      });
    }

    if (activeView === "power") {
      return powerPlantData.map((point, index) => {
        const IconComponent = getPowerPlantIcon(point.type);
        return (
          <motion.div
            key={`power-${index}`}
            className="absolute cursor-pointer group"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.3, zIndex: 10 }}
            onClick={() => setSelectedPoint(point)}
          >
            <div 
              className="w-6 h-6 rounded-lg border-2 border-white shadow-lg flex items-center justify-center"
              style={{ backgroundColor: getPowerPlantColor(point.type) }}
            >
              <IconComponent className="h-3 w-3 text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
              <div className="bg-background border rounded-lg p-3 shadow-lg min-w-40 text-center">
                <div className="font-medium text-sm">{point.name}</div>
                <div className="text-xs text-muted-foreground">{point.country}</div>
                <div className="font-bold">{point.capacity}</div>
                <Badge variant="secondary" className="text-xs mt-1">
                  {point.type.charAt(0).toUpperCase() + point.type.slice(1)}
                </Badge>
              </div>
            </div>
          </motion.div>
        );
      });
    }

    if (activeView === "community") {
      return communityMembersData.map((member, index) => {
        return (
          <motion.div
            key={`member-${index}`}
            className="absolute cursor-pointer group"
            style={{
              left: `${member.x}%`,
              top: `${member.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.4, zIndex: 10 }}
            onClick={() => setSelectedPoint(member)}
          >
            <div className="relative">
              <Avatar className="w-8 h-8 border-2 border-white shadow-lg">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
              </Avatar>
              
              {/* Online status indicator */}
              <div 
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
              <div className="bg-background border rounded-lg p-3 shadow-lg min-w-48 text-center">
                <Avatar className="w-12 h-12 mx-auto mb-2 border-2 border-muted">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <div className="font-medium text-sm">{member.name}</div>
                <div className="text-xs text-muted-foreground">{member.city}, {member.country}</div>
                <div className="text-xs font-medium mt-1">{member.expertise}</div>
                <Badge variant={member.status === 'online' ? 'default' : 'secondary'} className="text-xs mt-2">
                  {member.status}
                </Badge>
              </div>
            </div>
          </motion.div>
        );
      });
    }

    if (activeView === "historical") {
      // For historical view, we don't render data points but return null 
      // since the historical data will be displayed as a replacement for the map
      return null;
    }

    if (activeView === "flights") {
      // For flights view, we don't render data points but return null 
      // since the flight data will be displayed as a replacement for the map
      return null;
    }

    return null;
  };

  const renderLegend = () => {
    if (!showLegend) return null;

    if (activeView === "temperature") {
      return (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Temperature (°C)</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#1e40af" }}></div>
              <span className="text-xs">&lt; -10°C</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3b82f6" }}></div>
              <span className="text-xs">-10 to 0°C</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#06b6d4" }}></div>
              <span className="text-xs">0 to 10°C</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10b981" }}></div>
              <span className="text-xs">10 to 20°C</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f59e0b" }}></div>
              <span className="text-xs">20 to 30°C</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ef4444" }}></div>
              <span className="text-xs">&gt; 30°C</span>
            </div>
          </div>
        </div>
      );
    }

    if (activeView === "co2") {
      return (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">CO₂ Emissions (Mt/year)</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#10b981" }}></div>
              <span className="text-xs">&lt; 500 Mt</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f59e0b" }}></div>
              <span className="text-xs">500-1000 Mt</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#f97316" }}></div>
              <span className="text-xs">1000-3000 Mt</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: "#ef4444" }}></div>
              <span className="text-xs">&gt; 3000 Mt</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Circle size represents emission volume</p>
        </div>
      );
    }

    if (activeView === "power") {
      return (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Coal Plant Status</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ef4444" }}></div>
              <span className="text-xs">Operating</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f97316" }}></div>
              <span className="text-xs">Construction</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f59e0b" }}></div>
              <span className="text-xs">Planned</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#6b7280" }}></div>
              <span className="text-xs">Retired</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10b981" }}></div>
              <span className="text-xs">Cancelled</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Circle size = capacity, opacity = CO₂ emissions
          </p>
        </div>
      );
    }

    if (activeView === "community") {
      return (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Community Members</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Avatar className="w-4 h-4">
                  <AvatarFallback className="text-xs bg-muted">👤</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 border border-white" />
              </div>
              <span className="text-xs">Online (with pulse)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Avatar className="w-4 h-4">
                  <AvatarFallback className="text-xs bg-muted">👤</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-yellow-500 border border-white" />
              </div>
              <span className="text-xs">Away</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {communityMembersData.filter(m => m.status === 'online').length} members online with green pulse circles
          </p>
        </div>
      );
    }

    if (activeView === "historical") {
      return (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Temperature Scale (°C)</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-xs">Cold (-30°C)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Moderate (0°C)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span className="text-xs">Hot (+30°C)</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Historical temperature data from 1940 showing global climate patterns
          </p>
        </div>
      );
    }

    if (activeView === "flights") {
      return (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Live Flights</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-xs">Active Flights: {flightCount}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Real-time flight data showing current air traffic
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Data Visualization Controls */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Views</CardTitle>
                <CardDescription>Choose what to display</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
                  <TabsList className="grid grid-cols-1 gap-1 h-auto">
                    <TabsTrigger 
                      value="temperature" 
                      className="flex items-center space-x-2 justify-start"
                    >
                      <Thermometer className="h-4 w-4" />
                      <span>Temperature</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="co2" 
                      className="flex items-center space-x-2 justify-start"
                    >
                      <Factory className="h-4 w-4" />
                      <span>CO₂ Emissions</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="power" 
                      className="flex items-center space-x-2 justify-start"
                    >
                      <Flame className="h-4 w-4" />
                      <span>Coal Plants</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="community" 
                      className="flex items-center space-x-2 justify-start"
                    >
                      <Users className="h-4 w-4" />
                      <span>Community</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="risk" 
                      className="flex items-center space-x-2 justify-start"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <span>Climate Risk</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="historical" 
                      className="flex items-center space-x-2 justify-start"
                    >
                      <Clock className="h-4 w-4" />
                      <span>Historical</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="flights" 
                      className="flex items-center space-x-2 justify-start"
                    >
                      <Plane className="h-4 w-4" />
                      <span>Live Flights</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="oilgas" 
                      className="flex items-center space-x-2 justify-start"
                    >
                      <Droplet className="h-4 w-4" />
                      <span>Oil & Gas</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="mt-4 flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLegend(!showLegend)}
                  >
                    {showLegend ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="ml-2">{showLegend ? 'Hide' : 'Show'} Legend</span>
                  </Button>
                </div>

                {/* Legend */}
                {showLegend && (
                  <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                    {renderLegend()}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Interactive Globe */}
          <div className={isMaximized ? "lg:col-span-5" : "lg:col-span-4"}>
            <Card className={`${isMaximized ? "h-[800px]" : "h-[600px]"} flex flex-col relative z-0`}>
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">Global Data Visualization</CardTitle>
                    <CardDescription>
                      {activeView === 'temperature' && 'Global temperature data and climate change indicators'}
                      {activeView === 'co2' && 'Carbon dioxide emissions by country'}
                      {activeView === 'power' && 'Power generation facilities worldwide'}
                      {activeView === 'community' && 'Active community members around the world'}
                      {activeView === 'risk' && 'Climate risk assessment for different regions'}
                      {activeView === 'historical' && 'Historical climate data from 1940 showing temperature patterns'}
                      {activeView === 'flights' && 'Real-time flight data showing current air traffic'}
                      {activeView === 'oilgas' && 'Global oil and gas infrastructure facilities'}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {activeView === 'temperature' && `${temperatureData.length} regions`}
                      {activeView === 'co2' && `${co2Data.length} countries`}
                      {activeView === 'power' && `${powerPlantData.length} facilities`}
                      {activeView === 'community' && `${communityMembersData.length} members`}
                      {activeView === 'risk' && 'Global Risk Map'}
                      {activeView === 'historical' && 'D2M Snapshot 1940'}
                      {activeView === 'flights' && 'Live Flights'}
                    </Badge>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsMaximized(!isMaximized)}
                      title={isMaximized ? "Minimize" : "Maximize"}
                    >
                      {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 min-h-0">
                {/* 2D/3D Map Toggle */}
                <MapViewToggle
                  onViewChange={handleMapViewChange}
                  initialView={mapViewMode}
                  isLoading={false}
                  webGLSupported={true}
                  showFPS={mapViewMode === "3d"}
                />
                
                {activeView === "temperature" ? (
                  /* Global Temperature Map - Climate Reanalyzer Style */
                  <GlobalTemperatureMap autoRefresh={true} refreshInterval={300000} />
                ) : activeView === "power" ? (
                  /* Coal Power Plants Map - Carbon Brief Style */
                  <CoalPowerMap onPlantClick={setSelectedPoint} />
                ) : activeView === "oilgas" ? (
                  /* Oil & Gas Infrastructure Map */
                  <OilGasMap onPlantClick={setSelectedPoint} />
                ) : activeView === "risk" ? (
                  /* Climate Risk View from Probable Futures */
                  <ClimateRiskMap riskType="days-above-32c" />
                ) : activeView === "flights" ? (
                  /* Live Flight Tracking View */
                  <FlightTracker autoRefresh={true} onFlightsUpdate={setFlightCount} />
                ) : activeView === "historical" ? (
                  /* Historical Climate Data View */
                  <div className="relative w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden border">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <div className="relative max-w-full max-h-full">
                        <ImageWithFallback
                          src={climateDataGif}
                          alt="D2M snapshot 1940 temperature data showing global climate patterns"
                          className="w-full h-full max-h-[500px] object-contain rounded-lg"
                        />
                        
                        {/* Overlay with data information */}
                        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
                          <div className="text-sm font-medium">D2M Snapshot 1940 (°C)</div>
                          <div className="text-xs opacity-90">Historical Temperature Data</div>
                        </div>
                        
                        {/* Legend indicator */}
                        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
                          <div className="text-xs">
                            <span className="inline-block w-3 h-3 bg-blue-600 rounded mr-2"></span>
                            Cold (-30°C)
                            <span className="inline-block w-3 h-3 bg-red-600 rounded mr-2 ml-4"></span>
                            Hot (+30°C)
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  /* Interactive Map View with Google Maps Style Background */
                  <InteractiveMapView
                    data={
                      activeView === 'temperature' ? temperatureData :
                      activeView === 'co2' ? co2Data :
                      activeView === 'power' ? powerPlantData :
                      activeView === 'community' ? communityMembersData :
                      []
                    }
                    activeView={activeView}
                    onPointClick={setSelectedPoint}
                    getColor={(point) => {
                      if (activeView === 'temperature') return getTemperatureColor(point.temp);
                      if (activeView === 'co2') return getCO2Color(point.emissions);
                      if (activeView === 'power') return getPowerPlantColor(point.type);
                      return '#3b82f6';
                    }}
                    getSize={(point) => {
                      if (activeView === 'co2') {
                        return Math.min(Math.max(point.emissions / 200, 8), 24);
                      }
                      return 16;
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Selected Point Details */}
        <AnimatePresence>
          {selectedPoint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {selectedPoint.country || selectedPoint.name}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPoint(null)}
                    >
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {activeView === 'power' && selectedPoint && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-2">{selectedPoint.capacity ? `${selectedPoint.capacity} MW` : selectedPoint.capacity || 'N/A'}</div>
                        <div className="text-sm text-muted-foreground">Capacity</div>
                      </div>
                      <div className="text-center">
                        <Badge 
                          variant="secondary" 
                          className="text-lg p-2"
                          style={selectedPoint.status ? { 
                            backgroundColor: selectedPoint.status === 'operating' ? '#fee2e2' : 
                                             selectedPoint.status === 'construction' ? '#ffedd5' :
                                             selectedPoint.status === 'planned' ? '#fef3c7' :
                                             selectedPoint.status === 'retired' ? '#f3f4f6' :
                                             '#d1fae5'
                          } : {}}
                        >
                          {selectedPoint.status ? 
                            selectedPoint.status.charAt(0).toUpperCase() + selectedPoint.status.slice(1) :
                            selectedPoint.type ? selectedPoint.type.charAt(0).toUpperCase() + selectedPoint.type.slice(1) : 'N/A'
                          }
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-2">{selectedPoint.status ? 'Status' : 'Energy Source'}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-2">{selectedPoint.country || 'N/A'}</div>
                        <div className="text-sm text-muted-foreground">Location</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-2">
                          {selectedPoint.status === 'cancelled' ? '✅' : 
                           selectedPoint.status === 'retired' ? '⚠️' :
                           selectedPoint.type === 'fossil' ? '❌' : 
                           selectedPoint.status ? '🔥' : '✅'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {selectedPoint.status === 'cancelled' ? 'Good News!' :
                           selectedPoint.status === 'retired' ? 'Phased Out' :
                           selectedPoint.status ? 'Coal Power' : 'Clean Energy'}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeView === 'temperature' && selectedPoint && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">{selectedPoint.temp}°C</div>
                        <div className="text-sm text-muted-foreground">Current Temperature</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${selectedPoint.change > 0 ? 'text-red-500' : 'text-blue-500'}`}>
                          {selectedPoint.change > 0 ? '+' : ''}{selectedPoint.change}°C
                        </div>
                        <div className="text-sm text-muted-foreground">Change Since 1990</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">
                          {selectedPoint.change > 0 ? '🔥' : '❄️'}
                        </div>
                        <div className="text-sm text-muted-foreground">Trend</div>
                      </div>
                    </div>
                  )}
                  
                  {activeView === 'co2' && selectedPoint && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">{selectedPoint.emissions}</div>
                        <div className="text-sm text-muted-foreground">Mt CO₂/year</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${selectedPoint.change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {selectedPoint.change > 0 ? '+' : ''}{selectedPoint.change}%
                        </div>
                        <div className="text-sm text-muted-foreground">Annual Change</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">
                          {Math.round(selectedPoint.emissions / 80)} kg
                        </div>
                        <div className="text-sm text-muted-foreground">Per Capita/year</div>
                      </div>
                    </div>
                  )}
                  
                  {activeView === 'community' && selectedPoint && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-2">{selectedPoint.name}</div>
                        <div className="text-sm text-muted-foreground">Member Name</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold mb-2">{selectedPoint.city}</div>
                        <div className="text-sm text-muted-foreground">{selectedPoint.country}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium mb-2">{selectedPoint.expertise}</div>
                        <div className="text-sm text-muted-foreground">Expertise</div>
                      </div>
                      <div className="text-center">
                        <Badge variant={selectedPoint.status === 'online' ? 'default' : 'secondary'} className="text-lg p-2">
                          {selectedPoint.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-2">Status</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}