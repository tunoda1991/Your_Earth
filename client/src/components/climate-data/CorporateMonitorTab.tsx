import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowRight, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function CorporateMonitorTab() {
  const [industry, setIndustry] = useState('all');
  const [emissionsRange, setEmissionsRange] = useState([0, 1000]);
  const [esgFilter, setEsgFilter] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const topPolluters = [
    { rank: 1, name: 'Saudi Aramco', industry: 'Oil & Gas', co2: '59.3 Mt', trend: 'up', esg: 42, change: '+2.3%' },
    { rank: 2, name: 'China Coal Energy', industry: 'Coal Mining', co2: '51.2 Mt', trend: 'up', esg: 38, change: '+1.8%' },
    { rank: 3, name: 'Gazprom', industry: 'Oil & Gas', co2: '48.7 Mt', trend: 'down', esg: 45, change: '-0.5%' },
    { rank: 4, name: 'ExxonMobil', industry: 'Oil & Gas', co2: '41.9 Mt', trend: 'up', esg: 52, change: '+0.8%' },
    { rank: 5, name: 'Coal India', industry: 'Coal Mining', co2: '39.4 Mt', trend: 'up', esg: 41, change: '+3.1%' },
    { rank: 6, name: 'BP', industry: 'Oil & Gas', co2: '34.2 Mt', trend: 'down', esg: 58, change: '-1.2%' },
    { rank: 7, name: 'Chevron', industry: 'Oil & Gas', co2: '33.8 Mt', trend: 'up', esg: 54, change: '+0.4%' },
    { rank: 8, name: 'Pemex', industry: 'Oil & Gas', co2: '32.1 Mt', trend: 'up', esg: 39, change: '+2.7%' },
    { rank: 9, name: 'Shell', industry: 'Oil & Gas', co2: '31.5 Mt', trend: 'down', esg: 61, change: '-2.1%' },
    { rank: 10, name: 'Sinopec', industry: 'Oil & Gas', co2: '29.8 Mt', trend: 'up', esg: 47, change: '+1.5%' },
  ];

  const climateChampions = [
    { rank: 1, name: 'Ørsted', industry: 'Energy', reduction: '87%', initiatives: 'Wind Energy', esg: 92 },
    { rank: 2, name: 'Tesla', industry: 'Automotive', reduction: '68%', initiatives: 'EV Production', esg: 88 },
    { rank: 3, name: 'Vestas', industry: 'Manufacturing', reduction: '72%', initiatives: 'Wind Turbines', esg: 89 },
    { rank: 4, name: 'Iberdrola', industry: 'Energy', reduction: '65%', initiatives: 'Renewables', esg: 87 },
    { rank: 5, name: 'Unilever', industry: 'Consumer Goods', reduction: '52%', initiatives: 'Supply Chain', esg: 84 },
    { rank: 6, name: 'Microsoft', industry: 'Technology', reduction: '48%', initiatives: 'Carbon Negative', esg: 91 },
    { rank: 7, name: 'Neste', industry: 'Oil & Gas', reduction: '45%', initiatives: 'Renewable Diesel', esg: 82 },
    { rank: 8, name: 'Schneider Electric', industry: 'Manufacturing', reduction: '43%', initiatives: 'Efficiency', esg: 86 },
    { rank: 9, name: 'Apple', industry: 'Technology', reduction: '40%', initiatives: 'Carbon Neutral', esg: 89 },
    { rank: 10, name: 'Enel', industry: 'Energy', reduction: '38%', initiatives: 'Solar & Wind', esg: 85 },
  ];

  const industryData = [
    { industry: 'Oil & Gas', emissions: 487 },
    { industry: 'Coal Mining', emissions: 423 },
    { industry: 'Steel', emissions: 312 },
    { industry: 'Cement', emissions: 289 },
    { industry: 'Aviation', emissions: 245 },
    { industry: 'Shipping', emissions: 198 },
    { industry: 'Agriculture', emissions: 176 },
    { industry: 'Chemical', emissions: 154 },
  ];

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Industry</label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="bg-slate-900/50 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="oil-gas">Oil & Gas</SelectItem>
                <SelectItem value="coal">Coal Mining</SelectItem>
                <SelectItem value="steel">Steel</SelectItem>
                <SelectItem value="cement">Cement</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Emissions Range: {emissionsRange[0]}-{emissionsRange[1]} Mt
            </label>
            <Slider
              value={emissionsRange}
              onValueChange={setEmissionsRange}
              max={1000}
              step={10}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">ESG Score</label>
            <Select value={esgFilter} onValueChange={setEsgFilter}>
              <SelectTrigger className="bg-slate-900/50 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                <SelectItem value="all">All Scores</SelectItem>
                <SelectItem value="high">High (80+)</SelectItem>
                <SelectItem value="medium">Medium (50-79)</SelectItem>
                <SelectItem value="low">Low (&lt;50)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Top Polluters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-red-500/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-red-400">Top Polluters</h3>
            <div className="px-3 py-1 bg-red-500/20 rounded-full text-sm text-red-400 border border-red-500/30">
              High Risk
            </div>
          </div>

          <div className="space-y-3">
            {topPolluters.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-slate-900/50 border border-white/5 rounded-lg p-4 hover:bg-slate-900/70 hover:border-red-500/30 transition-all cursor-pointer group"
                onClick={() => setSelectedCompany(company)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-slate-600">#{company.rank}</span>
                      <div>
                        <h4 className="font-semibold group-hover:text-red-400 transition-colors">
                          {company.name}
                        </h4>
                        <p className="text-sm text-slate-400">{company.industry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-red-400 font-bold">{company.co2}</span>
                      <div className="flex items-center gap-1">
                        {company.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-red-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-emerald-500" />
                        )}
                        <span className={company.trend === 'up' ? 'text-red-400' : 'text-emerald-400'}>
                          {company.change}
                        </span>
                      </div>
                      <span className="text-slate-400">ESG: {company.esg}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-red-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          <Button className="w-full mt-6 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30">
            View All Polluters
          </Button>
        </motion.div>

        {/* Right Column - Climate Champions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-emerald-500/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-emerald-400">Climate Champions</h3>
            <div className="px-3 py-1 bg-emerald-500/20 rounded-full text-sm text-emerald-400 border border-emerald-500/30">
              Leading Change
            </div>
          </div>

          <div className="space-y-3">
            {climateChampions.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-slate-900/50 border border-white/5 rounded-lg p-4 hover:bg-slate-900/70 hover:border-emerald-500/30 transition-all cursor-pointer group"
                onClick={() => setSelectedCompany(company)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-slate-600">#{company.rank}</span>
                      <div>
                        <h4 className="font-semibold group-hover:text-emerald-400 transition-colors">
                          {company.name}
                        </h4>
                        <p className="text-sm text-slate-400">{company.industry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-emerald-400 font-bold">↓ {company.reduction}</span>
                      <span className="text-slate-400">{company.initiatives}</span>
                      <span className="text-slate-400">ESG: {company.esg}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          <Button className="w-full mt-6 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30">
            View All Champions
          </Button>
        </motion.div>
      </div>

      {/* Industry Emissions Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-2xl font-bold mb-6">Industry Emissions Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={industryData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis dataKey="industry" type="category" stroke="#94a3b8" width={120} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="emissions" fill="#ef4444" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Company Detail Modal */}
      <Dialog open={!!selectedCompany} onOpenChange={() => setSelectedCompany(null)}>
        <DialogContent className="bg-slate-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>{selectedCompany?.name}</DialogTitle>
            <DialogDescription className="text-slate-400">
              {selectedCompany?.industry}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950/50 p-4 rounded-lg border border-white/5">
                <div className="text-sm text-slate-400 mb-1">Annual CO2</div>
                <div className="text-2xl font-bold text-red-400">{selectedCompany?.co2}</div>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-lg border border-white/5">
                <div className="text-sm text-slate-400 mb-1">ESG Score</div>
                <div className="text-2xl font-bold text-blue-400">{selectedCompany?.esg}</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Detailed company information and sustainability metrics would be displayed here.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
