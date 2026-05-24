import React, { useState, useEffect } from 'react';
import { localDb, User } from '../../db/localDb';
import { UserCheck, UserMinus, ShieldAlert } from 'lucide-react';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const fetchUsers = () => {
    setUsers(localDb.getUsers());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserStatus = (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
    localDb.updateUserStatus(userId, nextStatus);
    fetchUsers();
  };

  const handlePackageChange = (userId: string, pkgName: string) => {
    localDb.updateUserPackage(userId, pkgName);
    fetchUsers();
    setEditingUserId(null);
  };

  const packages = [
    'Classic Package',
    'Heroic Package',
    'Prime Package',
    'Crystal Package',
    'Platinum Package',
    'Premium Package',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a' }}>User Management</h2>
        <p style={{ fontSize: '0.9rem', color: '#475569' }}>Upgrade client package tiers, toggle account active states, and monitor member registration profiles.</p>
      </div>

      <div className="admin-card" style={{ background: 'white', padding: '1.5rem' }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Email ID</th>
                <th>Phone Number</th>
                <th>Active Package</th>
                <th>Account Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.filter(u => u.role !== 'admin').map((user) => (
                <tr key={user.id}>
                  <td style={{ fontWeight: 600 }}>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {editingUserId === user.id ? (
                      <select
                        defaultValue={user.packageName}
                        onChange={(e) => handlePackageChange(user.id, e.target.value)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem'
                        }}
                      >
                        {packages.map((pkg) => (
                          <option key={pkg} value={pkg}>{pkg}</option>
                        ))}
                      </select>
                    ) : (
                      <span
                        onClick={() => setEditingUserId(user.id)}
                        style={{
                          color: '#2563eb',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          fontSize: '0.85rem',
                          fontWeight: 500
                        }}
                      >
                        {user.packageName}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => toggleUserStatus(user.id, user.status)}
                      className={`admin-btn ${user.status === 'active' ? 'admin-btn-danger' : 'admin-btn-primary'}`}
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', display: 'inline-flex' }}
                    >
                      {user.status === 'active' ? (
                        <>
                          <UserMinus size={14} />
                          Suspend Account
                        </>
                      ) : (
                        <>
                          <UserCheck size={14} />
                          Activate Account
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
