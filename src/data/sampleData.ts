import { ChartAnalysisResult, EconomicEvent } from "../types";

// Realistic Chart SVG Data URLs for one-click testing
export function generateCandlestickChartSvg(
  pair: string,
  timeframe: string,
  trend: "bullish" | "bearish" | "ranging",
  fvgLevel: string
): string {
  const isBull = trend === "bullish";
  const green = "#00FF66";
  const red = "#FF3B30";
  const bg = "#0d0f12";

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400" style="background:${bg};font-family:sans-serif;">
    <!-- Grid -->
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f242c" stroke-width="0.75"/>
      </pattern>
      <linearGradient id="fvgGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${green}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="${green}" stop-opacity="0.05"/>
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#grid)"/>

    <!-- Header info inside chart (like MetaTrader / TradingView) -->
    <rect x="15" y="15" width="220" height="45" rx="6" fill="#14181e" opacity="0.9" stroke="#2a323d" stroke-width="1"/>
    <text x="25" y="36" fill="#ffffff" font-size="14" font-weight="bold">${pair} • ${timeframe}</text>
    <text x="25" y="52" fill="#8E8E93" font-size="11">ICT / SMC Engine • Generator X</text>
    
    <!-- Price scale right side -->
    <line x1="530" y1="0" x2="530" y2="400" stroke="#2a323d" stroke-width="1"/>
    <text x="540" y="80" fill="#6c7787" font-size="10">2,410.50</text>
    <text x="540" y="140" fill="#6c7787" font-size="10">2,398.00</text>
    <text x="540" y="200" fill="#6c7787" font-size="10">2,385.20</text>
    <text x="540" y="260" fill="#6c7787" font-size="10">2,374.80</text>
    <text x="540" y="320" fill="#6c7787" font-size="10">2,362.10</text>

    <!-- FVG Highlight Box -->
    <rect x="220" y="180" width="230" height="45" fill="url(#fvgGrad)" stroke="${green}" stroke-dasharray="3,3" stroke-width="1"/>
    <text x="230" y="195" fill="${green}" font-size="10" font-weight="bold">+FVG (Fair Value Gap) [${fvgLevel}]</text>

    <!-- Candlesticks series -->
    <!-- Bar 1 -->
    <line x1="60" y1="210" x2="60" y2="280" stroke="${red}" stroke-width="1.5"/>
    <rect x="54" y="230" width="12" height="35" fill="${red}"/>

    <!-- Bar 2 -->
    <line x1="90" y1="235" x2="90" y2="295" stroke="${red}" stroke-width="1.5"/>
    <rect x="84" y="245" width="12" height="40" fill="${red}"/>

    <!-- Bar 3 - Liquidity Sweep Wick -->
    <line x1="120" y1="270" x2="120" y2="345" stroke="${green}" stroke-width="2"/>
    <rect x="114" y="280" width="12" height="25" fill="${green}"/>
    <text x="95" y="365" fill="#f59e0b" font-size="9" font-weight="bold">⚡ LIQ SWEEP</text>
    <circle cx="120" cy="345" r="3" fill="#f59e0b"/>

    <!-- Bar 4 - Strong Displacement -->
    <line x1="150" y1="210" x2="150" y2="285" stroke="${green}" stroke-width="1.5"/>
    <rect x="144" y="220" width="12" height="60" fill="${green}"/>

    <!-- Bar 5 - Displacement continuation -->
    <line x1="180" y1="160" x2="180" y2="230" stroke="${green}" stroke-width="1.5"/>
    <rect x="174" y="170" width="12" height="50" fill="${green}"/>
    <text x="160" y="150" fill="#38bdf8" font-size="9">CHoCH ↑</text>

    <!-- Bar 6 - Small pullback into FVG -->
    <line x1="210" y1="170" x2="210" y2="215" stroke="${red}" stroke-width="1.5"/>
    <rect x="204" y="180" width="12" height="20" fill="${red}"/>

    <!-- Bar 7 -->
    <line x1="240" y1="185" x2="240" y2="225" stroke="${red}" stroke-width="1.5"/>
    <rect x="234" y="195" width="12" height="22" fill="${red}"/>

    <!-- Bar 8 - Tap of FVG & Bounce -->
    <line x1="270" y1="190" x2="270" y2="230" stroke="${green}" stroke-width="1.5"/>
    <rect x="264" y="198" width="12" height="15" fill="${green}"/>

    <!-- Bar 9 - Expansion candle -->
    <line x1="300" y1="140" x2="300" y2="205" stroke="${green}" stroke-width="1.5"/>
    <rect x="294" y="150" width="12" height="48" fill="${green}"/>

    <!-- Bar 10 -->
    <line x1="330" y1="125" x2="330" y2="175" stroke="${green}" stroke-width="1.5"/>
    <rect x="324" y="130" width="12" height="35" fill="${green}"/>

    <!-- Bar 11 -->
    <line x1="360" y1="130" x2="360" y2="165" stroke="${red}" stroke-width="1.5"/>
    <rect x="354" y="135" width="12" height="20" fill="${red}"/>

    <!-- Bar 12 -->
    <line x1="390" y1="110" x2="390" y2="155" stroke="${green}" stroke-width="1.5"/>
    <rect x="384" y="115" width="12" height="30" fill="${green}"/>

    <!-- Bar 13 (Latest price right edge) -->
    <line x1="420" y1="95" x2="420" y2="135" stroke="${green}" stroke-width="1.5"/>
    <rect x="414" y="100" width="12" height="25" fill="${green}"/>

    <!-- Live price horizontal dotted line -->
    <line x1="0" y1="105" x2="530" y2="105" stroke="${green}" stroke-dasharray="4,4" stroke-width="1.2"/>
    <rect x="530" y="95" width="65" height="20" fill="${green}" rx="3"/>
    <text x="535" y="109" fill="#000000" font-size="10" font-weight="bold">2,402.35</text>

    <!-- Watermark / HUD branding -->
    <text x="20" y="380" fill="#2d3748" font-size="11" font-family="monospace">GENERATOR X PRO SMART INTELLIGENCE • LIVE VISION RADAR</text>
  </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_CHARTS = [
  {
    id: "sample-gold",
    pair: "XAUUSD (Gold)",
    timeframe: "M5",
    description: "Asian Range Sweep + M1 MSS + Bullish FVG Mitigation",
    dataUrl: generateCandlestickChartSvg("XAUUSD", "M5", "bullish", "2382.40 - 2386.10"),
    presetResult: {
      pair: "XAUUSD",
      timeframe: "M5",
      direction: "BUY" as const,
      confidence: 91,
      strategy: "Generator X PO3 (M1 micro / M5-M15 macro)",
      entry_price: "2384.50",
      take_profit: "2412.00",
      stop_loss: "2375.80",
      confluences: [
        "Asian Session low cleanly swept with rejection wick",
        "M1 Market Structure Shift (MSS) with aggressive displacement",
        "M5 Bullish Fair Value Gap (+FVG) tapped and respected",
        "Higher Timeframe Daily Order Flow aligned with Bullish Bias",
        "Relative Equal Highs (BSL) resting at 2412.00 as liquidity magnet"
      ],
      setup_grade: "7/7 A+ Setup",
      phase: "EXPANSION",
      macro_bias: "BULLISH ORDERFLOW",
      market_structure: "Bearish failure swing turned Bullish BOS after SSL sweep",
      risk_reward_ratio: "1:3.16",
      summary_notes: "High-probability long execution. Clean manipulation phase completed below Asian low. Target buy-side liquidity above prior day high."
    }
  },
  {
    id: "sample-nas100",
    pair: "NAS100 (Nasdaq)",
    timeframe: "H1",
    description: "NY Open Judas Swing into Bearish 1H Breaker Block",
    dataUrl: generateCandlestickChartSvg("NAS100", "H1", "bearish", "19,840 - 19,880"),
    presetResult: {
      pair: "NAS100",
      timeframe: "H1",
      direction: "SELL" as const,
      confidence: 86,
      strategy: "Institutional Liquidity Purge & Breaker Mitigation",
      entry_price: "19,820.00",
      take_profit: "19,550.00",
      stop_loss: "19,910.00",
      confluences: [
        "Buy-Side Liquidity purged at session open (Judas Swing)",
        "Failure to close above key psychological 19,900 level",
        "Bearish Breaker Block reclaimed on H1 candle close",
        "Heavy volume selling delta on institutional tape",
        "Discount Fair Value Gap remaining unfilled below at 19,550"
      ],
      setup_grade: "6/7 High Probability",
      phase: "DISTRIBUTION",
      macro_bias: "BEARISH REVERSAL",
      market_structure: "Bearish CHoCH on H1 after multi-day expansion high",
      risk_reward_ratio: "1:3.00",
      summary_notes: "Clear liquidity grab above previous session high. Enter on retest of breaker block with stops safely above the newly formed swing high."
    }
  },
  {
    id: "sample-btcusd",
    pair: "BTCUSD (Bitcoin)",
    timeframe: "M15",
    description: "Weekend Consolidation Sweep & Discount PO3 Launch",
    dataUrl: generateCandlestickChartSvg("BTCUSD", "M15", "bullish", "62,400 - 62,750"),
    presetResult: {
      pair: "BTCUSD",
      timeframe: "M15",
      direction: "BUY" as const,
      confidence: 88,
      strategy: "ICT SMT Divergence & Order Block Rejection",
      entry_price: "62,650.00",
      take_profit: "65,200.00",
      stop_loss: "61,850.00",
      confluences: [
        "SMT Divergence with ETHUSD on swing lows",
        "Clean sweep of internal sell-side liquidity at 62,200",
        "Bullish Order Block formed with 3x volume expansion",
        "4H Market Structure remaining steadfastly bullish",
        "Imbalance fill completed at 50% equilibrium level"
      ],
      setup_grade: "6/7 Tier 1 Execution",
      phase: "MANIPULATION_COMPLETE",
      macro_bias: "BULLISH EXPANSION",
      market_structure: "Internal BOS confirming continuation of 4H trend",
      risk_reward_ratio: "1:3.18",
      summary_notes: "Strong institutional accumulation evident during low-volume hours. Ready for impulsive leg toward major range highs."
    }
  }
];

export const INITIAL_SCAN_HISTORY: ChartAnalysisResult[] = [
  {
    id: "scan-hist-1",
    timestamp: "10 mins ago",
    pair: "XAUUSD",
    timeframe: "M5",
    direction: "BUY",
    confidence: 92,
    strategy: "Generator X PO3 (M1 micro / M5-M15 macro)",
    entry_price: "2384.50",
    take_profit: "2412.00",
    stop_loss: "2375.80",
    confluences: [
      "Asian Session low cleanly swept with rejection wick",
      "M1 Market Structure Shift with aggressive displacement",
      "M5 Bullish Fair Value Gap tapped and respected",
      "Higher Timeframe Daily Order Flow aligned with Bullish Bias"
    ],
    setup_grade: "7/7 A+ Setup",
    phase: "EXPANSION",
    macro_bias: "BULLISH ORDERFLOW",
    market_structure: "Bearish failure swing turned Bullish BOS after SSL sweep",
    risk_reward_ratio: "1:3.16",
    summary_notes: "High-probability long execution targeting buy-side liquidity above prior day high.",
    imagePreview: generateCandlestickChartSvg("XAUUSD", "M5", "bullish", "2382.40 - 2386.10")
  },
  {
    id: "scan-hist-2",
    timestamp: "2 hours ago",
    pair: "NAS100",
    timeframe: "H1",
    direction: "SELL",
    confidence: 84,
    strategy: "Institutional Liquidity Purge & Breaker Mitigation",
    entry_price: "19,820.00",
    take_profit: "19,550.00",
    stop_loss: "19,910.00",
    confluences: [
      "Buy-Side Liquidity purged at session open (Judas Swing)",
      "Bearish Breaker Block reclaimed on H1 candle close",
      "Discount Fair Value Gap remaining unfilled below at 19,550"
    ],
    setup_grade: "6/7 High Probability",
    phase: "DISTRIBUTION",
    macro_bias: "BEARISH REVERSAL",
    market_structure: "Bearish CHoCH on H1 after multi-day expansion high",
    risk_reward_ratio: "1:3.00",
    summary_notes: "Targeting liquidity pool resting below 19,600 session lows.",
    imagePreview: generateCandlestickChartSvg("NAS100", "H1", "bearish", "19,840 - 19,880")
  },
  {
    id: "scan-hist-3",
    timestamp: "Yesterday",
    pair: "EURUSD",
    timeframe: "M15",
    direction: "NEUTRAL",
    confidence: 48,
    strategy: "Consolidation Range Boundary (Wait for Judas)",
    entry_price: "1.08650",
    take_profit: "1.09200",
    stop_loss: "1.08380",
    confluences: [
      "Trapped inside 25-pip tight Asian consolidation",
      "Equal highs and equal lows on both sides (indecision)",
      "High impact US NFP release approaching in 2 hours"
    ],
    setup_grade: "3/7 Wait For Clear Sweep",
    phase: "ACCUMULATION",
    macro_bias: "NEUTRAL / PRE-RELEASE",
    market_structure: "Sideways range. Stand aside until London/NY sweep unfolds.",
    risk_reward_ratio: "1:2.04",
    summary_notes: "Low tradeability setup. Await NY session liquidity injection before taking directional risk."
  }
];

export const INITIAL_ECONOMIC_EVENTS: EconomicEvent[] = [
  {
    id: "ev-1",
    title: "US Non-Farm Payrolls (NFP)",
    currency: "USD",
    impact: "HIGH",
    time: "13:30 UTC",
    timeOffsetMinutes: 45,
    date: "Today",
    forecast: "185K",
    previous: "142K",
    actual: null,
    description: "Measures change in number of employed people during previous month excluding farming.",
    affectedPairs: ["EURUSD", "GBPUSD", "XAUUSD", "NAS100", "USDJPY"]
  },
  {
    id: "ev-2",
    title: "US Unemployment Rate",
    currency: "USD",
    impact: "HIGH",
    time: "13:30 UTC",
    timeOffsetMinutes: 45,
    date: "Today",
    forecast: "4.1%",
    previous: "4.2%",
    actual: null,
    description: "Percentage of total work force that is unemployed and actively seeking employment.",
    affectedPairs: ["EURUSD", "XAUUSD", "US30"]
  },
  {
    id: "ev-3",
    title: "Fed Chair Powell Speaks",
    currency: "USD",
    impact: "HIGH",
    time: "15:00 UTC",
    timeOffsetMinutes: 135,
    date: "Today",
    forecast: "-",
    previous: "-",
    actual: null,
    description: "Federal Reserve monetary policy guidance, interest rate outlook, and liquidity commentary.",
    affectedPairs: ["ALL USD", "XAUUSD", "BTCUSD", "NAS100"]
  },
  {
    id: "ev-4",
    title: "ECB Monetary Policy Statement",
    currency: "EUR",
    impact: "HIGH",
    time: "12:15 UTC",
    timeOffsetMinutes: -30,
    date: "Today",
    forecast: "3.50%",
    previous: "3.75%",
    actual: "3.50%",
    description: "European Central Bank interest rate announcement and refinancing rate decision.",
    affectedPairs: ["EURUSD", "EURGBP", "EURJPY"]
  },
  {
    id: "ev-5",
    title: "UK GDP MoM",
    currency: "GBP",
    impact: "MEDIUM",
    time: "07:00 UTC",
    timeOffsetMinutes: -360,
    date: "Today",
    forecast: "0.2%",
    previous: "0.0%",
    actual: "0.2%",
    description: "Change in the total inflation-adjusted value of goods and services produced.",
    affectedPairs: ["GBPUSD", "GBPJPY"]
  },
  {
    id: "ev-6",
    title: "US ISM Services PMI",
    currency: "USD",
    impact: "MEDIUM",
    time: "14:00 UTC",
    timeOffsetMinutes: 75,
    date: "Today",
    forecast: "51.5",
    previous: "51.4",
    actual: null,
    description: "Level of a diffusion index based on surveyed purchasing managers in the service sector.",
    affectedPairs: ["XAUUSD", "NAS100", "US30"]
  },
  {
    id: "ev-7",
    title: "Tokyo Core CPI YoY",
    currency: "JPY",
    impact: "MINOR",
    time: "23:30 UTC",
    timeOffsetMinutes: 645,
    date: "Tomorrow",
    forecast: "2.4%",
    previous: "2.5%",
    actual: null,
    description: "Price change of goods and services excluding fresh food in Tokyo area.",
    affectedPairs: ["USDJPY", "GBPJPY"]
  }
];
