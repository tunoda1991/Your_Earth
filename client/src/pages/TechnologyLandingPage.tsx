import { TopicPage } from "./TopicPage";
import { 
  Users, 
  Code, 
  TrendingUp, 
  Award, 
  Cloud, 
  Cpu, 
  Smartphone, 
  Laptop, 
  BookOpen, 
  Calendar 
} from "lucide-react";

interface TechnologyLandingPageProps {
  onNavigate?: (page: string) => void;
  onTopicClick?: (topic: any) => void;
  user?: any;
}

const stats = [
  { title: "Tech Innovators", value: "11,234", change: "+678 this month", icon: Users },
  { title: "Open Projects", value: "456", change: "+34 this week", icon: Code },
  { title: "Carbon Avoided", value: "890K tons", change: "Through tech", icon: TrendingUp },
  { title: "Startups", value: "789", change: "Climate tech", icon: Award }
];

const topics = [
  { icon: Cloud, title: "Green Cloud Computing", posts: 2134, members: 4567, description: "Energy-efficient data centers and sustainable cloud practices", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: Code, title: "Climate Tech Startups", posts: 1876, members: 3987, description: "Innovative solutions tackling climate challenges", color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { icon: Cpu, title: "AI for Climate", posts: 1543, members: 3456, description: "Machine learning applications in climate science", color: "text-green-500", bgColor: "bg-green-500/10" },
  { icon: Smartphone, title: "Sustainable Hardware", posts: 1234, members: 2876, description: "Fair electronics, repairability, and e-waste reduction", color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { icon: Laptop, title: "Green Software", posts: 987, members: 2345, description: "Energy-efficient code and sustainable development", color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
  { icon: Award, title: "Tech Policy", posts: 765, members: 1876, description: "Technology regulation and digital sustainability", color: "text-red-500", bgColor: "bg-red-500/10" }
];

const discussions = [
  { title: "Built an AI model that predicts wildfire spread", author: "MLEngineer", replies: 567, likes: 891, category: "AI for Climate", timestamp: "2 hours ago" },
  { title: "Our startup's carbon tracking API - open beta", author: "ClimateDev", replies: 345, likes: 678, category: "Climate Tech Startups", timestamp: "1 day ago" },
  { title: "Reducing data center energy use by 60%", author: "CloudArchitect", replies: 234, likes: 456, category: "Green Cloud Computing", timestamp: "2 days ago" }
];

const communityFeatures = [
  { icon: Code, title: "Developer Resources", description: "APIs, SDKs, and open-source climate tech projects.", color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { icon: Calendar, title: "Hackathons", description: "Join climate tech hackathons and innovation challenges.", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: BookOpen, title: "Tech Library", description: "Documentation, tutorials, and climate tech research papers.", color: "text-green-500", bgColor: "bg-green-500/10" }
];

export function TechnologyLandingPage({ onNavigate, onTopicClick, user }: TechnologyLandingPageProps) {
  return (
    <TopicPage
      topicData={{
        category: "technology",
        categoryDisplayName: "Technology",
        categoryIcon: Laptop,
        heroTitle: "Climate",
        heroHighlight: "Technology",
        heroDescription: "Join developers, engineers, and innovators building technology solutions for climate change. Code for the planet.",
        heroBadgeText: "Technology Community",
        primaryGradient: "from-purple-500 to-blue-500",
        accentColor: "purple",
        stats: stats,
        topics: topics,
        topicsCount: 6,
        topicsSectionTitle: "Technology Topics",
        topicsSectionDescription: "Explore cutting-edge climate tech innovations and sustainable development.",
        topicsIcon: Laptop,
        featuredDiscussions: discussions,
        communityFeatures: communityFeatures,
        ctaTitle: "Ready to Code for Climate?",
        ctaDescription: "Join 11,000+ tech innovators building solutions, sharing code, and accelerating climate action.",
        ctaMemberCount: "11,000+",
      }}
      onNavigate={onNavigate}
      user={user}
    />
  );
}
