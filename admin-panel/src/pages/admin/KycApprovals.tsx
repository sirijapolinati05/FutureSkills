import React, { useState, useEffect } from 'react';
import { localDb, User } from '../../db/localDb';
import { Check, X, FileText } from 'lucide-react';

export const KycApprovals: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);

  const fetchPendingKyc = () => {
    const allUsers = localDb.getUsers();
    // Filter users that have a pending or recently approved/rejected KYC status for testing review
    setPendingUsers(allUsers.filter(u => u.role !== 'admin' && u.kycStatus !== 'not_submitted'));
  };

  useEffect(() => {
    fetchPendingKyc();
  }, []);

  const handleKycAction = (userId: string, action: 'approved' | 'rejected') => {
    localDb.updateUserKyc(userId, action);
    alert(`KYC status successfully updated to: ${action.toUpperCase()}`);
    fetchPendingKyc();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a' }}>KYC Approvals</h2>
        <p style={{ fontSize: '0.9rem', color: '#475569' }}>Verify user identity bank accounts for commissions payouts. Approved accounts can request earnings withdrawals.</p>
      </div>

      <div className="admin-card" style={{ background: 'white', padding: '1.5rem' }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User Profile</th>
                <th>Bank &amp; Account Holder</th>
                <th>Account &amp; IFSC Details</th>
                <th>Current Status</th>
                <th style={{ textAlign: 'right' }}>Review Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                    No KYC submissions currently pending review.
                  </td>
                </tr>
              ) : (
                pendingUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.email}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{user.kycDetails?.accountHolder || 'N/A'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.kycDetails?.bankName || 'N/A'}</div>
                    </td>
                    <td>
                      <div>Acct: {user.kycDetails?.accountNumber || 'N/A'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>IFSC: {user.kycDetails?.ifscCode || 'N/A'}</div>
                    </td>
                    <td>
                      <span className={`badge ${
                        user.kycStatus === 'approved' ? 'badge-success' :
                        user.kycStatus === 'pending' ? 'badge-warning' : 'badge-danger'
                      }`}>
                        {user.kycStatus}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {user.kycStatus === 'pending' ? (
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleKycAction(user.id, 'approved')}
                            className="admin-btn admin-btn-primary"
                            style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', backgroundColor: '#16a34a' }}
                          >
                            <Check size={14} />
                            Approve
                          </button>
                          
                          <button
                            onClick={() => handleKycAction(user.id, 'rejected')}
                            className="admin-btn admin-btn-danger"
                            style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                          >
                            <X size={14} />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>Reviewed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
