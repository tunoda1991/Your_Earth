import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Calendar, Users } from "lucide-react";
import { GlassCard } from "@/components/glass/GlassCard";
import { motion } from "framer-motion";

interface ActionCardProps {
  title: string;
  brief: string;
  target?: string;
  deadline?: string;
  role?: string;
  status?: "open" | "in-progress" | "completed";
}

export function ActionCard({ title, brief, target, deadline, role, status = "open" }: ActionCardProps) {
  const statusColors = {
    open: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "in-progress": "bg-orange-500/20 text-orange-300 border-orange-500/30",
    completed: "bg-green-500/20 text-green-300 border-green-500/30"
  };

  const statusLabels = {
    open: "Open",
    "in-progress": "In Progress",
    completed: "Completed"
  };

  const handleTakeAction = () => {
    console.log("Taking action:", title);
    // Handle action click
  };

  return (
    <GlassCard className="h-full hover:bg-white/10 transition-all group">
      <div className="p-6 space-y-4 h-full flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-lg leading-tight flex-1 text-white group-hover:text-green-400 transition-colors">
            {title}
          </h3>
          <Badge className={`${statusColors[status]} flex-shrink-0`} variant="outline">
            {statusLabels[status]}
          </Badge>
        </div>
        
        <p className="text-sm text-white/70 leading-relaxed flex-1">
          {brief}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {target && (
            <Badge variant="secondary" className="text-xs font-normal bg-white/10 text-white/80 border-white/20">
              <Target className="h-3 w-3 mr-1" />
              {target}
            </Badge>
          )}
          {deadline && (
            <Badge variant="secondary" className="text-xs font-normal bg-white/10 text-white/80 border-white/20">
              <Calendar className="h-3 w-3 mr-1" />
              {deadline}
            </Badge>
          )}
          {role && (
            <Badge variant="secondary" className="text-xs font-normal bg-white/10 text-white/80 border-white/20">
              <Users className="h-3 w-3 mr-1" />
              {role}
            </Badge>
          )}
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/25" 
            size="sm"
            onClick={handleTakeAction}
          >
            Take Action
          </Button>
        </motion.div>
      </div>
    </GlassCard>
  );
}
