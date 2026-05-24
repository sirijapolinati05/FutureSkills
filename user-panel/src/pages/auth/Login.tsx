import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
        if (email.toLowerCase() === 'admin@gmail.com') {
          alert('Redirecting to Admin Panel on Port 5174...');
          window.location.href = 'http://localhost:5174/';
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const autofillUser = () => {
    setEmail('login@gmail.com');
    setPassword('user123');
  };

  const autofillAdmin = () => {
    setEmail('admin@gmail.com');
    setPassword('admin123');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '2rem' }}
        onClick={() => navigate('/')}
      >
        <div
          style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.05rem'
          }}
        >
          <span style={{ color: '#1e3a8a' }}>Skill</span>
          <span style={{ color: '#0ea5e9' }}>To</span>
          <span style={{ color: '#1d4ed8' }}>Wealth</span>
        </div>
      </div>

      <div
        className="card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '450px',
          padding: '2.5rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
          borderRadius: '16px'
        }}
      >
        <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: '#1e293b', marginBottom: '0.5rem', textAlign: 'center' }}>
          Welcome Back
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem', textAlign: 'center' }}>
          Sign in to continue to your dashboard
        </p>

        {error && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              color: '#b91c1c',
              padding: '0.75rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              textAlign: 'center',
              border: '1px solid #fee2e2'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
              <input
                id="email-input"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '40px' }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password-input">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
              <input
                id="password-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '40px' }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              Remember Me
            </label>
            <a href="#" style={{ color: '#0ea5e9', fontWeight: 600 }}>Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              padding: '0.875rem',
              fontSize: '1rem',
              width: '100%',
              marginTop: '0.5rem',
              background: '#0ea5e9'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0 1.5rem', gap: '0.5rem' }}>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #cbd5e1' }} />
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Quick Access Logins</span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #cbd5e1' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button
            onClick={autofillUser}
            className="btn btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.6rem 0.5rem', flexDirection: 'column', gap: '0.2rem' }}
          >
            <span style={{ fontWeight: 800, color: '#1e3a8a' }}>Login as User</span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>login@gmail.com</span>
          </button>

          <button
            onClick={autofillAdmin}
            className="btn btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.6rem 0.5rem', flexDirection: 'column', gap: '0.2rem' }}
          >
            <span style={{ fontWeight: 800, color: '#b91c1c' }}>Login as Admin</span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>admin@gmail.com</span>
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', color: '#64748b' }}>
          Don't have an account? <span onClick={() => navigate('/register')} style={{ color: '#0ea5e9', fontWeight: 700, cursor: 'pointer' }}>Register Now</span>
        </p>
      </div>
    </div>
  );
};
