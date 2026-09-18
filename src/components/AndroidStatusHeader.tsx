import React, { useState, useEffect } from "react";
import { Wifi, BatteryMedium, Sparkles, Activity } from "lucide-react";

interface AndroidStatusHeaderProps {
  onScanClick?: () => void;
}

export const AndroidStatusHeader: React.FC<AndroidStatusHeaderProps> = () => {
  const [timeStr, setTimeStr] = useState("07:30");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTimeStr(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-[#0a0a0c]/90 backdrop-blur-md border-b border-[#1b222c] sticky top-0 z-40 select-none">
      {/* Android 15 Status Bar */}
      <div className="flex items-center justify-between px-4 pt-1.5 pb-1 text-[11px] font-medium text-neutral-400 font-mono tracking-wider">
        <div className="flex items-center gap-1.5">
          <span className="text-white font-semibold">{timeStr}</span>
          <span className="text-[#00FF66] text-[9px] bg-[#00FF66]/10 px-1 py-0.5 rounded border border-[#00FF66]/20">5G+</span>
        </div>

        {/* Center Camera Punch Hole Indicator */}
        <div className="w-3.5 h-3.5 rounded-full bg-black/80 border border-neutral-800 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
        </div>

        <div className="flex items-center gap-2 text-neutral-300">
          <Activity size={12} className="text-[#00FF66] animate-pulse" />
          <Wifi size={12} />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] text-neutral-400">98%</span>
            <BatteryMedium size={13} className="text-[#00FF66]" />
          </div>
        </div>
      </div>

      {/* App Header Branding matching the user video */}
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FF66]/20 via-[#10241b] to-black border border-[#00FF66]/40 flex items-center justify-center shadow-[0_0_12px_rgba(0,255,102,0.25)]">
            <span className="text-[#00FF66] font-bold text-sm tracking-tighter">GX</span>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00FF66] animate-ping opacity-75" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-white font-bold text-xs tracking-wider uppercase font-mono">
                GENERATOR X
              </h1>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#00FF66] text-black tracking-widest uppercase">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-mono tracking-tight flex items-center gap-1">
              <Sparkles size={9} className="text-[#00FF66]" />
              SMART INTELLIGENCE • VISION AI
            </p>
          </div>
        </div>

        {/* Live Engine Status Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#121915] border border-[#00FF66]/30 shadow-[0_0_8px_rgba(0,255,102,0.15)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
          <span className="text-[10px] font-mono font-semibold text-[#00FF66] uppercase tracking-wider">
            RADAR ONLINE
          </span>
        </div>
      </div>

      {/* Live Market Ticker Ribbon (as seen in video top bar) */}
      <div className="overflow-x-auto no-scrollbar border-t border-[#161c24] bg-[#07090c] py-1 px-3 flex items-center gap-4 text-[10px] font-mono whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-400">XAUUSD</span>
          <span className="text-white font-semibold">2,384.50</span>
          <span className="text-[#00FF66] font-bold">+1.12%</span>
        </div>
        <span className="text-neutral-700">•</span>
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-400">NAS100</span>
          <span className="text-white font-semibold">19,820.0</span>
          <span className="text-[#FF3B30] font-bold">-0.34%</span>
        </div>
        <span className="text-neutral-700">•</span>
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-400">BTCUSD</span>
          <span className="text-white font-semibold">62,650</span>
          <span className="text-[#00FF66] font-bold">+2.45%</span>
        </div>
        <span className="text-neutral-700">•</span>
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-400">EURUSD</span>
          <span className="text-white font-semibold">1.0865</span>
          <span className="text-neutral-400 font-bold">0.00%</span>
        </div>
        <span className="text-neutral-700">•</span>
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-400">US10Y</span>
          <span className="text-white font-semibold">3.89%</span>
          <span className="text-[#FF3B30] font-bold">-0.02</span>
        </div>
      </div>
    </header>
  );
};
