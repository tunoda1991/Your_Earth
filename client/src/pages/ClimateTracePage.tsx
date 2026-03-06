import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/glass/GlassCard";
import { ClimateTraceEmissions } from "@/components/ClimateTraceEmissions";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";

interface ClimateTracePageProps {
  onNavigate: (page: string) => void;
}

export function ClimateTracePage({ onNavigate }: ClimateTracePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => onNavigate('learn')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Learn
        </Button>

        <ClimateTraceEmissions />
      </div>
      
      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </div>
  );
}