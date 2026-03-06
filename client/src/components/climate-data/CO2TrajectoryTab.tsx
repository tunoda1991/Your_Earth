import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, AlertTriangle, Clock, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function CO2TrajectoryTab() {
  const [showProjections, setShowProjections] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);

  // Historical and projected CO2 data
  const trajectoryData = [
    { year: 1960, historical: 9.4 },
    { year: 1970, historical: 14.9 },
    { year: 1980, historical: 19.5 },
    { year: 1990, historical: 22.7, annotation: 'Kyoto Protocol' },
    { year: 2000, historical: 25.2 },
    { year: 2010, historical: 33.6 },
    { year: 2015, historical: 36.2, annotation: 'Paris Agreement' },
    { year: 2020, historical: 34.8 },
    { year: 2024, historical: 37.4, current: 37.4, paris: 37.4, target: 37.4 },
    { year: 2030, current: 42.1, paris: 31.5, target: 20.5 },
    { year: 2040, current: 47.8, paris: 24.3, target: 12.7 },
    { year: 2050, current: 53.2, paris: 18.1, target: 5.2 },
    { year: 2060, current: 58.9, paris: 13.4, target: 2.1 },
    { year: 2070, current: 64.3, paris: 9.8, target: 0.8 },
    { year: 2080, current: 69.1, paris: 7.2, target: 0.3 },
    { year: 2090, current: 73.5, paris: 5.4, target: 0.1 },
    { year: 2100, current: 77.2, paris: 4.1, target: 0.05 },
  ];

  const sideStats = [
    {
      label: 'Current Trajectory',
      value: '+2.7°C by 2100',
      description: 'Based on current policies',
      color: 'red',
      icon: TrendingUp
    },
    {
      label: 'Required Reduction',
      value: '-45% by 2030',
      description: 'To stay on 1.5°C path',
      color: 'orange',
      icon: AlertTriangle
    },
    {
      label: 'Time to Critical Threshold',
      value: '6 years',
      description: 'Until 1.5°C warming',
      color: 'yellow',
      icon: Clock
    },
    {
      label: 'Gap to 1.5°C Target',
      value: '1.2°C',
      description: 'Current vs. target pathway',
      color: 'red',
      icon: AlertTriangle
    },
  ];

  const majorEvents = [
    { year: 1997, label: 'Kyoto Protocol', color: '#60a5fa' },
    { year: 2015, label: 'Paris Agreement', color: '#34d399' },
    { year: 2021, label: 'COP26 Glasgow', color: '#fbbf24' },
  ];

  const getColorForStat = (color: string) => {
    const colors: any = {
      red: 'border-red-500/30 bg-red-500/10',
      orange: 'border-orange-500/30 bg-orange-500/10',
      yellow: 'border-yellow-500/30 bg-yellow-500/10',
      green: 'border-emerald-500/30 bg-emerald-500/10',
    };
    return colors[color] || colors.red;
  };

  const getTextColorForStat = (color: string) => {
    const colors: any = {
      red: 'text-red-400',
      orange: 'text-orange-400',
      yellow: 'text-yellow-400',
      green: 'text-emerald-400',
    };
    return colors[color] || colors.red;
  };

  return (
    <div className="space-y-6">
      {/* Toggle Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6"
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <Switch 
              checked={showProjections} 
              onCheckedChange={setShowProjections}
              className="data-[state=checked]:bg-blue-500"
            />
            <div className="flex items-center gap-2">
              {showProjections ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="text-sm">Show Projection Scenarios</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch 
              checked={showAnnotations} 
              onCheckedChange={setShowAnnotations}
              className="data-[state=checked]:bg-emerald-500"
            />
            <div className="flex items-center gap-2">
              {showAnnotations ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="text-sm">Show Event Annotations</span>
            </div>
          </div>

          <div className="ml-auto flex gap-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>Current Path (+2.7°C)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span>Paris Agreement (+2.0°C)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              <span>1.5°C Target</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Side Stats Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {sideStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`backdrop-blur-xl border rounded-xl p-6 ${getColorForStat(stat.color)}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <stat.icon className={`w-6 h-6 ${getTextColorForStat(stat.color)}`} />
                <div className="flex-1">
                  <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                  <div className={`text-2xl font-bold ${getTextColorForStat(stat.color)}`}>
                    {stat.value}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-2xl font-bold mb-6">Global CO2 Emissions Trajectory (1960-2100)</h3>
          
          <ResponsiveContainer width="100%" height={600}>
            <LineChart data={trajectoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="year" 
                stroke="#94a3b8"
                domain={[1960, 2100]}
                ticks={[1960, 1980, 2000, 2020, 2040, 2060, 2080, 2100]}
              />
              <YAxis 
                stroke="#94a3b8"
                label={{ value: 'CO2 (Gt/year)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
                formatter={(value: any) => [`${value} Gt/year`, '']}
              />
              <Legend />

              {/* Historical Data */}
              <Line 
                type="monotone" 
                dataKey="historical" 
                stroke="#60a5fa" 
                strokeWidth={3}
                dot={false}
                name="Historical Emissions"
              />

              {/* Projections */}
              {showProjections && (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="current" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Current Path (+2.7°C by 2100)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="paris" 
                    stroke="#eab308" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Paris Agreement (+2.0°C by 2100)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={false}
                    name="1.5°C Target Path"
                  />
                </>
              )}

              {/* Event Annotations */}
              {showAnnotations && majorEvents.map(event => (
                <ReferenceLine 
                  key={event.year}
                  x={event.year} 
                  stroke={event.color}
                  strokeDasharray="3 3"
                  label={{ 
                    value: event.label, 
                    position: 'top',
                    fill: event.color,
                    fontSize: 12
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>

          {/* Chart Description */}
          <div className="mt-6 p-4 bg-slate-900/50 border border-white/5 rounded-lg">
            <p className="text-sm text-slate-400 leading-relaxed">
              This chart shows historical CO2 emissions from 1960 to 2024 and three possible future trajectories. 
              The <span className="text-red-400 font-semibold">Current Path</span> assumes continuation of existing policies, 
              the <span className="text-yellow-400 font-semibold">Paris Agreement Path</span> reflects pledged national commitments, 
              and the <span className="text-emerald-400 font-semibold">1.5°C Target</span> shows the steep reductions needed 
              to limit warming to 1.5°C above pre-industrial levels.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-2xl font-bold mb-6">Key Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-white/5 rounded-lg p-5">
            <div className="text-3xl mb-3">📈</div>
            <h4 className="font-semibold mb-2">Emissions Gap</h4>
            <p className="text-sm text-slate-400">
              The gap between current trajectory and 1.5°C target is widening. Immediate action needed to close this gap.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-white/5 rounded-lg p-5">
            <div className="text-3xl mb-3">⏰</div>
            <h4 className="font-semibold mb-2">Critical Decade</h4>
            <p className="text-sm text-slate-400">
              The next 10 years are crucial. We need to halve emissions by 2030 to stay within safe warming limits.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-white/5 rounded-lg p-5">
            <div className="text-3xl mb-3">🌍</div>
            <h4 className="font-semibold mb-2">Paris Agreement</h4>
            <p className="text-sm text-slate-400">
              Current pledges fall short. Even if all Paris commitments are met, we're on track for 2.0°C+ warming.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
