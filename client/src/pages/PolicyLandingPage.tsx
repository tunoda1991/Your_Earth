import { TopicPage } from "./TopicPage";
import { 
  Users, 
  Vote, 
  FileText, 
  Award, 
  Globe, 
  Gavel, 
  Scale, 
  TrendingUp, 
  BookOpen, 
  Calendar 
} from "lucide-react";

interface PolicyLandingPageProps {
  onNavigate?: (page: string) => void;
  onTopicClick?: (topic: any) => void;
  user?: any;
}

const stats = [
  { title: "Policy Advocates", value: "7,891", change: "+345 this month", icon: Users },
  { title: "Active Campaigns", value: "156", change: "+12 this week", icon: Vote },
  { title: "Bills Tracked", value: "432", change: "Globally", icon: FileText },
  { title: "Victories", value: "89", change: "This year", icon: Award }
];

const topics = [
  { icon: Globe, title: "International Climate Policy", posts: 1876, members: 4123, description: "UN agreements, COP summits, and global cooperation", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: Gavel, title: "National Legislation", posts: 1543, members: 3456, description: "Country-level climate laws and regulations", color: "text-red-500", bgColor: "bg-red-500/10" },
  { icon: FileText, title: "Carbon Pricing", posts: 1234, members: 2876, description: "Carbon tax, cap-and-trade, and market mechanisms", color: "text-green-500", bgColor: "bg-green-500/10" },
  { icon: Vote, title: "Advocacy & Activism", posts: 1987, members: 4567, description: "Grassroots organizing and political engagement", color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { icon: Scale, title: "Environmental Justice", posts: 1456, members: 3234, description: "Equity, frontline communities, and just transition", color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { icon: Award, title: "Local Policy", posts: 1098, members: 2345, description: "City and regional climate action plans", color: "text-cyan-500", bgColor: "bg-cyan-500/10" }
];

const discussions = [
  { title: "COP31 outcomes: What they mean for climate action", author: "PolicyExpert", replies: 678, likes: 1234, category: "International Climate Policy", timestamp: "1 hour ago" },
  { title: "How we passed a city-wide green building ordinance", author: "LocalActivist", replies: 345, likes: 567, category: "Local Policy", timestamp: "1 day ago" },
  { title: "Carbon pricing effectiveness: 10-year analysis", author: "EconResearcher", replies: 456, likes: 789, category: "Carbon Pricing", timestamp: "3 days ago" }
];

const communityFeatures = [
  { icon: Vote, title: "Advocacy Tools", description: "Campaign templates, contact databases, and action planning guides.", color: "text-red-500", bgColor: "bg-red-500/10" },
  { icon: Calendar, title: "Policy Events", description: "Town halls, hearings, and policy workshops in your area.", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: BookOpen, title: "Policy Library", description: "Legislation tracker, policy briefs, and research reports.", color: "text-green-500", bgColor: "bg-green-500/10" }
];

export function PolicyLandingPage({ onNavigate, onTopicClick, user }: PolicyLandingPageProps) {
  return (
    <TopicPage
      topicData={{
        category: "policy",
        categoryDisplayName: "Policy",
        categoryIcon: Scale,
        heroTitle: "Climate",
        heroHighlight: "Policy",
        heroDescription: "Join advocates, policymakers, and citizens shaping climate legislation at all levels. Make your voice heard and drive systemic change.",
        heroBadgeText: "Policy Community",
        primaryGradient: "from-red-500 to-orange-500",
        accentColor: "red",
        stats: stats,
        topics: topics,
        topicsCount: 6,
        topicsSectionTitle: "Policy Topics",
        topicsSectionDescription: "Explore climate policy from local ordinances to international agreements.",
        topicsIcon: Scale,
        featuredDiscussions: discussions,
        communityFeatures: communityFeatures,
        ctaTitle: "Ready to Shape Climate Policy?",
        ctaDescription: "Join 7,800+ advocates tracking legislation, organizing campaigns, and winning climate victories.",
        ctaMemberCount: "7,800+",
      }}
      onNavigate={onNavigate}
      user={user}
    />
  );
}
