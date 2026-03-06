import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, MapPin, Calendar, Map as MapIcon, Grid3x3 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ClimateDisastersTab() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [region, setRegion] = useState('all');
  const [severity, setSeverity] = useState([1, 5]);
  const [eventTypes, setEventTypes] = useState({
    flood: true,
    wildfire: true,
    drought: true,
    hurricane: true,
    heatwave: true,
    other: true,
  });

  const disasters = [
    {
      type: 'flood',
      location: 'Valencia, Spain',
      date: '2 days ago',
      severity: 5,
      affected: 1234,
      damage: 5.6,
      image: '🌊',
      description: 'Severe flooding after unprecedented rainfall',
      region: 'Europe'
    },
    {
      type: 'wildfire',
      location: 'California, USA',
      date: '5 days ago',
      severity: 4,
      affected: 3421,
      damage: 12.3,
      image: '🔥',
      description: 'Fast-moving wildfire threatens communities',
      region: 'North America'
    },
    {
      type: 'hurricane',
      location: 'Caribbean Islands',
      date: '1 week ago',
      severity: 5,
      affected: 8932,
      damage: 23.7,
      image: '🌀',
      description: 'Category 4 hurricane causes widespread damage',
      region: 'Central America'
    },
    {
      type: 'drought',
      location: 'Horn of Africa',
      date: '2 weeks ago',
      severity: 5,
      affected: 15678,
      damage: 8.9,
      image: '🏜️',
      description: 'Severe drought affecting millions',
      region: 'Africa'
    },
    {
      type: 'heatwave',
      location: 'Southern Europe',
      date: '3 weeks ago',
      severity: 4,
      affected: 4532,
      damage: 2.1,
      image: '🌡️',
      description: 'Record-breaking temperatures across region',
      region: 'Europe'
    },
    {
      type: 'flood',
      location: 'Bangladesh',
      date: '1 month ago',
      severity: 4,
      affected: 12453,
      damage: 6.8,
      image: '🌊',
      description: 'Monsoon floods displace thousands',
      region: 'Asia'
    },
    {
      type: 'wildfire',
      location: 'Amazon Rainforest',
      date: '1 month ago',
      severity: 5,
      affected: 2341,
      damage: 45.2,
      image: '🔥',
      description: 'Deforestation fires accelerate',
      region: 'South America'
    },
    {
      type: 'heatwave',
      location: 'India',
      date: '1 month ago',
      severity: 5,
      affected: 23456,
      damage: 4.3,
      image: '🌡️',
      description: 'Deadly heatwave affects major cities',
      region: 'Asia'
    },
    {
      type: 'hurricane',
      location: 'Philippines',
      date: '5 weeks ago',
      severity: 4,
      affected: 6789,
      damage: 8.4,
      image: '🌀',
      description: 'Typhoon brings heavy rainfall and flooding',
      region: 'Asia'
    },
    {
      type: 'drought',
      location: 'Western USA',
      date: '6 weeks ago',
      severity: 3,
      affected: 5432,
      damage: 15.6,
      image: '🏜️',
      description: 'Ongoing drought strains water resources',
      region: 'North America'
    },
    {
      type: 'flood',
      location: 'Pakistan',
      date: '2 months ago',
      severity: 5,
      affected: 33000,
      damage: 30.1,
      image: '🌊',
      description: 'Catastrophic flooding affects one-third of country',
      region: 'Asia'
    },
    {
      type: 'wildfire',
      location: 'Australia',
      date: '2 months ago',
      severity: 4,
      affected: 1876,
      damage: 9.2,
      image: '🔥',
      description: 'Bushfires threaten wildlife habitats',
      region: 'Oceania'
    },
  ];

  const eventTypeConfig: any = {
    flood: { color: 'bg-blue-500', label: 'Flood', icon: '🌊' },
    wildfire: { color: 'bg-red-500', label: 'Wildfire', icon: '🔥' },
    drought: { color: 'bg-yellow-600', label: 'Drought', icon: '🏜️' },
    hurricane: { color: 'bg-purple-500', label: 'Hurricane', icon: '🌀' },
    heatwave: { color: 'bg-orange-500', label: 'Heatwave', icon: '🌡️' },
    other: { color: 'bg-gray-500', label: 'Other', icon: '⚠️' },
  };

  const toggleEventType = (type: string) => {
    setEventTypes(prev => ({ ...prev, [type]: !prev[type as keyof typeof prev] }));
  };

  const filteredDisasters = disasters.filter(disaster => {
    const typeMatch = eventTypes[disaster.type as keyof typeof eventTypes];
    const regionMatch = region === 'all' || disaster.region === region;
    const severityMatch = disaster.severity >= severity[0] && disaster.severity <= severity[1];
    return typeMatch && regionMatch && severityMatch;
  });

  return (
    <div className="space-y-6">
      {/* View Toggle and Results Count */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="text-slate-400">
          Showing <span className="text-white font-semibold">{filteredDisasters.length}</span> events from last 30 days
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/5 hover:bg-white/10 border-white/10'}
          >
            <Grid3x3 className="w-4 h-4 mr-2" />
            Grid View
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('map')}
            className={viewMode === 'map' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/5 hover:bg-white/10 border-white/10'}
          >
            <MapIcon className="w-4 h-4 mr-2" />
            Map View
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
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
            {/* Event Type */}
            <div>
              <label className="text-sm text-slate-400 mb-3 block">Event Type</label>
              <div className="space-y-3">
                {Object.entries(eventTypeConfig).map(([key, config]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Checkbox 
                      id={key} 
                      checked={eventTypes[key as keyof typeof eventTypes]}
                      onCheckedChange={() => toggleEventType(key)}
                      className={`border-2`}
                      style={{ borderColor: config.color.replace('bg-', '#') }}
                    />
                    <label htmlFor={key} className="text-sm cursor-pointer flex items-center gap-2">
                      <span className="text-lg">{config.icon}</span>
                      {config.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Region */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Region</label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="bg-slate-900/50 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="South America">South America</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="Africa">Africa</SelectItem>
                  <SelectItem value="Oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Severity */}
            <div>
              <label className="text-sm text-slate-400 mb-3 block">
                Severity: {severity[0]} - {severity[1]}
              </label>
              <Slider
                value={severity}
                onValueChange={setSeverity}
                min={1}
                max={5}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            {/* Legend */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-sm text-slate-400 mb-2">Severity Scale</div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(level => (
                  <div
                    key={level}
                    className={`w-4 h-4 rounded-full ${
                      level <= 2 ? 'bg-yellow-500' :
                      level <= 3 ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {viewMode === 'grid' ? (
            <ScrollArea className="h-[800px]">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pr-4">
                {filteredDisasters.map((disaster, index) => (
                  <motion.div
                    key={`${disaster.location}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all group"
                  >
                    {/* Event Type Header */}
                    <div className={`${eventTypeConfig[disaster.type].color} p-4 flex items-center gap-3`}>
                      <span className="text-3xl">{eventTypeConfig[disaster.type].icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-white">
                          {eventTypeConfig[disaster.type].label}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-white/80">
                          {[...Array(disaster.severity)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-white rounded-full" />
                          ))}
                          {[...Array(5 - disaster.severity)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-white/30 rounded-full" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="font-semibold text-sm">{disaster.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Calendar className="w-4 h-4" />
                        {disaster.date}
                      </div>

                      <p className="text-sm text-slate-300">{disaster.description}</p>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
                        <div>
                          <div className="text-xs text-slate-400">People Affected</div>
                          <div className="font-semibold text-sm">
                            {disaster.affected.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400">Damage</div>
                          <div className="font-semibold text-sm text-red-400">
                            ${disaster.damage}M
                          </div>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full bg-white/5 hover:bg-white/10 border-white/10"
                      >
                        Read More
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            /* Map View */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 h-[800px] flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-2xl font-bold mb-2">Interactive Disaster Map</h3>
                <p className="text-slate-400">
                  Clustered event markers showing real-time climate disasters worldwide
                </p>
                <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                  {Object.entries(eventTypeConfig).map(([key, config]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${config.color} rounded-full`} />
                      <span>{config.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
