import React from 'react';
import { useAuth } from '../../context/AuthContext';

// Import Images
import StarterImg from '../../assets/Starter.jpeg';
import AdvancedImg from '../../assets/Advanced.jpeg';
import ProImg from '../../assets/Pro.jpeg';
import EliteImg from '../../assets/Elite.jpeg';
import PremiumImg from '../../assets/Premium.jpeg';

export const Upgrade: React.FC = () => {
  const { user } = useAuth();
  const currentPackage = user?.packageName || 'Starter Package';
  
  const packages = [
    { 
      name: 'Starter Package', 
      price: '₹299', 
      desc: 'Starter course bundle & basic referral benefits.',
      image: StarterImg,
      color: '#1e3a8a'        // Dark Blue
    },
    { 
      name: 'Advanced Package', 
      price: '₹599', 
      desc: 'Affiliate marketing secrets & higher commission rates.',
      image: AdvancedImg,
      color: '#f97316'        // Orange
    },
    { 
      name: 'Pro Package', 
      price: '₹899', 
      desc: 'Website development training & better payouts.',
      image: ProImg,
      color: '#15803d'        // Dark Green
    },
    { 
      name: 'Elite Package', 
      price: '₹1299', 
      desc: 'Short-form video editing & Reels mastery included.',
      image: EliteImg,
      color: '#475569'        // Dark Silver
    },
    { 
      name: 'Premium Package', 
      price: '₹3999', 
      desc: 'Unlock all courses + maximum commissions (85%).',
      image: PremiumImg,
      color: '#ca8a04'        // Gold
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>
          Upgrade Package
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Current Plan: <strong style={{ color: '#0ea5e9' }}>{currentPackage}</strong>
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2.2rem' 
      }}>
        {packages.map((pkg, idx) => {
          const isCurrent = currentPackage === pkg.name;

          return (
            <div 
              key={idx} 
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: isCurrent ? '3px solid #0ea5e9' : '1px solid #e2e8f0',
                borderRadius: '18px',
                background: 'white',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.12)',
                position: 'relative',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                height: '100%',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 30px 50px -12px rgb(0 0 0 / 0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgb(0 0 0 / 0.12)';
              }}
            >
              {/* Image Container */}
              <div style={{ 
                height: '190px', 
                overflow: 'hidden',
                background: '#f8fafc',
                borderRadius: '18px 18px 0 0',
                padding: '0.8rem 0.8rem 0.3rem',
              }}>
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
                    src={pkg.image} 
                    alt={pkg.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              </div>

              {/* Current Plan Badge */}
              {isCurrent && (
                <span style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: '#0ea5e9',
                  color: 'white',
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '9999px',
                  fontWeight: 700,
                }}>
                  CURRENT PLAN
                </span>
              )}

              <div style={{ padding: '1rem 1.2rem', flex: 1 }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontFamily: 'var(--font-heading)',
                  margin: '0 0 0.5rem 0',
                  color: '#1e293b'
                }}>
                  {pkg.name}
                </h3>

                {/* Price with New Colors */}
                <span style={{ 
                  fontSize: '2rem', 
                  fontWeight: 800, 
                  color: pkg.color,
                  display: 'block',
                  marginBottom: '0.6rem'
                }}>
                  {pkg.price}
                </span>

                <p style={{ 
                  fontSize: '0.88rem', 
                  color: '#64748b', 
                  lineHeight: '1.5'
                }}>
                  {pkg.desc}
                </p>
              </div>

              <div style={{ padding: '0 1.2rem 1.2rem' }}>
                <button
                  disabled={isCurrent}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: isCurrent 
                      ? '#94a3b8' 
                      : 'linear-gradient(135deg, #0369a1, #0ea5e9)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: isCurrent ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isCurrent 
                      ? 'none' 
                      : '0 6px 12px -3px rgb(3 105 161 / 0.4), inset 0 -2px 4px rgba(255,255,255,0.3)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 16px -4px rgb(3 105 161 / 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 12px -3px rgb(3 105 161 / 0.4), inset 0 -2px 4px rgba(255,255,255,0.3)';
                    }
                  }}
                >
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