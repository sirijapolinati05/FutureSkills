import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Copy, Check } from 'lucide-react';
import { AffiliateConfig, PackageConfig, localDb } from '../../db/localDb';

export const AffiliateLink: React.FC = () => {
  const { user } = useAuth();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [packages, setPackages] = useState<PackageConfig[]>([]);
  const [affiliateConfig, setAffiliateConfig] = useState<AffiliateConfig>(localDb.getAffiliateConfig());

  useEffect(() => {
    setPackages(localDb.getPackages());
    setAffiliateConfig(localDb.getAffiliateConfig());
  }, []);

  const sponsor = user?.sponsorCode || 'AZ-2396';
  const baseUrl = affiliateConfig.baseUrl || 'https://skilltowealth.in/checkout';
  const affiliateItems = [
    { label: 'Sponsor Code', val: sponsor, key: 'sponsor' },
    { label: affiliateConfig.commonLinkLabel || 'Common Link', val: `${baseUrl}?ref=${sponsor}`, key: 'common' },
    ...packages.map((pkg) => ({
      label: pkg.name,
      val: `${baseUrl}?pkg=${pkg.id}&ref=${sponsor}`,
      key: pkg.id,
    })),
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
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Admin package and commission updates automatic ga ikkada reflect avutayi.</p>
      </div>

      <div className="card affiliate-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'white', borderRadius: '20px', boxShadow: '8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.85), inset 2px 2px 4px rgba(255,255,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.08)' }}>
        {affiliateItems.map((item, idx) => (
          <div key={item.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderBottom: idx === affiliateItems.length - 1 ? 'none' : '1px solid #f1f5f9', paddingBottom: idx === affiliateItems.length - 1 ? 0 : '1.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>{item.label}</span>
            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', alignItems: 'stretch' }}>
              <input type="text" value={item.val} readOnly style={{ flex: 1, minWidth: 0, padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#111827', fontSize: '0.9rem', boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.14), inset -4px -4px 8px rgba(255,255,255,0.92)' }} />
              <button onClick={() => handleCopy(item.val, item.key)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.8rem 1.25rem', background: copiedKey === item.key ? 'linear-gradient(145deg, #dcfce7, #bbf7d0)' : 'linear-gradient(145deg, #38bdf8, #1d4ed8)', color: 'white', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '12px', cursor: 'pointer', gap: '0.5rem', fontWeight: 600, minWidth: '96px' }}>
                {copiedKey === item.key ? <><Check size={16} color="#15803d" /><span style={{ color: '#166534' }}>Copied</span></> : <><Copy size={16} />Copy</>}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="affiliate-table-card">
        <div className="affiliate-table-card-header">
          <h3>Commission Chart</h3>
          <p>Direct package sales commission breakdown.</p>
        </div>
        <div className="affiliate-table-wrap">
          <table className="affiliate-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Price</th>
                <th>Active</th>
                <th>Passive</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>Rs.{row.price}</td>
                  <td>Rs.{row.activeCommission}</td>
                  <td>Rs.{row.passiveCommission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
              {affiliateConfig.upgradeRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.fromPackage} → {row.toPackage}</td>
                  <td>Rs.{row.price}</td>
                  <td>Rs.{row.active}</td>
                  <td>Rs.{row.passive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .affiliate-table-card { background: white; border-radius: 22px; box-shadow: 8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.85), inset 2px 2px 4px rgba(255,255,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.08); overflow: hidden; }
        .affiliate-table-card-header { padding: 1.5rem 1.6rem 1.1rem; border-bottom: 1px solid #f1f5f9; }
        .affiliate-table-card-header h3 { margin: 0; font-size: 1.45rem; color: #1e3a8a; }
        .affiliate-table-card-header p { margin: 0.35rem 0 0; font-size: 0.88rem; color: #64748b; }
        .affiliate-table-wrap { padding: 1.35rem; overflow-x: auto; }
        .affiliate-table { width: 100%; min-width: 780px; border-collapse: separate; border-spacing: 8px 12px; }
        .affiliate-table th { padding: 1rem; background: linear-gradient(180deg, #0284c7, #0369a1); color: white; font-weight: 800; text-transform: uppercase; text-align: center; border-radius: 16px; }
        .affiliate-table td { padding: 1.1rem 1rem; background: #f8fafc; color: #111827; font-weight: 500; border-radius: 18px; box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.15), inset -5px -5px 10px rgba(255, 255, 255, 0.95); text-align: center; }
      `}</style>
    </div>
  );
};

export default AffiliateLink;
