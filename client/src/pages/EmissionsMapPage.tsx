import { useEffect } from "react";

interface Props {
  onNavigate?: (page: string) => void;
}

export function EmissionsMapPage({ onNavigate }: Props) {
  useEffect(() => {
    document.title = "Emissions Map — Your Earth";
  }, []);

  return (
    <div
      className="w-full bg-[#050a14]"
      style={{ height: "calc(100vh - 80px)", marginTop: "80px" }}
    >
      <iframe
        src="/emissions_map.html"
        title="Emissions Sources Map"
        className="w-full h-full border-none block"
        allow="fullscreen"
        data-testid="iframe-emissions-map"
      />
    </div>
  );
}
