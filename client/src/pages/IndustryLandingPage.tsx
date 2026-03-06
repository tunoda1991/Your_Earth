import { TopicPage } from "./TopicPage";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Recycle, 
  Building2, 
  Package, 
  Boxes, 
  Factory, 
  Calendar 
} from "lucide-react";

interface IndustryLandingPageProps {
  onNavigate?: (page: string) => void;
  onTopicClick?: (topic: any) => void;
  user?: any;
}

const stats = [
  { title: "Business Leaders", value: "6,543", change: "+234 this month", icon: Users },
  { title: "Case Studies", value: "892", change: "+45 this week", icon: BookOpen },
  { title: "Emissions Cut", value: "234K tons", change: "This year", icon: TrendingUp },
  { title: "Green Products", value: "1,567", change: "Certified", icon: Award }
];

const topics = [
  { icon: Recycle, title: "Circular Economy", posts: 1543, members: 3421, description: "Waste reduction, recycling, and closed-loop systems", color: "text-green-500", bgColor: "bg-green-500/10" },
  { icon: Building2, title: "Green Manufacturing", posts: 1234, members: 2876, description: "Sustainable production methods and eco-friendly materials", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: Package, title: "Supply Chain", posts: 987, members: 2345, description: "Sustainable sourcing and transparent supply chains", color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { icon: Boxes, title: "Packaging Innovation", posts: 876, members: 1987, description: "Biodegradable, compostable, and minimal packaging", color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { icon: Factory, title: "Clean Energy Transition", posts: 765, members: 1765, description: "Renewable energy adoption in industrial operations", color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  { icon: Award, title: "ESG & Reporting", posts: 654, members: 1543, description: "Environmental, social, and governance standards", color: "text-red-500", bgColor: "bg-red-500/10" }
];

const discussions = [
  { title: "How we achieved carbon neutrality in manufacturing", author: "GreenCEO", replies: 345, likes: 567, category: "Green Manufacturing", timestamp: "3 hours ago" },
  { title: "Circular economy business model: 18-month results", author: "CircularBiz", replies: 234, likes: 456, category: "Circular Economy", timestamp: "1 day ago" },
  { title: "Sustainable packaging reduced costs by 40%", author: "PackagingPro", replies: 189, likes: 312, category: "Packaging Innovation", timestamp: "2 days ago" }
];

const communityFeatures = [
  { icon: Building2, title: "Business Network", description: "Connect with sustainability officers and green business leaders.", color: "text-gray-500", bgColor: "bg-gray-500/10" },
  { icon: Calendar, title: "Industry Events", description: "Join webinars, conferences, and sustainable manufacturing workshops.", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: BookOpen, title: "Resource Hub", description: "Access case studies, certification guides, and implementation frameworks.", color: "text-green-500", bgColor: "bg-green-500/10" }
];

export function IndustryLandingPage({ onNavigate, onTopicClick, user }: IndustryLandingPageProps) {
  return (
    <TopicPage
      topicData={{
        category: "industry",
        categoryDisplayName: "Industry",
        categoryIcon: Factory,
        heroTitle: "Sustainable",
        heroHighlight: "Industry",
        heroDescription: "Connect with business leaders transforming manufacturing, supply chains, and industrial processes. Build a sustainable economy together.",
        heroBadgeText: "Industry Community",
        primaryGradient: "from-gray-500 to-blue-500",
        accentColor: "gray",
        stats: stats,
        topics: topics,
        topicsCount: 6,
        topicsSectionTitle: "Industry Topics",
        topicsSectionDescription: "Explore sustainable business practices and industrial innovation.",
        topicsIcon: Factory,
        featuredDiscussions: discussions,
        communityFeatures: communityFeatures,
        ctaTitle: "Ready to Transform Your Business?",
        ctaDescription: "Join 6,500+ business leaders implementing sustainable practices and driving green innovation.",
        ctaMemberCount: "6,500+",
      }}
      onNavigate={onNavigate}
      user={user}
    />
  );
}
