import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Target, 
  Users, 
  Leaf, 
  Heart,
  TrendingUp,
  MessageCircle,
  Calendar,
  ArrowRight,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  participants: number;
  impact: string;
}

const quickActions: QuickAction[] = [
  {
    id: "solar-pledge",
    title: "Solar Energy Pledge",
    description: "Commit to researching solar installation for your home",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
    participants: 1247,
    impact: "Avg. 2 tons CO₂/year saved"
  },
  {
    id: "tree-planting",
    title: "Community Tree Planting",
    description: "Join local tree planting initiative this weekend",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    participants: 892,
    impact: "Plant 10,000 trees"
  },
  {
    id: "zero-waste",
    title: "30-Day Zero Waste Challenge",
    description: "Reduce single-use plastics and track your progress",
    icon: Target,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    participants: 2134,
    impact: "15kg waste prevented"
  },
  {
    id: "climate-conversation",
    title: "Host a Climate Conversation",
    description: "Organize a discussion with friends and family",
    icon: MessageCircle,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    participants: 567,
    impact: "Reach 1,000+ people"
  },
  {
    id: "bike-to-work",
    title: "Bike to Work Week",
    description: "Pledge to cycle or walk to work for one week",
    icon: TrendingUp,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-950",
    participants: 1893,
    impact: "50kg CO₂ saved/person"
  },
  {
    id: "webinar",
    title: "Climate Action Webinar",
    description: "Join expert-led session on renewable energy tomorrow",
    icon: Calendar,
    color: "text-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-950",
    participants: 456,
    impact: "Learn & share knowledge"
  }
];

interface FloatingActionButtonProps {
  onActionSelect?: (actionId: string) => void;
}

export function FloatingActionButton({ onActionSelect }: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleActionClick = (actionId: string) => {
    setSelectedAction(actionId);
    onActionSelect?.(actionId);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="relative">
              {/* Pulsing Animation Ring */}
              <div className="absolute inset-0 bg-green-500 rounded-full opacity-75" style={{
                animation: "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite"
              }} />
              
              {/* Badge with new campaigns count */}
              <Badge
                className="absolute -top-2 -right-2 bg-red-500 text-white border-2 border-white shadow-lg z-10 px-2 py-1"
                style={{
                  animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                }}
              >
                47 new
              </Badge>

              {/* Main Button */}
              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-2xl hover:shadow-green-500/50 transition-all duration-300 px-6 py-6 h-auto text-base font-semibold group"
              >
                <Zap className="mr-2 h-5 w-5" style={{
                  animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                }} />
                Take Action Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Action Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Zap className="h-6 w-6 text-green-600" />
              Quick Climate Actions
            </DialogTitle>
            <DialogDescription>
              Choose an action to make an immediate impact. Join thousands of others taking action today!
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card
                  key={action.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-green-500"
                  onClick={() => handleActionClick(action.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${action.bgColor}`}>
                        <Icon className={`h-6 w-6 ${action.color}`} />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        {action.participants.toLocaleString()}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-4">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Heart className="h-4 w-4 text-green-600" />
                        <span>{action.impact}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-green-600">
                        Join Now
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Modal Footer */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium">
                  <span className="text-green-600 font-bold">2,847 actions</span> taken today
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Browse All Campaigns
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}