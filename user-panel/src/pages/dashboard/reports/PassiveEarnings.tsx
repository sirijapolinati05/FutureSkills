import React from 'react';

// ==================== PASSIVE EARNINGS SCREEN ====================
export const PassiveEarnings: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Passive Commission Report</h2>
      <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Earnings from your Level 2 indirect team sales.</p>
    </div>
    <div className="card" style={{ background: 'white', padding: '2rem', textAlign: 'center', color: '#64748b' }}>
      No passive commission records found. Passive earnings activate when your level 1 team refers new users.
    </div>
  </div>
);

