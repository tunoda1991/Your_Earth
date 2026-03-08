import type { SectorSlug } from "@/types/connect";

const sectorColorMap: Record<SectorSlug, string> = {
  energy: "bg-[var(--category-energy)]/20 text-[var(--category-energy)]",
  mobility: "bg-[var(--category-mobility)]/20 text-[var(--category-mobility)]",
  food: "bg-[var(--category-food)]/20 text-[var(--category-food)]",
  industry: "bg-[var(--category-industry)]/20 text-[var(--category-industry)]",
  technology: "bg-[var(--category-technology)]/20 text-[var(--category-technology)]",
  policy: "bg-[var(--category-policy)]/20 text-[var(--category-policy)]",
  nature: "bg-[var(--category-nature)]/20 text-[var(--category-nature)]",
};

interface ConnectSectorBadgeProps {
  sector: SectorSlug;
  className?: string;
}

export function ConnectSectorBadge({ sector, className = "" }: ConnectSectorBadgeProps) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${sectorColorMap[sector]} ${className}`}>
      {sector}
    </span>
  );
}
