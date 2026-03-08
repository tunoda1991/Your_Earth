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
    <div className="relative w-full bg-[#050a14]" style={{ height: "calc(100vh - 80px)", marginTop: "80px" }}>
      <div className="absolute top-[92px] left-[160px] z-50">
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
            className="flex items-center gap-2 border border-[#1a2f45] px-4 py-[6px] text-[9px] font-medium tracking-[.18em] uppercase cursor-pointer transition-all duration-200"
            style={{
              background: "rgba(6,13,26,0.94)",
              backdropFilter: "blur(8px)",
              color: "#7ab3cc",
              fontFamily: "'Courier New', monospace",
            }}
          >
            <current.icon className="w-3.5 h-3.5" />
            {current.label}
            <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <div
              className="absolute top-full mt-1 left-0 border border-[#1a2f45] overflow-hidden min-w-[220px]"
              style={{
                background: "rgba(6,13,26,0.97)",
                backdropFilter: "blur(12px)",
              }}
            >
              {MAPS.map((map) => {
                const Icon = map.icon;
                const isActive = map.id === activeMap;
                return (
                  <button
                    key={map.id}
                    onClick={() => { setActiveMap(map.id); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-[8px] transition-colors cursor-pointer"
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "9px",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: isActive ? "#7ab3cc" : "#3a5a7a",
                      background: isActive ? "rgba(122,179,204,0.12)" : "transparent",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{map.label}</span>
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
