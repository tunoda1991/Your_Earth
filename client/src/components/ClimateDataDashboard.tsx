import { TrendingUp, TrendingDown, Thermometer, Wind, Target, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface MetricData {
  title: string;
  value: string;
  unit: string;
  trend: "up" | "down";
  trendValue: string;
  comparison: string;
  icon: React.ElementType;
  color: string;
  accentColor: string;
  sparklineData: number[];
}

const metricsData: MetricData[] = [
  {
    title: "Global Temperature Change",
    value: "+1.2",
    unit: "°C",
    trend: "up",
    trendValue: "+0.08°C",
    comparison: "vs pre-industrial levels",
    icon: Thermometer,
    color: "text-red-400",
    accentColor: "#ef4444",
    sparklineData: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2]
  },
  {
    title: "CO₂ Levels",
    value: "420",
    unit: "ppm",
    trend: "up",
    trendValue: "+2.5ppm",
    comparison: "annual increase",
    icon: Wind,
    color: "text-orange-400",
    accentColor: "#fb923c",
    sparklineData: [380, 385, 390, 395, 400, 405, 408, 412, 415, 418, 420]
  },
  {
    title: "Active Campaigns",
    value: "247",
    unit: "",
    trend: "up",
    trendValue: "+34",
    comparison: "this month",
    icon: Target,
    color: "text-blue-400",
    accentColor: "#60a5fa",
    sparklineData: [120, 135, 148, 162, 178, 195, 208, 220, 233, 240, 247]
  },
  {
    title: "Community Impact",
    value: "2.3M",
    unit: "kg",
    trend: "up",
    trendValue: "+156k",
    comparison: "CO₂ saved this week",
    icon: Users,
    color: "text-green-400",
    accentColor: "#4ade80",
    sparklineData: [1.2, 1.4, 1.5, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.25, 2.3]
  }
];

export function ClimateDataDashboard() {
  return (
    <section className="py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Climate Data Dashboard
          </h2>
          <p className="text-slate-400">
            Real-time metrics tracking our planet's vital signs and community impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => {
            const Icon = metric.icon;
            const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
            
            // Convert sparkline data to recharts format
            const chartData = metric.sparklineData.map((value) => ({ value }));

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 hover:shadow-lg hover:shadow-slate-700/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${metric.color}`} />
                        {metric.title}
                      </CardTitle>
                      <TrendIcon 
                        className={`h-4 w-4 ${
                          metric.trend === "up" 
                            ? "text-red-400" 
                            : "text-green-400"
                        }`} 
                      />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Large Metric Value */}
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-4xl md:text-5xl font-bold ${metric.color}`}>
                          {metric.value}
                        </span>
                        {metric.unit && (
                          <span className="text-xl text-slate-500 font-medium">
                            {metric.unit}
                          </span>
                        )}
                      </div>
                      
                      {/* Trend Value */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-sm font-medium ${
                          metric.trend === "up" 
                            ? "text-red-400" 
                            : "text-green-400"
                        }`}>
                          {metric.trendValue}
                        </span>
                        <span className="text-xs text-slate-500">
                          {metric.comparison}
                        </span>
                      </div>
                    </div>

                    {/* Sparkline Chart */}
                    <div className="h-12 -mx-2">
                      <ResponsiveContainer width="100%" height={48} minHeight={48}>
                        <LineChart data={chartData}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={metric.accentColor}
                            strokeWidth={2}
                            dot={false}
                            animationDuration={1000}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Data Source Attribution */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xs text-slate-500">
            Data updated in real-time from NASA, NOAA, and community reports • Last updated: Just now
          </p>
        </motion.div>
      </div>
    </section>
  );
}