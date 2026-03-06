import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { GlassCard } from "@/components/glass/GlassCard";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import {
  ShoppingCart,
  Search,
  Filter,
  Star,
  Leaf,
  ShoppingBag,
  TrendingUp,
  Award,
  Truck,
  Shield,
  Heart,
  X,
  Plus,
  Minus,
  Zap,
  UtensilsCrossed,
  Car,
  Factory,
  Laptop,
  TreePine,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PRODUCT_CATEGORIES = [
  { value: "energy", label: "Energy", icon: Zap, color: "bg-yellow-500" },
  { value: "food", label: "Food & Kitchen", icon: UtensilsCrossed, color: "bg-green-500" },
  { value: "mobility", label: "Mobility", icon: Car, color: "bg-blue-500" },
  { value: "industry", label: "Home & Office", icon: Factory, color: "bg-gray-500" },
  { value: "technology", label: "Technology", icon: Laptop, color: "bg-purple-500" },
  { value: "nature", label: "Nature & Outdoor", icon: TreePine, color: "bg-emerald-500" },
];

const CERTIFICATIONS = [
  { value: "all", label: "All Products" },
  { value: "carbon-neutral", label: "Carbon Neutral" },
  { value: "organic", label: "Organic" },
  { value: "fair-trade", label: "Fair Trade" },
  { value: "recycled", label: "Recycled Materials" },
  { value: "renewable", label: "Renewable Energy" },
  { value: "zero-waste", label: "Zero Waste" },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  certifications: string[];
  carbonOffset: string;
  featured: boolean;
  inStock: boolean;
  sustainabilityScore: number;
}

// Dummy products
const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Organic Cotton T-Shirt",
    brand: "Patagonia",
    description: "100% organic cotton t-shirt made with Fair Trade Certified™ sewing. Carbon neutral shipping included.",
    price: 45,
    originalPrice: 60,
    category: "nature",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    rating: 4.8,
    reviews: 234,
    certifications: ["organic", "fair-trade", "carbon-neutral"],
    carbonOffset: "5kg CO₂ offset",
    featured: true,
    inStock: true,
    sustainabilityScore: 95,
  },
  {
    id: "2",
    name: "Solar Power Bank 20000mAh",
    brand: "Goal Zero",
    description: "Portable solar charger with dual USB ports. Perfect for outdoor adventures and emergency backup.",
    price: 89,
    category: "energy",
    image: "https://images.unsplash.com/photo-1739268984311-b478fccf256e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBvd2VyJTIwYmFuayUyMHBvcnRhYmxlJTIwY2hhcmdlcnxlbnwxfHx8fDE3NzAzMjM0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 156,
    certifications: ["renewable", "carbon-neutral"],
    carbonOffset: "10kg CO₂ offset",
    featured: true,
    inStock: true,
    sustainabilityScore: 88,
  },
  {
    id: "3",
    name: "Reusable Bamboo Cutlery Set",
    brand: "EcoWare",
    description: "Travel-friendly bamboo utensils with carrying case. Say goodbye to single-use plastics.",
    price: 24,
    category: "food",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500",
    rating: 4.7,
    reviews: 89,
    certifications: ["zero-waste", "organic"],
    carbonOffset: "2kg CO₂ offset",
    featured: false,
    inStock: true,
    sustainabilityScore: 92,
  },
  {
    id: "4",
    name: "Carbon-Negative Running Shoes",
    brand: "Allbirds",
    description: "Made from natural materials with negative carbon footprint. Comfortable and sustainable.",
    price: 135,
    category: "mobility",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500",
    rating: 4.9,
    reviews: 412,
    certifications: ["carbon-neutral", "recycled"],
    carbonOffset: "15kg CO₂ offset",
    featured: true,
    inStock: true,
    sustainabilityScore: 96,
  },
  {
    id: "5",
    name: "Recycled Ocean Plastic Backpack",
    brand: "United By Blue",
    description: "Durable backpack made from recycled ocean plastic. Removes 1 pound of trash from oceans.",
    price: 78,
    category: "nature",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    rating: 4.5,
    reviews: 178,
    certifications: ["recycled", "zero-waste"],
    carbonOffset: "8kg CO₂ offset",
    featured: false,
    inStock: true,
    sustainabilityScore: 90,
  },
  {
    id: "6",
    name: "Smart LED Light Bulbs (4-Pack)",
    brand: "Philips Hue",
    description: "Energy-efficient smart bulbs that reduce electricity use by 80%. App-controlled color and brightness.",
    price: 59,
    category: "energy",
    image: "https://images.unsplash.com/photo-1752391702044-b3c75fde78bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMExFRCUyMGxpZ2h0JTIwYnVsYnxlbnwxfHx8fDE3NzAzMjM0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 892,
    certifications: ["renewable", "carbon-neutral"],
    carbonOffset: "12kg CO₂ offset/year",
    featured: false,
    inStock: true,
    sustainabilityScore: 85,
  },
  {
    id: "7",
    name: "Organic Coffee Beans - Fair Trade",
    brand: "Counter Culture Coffee",
    description: "Direct trade, organic coffee beans. Supporting sustainable farming practices worldwide.",
    price: 18,
    category: "food",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500",
    rating: 4.8,
    reviews: 267,
    certifications: ["organic", "fair-trade", "carbon-neutral"],
    carbonOffset: "3kg CO₂ offset",
    featured: false,
    inStock: true,
    sustainabilityScore: 93,
  },
  {
    id: "8",
    name: "Bamboo Laptop Stand",
    brand: "Oakywood",
    description: "Ergonomic laptop stand made from sustainable bamboo. Improves posture and desk aesthetics.",
    price: 65,
    category: "technology",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    rating: 4.7,
    reviews: 134,
    certifications: ["organic", "carbon-neutral"],
    carbonOffset: "4kg CO₂ offset",
    featured: false,
    inStock: true,
    sustainabilityScore: 87,
  },
  {
    id: "9",
    name: "Electric Bike Conversion Kit",
    brand: "Swytch",
    description: "Convert any bike to electric in minutes. Lightweight battery pack with 30-mile range.",
    price: 999,
    category: "mobility",
    image: "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=500",
    rating: 4.4,
    reviews: 98,
    certifications: ["renewable", "carbon-neutral"],
    carbonOffset: "200kg CO₂ offset/year",
    featured: true,
    inStock: true,
    sustainabilityScore: 94,
  },
  {
    id: "10",
    name: "Compostable Phone Case",
    brand: "Pela",
    description: "100% compostable phone case. Protects your phone while protecting the planet.",
    price: 39,
    category: "technology",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500",
    rating: 4.5,
    reviews: 456,
    certifications: ["zero-waste", "organic", "carbon-neutral"],
    carbonOffset: "2kg CO₂ offset",
    featured: false,
    inStock: true,
    sustainabilityScore: 91,
  },
  {
    id: "11",
    name: "Recycled Yoga Mat",
    brand: "Manduka",
    description: "High-performance yoga mat made from recycled materials. Non-toxic and biodegradable.",
    price: 88,
    category: "nature",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    rating: 4.9,
    reviews: 321,
    certifications: ["recycled", "zero-waste"],
    carbonOffset: "6kg CO₂ offset",
    featured: false,
    inStock: true,
    sustainabilityScore: 89,
  },
  {
    id: "12",
    name: "Stainless Steel Water Bottle",
    brand: "Hydro Flask",
    description: "Insulated water bottle keeps drinks cold for 24hrs, hot for 12hrs. Lifetime warranty.",
    price: 44,
    category: "nature",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    rating: 4.8,
    reviews: 1203,
    certifications: ["zero-waste", "carbon-neutral"],
    carbonOffset: "15kg CO₂ saved/year",
    featured: false,
    inStock: true,
    sustainabilityScore: 86,
  },
  {
    id: "13",
    name: "Hemp Shower Curtain",
    brand: "Rawganique",
    description: "Naturally mold-resistant hemp shower curtain. Chemical-free and biodegradable.",
    price: 56,
    category: "industry",
    image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=500",
    rating: 4.6,
    reviews: 87,
    certifications: ["organic", "zero-waste"],
    carbonOffset: "3kg CO₂ offset",
    featured: false,
    inStock: true,
    sustainabilityScore: 88,
  },
  {
    id: "14",
    name: "Beeswax Food Wraps (Set of 5)",
    brand: "Bee's Wrap",
    description: "Reusable alternative to plastic wrap. Made with organic cotton and beeswax.",
    price: 28,
    category: "food",
    image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=500",
    rating: 4.7,
    reviews: 543,
    certifications: ["organic", "zero-waste"],
    carbonOffset: "5kg CO₂ saved/year",
    featured: false,
    inStock: true,
    sustainabilityScore: 94,
  },
  {
    id: "15",
    name: "Solar Garden Lights (8-Pack)",
    brand: "Brightech",
    description: "Decorative solar-powered garden lights. Auto on/off with dusk sensor.",
    price: 42,
    category: "energy",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500",
    rating: 4.5,
    reviews: 234,
    certifications: ["renewable", "carbon-neutral"],
    carbonOffset: "8kg CO₂ offset/year",
    featured: false,
    inStock: true,
    sustainabilityScore: 87,
  },
];

