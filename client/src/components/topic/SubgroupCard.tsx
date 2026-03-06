import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Shield } from "lucide-react";
import { GlassCard } from "@/components/glass/GlassCard";

interface SubgroupCardProps {
  name: string;
  type: "Campus" | "City" | "Professional Guild" | "ERG";
  members: number;
  description: string;
  isVetted?: boolean;
}

export function SubgroupCard({ name, type, members, description, isVetted = false }: SubgroupCardProps) {
  return (
    <GlassCard className="h-full hover:bg-white/10 transition-all">
      <div className="p-6 space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-3">
            <Badge variant="secondary" className="text-xs bg-white/10 text-white/80 border-white/20">
              {type}
            </Badge>
            {isVetted && (
              <Badge variant="default" className="text-xs bg-green-600/80 text-white border-green-500/30">
                <Shield className="h-3 w-3 mr-1" />
                Vetted
              </Badge>
            )}
          </div>
          <h3 className="text-lg font-semibold leading-tight text-white mb-2">{name}</h3>
          <div className="flex items-center gap-1 text-xs text-white/60">
            <Users className="h-3 w-3" />
            <span>{members} members</span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-white/70">{description}</p>
        <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" size="sm">
          Join Subgroup
        </Button>
      </div>
    </GlassCard>
  );
}