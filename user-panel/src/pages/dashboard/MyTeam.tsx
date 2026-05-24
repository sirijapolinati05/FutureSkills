import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { localDb, TeamMember } from '../../db/localDb';
import { Star, ArrowRight, ArrowUpCircle, Users, Award, Calendar, Video, Gift, TrendingUp, Search, IndianRupee } from 'lucide-react';

// ==================== MY TEAM SCREEN ====================
export const MyTeam: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    setTeam(localDb.getTeam());
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>My Referral Team</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>View direct (Level 1) and indirect (Level 2) affiliates registered using your sponsor code.</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', background: 'white' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem' }}>Name</th>
              <th style={{ padding: '1rem' }}>Contact</th>
              <th style={{ padding: '1rem' }}>Level</th>
              <th style={{ padding: '1rem' }}>Package Plan</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member) => (
              <tr key={member.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{member.name}</td>
                <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                  <div>{member.email}</div>
                  <div style={{ color: '#64748b' }}>{member.phone}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: member.level === 1 ? '#e0f2fe' : '#f3e8ff',
                    color: member.level === 1 ? '#0369a1' : '#1d4ed8',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    Level {member.level} ({member.level === 1 ? 'Direct' : 'Indirect'})
                  </span>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem', fontWeight: 600 }}>{member.packageName}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#16a34a',
                    background: '#f0fdf4',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}>
                    {member.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#64748b' }}>{member.joinedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

