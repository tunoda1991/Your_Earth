import { useEffect } from "react";

interface Props {
  onNavigate?: (page: string) => void;
}

export function UserNetworkPage({ onNavigate }: Props) {
  useEffect(() => {
    document.title = "User Network — Your Earth";
  }, []);

  return (
    <div
      className="w-full bg-[#050a14]"
      style={{ height: "calc(100vh - 80px)", marginTop: "80px" }}
    >
      <iframe
        src="/user_network.html"
        title="Global User Network"
        className="w-full h-full border-none block"
        allow="fullscreen"
        data-testid="iframe-user-network"
      />
    </div>
  );
}
