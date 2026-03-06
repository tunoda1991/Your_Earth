import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { GlassCard } from "@/components/glass/GlassCard";

interface CO2TimelineProps {
  userBirthYear?: number;
}

// Historical and projected CO2 data (ppm - parts per million)
// and temperature anomaly (°C above pre-industrial)
const climateData: Record<number, { co2: number; tempAnomaly: number }> = {
  1950: { co2: 310, tempAnomaly: 0.0 },
  1960: { co2: 317, tempAnomaly: 0.1 },
  1970: { co2: 326, tempAnomaly: 0.05 },
  1980: { co2: 339, tempAnomaly: 0.25 },
  1990: { co2: 354, tempAnomaly: 0.45 },
  2000: { co2: 370, tempAnomaly: 0.60 },
  2010: { co2: 390, tempAnomaly: 0.90 },
  2020: { co2: 414, tempAnomaly: 1.25 },
  2024: { co2: 423, tempAnomaly: 1.35 },
  2030: { co2: 440, tempAnomaly: 1.55 },
  2040: { co2: 465, tempAnomaly: 1.85 },
  2050: { co2: 490, tempAnomaly: 2.15 },
  2060: { co2: 520, tempAnomaly: 2.55 },
  2070: { co2: 555, tempAnomaly: 2.95 },
  2080: { co2: 595, tempAnomaly: 3.45 },
  2090: { co2: 640, tempAnomaly: 4.05 },
  2100: { co2: 685, tempAnomaly: 4.70 },
};

// Interpolate data for years not in the dataset
function getClimateDataForYear(year: number): { co2: number; tempAnomaly: number } {
  const years = Object.keys(climateData).map(Number).sort((a, b) => a - b);
  
  // Find surrounding years
  let lowerYear = years[0];
  let upperYear = years[years.length - 1];
  
  for (let i = 0; i < years.length - 1; i++) {
    if (year >= years[i] && year <= years[i + 1]) {
      lowerYear = years[i];
      upperYear = years[i + 1];
      break;
    }
  }
  
  // If exact match exists
  if (climateData[year]) {
    return climateData[year];
  }
  
  // Interpolate
  const lowerData = climateData[lowerYear];
  const upperData = climateData[upperYear];
  const ratio = (year - lowerYear) / (upperYear - lowerYear);
  
  return {
    co2: Math.round(lowerData.co2 + (upperData.co2 - lowerData.co2) * ratio),
    tempAnomaly: +(lowerData.tempAnomaly + (upperData.tempAnomaly - lowerData.tempAnomaly) * ratio).toFixed(2)
  };
}

function getMilestoneForYear(year: number): string | null {
  const milestones: Record<number, string> = {
    1990: "IPCC First Assessment Report",
    1997: "Kyoto Protocol Adopted",
    2015: "Paris Agreement Signed",
    2020: "Hottest Decade on Record",
    2030: "Critical Decade for Climate Action",
    2050: "Net Zero Target for Many Nations",
    2100: "End of Century Projections"
  };
  
  return milestones[year] || null;
}

function getImpactMessage(tempAnomaly: number): { severity: string; message: string; color: string } {
  if (tempAnomaly < 1.0) {
    return {
      severity: "Moderate",
      message: "Early climate impacts beginning to emerge",
      color: "text-yellow-600"
    };
  } else if (tempAnomaly < 1.5) {
    return {
      severity: "Significant",
      message: "Increased extreme weather, coral bleaching",
      color: "text-orange-600"
    };
  } else if (tempAnomaly < 2.0) {
    return {
      severity: "Severe",
      message: "Major ecosystem disruption, sea level rise",
      color: "text-red-600"
    };
  } else if (tempAnomaly < 3.0) {
    return {
      severity: "Critical",
      message: "Widespread food insecurity, mass displacement",
      color: "text-red-700"
    };
  } else {
    return {
      severity: "Catastrophic",
      message: "Irreversible damage, civilization-level threats",
      color: "text-red-900"
    };
  }
}

