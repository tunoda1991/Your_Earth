import { TopicPage } from "./TopicPage";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Zap, 
  Sun, 
  Wind, 
  Battery, 
  Lightbulb, 
  Award, 
  BookOpen, 
  Calendar 
} from "lucide-react";

interface EnergyLandingPageProps {
  onNavigate?: (page: string) => void;
  onTopicClick?: (topic: any) => void;
  user?: any;
}

const energyStats = [
  {
    title: "Community Members",
    value: "8,234",
    change: "+342 this month",
    icon: Users
  },
  {
    title: "Active Discussions",
    value: "1,456",
    change: "+89 this week",
    icon: MessageSquare
  },
  {
    title: "Renewable Projects",
    value: "347",
    change: "+23 new projects",
    icon: TrendingUp
  },
  {
    title: "Energy Saved",
    value: "12.4 MWh",
    change: "This month",
    icon: Zap
  }
];

const topicsData = [
  {
    icon: Sun,
    title: "Solar Energy",
    posts: 1243,
    members: 3456,
    description: "Solar panel installations, efficiency tips, and cost-benefit discussions",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    icon: Wind,
    title: "Wind Power",
    posts: 892,
    members: 2134,
    description: "Wind turbine technology, residential wind power, and wind farm updates",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Battery,
    title: "Energy Storage",
    posts: 756,
    members: 1876,
    description: "Battery technology, grid storage solutions, and home energy systems",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: Lightbulb,
    title: "Energy Efficiency",
    posts: 1567,
    members: 4123,
    description: "Home efficiency, smart devices, and consumption reduction strategies",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    icon: Zap,
    title: "Grid & Infrastructure",
    posts: 534,
    members: 987,
    description: "Smart grids, microgrids, and energy distribution innovation",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10"
  },
  {
    icon: Award,
    title: "Policy & Incentives",
    posts: 423,
    members: 1234,
    description: "Tax credits, rebates, and renewable energy legislation",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  }
];

const featuredDiscussions = [
  {
    title: "My solar panel ROI after 2 years - detailed breakdown",
    author: "SolarSam",
    replies: 234,
    likes: 456,
    category: "Solar Energy",
    timestamp: "2 hours ago"
  },
  {
    title: "Best battery storage systems for residential use in 2026?",
    author: "EnergyEnthusiast",
    replies: 156,
    likes: 289,
    category: "Energy Storage",
    timestamp: "5 hours ago"
  },
  {
    title: "Community wind farm - looking for co-investors",
    author: "WindPower101",
    replies: 89,
    likes: 178,
    category: "Wind Power",
    timestamp: "1 day ago"
  }
];

const communityFeatures = [
  {
    icon: Users,
    title: "Expert Community",
    description: "Learn from engineers, installers, and renewable energy professionals.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    icon: Calendar,
    title: "Events & Meetups",
    description: "Join local energy efficiency workshops and renewable energy tours.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: BookOpen,
    title: "Resources Library",
    description: "Access guides, calculators, and tools for your energy projects.",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  }
];

export function EnergyLandingPage({ onNavigate, onTopicClick, user }: EnergyLandingPageProps) {
  return (
    <TopicPage
      topicData={{
        category: "energy",
        categoryDisplayName: "Energy",
        categoryIcon: Zap,
        heroTitle: "Renewable",
        heroHighlight: "Energy",
        heroDescription: "Join thousands of renewable energy enthusiasts sharing knowledge about solar, wind, hydro, and energy efficiency. Power the future together.",
        heroBadgeText: "Energy Community",
        primaryGradient: "from-yellow-500 to-orange-500",
        accentColor: "yellow",
        stats: energyStats,
        topics: topicsData,
        topicsCount: 6,
        topicsSectionTitle: "Energy Topics",
        topicsSectionDescription: "Explore specialized topics and connect with experts in renewable energy technologies.",
        topicsIcon: Lightbulb,
        featuredDiscussions: featuredDiscussions,
        communityFeatures: communityFeatures,
        ctaTitle: "Ready to Join the Energy Revolution?",
        ctaDescription: "Connect with 8,000+ renewable energy enthusiasts, share your projects, and learn from the best.",
        ctaMemberCount: "8,000+",
      }}
      onNavigate={onNavigate}
      user={user}
    />
  );
}
