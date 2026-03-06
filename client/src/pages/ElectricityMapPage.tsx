import { useEffect } from "react";

interface Props {
  onNavigate?: (page: string) => void;
}

export function ElectricityMapPage({ onNavigate }: Props) {
  useEffect(() => {
    document.title = "Live Electricity Map — Your Earth";
  }, []);

  return (
    <div
      className="w-full bg-[#050a14]"
      style={{ height: "calc(100vh - 80px)", marginTop: "80px" }}
    >
      <iframe
        src="/electricity_map.html"
        title="Live Global Electricity & Carbon Intensity Map"
        className="w-full h-full border-none block"
        allow="fullscreen"
        data-testid="iframe-electricity-map"
      />
    </div>
  );
}