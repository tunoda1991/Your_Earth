import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, ExternalLink } from 'lucide-react';

interface ClimateRiskMapProps {
  riskType?: string;
}

export function ClimateRiskMap({ riskType = 'days-above-32c' }: ClimateRiskMapProps) {
  const [loading, setLoading] = useState(true);

  // Map of risk types to Probable Futures dataset IDs and descriptions
  const riskMaps = {
    'days-above-32c': {
      name: 'Days above 32°C (90°F)',
      description: 'Number of days per year with temperatures exceeding 32°C',
      datasetId: '40104',
      embedUrl: 'https://probablefutures.org/maps/?selected_map=days-above-32c&volume=heat'
    },
    'wildfire-risk': {
      name: 'Wildfire Risk',
      description: 'Change in wildfire danger days',
      datasetId: '40401',
      embedUrl: 'https://probablefutures.org/maps/?selected_map=change-wildfire-days&volume=land'
    },
    'drought-risk': {
      name: 'Drought Risk', 
      description: 'Change in dry hot days',
      datasetId: '40201',
      embedUrl: 'https://probablefutures.org/maps/?selected_map=change-dry-hot-days&volume=water'
    },
    'precipitation': {
      name: 'Heavy Precipitation',
      description: 'Change in frequency of 1-in-100 year storms',
      datasetId: '40302',
      embedUrl: 'https://probablefutures.org/maps/?selected_map=change-intensity-heavy-precipitation&volume=water'
    }
  };

  const currentRisk = riskMaps[riskType as keyof typeof riskMaps] || riskMaps['days-above-32c'];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [riskType]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
      {/* Embedded Probable Futures Map */}
      <iframe
        src={currentRisk.embedUrl}
        className="w-full h-full border-0"
        title={`Climate Risk Map: ${currentRisk.name}`}
        allow="geolocation"
        onLoad={() => setLoading(false)}
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-sm">Loading climate risk data...</p>
          </div>
        </div>
      )}

      {/* Info Panel */}
      <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm p-4 rounded-lg border z-10 max-w-sm">
        <div className="flex items-start gap-2 mb-2">
          <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-sm mb-1">{currentRisk.name}</h4>
            <p className="text-xs text-muted-foreground mb-2">
              {currentRisk.description}
            </p>
            <Badge variant="secondary" className="text-xs">
              Climate Scenario: +1.5°C warming
            </Badge>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t">
          <a 
            href="https://probablefutures.org/climate-maps/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            View more climate maps
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Legend Info */}
      <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm p-3 rounded-lg border z-10 text-xs max-w-xs">
        <p className="font-medium mb-1">Risk Levels:</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-blue-500 rounded"></div>
            <span>Low Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-yellow-500 rounded"></div>
            <span>Moderate Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-orange-500 rounded"></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-red-600 rounded"></div>
            <span>Extreme Risk</span>
          </div>
        </div>
      </div>

      {/* Data Attribution */}
      <div className="absolute bottom-4 right-4 bg-background/70 backdrop-blur-sm px-3 py-1 rounded text-xs text-muted-foreground z-10">
        Data from Probable Futures
      </div>
    </div>
  );
}
