import React, { useState, useEffect } from 'react';
import { localDb, LiveOffer } from '../../db/localDb';
import { Plus, Gift, Trash2 } from 'lucide-react';

export const LiveOffersManager: React.FC = () => {
  const [offers, setOffers] = useState<LiveOffer[]>([]);
  
  // Form State
  const [tag, setTag] = useState('HOT OFFER');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const fetchOffers = () => {
    setOffers(localDb.getLiveOffers());
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) {
      alert('Please fill out all required fields.');
      return;
    }

    const newOffer: LiveOffer = {
      id: 'offer-' + Math.random().toString(36).substr(2, 9),
      tag,
      title,
      desc
    };

    const updated = [...offers, newOffer];
    localDb.saveLiveOffers(updated);
    fetchOffers();

    // Reset Form
    setTitle('');
    setDesc('');
    alert('New Promo Offer Published Successfully!');
  };

  const handleDeleteOffer = (id: string) => {
    if (window.confirm('Are you sure you want to remove this offer?')) {
      const updated = offers.filter(o => o.id !== id);
      localDb.saveLiveOffers(updated);
      fetchOffers();
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }} className="admin-grid">
      {/* List Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a' }}>Live Offers Manager</h2>
          <p style={{ fontSize: '0.9rem', color: '#475569' }}>Publish promotional contents, travel rewards, or commission challenges for users.</p>
        </div>

        <div className="admin-card" style={{ background: 'white', padding: '1.5rem' }}>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tag</th>
                  <th>Offer Details</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                      No active promo offers found. Publish one on the right!
                    </td>
                  </tr>
                ) : (
                  offers.map((offer) => (
                    <tr key={offer.id}>
                      <td style={{ verticalAlign: 'top' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          backgroundColor: '#ffedd5',
                          color: '#ea580c',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          display: 'inline-block'
                        }}>
                          {offer.tag}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0f172a' }}>{offer.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>{offer.desc}</div>
                      </td>
                      <td style={{ textAlign: 'right', verticalAlign: 'top' }}>
                        <button
                          onClick={() => handleDeleteOffer(offer.id)}
                          className="admin-btn admin-btn-danger"
                          style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit' }}>Publish New Offer</h3>

        <form onSubmit={handleAddOffer} className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Offer Tag</label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="admin-form-input"
            >
              <option value="HOT OFFER">HOT OFFER</option>
              <option value="LIMITED TIME">LIMITED TIME</option>
              <option value="CONTEST">CONTEST</option>
              <option value="SPECIAL REWARD">SPECIAL REWARD</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Offer Title *</label>
            <input
              type="text"
              placeholder="e.g. Dubai Leadership Summit 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Description / Qualifications *</label>
            <textarea
              placeholder="Explain how users qualify for this offer..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="admin-form-input"
              style={{ minHeight: '100px', resize: 'vertical' }}
              required
            />
          </div>

          <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.625rem', display: 'flex', justifyContent: 'center' }}>
            <Plus size={16} />
            Publish Promo Offer
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
