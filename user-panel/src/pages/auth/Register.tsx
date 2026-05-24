import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle } from 'lucide-react';

export const Register: React.FC = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sponsorCode, setSponsorCode] = useState('AZ-2396');
  const [selectedPackage, setSelectedPackage] = useState('Platinum Package');
  const [paymentMethod, setPaymentMethod] = useState('Instamojo');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const packagesList = [
    { name: 'Classic Package', price: 'Rs299', color: '#2563eb', desc: 'LITE PACKAGE' },
    { name: 'Heroic Package', price: 'Rs599', color: '#0ea5e9', desc: 'BASIC PACKAGE' },
    { name: 'Prime Package', price: 'Rs899', color: '#16a34a', desc: 'PRIME PACKAGE' },
    { name: 'Crystal Package', price: 'Rs1299', color: '#06b6d4', desc: 'CRYSTAL PACKAGE' },
    { name: 'Platinum Package', price: 'Rs1699', color: '#1d4ed8', desc: 'PLATINUM PACKAGE' },
    { name: 'Premium Package', price: 'Rs3999', color: '#db2777', desc: 'PREMIUM PACKAGE' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !password) {
      alert('Please fill all required fields.');
      return;
    }
    if (!agreeTerms) {
      alert('You must agree to the Terms & Conditions.');
      return;
    }

    const success = await registerUser({
      name,
      phone,
      email,
      packageName: selectedPackage,
      sponsorCode: 'AZ-' + Math.floor(1000 + Math.random() * 9000),
      referredBy: sponsorCode,
      status: 'active',
    });

    if (success) {
      alert('Registration Successful! Redirecting to Dashboard.');
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 5%',
          background: 'white',
          borderBottom: '1px solid #f1f5f9'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div
            style={{
              fontSize: '1.8rem',
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
        <nav style={{ display: 'flex', gap: '2.5rem', fontWeight: 500, color: '#64748b', fontSize: '0.9rem' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
          <a href="#courses">Our Courses</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
        </nav>
        <button onClick={() => navigate('/login')} className="btn btn-outline" style={{ borderRadius: '9999px', padding: '0.4rem 1.2rem', fontSize: '0.85rem' }}>
          Login
        </button>
      </header>

      <div
        style={{
          background: 'linear-gradient(to bottom, #eff6ff, #f8fafc)',
          textAlign: 'center',
          padding: '3rem 1rem',
          borderBottom: '1px solid #e2e8f0'
        }}
      >
        <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', color: '#0f172a', fontWeight: 800 }}>Register Account</h1>
        <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '0.9rem' }}>
          Home &gt; <span style={{ color: '#0ea5e9' }}>Register Account</span>
        </p>
      </div>

      <main style={{ display: 'flex', justifyContent: 'center', padding: '4rem 1rem', flex: 1 }}>
        <form
          onSubmit={handleSubmit}
          className="card"
          style={{
            width: '100%',
            maxWidth: '650px',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>Register</h2>

          <div className="form-group">
            <label className="form-label">Your Name *</label>
            <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input type="tel" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" required />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required />
          </div>

          <div className="form-group">
            <label className="form-label">Password *</label>
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" required />
          </div>

          <div className="form-group">
            <label className="form-label">Sponsor Code</label>
            <input type="text" placeholder="Enter sponsor code" value={sponsorCode} onChange={(e) => setSponsorCode(e.target.value)} className="form-input" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="form-label">Select Package</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
              {packagesList.map((pkg) => {
                const isSelected = selectedPackage === pkg.name;
                return (
                  <div
                    key={pkg.name}
                    onClick={() => setSelectedPackage(pkg.name)}
                    style={{
                      border: isSelected ? `2px solid ${pkg.color}` : '1px solid #e2e8f0',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 5px 15px rgba(0,0,0,0.08)' : 'none',
                      transform: isSelected ? 'scale(1.02)' : 'none',
                      position: 'relative'
                    }}
                  >
                    <div style={{ backgroundColor: pkg.color, color: 'white', padding: '0.75rem', textAlign: 'center', fontWeight: 800, fontSize: '0.75rem' }}>
                      {pkg.desc}
                    </div>
                    <div style={{ padding: '1rem', textAlign: 'center', background: 'white' }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>{pkg.name}</p>
                      <p style={{ fontSize: '1.25rem', fontWeight: 800, color: pkg.color }}>{pkg.price}</p>
                    </div>
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '4px', right: '4px', color: 'white', background: pkg.color, borderRadius: '50%', padding: '1px' }}>
                        <CheckCircle size={14} fill="white" color={pkg.color} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '0.5rem' }}>
            <label className="form-label">Payment Method</label>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                <input type="radio" name="payment" checked={paymentMethod === 'Instamojo'} onChange={() => setPaymentMethod('Instamojo')} />
                Instamojo
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                <input type="radio" name="payment" checked={paymentMethod === 'Wallet'} onChange={() => setPaymentMethod('Wallet')} />
                Wallet
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginTop: '0.5rem' }}>
            <input type="checkbox" id="terms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} style={{ marginTop: '3px' }} />
            <label htmlFor="terms" style={{ fontSize: '0.75rem', color: '#64748b', cursor: 'pointer' }}>
              By clicking register you agree to our terms, privacy policy.
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ background: '#1e3a8a', padding: '0.875rem', fontSize: '1rem', width: '100%', marginTop: '0.5rem', borderRadius: '8px' }}
          >
            Register Now
          </button>
        </form>
      </main>

      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '1.5rem 5%', textAlign: 'center', fontSize: '0.8rem' }}>
        Copyright 2026 SkillToWealth All Rights Reserved.
      </footer>
    </div>
  );
};