interface CartItem extends Product {
  quantity: number;
}

interface MarketplacePageProps {
  onNavigate?: (page: string) => void;
  user?: any;
}

export function MarketplacePage({ onNavigate, user }: MarketplacePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [certification, setCertification] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter and sort products
  const filteredProducts = DUMMY_PRODUCTS.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);

    const matchesCertification =
      certification === "all" || product.certifications.includes(certification);

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesCertification && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return 0; // Would sort by date in real implementation
      default:
        return b.featured ? 1 : -1;
    }
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (productId: string, change: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        toast.success("Removed from favorites");
        return prev.filter((id) => id !== productId);
      } else {
        toast.success("Added to favorites");
        return [...prev, productId];
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setCertification("all");
    setPriceRange([0, 1000]);
    setSearchQuery("");
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCarbonOffset = cart.reduce((sum, item) => {
    const offset = parseFloat(item.carbonOffset.match(/\d+/)?.[0] || "0");
    return sum + offset * item.quantity;
  }, 0);

  const activeFilterCount =
    selectedCategories.length + (certification !== "all" ? 1 : 0);

  const marketplaceStats = [
    {
      title: "Sustainable Brands",
      value: new Set(DUMMY_PRODUCTS.map((p) => p.brand)).size.toString(),
      icon: Award,
      change: "+5 this month",
    },
    {
      title: "Products Available",
      value: DUMMY_PRODUCTS.length.toString(),
      icon: ShoppingBag,
      change: "+12 new items",
    },
    {
      title: "CO₂ Offset This Year",
      value: "2.4M kg",
      icon: Leaf,
      change: "+15% from last year",
    },
    {
      title: "Avg. Sustainability",
      value: "90/100",
      icon: TrendingUp,
      change: "Excellent rating",
    },
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-3xl p-12 shadow-2xl">
              <div className="text-center">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 mb-6">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Sustainable Shopping
                </Badge>

                <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
                  Green{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    Marketplace
                  </span>
                </h1>

                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                  Shop from verified sustainable brands. Every purchase includes carbon offset and
                  supports eco-friendly businesses committed to fighting climate change.
                </p>

                {/* Floating Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {marketplaceStats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                          <IconComponent className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-400 mb-1">{stat.title}</div>
                        <div className="text-xs text-slate-500">{stat.change}</div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 px-8 py-6 text-lg"
                    onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
                  >
                    Shop Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="backdrop-blur-lg bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                    onClick={() => setShowCart(true)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    View Cart ({cart.length})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Shopping Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter Pills */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl">Shop by Category</h2>
              {selectedCategories.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategories([])}
                  className="text-muted-foreground"
                >
                  Clear Categories
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {PRODUCT_CATEGORIES.map((category) => {
                const IconComponent = category.icon;
                const isSelected = selectedCategories.includes(category.value);
                const productCount = DUMMY_PRODUCTS.filter((p) => p.category === category.value).length;
                return (
                  <Button
                    key={category.value}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => toggleCategory(category.value)}
                    className="gap-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    {category.label}
                    <Badge variant={isSelected ? "secondary" : "outline"} className="ml-1">
                      {productCount}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products or brands..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge variant="secondary">{activeFilterCount}</Badge>
                    )}
                  </Button>
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <Separator className="my-4" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="mb-2">Certification</Label>
                          <Select value={certification} onValueChange={setCertification}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {CERTIFICATIONS.map((cert) => (
                                <SelectItem key={cert.value} value={cert.value}>
                                  {cert.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="mb-2">
                            Price Range: ${priceRange[0]} - ${priceRange[1]}
                          </Label>
                          <Slider
                            value={priceRange}
                            onValueChange={setPriceRange}
                            max={1000}
                            step={10}
                            className="mt-2"
                          />
                        </div>
                      </div>

                      {activeFilterCount > 0 && (
                        <div className="flex justify-end mt-4">
                          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                            Clear all filters
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {DUMMY_PRODUCTS.length} products
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full"
                >
                  <Card className="p-12 text-center">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button onClick={clearAllFilters}>Clear all filters</Button>
                  </Card>
                </motion.div>
              ) : (
                filteredProducts.map((product) => {
                  const categoryInfo = PRODUCT_CATEGORIES.find((c) => c.value === product.category);
                  const IconComponent = categoryInfo?.icon || ShoppingBag;
                  const isFavorite = favorites.includes(product.id);

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                        <div className="relative aspect-square overflow-hidden">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {product.featured && (
                            <Badge className="absolute top-2 left-2 gap-1">
                              <Star className="h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => toggleFavorite(product.id)}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                isFavorite ? "fill-red-500 text-red-500" : ""
                              }`}
                            />
                          </Button>
                          <div className="absolute bottom-2 left-2 flex gap-1">
                            {product.certifications.slice(0, 2).map((cert) => (
                              <Badge key={cert} variant="secondary" className="text-xs">
                                <Leaf className="h-3 w-3 mr-1" />
                                {cert.split("-").join(" ")}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <CardHeader className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                              <CardTitle className="text-base line-clamp-2">
                                {product.name}
                              </CardTitle>
                            </div>
                            <Badge variant="outline" className="gap-1 flex-shrink-0">
                              <IconComponent className="h-3 w-3" />
                            </Badge>
                          </div>

                          <CardDescription className="line-clamp-2">
                            {product.description}
                          </CardDescription>

                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(product.rating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              ({product.reviews})
                            </span>
                          </div>

                          <div className="mt-2">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Leaf className="h-3 w-3 text-green-600" />
                              <span>{product.carbonOffset}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <Award className="h-3 w-3" />
                              <span>Score: {product.sustainabilityScore}/100</span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="text-2xl font-bold">${product.price}</div>
                              {product.originalPrice && (
                                <div className="text-sm text-muted-foreground line-through">
                                  ${product.originalPrice}
                                </div>
                              )}
                            </div>
                            {!product.inStock && (
                              <Badge variant="destructive">Out of Stock</Badge>
                            )}
                          </div>

                          <Button
                            className="w-full"
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {/* Load More */}
          {filteredProducts.length >= 12 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Products
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <Truck className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-medium mb-2">Carbon-Neutral Shipping</h3>
              <p className="text-sm text-muted-foreground">
                All orders ship carbon-neutral at no extra cost
              </p>
            </Card>

            <Card className="text-center p-6">
              <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-medium mb-2">Verified Brands</h3>
              <p className="text-sm text-muted-foreground">
                Every brand meets our strict sustainability standards
              </p>
            </Card>

            <Card className="text-center p-6">
              <Leaf className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-medium mb-2">Climate Impact</h3>
              <p className="text-sm text-muted-foreground">
                Track your carbon offset with every purchase
              </p>
            </Card>

            <Card className="text-center p-6">
              <Award className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-medium mb-2">Quality Guaranteed</h3>
              <p className="text-sm text-muted-foreground">
                30-day returns on all sustainable products
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Shopping Cart Dialog */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart ({cartItems} items)
            </DialogTitle>
            <DialogDescription>
              Review your sustainable products before checkout
            </DialogDescription>
          </DialogHeader>

          {cart.length === 0 ? (
            <div className="py-12 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button className="mt-4" onClick={() => setShowCart(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-medium line-clamp-1">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.brand}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">${item.price} each</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free (Carbon Neutral)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Leaf className="h-4 w-4 text-green-600" />
                    Total Carbon Offset
                  </span>
                  <span className="text-green-600 font-medium">{totalCarbonOffset.toFixed(1)}kg CO₂</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowCart(false)}>
                  Continue Shopping
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    if (user) {
                      toast.success("Proceeding to checkout... (Demo)");
                    } else {
                      setShowCart(false);
                      onNavigate && onNavigate("signup");
                      toast.info("Please sign up to complete your purchase");
                    }
                  }}
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </div>
  );
}