import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle, AlertCircle, Clock, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CountryPledgesTab() {
  const [region, setRegion] = useState('all');
  const [pledgeYear, setPledgeYear] = useState([2025, 2070]);
  const [showOnTrack, setShowOnTrack] = useState(true);
  const [showBehind, setShowBehind] = useState(true);
  const [showAhead, setShowAhead] = useState(true);

  const countries = [
    { name: 'Denmark', flag: '🇩🇰', pledgeYear: 2045, progress: 82, status: 'ahead', region: 'Europe' },
    { name: 'Sweden', flag: '🇸🇪', pledgeYear: 2045, progress: 78, status: 'ahead', region: 'Europe' },
    { name: 'Finland', flag: '🇫🇮', pledgeYear: 2035, progress: 75, status: 'on-track', region: 'Europe' },
    { name: 'Germany', flag: '🇩🇪', pledgeYear: 2045, progress: 68, status: 'on-track', region: 'Europe' },
    { name: 'UK', flag: '🇬🇧', pledgeYear: 2050, progress: 72, status: 'on-track', region: 'Europe' },
    { name: 'France', flag: '🇫🇷', pledgeYear: 2050, progress: 69, status: 'on-track', region: 'Europe' },
    { name: 'Japan', flag: '🇯🇵', pledgeYear: 2050, progress: 58, status: 'on-track', region: 'Asia' },
    { name: 'South Korea', flag: '🇰🇷', pledgeYear: 2050, progress: 54, status: 'behind', region: 'Asia' },
    { name: 'USA', flag: '🇺🇸', pledgeYear: 2050, progress: 52, status: 'behind', region: 'North America' },
    { name: 'Canada', flag: '🇨🇦', pledgeYear: 2050, progress: 61, status: 'on-track', region: 'North America' },
    { name: 'Australia', flag: '🇦🇺', pledgeYear: 2050, progress: 48, status: 'behind', region: 'Oceania' },
    { name: 'New Zealand', flag: '🇳🇿', pledgeYear: 2050, progress: 64, status: 'on-track', region: 'Oceania' },
    { name: 'China', flag: '🇨🇳', pledgeYear: 2060, progress: 42, status: 'behind', region: 'Asia' },
    { name: 'India', flag: '🇮🇳', pledgeYear: 2070, progress: 35, status: 'behind', region: 'Asia' },
    { name: 'Brazil', flag: '🇧🇷', pledgeYear: 2050, progress: 56, status: 'on-track', region: 'South America' },
    { name: 'Costa Rica', flag: '🇨🇷', pledgeYear: 2050, progress: 71, status: 'ahead', region: 'Central America' },
    { name: 'Norway', flag: '🇳🇴', pledgeYear: 2030, progress: 88, status: 'ahead', region: 'Europe' },
    { name: 'Iceland', flag: '🇮🇸', pledgeYear: 2040, progress: 79, status: 'ahead', region: 'Europe' },
    { name: 'Switzerland', flag: '🇨🇭', pledgeYear: 2050, progress: 73, status: 'on-track', region: 'Europe' },
    { name: 'Netherlands', flag: '🇳🇱', pledgeYear: 2050, progress: 67, status: 'on-track', region: 'Europe' },
  ];

  const top20Progress = [
    { country: 'Norway', progress: 88 },
    { country: 'Denmark', progress: 82 },
    { country: 'Iceland', progress: 79 },
    { country: 'Sweden', progress: 78 },
    { country: 'Finland', progress: 75 },
    { country: 'Switzerland', progress: 73 },
    { country: 'UK', progress: 72 },
    { country: 'Costa Rica', progress: 71 },
    { country: 'France', progress: 69 },
    { country: 'Germany', progress: 68 },
    { country: 'Netherlands', progress: 67 },
    { country: 'New Zealand', progress: 64 },
    { country: 'Canada', progress: 61 },
    { country: 'Japan', progress: 58 },
    { country: 'Brazil', progress: 56 },
    { country: 'South Korea', progress: 54 },
    { country: 'USA', progress: 52 },
    { country: 'Australia', progress: 48 },
    { country: 'China', progress: 42 },
    { country: 'India', progress: 35 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'text-emerald-400';
      case 'on-track': return 'text-blue-400';
      case 'behind': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ahead': return <CheckCircle className="w-4 h-4" />;
      case 'on-track': return <Clock className="w-4 h-4" />;
      case 'behind': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredCountries = countries.filter(country => {
    const regionMatch = region === 'all' || country.region === region;
    const yearMatch = country.pledgeYear >= pledgeYear[0] && country.pledgeYear <= pledgeYear[1];
    const statusMatch = 
      (showOnTrack && country.status === 'on-track') ||
      (showBehind && country.status === 'behind') ||
      (showAhead && country.status === 'ahead');
    return regionMatch && yearMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      {/* Map Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-2xl font-bold mb-6">Global Climate Pledge Progress</h3>
        
        {/* Placeholder for world map - would use a real map library in production */}
        <div className="relative h-[500px] bg-gradient-to-b from-slate-900/50 to-slate-800/50 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
          {/* Map placeholder with gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-950/80" />
          
          {/* Mock world map representation */}
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4">🌍</div>
            <p className="text-slate-400">Interactive World Map</p>
            <p className="text-sm text-slate-500 mt-2">Heat map showing country commitment levels</p>
            
            {/* Legend */}
            <div className="mt-6 flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-500/40 border border-red-500 rounded" />
                <span className="text-slate-400">Low Commitment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-500/40 border border-yellow-500 rounded" />
                <span className="text-slate-400">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-500/40 border border-emerald-500 rounded" />
                <span className="text-slate-400">High Commitment</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Panel and Country List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filter Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold">Filters</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Region</label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="bg-slate-900/50 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="South America">South America</SelectItem>
                  <SelectItem value="Africa">Africa</SelectItem>
                  <SelectItem value="Oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Net-Zero Pledge Year: {pledgeYear[0]} - {pledgeYear[1]}
              </label>
              <Slider
                value={pledgeYear}
                onValueChange={setPledgeYear}
                min={2025}
                max={2070}
                step={5}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-3 block">Progress Status</label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="ahead" 
                    checked={showAhead} 
                    onCheckedChange={setShowAhead}
                    className="border-emerald-500"
                  />
                  <label htmlFor="ahead" className="text-sm text-emerald-400 cursor-pointer">
                    Ahead of Target
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="on-track" 
                    checked={showOnTrack} 
                    onCheckedChange={setShowOnTrack}
                    className="border-blue-500"
                  />
                  <label htmlFor="on-track" className="text-sm text-blue-400 cursor-pointer">
                    On Track
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="behind" 
                    checked={showBehind} 
                    onCheckedChange={setShowBehind}
                    className="border-red-500"
                  />
                  <label htmlFor="behind" className="text-sm text-red-400 cursor-pointer">
                    Behind Schedule
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="text-sm text-slate-400">
                Showing <span className="text-white font-semibold">{filteredCountries.length}</span> countries
              </div>
            </div>
          </div>
        </motion.div>

        {/* Country List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold mb-4">Country Progress</h3>
          
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-3">
              {filteredCountries.map((country, index) => (
                <motion.div
                  key={country.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-slate-900/50 border border-white/5 rounded-lg p-4 hover:bg-slate-900/70 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{country.flag}</span>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{country.name}</h4>
                        <span className="text-sm text-slate-400">
                          Net-zero by {country.pledgeYear}
                        </span>
                        <div className={`flex items-center gap-1 text-sm ${getStatusColor(country.status)}`}>
                          {getStatusIcon(country.status)}
                          <span className="capitalize">{country.status.replace('-', ' ')}</span>
                        </div>
                      </div>
                      
                      {/* Progress Ring */}
                      <div className="relative">
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              country.status === 'ahead' ? 'bg-emerald-500' :
                              country.status === 'on-track' ? 'bg-blue-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${country.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 mt-1 inline-block">
                          {country.progress}% Progress
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>
      </div>

      {/* Top 20 Countries Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-2xl font-bold mb-6">Top 20 Countries by Progress</h3>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart data={top20Progress} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" domain={[0, 100]} />
            <YAxis dataKey="country" type="category" stroke="#94a3b8" width={100} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="progress" fill="#10b981" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
