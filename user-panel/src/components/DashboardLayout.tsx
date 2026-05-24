import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <aside
        className="hide-mobile"
        style={{
          width: '260px',
          borderRight: '1px solid #e2e8f0',
          background: '#ffffff',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 30
        }}
      >
        <Sidebar setMobileOpen={setMobileOpen} />
      </aside>

      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.35)',
            zIndex: 40,
            display: 'flex'
          }}
        >
          <div style={{ width: '260px', height: '100%', background: '#ffffff', boxShadow: '5px 0 25px rgba(0,0,0,0.1)' }}>
            <Sidebar setMobileOpen={setMobileOpen} />
          </div>
          <div style={{ flex: 1 }} onClick={() => setMobileOpen(false)} />
        </div>
      )}

      <div
        style={{
          flex: 1,
          paddingLeft: '260px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          maxWidth: '100vw'
        }}
        className="main-content-pane"
      >
        <Navbar setMobileOpen={setMobileOpen} />

        <main style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        .hide-desktop { display: none !important; }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .hide-desktop { display: block !important; }
          .main-content-pane { padding-left: 0 !important; }
        }
      `}</style>
    </div>
  );
};
