import React, { useState, useEffect } from "react";
import { X, Calculator, ShieldCheck, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { ChartAnalysisResult } from "../types";

interface PositionSizeModalProps {
  data: ChartAnalysisResult | null;
  defaultAccountSize: number;
  defaultRiskPct: number;
  onClose: () => void;
}

export const PositionSizeModal: React.FC<PositionSizeModalProps> = ({
  data,
  defaultAccountSize,
  defaultRiskPct,
  onClose,
}) => {
  if (!data) return null;

  const [accountBalance, setAccountBalance] = useState(defaultAccountSize || 10000);
  const [riskPercent, setRiskPercent] = useState(defaultRiskPct || 1.0);
  const [entryPrice, setEntryPrice] = useState(parseFloat(data.entry_price.replace(/,/g, "")) || 2384.5);
  const [stopLoss, setStopLoss] = useState(parseFloat(data.stop_loss.replace(/,/g, "")) || 2375.8);
  const [takeProfit, setTakeProfit] = useState(parseFloat(data.take_profit.replace(/,/g, "")) || 2412.0);

  // Parse calculations
  const isGold = data.pair.toUpperCase().includes("XAU") || data.pair.toUpperCase().includes("GOLD");
  const isCrypto = data.pair.toUpperCase().includes("BTC") || data.pair.toUpperCase().includes("ETH");
  const isIndices = data.pair.toUpperCase().includes("NAS") || data.pair.toUpperCase().includes("US30") || data.pair.toUpperCase().includes("SPX");

  const riskAmount = (accountBalance * (riskPercent / 100));
  const stopDistance = Math.abs(entryPrice - stopLoss);
  const targetDistance = Math.abs(takeProfit - entryPrice);

  // Lot calculations per instrument specifications
  let calculatedLots = 0;
  let pipOrPointDist = 0;

  if (isGold) {
    // 1 standard lot = 100 oz. $1 price move = $100 per lot, or $0.10 move = $10 per pip
    pipOrPointDist = stopDistance * 10; // pips
    const dollarPerLotStop = stopDistance * 100;
    calculatedLots = dollarPerLotStop > 0 ? riskAmount / dollarPerLotStop : 0;
  } else if (isCrypto) {
    // BTC: $1 move = $1 per coin
    pipOrPointDist = stopDistance;
    calculatedLots = stopDistance > 0 ? riskAmount / stopDistance : 0;
  } else if (isIndices) {
    // 1 point move = $1 or $20 depending on contract
    pipOrPointDist = stopDistance;
    calculatedLots = stopDistance > 0 ? riskAmount / (stopDistance * 2) : 0;
  } else {
    // Standard FX (e.g. EURUSD): 1 pip = 0.0001 = $10 per standard lot
    pipOrPointDist = stopDistance * 10000;
    calculatedLots = pipOrPointDist > 0 ? riskAmount / (pipOrPointDist * 10) : 0;
  }

  const potentialProfit = targetDistance > 0 && stopDistance > 0 
    ? riskAmount * (targetDistance / stopDistance)
    : 0;

  const riskReward = stopDistance > 0 ? (targetDistance / stopDistance).toFixed(2) : "0.00";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#0f141c] border border-[#212c3d] rounded-2xl p-5 shadow-2xl text-white relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1f2837]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30">
              <Calculator size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-white">
                POSITION SIZE CALCULATOR
              </h3>
              <p className="text-[11px] text-neutral-400 font-mono">
                {data.pair} • {data.direction}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Calculated Results Banner */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[#12241b] via-[#0d1712] to-[#0a100d] border border-[#00FF66]/40 shadow-[0_0_15px_rgba(0,255,102,0.15)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase text-neutral-300">
              Recommended Position:
            </span>
            <span className="text-[11px] font-mono text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/20 font-bold">
              1:{riskReward} R:R
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-black font-mono tracking-tight text-[#00FF66]">
                {calculatedLots.toFixed(2)}
              </span>
              <span className="text-sm font-mono text-neutral-300 ml-1.5">Lots / Units</span>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-neutral-400">Total Risk:</div>
              <div className="text-sm font-mono font-bold text-[#FF3B30]">
                -${riskAmount.toFixed(2)} ({riskPercent}%)
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#1a3325] grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="flex items-center gap-1 text-neutral-300">
              <TrendingUp size={12} className="text-[#00FF66]" />
              <span>Potential Return:</span>
              <span className="text-[#00FF66] font-bold">+${potentialProfit.toFixed(2)}</span>
            </div>
            <div className="text-right text-neutral-400">
              Stop Distance: <span className="text-white font-semibold">{stopDistance.toFixed(2)} pts</span>
            </div>
          </div>
        </div>

        {/* User Inputs Form */}
        <div className="mt-4 space-y-3">
          {/* Account Balance */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
              Account Equity ($ USD)
            </label>
            <div className="relative">
              <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="number"
                value={accountBalance}
                onChange={(e) => setAccountBalance(Math.max(10, parseFloat(e.target.value) || 0))}
                className="w-full bg-[#131923] border border-[#212c3e] rounded-lg pl-8 pr-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-[#00FF66]"
              />
            </div>
          </div>

          {/* Risk Percentage */}
          <div>
            <div className="flex items-center justify-between mb-1 text-[11px] font-mono">
              <span className="text-neutral-400 uppercase">Risk Per Trade (%)</span>
              <span className="text-[#00FF66] font-bold">{riskPercent}%</span>
            </div>
            <input
              type="range"
              min="0.25"
              max="5"
              step="0.25"
              value={riskPercent}
              onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
              className="w-full accent-[#00FF66] cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-neutral-500 mt-0.5">
              <span>0.5% (Conservative)</span>
              <span>1.0% (Prop Firm Std)</span>
              <span>2.0% (Aggressive)</span>
            </div>
          </div>

          {/* Price Levels */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 mb-1">Entry</label>
              <input
                type="number"
                step="any"
                value={entryPrice}
                onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#131923] border border-[#212c3e] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#38bdf8]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-[#00FF66] mb-1">Take Profit</label>
              <input
                type="number"
                step="any"
                value={takeProfit}
                onChange={(e) => setTakeProfit(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#131923] border border-[#00FF66]/30 rounded-lg px-2.5 py-1.5 text-xs font-mono text-[#00FF66] focus:outline-none focus:border-[#00FF66]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-[#FF3B30] mb-1">Stop Loss</label>
              <input
                type="number"
                step="any"
                value={stopLoss}
                onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#131923] border border-[#FF3B30]/30 rounded-lg px-2.5 py-1.5 text-xs font-mono text-[#FF3B30] focus:outline-none focus:border-[#FF3B30]"
              />
            </div>
          </div>
        </div>

        {/* Risk Protocol Notice */}
        <div className="mt-4 p-2.5 rounded-lg bg-[#14181f] border border-[#232a36] flex items-start gap-2 text-[11px] text-neutral-400">
          <ShieldCheck size={14} className="text-[#00FF66] shrink-0 mt-0.5" />
          <span>
            Prop firm & SMC standard: Never risk more than 1-2% of account equity per trade. Always lock breakeven at 1:1 R:R.
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl bg-[#00FF66] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#00e65c] transition-colors shadow-[0_0_12px_rgba(0,255,102,0.3)]"
        >
          Confirm & Close
        </button>
      </div>
    </div>
  );
};
