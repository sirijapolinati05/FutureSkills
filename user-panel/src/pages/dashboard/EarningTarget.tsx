import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { localDb, TeamMember } from '../../db/localDb';
import { Star, ArrowRight, ArrowUpCircle, Users, Award, Calendar, Video, Gift, TrendingUp, Search, IndianRupee } from 'lucide-react';

// ==================== EARNING TARGET SCREEN ====================
export const EarningTarget: React.FC = () => {
  const currentEarnings = 415104;
  const target = 500000;
  const percentage = Math.min(100, Math.floor((currentEarnings / target) * 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Earning Target Tracker</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Monitor your progress toward hitting your direct affiliate milestones.</p>
      </div>

      <div className="card" style={{ padding: '2.5rem', background: 'white', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Current Progress</span>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#0ea5e9', margin: 0 }}>₹{currentEarnings.toLocaleString('en-IN')}</h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Target Milestone</span>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>₹{target.toLocaleString('en-IN')}</h3>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '24px', backgroundColor: '#f1f5f9', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
          <div style={{
            width: `${percentage}%`,
            height: '100%',
            background: 'linear-gradient(to right, #38bdf8, #1d4ed8)',
            borderRadius: '12px',
            transition: 'width 1s ease'
          }} />
          <span style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '0.8rem',
            fontWeight: 800,
            color: percentage > 55 ? 'white' : '#1e293b'
          }}>
            {percentage}% Achieved
          </span>
        </div>

        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#475569' }}>
          💡 <strong>Tip:</strong> You are only <strong>₹84,896</strong> away from your ₹5,00,000 bonus reward! Promote the Premium Package to close this gap faster.
        </div>
      </div>
    </div>
  );
};

