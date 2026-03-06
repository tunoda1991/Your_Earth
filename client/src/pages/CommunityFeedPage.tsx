import { useEffect } from "react";

interface Props {
  onNavigate?: (page: string) => void;
  user?: any;
}

export function CommunityFeedPage({ onNavigate, user }: Props) {
  useEffect(() => {
    document.title = "Community Feed — Your Earth";
  }, []);

  return (
    <div className="w-full bg-[#0f172a]" style={{ height: "calc(100vh - 64px)", marginTop: "64px" }}>
      <iframe
        src="/feed.html"
        title="Community Feed"
        className="w-full h-full border-none block"
        allow="fullscreen"
        data-testid="iframe-community-feed"
      />
    </div>
  );
}
