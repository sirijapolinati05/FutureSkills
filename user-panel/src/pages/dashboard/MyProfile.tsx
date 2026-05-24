import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { localDb } from '../../db/localDb';
import { Copy, Check, Upload, BadgeCheck } from 'lucide-react';

export const MyProfile: React.FC = () => {
  const { user, updateProfile, submitKyc, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'kyc' | 'password'>('profile');
  const [copied, setCopied] = useState(false);
  const earnings = localDb.getEarnings();
  const walletBalance = earnings.pending;
  const pendingWithdrawal = 0;

  // Form states
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [profilePic, setProfilePic] = useState(user?.kycDetails?.documentUrl || '');

  // KYC States
  const [accountHolder, setAccountHolder] = useState(user?.kycDetails?.accountHolder || '');
  const [bankName, setBankName] = useState(user?.kycDetails?.bankName || '');
  const [accountNumber, setAccountNumber] = useState(user?.kycDetails?.accountNumber || '');
  const [ifscCode, setIfscCode] = useState(user?.kycDetails?.ifscCode || '');

  // Password States
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const copySponsorCode = () => {
    if (user?.sponsorCode) {
      navigator.clipboard.writeText(user.sponsorCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateProfile(name, phone);
    if (success) alert('Profile updated successfully!');
  };

  const handleKycSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountHolder || !bankName || !accountNumber || !ifscCode) {
      alert('Please fill out all bank information.');
      return;
    }
    const success = await submitKyc({
      accountHolder,
      bankName,
      accountNumber,
      ifscCode,
      documentUrl: profilePic
    });
    if (success) alert('KYC details submitted! Under review.');
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      alert('New passwords do not match.');
      return;
    }
    await changePassword(newPass);
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const urls = [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    ];
    const chosen = urls[Math.floor(Math.random() * urls.length)];
    setProfilePic(chosen);
    if (user) {
      submitKyc({
        accountHolder: accountHolder || user.name,
        bankName: bankName || 'Not Set',
        accountNumber: accountNumber || 'Not Set',
        ifscCode: ifscCode || 'Not Set',
        documentUrl: chosen
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Profile</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }} className="profile-grid">
        
        {/* Left Column Summary - 3D Card */}
        <div className="three-d-card" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: '2.5rem 1.5rem', 
          gap: '1.5rem', 
          background: 'white',
          borderRadius: '20px',
          boxShadow: `8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.85), inset 2px 2px 4px rgba(255,255,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.1)`,
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          
          {/* 3D Glossy Profile Picture with Colored Border */}
          <div className="three-d-profile-pic" style={{ position: 'relative' }}>
            <img
              src={profilePic || user?.kycDetails?.documentUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"}
              style={{
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                objectFit: 'cover',
                padding: '4px',
                background: 'linear-gradient(135deg, #facc15 0%, #ffffff 50%, #1d4ed8 100%)',
                boxShadow: `
                  0 15px 30px rgba(0,0,0,0.25),
                  inset 0 8px 15px rgba(255,255,255,0.35),
                  inset 0 -8px 15px rgba(0,0,0,0.12)
                `,
                transition: 'all 0.4s ease'
              }}
            />
            
            {/* Verified Badge */}
            <span style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              border: '3px solid white',
              boxShadow: `
                0 4px 12px rgba(0,0,0,0.3),
                inset 0 3px 6px rgba(255,255,255,0.9),
                inset 0 -3px 6px rgba(0,0,0,0.25)
              `,
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BadgeCheck size={15} color="white" strokeWidth={3} />
            </span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '0.25rem' }}>{user?.name}</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{user?.email}</p>
          </div>

          <div style={{ width: '100%', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>My Code</span>
              <button onClick={copySponsorCode} className="three-d-small-btn">
                {user?.sponsorCode}
                {copied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Package</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0ea5e9' }}>{user?.packageName}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Kyc Status</span>
              <span className={`three-d-badge ${user?.kycStatus === 'approved' ? 'approved' : ''}`}>
                {user?.kycStatus || 'Not Submitted'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Sponsor</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user?.referredBy || 'N/A'}</span>
            </div>
          </div>

          <div className="profile-summary-grid" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
            <div className="profile-stat-card">
              <span className="profile-stat-value">{walletBalance}</span>
              <span className="profile-stat-label">Wallet Balance</span>
            </div>
            <div className="profile-stat-card">
              <span className="profile-stat-value">{pendingWithdrawal}</span>
              <span className="profile-stat-label">Pending Withdrawal</span>
            </div>
          </div>

          <div className="profile-action-row" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.9rem' }}>
            <button type="button" className="three-d-btn profile-action-btn">
              WITHDRAW AMOUNT
            </button>
            <button type="button" className="three-d-btn profile-action-btn">
              PAYOUT HISTORY
            </button>
          </div>
        </div>

        {/* Right Column - 3D Card */}
        <div className="three-d-card" style={{ 
          padding: 0, 
          overflow: 'hidden', 
          background: 'white',
          borderRadius: '20px',
          boxShadow: `8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.85), inset 2px 2px 4px rgba(255,255,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.1)`,
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >

          {/* Tab Selection Row */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#eff6ff' }}>
            <button onClick={() => setActiveTab('profile')} style={{ flex: 1, padding: '1rem', fontSize: '0.9rem', fontWeight: 600, border: 'none', backgroundColor: activeTab === 'profile' ? 'white' : 'transparent', color: activeTab === 'profile' ? '#0ea5e9' : '#64748b', cursor: 'pointer', borderBottom: activeTab === 'profile' ? '3px solid #0ea5e9' : '3px solid transparent' }}>Profile Details</button>
            <button onClick={() => setActiveTab('kyc')} style={{ flex: 1, padding: '1rem', fontSize: '0.9rem', fontWeight: 600, border: 'none', backgroundColor: activeTab === 'kyc' ? 'white' : 'transparent', color: activeTab === 'kyc' ? '#0ea5e9' : '#64748b', cursor: 'pointer', borderBottom: activeTab === 'kyc' ? '3px solid #0ea5e9' : '3px solid transparent' }}>Kyc Details</button>
            <button onClick={() => setActiveTab('password')} style={{ flex: 1, padding: '1rem', fontSize: '0.9rem', fontWeight: 600, border: 'none', backgroundColor: activeTab === 'password' ? 'white' : 'transparent', color: activeTab === 'password' ? '#0ea5e9' : '#64748b', cursor: 'pointer', borderBottom: activeTab === 'password' ? '3px solid #0ea5e9' : '3px solid transparent' }}>Change Password</button>
          </div>

          {/* Tab Body */}
          <div style={{ padding: '2rem' }}>
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label className="form-label">Profile Picture</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label className="three-d-choose-btn">
                      <Upload size={16} />
                      Choose File
                      <input type="file" accept="image/*" onChange={handlePicChange} style={{ display: 'none' }} />
                    </label>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Upload profile in size (1:1) for proper fit.</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label">Email ID</label>
                  <input type="email" value={user?.email || ''} className="form-input" disabled style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' }} />
                </div>

                <button type="submit" className="three-d-btn" style={{ alignSelf: 'flex-start', padding: '0.75rem 2.5rem' }}>
                  SAVE CHANGES
                </button>
              </form>
            )}

            {activeTab === 'kyc' && (
              <form onSubmit={handleKycSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Bank Account & Identity KYC</h4>
                
                <div className="form-group">
                  <label className="form-label">Account Holder Name</label>
                  <input type="text" placeholder="Enter account holder name" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label">Bank Name</label>
                  <input type="text" placeholder="State Bank of India, HDFC, etc." value={bankName} onChange={(e) => setBankName(e.target.value)} className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label">Account Number</label>
                  <input type="text" placeholder="Enter bank account number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label">IFSC Code</label>
                  <input type="text" placeholder="SBIN0012345" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} className="form-input" required />
                </div>

                <button type="submit" className="three-d-btn" style={{ alignSelf: 'flex-start', padding: '0.75rem 2.5rem' }}>
                  SUBMIT KYC
                </button>
              </form>
            )}

            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input type="password" placeholder="Enter current password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input type="password" placeholder="Enter new password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="form-input" required />
                </div>

                <button type="submit" className="three-d-btn" style={{ alignSelf: 'flex-start', padding: '0.75rem 2.5rem' }}>
                  UPDATE PASSWORD
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .three-d-card {
          will-change: transform, box-shadow;
        }
        .three-d-card:hover {
          transform: translateY(-8px);
        }

        .three-d-profile-pic img {
          transition: all 0.4s ease;
        }
        .three-d-profile-pic:hover img {
          transform: scale(1.08) rotate(2deg);
          box-shadow: 
            0 20px 40px rgba(0,0,0,0.3),
            inset 0 12px 20px rgba(255,255,255,0.85),
            inset 0 -12px 20px rgba(0,0,0,0.35),
            0 0 0 10px rgba(255,255,255,0.7);
        }

        /* Inset 3D Input Fields */
        .form-input {
          padding: 0.85rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.95rem;
          background: #f8fafc;
          box-shadow: inset 4px 4px 8px rgba(0,0,0,0.18), inset -4px -4px 8px rgba(255,255,255,0.9);
          transition: all 0.2s ease;
        }
        .form-input:focus {
          outline: none;
          border-color: #0ea5e9;
          box-shadow: inset 5px 5px 10px rgba(0,0,0,0.2), inset -5px -5px 10px rgba(255,255,255,0.85), 0 0 0 3px rgba(14,165,233,0.18);
        }

        .three-d-choose-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
          background: #f8fafc;
          box-shadow: inset 4px 4px 8px rgba(0,0,0,0.15), inset -4px -4px 8px rgba(255,255,255,0.9);
          transition: all 0.3s ease;
        }
        .three-d-choose-btn:hover {
          box-shadow: inset 6px 6px 12px rgba(0,0,0,0.2), inset -6px -6px 12px rgba(255,255,255,0.85);
        }

        .three-d-small-btn {
          border: none;
          background: #f8fafc;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.75rem;
          border-radius: 8px;
          box-shadow: 3px 3px 6px rgba(0,0,0,0.12), -3px -3px 6px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(255,255,255,0.7);
          transition: all 0.3s ease;
        }
        .three-d-small-btn:hover {
          box-shadow: 4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.85);
        }

        .three-d-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.8rem;
          border-radius: 9999px;
          box-shadow: 3px 3px 6px rgba(0,0,0,0.15), -3px -3px 6px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(255,255,255,0.7);
        }
        .three-d-badge.approved {
          color: #16a34a !important;
          background: #f0fdf4 !important;
        }

        .three-d-btn {
          padding: 0.75rem 2.5rem;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          background: linear-gradient(145deg, #38bdf8, #1d4ed8);
          color: white;
          cursor: pointer;
          box-shadow: 4px 4px 10px rgba(0,0,0,0.2), -4px -4px 10px rgba(255,255,255,0.4), inset 2px 2px 4px rgba(255,255,255,0.5);
          transition: all 0.3s ease;
        }
        .three-d-btn:hover {
          transform: translateY(-3px);
          box-shadow: 6px 6px 14px rgba(0,0,0,0.25), -6px -6px 14px rgba(255,255,255,0.5);
        }
        .three-d-btn:active {
          transform: translateY(2px);
          box-shadow: inset 4px 4px 8px rgba(0,0,0,0.3);
        }

        .profile-stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          min-height: 96px;
          padding: 1rem 0.85rem;
          border-radius: 16px;
          border: 1px dashed #cbd5e1;
          background: linear-gradient(145deg, #ffffff, #eff6ff);
          box-shadow: 0 14px 24px -14px rgba(14,165,233,0.45), 6px 6px 12px rgba(15,23,42,0.12), -5px -5px 10px rgba(255,255,255,0.92), inset 2px 2px 4px rgba(255,255,255,0.85), inset -2px -2px 4px rgba(14,165,233,0.08);
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .profile-stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 30px -16px rgba(14,165,233,0.52), 8px 8px 16px rgba(15,23,42,0.16), -6px -6px 12px rgba(255,255,255,0.95), inset 2px 2px 4px rgba(255,255,255,0.88);
        }

        .profile-stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #1e3a8a;
          line-height: 1;
        }

        .profile-stat-label {
          font-size: 0.88rem;
          color: #64748b;
          font-weight: 500;
        }

        .profile-action-btn {
          width: 100%;
          justify-content: center;
          font-size: 0.74rem;
          letter-spacing: 0.25px;
          white-space: nowrap;
          border-radius: 9999px;
          padding: 0.95rem 0.7rem;
          box-shadow: 0 12px 22px -12px rgba(29,78,216,0.75), 6px 6px 12px rgba(15,23,42,0.2), -4px -4px 10px rgba(255,255,255,0.28), inset 2px 2px 4px rgba(255,255,255,0.35);
        }
        .profile-action-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 28px -14px rgba(29,78,216,0.82), 8px 8px 16px rgba(15,23,42,0.22), -6px -6px 12px rgba(255,255,255,0.32);
        }

        @media (max-width: 900px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 640px) {
          .profile-summary-grid {
            grid-template-columns: 1fr 1fr !important;
          }

          .profile-action-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 0.7rem !important;
          }

          .profile-stat-value {
            font-size: 1.7rem;
          }

          .profile-action-btn {
            font-size: 0.7rem;
            padding: 0.88rem 0.55rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MyProfile;
