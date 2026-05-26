import React from 'react';
import { BadgeCheck } from 'lucide-react';

type ReportMode = 'earnings' | 'payouts' | 'wallet';

type EarningsRow = {
  date: string;
  from: string;
  amount: number;
  type: 'Active' | 'Passive';
  status: string;
};

type PayoutRow = {
  requestedDate: string;
  sentDate: string;
  amount: number;
  tdsAmount: number;
  status: string;
};

type WalletRow = {
  date: string;
  existingAmount: number;
  updatedAmount: number;
  finalBalance: number;
  type: 'Credit' | 'Debit';
  description: string;
};

const earningsRows: EarningsRow[] = [
  { date: '16-05-2026', from: 'Manasa', amount: 77, type: 'Passive', status: 'Verified' },
  { date: '11-05-2026', from: 'Sreerangam meenakumari', amount: 62, type: 'Passive', status: 'Verified' },
  { date: '04-05-2026', from: 'Hima sai', amount: 17, type: 'Passive', status: 'Verified' },
  { date: '03-05-2026', from: 'M.Raghuram', amount: 1200, type: 'Active', status: 'Verified' },
  { date: '30-04-2026', from: 'Manasa', amount: 170, type: 'Passive', status: 'Verified' },
  { date: '25-04-2026', from: 'Kantharao', amount: 420, type: 'Active', status: 'Verified' },
  { date: '23-04-2026', from: 'G Sudhakar', amount: 1700, type: 'Active', status: 'Verified' },
  { date: '14-04-2026', from: 'Hima sai', amount: 24, type: 'Passive', status: 'Verified' },
  { date: '09-04-2026', from: 'Hima sai', amount: 42, type: 'Passive', status: 'Verified' },
  { date: '07-04-2026', from: 'Hima sai', amount: 24, type: 'Passive', status: 'Verified' },
];

const payoutRows: PayoutRow[] = [
  { requestedDate: '01-05-2025', sentDate: '02-05-2025', amount: 9000, tdsAmount: 0, status: 'Paid' },
  { requestedDate: '05-05-2025', sentDate: '06-05-2025', amount: 500, tdsAmount: 0, status: 'Paid' },
  { requestedDate: '06-05-2025', sentDate: '07-05-2025', amount: 500, tdsAmount: 0, status: 'Paid' },
  { requestedDate: '12-05-2025', sentDate: '12-05-2025', amount: 1100, tdsAmount: 0, status: 'Paid' },
  { requestedDate: '21-05-2025', sentDate: '21-05-2025', amount: 1300, tdsAmount: 0, status: 'Paid' },
  { requestedDate: '21-05-2025', sentDate: '22-05-2025', amount: 1000, tdsAmount: 0, status: 'Paid' },
  { requestedDate: '30-05-2025', sentDate: '30-05-2025', amount: 2100, tdsAmount: 0, status: 'Paid' },
  { requestedDate: '27-06-2025', sentDate: '27-06-2025', amount: 23000, tdsAmount: 0, status: 'Paid' },
  { requestedDate: '10-07-2025', sentDate: '11-07-2025', amount: 1500, tdsAmount: 0, status: 'Paid' },
  { requestedDate: '14-07-2025', sentDate: '14-07-2025', amount: 2500, tdsAmount: 0, status: 'Paid' },
];

