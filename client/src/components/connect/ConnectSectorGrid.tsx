import { Zap, Car, Leaf, Factory, Cpu, Scale, TreePine } from "lucide-react";
import { motion } from "framer-motion";
import type { Sector, SectorSlug } from "@/types/connect";

const iconMap: Record<string, typeof Zap> = {
  Zap, Car, Leaf, Factory, Cpu, Scale, TreePine,
};

const sectorStyles: Record<SectorSlug, { text: string; bg: string; border: string }> = {
  energy: { text: "text-[var(--category-energy)]", bg: "bg-[var(--category-energy-bg)]", border: "border-[var(--category-energy)]/20" },
  mobility: { text: "text-[var(--category-mobility)]", bg: "bg-[var(--category-mobility-bg)]", border: "border-[var(--category-mobility)]/20" },
  food: { text: "text-[var(--category-food)]", bg: "bg-[var(--category-food-bg)]", border: "border-[var(--category-food)]/20" },
  industry: { text: "text-[var(--category-industry)]", bg: "bg-[var(--category-industry-bg)]", border: "border-[var(--category-industry)]/20" },
  technology: { text: "text-[var(--category-technology)]", bg: "bg-[var(--category-technology-bg)]", border: "border-[var(--category-technology)]/20" },
  policy: { text: "text-[var(--category-policy)]", bg: "bg-[var(--category-policy-bg)]", border: "border-[var(--category-policy)]/20" },
  nature: { text: "text-[var(--category-nature)]", bg: "bg-[var(--category-nature-bg)]", border: "border-[var(--category-nature)]/20" },
};

interface ConnectSectorGridProps {
  sectors: Sector[];
  onSectorClick?: (slug: string) => void;
}

export function ConnectSectorGrid({ sectors, onSectorClick }: ConnectSectorGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {sectors.map((sector, i) => {
        const Icon = iconMap[sector.icon] || Leaf;
        const styles = sectorStyles[sector.slug];
        return (
          <motion.div
            key={sector.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSectorClick?.(sector.slug)}
            className={`group cursor-pointer rounded-xl p-4 text-center glass-medium border border-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300`}
          >
            <div className={`inline-flex p-3 rounded-lg ${styles.bg} mb-3`}>
              <Icon className={`h-6 w-6 ${styles.text}`} />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">
              {sector.name}
            </h3>
            <p className="text-xs text-slate-400">
              {sector.articleCount} articles
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
