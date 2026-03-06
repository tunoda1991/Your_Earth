import { LucideIcon, Zap, UtensilsCrossed, Car, Factory, Laptop, Scale, TreePine } from "lucide-react";
import { Check } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  description?: string;
}

export const STANDARD_CATEGORIES: Category[] = [
  {
    id: "energy",
    name: "Energy",
    slug: "energy",
    icon: Zap,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    description: "Renewable energy and clean power"
  },
  {
    id: "food",
    name: "Food",
    slug: "food",
    icon: UtensilsCrossed,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    description: "Sustainable agriculture and food systems"
  },
  {
    id: "mobility",
    name: "Mobility",
    slug: "mobility",
    icon: Car,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    description: "Transportation and sustainable travel"
  },
  {
    id: "industry",
    name: "Industry",
    slug: "industry",
    icon: Factory,
    color: "text-slate-400",
    bgColor: "bg-slate-500/10",
    description: "Manufacturing and industrial solutions"
  },
  {
    id: "technology",
    name: "Technology",
    slug: "technology",
    icon: Laptop,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    description: "Clean tech and innovation"
  },
  {
    id: "policy",
    name: "Policy",
    slug: "policy",
    icon: Scale,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    description: "Climate policy and advocacy"
  },
  {
    id: "nature",
    name: "Nature",
    slug: "nature",
    icon: TreePine,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    description: "Conservation and biodiversity"
  }
];

interface CategorySelectorProps {
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
  multiSelect?: boolean;
  showDescription?: boolean;
  disabled?: boolean;
  variant?: "default" | "compact" | "large";
  className?: string;
}

export function CategorySelector({
  selectedCategories,
  onCategoryToggle,
  multiSelect = true,
  showDescription = false,
  disabled = false,
  variant = "default",
  className = ""
}: CategorySelectorProps) {
  const handleClick = (categoryId: string) => {
    if (disabled) return;
    
    if (!multiSelect) {
      // Single select mode - deselect if clicking same category
      if (selectedCategories[0] === categoryId) {
        onCategoryToggle(categoryId);
      } else {
        // Clear others and select this one
        selectedCategories.forEach(id => {
          if (id !== categoryId) onCategoryToggle(id);
        });
        if (!selectedCategories.includes(categoryId)) {
          onCategoryToggle(categoryId);
        }
      }
    } else {
      // Multi-select mode
      onCategoryToggle(categoryId);
    }
  };

  const isSelected = (categoryId: string) => selectedCategories.includes(categoryId);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {STANDARD_CATEGORIES.map((category) => {
        const Icon = category.icon;
        const selected = isSelected(category.id);
        
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => handleClick(category.id)}
            disabled={disabled}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-200
              ${variant === "compact" ? "p-3" : variant === "large" ? "p-6" : "p-4"}
              ${selected 
                ? `border-white/30 bg-white/10 ${category.bgColor}` 
                : 'border-white/10 bg-white/5'
              }
              ${disabled 
                ? 'cursor-not-allowed opacity-50' 
                : 'cursor-pointer hover:border-white/20 hover:bg-white/8'
              }
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-2 rounded-lg ${selected ? category.bgColor : 'bg-white/5'}`}>
                  <Icon className={`h-5 w-5 ${selected ? category.color : 'text-white/70'}`} />
                </div>
                <div className="text-left">
                  <div className={`font-semibold ${selected ? 'text-white' : 'text-white/87'}`}>
                    {category.name}
                  </div>
                  {showDescription && category.description && (
                    <div className="text-xs text-white/60 mt-1">
                      {category.description}
                    </div>
                  )}
                </div>
              </div>
              {selected && (
                <div className={`flex-shrink-0 h-5 w-5 rounded-full ${category.bgColor} flex items-center justify-center`}>
                  <Check className={`h-3 w-3 ${category.color}`} />
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// Compact variant for filters
export function CategoryFilter({
  selectedCategories,
  onCategoryToggle,
  className = ""
}: Omit<CategorySelectorProps, "variant" | "showDescription" | "multiSelect">) {
  return (
    <CategorySelector
      selectedCategories={selectedCategories}
      onCategoryToggle={onCategoryToggle}
      variant="compact"
      showDescription={false}
      multiSelect={true}
      className={className}
    />
  );
}

// Single selection variant (e.g., for post creation)
export function CategoryPicker({
  selectedCategory,
  onCategorySelect,
  className = ""
}: {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  className?: string;
}) {
  return (
    <CategorySelector
      selectedCategories={selectedCategory ? [selectedCategory] : []}
      onCategoryToggle={onCategorySelect}
      variant="default"
      showDescription={true}
      multiSelect={false}
      className={className}
    />
  );
}
