import React, { useState, useEffect } from 'react';
import { localDb, User, Course } from '../../db/localDb';
import { Users, IndianRupee, BookOpen, CheckSquare, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(localDb.getUsers());
    setCourses(localDb.getCourses());
  }, []);

  const totalUsers = users.length;
  const adminUsersCount = users.filter(u => u.role === 'admin').length;
  const regularUsersCount = totalUsers - adminUsersCount;

  const pendingKycCount = users.filter(u => u.kycStatus === 'pending').length;
  
  // Mock platform gross sales based on registered user plans:
  // Platinum = 1699, etc.
  const packagePrices: Record<string, number> = {
    'Classic Package': 299,
    'Heroic Package': 599,
    'Prime Package': 899,
    'Crystal Package': 1299,
    'Platinum Package': 1699,
    'Premium Package': 3999,
  };

  const totalPlatformGross = users.reduce((acc, u) => {
    if (u.role === 'admin') return acc;
    return acc + (packagePrices[u.packageName] || 0);
  }, 0) + 415104; // Add baseline mock sales

  const stats = [
    { label: 'Total Registered Users', val: regularUsersCount, icon: <Users size={22} color="#2563eb" />, bg: '#eff6ff', path: '/users' },
    { label: 'Platform Gross Sales', val: `₹${totalPlatformGross.toLocaleString('en-IN')}`, icon: <IndianRupee size={22} color="#16a34a" />, bg: '#f0fdf4', path: '/' },
    { label: 'Pending KYC Requests', val: pendingKycCount, icon: <CheckSquare size={22} color="#ca8a04" />, bg: '#fef3c7', path: '/kyc' },
    { label: 'Total Active Courses', val: courses.length, icon: <BookOpen size={22} color="#0891b2" />, bg: '#ecfeff', path: '/courses' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a' }}>Administrative Dashboard</h2>
        <p style={{ fontSize: '0.9rem', color: '#475569' }}>Real-time overview of user registrations, affiliate sales volume, KYC validations, and courses catalog.</p>
      </div>

      {/* Stats Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem'
      }}>
        {stats.map((stat, idx) => (
          <div
            key={idx}
            onClick={() => navigate(stat.path)}
            className="admin-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'transform 0.15s ease',
              background: 'white'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>{stat.label}</span>
              <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stat.val}</span>
            </div>
            
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '8px',
              backgroundColor: stat.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem'
      }} className="dashboard-row">
        
        {/* Recent users */}
        <div className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'Outfit' }}>Recent User Signups</h3>
            <button onClick={() => navigate('/users')} style={{ border: 'none', background: 'none', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 600 }}>
              View All <ArrowRight size={14} />
            </button>
          </div>
          
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Package Plan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(u => u.role !== 'admin').slice(0, 5).map((user) => (
                  <tr key={user.id}>
                    <td style={{ fontWeight: 600 }}>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.packageName}</td>
                    <td>
                      <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Plan distribution */}
        <div className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'Outfit' }}>Package Signups</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            {[
              { name: 'Platinum Package', count: users.filter(u => u.packageName === 'Platinum Package').length, color: '#7c3aed' },
              { name: 'Classic Package', count: users.filter(u => u.packageName === 'Classic Package').length, color: '#2563eb' },
              { name: 'Heroic Package', count: users.filter(u => u.packageName === 'Heroic Package').length, color: '#ea580c' },
              { name: 'Prime/Other Plan', count: users.filter(u => !['Platinum Package', 'Classic Package', 'Heroic Package', 'N/A'].includes(u.packageName)).length, color: '#16a34a' }
            ].map((p, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                  <span>{p.name}</span>
                  <span>{p.count} users</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: totalUsers > 1 ? `${(p.count / (totalUsers - 1)) * 100}%` : '0%',
                    height: '100%',
                    backgroundColor: p.color
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .dashboard-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
