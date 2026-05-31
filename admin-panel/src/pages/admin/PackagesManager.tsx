import React, { useEffect, useMemo, useState } from 'react';
import { localDb, PackageConfig, UpgradeCommissionRow } from '../../db/localDb';

const imageOptions = ['starter_package', 'advanced_package', 'pro_package', 'elite_package', 'premium_package'];

export const PackagesManager: React.FC = () => {
  const [packages, setPackages] = useState<PackageConfig[]>([]);
  const [baseUrl, setBaseUrl] = useState('');
  const [commonLinkLabel, setCommonLinkLabel] = useState('Common Link');
  const [upgradeRows, setUpgradeRows] = useState<UpgradeCommissionRow[]>([]);
  const [pkgForm, setPkgForm] = useState<PackageConfig>({
    id: '',
    name: '',
    price: 299,
    description: '',
    imageKey: 'starter_package',
    color: '#1e3a8a',
    level: 1,
    activeCommission: 240,
    passiveCommission: 24,
  });
  const [upgradeForm, setUpgradeForm] = useState<UpgradeCommissionRow>({
    id: '',
    fromPackage: '',
    toPackage: '',
    price: 0,
    active: 0,
    passive: 0,
  });

  const packageNames = useMemo(() => packages.map((pkg) => pkg.name), [packages]);

  const refresh = () => {
    const dbPackages = localDb.getPackages();
    const affiliateConfig = localDb.getAffiliateConfig();
    setPackages(dbPackages);
    setBaseUrl(affiliateConfig.baseUrl);
    setCommonLinkLabel(affiliateConfig.commonLinkLabel);
    setUpgradeRows(affiliateConfig.upgradeRows);
    setUpgradeForm((prev) => ({ ...prev, fromPackage: dbPackages[0]?.name || '', toPackage: dbPackages[1]?.name || dbPackages[0]?.name || '' }));
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    const newPackage = { ...pkgForm, id: `pkg-${Math.random().toString(36).slice(2, 9)}` };
    localDb.savePackages([...packages, newPackage].sort((a, b) => a.level - b.level));
    setPkgForm({ id: '', name: '', price: 299, description: '', imageKey: 'starter_package', color: '#1e3a8a', level: packages.length + 1, activeCommission: 240, passiveCommission: 24 });
    refresh();
  };

  const handleDeletePackage = (id: string) => {
    localDb.savePackages(packages.filter((pkg) => pkg.id !== id));
    refresh();
  };

  const handleSaveAffiliate = () => {
    localDb.saveAffiliateConfig({ baseUrl, commonLinkLabel, upgradeRows });
    alert('Affiliate config updated.');
  };

  const handleAddUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    setUpgradeRows((prev) => [...prev, { ...upgradeForm, id: `upgrade-${Math.random().toString(36).slice(2, 9)}` }]);
  };

  const handlePersistUpgrades = () => {
    localDb.saveAffiliateConfig({ baseUrl, commonLinkLabel, upgradeRows });
    alert('Upgrade chart updated.');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }} className="admin-grid">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a' }}>Packages & Affiliate Config</h2>
          <p style={{ fontSize: '0.9rem', color: '#475569' }}>User package cards, affiliate table values, and referral links anni ikkade manage cheyyachu.</p>
        </div>

        <div className="admin-card" style={{ background: 'white', padding: '1.5rem' }}>
          <h3 style={{ marginTop: 0 }}>Package Catalog</h3>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr><th>Package</th><th>Price</th><th>Level</th><th>Commissions</th><th /></tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td><strong>{pkg.name}</strong><div style={{ fontSize: '0.75rem', color: '#64748b' }}>{pkg.description}</div></td>
                    <td>Rs.{pkg.price}</td>
                    <td>{pkg.level}</td>
                    <td>A: Rs.{pkg.activeCommission} | P: Rs.{pkg.passiveCommission}</td>
                    <td style={{ textAlign: 'right' }}><button className="admin-btn admin-btn-danger" onClick={() => handleDeletePackage(pkg.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card" style={{ background: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0 }}>Affiliate Link Settings</h3>
          <label className="admin-form-group">
            <span className="admin-form-label">Checkout Base URL</span>
            <input className="admin-form-input" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} />
          </label>
          <label className="admin-form-group">
            <span className="admin-form-label">Common Link Label</span>
            <input className="admin-form-input" value={commonLinkLabel} onChange={(e) => setCommonLinkLabel(e.target.value)} />
          </label>
          <button className="admin-btn admin-btn-primary" onClick={handleSaveAffiliate}>Save Link Settings</button>
        </div>

        <div className="admin-card" style={{ background: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0 }}>Upgrade Commission Chart</h3>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead><tr><th>From</th><th>To</th><th>Price</th><th>Active</th><th>Passive</th><th /></tr></thead>
              <tbody>
                {upgradeRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.fromPackage}</td>
                    <td>{row.toPackage}</td>
                    <td>Rs.{row.price}</td>
                    <td>Rs.{row.active}</td>
                    <td>Rs.{row.passive}</td>
                    <td style={{ textAlign: 'right' }}><button className="admin-btn admin-btn-danger" onClick={() => setUpgradeRows((prev) => prev.filter((item) => item.id !== row.id))}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="admin-btn admin-btn-primary" onClick={handlePersistUpgrades}>Save Upgrade Chart</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <form onSubmit={handleAddPackage} className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0 }}>Add Package</h3>
          <input className="admin-form-input" placeholder="Package name" value={pkgForm.name} onChange={(e) => setPkgForm({ ...pkgForm, name: e.target.value })} required />
          <input className="admin-form-input" type="number" placeholder="Price" value={pkgForm.price} onChange={(e) => setPkgForm({ ...pkgForm, price: Number(e.target.value) })} required />
          <textarea className="admin-form-input" placeholder="Description" value={pkgForm.description} onChange={(e) => setPkgForm({ ...pkgForm, description: e.target.value })} style={{ minHeight: '90px' }} required />
          <select className="admin-form-input" value={pkgForm.imageKey} onChange={(e) => setPkgForm({ ...pkgForm, imageKey: e.target.value })}>{imageOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select>
          <input className="admin-form-input" placeholder="Hex color" value={pkgForm.color} onChange={(e) => setPkgForm({ ...pkgForm, color: e.target.value })} />
          <input className="admin-form-input" type="number" placeholder="Level" value={pkgForm.level} onChange={(e) => setPkgForm({ ...pkgForm, level: Number(e.target.value) })} required />
          <input className="admin-form-input" type="number" placeholder="Active commission" value={pkgForm.activeCommission} onChange={(e) => setPkgForm({ ...pkgForm, activeCommission: Number(e.target.value) })} required />
          <input className="admin-form-input" type="number" placeholder="Passive commission" value={pkgForm.passiveCommission} onChange={(e) => setPkgForm({ ...pkgForm, passiveCommission: Number(e.target.value) })} required />
          <button type="submit" className="admin-btn admin-btn-primary">Add Package</button>
        </form>

        <form onSubmit={handleAddUpgrade} className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0 }}>Add Upgrade Row</h3>
          <select className="admin-form-input" value={upgradeForm.fromPackage} onChange={(e) => setUpgradeForm({ ...upgradeForm, fromPackage: e.target.value })}>{packageNames.map((name) => <option key={name} value={name}>{name}</option>)}</select>
          <select className="admin-form-input" value={upgradeForm.toPackage} onChange={(e) => setUpgradeForm({ ...upgradeForm, toPackage: e.target.value })}>{packageNames.map((name) => <option key={name} value={name}>{name}</option>)}</select>
          <input className="admin-form-input" type="number" placeholder="Upgrade price" value={upgradeForm.price} onChange={(e) => setUpgradeForm({ ...upgradeForm, price: Number(e.target.value) })} />
          <input className="admin-form-input" type="number" placeholder="Active commission" value={upgradeForm.active} onChange={(e) => setUpgradeForm({ ...upgradeForm, active: Number(e.target.value) })} />
          <input className="admin-form-input" type="number" placeholder="Passive commission" value={upgradeForm.passive} onChange={(e) => setUpgradeForm({ ...upgradeForm, passive: Number(e.target.value) })} />
          <button type="submit" className="admin-btn admin-btn-primary">Add Upgrade Row</button>
        </form>
      </div>

      <style>{`@media (max-width: 960px) { .admin-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};
