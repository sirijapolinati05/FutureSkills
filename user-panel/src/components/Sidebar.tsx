import React, { useEffect, useState } from 'react';
import skillToWealthLogo from '../assets/Skill-To-Wealth.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Briefcase,
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  IndianRupee,
  LayoutDashboard,
  Link2,
  LogOut,
  MonitorPlay,
  Trophy,
  TrendingUp,
  User,
  Users,
  Video,
} from 'lucide-react';

interface SidebarItem {
  name: string;
  route: string;
  icon: React.ReactElement;
  description?: string;
  badge?: string;
}

interface SidebarProps {
  setMobileOpen: (open: boolean) => void;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', route: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { name: 'My Profile', route: '/profile', icon: <User size={18} /> },
  { name: 'Affiliate Link', route: '/affiliate', icon: <Link2 size={18} /> },
  { name: 'My Courses', route: '/courses', icon: <BookOpen size={18} /> },
  { name: 'Upgrade', route: '/upgrade', icon: <TrendingUp size={18} /> },
  { name: 'Leaderboard', route: '/leaderboard', icon: <Trophy size={18} /> },
  { name: 'Earning Target', route: '/earning-target', icon: <IndianRupee size={18} /> },
  { name: 'My Team', route: '/team', icon: <Users size={18} /> },
  { name: 'Reports', route: '/reports/earnings', icon: <FileText size={18} /> },
  { name: 'Training', route: '/training', icon: <Video size={18} /> },
  { name: 'Webinars', route: '/webinars', icon: <Video size={18} /> },
  { name: 'Live Offers', route: '/live-offers', icon: <MonitorPlay size={18} /> },
  { name: 'Freelancing', route: '/freelancing', icon: <Briefcase size={18} /> },
  { name: 'Community Links', route: '/community', icon: <Users size={18} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ setMobileOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [reportsOpen, setReportsOpen] = useState(() => location.pathname.startsWith('/reports'));

  const reportItems = [
    { name: 'Earnings History', route: '/reports/earnings' },
    { name: 'Payout History', route: '/reports/payouts' },
    { name: 'Wallet History', route: '/reports/wallet' },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith('/reports')) {
      setReportsOpen(true);
    }
  }, [location.pathname]);

  const isActiveRoute = (route: string) => {
    if (route.startsWith('/reports')) {
      return location.pathname.startsWith('/reports');
    }

    return location.pathname === route;
  };

  const handleNavClick = (route: string) => {
    navigate(route);
    setMobileOpen(false);
  };

  const profileImage =
    user?.kycDetails?.documentUrl ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80';

  const formattedDateTime = currentTime.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <div
        onClick={() => handleNavClick('/dashboard')}
        style={{
          padding: '0.3rem 1rem 0.35rem',
          cursor: 'pointer',
          height: '68px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #e5e7eb',
          flexShrink: 0
        }}
      >
        <img
          src={skillToWealthLogo}
          alt="Skill To Wealth"
          style={{
            width: '210px',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            marginTop: '-4px'
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          margin: '0.9rem 0.85rem 0.75rem',
          padding: '0.85rem 0.9rem',
          border: '1.5px solid #5b4ce6',
          borderRadius: '16px',
          background: '#ffffff',
          boxShadow: '0 6px 16px rgba(15, 23, 42, 0.06)'
        }}
      >
        <img
          src={profileImage}
          alt={user?.name || 'Profile'}
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
            padding: '3px',
            background: 'linear-gradient(135deg, #facc15 0%, #ffffff 50%, #1d4ed8 100%)',
            boxShadow: `
              0 10px 18px rgba(15, 23, 42, 0.22),
              inset 0 2px 4px rgba(255,255,255,0.95),
              inset 0 -3px 6px rgba(2,132,199,0.2)
            `,
            transform: 'translateY(-1px)'
          }}
        />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              color: '#163250',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            Hello {user?.name || 'User'}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#334155', marginTop: '0.35rem' }}>
            {formattedDateTime}
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          padding: '0 0.85rem 0.75rem'
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.18rem' }}>
          {sidebarItems.map((item) => {
            if (item.name === 'Reports') {
              const reportsActive = isActiveRoute(item.route);

              return (
                <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.18rem' }}>
                  <button
                    onClick={() => setReportsOpen((prev) => !prev)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      width: '100%',
                      border: 'none',
                      borderRadius: reportsOpen ? '12px 12px 0 0' : '12px',
                      padding: '0.8rem 1rem',
                      cursor: 'pointer',
                      background: reportsActive || reportsOpen ? '#e5edf8' : 'transparent',
                      color: '#0f172a',
                      fontWeight: 700,
                      textAlign: 'left',
                      transition: 'background-color 0.15s ease, color 0.15s ease',
                    }}
                  >
                    <span style={{ color: reportsActive ? '#0f172a' : '#1e293b', display: 'flex' }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.name}</span>
                    {reportsOpen ? <ChevronDown size={16} color="#0f172a" /> : <ChevronRight size={16} color="#0f172a" />}
                  </button>

                  {reportsOpen && (
                    <div
                      style={{
                        background: '#ffffff',
                        borderRadius: '0 0 14px 14px',
                        padding: '0.2rem 0.35rem 0.45rem 2.75rem',
                      }}
                    >
                      {reportItems.map((report) => {
                        const isReportActive = location.pathname === report.route;

                        return (
                          <button
                            key={report.name}
                            onClick={() => handleNavClick(report.route)}
                            style={{
                              display: 'block',
                              width: '100%',
                              border: 'none',
                              background: 'transparent',
                              textAlign: 'left',
                              padding: '0.75rem 0.7rem',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              color: isReportActive ? '#0f172a' : '#111827',
                              fontWeight: isReportActive ? 800 : 600,
                              fontSize: '0.96rem',
                            }}
                          >
                            {report.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.route)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.8rem 1rem',
                  cursor: 'pointer',
                  background: isActiveRoute(item.route) ? '#e5edf8' : 'transparent',
                  color: '#0f172a',
                  fontWeight: 700,
                  textAlign: 'left',
                  transition: 'background-color 0.15s ease, color 0.15s ease'
                }}
              >
                <span style={{ color: isActiveRoute(item.route) ? '#0f172a' : '#1e293b', display: 'flex' }}>
                  {item.icon}
                </span>
                <span style={{ flex: 1 }}>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div style={{ paddingTop: '1.25rem' }}>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              width: '100%',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '0.9rem 1rem',
              background: '#ffffff',
              color: '#334155',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
