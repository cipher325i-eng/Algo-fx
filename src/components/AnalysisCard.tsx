import React, { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  CheckCircle2, 
  Calculator, 
  Copy, 
  Check, 
  Layers, 
  ShieldAlert, 
  Crosshair, 
  Maximize2 
} from "lucide-react";
import { ChartAnalysisResult } from "../types";

interface AnalysisCardProps {
  data: ChartAnalysisResult;
  onOpenCalculator?: (data: ChartAnalysisResult) => void;
  onViewImage?: (dataUrl: string) => void;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({
  data,
  onOpenCalculator,
  onViewImage,
}) => {
  const [copied, setCopied] = useState(false);

  // Direction color themes
  const isBuy = data.direction === "BUY";
  const isSell = data.direction === "SELL";

  const directionColor = isBuy
    ? "text-[#00FF66] border-[#00FF66]/50 bg-[#00FF66]/10"
    : isSell
    ? "text-[#FF3B30] border-[#FF3B30]/50 bg-[#FF3B30]/10"
    : "text-neutral-300 border-neutral-600 bg-neutral-800/60";

  const directionBadgeBg = isBuy
    ? "bg-[#00FF66] text-black shadow-[0_0_12px_rgba(0,255,102,0.4)]"
    : isSell
    ? "bg-[#FF3B30] text-white shadow-[0_0_12px_rgba(255,59,48,0.4)]"
    : "bg-neutral-600 text-white";

  const handleCopySetup = () => {
    const text = `
🎯 GENERATOR X - AI SCAN RESULT
Pair: ${data.pair} (${data.timeframe})
Direction: ${data.direction} [${data.confidence}% Confidence]
Strategy: ${data.strategy}
Entry: ${data.entry_price}
TP: ${data.take_profit}
SL: ${data.stop_loss}
R:R: ${data.risk_reward_ratio || "1:3.0"}
Grade: ${data.setup_grade || "Verified"}
Confluences:
${data.confluences.map((c) => `• ${c}`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={`analysis-card-${data.id}`}
      className="w-full bg-[#0e1217] rounded-xl border border-[#1e2633] p-4 text-white shadow-xl relative overflow-hidden transition-all duration-300 hover:border-[#2a3649]"
    >
      {/* Background visual neon accent glow */}
      <div
        className={`absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-20 ${
          isBuy ? "bg-[#00FF66]" : isSell ? "bg-[#FF3B30]" : "bg-neutral-500"
        }`}
      />

      {/* 1. Header: pair & timeframe on left, direction & confidence on right */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1b232f]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[#141a22] border border-[#232d3d] flex items-center justify-center font-mono font-black text-sm text-neutral-200 shadow-inner">
            {data.pair ? data.pair.slice(0, 3) : "GEN"}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-mono font-bold text-base tracking-wide text-white">
                {data.pair}
              </h3>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[#17202b] text-[#38bdf8] border border-[#38bdf8]/30">
                {data.timeframe}
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-mono flex items-center gap-1 mt-0.5">
              <span>{data.timestamp}</span>
              {data.phase && (
                <>
                  <span>•</span>
                  <span className="text-amber-400 font-semibold">{data.phase}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Direction & Confidence Badge */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xs font-mono font-black px-2.5 py-1 rounded-md tracking-wider flex items-center gap-1 uppercase ${directionBadgeBg}`}
            >
              {isBuy && <TrendingUp size={13} strokeWidth={3} />}
              {isSell && <TrendingDown size={13} strokeWidth={3} />}
              {!isBuy && !isSell && <Minus size={13} strokeWidth={3} />}
              {data.direction}
            </span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <span className="text-neutral-400">Confidence:</span>
            <span
              className={`font-bold ${
                data.confidence >= 80
                  ? "text-[#00FF66]"
                  : data.confidence >= 60
                  ? "text-amber-400"
                  : "text-neutral-400"
              }`}
            >
              {data.confidence}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Strategy Banner: Highlighted Prominently */}
      <div className="mt-3 py-2 px-3 rounded-lg bg-[#121820] border border-[#232d3d] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#00FF66]/10 text-[#00FF66]">
            <Crosshair size={14} />
          </div>
          <div>
            <div className="text-[9px] font-mono uppercase text-neutral-400 tracking-wider">
              Strategy Setup
            </div>
            <div className="text-xs font-semibold text-neutral-100 font-mono tracking-tight">
              {data.strategy}
            </div>
          </div>
        </div>

