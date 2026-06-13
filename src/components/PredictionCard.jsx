import React from 'react';

function Bar({ label, pct, color }) {
  return (
    <div className="prob-bar">
      <span className="prob-label">{label}</span>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: (pct * 100) + '%', background: color }} />
      </div>
      <span className="prob-value">{(pct * 100).toFixed(1)}%</span>
    </div>
  );
}

export default function PredictionCard({ prediction }) {
  if (!prediction) return null;
  const {
    home_prob: hp = 0, draw_prob: dp = 0, away_prob: ap = 0,
    confidence: c = 0, bet_side, edge = 0,
    over_25_prob, btts_prob, model_insights = [],
  } = prediction;

  const conf = c * 100;
  const grade = conf >= 80 ? 'EXCELLENT' : conf >= 65 ? 'GOOD' : conf >= 50 ? 'FAIR' : 'POOR';
  const side = bet_side || (hp > dp && hp > ap ? 'home' : dp > ap ? 'draw' : 'away');

  return (
    <div className="prediction-card">
      <div className="card-header">
        <span className="confidence-badge">{conf.toFixed(1)}% confidence</span>
        <span className="grade">{grade}</span>
      </div>
      <div className="probs">
        <Bar label="Home" pct={hp} color="#3b82f6" />
        {dp > 0.01 && <Bar label="Draw" pct={dp} color="#6b7280" />}
        <Bar label="Away" pct={ap} color="#ef4444" />
      </div>
      <div className="bet-recommendation">
        <div className="bet-label">Recommended Bet</div>
        <div className="bet-side">{side.toUpperCase()}</div>
        {edge > 0 && <div className="bet-edge">+{(edge * 100).toFixed(1)}% edge</div>}
      </div>
      {over_25_prob && (
        <div className="markets-row">
          <div className="market">
            <div className="market-label">Over/Under 2.5</div>
            <div className="market-value">
              {over_25_prob > 0.5 ? 'OVER' : 'UNDER'} {(Math.max(over_25_prob, 1 - over_25_prob) * 100).toFixed(0)}%
            </div>
          </div>
          <div className="market">
            <div className="market-label">BTTS</div>
            <div className="market-value">
              {btts_prob > 0.5 ? 'YES' : 'NO'} {(Math.max(btts_prob, 1 - btts_prob) * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      )}
      {model_insights.length > 0 && (
        <details className="model-breakdown">
          <summary>Model Breakdown ({model_insights.length} models)</summary>
          <div className="breakdown-list">
            {model_insights.slice(0, 6).map((m, i) => (
              <div key={i} className="breakdown-row">
                <span className="model-name">{m.model_name}</span>
                <span className="model-probs">
                  H:{(m.home_prob * 100).toFixed(0)} D:{(m.draw_prob * 100).toFixed(0)} A:{(m.away_prob * 100).toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}