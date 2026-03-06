import { TopicPage } from "./TopicPage";
import { 
  Users, 
  Car, 
  TrendingUp, 
  Bus, 
  Zap, 
  Bike, 
  Train, 
  Award, 
  BookOpen, 
  Calendar 
} from "lucide-react";

interface MobilityLandingPageProps {
  onNavigate?: (page: string) => void;
  onTopicClick?: (topic: any) => void;
  user?: any;
}

const mobilityStats = [
  { title: "Community Members", value: "9,876", change: "+423 this month", icon: Users },
  { title: "EVs Discussed", value: "2,345", change: "+178 models", icon: Car },
  { title: "CO₂ Saved", value: "567 tons", change: "This year", icon: TrendingUp },
  { title: "Transit Routes", value: "1,234", change: "Community mapped", icon: Bus }
];

const topicsData = [
  { icon: Zap, title: "Electric Vehicles", posts: 3456, members: 6789, description: "EVs, charging infrastructure, and battery technology", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: Bike, title: "Cycling & Micromobility", posts: 2345, members: 4567, description: "Bikes, e-bikes, scooters, and bike-friendly cities", color: "text-green-500", bgColor: "bg-green-500/10" },
  { icon: Bus, title: "Public Transportation", posts: 1567, members: 3456, description: "Transit systems, bus rapid transit, and accessibility", color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { icon: Train, title: "Rail & High-Speed", posts: 1234, members: 2345, description: "Trains, subways, and high-speed rail networks", color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { icon: Car, title: "Carsharing & Carpooling", posts: 987, members: 1876, description: "Shared mobility services and ride-sharing platforms", color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
  { icon: Award, title: "Mobility Policy", posts: 654, members: 1234, description: "Transportation policy, urban planning, and infrastructure", color: "text-red-500", bgColor: "bg-red-500/10" }
];

const featuredDiscussions = [
  { title: "Switched to EV: Real-world range test after 10,000 miles", author: "EVEnthusiast", replies: 456, likes: 789, category: "Electric Vehicles", timestamp: "4 hours ago" },
  { title: "How my city became bike-friendly - case study", author: "CyclingAdvocate", replies: 234, likes: 567, category: "Cycling & Micromobility", timestamp: "1 day ago" },
  { title: "High-speed rail vs air travel: environmental comparison", author: "TransitNerd", replies: 345, likes: 678, category: "Rail & High-Speed", timestamp: "2 days ago" }
];

const communityFeatures = [
  { icon: Zap, title: "EV Resources", description: "Charging maps, range calculators, and comprehensive EV buying guides.", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: Calendar, title: "Mobility Events", description: "Join EV meetups, bike rides, and transit advocacy gatherings.", color: "text-green-500", bgColor: "bg-green-500/10" },
  { icon: BookOpen, title: "Transit Tools", description: "Trip planners, route optimizers, and multimodal journey guides.", color: "text-orange-500", bgColor: "bg-orange-500/10" }
];

export function MobilityLandingPage({ onNavigate, onTopicClick, user }: MobilityLandingPageProps) {
  return (
    <TopicPage
      topicData={{
        category: "mobility",
        categoryDisplayName: "Mobility",
        categoryIcon: Car,
        heroTitle: "Clean",
        heroHighlight: "Mobility",
        heroDescription: "Join the movement for sustainable transportation. From electric vehicles to public transit, cycling to high-speed rail - let's reimagine how we move.",
        heroBadgeText: "Mobility Community",
        primaryGradient: "from-blue-500 to-cyan-500",
        accentColor: "blue",
        stats: mobilityStats,
        topics: topicsData,
        topicsCount: 6,
        topicsSectionTitle: "Mobility Topics",
        topicsSectionDescription: "Explore clean transportation solutions for people and cities.",
        topicsIcon: Car,
        featuredDiscussions: featuredDiscussions,
        communityFeatures: communityFeatures,
        ctaTitle: "Ready to Join the Mobility Revolution?",
        ctaDescription: "Connect with 9,000+ mobility enthusiasts, share your experiences, and shape the future of transportation.",
        ctaMemberCount: "9,000+",
      }}
      onNavigate={onNavigate}
      user={user}
    />
  );
}
