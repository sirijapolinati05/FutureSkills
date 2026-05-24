import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { localDb, TeamMember } from '../../db/localDb';
import { Star, ArrowRight, ArrowUpCircle, Users, Award, Calendar, Video, Gift, TrendingUp, Search, IndianRupee } from 'lucide-react';

// ==================== UPGRADE SCREEN ====================
export const Upgrade: React.FC = () => {
  const { user } = useAuth();
  const currentPackage = user?.packageName || 'Classic Package';
  
  const packages = [
    { name: 'Classic Package', price: '₹299', desc: 'Starter course bundle & basic referral tier.' },
    { name: 'Heroic Package', price: '₹599', desc: 'Adds Affiliate Marketing secrets & 60% commissions.' },
    { name: 'Prime Package', price: '₹899', desc: 'Adds Website Development & 70% direct payouts.' },
    { name: 'Crystal Package', price: '₹1299', desc: 'Adds short-form video editing and Reels mastery.' },
    { name: 'Platinum Package', price: '₹1699', desc: 'Adds Full Stack Freelance Agency blueprints.' },
    { name: 'Premium Package', price: '₹3999', desc: 'Unlock all courses & max out commissions (85%).' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Upgrade Package</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Current Plan: <strong style={{ color: '#0ea5e9' }}>{currentPackage}</strong></p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
        {packages.map((pkg, idx) => {
          const isCurrent = currentPackage === pkg.name;
          return (
            <div key={idx} className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              border: isCurrent ? '2px solid #0ea5e9' : '1px solid #e2e8f0',
              background: 'white',
              position: 'relative'
            }}>
              {isCurrent && (
                <span style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '12px',
                  background: '#0ea5e9',
                  color: 'white',
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  fontWeight: 700
                }}>
                  CURRENT PLAN
                </span>
              )}
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>{pkg.name}</h3>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#1e3a8a' }}>{pkg.price}</span>
              <p style={{ fontSize: '0.85rem', color: '#64748b', flex: 1 }}>{pkg.desc}</p>
              
              <button
                disabled={isCurrent}
                className="btn btn-primary"
                style={{
                  background: isCurrent ? '#cbd5e1' : '#0ea5e9',
                  cursor: isCurrent ? 'not-allowed' : 'pointer'
                }}
              >
                {isCurrent ? 'Already Subscribed' : 'Upgrade Plan'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

