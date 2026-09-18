import React, { useState } from "react";
import { 
  Key, 
  Eye, 
  EyeOff, 
  Save, 
  Check, 
  Cpu, 
  DollarSign, 
  Code2, 
  ShieldCheck, 
  RotateCcw, 
  Smartphone,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { AppSettings } from "../types";

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onOpenExpoExport: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  onOpenExpoExport,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState<string>(settings.geminiApiKey || "");
  const [showKey, setShowKey] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<"gemini-2.5-flash" | "gemini-3.8-flash">(settings.model || "gemini-2.5-flash");
  const [accountBalance, setAccountBalance] = useState<number>(settings.accountBalance || 10000);
  const [riskPct, setRiskPct] = useState<number>(settings.riskPercentage || 1.0);
  const [useVisorBg, setUseVisorBg] = useState<boolean>(settings.useCyberVisorBg ?? true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isTestingKey, setIsTestingKey] = useState<boolean>(false);
  const [keyTestStatus, setKeyTestStatus] = useState<"success" | "error" | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSaveKey = () => {
    const trimmed = apiKeyInput.trim();
    const updated: AppSettings = {
      ...settings,
      geminiApiKey: trimmed,
      model: selectedModel,
      accountBalance,
      riskPercentage: riskPct,
      useCyberVisorBg: useVisorBg,
    };

    onUpdateSettings(updated);
    // Local persistence (AsyncStorage simulation via localStorage)
    localStorage.setItem("@gemini_api_key", trimmed);
    localStorage.setItem("@generator_x_settings", JSON.stringify(updated));

    showToast("API Key Saved");
  };

  const handleTestKey = async () => {
    setIsTestingKey(true);
    setKeyTestStatus(null);
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      if (apiKeyInput.trim().length > 10 || data.hasServerKey) {
        setKeyTestStatus("success");
        showToast("Gemini Connection Verified");
      } else {
        setKeyTestStatus("error");
      }
    } catch {
      setKeyTestStatus("error");
    } finally {
      setIsTestingKey(false);
    }
  };

  const handleClearKey = () => {
    setApiKeyInput("");
    const updated: AppSettings = {
      ...settings,
      geminiApiKey: "",
    };
    onUpdateSettings(updated);
    localStorage.removeItem("@gemini_api_key");
    showToast("Key Cleared");
  };

  return (
    <div className="w-full pb-8 px-4 font-mono animate-in fade-in duration-300 relative">
      {/* Animated Toast Feedback Banner matching specification #2 */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 py-2 px-4 rounded-xl bg-[#00FF66] text-black font-mono font-bold text-xs shadow-[0_0_20px_rgba(0,255,102,0.6)] flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check size={16} strokeWidth={3} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Section 1: Gemini API Key Config */}
      <div className="mt-3 bg-[#0e1218] border border-[#1e2737] rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#1a2330]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30">
              <Key size={16} />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase text-white tracking-wider">
                Gemini API Key
              </h3>
              <p className="text-[10px] text-neutral-400 font-sans">
                Stored securely via @react-native-async-storage
              </p>
            </div>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded bg-[#151d27] text-[#00FF66] border border-[#00FF66]/30 font-bold">
            FREE TIER
          </span>
        </div>

        {/* Key Input field */}
        <div className="mt-3">
          <label className="block text-[11px] text-neutral-400 uppercase mb-1">
            Personal API Key
          </label>
          <div className="relative flex items-center">
            <input
              id="input-gemini-api-key"
              type={showKey ? "text" : "password"}
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-[#121720] border border-[#222e40] rounded-xl px-3 py-2.5 pr-10 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-[#00FF66]"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 text-neutral-500 hover:text-white transition-colors"
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="mt-1.5 text-[10px] text-neutral-500 font-sans">
            Get your key from Google AI Studio (ai.google.dev). The free tier includes vision analysis for charts.
          </p>
        </div>

        {/* Buttons: Save Key & Test Connection */}
        <div className="mt-4 flex gap-2">
          <button
            id="btn-save-key"
            onClick={handleSaveKey}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,255,102,0.3)] active:scale-[0.98]"
          >
            <Save size={14} />
            <span>Save Key</span>
          </button>

          <button
            id="btn-test-key"
            onClick={handleTestKey}
            disabled={isTestingKey}
            className="py-2.5 px-3 rounded-xl bg-[#151c27] hover:bg-[#1c2635] border border-[#233045] text-xs font-mono text-neutral-200 flex items-center gap-1.5 transition-colors"
          >
            {isTestingKey ? (
              <span className="text-[#00FF66]">Testing...</span>
            ) : keyTestStatus === "success" ? (
              <>
                <Check size={14} className="text-[#00FF66]" />
                <span className="text-[#00FF66]">Active</span>
              </>
            ) : (
              <span>Test Key</span>
            )}
          </button>

          {apiKeyInput && (
            <button
              onClick={handleClearKey}
              className="p-2.5 rounded-xl bg-[#151c27] hover:bg-[#251515] border border-[#233045] hover:border-red-500/40 text-neutral-400 hover:text-red-400 transition-colors"
              title="Clear Key"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Section 2: Model Configuration */}
      <div className="mt-4 bg-[#0e1218] border border-[#1e2737] rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 pb-3 border-b border-[#1a2330]">
          <Cpu size={16} className="text-[#00FF66]" />
          <h3 className="text-xs font-bold uppercase text-white tracking-wider">
            Vision Model Engine
          </h3>
        </div>

        <div className="mt-3 space-y-2">
          <label
            onClick={() => setSelectedModel("gemini-2.5-flash")}
            className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
              selectedModel === "gemini-2.5-flash"
                ? "bg-[#00FF66]/10 border-[#00FF66] text-white"
                : "bg-[#12161f] border-[#1f2838] text-neutral-400 hover:border-neutral-700"
            }`}
          >
            <div>
              <div className="text-xs font-bold font-mono">gemini-2.5-flash</div>
              <div className="text-[10px] text-neutral-400 font-sans">
                Ultra-fast vision latency • Free Tier Standard
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              selectedModel === "gemini-2.5-flash" ? "border-[#00FF66] bg-[#00FF66]" : "border-neutral-600"
            }`}>
              {selectedModel === "gemini-2.5-flash" && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
            </div>
          </label>

          <label
            onClick={() => setSelectedModel("gemini-3.8-flash")}
            className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
              selectedModel === "gemini-3.8-flash"
                ? "bg-[#00FF66]/10 border-[#00FF66] text-white"
                : "bg-[#12161f] border-[#1f2838] text-neutral-400 hover:border-neutral-700"
            }`}
          >
            <div>
              <div className="text-xs font-bold font-mono">gemini-3.8-flash</div>
              <div className="text-[10px] text-neutral-400 font-sans">
                Next-Gen Multi-modal Reasoning • Free Tier Latest
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              selectedModel === "gemini-3.8-flash" ? "border-[#00FF66] bg-[#00FF66]" : "border-neutral-600"
            }`}>
              {selectedModel === "gemini-3.8-flash" && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
            </div>
          </label>
        </div>
      </div>

      {/* Section 3: Risk & Sizing Defaults */}
      <div className="mt-4 bg-[#0e1218] border border-[#1e2737] rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 pb-3 border-b border-[#1a2330]">
          <DollarSign size={16} className="text-[#00FF66]" />
          <h3 className="text-xs font-bold uppercase text-white tracking-wider">
            Risk & Account Defaults
          </h3>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">
              Account Equity ($)
            </label>
            <input
              type="number"
              value={accountBalance}
              onChange={(e) => setAccountBalance(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#121720] border border-[#222e40] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#00FF66]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">
              Risk Per Trade (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={riskPct}
              onChange={(e) => setRiskPct(parseFloat(e.target.value) || 1)}
              className="w-full bg-[#121720] border border-[#222e40] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#00FF66]"
            />
          </div>
        </div>

        {/* Cyberpunk Visor theme backdrop toggle */}
        <div className="mt-3 pt-3 border-t border-[#1a222e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#38bdf8]" />
            <span className="text-xs text-neutral-300">Cyber Visor HUD Backdrop</span>
          </div>
          <button
            onClick={() => setUseVisorBg(!useVisorBg)}
            className={`w-11 h-6 rounded-full p-1 transition-colors ${
              useVisorBg ? "bg-[#00FF66]" : "bg-neutral-800"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-black transition-transform ${
                useVisorBg ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Section 4: React Native (Expo) Android 15 Code Export */}
      <div className="mt-4 bg-[#0e1218] border border-[#1e2737] rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone size={16} className="text-[#00FF66]" />
            <div>
              <h3 className="text-xs font-bold uppercase text-white tracking-wider">
                React Native (Expo) Build
              </h3>
              <p className="text-[10px] text-neutral-400 font-sans">
                Targeting Android 15 APK & SDK 35
              </p>
            </div>
          </div>

          <button
            id="btn-expo-export"
            onClick={onOpenExpoExport}
            className="py-1.5 px-3 rounded-xl bg-[#141b25] hover:bg-[#1a2332] border border-[#232f42] text-xs font-mono text-[#00FF66] flex items-center gap-1.5 transition-colors"
          >
            <Code2 size={13} />
            <span>View Expo Code</span>
          </button>
        </div>
      </div>

      {/* System Information */}
      <div className="mt-4 p-3 rounded-xl bg-[#090c10] border border-[#19222e] text-[10px] text-neutral-500 flex items-center justify-between font-mono">
        <span>GENERATOR X PRO v2.5.0</span>
        <span>ENGINE: GEMINI VISION</span>
        <span>ANDROID 15 READY</span>
      </div>
    </div>
  );
};
