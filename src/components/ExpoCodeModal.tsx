import React, { useState } from "react";
import { X, Copy, Check, Smartphone, Terminal, FileCode, CheckCircle2 } from "lucide-react";

interface ExpoCodeModalProps {
  onClose: () => void;
}

export const ExpoCodeModal: React.FC<ExpoCodeModalProps> = ({ onClose }) => {
  const [activeCodeTab, setActiveCodeTab] = useState<"structure" | "appjs" | "packagejson">("appjs");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const projectStructureCode = `
# GENERATOR X PRO - REACT NATIVE (EXPO) ANDROID 15 PROJECT STRUCTURE
generator-x-mobile/
├── app.json                                 # Expo config with Android 15 edge-to-edge
├── package.json                             # Dependencies: expo, async-storage, image-picker
├── App.js                                   # Main Entry Point & Tab Navigator
└── src/
    ├── screens/
    │   ├── HomeScreen.js                    # Previous Scans & Winrate Stats
    │   ├── ScanScreen.js                    # ImagePicker & Gemini Vision Radar
    │   ├── NewsScreen.js                    # Economic Calendar & Macro Events
    │   └── SettingsScreen.js                # API Key Storage & Model Settings
    ├── components/
    │   ├── AnalysisCard.js                  # Custom Dynamic Analysis Card
    │   ├── PositionCalculatorModal.js       # Lot Sizing & Risk Engine
    │   └── AndroidHeader.js                 # Android 15 Status Header
    └── services/
        └── geminiVisionApi.js               # Gemini 2.5 Flash API Client
`.trim();

  const packageJsonCode = `{
  "name": "generator-x-pro",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~51.0.0",
    "expo-status-bar": "~1.12.1",
    "expo-image-picker": "~15.0.5",
    "@react-native-async-storage/async-storage": "1.23.1",
    "react": "18.2.0",
    "react-native": "0.74.1",
    "react-native-safe-area-context": "4.10.1",
    "lucide-react-native": "^0.394.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}`.trim();

  const runnableAppJsCode = `/**
 * GENERATOR X PRO SMART INTELLIGENCE
 * Production-ready React Native (Expo) Application Targeting Android 15
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
  ToastAndroid,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

// Color Palette
const COLORS = {
  bg: '#0D0D0D',
  card: '#12161F',
  border: '#1E2634',
  neonGreen: '#00FF66',
  neonRed: '#FF3B30',
  neonBlue: '#38BDF8',
  text: '#FFFFFF',
  subText: '#8E8E93',
};

export default function App() {
  const [currentTab, setCurrentTab] = useState('scan');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [radarStatus, setRadarStatus] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [showKeyModal, setShowKeyModal] = useState(false);

  // Load Saved API Key on Launch
  useEffect(() => {
    loadApiKey();
  }, []);

  const loadApiKey = async () => {
    try {
      const key = await AsyncStorage.getItem('@gemini_api_key');
      if (key) setGeminiApiKey(key);
    } catch (e) {
      console.log('Error loading key', e);
    }
  };

  const saveApiKey = async (keyToSave) => {
    try {
      await AsyncStorage.setItem('@gemini_api_key', keyToSave.trim());
      setGeminiApiKey(keyToSave.trim());
      if (Platform.OS === 'android') {
        ToastAndroid.show('API Key Saved', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'API Key Saved');
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to save API key');
    }
  };

  // Device Access: Pick Image from Android Storage / Gallery
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Storage access is required to analyze charts.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.9,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setSelectedImage(result.assets[0]);
      setAnalysisResult(null);
    }
  };

  // Scan Chart via Gemini Vision (gemini-2.5-flash)
  const handleScanChart = async () => {
    if (!geminiApiKey || geminiApiKey.trim().length === 0) {
      setShowKeyModal(true);
      return;
    }

    if (!selectedImage) {
      Alert.alert('Notice', 'Please select a chart screenshot first.');
      return;
    }

    setIsScanning(true);
    setRadarStatus('Reading chart frame...');

    try {
      // Dynamic radar logs
      setTimeout(() => setRadarStatus('Reading right edge (live price)...'), 600);
      setTimeout(() => setRadarStatus('Mapping accumulation (range or trendline)...'), 1200);
      setTimeout(() => setRadarStatus('Hunting micro liquidity sweeps...'), 1800);
      setTimeout(() => setRadarStatus('Tapping fair-value gap (FVG)...'), 2400);
      setTimeout(() => setRadarStatus('Grading setup with SMC rules...'), 3000);

      const base64Data = selectedImage.base64;
      const endpoint = \`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=\${geminiApiKey.trim()}\`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  inline_data: {
                    mime_type: 'image/jpeg',
                    data: base64Data,
                  },
                },
                {
                  text: 'Analyze this financial chart screenshot according to Smart Money Concepts (SMC).',
                },
              ],
            },
          ],
          system_instruction: {
            parts: [
              {
                text: 'You are a technical analysis engine. Analyze financial market charts (Forex, Crypto, Indices, Commodities). Evaluate Market Structure (SMC, FVG, Liquidity sweeps, Trend). Return your evaluation strictly as JSON using the enforced schema.',
              },
            ],
          },
          generationConfig: {
            response_mime_type: 'application/json',
            response_schema: {
              type: 'OBJECT',
              properties: {
                pair: { type: 'STRING' },
                timeframe: { type: 'STRING' },
                direction: { type: 'STRING', enum: ['BUY', 'SELL', 'NEUTRAL'] },
                confidence: { type: 'INTEGER' },
                strategy: { type: 'STRING' },
                entry_price: { type: 'STRING' },
                take_profit: { type: 'STRING' },
                stop_loss: { type: 'STRING' },
                confluences: {
                  type: 'ARRAY',
                  items: { type: 'STRING' },
                },
              },
              required: [
                'pair',
                'timeframe',
                'direction',
                'confidence',
                'strategy',
                'entry_price',
                'take_profit',
                'stop_loss',
                'confluences',
              ],
            },
          },
        }),
      });

      const json = await response.json();
      const rawText = json.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(rawText);

      const newResult = {
        ...parsed,
        id: String(Date.now()),
        timestamp: 'Just now',
        imageUri: selectedImage.uri,
      };

      setAnalysisResult(newResult);
      setHistory((prev) => [newResult, ...prev]);
    } catch (error) {
      Alert.alert('Scan Failed', error.message || 'Could not connect to Gemini API');
    } finally {
      setIsScanning(false);
      setRadarStatus('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GENERATOR X</Text>
        <Text style={styles.headerSubtitle}>PRO SMART INTELLIGENCE • ANDROID 15</Text>
      </View>

      {/* Screen Body */}
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {currentTab === 'scan' && (
          <View>
            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Text style={styles.uploadText}>📸 Tap to select screenshot from device storage</Text>
                  <Text style={styles.uploadSubtext}>PNG / JPG from Gallery</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
              onPress={handleScanChart}
              disabled={isScanning}
            >
              {isScanning ? (
                <ActivityIndicator color="#000000" />
              ) : (
                <Text style={styles.scanButtonText}>⚡ SCAN CHART</Text>
              )}
            </TouchableOpacity>

            {isScanning && (
              <View style={styles.radarBox}>
                <Text style={styles.radarText}>📡 {radarStatus}</Text>
              </View>
            )}

            {/* Custom Analysis Card Component */}
            {analysisResult && (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardPair}>{analysisResult.pair}</Text>
                    <Text style={styles.cardTimeframe}>{analysisResult.timeframe}</Text>
                  </View>
                  <View
                    style={[
                      styles.badge,
                      analysisResult.direction === 'BUY' ? styles.buyBadge : styles.sellBadge,
                    ]}
                  >
                    <Text style={styles.badgeText}>{analysisResult.direction}</Text>
                    <Text style={styles.badgeConfidence}> {analysisResult.confidence}%</Text>
                  </View>
                </View>

                <View style={styles.strategyBanner}>
                  <Text style={styles.strategyLabel}>STRATEGY</Text>
                  <Text style={styles.strategyValue}>{analysisResult.strategy}</Text>
                </View>

                <View style={styles.paramsGrid}>
                  <View style={styles.paramBox}>
                    <Text style={styles.paramLabel}>ENTRY</Text>
                    <Text style={styles.paramValue}>{analysisResult.entry_price}</Text>
                  </View>
                  <View style={styles.paramBox}>
                    <Text style={[styles.paramLabel, { color: COLORS.neonGreen }]}>TP</Text>
                    <Text style={[styles.paramValue, { color: COLORS.neonGreen }]}>
                      {analysisResult.take_profit}
                    </Text>
                  </View>
                  <View style={styles.paramBox}>
                    <Text style={[styles.paramLabel, { color: COLORS.neonRed }]}>SL</Text>
                    <Text style={[styles.paramValue, { color: COLORS.neonRed }]}>
                      {analysisResult.stop_loss}
                    </Text>
                  </View>
                </View>

                <View style={styles.confluencesSection}>
                  <Text style={styles.confluencesTitle}>CONFLUENCES & SMC STRUCTURE</Text>
                  {analysisResult.confluences?.map((c, i) => (
                    <Text key={i} style={styles.confluenceItem}>
                      • {c}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {currentTab === 'home' && (
          <View>
            <Text style={styles.sectionTitle}>Previous Chart Scans ({history.length})</Text>
            {history.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardPair}>{item.pair} • {item.direction}</Text>
                <Text style={styles.paramValue}>Entry: {item.entry_price} | TP: {item.take_profit}</Text>
              </View>
            ))}
          </View>
        )}

        {currentTab === 'settings' && (
          <View style={styles.card}>
            <Text style={styles.cardPair}>Gemini API Key</Text>
            <TextInput
              secureTextEntry
              value={geminiApiKey}
              onChangeText={setGeminiApiKey}
              placeholder="Paste AI Studio API Key..."
              placeholderTextColor="#666"
              style={styles.input}
            />
            <TouchableOpacity style={styles.scanButton} onPress={() => saveApiKey(geminiApiKey)}>
              <Text style={styles.scanButtonText}>SAVE KEY</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setCurrentTab('home')}>
          <Text style={[styles.navText, currentTab === 'home' && styles.navActive]}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentTab('scan')}>
          <Text style={[styles.navText, currentTab === 'scan' && styles.navActive]}>SCAN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentTab('settings')}>
          <Text style={[styles.navText, currentTab === 'settings' && styles.navActive]}>SETTINGS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerTitle: { color: COLORS.neonGreen, fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  headerSubtitle: { color: COLORS.subText, fontSize: 10, marginTop: 2 },
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  uploadBox: { height: 200, backgroundColor: COLORS.card, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  uploadPlaceholder: { alignItems: 'center' },
  uploadText: { color: COLORS.text, fontSize: 13, fontWeight: 'bold' },
  uploadSubtext: { color: COLORS.subText, fontSize: 11, marginTop: 4 },
  previewImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  scanButton: { backgroundColor: COLORS.neonGreen, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 14 },
  scanButtonDisabled: { opacity: 0.5 },
  scanButtonText: { color: '#000', fontWeight: 'bold', fontSize: 14, letterSpacing: 1 },
  radarBox: { marginTop: 12, padding: 10, backgroundColor: '#05140A', borderRadius: 8, borderWidth: 1, borderColor: COLORS.neonGreen },
  radarText: { color: COLORS.neonGreen, fontSize: 12, fontWeight: 'bold' },
  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, marginTop: 16, borderWidth: 1, borderColor: COLORS.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  cardPair: { color: COLORS.text, fontSize: 18, fontWeight: 'bold' },
  cardTimeframe: { color: COLORS.neonBlue, fontSize: 12, marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, flexDirection: 'row' },
  buyBadge: { backgroundColor: COLORS.neonGreen },
  sellBadge: { backgroundColor: COLORS.neonRed },
  badgeText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  badgeConfidence: { color: '#000', fontSize: 12 },
  strategyBanner: { marginTop: 12, backgroundColor: '#0B0F14', padding: 10, borderRadius: 8 },
  strategyLabel: { color: COLORS.subText, fontSize: 9, letterSpacing: 1 },
  strategyValue: { color: COLORS.text, fontSize: 13, fontWeight: 'bold', marginTop: 2 },
  paramsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  paramBox: { flex: 1, backgroundColor: '#0B0F14', padding: 10, borderRadius: 8, marginHorizontal: 3 },
  paramLabel: { color: COLORS.subText, fontSize: 9 },
  paramValue: { color: COLORS.text, fontSize: 14, fontWeight: 'bold', marginTop: 3 },
  confluencesSection: { marginTop: 14, paddingTop: 10, borderTopWidth: 1, borderTopColor: COLORS.border },
  confluencesTitle: { color: COLORS.subText, fontSize: 10, fontWeight: 'bold', letterSpacing: 1, marginBottom: 6 },
  confluenceItem: { color: COLORS.text, fontSize: 12, lineHeight: 18 },
  input: { backgroundColor: '#0B0F14', color: COLORS.text, padding: 12, borderRadius: 8, marginVertical: 12, borderWidth: 1, borderColor: COLORS.border },
  bottomNav: { height: 60, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: '#080808' },
  navText: { color: COLORS.subText, fontSize: 12, fontWeight: 'bold' },
  navActive: { color: COLORS.neonGreen },
});
`.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-[#0d1117] border border-[#232e40] rounded-2xl p-5 shadow-2xl text-white relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1f2838]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30">
              <Smartphone size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-white">
                REACT NATIVE (EXPO) ANDROID 15 CODEBASE
              </h3>
              <p className="text-[11px] text-neutral-400 font-mono">
                Production-ready React Native for Android 15 & Expo SDK 51
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

        {/* Tab selector */}
        <div className="flex items-center gap-2 mt-3 font-mono text-xs">
          <button
            onClick={() => setActiveCodeTab("appjs")}
            className={`py-1.5 px-3 rounded-lg border transition-colors flex items-center gap-1.5 ${
              activeCodeTab === "appjs"
                ? "bg-[#00FF66]/10 border-[#00FF66] text-[#00FF66] font-bold"
                : "bg-[#141a24] border-[#222e40] text-neutral-400 hover:text-white"
            }`}
          >
            <FileCode size={14} />
            <span>App.js (Full Runnable)</span>
          </button>

          <button
            onClick={() => setActiveCodeTab("structure")}
            className={`py-1.5 px-3 rounded-lg border transition-colors flex items-center gap-1.5 ${
              activeCodeTab === "structure"
                ? "bg-[#00FF66]/10 border-[#00FF66] text-[#00FF66] font-bold"
                : "bg-[#141a24] border-[#222e40] text-neutral-400 hover:text-white"
            }`}
          >
            <Terminal size={14} />
            <span>File Structure</span>
          </button>

          <button
            onClick={() => setActiveCodeTab("packagejson")}
            className={`py-1.5 px-3 rounded-lg border transition-colors flex items-center gap-1.5 ${
              activeCodeTab === "packagejson"
                ? "bg-[#00FF66]/10 border-[#00FF66] text-[#00FF66] font-bold"
                : "bg-[#141a24] border-[#222e40] text-neutral-400 hover:text-white"
            }`}
          >
            <FileCode size={14} />
            <span>package.json</span>
          </button>
        </div>

        {/* Code Content Box */}
        <div className="mt-3 relative flex-1 min-h-[350px] bg-[#07090d] border border-[#1b2330] rounded-xl overflow-hidden font-mono text-xs">
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={() => {
                const text =
                  activeCodeTab === "appjs"
                    ? runnableAppJsCode
                    : activeCodeTab === "structure"
                    ? projectStructureCode
                    : packageJsonCode;
                copyToClipboard(text, activeCodeTab);
              }}
              className="py-1.5 px-3 rounded-lg bg-[#141b25] hover:bg-[#1f2b3b] border border-[#2a374b] text-neutral-200 text-xs font-mono flex items-center gap-1.5 transition-colors shadow-lg"
            >
              {copied === activeCodeTab ? (
                <>
                  <Check size={13} className="text-[#00FF66]" />
                  <span className="text-[#00FF66]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-neutral-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 h-full overflow-y-auto text-neutral-300 leading-relaxed no-scrollbar select-all">
            {activeCodeTab === "appjs" && runnableAppJsCode}
            {activeCodeTab === "structure" && projectStructureCode}
            {activeCodeTab === "packagejson" && packageJsonCode}
          </pre>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-2.5 border-t border-[#1b2432] flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-[#00FF66]" />
            Includes @react-native-async-storage, expo-image-picker & gemini-2.5-flash
          </span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-lg bg-[#00FF66] text-black font-bold hover:bg-[#00e65c] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
