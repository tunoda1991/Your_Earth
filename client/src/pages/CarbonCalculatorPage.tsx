import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassHero } from "@/components/glass/GlassHero";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { Calculator, Car, Plane, UtensilsCrossed, Recycle, TreePine, Zap, BarChart3, TrendingUp, TrendingDown, Leaf, Lightbulb, Sparkles, BookOpen } from "lucide-react";

// Emission factors (kg CO2 per unit)
const EMISSION_FACTORS = {
  transport: {
    gasolineCar: 0.404,
    electricCar: 0.150,
    bus: 0.089,
    train: 0.045,
    bicycle: 0,
    walking: 0
  },
  flights: {
    domestic: 0.255,
    international: 0.298,
    shortHaul: 0.285,
    longHaul: 0.298
  },
  diet: {
    beef: 27,
    lamb: 24,
    pork: 12,
    chicken: 6.9,
    fish: 6.1,
    vegetables: 2,
    fruits: 1.1,
    grains: 2.5,
    dairy: 17
  },
  energy: {
    coal: 0.82,
    naturalGas: 0.35,
    oil: 0.74,
    nuclear: 0.012,
    solar: 0.041,
    wind: 0.011,
    hydro: 0.024,
    renewable: 0.02
  },
  plastic: {
    bottle: 0.82,
    bag: 0.04,
    packaging: 6
  },
  trees: {
    sequestration: -21.77
  }
};

const GRID_MIX = {
  'USA': { coal: 0.2, gas: 0.4, nuclear: 0.2, renewable: 0.2 },
  'Germany': { coal: 0.3, gas: 0.15, nuclear: 0.13, renewable: 0.42 },
  'China': { coal: 0.64, gas: 0.03, nuclear: 0.05, renewable: 0.28 },
  'India': { coal: 0.7, gas: 0.05, nuclear: 0.03, renewable: 0.22 },
  'France': { coal: 0.03, gas: 0.07, nuclear: 0.67, renewable: 0.23 },
  'Brazil': { coal: 0.04, gas: 0.09, nuclear: 0.02, renewable: 0.85 },
  'Canada': { coal: 0.07, gas: 0.09, nuclear: 0.15, renewable: 0.69 },
  'Japan': { coal: 0.32, gas: 0.37, nuclear: 0.06, renewable: 0.25 },
  'UK': { coal: 0.02, gas: 0.39, nuclear: 0.16, renewable: 0.43 },
  'Australia': { coal: 0.54, gas: 0.20, nuclear: 0, renewable: 0.26 }
};

const DIET_EMISSIONS = {
  beef: 27,
  lamb: 24,
  pork: 12,
  chicken: 6.9,
  fish: 6.1,
  vegetables: 2,
  fruits: 1.1,
  grains: 2.5,
  dairy: 17
};

const MEAT_EMISSIONS = {
  beef: 27,
  lamb: 24,
  pork: 12,
  chicken: 6.9,
  fish: 6.1
};

const WASTE_EMISSIONS = {
  plasticBottle: 0.82,
  plasticBag: 0.04,
  plasticPackaging: 6
};

interface CarbonCalculatorPageProps {
  onNavigate?: (page: string) => void;
}

