import React, { useState, useEffect } from "react";
import { 
  AndroidStatusHeader 
} from "./components/AndroidStatusHeader";
import { 
  BottomNavigationBar 
} from "./components/BottomNavigationBar";
import { 
  HomeScreen 
} from "./components/HomeScreen";
import { 
  ScanScreen 
} from "./components/ScanScreen";
import { 
  NewsScreen 
} from "./components/NewsScreen";
import { 
  SettingsScreen 
} from "./components/SettingsScreen";
import { 
  PositionSizeModal 
} from "./components/PositionSizeModal";
import { 
  ExpoCodeModal 
} from "./components/ExpoCodeModal";
import { 
  TabType, 
  ChartAnalysisResult, 
  AppSettings 
} from "./types";
import { 
  INITIAL_SCAN_HISTORY 
} from "./data/sampleData";
import { 
  Smartphone, 
  Monitor, 
  Sparkles, 
  Cpu 
} from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>("scan");
  const [history, setHistory] = useState<ChartAnalysisResult[]>(() => {
    const saved = localStorage.getItem("@generator_x_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SCAN_HISTORY;
      }
    }
    return INITIAL_SCAN_HISTORY;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem("@generator_x_settings");
    const savedKey = localStorage.getItem("@gemini_api_key");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (savedKey) parsed.geminiApiKey = savedKey;
        return parsed;
      } catch {
        // ignore
      }
    }
    return {
      geminiApiKey: savedKey || "",
      model: "gemini-2.5-flash",
      accountBalance: 10000,
      riskPercentage: 1.0,
      soundEffects: true,
      useCyberVisorBg: true,
    };
  });

  const [activeCalculatorData, setActiveCalculatorData] = useState<ChartAnalysisResult | null>(null);
  const [showExpoExportModal, setShowExpoExportModal] = useState<boolean>(false);
  const [deviceFrameMode, setDeviceFrameMode] = useState<"phone" | "fluid">("phone");

  // Save history on change
  const handleSaveScanToHistory = (newResult: ChartAnalysisResult) => {
    setHistory((prev) => {
      const updated = [newResult, ...prev];
      localStorage.setItem("@generator_x_history", JSON.stringify(updated.slice(0, 30)));
      return updated;
    });
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  return (
    <div className="min-h-screen w-full bg-[#050709] text-white flex flex-col items-center justify-start relative overflow-x-hidden font-sans select-none">
      {/* Dynamic Cyberpunk HUD Background Canvas (inspired by download (3).jpeg) */}
      {settings.useCyberVisorBg && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-35">
          {/* Neon Grid Lines */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#00FF660a_1px,transparent_1px),linear-gradient(to_bottom,#00FF660a_1px,transparent_1px)] bg-[size:32px_32px]" 
          />
          {/* Cybernetic Visor Blue/Green Ambient Light Cones */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#00FF66]/15 blur-[120px]" />
          <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#0088ff]/15 blur-[140px]" />
          <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-[#00FF66]/10 blur-[130px]" />
        </div>
      )}

      {/* Desktop Top Control Bar (allows toggling Android 15 frame or fluid full-width view) */}
      <div className="w-full max-w-4xl px-4 py-2 hidden sm:flex items-center justify-between text-xs font-mono text-neutral-400 z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
          <span className="text-white font-bold">GENERATOR X</span>
          <span className="text-neutral-500">•</span>
          <span>Android 15 Expo Framework</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceFrameMode("phone")}
            className={`px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1.5 ${
              deviceFrameMode === "phone"
                ? "bg-[#00FF66]/10 border-[#00FF66] text-[#00FF66] font-bold"
                : "bg-[#11161f] border-[#1d2634] text-neutral-400 hover:text-white"
            }`}
          >
            <Smartphone size={13} />
            <span>Mobile Frame</span>
          </button>

          <button
            onClick={() => setDeviceFrameMode("fluid")}
            className={`px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1.5 ${
              deviceFrameMode === "fluid"
                ? "bg-[#00FF66]/10 border-[#00FF66] text-[#00FF66] font-bold"
                : "bg-[#11161f] border-[#1d2634] text-neutral-400 hover:text-white"
            }`}
          >
            <Monitor size={13} />
            <span>Full Width</span>
          </button>

          <button
            onClick={() => setShowExpoExportModal(true)}
            className="px-2.5 py-1 rounded-lg bg-[#141d27] hover:bg-[#1e2a39] border border-[#26374d] text-neutral-200 transition-colors flex items-center gap-1.5"
          >
            <Cpu size={13} className="text-[#00FF66]" />
            <span>Expo Code</span>
          </button>
        </div>
      </div>

      {/* Main Container - Authentic Android 15 Mobile Wrapper or Full Width */}
      <main
        className={`w-full relative z-10 transition-all duration-300 ${
          deviceFrameMode === "phone"
            ? "max-w-[440px] my-0 sm:my-4 sm:rounded-[40px] sm:border-[8px] sm:border-[#1c222c] sm:shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(0,255,102,0.1)] overflow-hidden bg-[#0a0d12]"
            : "max-w-2xl bg-[#0a0d12] min-h-screen"
        }`}
      >
        {/* Android 15 Top Bezel & Status Bar Header */}
        <AndroidStatusHeader />

        {/* Dynamic Screen Content */}
        <div className="min-h-[calc(100vh-140px)] sm:min-h-[700px] flex flex-col justify-between">
          <div>
            {currentTab === "home" && (
              <HomeScreen
                history={history}
                onNavigateToScan={() => setCurrentTab("scan")}
                onOpenCalculator={(data) => setActiveCalculatorData(data)}
              />
            )}

            {currentTab === "scan" && (
              <ScanScreen
                settings={settings}
                onNavigateToSettings={() => setCurrentTab("settings")}
                onSaveScanToHistory={handleSaveScanToHistory}
                onOpenCalculator={(data) => setActiveCalculatorData(data)}
              />
            )}

            {currentTab === "news" && <NewsScreen />}

            {currentTab === "settings" && (
              <SettingsScreen
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                onOpenExpoExport={() => setShowExpoExportModal(true)}
              />
            )}
          </div>
        </div>

        {/* Android 15 Bottom Tab Navigation Bar */}
        <BottomNavigationBar
          currentTab={currentTab}
          onSelectTab={(t) => setCurrentTab(t)}
          isScanning={false}
        />
      </main>

      {/* Interactive Position Size Modal */}
      {activeCalculatorData && (
        <PositionSizeModal
          data={activeCalculatorData}
          defaultAccountSize={settings.accountBalance}
          defaultRiskPct={settings.riskPercentage}
          onClose={() => setActiveCalculatorData(null)}
        />
      )}

      {/* React Native Expo Code Export Modal */}
      {showExpoExportModal && (
        <ExpoCodeModal onClose={() => setShowExpoExportModal(false)} />
      )}
    </div>
  );
}
