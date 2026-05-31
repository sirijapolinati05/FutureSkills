import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, CheckSquare, BookOpen, LogOut, Menu, X, ShieldAlert, Gift, Video, Calendar, Package, Target, Link2, BriefcaseBusiness, FileText } from 'lucide-react';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
    { name: 'User Management', path: '/users', icon: <Users size={18} /> },
    { name: 'KYC Approvals', path: '/kyc', icon: <CheckSquare size={18} /> },
    { name: 'Courses Manager', path: '/courses', icon: <BookOpen size={18} /> },
    { name: 'Packages', path: '/packages', icon: <Package size={18} /> },
    { name: 'Earning Target', path: '/earning-target', icon: <Target size={18} /> },
    { name: 'Live Offers', path: '/live-offers', icon: <Gift size={18} /> },
    { name: 'Training Videos', path: '/training', icon: <Video size={18} /> },
    { name: 'Webinars', path: '/webinars', icon: <Calendar size={18} /> },
    { name: 'Community Links', path: '/community', icon: <Link2 size={18} /> },
    { name: 'Freelancing', path: '/freelancing', icon: <BriefcaseBusiness size={18} /> },
    { name: 'Reports Data', path: '/reports', icon: <FileText size={18} /> },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const renderSidebar = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0f172a', color: 'white' }}>
      {/* Brand Header */}
      <div style={{
        padding: '1.25rem',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Outfit', color: 'white' }}>
            AchieverZon <span style={{ color: '#3b82f6', fontSize: '0.75rem', border: '1px solid #3b82f6', padding: '1px 4px', borderRadius: '4px' }}>ADMIN</span>
          </span>
        </div>
        <button className="hide-desktop" onClick={() => setMobileOpen(false)} style={{ display: 'none', border: 'none', background: 'transparent', cursor: 'pointer', color: 'white' }} id="admin-close-btn">
          <X size={20} />
        </button>
      </div>

      {/* Admin Info Card */}
      <div style={{
        padding: '1rem',
        margin: '1rem',
        background: '#1e293b',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        border: '1px solid #334155'
      }}>
        <div style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800
        }}>
          A
        </div>
        <div>
          <h4 style={{ fontSize: '0.85rem', color: 'white', margin: 0 }}>System Admin</h4>
          <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>admin@gmail.com</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ flex: 1, padding: '0 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                fontSize: '0.85rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#3b82f6' : '#94a3b8',
                background: isActive ? '#1e293b' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent'
              }}
            >
              {item.icon}
              {item.name}
            </button>
          );
        })}

        {/* Logout */}
        <button
          onClick={logout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: '#f87171',
            background: 'transparent',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            textAlign: 'left',
            marginTop: 'auto'
          }}
        >
          <LogOut size={18} />
          Logout Panel
        </button>
      </nav>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      {/* Desktop Sidebar */}
      <aside className="hide-mobile" style={{
        width: '240px',
        background: '#0f172a',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 30
      }}>
        {renderSidebar()}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          zIndex: 40,
          display: 'flex'
        }}>
          <div style={{ width: '240px', height: '100%', background: '#0f172a' }}>
            {renderSidebar()}
          </div>
          <div style={{ flex: 1 }} onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        paddingLeft: '240px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        maxWidth: '100vw'
      }} className="admin-content-pane">
        {/* Header Bar */}
        <header style={{
          height: '64px',
          background: 'white',
          borderBottom: '1px solid #cbd5e1',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 20
        }}>
          <button className="hide-desktop" onClick={() => setMobileOpen(true)} style={{ display: 'none', border: 'none', background: 'transparent', cursor: 'pointer' }} id="admin-menu-btn">
            <Menu size={24} />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
            <ShieldAlert size={16} color="#3b82f6" />
            <span>Secure Administrator Environment</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>admin@gmail.com</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>AD</div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .hide-desktop { display: block !important; }
          .admin-content-pane { padding-left: 0 !important; }
        }
      `}</style>
    </div>
  );
};
