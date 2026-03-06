import { motion } from 'framer-motion';
import { Download, RefreshCw, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function DataSourcesFooter() {
  const dataSources = [
    { name: 'NASA', logo: '🛰️', url: 'https://nasa.gov' },
    { name: 'NOAA', logo: '🌊', url: 'https://noaa.gov' },
    { name: 'IEA', logo: '⚡', url: 'https://iea.org' },
    { name: 'World Bank', logo: '🏦', url: 'https://worldbank.org' },
    { name: 'UN', logo: '🌍', url: 'https://un.org' },
    { name: 'Climate TRACE', logo: '📊', url: 'https://climatetrace.org' },
    { name: 'IPCC', logo: '🔬', url: 'https://ipcc.ch' },
    { name: 'EPA', logo: '🏛️', url: 'https://epa.gov' },
  ];

  const lastUpdated = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mt-12 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Data Sources & Methodology</h3>
          <p className="text-slate-400 text-sm">
            Our climate data is aggregated from trusted global institutions and updated regularly
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="bg-white/5 hover:bg-white/10 border-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Raw Data (CSV)
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5">
            <RefreshCw className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {dataSources.map((source, index) => (
          <motion.a
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + index * 0.05 }}
            className="bg-slate-900/50 border border-white/5 rounded-lg p-4 hover:bg-slate-900/70 hover:border-white/20 transition-all group cursor-pointer"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{source.logo}</div>
              <div className="text-sm font-medium mb-1">{source.name}</div>
              <ExternalLink className="w-3 h-3 mx-auto text-slate-600 group-hover:text-blue-400 transition-colors" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Methodology Note */}
      <div className="mt-6 p-4 bg-slate-900/30 border border-white/5 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">Methodology</h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          All data is collected from official sources, cross-referenced for accuracy, and updated on a regular cadence. 
          Corporate emissions data combines direct reporting, estimated values from industry benchmarks, and satellite observations. 
          Country progress metrics are calculated based on official national inventories and third-party verification. 
          Historical climate data uses peer-reviewed datasets with uncertainty ranges included where applicable.
        </p>
      </div>
    </motion.div>
  );
}
