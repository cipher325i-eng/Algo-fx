import React from "react";
import { Home, ScanLine, Newspaper, Settings } from "lucide-react";
import { TabType } from "../types";

interface BottomNavigationBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isScanning?: boolean;
}

export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  currentTab,
  onSelectTab,
  isScanning = false,
}) => {
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-[#080a0d]/95 backdrop-blur-lg border-t border-[#1a212b] pb-safe pt-1">
      <div className="flex items-center justify-around px-2 py-1 max-w-md mx-auto relative">
        {/* Tab 1: HOME */}
        <button
          id="nav-tab-home"
          onClick={() => onSelectTab("home")}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 transition-all duration-200 ${
            currentTab === "home" ? "text-[#00FF66]" : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <div className="relative">
            <Home size={20} className={currentTab === "home" ? "drop-shadow-[0_0_8px_rgba(0,255,102,0.6)]" : ""} />
            {currentTab === "home" && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00FF66]" />
            )}
          </div>
          <span className="text-[10px] font-mono tracking-wider mt-1 font-semibold uppercase">
            Home
          </span>
        </button>

        {/* Tab 2: SCAN (Prominent glowing center button matching video) */}
        <button
          id="nav-tab-scan"
          onClick={() => onSelectTab("scan")}
          className="flex-1 flex flex-col items-center justify-center py-0.5 group"
        >
          <div
            className={`w-11 h-11 -mt-4 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              currentTab === "scan" || isScanning
                ? "bg-[#00FF66] text-black shadow-[0_0_20px_rgba(0,255,102,0.7)] scale-105"
                : "bg-[#111915] text-[#00FF66] border border-[#00FF66]/50 shadow-[0_0_10px_rgba(0,255,102,0.2)] hover:border-[#00FF66]"
            }`}
          >
            <ScanLine
              size={22}
              className={isScanning ? "animate-spin text-black" : ""}
            />
          </div>
          <span
            className={`text-[10px] font-mono tracking-wider mt-1 font-bold uppercase ${
              currentTab === "scan" ? "text-[#00FF66]" : "text-neutral-400"
            }`}
          >
            Scan
          </span>
        </button>

        {/* Tab 3: NEWS (Macro Events / Forecast) */}
        <button
          id="nav-tab-news"
          onClick={() => onSelectTab("news")}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 transition-all duration-200 ${
            currentTab === "news" ? "text-[#00FF66]" : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <div className="relative">
            <Newspaper size={20} className={currentTab === "news" ? "drop-shadow-[0_0_8px_rgba(0,255,102,0.6)]" : ""} />
            {currentTab === "news" && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00FF66]" />
            )}
          </div>
          <span className="text-[10px] font-mono tracking-wider mt-1 font-semibold uppercase">
            News
          </span>
        </button>

        {/* Tab 4: SETTINGS */}
        <button
          id="nav-tab-settings"
          onClick={() => onSelectTab("settings")}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 transition-all duration-200 ${
            currentTab === "settings" ? "text-[#00FF66]" : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <div className="relative">
            <Settings size={20} className={currentTab === "settings" ? "drop-shadow-[0_0_8px_rgba(0,255,102,0.6)]" : ""} />
            {currentTab === "settings" && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00FF66]" />
            )}
          </div>
          <span className="text-[10px] font-mono tracking-wider mt-1 font-semibold uppercase">
            Settings
          </span>
        </button>
      </div>

      {/* Android 15 Home Gesture Bar Indicator */}
      <div className="w-full flex justify-center pb-1 pt-0.5">
        <div className="w-32 h-1 rounded-full bg-neutral-600/80 hover:bg-neutral-400 transition-colors" />
      </div>
    </nav>
  );
};
