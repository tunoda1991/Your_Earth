import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/glass/GlassCard";
import { Zap, Factory, Car, Plane, Ship, Building2, Leaf, TrendingUp, TrendingDown, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface EmissionData {
  sector: string;
  emissions: number;
  change: number;
  icon: any;
  color: string;
}

interface CountryData {
  country: string;
  code: string;
  emissions: number;
  percentage: number;
}

export function ClimateTraceEmissions() {
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedGas, setSelectedGas] = useState('co2e');

  // Mock data based on Climate TRACE structure
  // In production, this would come from the Climate TRACE API
  const sectorData: EmissionData[] = [
    { sector: 'Power', emissions: 15420, change: -2.3, icon: Zap, color: '#3b82f6' },
    { sector: 'Manufacturing', emissions: 8950, change: 1.2, icon: Factory, color: '#8b5cf6' },
    { sector: 'Transportation', emissions: 7680, change: 0.8, icon: Car, color: '#ec4899' },
    { sector: 'Aviation', emissions: 2340, change: 5.6, icon: Plane, color: '#f59e0b' },
    { sector: 'Shipping', emissions: 3210, change: -0.5, icon: Ship, color: '#06b6d4' },
    { sector: 'Buildings', emissions: 5890, change: -1.8, icon: Building2, color: '#10b981' },
    { sector: 'Agriculture', emissions: 6120, change: 0.3, icon: Leaf, color: '#84cc16' },
  ];

  const topCountries: CountryData[] = [
    { country: 'China', code: 'CN', emissions: 11680, percentage: 27.5 },
    { country: 'United States', code: 'US', emissions: 5420, percentage: 12.8 },
    { country: 'India', code: 'IN', emissions: 3450, percentage: 8.1 },
    { country: 'Russia', code: 'RU', emissions: 2340, percentage: 5.5 },
    { country: 'Japan', code: 'JP', emissions: 1280, percentage: 3.0 },
    { country: 'Germany', code: 'DE', emissions: 890, percentage: 2.1 },
    { country: 'Indonesia', code: 'ID', emissions: 780, percentage: 1.8 },
    { country: 'Brazil', code: 'BR', emissions: 720, percentage: 1.7 },
  ];

  const yearlyTrend = [
    { year: '2018', emissions: 38200 },
    { year: '2019', emissions: 39100 },
    { year: '2020', emissions: 36800 },
    { year: '2021', emissions: 38900 },
    { year: '2022', emissions: 40100 },
    { year: '2023', emissions: 42500 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4', '#10b981', '#84cc16', '#f97316'];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [selectedYear, selectedGas]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Climate TRACE emissions data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Global Emissions Data</h2>
            <p className="text-muted-foreground">
              Powered by Climate TRACE - Independent emissions tracking
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            Last updated: January 2024
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select 
          className="px-4 py-2 border rounded-md bg-background"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
        
        <select 
          className="px-4 py-2 border rounded-md bg-background"
          value={selectedGas}
          onChange={(e) => setSelectedGas(e.target.value)}
        >
          <option value="co2e">All GHGs (CO2e)</option>
          <option value="co2">CO2 only</option>
          <option value="ch4">Methane (CH4)</option>
          <option value="n2o">Nitrous Oxide (N2O)</option>
        </select>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sectors">By Sector</TabsTrigger>
          <TabsTrigger value="countries">By Country</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Emissions</CardDescription>
                <CardTitle className="text-4xl">42.5 Gt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500">+6.0% from 2022</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Countries Tracked</CardDescription>
                <CardTitle className="text-4xl">195</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comprehensive global coverage
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Emission Sources</CardDescription>
                <CardTitle className="text-4xl">70,000+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Individual facilities tracked
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Emissions by Sector</CardTitle>
              <CardDescription>Million tonnes CO2 equivalent (2023)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={sectorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sector" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="emissions" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sectors Tab */}
        <TabsContent value="sectors" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sectorData.map((sector) => {
              const Icon = sector.icon;
              return (
                <Card key={sector.sector}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Icon className="h-8 w-8" style={{ color: sector.color }} />
                      {sector.change < 0 ? (
                        <TrendingDown className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <CardTitle className="text-2xl mt-2">{sector.sector}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold">{sector.emissions.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Mt CO2e</p>
                      <div className={`text-sm ${sector.change < 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {sector.change > 0 ? '+' : ''}{sector.change}% YoY
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sector Distribution</CardTitle>
              <CardDescription>Percentage of total emissions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ sector, percent }) => `${sector} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="emissions"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Countries Tab */}
        <TabsContent value="countries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Emitting Countries</CardTitle>
              <CardDescription>Million tonnes CO2 equivalent (2023)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topCountries} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="country" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="emissions" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {topCountries.map((country, index) => (
              <Card key={country.code}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <CardTitle className="text-lg">{country.country}</CardTitle>
                    </div>
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{country.emissions.toLocaleString()} Mt</p>
                    <p className="text-sm text-muted-foreground">
                      {country.percentage}% of global emissions
                    </p>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full"
                        style={{ width: `${(country.percentage / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Emissions Trend</CardTitle>
              <CardDescription>Historical emissions data (2018-2023)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={yearlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Peak Year</CardDescription>
                <CardTitle className="text-2xl">2023</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Highest recorded emissions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Lowest Year</CardDescription>
                <CardTitle className="text-2xl">2020</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  COVID-19 pandemic impact
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>5-Year Growth</CardDescription>
                <CardTitle className="text-2xl text-red-500">+11.3%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  From 2018 to 2023
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Data Source Attribution */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold">About Climate TRACE</h3>
              <p className="text-sm text-muted-foreground">
                Climate TRACE (Tracking Real-time Atmospheric Carbon Emissions) is a global coalition using satellite data, 
                artificial intelligence, and other technologies to independently track greenhouse gas emissions worldwide 
                with unprecedented detail and speed.
              </p>
              <a 
                href="https://climatetrace.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                Visit Climate TRACE
                <span>→</span>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}