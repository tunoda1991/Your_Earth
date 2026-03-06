import React from "react";
import { motion } from "framer-motion";

export function HeroEarth3D() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 3D Earth Container */}
      <div 
        className="absolute inset-0"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Earth Globe - Static (no rotation) */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          {/* Earth Image with Gradient Overlay */}
          <div className="relative w-full h-full max-w-[1400px] max-h-[1400px]">
            {/* Main Earth Sphere */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 70% 70%, rgba(34, 197, 94, 0.2) 0%, transparent 50%),
                  url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1400&h=1400&fit=crop&q=90')
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.15,
                filter: "brightness(0.8) contrast(1.3)",
                boxShadow: `
                  inset 20px 20px 60px rgba(0, 0, 0, 0.5),
                  inset -20px -20px 60px rgba(255, 255, 255, 0.05)
                `
              }}
            />

            {/* Atmosphere Glow */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, transparent 40%, rgba(59, 130, 246, 0.1) 60%, rgba(34, 197, 94, 0.15) 80%, transparent 100%)",
                filter: "blur(20px)"
              }}
            />

            {/* Earth Grid Lines */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-10"
              viewBox="0 0 100 100"
              style={{ overflow: "visible" }}
            >
              {/* Latitude lines */}
              {[20, 40, 60, 80].map(y => (
                <ellipse
                  key={`lat-${y}`}
                  cx="50"
                  cy="50"
                  rx="45"
                  ry={45 * Math.sin((y * Math.PI) / 180)}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="0.2"
                  transform={`translate(0, ${(50 - y) * 0.9})`}
                />
              ))}
              
              {/* Longitude lines */}
              {[0, 30, 60, 90, 120, 150].map(angle => (
                <ellipse
                  key={`lon-${angle}`}
                  cx="50"
                  cy="50"
                  rx={45 * Math.cos((angle * Math.PI) / 180)}
                  ry="45"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="0.2"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Blinking Stars around Earth */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => {
            // Calculate position around the earth in a circular pattern
            const angle = (i / 80) * 360;
            const radius = 42 + Math.random() * 20; // Distance from center
            const x = 50 + Math.cos((angle * Math.PI) / 180) * radius;
            const y = 50 + Math.sin((angle * Math.PI) / 180) * radius * 0.6; // Flatten vertically for perspective
            
            const size = Math.random() * 2.5 + 1;
            const baseOpacity = Math.random() * 0.6 + 0.4;
            const duration = 2 + Math.random() * 3;
            const delay = Math.random() * 5;
            
            return (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full bg-white shadow-lg"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.5)`
                }}
                animate={{
                  opacity: [baseOpacity, baseOpacity * 0.2, baseOpacity],
                  scale: [1, 0.8, 1]
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>

        {/* Additional scattered stars in background */}
        <div className="absolute inset-0" style={{ transform: "scale(1.5)" }}>
          {[...Array(60)].map((_, i) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 1.5 + 0.5;
            const baseOpacity = Math.random() * 0.5 + 0.3;
            const duration = 2.5 + Math.random() * 2.5;
            const delay = Math.random() * 4;
            
            return (
              <motion.div
                key={`bg-star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  boxShadow: `0 0 ${size * 1.5}px rgba(255, 255, 255, 0.4)`
                }}
                animate={{
                  opacity: [baseOpacity, baseOpacity * 0.3, baseOpacity],
                  scale: [1, 0.7, 1]
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
