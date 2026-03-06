import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Globe, AlertCircle } from "lucide-react";

interface MapViewToggleProps {
  onViewChange: (view: "2d" | "3d") => void;
  initialView?: "2d" | "3d";
  isLoading?: boolean;
  webGLSupported?: boolean;
  showFPS?: boolean;
  className?: string;
}

export function MapViewToggle({
  onViewChange,
  initialView = "2d",
  isLoading = false,
  webGLSupported = true,
  showFPS = false,
  className = ""
}: MapViewToggleProps) {
  const [activeView, setActiveView] = useState<"2d" | "3d">(initialView);
  const [fps, setFps] = useState<number>(60);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // FPS monitoring for 3D mode
  useEffect(() => {
    if (activeView === "3d" && showFPS) {
      let lastTime = performance.now();
      let frames = 0;
      let animationFrameId: number;

      const measureFPS = () => {
        frames++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
          setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
          frames = 0;
          lastTime = currentTime;
        }
        
        animationFrameId = requestAnimationFrame(measureFPS);
      };

      animationFrameId = requestAnimationFrame(measureFPS);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [activeView, showFPS]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "2" && activeView !== "2d") {
        handleToggle("2d");
      } else if (e.key === "3" && activeView !== "3d" && webGLSupported) {
        handleToggle("3d");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeView, webGLSupported]);

  const handleToggle = (view: "2d" | "3d") => {
    if (isLoading || (view === "3d" && !webGLSupported)) return;
    
    setActiveView(view);
    onViewChange(view);

    // Announce to screen readers
    const announcement = `Switched to ${view === "2d" ? "2D" : "3D"} view`;
    const ariaLive = document.createElement("div");
    ariaLive.setAttribute("role", "status");
    ariaLive.setAttribute("aria-live", "polite");
    ariaLive.className = "sr-only";
    ariaLive.textContent = announcement;
    document.body.appendChild(ariaLive);
    setTimeout(() => document.body.removeChild(ariaLive), 1000);
  };

  const getFPSColor = () => {
    if (fps >= 50) return "text-green-400";
    if (fps >= 30) return "text-yellow-400";
    return "text-red-400";
  };

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`fixed bottom-6 right-6 z-50 ${className}`}
      >
        <div
          className="relative flex items-center gap-2 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full shadow-lg"
          role="group"
          aria-label="Toggle between 2D and 3D map views"
        >
          {/* 2D Button */}
          <motion.button
            onClick={() => handleToggle("2d")}
            disabled={isLoading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              activeView === "2d"
                ? "bg-gradient-to-br from-green-500 to-green-600 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                : "bg-transparent"
            }`}
            aria-pressed={activeView === "2d"}
            aria-label="Switch to 2D view"
          >
            <Map
              className={`h-5 w-5 transition-colors ${
                activeView === "2d" ? "text-white" : "text-white/60"
              }`}
            />
          </motion.button>

          {/* 3D Button */}
          <motion.button
            onClick={() => handleToggle("3d")}
            disabled={isLoading || !webGLSupported}
            whileHover={webGLSupported ? { scale: 1.1 } : {}}
            whileTap={webGLSupported ? { scale: 0.9 } : {}}
            className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              activeView === "3d"
                ? "bg-gradient-to-br from-green-500 to-green-600 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                : "bg-transparent"
            } ${!webGLSupported ? "opacity-30" : ""}`}
            aria-pressed={activeView === "3d"}
            aria-label={webGLSupported ? "Switch to 3D view" : "3D view not supported"}
          >
            {!webGLSupported ? (
              <AlertCircle className="h-5 w-5 text-red-400" />
            ) : (
              <Globe
                className={`h-5 w-5 transition-colors ${
                  activeView === "3d" ? "text-white" : "text-white/60"
                }`}
              />
            )}
          </motion.button>

          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-full backdrop-blur-sm">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Desktop version
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-5 right-5 z-50 ${className}`}
    >
      <div className="relative">
        {/* Main Toggle Container */}
        <motion.div
          className="relative w-[140px] h-12 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          whileHover={{ scale: 1.05, boxShadow: "0 6px 25px rgba(0,0,0,0.4)" }}
          role="group"
          aria-label="Toggle between 2D and 3D map views"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Sliding White Indicator */}
          <motion.div
            className="absolute top-1 left-1 w-[66px] h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
            initial={false}
            animate={{
              x: activeView === "2d" ? 0 : 68
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              duration: 0.4
            }}
          />

          {/* 2D Button */}
          <button
            onClick={() => handleToggle("2d")}
            disabled={isLoading}
            className="absolute left-0 top-0 w-[70px] h-12 flex items-center justify-center gap-1.5 rounded-l-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            aria-pressed={activeView === "2d"}
            aria-label="Switch to 2D view (Press 2)"
            tabIndex={0}
          >
            <motion.div
              className="flex items-center gap-1.5"
              initial={false}
              animate={{
                color: activeView === "2d" ? "#10b981" : "rgba(255,255,255,0.6)"
              }}
            >
              <AnimatePresence mode="wait">
                {activeView === "2d" && (
                  <motion.div
                    key="2d-icon"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Map className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.span
                className={`text-sm relative z-10 ${
                  activeView === "2d" ? "font-bold text-green-600" : "font-semibold"
                }`}
              >
                2D
              </motion.span>
            </motion.div>
          </button>

          {/* 3D Button */}
          <button
            onClick={() => handleToggle("3d")}
            disabled={isLoading || !webGLSupported}
            className={`absolute right-0 top-0 w-[70px] h-12 flex items-center justify-center gap-1.5 rounded-r-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
              !webGLSupported ? "cursor-not-allowed" : ""
            }`}
            aria-pressed={activeView === "3d"}
            aria-label={
              webGLSupported
                ? "Switch to 3D view (Press 3)"
                : "3D view requires WebGL support"
            }
            tabIndex={0}
          >
            <motion.div
              className="flex items-center gap-1.5"
              initial={false}
              animate={{
                color:
                  activeView === "3d"
                    ? "#10b981"
                    : !webGLSupported
                    ? "rgba(255,255,255,0.3)"
                    : "rgba(255,255,255,0.6)"
              }}
            >
              <motion.span
                className={`text-sm relative z-10 ${
                  activeView === "3d"
                    ? "font-bold text-green-600"
                    : "font-semibold"
                }`}
              >
                3D
              </motion.span>
              <AnimatePresence mode="wait">
                {activeView === "3d" && webGLSupported && (
                  <motion.div
                    key="3d-icon"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Globe className="h-4 w-4" />
                  </motion.div>
                )}
                {!webGLSupported && (
                  <motion.div
                    key="warning-icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <AlertCircle className="h-3 w-3 text-red-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </button>

          {/* Active Segment Glow */}
          {!isLoading && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={false}
              animate={{
                background:
                  activeView === "2d"
                    ? "radial-gradient(circle at 30% 50%, rgba(16, 185, 129, 0.15), transparent 70%)"
                    : "radial-gradient(circle at 70% 50%, rgba(16, 185, 129, 0.15), transparent 70%)"
              }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-full backdrop-blur-sm">
              <div className="flex flex-col items-center gap-1">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="text-xs text-white/60">Loading...</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg shadow-lg whitespace-nowrap"
            >
              <p className="text-xs text-white font-medium">
                {activeView === "2d" ? "2D View" : "3D View"}
              </p>
              <p className="text-xs text-white/60 mt-0.5">
                Press [2] or [3] to switch
              </p>
              {!webGLSupported && activeView !== "3d" && (
                <p className="text-xs text-red-400 mt-0.5">
                  3D requires WebGL
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FPS Counter */}
        {showFPS && activeView === "3d" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-full mt-2 right-0 px-2 py-1 backdrop-blur-xl bg-slate-900/80 border border-white/20 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${fps >= 50 ? "bg-green-400" : fps >= 30 ? "bg-yellow-400" : "bg-red-400"} animate-pulse`} />
              <span className={`text-xs font-mono font-semibold ${getFPSColor()}`}>
                {fps} FPS
              </span>
            </div>
            {fps < 20 && (
              <p className="text-xs text-yellow-400 mt-1">
                Switch to 2D?
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Export helper hook for map integration
export function useMapViewTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTo2D = async (mapInstance: any) => {
    setIsTransitioning(true);

    // Implement your map-specific 2D transition logic here
    // Example transition sequence:
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setIsTransitioning(false);
  };

  const transitionTo3D = async (mapInstance: any) => {
    setIsTransitioning(true);

    // Implement your map-specific 3D transition logic here
    // Example transition sequence:
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setIsTransitioning(false);
  };

  return {
    isTransitioning,
    transitionTo2D,
    transitionTo3D
  };
}