const walletRows: WalletRow[] = [
  { date: '16-05-2026', existingAmount: 249, updatedAmount: 77, finalBalance: 326, type: 'Credit', description: 'Passive Commission Add - TXN-1778922897iHLD' },
  { date: '11-05-2026', existingAmount: 187, updatedAmount: 62, finalBalance: 249, type: 'Credit', description: 'Passive Commission Add - TXN-YaU01778489198bRpx' },
  { date: '05-05-2026', existingAmount: 1387, updatedAmount: 1176, finalBalance: 187, type: 'Debit', description: 'Withdrawal request submitted' },
  { date: '04-05-2026', existingAmount: 1370, updatedAmount: 17, finalBalance: 1387, type: 'Credit', description: 'Passive Commission Add - TXN-W6fw1777917548Qc23' },
  { date: '03-05-2026', existingAmount: 170, updatedAmount: 1200, finalBalance: 1370, type: 'Credit', description: 'Active Commission Add - TXN-I7QU1777803989GIV1' },
  { date: '30-04-2026', existingAmount: 0, updatedAmount: 170, finalBalance: 170, type: 'Credit', description: 'Passive Commission Add - TXN-i2Z31777550322XxfQ' },
  { date: '27-04-2026', existingAmount: 1623, updatedAmount: 1591, finalBalance: 0, type: 'Debit', description: 'Withdrawal request submitted' },
  { date: '25-04-2026', existingAmount: 1203, updatedAmount: 420, finalBalance: 1623, type: 'Credit', description: 'Active Commission Add - TXN-IjBC177709075141mS' },
  { date: '24-04-2026', existingAmount: 2103, updatedAmount: 882, finalBalance: 1203, type: 'Debit', description: 'Withdrawal request submitted' },
  { date: '23-04-2026', existingAmount: 403, updatedAmount: 1700, finalBalance: 2103, type: 'Credit', description: 'Active Commission Add - TXN-of8G1776948839iyIT' },
];

const reportMeta: Record<ReportMode, { title: string; tableClass: string }> = {
  earnings: { title: 'My Earnings', tableClass: 'report-table report-earnings-table' },
  payouts: { title: 'My Payouts', tableClass: 'report-table report-payout-table' },
  wallet: { title: 'My Wallet History', tableClass: 'report-table report-wallet-table' },
};

const StatusPill: React.FC<{ label: string; tone: 'green' | 'red' }> = ({ label, tone }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.45rem 0.85rem',
      borderRadius: '999px',
      fontSize: '0.78rem',
      fontWeight: 700,
      color: 'white',
      background: tone === 'green' ? 'linear-gradient(145deg, #22c55e, #16a34a)' : 'linear-gradient(145deg, #ef4444, #dc2626)',
      boxShadow:
        '0 6px 12px -8px rgba(15,23,42,0.35), inset 2px 2px 4px rgba(255,255,255,0.32), inset -2px -3px 5px rgba(15,23,42,0.18)',
      transform: 'translateY(-1px)',
    }}
  >
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
      <button
        key={`${item}-${index}`}
        type="button"
        className={`report-page-button${index === 1 ? ' active' : ''}`}
      >
        {item}
      </button>
    ))}
  </div>
);

