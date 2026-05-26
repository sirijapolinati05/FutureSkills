import React, { useEffect, useState } from 'react';
import { localDb, TeamMember } from '../../db/localDb';

const formatJoinedDate = (date: string) =>
  new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export const MyTeam: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    setTeam(localDb.getTeam());
  }, []);

  const directMembers = team.filter((member) => member.level === 1);
  const indirectMembers = team.filter((member) => member.level === 2);
  const activeMembers = team.filter((member) => member.status.toLowerCase() === 'active');

  const statCards = [
    {
      label: 'Total Members',
      value: team.length,
      tone: 'linear-gradient(135deg, #e0f2fe, #f8fbff)',
      accent: '#0284c7',
    },
    {
      label: 'Level 1 Direct',
      value: directMembers.length,
      tone: 'linear-gradient(135deg, #dbeafe, #eff6ff)',
      accent: '#2563eb',
    },
    {
      label: 'Level 2 Indirect',
      value: indirectMembers.length,
      tone: 'linear-gradient(135deg, #e0e7ff, #f5f3ff)',
      accent: '#4f46e5',
    },
    {
      label: 'Active Members',
      value: activeMembers.length,
      tone: 'linear-gradient(135deg, #dcfce7, #f0fdf4)',
      accent: '#16a34a',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2
          style={{
            fontSize: '1.85rem',
            fontFamily: 'var(--font-heading)',
            color: '#1e293b',
            marginBottom: '0.5rem',
          }}
        >
          My Referral Team
        </h2>
        <p
          style={{
            fontSize: '0.95rem',
            color: '#64748b',
            maxWidth: '700px',
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Affiliate link lo commission chart style ki match ayye vidhamga, direct and indirect members ni
          clear ga track cheyyadaniki refreshed table view and quick summary cards.
        </p>
      </div>

      {/* 4 Stat Cards with Strong 3D Bulge Effect */}
      <div
        className="my-team-stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '1.25rem',
        }}
      >
        {statCards.map((card) => (
          <div
            key={card.label}
            className="stat-card-3d"
            style={{
              padding: '1.3rem 1.35rem',
              borderRadius: '22px',
              background: card.tone,
              border: '1px solid rgba(255,255,255,0.9)',
              boxShadow: `
                12px 12px 24px rgba(15, 23, 42, 0.14),
                -12px -12px 24px rgba(255, 255, 255, 0.95),
                inset 4px 4px 8px rgba(255, 255, 255, 0.75),
                inset -4px -4px 8px rgba(15, 23, 42, 0.09)
              `,
              transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
              e.currentTarget.style.boxShadow = `
                16px 16px 32px rgba(15, 23, 42, 0.18),
                -16px -16px 32px rgba(255, 255, 255, 0.92),
                inset 5px 5px 10px rgba(255, 255, 255, 0.8),
                inset -5px -5px 10px rgba(15, 23, 42, 0.12)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = `
                12px 12px 24px rgba(15, 23, 42, 0.14),
                -12px -12px 24px rgba(255, 255, 255, 0.95),
                inset 4px 4px 8px rgba(255, 255, 255, 0.75),
                inset -4px -4px 8px rgba(15, 23, 42, 0.09)
              `;
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '0.83rem',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
              }}
            >
              {card.label}
            </p>
            <div
              style={{
                marginTop: '0.9rem',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '0.75rem',
              }}
            >
              <strong
                style={{
                  fontSize: '2.45rem',
                  lineHeight: 1,
                  color: '#0f172a',
                  fontWeight: 800,
                  textShadow: '2px 3px 5px rgba(0,0,0,0.08)',
                }}
              >
                {card.value}
              </strong>
              <span
                style={{
                  width: '15px',
                  height: '15px',
                  borderRadius: '999px',
                  background: card.accent,
                  boxShadow: `
                    0 0 0 7px ${card.accent}25,
                    inset 3px 3px 5px rgba(255,255,255,0.65),
                    0 4px 8px rgba(0,0,0,0.25)
                  `,
                  flexShrink: 0,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Rest of your code remains same */}
      <div className="affiliate-table-card my-team-table-card">
        <div className="affiliate-table-card-header">
          <h3>Team Overview</h3>
          <p>Same commission chart look lo designed team table with level, package, and join details.</p>
        </div>

        <div className="affiliate-table-wrap my-team-table-wrap">
          <table className="affiliate-table my-team-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Contact</th>
                <th>Level</th>
                <th>Package</th>
                <th>Status</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member) => {
                const isDirect = member.level === 1;
                const isActive = member.status.toLowerCase() === 'active';

                return (
                  <tr key={member.id}>
                    <td>
                      <div className="my-team-cell-stack">
                        <strong>{member.name}</strong>
                        <span>ID: {member.id}</span>
                      </div>
                    </td>
                    <td>
                      <div className="my-team-cell-stack">
                        <strong>{member.email}</strong>
                        <span>{member.phone}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span
                        className="my-team-pill level-pill"
                        style={{
                          background: isDirect ? '#1e40af' : '#3730a3',
                          color: 'white',
                        }}
                      >
                        Level {member.level} {isDirect ? 'Direct' : 'Indirect'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="my-team-package">{member.packageName}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span
                        className="my-team-pill status-pill"
                        style={{
                          background: isActive 
                            ? 'linear-gradient(145deg, #4ade80, #22c55e)' 
                            : 'linear-gradient(145deg, #f87171, #ef4444)',
                          color: isActive ? '#14532d' : 'white',
                        }}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>{formatJoinedDate(member.joinedDate)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="my-team-mobile-list">
          {team.map((member) => {
            const isDirect = member.level === 1;
            const isActive = member.status.toLowerCase() === 'active';

            return (
              <div key={member.id} className="my-team-mobile-card">
                <div className="my-team-mobile-header">
                  <div>
                    <h4>{member.name}</h4>
                    <p>{member.packageName}</p>
                  </div>
                  <span
                    className="my-team-pill status-pill"
                    style={{
                      background: isActive 
                        ? 'linear-gradient(145deg, #4ade80, #22c55e)' 
                        : 'linear-gradient(145deg, #f87171, #ef4444)',
                      color: isActive ? '#14532d' : 'white',
                    }}
                  >
                    {member.status}
                  </span>
                </div>

                <div className="my-team-mobile-grid">
                  <div>
                    <span>Email</span>
                    <strong>{member.email}</strong>
                  </div>
                  <div>
                    <span>Phone</span>
                    <strong>{member.phone}</strong>
                  </div>
                  <div>
                    <span>Level</span>
                    <strong>Level {member.level} {isDirect ? 'Direct' : 'Indirect'}</strong>
                  </div>
                  <div>
                    <span>Joined</span>
                    <strong>{formatJoinedDate(member.joinedDate)}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .affiliate-table-card.my-team-table-card {
          background: white;
          border-radius: 22px;
          box-shadow: 8px 8px 16px rgba(0,0,0,0.12),
                      -8px -8px 16px rgba(255,255,255,0.85),
                      inset 2px 2px 4px rgba(255,255,255,0.6),
                      inset -2px -2px 4px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        .affiliate-table-card-header {
          padding: 1.5rem 1.6rem 1.1rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .affiliate-table-card-header h3 {
          margin: 0;
          font-size: 1.45rem;
          color: #1e3a8a;
        }

        .affiliate-table-card-header p {
          margin: 0.35rem 0 0;
          font-size: 0.88rem;
          color: #64748b;
        }

        .affiliate-table-wrap.my-team-table-wrap {
          padding: 1.35rem;
          overflow-x: auto;
        }

        .affiliate-table.my-team-table {
          width: 100%;
          min-width: 980px;
          border-collapse: separate;
          border-spacing: 8px 12px;
        }

        .affiliate-table.my-team-table th {
          padding: 1rem;
          background: linear-gradient(180deg, #0284c7, #0369a1);
          color: white;
          font-weight: 800;
          text-transform: uppercase;
          text-align: center;
          border-radius: 16px;
        }

        .affiliate-table.my-team-table td {
          padding: 1.1rem 1rem;
          background: #f8fafc;
          border-radius: 18px;
          box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.12),
                      inset -5px -5px 10px rgba(255, 255, 255, 0.9);
          vertical-align: middle;
        }

        .my-team-table td:nth-child(3),
        .my-team-table td:nth-child(4),
        .my-team-table td:nth-child(5),
        .my-team-table td:nth-child(6) {
          text-align: center;
        }

        .my-team-table td:first-child,
        .my-team-table td:nth-child(2) {
          text-align: left;
        }

        .my-team-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.52rem 1.1rem;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 700;
          white-space: nowrap;
          transition: all 0.3s ease;
          transform: translateY(-1px);
        }

        .my-team-pill:hover {
          transform: translateY(-3px);
        }

        .level-pill {
          background: linear-gradient(145deg, #1e40af, #1e3a8a);
          color: white;
          box-shadow: 4px 4px 8px rgba(0,0,0,0.2),
                      inset 2px 2px 4px rgba(255,255,255,0.35);
        }

        .status-pill {
          box-shadow: 4px 4px 8px rgba(0,0,0,0.18),
                      inset 2px 2px 5px rgba(255,255,255,0.7);
        }

        .my-team-cell-stack {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .my-team-cell-stack strong {
          font-size: 0.96rem;
          color: '#0f172a';
        }

        .my-team-cell-stack span {
          font-size: 0.82rem;
          color: #64748b;
        }

        .my-team-package {
          font-weight: 700;
          color: #0f172a;
        }

        .my-team-mobile-list {
          display: none;
          padding: 1.1rem;
          gap: 1rem;
        }

        .my-team-mobile-card {
          background: #f8fafc;
          border-radius: 18px;
          padding: 1rem;
          box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.12),
                      inset -5px -5px 10px rgba(255, 255, 255, 0.96);
        }

        @media (max-width: 900px) {
          .my-team-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 768px) {
          .affiliate-table-wrap.my-team-table-wrap {
            display: none;
          }
          .my-team-mobile-list {
            display: grid;
          }
        }

        @media (max-width: 560px) {
          .my-team-stats-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};