        {data.setup_grade && (
          <div className="text-right">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1b2432] text-amber-300 border border-amber-400/30">
              {data.setup_grade}
            </span>
          </div>
        )}
      </div>

      {/* 3. Parameters Grid: entry_price, take_profit, stop_loss */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {/* Entry Price */}
        <div className="bg-[#12161d] p-2.5 rounded-lg border border-[#1f2735]">
          <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            Entry Price
          </div>
          <div className="text-sm font-bold font-mono text-white mt-1 tracking-tight">
            {data.entry_price}
          </div>
        </div>

        {/* Take Profit */}
        <div className="bg-[#12161d] p-2.5 rounded-lg border border-[#00FF66]/20 bg-gradient-to-b from-[#00FF66]/5 to-transparent">
          <div className="text-[9px] font-mono text-[#00FF66] uppercase tracking-wider flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
            Take Profit
          </div>
          <div className="text-sm font-bold font-mono text-[#00FF66] mt-1 tracking-tight">
            {data.take_profit}
          </div>
        </div>

        {/* Stop Loss */}
        <div className="bg-[#12161d] p-2.5 rounded-lg border border-[#FF3B30]/20 bg-gradient-to-b from-[#FF3B30]/5 to-transparent">
          <div className="text-[9px] font-mono text-[#FF3B30] uppercase tracking-wider flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B30]" />
            Stop Loss
          </div>
          <div className="text-sm font-bold font-mono text-[#FF3B30] mt-1 tracking-tight">
            {data.stop_loss}
          </div>
        </div>
      </div>

      {/* Optional Chart Thumbnail Preview if available */}
      {data.imagePreview && (
        <div className="mt-3 relative rounded-lg overflow-hidden border border-[#222b3a] bg-black group">
          <img
            src={data.imagePreview}
            alt="Chart scan preview"
            className="w-full h-28 object-cover opacity-85 group-hover:opacity-100 transition-opacity"
          />
          {onViewImage && (
            <button
              onClick={() => onViewImage(data.imagePreview!)}
              className="absolute top-2 right-2 p-1.5 rounded-md bg-black/70 text-white hover:bg-black/90 backdrop-blur-sm border border-neutral-700"
              title="Expand Chart Screenshot"
            >
              <Maximize2 size={13} />
            </button>
          )}
          <div className="absolute bottom-1 left-2 text-[9px] font-mono text-neutral-400 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
            Targeted Timeframe: {data.timeframe}
          </div>
        </div>
      )}

      {/* 4. Confluences Section: itemized bulleted list */}
      <div className="mt-3 pt-3 border-t border-[#1a222e]">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={12} className="text-[#00FF66]" />
            Confluences & Market Structure ({data.confluences.length})
          </div>
          {data.risk_reward_ratio && (
            <div className="text-[10px] font-mono font-bold text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/20">
              R:R {data.risk_reward_ratio}
            </div>
          )}
        </div>

        <ul className="space-y-1.5">
          {data.confluences.map((confluence, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs text-neutral-300 font-sans leading-relaxed bg-[#12171f]/60 p-1.5 rounded border border-[#1c2432]"
            >
              <CheckCircle2
                size={13}
                className="text-[#00FF66] shrink-0 mt-0.5"
              />
              <span className="text-[11px] font-mono">{confluence}</span>
            </li>
          ))}
        </ul>

        {data.summary_notes && (
          <p className="mt-2.5 text-[11px] text-neutral-400 italic bg-[#0b0e13] p-2 rounded border border-dashed border-[#202938]">
            "{data.summary_notes}"
          </p>
        )}
      </div>

      {/* Actions footer: Position Calculator CTA & Copy Setup */}
      <div className="mt-3.5 pt-2.5 border-t border-[#1b232f] flex items-center justify-between gap-2">
        <button
          id={`btn-calc-${data.id}`}
          onClick={() => onOpenCalculator?.(data)}
          className="flex-1 py-1.5 px-3 rounded-lg bg-[#141b24] hover:bg-[#1a2330] border border-[#232f42] text-xs font-mono font-semibold text-neutral-200 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Calculator size={13} className="text-[#00FF66]" />
          <span>Calculate Lot Size</span>
        </button>

        <button
          id={`btn-copy-${data.id}`}
          onClick={handleCopySetup}
          className="py-1.5 px-3 rounded-lg bg-[#141b24] hover:bg-[#1a2330] border border-[#232f42] text-xs font-mono font-semibold text-neutral-200 flex items-center gap-1.5 transition-colors"
        >
          {copied ? (
            <>
              <Check size={13} className="text-[#00FF66]" />
              <span className="text-[#00FF66]">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} className="text-neutral-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
