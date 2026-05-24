import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, Bell } from 'lucide-react';

interface NavbarProps {
  setMobileOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setMobileOpen }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      style={{
        height: '70px',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 20
      }}
    >
      <button
        className="hide-desktop"
        onClick={() => setMobileOpen(true)}
        style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          display: 'none',
          color: '#334155'
        }}
        id="menu-toggle-btn"
      >
        <Menu size={24} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1rem', fontWeight: 600, color: '#334155' }}>
          Welcome back, {user?.name}!
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={20} color="#64748b" />
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ef4444'
          }} />
        </div>

        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
          onClick={() => navigate('/profile')}
        >
          <img
            src={user?.kycDetails?.documentUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              objectFit: 'cover',
              padding: '2px',
              background: 'linear-gradient(135deg, #facc15 0%, #ffffff 50%, #1d4ed8 100%)',
              boxShadow: `
                0 6px 12px rgba(15,23,42,0.16),
                inset 0 2px 4px rgba(255,255,255,0.95),
                inset 0 -3px 5px rgba(2,132,199,0.18)
              `
            }}
            alt="Profile"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
