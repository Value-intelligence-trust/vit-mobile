import React, { useState } from 'react';

const SPORTS = [
  { value: 'football',          label: 'Football' },
  { value: 'basketball',        label: 'Basketball' },
  { value: 'rugby',             label: 'Rugby' },
  { value: 'tennis',            label: 'Tennis' },
  { value: 'american_football', label: 'NFL' },
];

export default function MatchInput({ onSubmit, loading }) {
  const [form, setForm] = useState({
    homeTeam: '', awayTeam: '', league: '',
    sport: 'football', homeOdds: '', drawOdds: '', awayOdds: '',
  });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const hasDraw = form.sport === 'football' || form.sport === 'rugby';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.homeTeam || !form.awayTeam) return;
    onSubmit({
      ...form,
      homeOdds: parseFloat(form.homeOdds) || 2.0,
      drawOdds: parseFloat(form.drawOdds) || 3.3,
      awayOdds: parseFloat(form.awayOdds) || 3.5,
    });
  };

  return (
    <form className="match-input" onSubmit={handleSubmit}>
      <h2>Match Prediction</h2>
      <div className="sport-selector">
        {SPORTS.map(s => (
          <button type="button" key={s.value}
                  className={"sport-btn" + (form.sport === s.value ? " active" : "")}
                  onClick={() => setForm(f => ({ ...f, sport: s.value }))}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="team-row">
        <input placeholder="Home team" value={form.homeTeam} onChange={set('homeTeam')} required />
        <span className="vs">vs</span>
        <input placeholder="Away team" value={form.awayTeam} onChange={set('awayTeam')} required />
      </div>
      <input placeholder="League (optional)" value={form.league} onChange={set('league')} />
      <div className="odds-row">
        <div className="odds-field">
          <label>Home</label>
          <input type="number" step="0.01" min="1" placeholder="2.00"
                 value={form.homeOdds} onChange={set('homeOdds')} />
        </div>
        {hasDraw && (
          <div className="odds-field">
            <label>Draw</label>
            <input type="number" step="0.01" min="1" placeholder="3.30"
                   value={form.drawOdds} onChange={set('drawOdds')} />
          </div>
        )}
        <div className="odds-field">
          <label>Away</label>
          <input type="number" step="0.01" min="1" placeholder="3.50"
                 value={form.awayOdds} onChange={set('awayOdds')} />
        </div>
      </div>
      <button type="submit" className="predict-btn" disabled={loading}>
        {loading ? 'Analysing...' : 'Get Prediction'}
      </button>
    </form>
  );
}