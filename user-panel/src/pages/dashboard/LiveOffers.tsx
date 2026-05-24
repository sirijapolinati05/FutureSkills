import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { localDb, TeamMember } from '../../db/localDb';
import { Star, ArrowRight, ArrowUpCircle, Users, Award, Calendar, Video, Gift, TrendingUp, Search, IndianRupee } from 'lucide-react';

// ==================== LIVE OFFERS SCREEN ====================
export const LiveOffers: React.FC = () => {
  const [offers, setOffers] = useState<{id: string; tag: string; title: string; desc: string}[]>([]);

  useEffect(() => {
    const data = localDb.getLiveOffers();
    setOffers(data);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Live Offers & Promotions</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Exclusive deals, travel rewards, and commission challenges — seize these limited-time opportunities!</p>
      </div>

      {offers.length === 0 ? (
        <div className="card" style={{ background: 'white', padding: '2rem', textAlign: 'center', color: '#64748b' }}>
          <Gift size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
          <p>No active offers at the moment. Check back later!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {offers.map((offer) => (
            <div key={offer.id} className="card card-hover" style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 50%, #f0f9ff 100%)',
              border: '1px solid #fed7aa',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative circle */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'rgba(14, 165, 233, 0.08)',
                pointerEvents: 'none'
              }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #38bdf8, #1d4ed8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Gift size={22} color="white" />
                </div>

                <div style={{ flex: 1 }}>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    backgroundColor: '#e0f2fe',
                    color: '#0284c7',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.5px'
                  }}>
                    🔥 {offer.tag}
                  </span>

                  <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem' }}>
                    {offer.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                    {offer.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