export const ReportsView: React.FC<{ mode: ReportMode }> = ({ mode }) => {
  const meta = reportMeta[mode];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e3a5f', margin: 0 }}>
          {meta.title}
        </h2>
      </div>

      <div className="report-shell">
        <div className="report-table-wrap">
          {mode === 'earnings' && (
            <table className={meta.tableClass}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>From</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {earningsRows.map((row) => (
                  <tr key={`${row.date}-${row.from}`}>
                    <td>{row.date}</td>
                    <td>{row.from}</td>
                    <td>{row.amount}</td>
                    <td>
                      <StatusPill label={row.type} tone={row.type === 'Active' ? 'green' : 'red'} />
                    </td>
                    <td>
                      <VerifiedBadge label={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {mode === 'payouts' && (
            <table className={meta.tableClass}>
              <thead>
                <tr>
                  <th>Requested Date</th>
                  <th>Sent Date</th>
                  <th>Amount</th>
                  <th>TDS Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payoutRows.map((row) => (
                  <tr key={`${row.requestedDate}-${row.amount}`}>
                    <td>{row.requestedDate}</td>
                    <td>{row.sentDate}</td>
                    <td>{row.amount}</td>
                    <td>{row.tdsAmount}</td>
                    <td>
                      <StatusPill label={row.status} tone="green" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {mode === 'wallet' && (
            <table className={meta.tableClass}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Existing Amount</th>
                  <th>Updated Amount</th>
                  <th>Final Balance</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {walletRows.map((row) => (
                  <tr key={`${row.date}-${row.description}`}>
                    <td>{row.date}</td>
                    <td>{row.existingAmount}</td>
                    <td>{row.updatedAmount}</td>
                    <td>{row.finalBalance}</td>
                    <td>
                      <StatusPill label={row.type} tone={row.type === 'Credit' ? 'green' : 'red'} />
                    </td>
                    <td>{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {mode === 'earnings' && <Pager items={['«', '1', '2', '3', '…', '282', '»']} />}
        {mode === 'payouts' && <Pager items={['«', '1', '2', '3', '4', '5', '»']} />}
        {mode === 'wallet' && <Pager items={['39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65']} />}
      </div>

      <style>{`
        .report-shell {
          background: white;
          border-radius: 22px;
          box-shadow: 8px 8px 16px rgba(0,0,0,0.12),
                      -8px -8px 16px rgba(255,255,255,0.85),
                      inset 2px 2px 4px rgba(255,255,255,0.6),
                      inset -2px -2px 4px rgba(0,0,0,0.08);
          padding: 1.35rem 1.45rem 1rem;
          overflow: hidden;
        }

        .report-table-wrap {
          overflow-x: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .report-table-wrap::-webkit-scrollbar {
          display: none;
        }

        .report-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 8px 12px;
          min-width: 900px;
        }

        .report-table th {
          background: linear-gradient(180deg, #0284c7, #0369a1);
          color: white;
          text-transform: uppercase;
          font-size: 0.82rem;
          font-weight: 800;
          text-align: left;
          padding: 1rem 1.2rem;
          border: none;
          border-radius: 16px;
        }

        .report-table td {
          padding: 1rem 1.15rem;
          border: none;
          font-size: 0.95rem;
          color: #0f172a;
          background: #f8fafc;
          border-radius: 18px;
          box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.12),
                      inset -5px -5px 10px rgba(255, 255, 255, 0.92);
          vertical-align: middle;
        }

        .report-table tbody tr:hover td {
          background: #f0f9ff;
        }

        .report-wallet-table {
          min-width: 1280px;
        }

        .report-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0;
          margin-top: 1rem;
        }

        .report-page-button {
          min-width: 42px;
          height: 42px;
          padding: 0 0.8rem;
          border: 1px solid #d7dee8;
          background: linear-gradient(145deg, #ffffff, #eff6ff);
          color: #2563eb;
          font-size: 0.92rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 4px 4px 8px rgba(15,23,42,0.12),
                      -4px -4px 8px rgba(255,255,255,0.88),
                      inset 2px 2px 4px rgba(255,255,255,0.78),
                      inset -2px -2px 4px rgba(148,163,184,0.12);
          transition: all 0.25s ease;
          transform: translateY(-1px);
        }

        .report-page-button.active {
          background: linear-gradient(145deg, #2563eb, #1d4ed8);
          color: white;
          border-color: #2563eb;
          box-shadow: 6px 6px 12px rgba(29,78,216,0.28),
                      -4px -4px 8px rgba(255,255,255,0.35),
                      inset 2px 2px 4px rgba(255,255,255,0.28),
                      inset -2px -3px 5px rgba(15,23,42,0.16);
        }

        .report-page-button:hover {
          transform: translateY(-3px);
          box-shadow: 6px 6px 12px rgba(15,23,42,0.16),
                      -6px -6px 12px rgba(255,255,255,0.92),
                      inset 2px 2px 4px rgba(255,255,255,0.82);
        }

        .report-verified-wrap {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          color: #27496d;
          font-weight: 600;
        }

        .report-verified-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4ade80, #16a34a);
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.22),
                      inset 0 3px 6px rgba(255,255,255,0.85),
                      inset 0 -3px 6px rgba(0,0,0,0.2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .report-shell {
            padding: 1rem;
          }

          .report-table th,
          .report-table td {
            padding: 0.85rem 0.95rem;
            font-size: 0.84rem;
          }

          .report-table {
            border-spacing: 6px 10px;
          }

          .report-page-button {
            min-width: 38px;
            height: 38px;
            font-size: 0.84rem;
          }
        }
      `}</style>
    </div>
  );
};
