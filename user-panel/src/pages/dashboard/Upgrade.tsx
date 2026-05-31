import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PackageConfig, localDb } from '../../db/localDb';
import { getDashboardImage } from '../../lib/dashboardAssets';

export const Upgrade: React.FC = () => {
  const { user } = useAuth();
  const [packages, setPackages] = useState<PackageConfig[]>([]);
  const currentPackage = user?.packageName || 'Classic Package';

  useEffect(() => {
    setPackages(localDb.getPackages());
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Upgrade Package</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Current Plan: <strong style={{ color: '#0ea5e9' }}>{currentPackage}</strong></p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.2rem' }}>
        {packages.map((pkg) => {
          const isCurrent = currentPackage === pkg.name;

          return (
            <div key={pkg.id} className="card" style={{ display: 'flex', flexDirection: 'column', border: isCurrent ? '3px solid #0ea5e9' : '1px solid #e2e8f0', borderRadius: '18px', background: 'white', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.12)', position: 'relative', height: '100%' }}>
              <div style={{ height: '190px', overflow: 'hidden', background: '#f8fafc', borderRadius: '18px 18px 0 0', padding: '0.8rem 0.8rem 0.3rem' }}>
                <div style={{ background: 'white', width: '100%', height: '100%', borderRadius: '14px', border: '3px solid #f1f5f9', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
                  <img src={getDashboardImage(pkg.imageKey)} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>

              {isCurrent && (
                <span style={{ position: 'absolute', top: '16px', right: '16px', background: '#0ea5e9', color: 'white', fontSize: '0.75rem', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontWeight: 700 }}>
                  CURRENT PLAN
                </span>
              )}

              <div style={{ padding: '1rem 1.2rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', margin: '0 0 0.5rem 0', color: '#1e293b' }}>{pkg.name}</h3>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: pkg.color, display: 'block', marginBottom: '0.6rem' }}>Rs.{pkg.price.toLocaleString('en-IN')}</span>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>{pkg.description}</p>
              </div>

              <div style={{ padding: '0 1.2rem 1.2rem' }}>
                <button disabled={isCurrent} style={{ width: '100%', padding: '14px', background: isCurrent ? '#94a3b8' : 'linear-gradient(135deg, #0369a1, #0ea5e9)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '1rem', cursor: isCurrent ? 'not-allowed' : 'pointer' }}>
                  {isCurrent ? 'Already Subscribed' : 'Upgrade Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
