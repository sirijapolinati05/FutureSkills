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
    { label: 'Starter Package', val: `${baseUrl}?pkg=1&ref=${sponsor}`, key: 'pkg1' },
    { label: 'Advanced Package', val: `${baseUrl}?pkg=2&ref=${sponsor}`, key: 'pkg2' },
    { label: 'Pro Package', val: `${baseUrl}?pkg=3&ref=${sponsor}`, key: 'pkg3' },
    { label: 'Elite Package', val: `${baseUrl}?pkg=4&ref=${sponsor}`, key: 'pkg4' },
    { label: 'Premium Package', val: `${baseUrl}?pkg=5&ref=${sponsor}`, key: 'pkg5' },
  ];

  const commissionChart = [
    { packageName: 'Starter Package', price: '299', active: '240', passive: '24' },
    { packageName: 'Advanced Package', price: '599', active: '450', passive: '45' },
    { packageName: 'Pro Package', price: '899', active: '650', passive: '65' },
    { packageName: 'Elite Package', price: '1299', active: '950', passive: '95' },
    { packageName: 'Premium Package', price: '3999', active: '2800', passive: '280' },
  ];

  const upgradeChart = [
    { packageName: 'Starter → Advanced', price: '300', active: '210', passive: '21' },
    { packageName: 'Starter → Pro', price: '600', active: '420', passive: '42' },
    { packageName: 'Starter → Elite', price: '1000', active: '700', passive: '70' },
    { packageName: 'Starter → Premium', price: '3700', active: '2560', passive: '256' },
    { packageName: 'Advanced → Pro', price: '300', active: '210', passive: '21' },
    { packageName: 'Advanced → Elite', price: '700', active: '490', passive: '49' },
    { packageName: 'Advanced → Premium', price: '3400', active: '2380', passive: '238' },
    { packageName: 'Pro → Elite', price: '400', active: '280', passive: '28' },
    { packageName: 'Pro → Premium', price: '3100', active: '2170', passive: '217' },
    { packageName: 'Elite → Premium', price: '2700', active: '1890', passive: '189' },
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

      {/* Commission Chart - Only 5 Packages */}
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
                  <td>₹{row.price}</td>
                  <td>₹{row.active}</td>
                  <td>₹{row.passive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Commission Chart - Only 5 Packages */}
      <div className="affiliate-table-card">
        <div className="affiliate-table-card-header">
          <h3>Upgrade Commission Chart</h3>
          <p>Package upgrade commission comparison.</p>
        </div>
        <div className="affiliate-table-wrap">
          <table className="affiliate-table affiliate-upgrade-table">
            <thead>
              <tr>
                <th>Upgrade From → To</th>
                <th>Price</th>
                <th>Active</th>
                <th>Passive</th>
              </tr>
            </thead>
            <tbody>
              {upgradeChart.map((row) => (
                <tr key={row.packageName}>
                  <td>{row.packageName}</td>
                  <td>₹{row.price}</td>
                  <td>₹{row.active}</td>
                  <td>₹{row.passive}</td>
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
          color: '#64748b';
        }

        .affiliate-table-wrap {
          padding: 1.35rem;
          overflow-x: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .affiliate-table-wrap::-webkit-scrollbar {
          display: none;
        }

        .affiliate-table {
          width: 100%;
          min-width: 780px;           
          border-collapse: separate;
          border-spacing: 8px 12px;
        }

        .affiliate-table th {
          padding: 1rem 1rem;
          background: linear-gradient(180deg, #0284c7, #0369a1);
          color: white;
          font-weight: 800;
          text-transform: uppercase;
          text-align: center;
          border-radius: 16px;
        }

        .affiliate-table td {
          padding: 1.1rem 1rem;
          background: #f8fafc;
          color: #111827;
          font-weight: 500;
          border-radius: 18px;
          box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.15), 
                      inset -5px -5px 10px rgba(255, 255, 255, 0.95);
          text-align: center;
        }

        .affiliate-table tbody tr:hover td {
          background: #f0f9ff;
        }

        .affiliate-upgrade-table th:first-child,
        .affiliate-upgrade-table td:first-child {
          min-width: 240px;
          text-align: left;
        }

        @media (max-width: 768px) {
          .affiliate-table {
            min-width: 680px;
          }
        }
      `}</style>
    </div>
  );
};

export default AffiliateLink;
