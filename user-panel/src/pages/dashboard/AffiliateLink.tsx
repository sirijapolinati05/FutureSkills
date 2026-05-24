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
              
              <div className="affiliate-input-row" style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={item.val}
                  readOnly
                  className="affiliate-input"
                  style={{
                    flex: 1,
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    color: '#334155',
                    fontSize: '0.9rem',
                    fontFamily: isCode ? 'monospace' : 'inherit',
                    letterSpacing: isCode ? '1px' : 'normal',
                    fontWeight: isCode ? 700 : 'normal',
                    boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.14), inset -4px -4px 8px rgba(255,255,255,0.92)',
                    outline: 'none'
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
                    boxShadow: copiedKey === item.key
                      ? '5px 5px 12px rgba(34,197,94,0.2), -4px -4px 10px rgba(255,255,255,0.85), inset 2px 2px 4px rgba(255,255,255,0.6)'
                      : '6px 6px 12px rgba(15,23,42,0.22), -4px -4px 10px rgba(255,255,255,0.18), inset 2px 2px 4px rgba(255,255,255,0.25)',
                    transform: 'translateY(-1px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(2px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
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

      <style>{`
        @media (max-width: 768px) {
          .affiliate-card {
            padding: 1.15rem !important;
            border-radius: 16px !important;
            gap: 1.15rem !important;
          }

          .affiliate-item {
            padding-bottom: 1.1rem !important;
          }

          .affiliate-input-row {
            flex-direction: row;
            align-items: stretch;
            gap: 0.55rem !important;
          }

          .affiliate-input {
            width: 100%;
            min-width: 0;
            font-size: 0.82rem !important;
            line-height: 1.45;
            padding: 0.8rem 0.9rem !important;
          }

          .affiliate-copy-button {
            width: auto;
            min-width: 82px !important;
            flex-shrink: 0;
            padding: 0.8rem 0.95rem !important;
            font-size: 0.82rem !important;
          }
        }
      `}</style>
    </div>
  );
};
