import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Copy, Check } from 'lucide-react';

export const AffiliateLink: React.FC = () => {
  const { user } = useAuth();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const sponsor = user?.sponsorCode || 'AZ-2396';
  const baseUrl = 'https://skilltowealth.in/checkout';

  const affiliateItems = [
    { label: 'Sponsor Code', val: sponsor, key: 'sponsor' },
    { label: 'Common Link', val: `${baseUrl}?ref=${sponsor}`, key: 'common' },
    { label: 'Classic Package', val: `${baseUrl}?pkg=1&ref=${sponsor}`, key: 'pkg1' },
    { label: 'Heroic Package', val: `${baseUrl}?pkg=2&ref=${sponsor}`, key: 'pkg2' },
    { label: 'Prime Package', val: `${baseUrl}?pkg=3&ref=${sponsor}`, key: 'pkg3' },
    { label: 'Crystal Package', val: `${baseUrl}?pkg=4&ref=${sponsor}`, key: 'pkg4' },
    { label: 'Platinum Package', val: `${baseUrl}?pkg=5&ref=${sponsor}`, key: 'pkg5' },
    { label: 'Premium Package', val: `${baseUrl}?pkg=6&ref=${sponsor}`, key: 'pkg6' },
  ];

  const commissionChart = [
    { packageName: 'Classic Package', price: '299', active: '240', passive: '24' },
    { packageName: 'Heroic Package', price: '549', active: '420', passive: '42' },
    { packageName: 'Prime Package', price: '1199', active: '900', passive: '90' },
    { packageName: 'Crystal Package', price: '2299', active: '1700', passive: '170' },
    { packageName: 'Platinum Package', price: '5499', active: '4200', passive: '420' },
    { packageName: 'Premium Package', price: '11999', active: '8000', passive: '800' },
  ];

  const upgradeChart = [
    { packageName: 'Classic Package - Heroic Package', price: '250', active: '180', passive: '18' },
    { packageName: 'Classic Package - Prime Package', price: '900', active: '630', passive: '63' },
    { packageName: 'Classic Package - Crystal Package', price: '2000', active: '1400', passive: '140' },
    { packageName: 'Classic Package - Platinum Package', price: '5200', active: '3640', passive: '364' },
    { packageName: 'Heroic Package - Prime Package', price: '650', active: '460', passive: '46' },
    { packageName: 'Heroic Package - Crystal Package', price: '1750', active: '1220', passive: '122' },
    { packageName: 'Heroic Package - Platinum Package', price: '4950', active: '3460', passive: '346' },
    { packageName: 'Prime Package - Crystal Package', price: '1100', active: '770', passive: '77' },
    { packageName: 'Prime Package - Platinum Package', price: '4300', active: '3000', passive: '300' },
    { packageName: 'Crystal Package - Platinum Package', price: '3200', active: '2240', passive: '224' },
    { packageName: 'Classic Package - Premium Package', price: '8190', active: '5320', passive: '532' },
    { packageName: 'Heroic Package - Premium Package', price: '8020', active: '5180', passive: '518' },
    { packageName: 'Prime Package - Premium Package', price: '10800', active: '7000', passive: '700' },
    { packageName: 'Crystal Package - Premium Package', price: '9700', active: '6300', passive: '630' },
    { packageName: 'Platinum Package - Premium Package', price: '6500', active: '4200', passive: '420' },
  ];

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Affiliate Link</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Share these referral links with your prospects to earn direct commissions on course enrollments.</p>
      </div>

      {/* Affiliate Links Section */}
      <div
        className="card affiliate-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          background: 'white',
          borderRadius: '20px',
          boxShadow: `8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.85), inset 2px 2px 4px rgba(255,255,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.08)`
        }}
      >
        {affiliateItems.map((item, idx) => {
          const isCode = item.key === 'sponsor';
          return (
            <div key={idx} className="affiliate-item" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              borderBottom: idx === affiliateItems.length - 1 ? 'none' : '1px solid #f1f5f9',
              paddingBottom: idx === affiliateItems.length - 1 ? 0 : '1.5rem'
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>{item.label}</span>
              
              <div className="affiliate-input-row" style={{ display: 'flex', gap: '0.5rem', width: '100%', alignItems: 'stretch' }}>
                <input
                  type="text"
                  value={item.val}
                  readOnly
                  className="affiliate-input"
                  style={{
                    flex: '1 1 auto',
                    minWidth: 0,
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    color: '#111827',
                    fontSize: '0.9rem',
                    fontFamily: isCode ? 'monospace' : 'inherit',
                    letterSpacing: isCode ? '1px' : 'normal',
                    fontWeight: isCode ? 700 : 500,
                    boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.14), inset -4px -4px 8px rgba(255,255,255,0.92)',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f0f9ff';
                    e.currentTarget.style.boxShadow = 'inset 5px 5px 10px rgba(0,0,0,0.15), inset -5px -5px 10px rgba(255,255,255,0.95)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.boxShadow = 'inset 4px 4px 8px rgba(0,0,0,0.14), inset -4px -4px 8px rgba(255,255,255,0.92)';
                  }}
                />
                
                <button
                  onClick={() => handleCopy(item.val, item.key)}
                  className="affiliate-copy-button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.8rem 1.25rem',
                    background: copiedKey === item.key ? 'linear-gradient(145deg, #dcfce7, #bbf7d0)' : 'linear-gradient(145deg, #38bdf8, #1d4ed8)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.22)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    gap: '0.5rem',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'all 0.25s ease',
                    minWidth: '96px',
                    flexShrink: 0,
                    boxShadow: copiedKey === item.key
                      ? '5px 5px 12px rgba(34,197,94,0.2), -4px -4px 10px rgba(255,255,255,0.85), inset 2px 2px 4px rgba(255,255,255,0.6)'
                      : '6px 6px 12px rgba(15,23,42,0.22), -4px -4px 10px rgba(255,255,255,0.18), inset 2px 2px 4px rgba(255,255,255,0.25)',
                    transform: 'translateY(-1px)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(2px)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                >
                  {copiedKey === item.key ? (
                    <>
                      <Check size={16} color="#15803d" />
                      <span style={{ color: '#166534' }}>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Commission Chart */}
      <div className="affiliate-table-card">
        <div className="affiliate-table-card-header">
          <h3>Commission Chart</h3>
          <p>Direct package sales commission breakdown.</p>
        </div>
        <div className="affiliate-table-wrap">
          <table className="affiliate-table affiliate-commission-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Price</th>
                <th>Active</th>
                <th>Passive</th>
              </tr>
            </thead>
            <tbody>
              {commissionChart.map((row) => (
                <tr key={row.packageName}>
                  <td>{row.packageName}</td>
                  <td>{row.price}</td>
                  <td>{row.active}</td>
                  <td>{row.passive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Commission Chart */}
      <div className="affiliate-table-card">
        <div className="affiliate-table-card-header">
          <h3>Upgrade Commission Chart</h3>
          <p>Package upgrade commission comparison table.</p>
        </div>
        <div className="affiliate-table-wrap">
          <table className="affiliate-table affiliate-upgrade-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Price</th>
                <th>Active</th>
                <th>Passive</th>
              </tr>
            </thead>
            <tbody>
              {upgradeChart.map((row) => (
                <tr key={row.packageName}>
                  <td>{row.packageName}</td>
                  <td>{row.price}</td>
                  <td>{row.active}</td>
                  <td>{row.passive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .affiliate-table-card {
          background: white;
          border-radius: 22px;
          box-shadow: 8px 8px 16px rgba(0,0,0,0.12), 
                      -8px -8px 16px rgba(255,255,255,0.85), 
                      inset 2px 2px 4px rgba(255,255,255,0.6), 
                      inset -2px -2px 4px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        .affiliate-table-card-header {
          padding: 1.5rem 1.6rem 1.1rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .affiliate-table-card-header h3 {
          margin: 0;
          font-size: 1.45rem;
          color: #1e3a8a;
        }

        .affiliate-table-card-header p {
          margin: 0.35rem 0 0;
          font-size: 0.88rem;
          color: #64748b;
        }

        .affiliate-table-wrap {
          padding: 1.35rem;
          overflow-x: auto;
          overflow-y: visible;
          max-height: none;
          /* Scrollbar Hide */
          -ms-overflow-style: none;      /* IE and Edge */
          scrollbar-width: none;         /* Firefox */
        }

        /* Chrome, Safari, Opera */
        .affiliate-table-wrap::-webkit-scrollbar {
          display: none;
        }

        .affiliate-table {
          width: 100%;
          min-width: 780px;           
          border-collapse: separate;
          border-spacing: 8px 12px;
        }

        .affiliate-table thead {
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .affiliate-table th {
          padding: 1rem 1rem;
          background: linear-gradient(180deg, #0284c7, #0369a1);
          color: white;
          font-weight: 800;
          text-transform: uppercase;
          text-align: center;
          position: sticky;
          top: 0;
          z-index: 11;
          border-radius: 16px;
          vertical-align: middle;
        }

        .affiliate-table td {
          padding: 1.1rem 1rem;
          background: #f8fafc;
          color: #111827;
          font-weight: 500;
          border-radius: 18px;
          box-shadow: 
            inset 5px 5px 10px rgba(0, 0, 0, 0.15), 
            inset -5px -5px 10px rgba(255, 255, 255, 0.95);
          transition: all 0.3s ease;
          text-align: center;
          vertical-align: middle;
        }

        .affiliate-table tbody tr:hover td {
          background: #f0f9ff;
          box-shadow:
            inset 5px 5px 10px rgba(0, 0, 0, 0.15),
            inset -5px -5px 10px rgba(255, 255, 255, 0.95);
        }

        /* Commission Table */
        .affiliate-commission-table th:nth-child(2),
        .affiliate-commission-table th:nth-child(3),
        .affiliate-commission-table th:nth-child(4),
        .affiliate-commission-table td:nth-child(2),
        .affiliate-commission-table td:nth-child(3),
        .affiliate-commission-table td:nth-child(4) {
          min-width: 90px;
          max-width: 110px;
        }

        /* Upgrade Table - Package Column */
        .affiliate-upgrade-table th:first-child,
        .affiliate-upgrade-table td:first-child {
          min-width: 260px;
          white-space: nowrap;
          overflow: visible;
          text-overflow: unset;
        }

        .affiliate-table thead th:first-child,
        .affiliate-table tbody td:first-child {
          border-top-left-radius: 18px;
          border-bottom-left-radius: 18px;
        }

        .affiliate-table thead th:last-child,
        .affiliate-table tbody td:last-child {
          border-top-right-radius: 18px;
          border-bottom-right-radius: 18px;
        }

        @media (max-width: 768px) {
          .affiliate-card {
            gap: 1.25rem !important;
          }

          .affiliate-item {
            padding-bottom: 1.25rem !important;
          }

          .affiliate-input-row {
            gap: 0.45rem !important;
          }

          .affiliate-input {
            padding: 0.8rem 0.85rem !important;
            font-size: 0.84rem !important;
          }

          .affiliate-copy-button {
            min-width: 84px !important;
            padding: 0.8rem 0.95rem !important;
          }

          .affiliate-table {
            min-width: 720px;
          }

          .affiliate-upgrade-table th:first-child,
          .affiliate-upgrade-table td:first-child {
            min-width: 240px;
          }
        }

        @media (max-width: 480px) {
          .affiliate-input-row {
            gap: 0.4rem !important;
          }

          .affiliate-input {
            padding: 0.78rem 0.75rem !important;
            font-size: 0.8rem !important;
          }

          .affiliate-copy-button {
            min-width: 76px !important;
            padding: 0.78rem 0.8rem !important;
            font-size: 0.78rem !important;
            gap: 0.35rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AffiliateLink;
