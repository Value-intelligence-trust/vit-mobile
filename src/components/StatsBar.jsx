import React from 'react';
export default function StatsBar({ stats }) {
  if (!stats) return null;
  return (
    <div className="stats-bar">
      <div className="stat"><span>{stats.total_users || 0}</span><label>Users</label></div>
      <div className="stat"><span>{stats.total_predictions || 0}</span><label>Preds</label></div>
      <div className="stat"><span>{stats.active_validators || 0}</span><label>Nodes</label></div>
    </div>
  );
}