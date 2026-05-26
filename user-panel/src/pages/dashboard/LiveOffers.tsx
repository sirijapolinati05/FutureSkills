import React, { useEffect, useState } from 'react';
import { Calendar, Gift, IndianRupee } from 'lucide-react';
import FutureSkillsImg from '../../assets/FutureSkills.jpeg';

type OfferCard = {
  id: string;
  tag: string;
  title: string;
  description: string;
  timeline: string;
  reward: string;
  image: string;
};

export const LiveOffers: React.FC = () => {
  const [offers, setOffers] = useState<OfferCard[]>([]);

  const liveOffersData: OfferCard[] = [
    {
      id: 'offer-grand-event',
      tag: 'Free Entry',
      title: 'FutureSkills Grand Business Event in Delhi',
      description:
        'Get free registration for the FutureSkills event and secure your seat for the Delhi business meetup experience.',
      timeline: 'Register this month',
      reward: 'Free Event Entry',
      image: FutureSkillsImg,
    },
    {
      id: 'offer-welcome-pass',
      tag: 'Welcome Pass',
      title: 'FutureSkills Delhi Welcome Pass',
      description:
        'Complete the welcome milestone and claim your special event access with starter-level recognition benefits.',
      timeline: 'Target 0 active income',
      reward: 'Welcome Pass',
      image: FutureSkillsImg,
    },
    {
      id: 'offer-starter-pass',
      tag: 'Starter Pass',
      title: 'FutureSkills Delhi Starter Pass',
      description:
        'Reach the qualifying target and unlock starter pass benefits including entry, certificate, and ID support.',
      timeline: '1 February to 30 April',
      reward: 'Earn 11K target',
      image: FutureSkillsImg,
    },
    {
      id: 'offer-pro-pass',
      tag: 'Pro Pass',
      title: 'FutureSkills Delhi Pro Pass',
      description:
        'Push to the next reward slab and unlock the pro pass offer with premium recognition and higher-value perks.',
      timeline: '1 February to 30 April',
      reward: 'Earn 21K target',
      image: FutureSkillsImg,
    },
  ];

  useEffect(() => {
    setOffers(liveOffersData);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Live Offers</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Current event promotions and reward-based passes in the same premium card style as My Courses.
        </p>
      </div>

      <div
        className="live-offers-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '2rem',
        }}
      >
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '18px',
              boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.12)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              height: '100%',
            }}
            onMouseEnter={(e) => {
              const card = e.currentTarget;
              card.style.transform = 'translateY(-10px)';
              card.style.boxShadow = '0 30px 50px -12px rgb(0 0 0 / 0.18)';

              const img = card.querySelector('img') as HTMLImageElement | null;
              if (img) img.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget;
              card.style.transform = 'translateY(0)';
              card.style.boxShadow = '0 20px 40px -10px rgb(0 0 0 / 0.12)';

              const img = card.querySelector('img') as HTMLImageElement | null;
              if (img) img.style.transform = 'scale(1)';
            }}
          >
            <div
              style={{
                position: 'relative',
                height: '190px',
                overflow: 'hidden',
                background: '#f8fafc',
                borderRadius: '18px 18px 0 0',
                padding: '0.8rem 0.8rem 0.3rem',
              }}
            >
              <div
                style={{
                  background: 'white',
                  width: '100%',
                  height: '100%',
                  borderRadius: '14px',
                  border: '3px solid #f1f5f9',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    display: 'block',
                  }}
                />
              </div>

              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  padding: '0.42rem 0.88rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.01em',
                  background: 'linear-gradient(145deg, #c2410c, #fdba74)',
                  color: '#fff7ed',
                  border: '1px solid rgba(194, 65, 12, 0.45)',
                  boxShadow:
                    '7px 7px 14px rgba(124, 45, 18, 0.22), -3px -3px 8px rgba(255,255,255,0.36), inset 2px 2px 4px rgba(255,244,230,0.32), inset -3px -3px 6px rgba(124,45,18,0.16)',
                }}
              >
                {offer.tag}
              </span>
            </div>

            <div
              style={{
                padding: '1.45rem 1.35rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem',
                flex: 1,
              }}
            >
              <h3
                style={{
                  fontSize: '1.12rem',
                  fontWeight: 700,
                  lineHeight: '1.35',
                  color: '#1e293b',
                  margin: 0,
                }}
              >
                {offer.title}
              </h3>

              <p
                style={{
                  fontSize: '0.85rem',
                  color: '#64748b',
                  lineHeight: '1.6',
                  margin: 0,
                  flex: 1,
                }}
              >
                {offer.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '0.9rem',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#64748b', fontSize: '0.8rem' }}>
                  <Calendar size={15} />
                  {offer.timeline}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#64748b', fontSize: '0.8rem' }}>
                  <IndianRupee size={15} />
                  {offer.reward}
                </span>
              </div>

              <button
                type="button"
                style={{
                  marginTop: '0.35rem',
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 12px -3px rgb(3 105 161 / 0.4), inset 0 -2px 4px rgba(255,255,255,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 16px -4px rgb(3 105 161 / 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow =
                    '0 6px 12px -3px rgb(3 105 161 / 0.4), inset 0 -2px 4px rgba(255,255,255,0.3)';
                }}
              >
                <Gift size={18} />
                View Offer
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1200px) {
          .live-offers-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 900px) {
          .live-offers-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 1.5rem !important;
          }
        }

        @media (max-width: 560px) {
          .live-offers-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LiveOffers;
