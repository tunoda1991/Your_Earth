import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle2, Star } from "lucide-react";

interface ReputationMeterProps {
  points: number;
  level: string;
  badges: Array<{
    name: string;
    type: "verified" | "vetted" | "evidence" | "organizer";
  }>;
  contributions: {
    answersAccepted: number;
    actionsCompleted: number;
    sourcesAdded: number;
  };
}

export function ReputationMeter({ points, level, badges, contributions }: ReputationMeterProps) {
  const badgeIcons = {
    verified: CheckCircle2,
    vetted: Star,
    evidence: Award,
    organizer: Award
  };

  const badgeColors = {
    verified: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    vetted: "bg-purple-500/10 text-purple-700 border-purple-500/20",
    evidence: "bg-green-500/10 text-green-700 border-green-500/20",
    organizer: "bg-orange-500/10 text-orange-700 border-orange-500/20"
  };

  return (
    <div className="space-y-6">
      {/* Points and Level */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold font-mono text-primary">{points}</div>
          <div className="text-sm text-muted-foreground">Reputation points</div>
        </div>
        <Badge variant="default" className="text-sm px-3 py-1">
          {level}
        </Badge>
      </div>

      {/* Progress to next level */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress to next level</span>
          <span>{Math.min(Math.round((points % 1000) / 10), 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min((points % 1000) / 10, 100)}%` }}
          />
        </div>
      </div>

      {/* Badges */}
      <div className="space-y-2">
        <div className="text-sm font-semibold">Badges Earned</div>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => {
            const Icon = badgeIcons[badge.type];
            return (
              <Badge key={index} variant="outline" className={`text-xs ${badgeColors[badge.type]}`}>
                <Icon className="h-3 w-3 mr-1" />
                {badge.name}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Contributions */}
      <div className="space-y-2">
        <div className="text-sm font-semibold">Contributions</div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xl font-bold font-mono">{contributions.answersAccepted}</div>
            <div className="text-xs text-muted-foreground">Accepted answers</div>
          </div>
          <div>
            <div className="text-xl font-bold font-mono">{contributions.actionsCompleted}</div>
            <div className="text-xs text-muted-foreground">Actions completed</div>
          </div>
          <div>
            <div className="text-xl font-bold font-mono">{contributions.sourcesAdded}</div>
            <div className="text-xs text-muted-foreground">Sources added</div>
          </div>
        </div>
      </div>
    </div>
  );
}
