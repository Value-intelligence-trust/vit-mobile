import React, { useState, useEffect, useCallback } from 'react';
import MatchInput from './components/MatchInput.jsx';
import PredictionCard from './components/PredictionCard.jsx';
import StatsBar from './components/StatsBar.jsx';
import { predict, getSystemStatus } from './api.js';
import './styles.css';

const tg = window.Telegram?.WebApp;

export default function App() {
  const [tab, setTab] = useState('predict');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    tg?.ready(); tg?.expand(); tg?.setHeaderColor('#0a0a0f');
    getSystemStatus().then(setStats).catch(() => {});
  }, []);

  const handlePredict = useCallback(async (form) => {
    setLoading(true); setError(''); setPrediction(null);
    try {
      const result = await predict(form);
      setPrediction(result);
      tg?.HapticFeedback?.impactOccurred('medium');
    } catch (e) {
      setError(e.message || 'Prediction failed');
      tg?.HapticFeedback?.notificationOccurred('error');
    } finally {
      setLoading(false);
    }
  }, []);

  const TABS = [['predict','🎯 Predict'],['history','📊 History'],['wallet','💎 Wallet']];

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">VIT Network</div>
        {stats && <StatsBar stats={stats} />}
      </header>
      <nav className="tabs">
        {TABS.map(([t, label]) => (
          <button key={t} className={"tab" + (tab === t ? " active" : "")} onClick={() => setTab(t)}>
            {label}
          </button>
        ))}
      </nav>
      <main className="main">
        {tab === 'predict' && (
          <>
            <MatchInput onSubmit={handlePredict} loading={loading} />
            {error && <div className="error-banner">{error}</div>}
            {prediction && <PredictionCard prediction={prediction} />}
          </>
        )}
        {tab === 'history' && <div className="placeholder"><span>📊</span><p>History coming soon</p></div>}
        {tab === 'wallet'  && <div className="placeholder"><span>💎</span><p>VIT Wallet — connect your account</p></div>}
      </main>
    </div>
  );
}