import { useState, useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, BarChart3, Filter, ExternalLink, RefreshCw, Layers, LayoutDashboard } from 'lucide-react';
import { Lead } from './types';
import { DHA_PHASE_4_SECTORS, INITIAL_LEADS } from './constants';
import { cn } from './lib/utils';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

function MapSplash() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center space-y-4">
      <div className="p-4 bg-slate-100 rounded-full">
        <MapPin className="w-8 h-8 text-slate-400" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-slate-900">Google Maps API Key Required</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-2">
          To visualize the geospatial data for DHA Phase 4, please add your GOOGLE_MAPS_PLATFORM_KEY to the secrets panel.
        </p>
      </div>
      <a 
        href="https://console.cloud.google.com/google/maps-apis/start" 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        Get API Key
      </a>
    </div>
  );
}

function LeadMarker({ lead, isActive, onClick }: { lead: Lead, isActive: boolean, onClick: () => void, key?: string }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const position = useMemo(() => ({
    lat: 31.474 + (Math.random() - 0.5) * 0.015,
    lng: 74.375 + (Math.random() - 0.5) * 0.015
  }), []);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onClick={onClick}
      >
        <Pin 
          background={isActive ? '#4f46e5' : lead.priority === 'High' ? '#ef4444' : '#f59e0b'} 
          glyphColor="#fff" 
          scale={isActive ? 1.2 : 1}
        />
      </AdvancedMarker>
      {isActive && (
        <InfoWindow anchor={marker} onCloseClick={onClick}>
          <div className="p-2 min-w-[200px] bg-white">
            <h4 className="font-bold text-slate-900">{lead.name}</h4>
            <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">{lead.category} • {lead.priority} Priority</p>
            <div className="mt-2 text-xs text-slate-600 leading-snug">{lead.gapReason}</div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'leads' | 'analysis'>('leads');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [isResearching, setIsResearching] = useState(false);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);

  const handleResearch = () => {
    setIsResearching(true);
    setTimeout(() => {
      setIsResearching(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight uppercase italic">Lahore Lead Matrix</h1>
              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-black">Geospatial GAP Agent v4.0</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('leads')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                activeTab === 'leads' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Leads
            </button>
            <button 
              onClick={() => setActiveTab('analysis')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                activeTab === 'analysis' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700"
              )}
            >
              System Analytics
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-tight">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              <span>DHA4-GRID-ACTIVE</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black uppercase tracking-tighter italic">Operational Buffer</h2>
              <button 
                onClick={handleResearch}
                disabled={isResearching}
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={cn("w-4 h-4", isResearching && "animate-spin")} />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="FILTER ENTITIES..." 
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-600 transition-all outline-none text-xs font-bold uppercase tracking-wider"
              />
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-280px)] pr-2 custom-scrollbar">
              <AnimatePresence>
                {leads.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    onClick={() => setSelectedLeadId(lead.id === selectedLeadId ? null : lead.id)}
                    className={cn(
                      "p-5 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden",
                      selectedLeadId === lead.id 
                        ? "bg-white border-indigo-600 shadow-xl shadow-indigo-100/50 ring-1 ring-indigo-600" 
                        : "bg-white border-slate-100 hover:border-slate-200 shadow-sm"
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div className="max-w-[70%]">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.1em]",
                          lead.priority === 'High' ? "bg-red-50 text-red-600 border border-red-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                        )}>
                          {lead.priority} GAP
                        </span>
                        <h3 className="text-base font-black mt-2 leading-tight uppercase group-hover:text-indigo-600 transition-colors tracking-tight">{lead.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-300 group-hover:text-indigo-100 transition-colors">#{lead.id.padStart(3, '0')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <div className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                        {lead.category}
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <div className="h-1 bg-slate-100 flex-1 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${lead.expansionScore * 10}%` }}
                            className="h-full bg-indigo-600" 
                          />
                        </div>
                        <span className="text-[10px] font-black text-slate-900">{lead.expansionScore}</span>
                      </div>
                    </div>

                    {selectedLeadId === lead.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 pt-4 border-t border-slate-100 space-y-4"
                      >
                        <div>
                          <p className="text-slate-400 font-bold mb-1 uppercase tracking-tighter text-[9px]">Root Intelligence</p>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium italic">"{lead.gapReason}"</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-indigo-600 min-w-0">
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                            <p className="text-[10px] font-bold truncate">{lead.contact}</p>
                          </div>
                          <p className="text-[9px] font-black uppercase text-slate-400">Expand Branch</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-1 flex-grow shadow-sm flex flex-col overflow-hidden min-h-[600px]">
              <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Live Grid Visualization</span>
                </div>
                <div className="flex items-center gap-4">
                  {DHA_PHASE_4_SECTORS.map(s => (
                    <div key={s.id} className="text-[9px] font-bold text-slate-400 px-2 py-0.5 bg-slate-50 border border-slate-100 rounded uppercase">{s.id}</div>
                  ))}
                </div>
              </div>

              <div className="flex-grow bg-slate-50 relative">
                {hasValidKey ? (
                  <APIProvider apiKey={API_KEY} version="weekly">
                    <Map
                      defaultCenter={{ lat: 31.473, lng: 74.375 }}
                      defaultZoom={14}
                      mapId="MAP_LAYOUT_DHA4"
                      disableDefaultUI={true}
                      zoomControl={true}
                      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                      className="w-full h-full"
                    >
                      {leads.map(lead => (
                        <LeadMarker 
                          key={lead.id} 
                          lead={lead} 
                          isActive={selectedLeadId === lead.id}
                          onClick={() => setSelectedLeadId(lead.id === selectedLeadId ? null : lead.id)}
                        />
                      ))}
                      {DHA_PHASE_4_SECTORS.map(sector => (
                        <AdvancedMarker 
                          key={sector.id} 
                          position={sector.center}
                        >
                          <div className="px-3 py-1.5 bg-white/95 border-2 border-indigo-100 shadow-sm rounded-lg text-[10px] font-black uppercase tracking-tighter text-indigo-600 flex flex-col items-center">
                            {sector.id}
                            <span className="text-[7px] text-slate-400 -mt-1 font-bold">SECTOR</span>
                          </div>
                        </AdvancedMarker>
                      ))}
                    </Map>
                  </APIProvider>
                ) : (
                  <MapSplash />
                )}

                <div className="absolute top-6 left-6 p-4 bg-white/95 backdrop-blur shadow-2xl rounded-2xl border border-slate-200 max-w-[240px] space-y-3">
                   <div className="flex items-center gap-2 mb-1">
                     <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                     <h4 className="text-[10px] font-black uppercase tracking-wider">Sector Intelligence</h4>
                   </div>
                   <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                     <div className="flex justify-between items-center text-[10px]">
                       <span className="text-slate-500 font-bold">Commercial Velocity</span>
                       <span className="font-black text-indigo-600">8.4/10</span>
                     </div>
                     <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-600 w-[84%]" />
                     </div>
                     <p className="text-[9px] text-slate-400 font-medium leading-relaxed italic">"Sector AA shows highest density of unfilled fitness & specialty coffee gaps."</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {activeTab === 'analysis' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md flex justify-end"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-full max-w-2xl bg-white h-full shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic italic-serif">Market Gap Analysis</h2>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-2">Lahore Geospatial Intelligence Node 01</p>
                </div>
                <button onClick={() => setActiveTab('leads')} className="p-4 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
                  <div className="w-6 h-6 border-2 border-slate-300 rounded-sm" />
                </button>
              </div>

              <div className="p-8 space-y-12 overflow-y-auto flex-grow custom-scrollbar">
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="px-3 py-1 bg-indigo-600 text-white rounded text-[10px] font-black uppercase">Phase 4 Target</div>
                    <div className="h-[1px] flex-1 bg-slate-100" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors group">
                      <p className="text-[10px] uppercase font-black text-slate-400 mb-2 group-hover:text-indigo-400">Retail Saturation</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-slate-900 tracking-tighter">82</span>
                        <span className="text-xl font-bold text-slate-300">%</span>
                      </div>
                      <div className="mt-4 px-2 py-1 bg-red-50 text-red-600 text-[9px] font-black uppercase inline-block rounded">OVERSUPPLIED</div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors group">
                      <p className="text-[10px] uppercase font-black text-slate-400 mb-2 group-hover:text-indigo-400">Service Gaps</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-slate-900 tracking-tighter">14</span>
                        <span className="text-xl font-bold text-slate-300">%</span>
                      </div>
                      <div className="mt-4 px-2 py-1 bg-green-50 text-green-600 text-[9px] font-black uppercase inline-block rounded">HIGH POTENTIAL</div>
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-3">
                    <Layers className="w-4 h-4" />
                    Spatial Competition Nodes
                  </h3>
                  <div className="space-y-4">
                    {[
                      { area: 'Phase 5 (Broadway)', impact: 'High', spillover: 70 },
                      { area: 'Phase 3 (Y-Block)', impact: 'Moderate', spillover: 45 },
                      { area: 'Gulberg (High St)', impact: 'Low (Dist)', spillover: 12 }
                    ].map((node, i) => (
                      <div key={i} className="p-5 bg-white border border-slate-100 rounded-2xl flex items-center justify-between hover:shadow-lg hover:shadow-slate-100 transition-all group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-xs font-black text-indigo-600">
                            0{i + 1}
                          </div>
                          <div>
                            <p className="text-sm font-black uppercase tracking-tighter">{node.area}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-0.5">IMPACT: <span className={cn(node.impact === 'High' ? 'text-red-500' : 'text-amber-500')}>{node.impact}</span></p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-[10px] font-black text-slate-900">{node.spillover}% SPILL</span>
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${node.spillover}%` }}
                               className="h-full bg-indigo-600" 
                             />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center gap-4 active:scale-[0.98]">
                  <BarChart3 className="w-4 h-4" />
                  INITIATE SYSTEM RE-SCAN
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
