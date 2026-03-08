import { useState, useEffect } from "react";
import { Globe, AlertTriangle, Zap, BarChart3, Network, ChevronDown } from "lucide-react";

interface Props {
  onNavigate?: (page: string) => void;
  initialMap?: string;
}

const MAPS = [
  { id: "infrastructure", label: "Infrastructure", icon: Globe, src: "/renewables_map.html", description: "Global power plants, renewables & industrial sites" },
  { id: "disaster", label: "Disasters", icon: AlertTriangle, src: "/disasters.html", description: "Global climate disasters & extreme events" },
  { id: "electricity", label: "Electricity", icon: Zap, src: "/electricity_map.html", description: "Real-time carbon intensity & electricity mix" },
  { id: "emissions", label: "Emissions", icon: BarChart3, src: "/emissions_map.html", description: "Climate TRACE emissions sources by sector & year" },
  { id: "network", label: "User Network", icon: Network, src: "/user_network.html", description: "Global community connections on a 3D globe" },
] as const;

type MapId = typeof MAPS[number]["id"];

export function YourGlobePage({ onNavigate, initialMap }: Props) {
  const [activeMap, setActiveMap] = useState<MapId>(
    (initialMap as MapId) || "infrastructure"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const current = MAPS.find((m) => m.id === activeMap) || MAPS[0];

  useEffect(() => {
    document.title = `${current.label} — Your Globe — Your Earth`;
  }, [current.label]);

  useEffect(() => {
    const handleClick = () => setDropdownOpen(false);
    if (dropdownOpen) document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [dropdownOpen]);

  return (
    <div className="w-full bg-[#050a14]" style={{ height: "calc(100vh - 80px)", marginTop: "80px" }}>
      {/* Floating map switcher */}
      <div className="absolute top-[92px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-1">
        {/* Desktop: inline tabs */}
        <div className="hidden md:flex items-center bg-black/70 backdrop-blur-xl rounded-full border border-white/10 p-1 shadow-2xl">
          {MAPS.map((map) => {
            const Icon = map.icon;
            const isActive = map.id === activeMap;
            return (
              <button
                key={map.id}
                onClick={() => setActiveMap(map.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white/15 text-white shadow-inner"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
                title={map.description}
              >
                <Icon className="w-3.5 h-3.5" />
                {map.label}
              </button>
            );
          })}
        </div>

        {/* Mobile: dropdown */}
        <div className="md:hidden relative">
          <button
            onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
            className="flex items-center gap-2 bg-black/70 backdrop-blur-xl rounded-full border border-white/10 px-4 py-2 text-white text-sm font-medium shadow-2xl cursor-pointer"
          >
            <current.icon className="w-4 h-4" />
            {current.label}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden min-w-[200px]">
              {MAPS.map((map) => {
                const Icon = map.icon;
                return (
                  <button
                    key={map.id}
                    onClick={() => { setActiveMap(map.id); setDropdownOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors cursor-pointer ${
                      map.id === activeMap ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <div className="text-left">
                      <div className="font-medium">{map.label}</div>
                      <div className="text-[10px] text-white/40 leading-tight">{map.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <iframe
        key={activeMap}
        src={current.src}
        title={current.label}
        className="w-full h-full border-none block"
        allow="fullscreen"
      />
    </div>
  );
}
