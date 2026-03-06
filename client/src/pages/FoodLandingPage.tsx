import { TopicPage } from "./TopicPage";
import { 
  Users, 
  ChefHat, 
  TrendingUp, 
  Sprout, 
  Leaf, 
  Apple, 
  UtensilsCrossed, 
  Award, 
  BookOpen, 
  Calendar 
} from "lucide-react";

interface FoodLandingPageProps {
  onNavigate?: (page: string) => void;
  user?: any;
  onTopicClick?: (topic: any) => void;
}

const foodStats = [
  {
    title: "Community Members",
    value: "12,456",
    change: "+567 this month",
    icon: Users
  },
  {
    title: "Recipes Shared",
    value: "3,892",
    change: "+156 this week",
    icon: ChefHat
  },
  {
    title: "Food Waste Reduced",
    value: "45 tons",
    change: "This year",
    icon: TrendingUp
  },
  {
    title: "Local Farms",
    value: "234",
    change: "+12 new partners",
    icon: Sprout
  }
];

const topicsData = [
  {
    icon: Leaf,
    title: "Plant-Based Living",
    posts: 2341,
    members: 5678,
    description: "Vegan and vegetarian recipes, nutrition tips, and lifestyle guidance",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    icon: Sprout,
    title: "Sustainable Agriculture",
    posts: 1456,
    members: 3421,
    description: "Regenerative farming, permaculture, and organic growing methods",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    icon: Apple,
    title: "Local & Seasonal",
    posts: 1892,
    members: 4123,
    description: "Farmers markets, CSAs, and eating with the seasons",
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  {
    icon: UtensilsCrossed,
    title: "Zero Waste Cooking",
    posts: 987,
    members: 2345,
    description: "Food waste reduction, composting, and creative leftover recipes",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    icon: ChefHat,
    title: "Sustainable Seafood",
    posts: 654,
    members: 1567,
    description: "Ocean-friendly choices, aquaculture, and seafood sustainability",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Award,
    title: "Food Policy",
    posts: 543,
    members: 1234,
    description: "Food systems, agricultural policy, and food security initiatives",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  }
];

const featuredDiscussions = [
  {
    title: "Transitioning to plant-based: my 6-month journey and results",
    author: "GreenEater",
    replies: 345,
    likes: 678,
    category: "Plant-Based Living",
    timestamp: "3 hours ago"
  },
  {
    title: "Started a community garden - lessons learned after first harvest",
    author: "UrbanFarmer",
    replies: 234,
    likes: 456,
    category: "Sustainable Agriculture",
    timestamp: "1 day ago"
  },
  {
    title: "50 recipes using food scraps - never waste again!",
    author: "ZeroWasteChef",
    replies: 567,
    likes: 892,
    category: "Zero Waste Cooking",
    timestamp: "2 days ago"
  }
];

const communityFeatures = [
  {
    icon: ChefHat,
    title: "Recipe Library",
    description: "Access thousands of plant-based and sustainable recipes shared by the community.",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    icon: Calendar,
    title: "Cooking Workshops",
    description: "Join virtual and in-person cooking classes focused on sustainable techniques.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    icon: Sprout,
    title: "Farm Connections",
    description: "Connect directly with local sustainable farms and food producers.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  }
];

export function FoodLandingPage({ onNavigate, user, onTopicClick }: FoodLandingPageProps) {
  return (
    <TopicPage
      topicData={{
        category: "food",
        categoryDisplayName: "Food",
        categoryIcon: UtensilsCrossed,
        heroTitle: "Sustainable",
        heroHighlight: "Food",
        heroDescription: "Join a thriving community of food lovers committed to sustainable agriculture, plant-based nutrition, and zero-waste cooking. Nourish yourself and the planet.",
        heroBadgeText: "Food Community",
        primaryGradient: "from-orange-500 to-green-500",
        accentColor: "orange",
        stats: foodStats,
        topics: topicsData,
        topicsCount: 6,
        topicsSectionTitle: "Food Topics",
        topicsSectionDescription: "Explore sustainable food topics from farm to table and beyond.",
        topicsIcon: Leaf,
        featuredDiscussions: featuredDiscussions,
        communityFeatures: communityFeatures,
        ctaTitle: "Ready to Transform Your Food Choices?",
        ctaDescription: "Join 12,000+ food enthusiasts sharing recipes, tips, and building a sustainable food future together.",
        ctaMemberCount: "12,000+",
      }}
      onNavigate={onNavigate}
      user={user}
    />
  );
}
