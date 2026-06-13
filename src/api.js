const BASE = import.meta.env.VITE_API_URL || 'https://vit-hmt1.onrender.com';

async function post(path, body) {
  const tg = window.Telegram?.WebApp;
  const headers = { 'Content-Type': 'application/json' };
  if (tg?.initData) headers['X-Telegram-Init-Data'] = tg.initData;
  const res = await fetch(BASE + path, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
async function get(path) {
  const res = await fetch(BASE + path);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const predict = ({ homeTeam, awayTeam, league, sport, homeOdds, drawOdds, awayOdds }) =>
  post('/api/predict', {
    home_team: homeTeam, away_team: awayTeam,
    league: league || 'premier_league',
    sport:  sport  || 'football',
    market_odds: { home: homeOdds, draw: drawOdds, away: awayOdds },
  });

export const getSystemStatus = () => get('/system/status');
export const getMatches = (sport = 'football') => get('/api/sports/fixtures?sport=' + sport + '&limit=20');