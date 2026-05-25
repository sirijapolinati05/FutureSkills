import React from 'react';
import { Award, TrendingUp, Calendar, Users } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const todayLeaders = [
    { rank: 1, name: 'Keejiyasri', earnings: '₹3448', pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', crown: 'gold' },
    { rank: 2, name: 'Name', earnings: '₹1700', pic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', crown: 'rose' },
    { rank: 3, name: 'Venkatesh', earnings: '₹720', pic: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', crown: 'silver' },
  ];

  const sevenDaysLeaders = [
    { rank: 1, name: 'Perla', earnings: '₹5900', pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', crown: 'gold' },
    { rank: 2, name: 'Surya', earnings: '₹4790', pic: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', crown: 'rose' },
    { rank: 3, name: 'Ramya', earnings: '₹4752', pic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', crown: 'silver' },
  ];

  const thirtyDaysLeaders = [
    { rank: 1, name: 'Rahul Kumar', earnings: '₹12400', pic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', crown: 'gold' },
    { rank: 2, name: 'Anjali Reddy', earnings: '₹9800', pic: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', crown: 'rose' },
    { rank: 3, name: 'Suresh Babu', earnings: '₹7600', pic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', crown: 'silver' },
  ];

  const allTimeLeaders = [
    { rank: 1, name: 'Mamidala Sujith', earnings: '₹4,15,104', pic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', crown: 'gold' },
    { rank: 2, name: 'Priya Sharma', earnings: '₹3,25,800', pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', crown: 'rose' },
    { rank: 3, name: 'Rohan Mehra', earnings: '₹2,95,120', pic: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', crown: 'silver' },
  ];

  const LeaderboardCard = ({ title, leaders, period }: { title: string; leaders: any[]; period: string }) => (
    <div 
      className="three-d-card leaderboard-card"
      style={{
        background: 'linear-gradient(145deg, #0369a1, #0ea5e9, #67e8f9)',
        borderRadius: '24px',
        padding: '2rem 1.8rem',
        boxShadow: `8px 8px 16px rgba(14, 165, 233, 0.3), -8px -8px 16px rgba(255,255,255,0.85), 
                    inset 4px 4px 8px rgba(255,255,255,0.5), inset -4px -4px 8px rgba(14,165,233,0.2)`,
        border: 'none',
        transition: 'all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-14px)';
        e.currentTarget.style.boxShadow = `14px 14px 28px rgba(14, 165, 233, 0.4), -14px -14px 28px rgba(255,255,255,0.95), 
                                          inset 5px 5px 10px rgba(255,255,255,0.6), inset -5px -5px 10px rgba(14,165,233,0.25)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = `8px 8px 16px rgba(14, 165, 233, 0.3), -8px -8px 16px rgba(255,255,255,0.85), 
                                          inset 4px 4px 8px rgba(255,255,255,0.5), inset -4px -4px 8px rgba(14,165,233,0.25)`;
      }}
    >
      {/* Header */}
      <div className="leaderboard-card-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #0369a1, #0ea5e9)', 
          color: 'white', 
          padding: '0.7rem', 
          borderRadius: '14px',
          boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.3)'
        }}>
          {period === 'today' && <Calendar size={28} />}
          {period === '7days' && <TrendingUp size={28} />}
          {period === '30days' && <Award size={28} />}
          {period === 'alltime' && <Users size={28} />}
        </div>
        <h3 className="leaderboard-card-title" style={{ fontSize: '1.45rem', fontWeight: 700, color: 'white' }}>{title}</h3>
      </div>

      {/* Top 3 Orange Cards */}
      <div className="leaderboard-top-three" style={{ display: 'flex', justifyContent: 'center', gap: '1.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {leaders.map((leader, index) => (
          <div 
            key={index} 
            className="leaderboard-top-card"
            style={{
              textAlign: 'center',
              background: 'linear-gradient(145deg, #f97316, #fb923c, #fed7aa)',
              padding: '1.4rem 1rem 1.1rem',
              borderRadius: '20px',
              boxShadow: `6px 6px 12px rgba(249,115,22,0.3), -6px -6px 12px rgba(255,255,255,0.9), 
                          inset 3px 3px 6px rgba(255,255,255,0.7), inset -3px -3px 6px rgba(249,115,22,0.25)`,
              border: `4px solid ${index === 0 ? '#22d3ee' : '#67e8f9'}`,
              minWidth: '142px',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
          >
            <div style={{ position: 'relative', marginBottom: '0.8rem', display: 'flex', justifyContent: 'center' }}>
              <img
                src={leader.pic}
                alt={leader.name}
                style={{
                  width: index === 0 ? '88px' : '78px',
                  height: index === 0 ? '88px' : '78px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '5px solid white',
                  boxShadow: '0 6px 15px rgba(0,0,0,0.25)',
                  position: 'relative',
                  zIndex: 2
                }}
              />
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #0ea5e9, #ffffff, #f97316)',
              padding: '0.5rem 1.3rem',
              borderRadius: '30px',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: '#1e293b',
              marginBottom: '0.7rem',
              boxShadow: `5px 5px 12px rgba(0,0,0,0.25), inset 3px 3px 6px rgba(255,255,255,0.9), inset -3px -3px 6px rgba(14,165,233,0.3)`,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {leader.rank}{leader.rank === 1 ? 'st' : leader.rank === 2 ? 'nd' : 'rd'}
            </div>

            <p className="leaderboard-top-name" style={{ fontWeight: 600, margin: '0.2rem 0', color: 'white', fontSize: '1.05rem' }}>{leader.name}</p>
            <p className="leaderboard-top-earnings" style={{ color: '#fefce8', fontWeight: 700, fontSize: '1.25rem' }}>{leader.earnings}</p>
          </div>
        ))}
      </div>

      {/* Lower Ranks - Now 3D Floating Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[4, 5, 6].map((rank) => (
          <div 
            key={rank} 
            className="leaderboard-rank-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(145deg, #ffffff, #f0f9ff)',
              padding: '1rem 1.4rem',
              borderRadius: '16px',
              boxShadow: `6px 6px 12px rgba(14,165,233,0.2), -6px -6px 12px rgba(255,255,255,0.9), 
                          inset 3px 3px 6px rgba(255,255,255,0.8), inset -3px -3px 6px rgba(14,165,233,0.15)`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              border: '2px solid #bae6fd'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = `10px 10px 20px rgba(14,165,233,0.3), -10px -10px 20px rgba(255,255,255,0.95), 
                                                inset 4px 4px 8px rgba(255,255,255,0.9)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `6px 6px 12px rgba(14,165,233,0.2), -6px -6px 12px rgba(255,255,255,0.9), 
                                                inset 3px 3px 6px rgba(255,255,255,0.8), inset -3px -3px 6px rgba(14,165,233,0.15)`;
            }}
          >
            <div className="leaderboard-rank-left" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                background: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.1rem',
                boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.5)'
              }}>
                {rank}
              </div>
              <span className="leaderboard-rank-name" style={{ fontWeight: 600, color: '#1e293b' }}>Sample User {rank}</span>
            </div>
            <span className="leaderboard-rank-amount" style={{ 
              color: '#16a34a', 
              fontWeight: 700, 
              fontSize: '1.1rem' 
            }}>₹{1250 - rank * 80}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Leaderboard</h2>
        <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
          Top performers across different time periods
        </p>
      </div>

      <div className="leaderboard-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(520px, 1fr))',
        gap: '2rem'
      }}>
        <LeaderboardCard title="TODAY'S LEADERBOARD" leaders={todayLeaders} period="today" />
        <LeaderboardCard title="7 DAYS LEADERBOARD" leaders={sevenDaysLeaders} period="7days" />
        <LeaderboardCard title="30 DAYS LEADERBOARD" leaders={thirtyDaysLeaders} period="30days" />
        <LeaderboardCard title="ALL TIME LEADERBOARD" leaders={allTimeLeaders} period="alltime" />
      </div>

      <style>{`
        .three-d-card { will-change: transform, box-shadow; }

        @media (max-width: 768px) {
          .leaderboard-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }

          .leaderboard-card {
            padding: 1.35rem 1rem !important;
            border-radius: 18px !important;
          }

          .leaderboard-card-header {
            gap: 0.75rem !important;
            margin-bottom: 1.35rem !important;
            align-items: flex-start !important;
          }

          .leaderboard-card-title {
            font-size: 1.1rem !important;
            line-height: 1.35;
          }

          .leaderboard-top-three {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            align-items: end;
            gap: 0.9rem !important;
            margin-bottom: 1.35rem !important;
          }

          .leaderboard-top-card {
            width: 100%;
            min-width: 0 !important;
            padding: 1rem 0.45rem 0.85rem !important;
            border-radius: 16px !important;
          }

          .leaderboard-top-name {
            font-size: 0.84rem !important;
            line-height: 1.2;
          }

          .leaderboard-top-earnings {
            font-size: 0.95rem !important;
          }

          .leaderboard-top-card img {
            width: 62px !important;
            height: 62px !important;
            border-width: 3px !important;
          }

          .leaderboard-top-card svg {
            width: 34px !important;
            height: 34px !important;
          }

          .leaderboard-rank-row {
            flex-direction: row;
            align-items: center !important;
            gap: 0.75rem !important;
            padding: 0.9rem 1rem !important;
          }

          .leaderboard-rank-left {
            width: auto;
            min-width: 0;
            flex: 1;
          }

          .leaderboard-rank-name {
            font-size: 0.92rem;
          }

          .leaderboard-rank-amount {
            width: auto;
            text-align: right;
            font-size: 1rem !important;
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;
