import { motion } from "framer-motion";
import { LucideIcon, Zap, UtensilsCrossed, Car, Factory, Laptop, Scale, TreePine, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  memberCount: number;
  gradient: string;
  color: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "energy",
    name: "Energy",
    icon: Zap,
    memberCount: 12847,
    gradient: "linear-gradient(135deg, #FFA726 0%, #FB8C00 100%)",
    color: "#FFA726",
    description: "Renewable energy and clean power solutions",
  },
  {
    id: "food",
    name: "Food",
    icon: UtensilsCrossed,
    memberCount: 9234,
    gradient: "linear-gradient(135deg, #66BB6A 0%, #43A047 100%)",
    color: "#66BB6A",
    description: "Sustainable agriculture and food systems",
  },
  {
    id: "mobility",
    name: "Mobility",
    icon: Car,
    memberCount: 8156,
    gradient: "linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)",
    color: "#42A5F5",
    description: "Sustainable transportation and urban planning",
  },
  {
    id: "industry",
    name: "Industry",
    icon: Factory,
    memberCount: 6789,
    gradient: "linear-gradient(135deg, #AB47BC 0%, #8E24AA 100%)",
    color: "#AB47BC",
    description: "Industrial sustainability and circular economy",
  },
  {
    id: "technology",
    name: "Technology",
    icon: Laptop,
    memberCount: 11523,
    gradient: "linear-gradient(135deg, #26C6DA 0%, #00ACC1 100%)",
    color: "#26C6DA",
    description: "Climate tech and innovation",
  },
  {
    id: "policy",
    name: "Policy",
    icon: Scale,
    memberCount: 7892,
    gradient: "linear-gradient(135deg, #EF5350 0%, #E53935 100%)",
    color: "#EF5350",
    description: "Climate policy and advocacy",
  },
  {
    id: "nature",
    name: "Nature",
    icon: TreePine,
    memberCount: 15634,
    gradient: "linear-gradient(135deg, #9CCC65 0%, #7CB342 100%)",
    color: "#9CCC65",
    description: "Conservation and biodiversity",
  },
];

interface CategoryCardProps {
  category: Category;
  index: number;
  onJoin?: (categoryId: string) => void;
}

function CategoryCard({ category, index, onJoin }: CategoryCardProps) {
  const IconComponent = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -8 }}
      className="group"
    >
      <div
        className="relative h-[200px] w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        style={{ background: category.gradient }}
      >
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-between p-6 text-white">
          {/* Icon */}
          <motion.div
            className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <IconComponent className="h-8 w-8" />
          </motion.div>

          {/* Category Name */}
          <div className="text-center flex-1 flex items-center">
            <h3 className="text-2xl font-bold">{category.name}</h3>
          </div>

          {/* Member Count & Join Button */}
          <div className="w-full space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">
                {category.memberCount.toLocaleString()} members
              </span>
            </div>

            <Button
              onClick={() => onJoin?.(category.id)}
              className="w-full bg-white/20 backdrop-blur-sm hover:bg-white hover:text-gray-900 border border-white/30 transition-all duration-300 group-hover:scale-105"
            >
              Join Community
            </Button>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}

interface CategoryCardsProps {
  onJoin?: (categoryId: string) => void;
}

export function CategoryCards({ onJoin }: CategoryCardsProps) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            Climate Interest Categories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Community
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join one of our seven specialized communities focused on different aspects of climate action
          </p>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              onJoin={onJoin}
            />
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-3 bg-muted/50 backdrop-blur-sm rounded-full px-6 py-3">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              {categories.reduce((sum, cat) => sum + cat.memberCount, 0).toLocaleString()} total members across all communities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { categories };
