import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { localDb } from '../../../db/localDb';

type ReportMode = 'earnings' | 'payouts' | 'wallet';

const reportMeta: Record<ReportMode, { title: string }> = {
  earnings: { title: 'My Earnings' },
  payouts: { title: 'My Payouts' },
  wallet: { title: 'My Wallet History' },
};

const StatusPill: React.FC<{ label: string; tone: 'green' | 'red' }> = ({ label, tone }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.45rem 0.85rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, color: 'white', background: tone === 'green' ? 'linear-gradient(145deg, #22c55e, #16a34a)' : 'linear-gradient(145deg, #ef4444, #dc2626)', boxShadow: '0 6px 12px -8px rgba(15,23,42,0.35), inset 2px 2px 4px rgba(255,255,255,0.32), inset -2px -3px 5px rgba(15,23,42,0.18)' }}>
    {label}
  </span>
);

const VerifiedBadge: React.FC<{ label: string }> = ({ label }) => (
  <span className="report-verified-wrap">
    <span>{label}</span>
    <span className="report-verified-icon">
      <BadgeCheck size={16} color="white" strokeWidth={3} />
    </span>
  </span>
);

const Pager: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="report-pagination">
    {items.map((item, index) => (
      <button key={`${item}-${index}`} type="button" className={`report-page-button${index === 1 ? ' active' : ''}`}>
        {item}
      </button>
    ))}
  </div>
);

export const ReportsView: React.FC<{ mode: ReportMode }> = ({ mode }) => {
  const meta = reportMeta[mode];
  const reports = localDb.getReports();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e3a5f', margin: 0 }}>{meta.title}</h2>
      </div>

      <div className="report-shell">
        <div className="report-table-wrap">
          {mode === 'earnings' && (
            <table className="report-table">
              <thead><tr><th>Date</th><th>From</th><th>Amount</th><th>Type</th><th>Status</th></tr></thead>
              <tbody>
                {reports.earningsRows.map((row) => (
                  <tr key={`${row.date}-${row.from}`}>
                    <td>{row.date}</td>
                    <td>{row.from}</td>
                    <td>{row.amount}</td>
                    <td><StatusPill label={row.type} tone={row.type === 'Active' ? 'green' : 'red'} /></td>
                    <td><VerifiedBadge label={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {mode === 'payouts' && (
            <table className="report-table">
              <thead><tr><th>Requested Date</th><th>Sent Date</th><th>Amount</th><th>TDS Amount</th><th>Status</th></tr></thead>
              <tbody>
                {reports.payoutRows.map((row) => (
                  <tr key={`${row.requestedDate}-${row.amount}`}>
                    <td>{row.requestedDate}</td>
                    <td>{row.sentDate}</td>
                    <td>{row.amount}</td>
                    <td>{row.tdsAmount}</td>
                    <td><StatusPill label={row.status} tone="green" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {mode === 'wallet' && (
            <table className="report-table report-wallet-table">
              <thead><tr><th>Date</th><th>Existing Amount</th><th>Updated Amount</th><th>Final Balance</th><th>Type</th><th>Description</th></tr></thead>
              <tbody>
                {reports.walletRows.map((row) => (
                  <tr key={`${row.date}-${row.description}`}>
                    <td>{row.date}</td>
                    <td>{row.existingAmount}</td>
                    <td>{row.updatedAmount}</td>
                    <td>{row.finalBalance}</td>
                    <td><StatusPill label={row.type} tone={row.type === 'Credit' ? 'green' : 'red'} /></td>
                    <td>{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {mode === 'earnings' && <Pager items={['«', '1', '2', '3', '…', '282', '»']} />}
        {mode === 'payouts' && <Pager items={['«', '1', '2', '3', '4', '5', '»']} />}
        {mode === 'wallet' && <Pager items={['39', '40', '41', '42', '43', '44', '45', '46']} />}
      </div>

      <style>{`
        .report-shell { background: white; border-radius: 22px; box-shadow: 8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.85), inset 2px 2px 4px rgba(255,255,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.08); padding: 1.35rem 1.45rem 1rem; overflow: hidden; }
        .report-table-wrap { overflow-x: auto; }
        .report-table { width: 100%; border-collapse: separate; border-spacing: 8px 12px; min-width: 900px; }
        .report-table th { background: linear-gradient(180deg, #0284c7, #0369a1); color: white; text-transform: uppercase; font-size: 0.82rem; font-weight: 800; text-align: left; padding: 1rem 1.2rem; border-radius: 16px; }
        .report-table td { padding: 1rem 1.15rem; font-size: 0.95rem; color: #0f172a; background: #f8fafc; border-radius: 18px; box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.12), inset -5px -5px 10px rgba(255, 255, 255, 0.92); vertical-align: middle; }
        .report-wallet-table { min-width: 1280px; }
        .report-pagination { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 0; margin-top: 1rem; }
        .report-page-button { min-width: 42px; height: 42px; padding: 0 0.8rem; border: 1px solid #d7dee8; background: linear-gradient(145deg, #ffffff, #eff6ff); color: #2563eb; font-size: 0.92rem; font-weight: 700; box-shadow: 4px 4px 8px rgba(15,23,42,0.12), -4px -4px 8px rgba(255,255,255,0.88), inset 2px 2px 4px rgba(255,255,255,0.78), inset -2px -2px 4px rgba(148,163,184,0.12); }
        .report-page-button.active { background: linear-gradient(145deg, #2563eb, #1d4ed8); color: white; border-color: #2563eb; }
        .report-verified-wrap { display: inline-flex; align-items: center; gap: 0.55rem; color: #27496d; font-weight: 600; }
        .report-verified-icon { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #4ade80, #16a34a); border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.22), inset 0 3px 6px rgba(255,255,255,0.85), inset 0 -3px 6px rgba(0,0,0,0.2); display: inline-flex; align-items: center; justify-content: center; }
      `}</style>
    </div>
  );
};
