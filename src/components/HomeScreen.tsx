import React, { useState } from "react";
import { 
  History, 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  Plus, 
  BarChart3, 
  Zap, 
  CheckCircle2, 
  Shield 
} from "lucide-react";
import { ChartAnalysisResult, TradeDirection } from "../types";
import { AnalysisCard } from "./AnalysisCard";

interface HomeScreenProps {
  history: ChartAnalysisResult[];
  onNavigateToScan: () => void;
  onOpenCalculator: (result: ChartAnalysisResult) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  history,
  onNavigateToScan,
  onOpenCalculator,
}) => {
  const [filterDirection, setFilterDirection] = useState<TradeDirection | "ALL">("ALL");

  const filteredHistory = history.filter((item) => {
    if (filterDirection === "ALL") return true;
    return item.direction === filterDirection;
  });

  // Calculate quick stats
  const totalScans = history.length;
  const buyCount = history.filter((h) => h.direction === "BUY").length;
  const sellCount = history.filter((h) => h.direction === "SELL").length;
  const avgConfidence = totalScans > 0
    ? Math.round(history.reduce((acc, curr) => acc + curr.confidence, 0) / totalScans)
    : 0;

  return (
    <div className="w-full pb-8 px-4 animate-in fade-in duration-300">
      {/* Top Banner / Hero Overview */}
      <div className="mt-3 p-4 rounded-2xl bg-gradient-to-br from-[#101720] via-[#0d1219] to-[#070a0e] border border-[#1d2737] shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-[#00FF66] uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Zap size={12} />
              AI SCAN DASHBOARD
            </div>
            <h2 className="text-lg font-black font-mono tracking-tight text-white mt-0.5">
              Recent Market Scans
            </h2>
          </div>
          <button
            onClick={onNavigateToScan}
            className="py-1.5 px-3 rounded-lg bg-[#00FF66] text-black font-mono font-bold text-xs flex items-center gap-1 hover:bg-[#00e65c] transition-colors shadow-[0_0_12px_rgba(0,255,102,0.3)]"
          >
            <Plus size={14} />
            <span>New Scan</span>
          </button>
        </div>

        {/* Metric Cards Row */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono">
          <div className="bg-[#121822] p-2.5 rounded-xl border border-[#1f293a]">
            <div className="text-[10px] text-neutral-400 uppercase">Total Scans</div>
            <div className="text-xl font-black text-white mt-0.5">{totalScans}</div>
          </div>
          <div className="bg-[#121822] p-2.5 rounded-xl border border-[#00FF66]/20">
            <div className="text-[10px] text-[#00FF66] uppercase">Avg Confidence</div>
            <div className="text-xl font-black text-[#00FF66] mt-0.5">{avgConfidence}%</div>
          </div>
          <div className="bg-[#121822] p-2.5 rounded-xl border border-[#1f293a]">
            <div className="text-[10px] text-neutral-400 uppercase">Buy / Sell</div>
            <div className="text-xl font-black text-neutral-200 mt-0.5">
              <span className="text-[#00FF66]">{buyCount}</span>
              <span className="text-neutral-600 mx-1">/</span>
              <span className="text-[#FF3B30]">{sellCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
          <Filter size={13} />
          <span>Filter:</span>
        </div>

        <div className="flex gap-1 bg-[#10141b] p-1 rounded-lg border border-[#1c2432] font-mono text-[10px]">
          {(["ALL", "BUY", "SELL", "NEUTRAL"] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => setFilterDirection(dir)}
              className={`px-2.5 py-1 rounded font-bold uppercase transition-colors ${
                filterDirection === dir
                  ? dir === "BUY"
                    ? "bg-[#00FF66] text-black"
                    : dir === "SELL"
                    ? "bg-[#FF3B30] text-white"
                    : "bg-white text-black"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {dir}
            </button>
          ))}
        </div>
      </div>

      {/* History Cards List */}
      <div className="mt-3 space-y-4">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <AnalysisCard
              key={item.id}
              data={item}
              onOpenCalculator={onOpenCalculator}
              onViewImage={(url) => window.open(url, "_blank")}
            />
          ))
        ) : (
          <div className="py-12 px-4 rounded-2xl bg-[#0d1117] border border-dashed border-[#202938] text-center font-mono">
            <History size={32} className="text-neutral-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-neutral-300">No Scans Found</p>
            <p className="text-xs text-neutral-500 mt-1">
              {filterDirection !== "ALL"
                ? `No ${filterDirection} setups in current scan history.`
                : "You haven't scanned any charts yet."}
            </p>
            <button
              onClick={onNavigateToScan}
              className="mt-4 py-2 px-4 rounded-xl bg-[#00FF66] text-black font-bold text-xs inline-flex items-center gap-1.5 hover:bg-[#00e65c] transition-colors"
            >
              <Plus size={14} />
              <span>Scan Chart Now</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
