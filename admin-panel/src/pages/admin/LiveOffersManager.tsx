import React, { useState, useEffect } from 'react';
import { localDb, LiveOffer } from '../../db/localDb';

export const LiveOffersManager: React.FC = () => {
  const [offers, setOffers] = useState<LiveOffer[]>([]);
  const [form, setForm] = useState<LiveOffer>({ id: '', tag: 'HOT OFFER', title: '', description: '', timeline: '', reward: '', imageKey: 'future_skills', url: '#', ctaLabel: 'View Offer' });

  const fetchOffers = () => setOffers(localDb.getLiveOffers());
  useEffect(() => { fetchOffers(); }, []);

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    localDb.saveLiveOffers([...offers, { ...form, id: 'offer-' + Math.random().toString(36).substr(2, 9) }]);
    setForm({ id: '', tag: 'HOT OFFER', title: '', description: '', timeline: '', reward: '', imageKey: 'future_skills', url: '#', ctaLabel: 'View Offer' });
    fetchOffers();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }} className="admin-grid">
      <div className="admin-card" style={{ background: 'white' }}>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a', marginTop: 0 }}>Live Offers Manager</h2>
        <p style={{ fontSize: '0.9rem', color: '#475569' }}>Live offers cards, event timelines, reward text, CTA link details ni manage cheyyachu.</p>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>Tag</th><th>Offer Details</th><th>Timeline</th><th /></tr></thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id}>
                  <td>{offer.tag}</td>
                  <td><strong>{offer.title}</strong><div style={{ fontSize: '0.75rem', color: '#64748b' }}>{offer.description}</div></td>
                  <td>{offer.timeline}<div style={{ fontSize: '0.75rem', color: '#64748b' }}>{offer.reward}</div></td>
                  <td style={{ textAlign: 'right' }}><button className="admin-btn admin-btn-danger" onClick={() => { localDb.saveLiveOffers(offers.filter((item) => item.id !== offer.id)); fetchOffers(); }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form onSubmit={handleAddOffer} className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0 }}>Publish New Offer</h3>
        <input className="admin-form-input" placeholder="Tag" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} required />
        <input className="admin-form-input" placeholder="Offer title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea className="admin-form-input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ minHeight: '90px' }} required />
        <input className="admin-form-input" placeholder="Timeline" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} required />
        <input className="admin-form-input" placeholder="Reward text" value={form.reward} onChange={(e) => setForm({ ...form, reward: e.target.value })} required />
        <input className="admin-form-input" placeholder="Image key" value={form.imageKey} onChange={(e) => setForm({ ...form, imageKey: e.target.value })} required />
        <input className="admin-form-input" placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required />
        <input className="admin-form-input" placeholder="CTA Label" value={form.ctaLabel} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })} required />
        <button type="submit" className="admin-btn admin-btn-primary">Publish Promo Offer</button>
      </form>
      <style>{`@media (max-width: 900px) { .admin-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};
