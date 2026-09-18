import React, { useState, useEffect } from "react";
import { 
  Flame, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Filter, 
  ShieldAlert, 
  Calendar, 
  Info,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { EconomicEvent, EventImpact } from "../types";
import { INITIAL_ECONOMIC_EVENTS } from "../data/sampleData";

export const NewsScreen: React.FC = () => {
  const [events, setEvents] = useState<EconomicEvent[]>(INITIAL_ECONOMIC_EVENTS);
  const [filterImpact, setFilterImpact] = useState<EventImpact | "ALL">("ALL");
  const [expandedEventId, setExpandedEventId] = useState<string | null>("ev-1");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch fresh calendar from /api/economic-calendar
    const fetchCalendar = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/economic-calendar");
        if (res.ok) {
          const json = await res.json();
          if (json.events && json.events.length > 0) {
            setEvents(json.events);
          }
        }
      } catch (e) {
        console.warn("Could not fetch latest calendar, using fallback data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCalendar();
  }, []);

  const filteredEvents = events.filter((ev) => {
    if (filterImpact === "ALL") return true;
    return ev.impact === filterImpact;
  });

  const highImpactCount = events.filter((e) => e.impact === "HIGH").length;

  return (
    <div className="w-full pb-8 px-4 animate-in fade-in duration-300">
      {/* Macro Warning Banner */}
      <div className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#151010] to-[#0d0f14] border border-red-500/30 shadow-xl font-mono">
        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
          <Flame size={16} className="text-red-500 animate-bounce" />
          <span>High Impact Macro Window</span>
        </div>
        <p className="mt-1 text-xs text-neutral-200 leading-relaxed font-sans">
          {highImpactCount} high-impact releases scheduled today. SMC volatility surge expected during NY Session open (13:30 UTC).
        </p>
        <div className="mt-2.5 pt-2 border-t border-red-500/20 flex items-center justify-between text-[11px] text-neutral-400">
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-red-400" />
            Next Release: US NFP (In 45 mins)
          </span>
          <span className="text-[#00FF66] font-bold">Trading Radar Active</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs font-mono font-bold uppercase text-white tracking-wider flex items-center gap-1.5">
          <Calendar size={14} className="text-[#00FF66]" />
          <span>Economic Calendar</span>
        </div>

        {/* Filter impact buttons */}
        <div className="flex gap-1 bg-[#10141b] p-1 rounded-lg border border-[#1c2432] font-mono text-[10px]">
          {(["ALL", "HIGH", "MEDIUM", "MINOR"] as const).map((impact) => (
            <button
              key={impact}
              onClick={() => setFilterImpact(impact)}
              className={`px-2 py-0.5 rounded font-bold uppercase transition-colors ${
                filterImpact === impact
                  ? impact === "HIGH"
                    ? "bg-[#FF3B30] text-white"
                    : impact === "MEDIUM"
                    ? "bg-amber-500 text-black"
                    : impact === "MINOR"
                    ? "bg-neutral-600 text-white"
                    : "bg-[#00FF66] text-black"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {impact}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="mt-3 space-y-3 font-mono">
        {filteredEvents.map((ev) => {
          const isHigh = ev.impact === "HIGH";
          const isMed = ev.impact === "MEDIUM";
          const isExpanded = expandedEventId === ev.id;

          const impactColor = isHigh
            ? "border-red-500/40 text-red-400 bg-red-950/20"
            : isMed
            ? "border-amber-500/40 text-amber-400 bg-amber-950/20"
            : "border-neutral-700 text-neutral-400 bg-neutral-800/40";

          return (
            <div
              key={ev.id}
              className="bg-[#0e1218] border border-[#1e2736] rounded-xl p-3.5 transition-all hover:border-[#2b374b]"
            >
              <div 
                className="flex items-start justify-between cursor-pointer"
                onClick={() => setExpandedEventId(isExpanded ? null : ev.id)}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-[#151b24] border border-[#232d3d] flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-black text-white">{ev.currency}</span>
                    <span className={`text-[8px] font-bold px-1 rounded uppercase ${impactColor}`}>
                      {ev.impact}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white font-sans leading-snug">
                      {ev.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-400">
                      <span className="flex items-center gap-1 text-white">
                        <Clock size={10} className="text-[#00FF66]" />
                        {ev.time}
                      </span>
                      <span>•</span>
                      <span>{ev.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-[9px] text-neutral-500 uppercase">Forecast</div>
                    <div className="text-xs font-bold text-white">{ev.forecast}</div>
                  </div>
                  <button className="text-neutral-500 hover:text-white p-1">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Data Table: Forecast, Previous, Actual */}
              <div className="mt-3 pt-2.5 border-t border-[#1a222e] grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="bg-[#12161f] p-1.5 rounded-lg border border-[#1d2635]">
                  <span className="text-neutral-500 block">Forecast</span>
                  <span className="text-neutral-200 font-bold">{ev.forecast}</span>
                </div>
                <div className="bg-[#12161f] p-1.5 rounded-lg border border-[#1d2635]">
                  <span className="text-neutral-500 block">Previous</span>
                  <span className="text-neutral-400">{ev.previous}</span>
                </div>
                <div className="bg-[#12161f] p-1.5 rounded-lg border border-[#1d2635]">
                  <span className="text-neutral-500 block">Actual</span>
                  <span className={ev.actual ? "text-[#00FF66] font-bold" : "text-neutral-600"}>
                    {ev.actual || "Pending"}
                  </span>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-3 pt-2.5 border-t border-dashed border-[#1d2635] text-[11px] font-sans text-neutral-300">
                  <p className="leading-relaxed text-neutral-400">
                    {ev.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                    <span className="text-neutral-500">Affected Pairs:</span>
                    {ev.affectedPairs.map((pair, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-1.5 py-0.5 rounded bg-[#161d27] text-[#38bdf8] border border-[#38bdf8]/30"
                      >
                        {pair}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