export function CarbonCalculatorPage({ onNavigate }: CarbonCalculatorPageProps) {
  const [calculations, setCalculations] = useState({
    transport: {
      vehicle: 'gasolineCar',
      miles: '',
      fuelEfficiency: '25'
    },
    flights: {
      departure: '',
      destination: '',
      distance: '',
      flightType: 'domestic',
      roundTrip: true
    },
    diet: {
      beefServings: '',
      chickenServings: '',
      fishServings: '',
      vegetableServings: '',
      dairyServings: ''
    },
    energy: {
      monthlyKwh: '',
      country: 'USA',
      renewablePercent: '0'
    },
    plastic: {
      bottlesPerWeek: '',
      plasticBagsPerWeek: ''
    },
    trees: {
      treesPlanted: ''
    }
  });

  const [results, setResults] = useState({
    transport: 0,
    flights: 0,
    diet: 0,
    energy: 0,
    plastic: 0,
    trees: 0,
    total: 0
  });

  const calculateTransportEmissions = () => {
    const { vehicle, miles, fuelEfficiency } = calculations.transport;
    const distance = parseFloat(miles) || 0;
    let emissions = 0;

    if (vehicle === 'gasolineCar') {
      emissions = distance * EMISSION_FACTORS.transport.gasolineCar;
    } else if (vehicle === 'electricCar') {
      const country = calculations.energy.country;
      const gridMix = GRID_MIX[country as keyof typeof GRID_MIX] || GRID_MIX.USA;
      const gridEmissionFactor = 
        gridMix.coal * EMISSION_FACTORS.energy.coal +
        gridMix.gas * EMISSION_FACTORS.energy.naturalGas +
        gridMix.nuclear * EMISSION_FACTORS.energy.nuclear +
        gridMix.renewable * EMISSION_FACTORS.energy.renewable;
      
      const kwhPer100Miles = 30;
      emissions = distance * (kwhPer100Miles / 100) * gridEmissionFactor;
    } else {
      emissions = distance * EMISSION_FACTORS.transport[vehicle as keyof typeof EMISSION_FACTORS.transport];
    }

    return emissions;
  };

  const calculateFlightEmissions = () => {
    const { distance, flightType, roundTrip } = calculations.flights;
    const dist = parseFloat(distance) || 0;
    const factor = EMISSION_FACTORS.flights[flightType as keyof typeof EMISSION_FACTORS.flights];
    return dist * factor * (roundTrip ? 2 : 1);
  };

  const calculateDietEmissions = () => {
    const { beefServings, chickenServings, fishServings, vegetableServings, dairyServings } = calculations.diet;
    
    const beef = (parseFloat(beefServings) || 0) * 0.25 * EMISSION_FACTORS.diet.beef;
    const chicken = (parseFloat(chickenServings) || 0) * 0.15 * EMISSION_FACTORS.diet.chicken;
    const fish = (parseFloat(fishServings) || 0) * 0.15 * EMISSION_FACTORS.diet.fish;
    const vegetables = (parseFloat(vegetableServings) || 0) * 0.1 * EMISSION_FACTORS.diet.vegetables;
    const dairy = (parseFloat(dairyServings) || 0) * 0.25 * EMISSION_FACTORS.diet.dairy;
    
    return (beef + chicken + fish + vegetables + dairy) * 52;
  };

  const calculateEnergyEmissions = () => {
    const { monthlyKwh, country, renewablePercent } = calculations.energy;
    const kwh = (parseFloat(monthlyKwh) || 0) * 12;
    const renewable = parseFloat(renewablePercent) || 0;
    
    const gridMix = GRID_MIX[country as keyof typeof GRID_MIX] || GRID_MIX.USA;
    
    const gridEmissionFactor = 
      gridMix.coal * EMISSION_FACTORS.energy.coal +
      gridMix.gas * EMISSION_FACTORS.energy.naturalGas +
      gridMix.nuclear * EMISSION_FACTORS.energy.nuclear +
      gridMix.renewable * EMISSION_FACTORS.energy.renewable;
    
    const renewableEmissionFactor = EMISSION_FACTORS.energy.renewable;
    
    const currentEmissions = kwh * gridEmissionFactor;
    const renewableEmissions = kwh * (renewable / 100) * renewableEmissionFactor;
    const remainingEmissions = kwh * ((100 - renewable) / 100) * gridEmissionFactor;
    
    return remainingEmissions + renewableEmissions;
  };

  const calculatePlasticEmissions = () => {
    const { bottlesPerWeek, plasticBagsPerWeek } = calculations.plastic;
    const bottles = (parseFloat(bottlesPerWeek) || 0) * 52 * EMISSION_FACTORS.plastic.bottle;
    const bags = (parseFloat(plasticBagsPerWeek) || 0) * 52 * EMISSION_FACTORS.plastic.bag;
    return bottles + bags;
  };

  const calculateTreeBenefit = () => {
    const trees = parseFloat(calculations.trees.treesPlanted) || 0;
    return trees * EMISSION_FACTORS.trees.sequestration;
  };

  const calculateTotal = () => {
    const transport = calculateTransportEmissions();
    const flights = calculateFlightEmissions();
    const diet = calculateDietEmissions();
    const energy = calculateEnergyEmissions();
    const plastic = calculatePlasticEmissions();
    const trees = calculateTreeBenefit();
    
    const newResults = {
      transport,
      flights,
      diet,
      energy,
      plastic,
      trees,
      total: transport + flights + diet + energy + plastic + trees
    };
    
    setResults(newResults);
  };

  const updateCalculation = (category: string, field: string, value: string) => {
    setCalculations(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const chartData = [
    { name: 'Transportation', value: Math.abs(results.transport), color: '#ef4444' },
    { name: 'Flights', value: Math.abs(results.flights), color: '#f97316' },
    { name: 'Diet', value: Math.abs(results.diet), color: '#eab308' },
    { name: 'Energy', value: Math.abs(results.energy), color: '#3b82f6' },
    { name: 'Plastic', value: Math.abs(results.plastic), color: '#8b5cf6' },
    { name: 'Trees (Offset)', value: Math.abs(results.trees), color: '#22c55e' }
  ];

  const totalAbsolute = chartData.reduce((sum, item) => sum + item.value, 0);

  const quickStats = [
    {
      title: "Avg. Transport",
      value: "4.6t",
      icon: Car,
      color: "text-blue-500",
      bgColor: "bg-blue-500/20"
    },
    {
      title: "Avg. Energy",
      value: "2.3t",
      icon: Zap,
      color: "text-green-500",
      bgColor: "bg-green-500/20"
    },
    {
      title: "Avg. Diet",
      value: "1.8t",
      icon: UtensilsCrossed,
      color: "text-orange-500",
      bgColor: "bg-orange-500/20"
    }
  ];

  return (
    <GradientBackground category="default" orbCount={3}>
      <div className="pt-8">
        {/* Hero Section with GlassHero Component */}
        <GlassHero category="default" size="lg">
          <div className="text-center">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 mb-6">
              <Calculator className="h-4 w-4 mr-2" />
              Personal Carbon Calculator
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
              Calculate Your{" "}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Carbon Footprint
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Understand your personal climate impact across transportation, diet, energy use, and lifestyle choices. 
              Get actionable insights to reduce your carbon footprint.
            </p>

            {/* Floating Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {quickStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  >
                    <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.title}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 text-white border-0 px-8 py-6 text-lg"
                onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start Calculating
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-lg bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                View Sample Report
              </Button>
            </div>
          </div>
        </GlassHero>

        {/* Calculator Interface */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              
              {/* Input Panels */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-8 bg-slate-900/50 backdrop-blur-xl border-white/10">
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-white flex items-center space-x-2 mb-2">
                      <Calculator className="h-6 w-6" />
                      <span>Lifestyle Carbon Calculator</span>
                    </h3>
                    <p className="text-sm text-slate-400">
                      Input your lifestyle parameters to calculate your annual carbon footprint
                    </p>
                  </div>
                  
                  <Tabs defaultValue="transport" className="w-full">
                    <TabsList className="grid w-full grid-cols-6 bg-white/5 mb-6">
                      <TabsTrigger value="transport" className="text-slate-300 data-[state=active]:bg-white/10 data-[state=active]:text-white">
                        <Car className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">Transport</span>
                      </TabsTrigger>
                      <TabsTrigger value="flights" className="text-slate-300 data-[state=active]:bg-white/10 data-[state=active]:text-white">
                        <Plane className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">Flights</span>
                      </TabsTrigger>
                      <TabsTrigger value="diet" className="text-slate-300 data-[state=active]:bg-white/10 data-[state=active]:text-white">
                        <UtensilsCrossed className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">Diet</span>
                      </TabsTrigger>
                      <TabsTrigger value="energy" className="text-slate-300 data-[state=active]:bg-white/10 data-[state=active]:text-white">
                        <Zap className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">Energy</span>
                      </TabsTrigger>
                      <TabsTrigger value="plastic" className="text-slate-300 data-[state=active]:bg-white/10 data-[state=active]:text-white">
                        <Recycle className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">Plastic</span>
                      </TabsTrigger>
                      <TabsTrigger value="trees" className="text-slate-300 data-[state=active]:bg-white/10 data-[state=active]:text-white">
                        <TreePine className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">Trees</span>
                      </TabsTrigger>
                    </TabsList>

                    {/* Transportation Tab */}
                    <TabsContent value="transport" className="space-y-4">
                      <div>
                        <Label htmlFor="vehicle" className="text-white">Vehicle Type</Label>
                        <Select value={calculations.transport.vehicle} onValueChange={(value) => updateCalculation('transport', 'vehicle', value)}>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white mt-2">
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-white/10">
                            <SelectItem value="gasolineCar" className="text-white focus:bg-white/10 focus:text-white">Gasoline Car</SelectItem>
                            <SelectItem value="electricCar" className="text-white focus:bg-white/10 focus:text-white">Electric Car</SelectItem>
                            <SelectItem value="bus" className="text-white focus:bg-white/10 focus:text-white">Public Bus</SelectItem>
                            <SelectItem value="train" className="text-white focus:bg-white/10 focus:text-white">Train</SelectItem>
                            <SelectItem value="bicycle" className="text-white focus:bg-white/10 focus:text-white">Bicycle</SelectItem>
                            <SelectItem value="walking" className="text-white focus:bg-white/10 focus:text-white">Walking</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="miles" className="text-white">Annual Miles Driven</Label>
                        <Input
                          id="miles"
                          type="number"
                          placeholder="e.g., 12000"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                          value={calculations.transport.miles}
                          onChange={(e) => updateCalculation('transport', 'miles', e.target.value)}
                        />
                      </div>

                      {calculations.transport.vehicle === 'gasolineCar' && (
                        <div>
                          <Label htmlFor="efficiency" className="text-white">Fuel Efficiency (MPG)</Label>
                          <Input
                            id="efficiency"
                            type="number"
                            placeholder="e.g., 25"
                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                            value={calculations.transport.fuelEfficiency}
                            onChange={(e) => updateCalculation('transport', 'fuelEfficiency', e.target.value)}
                          />
                        </div>
                      )}
                    </TabsContent>

                    {/* Flights Tab */}
                    <TabsContent value="flights" className="space-y-4">
                      <div>
                        <Label htmlFor="flightType" className="text-white">Flight Type</Label>
                        <Select value={calculations.flights.flightType} onValueChange={(value) => updateCalculation('flights', 'flightType', value)}>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white mt-2">
                            <SelectValue placeholder="Select flight type" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-white/10">
                            <SelectItem value="domestic" className="text-white focus:bg-white/10 focus:text-white">Domestic</SelectItem>
                            <SelectItem value="shortHaul" className="text-white focus:bg-white/10 focus:text-white">Short Haul (&lt; 1500 miles)</SelectItem>
                            <SelectItem value="longHaul" className="text-white focus:bg-white/10 focus:text-white">Long Haul (&gt; 1500 miles)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="departure" className="text-white">Departure City</Label>
                          <Input
                            id="departure"
                            placeholder="e.g., New York"
                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                            value={calculations.flights.departure}
                            onChange={(e) => updateCalculation('flights', 'departure', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="destination" className="text-white">Destination City</Label>
                          <Input
                            id="destination"
                            placeholder="e.g., Los Angeles"
                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                            value={calculations.flights.destination}
                            onChange={(e) => updateCalculation('flights', 'destination', e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="distance" className="text-white">Flight Distance (miles)</Label>
                        <Input
                          id="distance"
                          type="number"
                          placeholder="e.g., 2400"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                          value={calculations.flights.distance}
                          onChange={(e) => updateCalculation('flights', 'distance', e.target.value)}
                        />
                      </div>
                    </TabsContent>

                    {/* Diet Tab */}
                    <TabsContent value="diet" className="space-y-4">
                      <p className="text-sm text-slate-400 mb-2">Average servings per week:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="beef" className="text-white">Beef Servings/Week</Label>
                          <Input
                            id="beef"
                            type="number"
                            placeholder="e.g., 3"
                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                            value={calculations.diet.beefServings}
                            onChange={(e) => updateCalculation('diet', 'beefServings', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="chicken" className="text-white">Chicken Servings/Week</Label>
                          <Input
                            id="chicken"
                            type="number"
                            placeholder="e.g., 4"
                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                            value={calculations.diet.chickenServings}
                            onChange={(e) => updateCalculation('diet', 'chickenServings', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="fish" className="text-white">Fish Servings/Week</Label>
                          <Input
                            id="fish"
                            type="number"
                            placeholder="e.g., 2"
                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                            value={calculations.diet.fishServings}
                            onChange={(e) => updateCalculation('diet', 'fishServings', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="vegetables" className="text-white">Vegetable Servings/Week</Label>
                          <Input
                            id="vegetables"
                            type="number"
                            placeholder="e.g., 21"
                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                            value={calculations.diet.vegetableServings}
                            onChange={(e) => updateCalculation('diet', 'vegetableServings', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="dairy" className="text-white">Dairy Servings/Week</Label>
                          <Input
                            id="dairy"
                            type="number"
                            placeholder="e.g., 7"
                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                            value={calculations.diet.dairyServings}
                            onChange={(e) => updateCalculation('diet', 'dairyServings', e.target.value)}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    {/* Energy Tab */}
                    <TabsContent value="energy" className="space-y-4">
                      <div>
                        <Label htmlFor="country" className="text-white">Country/Grid Mix</Label>
                        <Select value={calculations.energy.country} onValueChange={(value) => updateCalculation('energy', 'country', value)}>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white mt-2">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-white/10">
                            {Object.keys(GRID_MIX).map(country => (
                              <SelectItem key={country} value={country} className="text-white focus:bg-white/10 focus:text-white">{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="kwh" className="text-white">Monthly kWh Usage</Label>
                        <Input
                          id="kwh"
                          type="number"
                          placeholder="e.g., 850"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                          value={calculations.energy.monthlyKwh}
                          onChange={(e) => updateCalculation('energy', 'monthlyKwh', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="renewable" className="text-white">Renewable Energy % (if applicable)</Label>
                        <Input
                          id="renewable"
                          type="number"
                          placeholder="e.g., 0"
                          min="0"
                          max="100"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                          value={calculations.energy.renewablePercent}
                          onChange={(e) => updateCalculation('energy', 'renewablePercent', e.target.value)}
                        />
                      </div>
                    </TabsContent>

                    {/* Plastic Tab */}
                    <TabsContent value="plastic" className="space-y-4">
                      <div>
                        <Label htmlFor="bottles" className="text-white">Plastic Bottles per Week</Label>
                        <Input
                          id="bottles"
                          type="number"
                          placeholder="e.g., 5"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                          value={calculations.plastic.bottlesPerWeek}
                          onChange={(e) => updateCalculation('plastic', 'bottlesPerWeek', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="bags" className="text-white">Plastic Bags per Week</Label>
                        <Input
                          id="bags"
                          type="number"
                          placeholder="e.g., 10"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                          value={calculations.plastic.plasticBagsPerWeek}
                          onChange={(e) => updateCalculation('plastic', 'plasticBagsPerWeek', e.target.value)}
                          />
                      </div>
                    </TabsContent>

                    {/* Trees Tab */}
                    <TabsContent value="trees" className="space-y-4">
                      <div>
                        <Label htmlFor="treesPlanted" className="text-white">Trees Planted This Year</Label>
                        <Input
                          id="treesPlanted"
                          type="number"
                          placeholder="e.g., 5"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 mt-2"
                          value={calculations.trees.treesPlanted}
                          onChange={(e) => updateCalculation('trees', 'treesPlanted', e.target.value)}
                        />
                        <p className="text-sm text-slate-400 mt-2">
                          Each tree absorbs approximately 48 lbs (22 kg) of CO2 per year
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Separator className="my-8 bg-white/10" />
                  
                  <Button onClick={calculateTotal} className="w-full" size="lg">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate My Carbon Footprint
                  </Button>
                </Card>
              </div>

              {/* Results Panel */}
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-24 bg-slate-900/50 backdrop-blur-xl border-white/10">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white flex items-center space-x-2 mb-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Your Carbon Footprint</span>
                    </h3>
                    <p className="text-sm text-slate-400">
                      Annual CO2 emissions in metric tons
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Total Emissions */}
                    <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl text-center p-6">
                      <div className="text-4xl font-bold text-primary mb-1">
                        {(results.total / 1000).toFixed(1)}
                      </div>
                      <div className="text-sm text-slate-400">tons CO2 per year</div>
                      <div className="text-xs text-slate-500 mt-2">
                        Global average: 4.8 tons
                      </div>
                    </div>

                    {/* Category Breakdown */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Breakdown by Category</h4>
                      
                      {chartData.map((item) => (
                        <div key={item.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-300">{item.name}</span>
                            <span className="text-sm font-medium text-white">
                              {item.name === 'Trees (Offset)' ? '-' : ''}{(item.value / 1000).toFixed(2)}t
                            </span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${totalAbsolute > 0 ? (item.value / totalAbsolute) * 100 : 0}%`,
                                backgroundColor: item.color
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Impact Comparison */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Climate Impact</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-300">vs Global Average</span>
                          <Badge variant={results.total / 1000 > 4.8 ? "destructive" : "secondary"} className="bg-white/5 border-white/10">
                            {results.total / 1000 > 4.8 ? 
                              <TrendingUp className="h-3 w-3 mr-1" /> : 
                              <TrendingDown className="h-3 w-3 mr-1" />
                            }
                            {((results.total / 1000 / 4.8 - 1) * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-300">vs US Average (16t)</span>
                          <Badge variant={results.total / 1000 > 16 ? "destructive" : "secondary"} className="bg-white/5 border-white/10">
                            {results.total / 1000 > 16 ? 
                              <TrendingUp className="h-3 w-3 mr-1" /> : 
                              <TrendingDown className="h-3 w-3 mr-1" />
                            }
                            {((results.total / 1000 / 16 - 1) * 100).toFixed(0)}%
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Quick Reduction Tips</h4>
                      <div className="space-y-2">
                        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl flex items-center space-x-3 p-3 hover:bg-white/10 transition-all cursor-pointer">
                          <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Leaf className="h-5 w-5 text-green-500" />
                          </div>
                          <span className="text-sm text-slate-300">Switch to renewable energy</span>
                        </div>
                        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl flex items-center space-x-3 p-3 hover:bg-white/10 transition-all cursor-pointer">
                          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Car className="h-5 w-5 text-blue-500" />
                          </div>
                          <span className="text-sm text-slate-300">Use public transportation</span>
                        </div>
                        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl flex items-center space-x-3 p-3 hover:bg-white/10 transition-all cursor-pointer">
                          <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <UtensilsCrossed className="h-5 w-5 text-orange-500" />
                          </div>
                          <span className="text-sm text-slate-300">Reduce meat consumption</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Get Personalized Action Plan
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Insights & Comparisons */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Understanding Your Impact</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Compare your carbon footprint with global averages and discover impactful ways to reduce emissions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="text-center p-8 bg-slate-900/50 backdrop-blur-xl border-white/10">
                <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Transportation Impact</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  Transportation accounts for 29% of US greenhouse gas emissions. Switching to electric or public transport can reduce this significantly.
                </p>
                <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">-75% with EV switch</Badge>
              </Card>

              <Card className="text-center p-8 bg-slate-900/50 backdrop-blur-xl border-white/10">
                <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Diet Choices</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  Food production generates 24% of global emissions. Plant-based diets can reduce food-related emissions by up to 73%.
                </p>
                <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">-73% plant-based</Badge>
              </Card>

              <Card className="text-center p-8 bg-slate-900/50 backdrop-blur-xl border-white/10">
                <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Energy Source</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  Electricity generation produces 25% of global emissions. Renewable energy can cut household emissions by 50%.
                </p>
                <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">-90% renewable</Badge>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <ComprehensiveFooter onNavigate={onNavigate} />
    </GradientBackground>
  );
}