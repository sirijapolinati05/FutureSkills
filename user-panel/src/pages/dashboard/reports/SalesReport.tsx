import React from 'react';

// ==================== SALES REPORT SCREEN ====================
export const SalesReport: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Direct Sales Report</h2>
      <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Detailed history of course sales referred directly by you.</p>
    </div>
    <div className="card" style={{ background: 'white', padding: '2rem', textAlign: 'center', color: '#64748b' }}>
      No sales record found for this current period. Share your affiliate link to begin.
    </div>
  </div>
);

