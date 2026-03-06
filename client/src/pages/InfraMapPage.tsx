import { useEffect } from "react";

interface Props {
  onNavigate?: (page: string) => void;
}

export function InfraMapPage({ onNavigate }: Props) {
  useEffect(() => {
    document.title = "Infrastructure Map — Your Earth";
  }, []);

  return (
    <div
      className="w-full bg-[#050a14]"
      style={{ height: "calc(100vh - 80px)", marginTop: "80px" }}
    >
      <iframe
        src="/renewables_map.html"
        title="Global Infrastructure Map"
        className="w-full h-full border-none block"
        allow="fullscreen"
        data-testid="iframe-infra-map"
      />
    </div>
  );
}
