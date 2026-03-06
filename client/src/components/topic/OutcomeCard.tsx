import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText } from "lucide-react";
import { GlassCard } from "@/components/glass/GlassCard";
import { motion } from "framer-motion";

interface OutcomeCardProps {
  title: string;
  status: "PASSED" | "IN PROGRESS" | "ANNOUNCED" | "FAILED";
  date: string;
  description: string;
  artifacts?: Array<{ label: string; url: string }>;
}

export function OutcomeCard({ title, status, date, description, artifacts = [] }: OutcomeCardProps) {
  const statusColors = {
    PASSED: "bg-green-600/90 text-white border-green-500/50",
    "IN PROGRESS": "bg-blue-600/90 text-white border-blue-500/50",
    ANNOUNCED: "bg-purple-600/90 text-white border-purple-500/50",
    FAILED: "bg-red-600/90 text-white border-red-500/50"
  };

  const handleViewDashboard = () => {
    console.log("Viewing dashboard for:", title);
  };

  const handleArtifactClick = (artifact: { label: string; url: string }) => {
    if (artifact.url && artifact.url !== '#') {
      window.open(artifact.url, '_blank');
    } else {
      console.log("Opening artifact:", artifact.label);
    }
  };

  return (
    <GlassCard className="hover:bg-white/10 transition-all">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-lg leading-tight flex-1 text-white">
            {title}
          </h3>
          <Badge className={`${statusColors[status]} flex-shrink-0`}>
            {status}
          </Badge>
        </div>

        <div className="text-xs text-white/50">{date}</div>

        <p className="text-sm leading-relaxed text-white/70">{description}</p>

        {artifacts.length > 0 && (
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white/60">Public artifacts:</div>
            <div className="flex flex-wrap gap-2">
              {artifacts.map((artifact, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8 bg-white/5 hover:bg-white/10 text-white border-white/20"
                    onClick={() => handleArtifactClick(artifact)}
                  >
                    <FileText className="h-3 w-3 mr-1.5" />
                    {artifact.label}
                    <ExternalLink className="h-3 w-3 ml-1.5" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="outline" 
            className="w-full bg-white/5 hover:bg-white/10 text-white border-white/20" 
            size="sm"
            onClick={handleViewDashboard}
          >
            View Full Dashboard
          </Button>
        </motion.div>
      </div>
    </GlassCard>
  );
}
