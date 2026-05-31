import React, { useEffect, useState } from 'react';
import { localDb } from '../../db/localDb';

export const ReportsManager: React.FC = () => {
  const [earningsJson, setEarningsJson] = useState('[]');
  const [payoutsJson, setPayoutsJson] = useState('[]');
  const [walletJson, setWalletJson] = useState('[]');

  useEffect(() => {
    const reports = localDb.getReports();
    setEarningsJson(JSON.stringify(reports.earningsRows, null, 2));
    setPayoutsJson(JSON.stringify(reports.payoutRows, null, 2));
    setWalletJson(JSON.stringify(reports.walletRows, null, 2));
  }, []);

  const saveReports = () => {
    try {
      localDb.saveReports({
        earningsRows: JSON.parse(earningsJson),
        payoutRows: JSON.parse(payoutsJson),
        walletRows: JSON.parse(walletJson),
      });
      alert('Reports data updated.');
    } catch {
      alert('Please keep valid JSON format in all three sections.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a' }}>Reports Manager</h2>
        <p style={{ fontSize: '0.9rem', color: '#475569' }}>Earnings, payout, wallet history tables ni backend data tho manage cheyyadaniki quick editor.</p>
      </div>

      <div className="admin-card" style={{ background: 'white', display: 'grid', gap: '1rem' }}>
        <label className="admin-form-group">
          <span className="admin-form-label">Earnings History JSON</span>
          <textarea className="admin-form-input" value={earningsJson} onChange={(e) => setEarningsJson(e.target.value)} style={{ minHeight: '220px', fontFamily: 'monospace' }} />
        </label>
        <label className="admin-form-group">
          <span className="admin-form-label">Payout History JSON</span>
          <textarea className="admin-form-input" value={payoutsJson} onChange={(e) => setPayoutsJson(e.target.value)} style={{ minHeight: '220px', fontFamily: 'monospace' }} />
        </label>
        <label className="admin-form-group">
          <span className="admin-form-label">Wallet History JSON</span>
          <textarea className="admin-form-input" value={walletJson} onChange={(e) => setWalletJson(e.target.value)} style={{ minHeight: '220px', fontFamily: 'monospace' }} />
        </label>
        <button className="admin-btn admin-btn-primary" onClick={saveReports}>Save Reports Data</button>
      </div>
    </div>
  );
};