export function CO2Timeline({ userBirthYear }: CO2TimelineProps) {
  const currentYear = new Date().getFullYear();
  const defaultBirthYear = userBirthYear || 2000;
  const currentAge = currentYear - defaultBirthYear;
  
  const minYear = 1950;
  const maxYear = 2100;
  const minAge = minYear - defaultBirthYear;
  const maxAge = maxYear - defaultBirthYear;
  
  const [selectedAge, setSelectedAge] = useState(currentAge);
  const selectedYear = defaultBirthYear + selectedAge;
  const climateInfo = getClimateDataForYear(selectedYear);
  const milestone = getMilestoneForYear(selectedYear);
  const impact = getImpactMessage(climateInfo.tempAnomaly);
  
  // Calculate percentage of CO2 increase since pre-industrial (280 ppm)
  const co2Increase = ((climateInfo.co2 - 280) / 280 * 100).toFixed(1);
  
  // Calculate visual scale for CO2 visualization (0-100%)
  const co2VisualScale = Math.min(((climateInfo.co2 - 280) / (685 - 280)) * 100, 100);
  
  // Calculate visual scale for temperature (0-100%)
  const tempVisualScale = Math.min((climateInfo.tempAnomaly / 4.7) * 100, 100);

  // Prepare chart data - generate data points for smooth lines
  const chartData = [];
  for (let year = minYear; year <= maxYear; year += 5) {
    const data = getClimateDataForYear(year);
    chartData.push({
      year,
      co2: data.co2,
      temp: data.tempAnomaly,
      age: year - defaultBirthYear
    });
  }
  
  // Custom tooltip for the charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const yearData = payload[0].payload;
      return (
        <div className="bg-background border-2 border-primary/20 rounded-lg p-3 shadow-lg">
          <p className="font-semibold mb-1">{yearData.year}</p>
          <p className="text-sm text-muted-foreground mb-1">
            Age: {yearData.age < 0 ? `${yearData.age}` : yearData.age}
          </p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {entry.name}: <span className="font-semibold">{entry.value}{entry.name === 'CO₂' ? ' ppm' : '°C'}</span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            Interactive Climate Timeline
          </Badge>
          <h2 className="text-3xl lg:text-4xl mb-4">
            Your Life in a <span className="text-primary">Changing Climate</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore how climate change has progressed throughout your lifetime and what the future holds. 
            Slide through time to see CO₂ levels and temperature increases at any age.
          </p>
        </div>

        <Card className="overflow-hidden border-2">
          <CardHeader className="bg-muted/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl">
                  {selectedYear} {selectedAge === currentAge && "(Today)"}
                </CardTitle>
                <CardDescription className="mt-1">
                  {selectedAge < 0 
                    ? `${Math.abs(selectedAge)} years before you were born`
                    : selectedAge === 0
                    ? "Your birth year"
                    : `Age ${selectedAge}`}
                </CardDescription>
              </div>
              
              {milestone && (
                <Badge variant="default" className="text-sm">
                  🌍 {milestone}
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            {/* Chart Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CO2 Chart */}
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    CO₂ Concentration Over Time
                  </h3>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                    {climateInfo.co2} ppm
                  </Badge>
                </div>
                <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border-2 border-blue-200 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.3} />
                      <XAxis 
                        dataKey="year" 
                        stroke="#64748b"
                        fontSize={10}
                        tickFormatter={(value) => value.toString()}
                      />
                      <YAxis 
                        stroke="#64748b"
                        fontSize={10}
                        domain={[280, 700]}
                        label={{ value: 'ppm', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <ReferenceLine 
                        y={350} 
                        stroke="#f59e0b" 
                        strokeDasharray="3 3" 
                        label={{ value: 'Safe Limit', position: 'insideTopRight', fill: '#f59e0b', fontSize: 9 }}
                      />
                      <ReferenceLine 
                        x={selectedYear} 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        label={{ value: 'You', position: 'top', fill: '#3b82f6', fontSize: 10, fontWeight: 'bold' }}
                      />
                      <ReferenceLine 
                        x={currentYear} 
                        stroke="#22c55e" 
                        strokeDasharray="5 5"
                        strokeWidth={1}
                        label={{ value: 'Today', position: 'bottom', fill: '#22c55e', fontSize: 9 }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="co2" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        fill="url(#colorCO2)"
                        name="CO₂"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Temperature Chart */}
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-red-600" />
                    Temperature Rise Over Time
                  </h3>
                  <Badge variant="secondary" className={`text-xs ${
                    climateInfo.tempAnomaly < 1.5 
                      ? "bg-orange-100 text-orange-800"
                      : climateInfo.tempAnomaly < 2.0
                      ? "bg-red-100 text-red-800"
                      : "bg-red-200 text-red-900"
                  }`}>
                    +{climateInfo.tempAnomaly}°C
                  </Badge>
                </div>
                <div className="h-48 w-full bg-gradient-to-br from-red-50 to-orange-100/50 rounded-lg border-2 border-red-200 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.3} />
                      <XAxis 
                        dataKey="year" 
                        stroke="#64748b"
                        fontSize={10}
                        tickFormatter={(value) => value.toString()}
                      />
                      <YAxis 
                        stroke="#64748b"
                        fontSize={10}
                        domain={[0, 5]}
                        label={{ value: '°C', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <ReferenceLine 
                        y={1.5} 
                        stroke="#f59e0b" 
                        strokeDasharray="3 3" 
                        label={{ value: 'Paris 1.5°C', position: 'insideTopRight', fill: '#f59e0b', fontSize: 9 }}
                      />
                      <ReferenceLine 
                        y={2.0} 
                        stroke="#dc2626" 
                        strokeDasharray="3 3" 
                        label={{ value: '2°C Limit', position: 'insideTopRight', fill: '#dc2626', fontSize: 9 }}
                      />
                      <ReferenceLine 
                        x={selectedYear} 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        label={{ value: 'You', position: 'top', fill: '#ef4444', fontSize: 10, fontWeight: 'bold' }}
                      />
                      <ReferenceLine 
                        x={currentYear} 
                        stroke="#22c55e" 
                        strokeDasharray="5 5"
                        strokeWidth={1}
                        label={{ value: 'Today', position: 'bottom', fill: '#22c55e', fontSize: 9 }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="temp" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        fill="url(#colorTemp)"
                        name="Temp Rise"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Age Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Select Age / Year</label>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {selectedYear}
                  </Badge>
                  <Badge variant={selectedAge === currentAge ? "default" : "secondary"}>
                    {selectedAge < 0 ? `${selectedAge}` : `Age ${selectedAge}`}
                  </Badge>
                </div>
              </div>
              
              <Slider
                value={[selectedAge]}
                onValueChange={(value) => setSelectedAge(value[0])}
                min={minAge}
                max={maxAge}
                step={1}
                className="w-full"
              />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{minYear}</span>
                <span className="font-medium text-primary">{currentYear} (Today)</span>
                <span>{maxYear}</span>
              </div>
            </div>

            {/* Climate Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CO2 Levels */}
              <motion.div
                key={`co2-${selectedYear}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2 border-blue-200 bg-blue-50/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        CO₂ Concentration
                      </CardTitle>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {climateInfo.co2} ppm
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress from pre-industrial (280 ppm)</span>
                        <span className="font-medium text-blue-600">+{co2Increase}%</span>
                      </div>
                      <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
                          initial={{ width: 0 }}
                          animate={{ width: `${co2VisualScale}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {climateInfo.co2 < 350 
                        ? "Below safe threshold (350 ppm)"
                        : climateInfo.co2 < 400
                        ? "Above safe levels, approaching critical"
                        : climateInfo.co2 < 450
                        ? "Well above safe levels, rapid increase"
                        : "Dangerous levels, urgent action needed"}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Temperature Increase */}
              <motion.div
                key={`temp-${selectedYear}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className={`border-2 ${
                  climateInfo.tempAnomaly < 1.5 
                    ? "border-orange-200 bg-orange-50/50"
                    : climateInfo.tempAnomaly < 2.0
                    ? "border-red-200 bg-red-50/50"
                    : "border-red-300 bg-red-100/50"
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Thermometer className="h-5 w-5 text-red-600" />
                        Temperature Rise
                      </CardTitle>
                      <Badge variant="secondary" className={`${
                        climateInfo.tempAnomaly < 1.5 
                          ? "bg-orange-100 text-orange-800"
                          : climateInfo.tempAnomaly < 2.0
                          ? "bg-red-100 text-red-800"
                          : "bg-red-200 text-red-900"
                      }`}>
                        +{climateInfo.tempAnomaly}°C
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress to Paris Agreement limit (1.5°C)</span>
                        <span className={`font-medium ${
                          climateInfo.tempAnomaly < 1.5 ? "text-orange-600" : "text-red-600"
                        }`}>
                          {((climateInfo.tempAnomaly / 1.5) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="h-4 bg-red-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${
                            climateInfo.tempAnomaly < 1.5
                              ? "bg-gradient-to-r from-orange-400 to-orange-600"
                              : climateInfo.tempAnomaly < 2.0
                              ? "bg-gradient-to-r from-red-500 to-red-700"
                              : "bg-gradient-to-r from-red-700 to-red-900"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${tempVisualScale}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {climateInfo.tempAnomaly < 1.5 
                        ? "Still below Paris Agreement target"
                        : climateInfo.tempAnomaly < 2.0
                        ? "Exceeded 1.5°C target, approaching 2°C limit"
                        : "Well beyond Paris Agreement limits"}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Impact Assessment */}
            <motion.div
              key={`impact-${selectedYear}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-muted/50 to-muted/30 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className={`h-5 w-5 ${impact.color}`} />
                    Climate Impact Level: 
                    <span className={impact.color}>{impact.severity}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{impact.message}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Year</div>
                      <div className="font-semibold">{selectedYear}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Your Age</div>
                      <div className="font-semibold">
                        {selectedAge < 0 ? "Not born yet" : selectedAge}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-muted-foreground">CO₂ Increase</div>
                      <div className="font-semibold text-blue-600">+{co2Increase}%</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Temp Rise</div>
                      <div className={`font-semibold ${impact.color}`}>+{climateInfo.tempAnomaly}°C</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Context Message */}
            <div className="text-center p-6 bg-primary/5 rounded-lg border-2 border-dashed border-primary/20">
              <p className="text-sm text-muted-foreground">
                {selectedAge < currentAge && (
                  <>When you were {selectedAge < 0 ? `${Math.abs(selectedAge)} years from being born` : `${selectedAge} years old`}, 
                  the world had {climateInfo.co2} ppm of CO₂ and was {climateInfo.tempAnomaly}°C warmer than pre-industrial times.</>
                )}
                {selectedAge === currentAge && (
                  <>Today, atmospheric CO₂ is at {climateInfo.co2} ppm, and Earth is {climateInfo.tempAnomaly}°C warmer. 
                  Every action we take now shapes the climate you'll experience tomorrow.</>
                )}
                {selectedAge > currentAge && (
                  <>By the time you reach age {selectedAge}, if current trends continue, 
                  CO₂ levels could reach {climateInfo.co2} ppm and temperatures could be {climateInfo.tempAnomaly}°C above pre-industrial levels. 
                  <strong className="text-primary"> But the future isn't written yet.</strong></>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}