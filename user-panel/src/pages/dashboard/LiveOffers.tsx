import React, { useEffect, useState } from 'react';
import { Calendar, Gift, IndianRupee } from 'lucide-react';
import { LiveOffer, localDb } from '../../db/localDb';
import { getDashboardImage } from '../../lib/dashboardAssets';

export const LiveOffers: React.FC = () => {
  const [offers, setOffers] = useState<LiveOffer[]>([]);

  useEffect(() => {
    setOffers(localDb.getLiveOffers());
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Live Offers</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Admin panel lo update chesina latest offers ikkada user dashboard lo reflect avtayi.</p>
      </div>

      <div className="live-offers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '2rem' }}>
        {offers.map((offer) => (
          <div key={offer.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', background: 'white', border: '1px solid #e2e8f0', borderRadius: '18px', boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.12)', height: '100%' }}>
            <div style={{ position: 'relative', height: '190px', overflow: 'hidden', background: '#f8fafc', borderRadius: '18px 18px 0 0', padding: '0.8rem 0.8rem 0.3rem' }}>
              <div style={{ background: 'white', width: '100%', height: '100%', borderRadius: '14px', border: '3px solid #f1f5f9', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
                <img src={getDashboardImage(offer.imageKey)} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <span style={{ position: 'absolute', top: '16px', left: '16px', padding: '0.42rem 0.88rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, background: 'linear-gradient(145deg, #c2410c, #fdba74)', color: '#fff7ed' }}>
                {offer.tag}
              </span>
            </div>

            <div style={{ padding: '1.45rem 1.35rem', display: 'flex', flexDirection: 'column', gap: '0.9rem', flex: 1 }}>
              <h3 style={{ fontSize: '1.12rem', fontWeight: 700, lineHeight: '1.35', color: '#1e293b', margin: 0 }}>{offer.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6', margin: 0, flex: 1 }}>{offer.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#64748b', fontSize: '0.8rem' }}><Calendar size={15} />{offer.timeline}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#64748b', fontSize: '0.8rem' }}><IndianRupee size={15} />{offer.reward}</span>
              </div>
              <a href={offer.url || '#'} target={offer.url && offer.url !== '#' ? '_blank' : undefined} rel="noreferrer" style={{ marginTop: '0.35rem', width: '100%', padding: '14px', fontSize: '1rem', fontWeight: 600, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #0369a1, #0ea5e9)', color: 'white', textDecoration: 'none' }}>
                <Gift size={18} />
                {offer.ctaLabel || 'View Offer'}
              </a>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1200px) {
          .live-offers-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 900px) {
          .live-offers-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1.5rem !important; }
        }
        @media (max-width: 560px) {
          .live-offers-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 1.25rem !important; }
        }
      `}</style>
    </div>
  );
};

export default LiveOffers;
