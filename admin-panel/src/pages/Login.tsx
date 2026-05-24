import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password, rememberMe);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid admin credentials. Please use admin@gmail.com and password admin123.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const autofillAdmin = () => {
    setEmail('admin@gmail.com');
    setPassword('admin123');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f1f5f9',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1.5rem'
    }}>
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <div style={{
          fontSize: '2rem',
          fontWeight: 800,
          fontFamily: 'Outfit',
          color: '#0f172a'
        }}>
          <span>AchieverZon</span>
          <span style={{ color: '#2563eb', marginLeft: '5px', fontSize: '0.9rem', verticalAlign: 'middle', border: '1px solid #2563eb', padding: '1px 6px', borderRadius: '4px' }}>ADMIN PANEL</span>
        </div>
      </div>

      {/* Login Box */}
      <div className="admin-card" style={{
        width: '100%',
        maxWidth: '420px',
        padding: '2.5rem',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
        background: 'white'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Outfit', color: '#0f172a', marginBottom: '0.25rem', textAlign: 'center' }}>Admin Sign In</h2>
        <p style={{ color: '#475569', fontSize: '0.85rem', marginBottom: '2rem', textAlign: 'center' }}>Manage users, courses, and platform KYC approvals</p>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            padding: '0.75rem',
            borderRadius: '6px',
            fontSize: '0.8rem',
            marginBottom: '1.25rem',
            textAlign: 'center',
            border: '1px solid #fca5a5'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Admin Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-form-input"
                style={{ paddingLeft: '32px', width: '100%' }}
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-form-input"
                style={{ paddingLeft: '32px', width: '100%' }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember session
            </label>
          </div>

          <button type="submit" className="admin-btn admin-btn-primary" style={{
            padding: '0.75rem',
            width: '100%',
            marginTop: '0.5rem',
            backgroundColor: '#0f172a'
          }}>
            Sign In to Panel
          </button>
        </form>

        {/* Quick Access */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem', borderTop: '1px solid #cbd5e1', paddingTop: '1.5rem' }}>
          <button onClick={autofillAdmin} className="admin-btn admin-btn-outline" style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.125rem'
          }}>
            <span style={{ fontWeight: 800, color: '#0f172a' }}>Login as Admin (Default)</span>
            <span style={{ fontSize: '0.7rem', color: '#475569' }}>admin@gmail.com / admin123</span>
          </button>
        </div>
      </div>
    </div>
  );
};
