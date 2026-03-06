import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

// Base Glass - Minimal transparency for backgrounds
export function GlassBase({ children, className = "", hover = false, onClick }: GlassProps) {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      onClick={onClick}
      className={`
        bg-white/3 backdrop-blur-sm
        border border-white/8
        ${hover ? 'hover:bg-white/5 hover:border-white/12 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

// Glass Subtle - Low elevation (sidebars, backgrounds)
export function GlassSubtle({ children, className = "", hover = false, onClick }: GlassProps) {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      onClick={onClick}
      className={`
        bg-white/5 backdrop-blur-md
        border border-white/10
        shadow-lg
        ${hover ? 'hover:bg-white/8 hover:border-white/15 hover:shadow-xl transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

// Glass Medium - Standard elevation (cards, panels)
export function GlassMedium({ children, className = "", hover = false, onClick }: GlassProps) {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      onClick={onClick}
      className={`
        bg-white/6 backdrop-blur-lg
        border border-white/12
        shadow-xl
        ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:shadow-2xl transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

// Glass Prominent - High elevation (modals, popovers, featured content)
export function GlassProminent({ children, className = "", hover = false, onClick }: GlassProps) {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      onClick={onClick}
      className={`
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-2xl
        ${hover ? 'hover:bg-white/15 hover:border-white/30 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

// Glass Strong - Maximum elevation (hero sections, major features)
export function GlassStrong({ children, className = "", hover = false, onClick }: GlassProps) {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      onClick={onClick}
      className={`
        bg-white/15 backdrop-blur-2xl
        border border-white/30
        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]
        ${hover ? 'hover:bg-white/20 hover:border-white/40 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

// Solid Card - No transparency (for readability, contrast)
export function SolidCard({ children, className = "", hover = false, onClick }: GlassProps) {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      onClick={onClick}
      className={`
        bg-slate-900/95
        border border-white/20
        shadow-2xl
        ${hover ? 'hover:bg-slate-800/95 hover:border-white/30 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

// Interactive Glass - For clickable cards with animations
export function InteractiveGlass({ children, className = "", onClick }: GlassProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`
        bg-white/6 backdrop-blur-lg
        border border-white/12
        shadow-xl
        hover:bg-white/10 hover:border-white/20 hover:shadow-2xl
        transition-all duration-300
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}

// Nested Glass - For content inside glass containers
export function NestedGlass({ children, className = "" }: Omit<GlassProps, "hover" | "onClick">) {
  return (
    <div
      className={`
        bg-white/8 backdrop-blur-sm
        border border-white/15
        shadow-inner
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Glow Glass - With colored glow effect
export function GlowGlass({ 
  children, 
  className = "", 
  glowColor = "green",
  hover = false,
  onClick 
}: GlassProps & { glowColor?: "green" | "blue" | "purple" | "orange" | "red" }) {
  const Component = onClick ? motion.button : motion.div;
  
  const glowStyles = {
    green: "shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)]",
    blue: "shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)]",
    purple: "shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]",
    orange: "shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.5)]",
    red: "shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_rgba(239,68,68,0.5)]",
  };
  
  return (
    <Component
      onClick={onClick}
      className={`
        bg-white/10 backdrop-blur-xl
        border border-white/20
        ${glowStyles[glowColor]}
        ${hover ? 'transition-all duration-500' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

// Category Glass - Category-themed glass with subtle color
export function CategoryGlass({ 
  children, 
  className = "", 
  category,
  hover = false,
  onClick 
}: GlassProps & { category: "energy" | "food" | "mobility" | "industry" | "technology" | "policy" | "nature" }) {
  const Component = onClick ? motion.button : motion.div;
  
  const categoryStyles = {
    energy: "bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20",
    food: "bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20",
    mobility: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20",
    industry: "bg-gradient-to-br from-slate-500/10 to-gray-600/10 border-slate-500/20",
    technology: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20",
    policy: "bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/20",
    nature: "bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/20",
  };
  
  return (
    <Component
      onClick={onClick}
      className={`
        ${categoryStyles[category]}
        backdrop-blur-lg
        shadow-xl
        ${hover ? 'hover:shadow-2xl transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}
