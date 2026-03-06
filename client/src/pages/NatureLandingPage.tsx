import { TopicPage } from "./TopicPage";
import { 
  Users, 
  TreePine, 
  Mountain, 
  Bird, 
  Trees, 
  Flower, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Calendar 
} from "lucide-react";

interface NatureLandingPageProps {
  onNavigate?: (page: string) => void;
  onTopicClick?: (topic: any) => void;
  user?: any;
}

const stats = [
  { title: "Nature Lovers", value: "15,678", change: "+892 this month", icon: Users },
  { title: "Trees Planted", value: "234K", change: "Community total", icon: TreePine },
  { title: "Acres Protected", value: "12,456", change: "This year", icon: Mountain },
  { title: "Species Tracked", value: "3,456", change: "Conservation efforts", icon: Bird }
];

const topics = [
  { icon: Trees, title: "Reforestation", posts: 2876, members: 5432, description: "Tree planting, forest restoration, and afforestation", color: "text-green-500", bgColor: "bg-green-500/10" },
  { icon: Bird, title: "Wildlife Conservation", posts: 2345, members: 4876, description: "Protecting endangered species and habitats", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: Mountain, title: "Protected Areas", posts: 1876, members: 3987, description: "National parks, reserves, and land conservation", color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { icon: Flower, title: "Biodiversity", posts: 1654, members: 3456, description: "Ecosystem health, species diversity, and balance", color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { icon: TreePine, title: "Urban Nature", posts: 1432, members: 2987, description: "Green spaces, urban forests, and city rewilding", color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
  { icon: Award, title: "Conservation Careers", posts: 987, members: 2345, description: "Jobs and opportunities in nature conservation", color: "text-orange-500", bgColor: "bg-orange-500/10" }
];

const discussions = [
  { title: "Community forest project: 10,000 trees in one month!", author: "TreePlanter", replies: 789, likes: 1456, category: "Reforestation", timestamp: "2 hours ago" },
  { title: "Wildlife corridor success story - before and after", author: "Conservationist", replies: 456, likes: 892, category: "Wildlife Conservation", timestamp: "1 day ago" },
  { title: "How to create a backyard wildlife habitat", author: "NatureGardener", replies: 567, likes: 934, category: "Biodiversity", timestamp: "2 days ago" }
];

const communityFeatures = [
  { icon: TreePine, title: "Planting Events", description: "Join community tree planting and habitat restoration projects.", color: "text-green-500", bgColor: "bg-green-500/10" },
  { icon: Calendar, title: "Nature Walks", description: "Guided hikes, wildlife watching, and ecology field trips.", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: BookOpen, title: "Conservation Library", description: "Species guides, restoration techniques, and ecology resources.", color: "text-emerald-500", bgColor: "bg-emerald-500/10" }
];

export function NatureLandingPage({ onNavigate, onTopicClick, user }: NatureLandingPageProps) {
  return (
    <TopicPage
      topicData={{
        category: "nature",
        categoryDisplayName: "Nature",
        categoryIcon: TreePine,
        heroTitle: "Protecting",
        heroHighlight: "Nature",
        heroDescription: "Join a global community of conservationists, nature lovers, and activists protecting wildlife, restoring ecosystems, and rewilding our planet.",
        heroBadgeText: "Nature Community",
        primaryGradient: "from-green-500 to-emerald-500",
        accentColor: "green",
        stats: stats,
        topics: topics,
        topicsCount: 6,
        topicsSectionTitle: "Nature Topics",
        topicsSectionDescription: "Explore conservation efforts from reforestation to wildlife protection.",
        topicsIcon: TreePine,
        featuredDiscussions: discussions,
        communityFeatures: communityFeatures,
        ctaTitle: "Ready to Protect Our Planet's Nature?",
        ctaDescription: "Join 15,000+ conservationists planting trees, protecting wildlife, and restoring ecosystems worldwide.",
        ctaMemberCount: "15,000+",
      }}
      onNavigate={onNavigate}
      user={user}
    />
  );
}
