import { useEffect } from "react";

interface Props {
  onNavigate?: (page: string) => void;
}

export function DisasterMapPage({ onNavigate }: Props) {
  useEffect(() => {
    document.title = "Disaster Map — Your Earth";
  }, []);

  return (
    <div className="w-full bg-[#050a14]" style={{ height: "calc(100vh - 80px)", marginTop: "80px" }}>
      <iframe
        src="/disasters.html"
        title="Global Disaster Map"
        className="w-full h-full border-none block"
        allow="fullscreen"
        data-testid="iframe-disaster-map"
      />
    </div>
  );
}
