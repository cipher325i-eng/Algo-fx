export type TradeDirection = "BUY" | "SELL" | "NEUTRAL";

export interface ChartAnalysisResult {
  id: string;
  timestamp: string;
  pair: string;
  timeframe: string;
  direction: TradeDirection;
  confidence: number;
  strategy: string;
  entry_price: string;
  take_profit: string;
  stop_loss: string;
  confluences: string[];
  setup_grade?: string;
  phase?: "ACCUMULATION" | "MANIPULATION" | "DISTRIBUTION" | "EXPANSION" | string;
  macro_bias?: string;
  market_structure?: string;
  risk_reward_ratio?: string;
  summary_notes?: string;
  imagePreview?: string;
}

export type EventImpact = "HIGH" | "MEDIUM" | "MINOR";

export interface EconomicEvent {
  id: string;
  title: string;
  currency: string;
  impact: EventImpact;
  time: string;
  timeOffsetMinutes: number;
  date: string;
  forecast: string;
  previous: string;
  actual: string | null;
  description: string;
  affectedPairs: string[];
}

export interface AppSettings {
  geminiApiKey: string;
  model: "gemini-2.5-flash" | "gemini-3.8-flash";
  accountBalance: number;
  riskPercentage: number;
  soundEffects: boolean;
  useCyberVisorBg: boolean;
}

export type TabType = "home" | "scan" | "news" | "settings";
