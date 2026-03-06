import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Page Title - Largest heading for page heroes
export function PageTitle({ children, className = "", as = "h1" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white ${className}`}>
      {children}
    </Component>
  );
}

// Section Title - Main section headings
export function SectionTitle({ children, className = "", as = "h2" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`text-3xl md:text-4xl font-bold leading-tight text-white ${className}`}>
      {children}
    </Component>
  );
}

// Subsection Title - Secondary headings
export function SubsectionTitle({ children, className = "", as = "h3" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`text-2xl md:text-3xl font-semibold leading-snug text-white ${className}`}>
      {children}
    </Component>
  );
}

// Card Title - Titles within cards
export function CardTitle({ children, className = "", as = "h4" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`text-xl font-semibold leading-snug text-white ${className}`}>
      {children}
    </Component>
  );
}

// Small Title - Small section headings
export function SmallTitle({ children, className = "", as = "h5" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`text-lg font-semibold leading-normal text-white ${className}`}>
      {children}
    </Component>
  );
}

// Body Text - Standard paragraph text
export function BodyText({ children, className = "", as = "p" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`text-base leading-relaxed text-white/87 ${className}`}>
      {children}
    </Component>
  );
}

// Secondary Text - De-emphasized text
export function SecondaryText({ children, className = "", as = "p" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`text-base leading-relaxed text-white/70 ${className}`}>
      {children}
    </Component>
  );
}

// Caption - Small supplementary text
export function Caption({ children, className = "", as = "span" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`text-sm leading-normal text-white/70 ${className}`}>
      {children}
    </Component>
  );
}

// Meta Text - Very small metadata
export function MetaText({ children, className = "", as = "span" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`text-xs leading-normal text-white/56 ${className}`}>
      {children}
    </Component>
  );
}

// Label - Form labels and UI labels
export function Label({ children, className = "", as = "label" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`text-sm font-medium leading-normal text-white/87 ${className}`}>
      {children}
    </Component>
  );
}

// Lead Text - Larger introductory text
export function LeadText({ children, className = "", as = "p" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`text-lg md:text-xl leading-relaxed text-white/87 ${className}`}>
      {children}
    </Component>
  );
}

// Display Text - Extra large marketing text
export function DisplayText({ children, className = "", as = "h1" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter text-white ${className}`}>
      {children}
    </Component>
  );
}

// Muted Text - Disabled or very de-emphasized text
export function MutedText({ children, className = "", as = "span" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`text-sm leading-normal text-white/50 ${className}`}>
      {children}
    </Component>
  );
}

// Code Text - Inline code or monospace text
export function CodeText({ children, className = "", as = "code" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`font-mono text-sm bg-white/10 px-1.5 py-0.5 rounded text-white/87 ${className}`}>
      {children}
    </Component>
  );
}

// Quote - Block quotes
export function Quote({ children, className = "", as = "blockquote" }: TypographyProps) {
  const Component = as;
  return (
    <Component className={`border-l-4 border-green-500 pl-6 italic text-lg text-white/87 ${className}`}>
      {children}
    </Component>
  );
}

// Helper for gradient text
export function GradientText({ children, className = "", variant = "primary" }: TypographyProps & { variant?: "primary" | "energy" | "food" | "mobility" | "industry" | "technology" | "policy" | "nature" }) {
  const gradients = {
    primary: "bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400",
    energy: "bg-gradient-to-r from-yellow-400 to-orange-500",
    food: "bg-gradient-to-r from-orange-500 to-red-500",
    mobility: "bg-gradient-to-r from-blue-400 to-cyan-500",
    industry: "bg-gradient-to-r from-gray-400 to-slate-500",
    technology: "bg-gradient-to-r from-purple-400 to-pink-500",
    policy: "bg-gradient-to-r from-red-400 to-pink-500",
    nature: "bg-gradient-to-r from-green-400 to-emerald-500",
  };

  return (
    <span className={`${gradients[variant]} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}
