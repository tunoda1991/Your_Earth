import { useState, useEffect } from "react";

interface Props {
  onNavigate?: (page: string) => void;
  initialMap?: string;
}

const MAPS = [
  { id: "infrastructure", label: "Infrastructure", src: "/renewables_map.html", description: "Global power plants, renewables & industrial sites" },
  { id: "disaster", label: "Disasters", src: "/disasters.html", description: "Global climate disasters & extreme events" },
  { id: "electricity", label: "Electricity", src: "/electricity_map.html", description: "Real-time carbon intensity & electricity mix" },
  { id: "emissions", label: "Emissions", src: "/emissions_map.html", description: "Climate TRACE emissions sources by sector & year" },
  { id: "network", label: "User Network", src: "/user_network.html", description: "Global community connections on a 3D globe" },
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
      {/* Map switcher dropdown — positioned top-right, styled to match map UI */}
      <div className="absolute top-[92px] right-[12px] z-50">
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
            className="flex items-center gap-[7px] cursor-pointer"
            style={{
              padding: "7px 14px",
              border: "1px solid #1a2f45",
              background: "rgba(6,13,26,0.94)",
              backdropFilter: "blur(8px)",
              fontFamily: "'Courier New', monospace",
              fontSize: "9px",
              letterSpacing: ".18em",
              textTransform: "uppercase" as const,
              color: "#7ab3cc",
              transition: "all .2s",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7ab3cc", flexShrink: 0 }} />
            {current.label}
            <span style={{
              display: "inline-block",
              marginLeft: 4,
              transition: "transform .2s",
              transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)",
              fontSize: "9px",
              color: "#3a5a7a",
            }}>▾</span>
          </button>
          {dropdownOpen && (
            <div
              className="absolute top-full mt-[4px] right-0"
              style={{
                background: "rgba(6,13,26,0.97)",
                border: "1px solid #1a2f45",
                backdropFilter: "blur(12px)",
                minWidth: "200px",
                zIndex: 60,
              }}
            >
              {MAPS.map((map) => (
                <button
                  key={map.id}
                  onClick={() => { setActiveMap(map.id); setDropdownOpen(false); }}
                  className="w-full text-left cursor-pointer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 14px",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "9px",
                    letterSpacing: ".12em",
                    textTransform: "uppercase" as const,
                    color: map.id === activeMap ? "#7ab3cc" : "#6a8fa8",
                    background: map.id === activeMap ? "rgba(122,179,204,0.08)" : "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(26,47,69,0.5)",
                    transition: "all .15s",
                  }}
                  onMouseEnter={(e) => {
                    if (map.id !== activeMap) e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    if (map.id !== activeMap) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: map.id === activeMap ? "#7ab3cc" : "#3a5a7a",
                    flexShrink: 0,
                  }} />
                  {map.label}
                </button>
              ))}
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
