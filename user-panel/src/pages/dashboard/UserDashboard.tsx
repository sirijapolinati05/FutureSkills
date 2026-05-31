import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { localDb, EarningStats, ChartDataPoint } from '../../db/localDb';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<EarningStats | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStatsData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setStats(localDb.getEarnings());
      setChartData(localDb.getChartData());
      setRefreshing(false);
    }, 400);
  };

  useEffect(() => {
    fetchStatsData();
  }, []);

  if (!stats) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading dashboard statistics...</div>;

  const cardList = [
    { label: "Today's Earning", val: 0, className: "grad-today" },
    { label: "7 Days Earning", val: 0, className: "grad-seven" },
    { label: "30 Days Earning", val: 0, className: "grad-thirty" },
    { label: "All Time Earning", val: 0, className: "grad-alltime" },
    { label: "All Time Passive", val: 0, className: "grad-passive" },
    { label: "Pending Balance", val: 0, className: "grad-pending" },
    { label: "Industry Earning", val: 0, className: "grad-industry" },
  ];

  const getAbstractShapes = (index: number) => {
    switch(index) {
      case 0: return (
        <>
          <div style={{position:'absolute', top:'12%', left:'15%', fontSize:'34px', color:'rgba(255,255,255,0.95)', 
            filter:'drop-shadow(2px 3px 5px rgba(0,0,0,0.6))', opacity:0.9}}>✦</div>
          <div style={{position:'absolute', top:'28%', right:'18%', width:'36px', height:'36px', borderRadius:'50%', 
            border:'2.5px solid rgba(255,255,255,0.4)', boxShadow:'inset 6px 6px 12px rgba(0,0,0,0.5), inset -4px -4px 8px rgba(255,255,255,0.25)', opacity:0.75}} />
          <div style={{position:'absolute', bottom:'22%', left:'22%', fontSize:'26px', color:'rgba(255,255,255,0.9)', 
            transform:'rotate(35deg)', filter:'drop-shadow(2px 3px 5px rgba(0,0,0,0.55))', opacity:0.85}}>★</div>
        </>
      );
      case 1: return (
        <>
          <div style={{position:'absolute', top:'18%', left:'15%', width:'56px', height:'3px', background:'rgba(255,255,255,0.45)', boxShadow:'inset 0 2px 4px rgba(0,0,0,0.5)', transform:'rotate(40deg)'}} />
          <div style={{position:'absolute', bottom:'29%', right:'18%', width:'44px', height:'3px', background:'rgba(255,255,255,0.45)', boxShadow:'inset 0 2px 4px rgba(0,0,0,0.5)', transform:'rotate(-35deg)'}} />
          <div style={{position:'absolute', top:'34%', left:'65%', width:'28px', height:'28px', border:'2.5px solid rgba(255,255,255,0.4)', transform:'rotate(45deg)', boxShadow:'inset 5px 5px 10px rgba(0,0,0,0.45)'}} />
        </>
      );
      case 2: return (
        <>
          <div style={{position:'absolute', top:'14%', right:'16%', width:'38px', height:'38px', borderRadius:'50%', border:'3px solid rgba(255,255,255,0.4)', boxShadow:'inset 6px 6px 12px rgba(0,0,0,0.5), inset -4px -4px 8px rgba(255,255,255,0.2)'}} />
          <div style={{position:'absolute', bottom:'26%', left:'20%', width:'22px', height:'22px', borderRadius:'50%', background:'rgba(255,255,255,0.3)', boxShadow:'inset 4px 4px 8px rgba(0,0,0,0.5)'}} />
        </>
      );
      case 3: return (
        <>
          <div style={{position:'absolute', top:'16%', left:'18%', fontSize:'34px', color:'rgba(255,255,255,0.92)', transform:'rotate(12deg)', filter:'drop-shadow(2px 3px 5px rgba(0,0,0,0.6))'}}>✧</div>
          <div style={{position:'absolute', bottom:'24%', right:'20%', fontSize:'27px', color:'rgba(255,255,255,0.9)', transform:'rotate(-38deg)', filter:'drop-shadow(2px 3px 5px rgba(0,0,0,0.55))'}}>✦</div>
        </>
      );
      case 4: return (
        <>
          <div style={{position:'absolute', top:'21%', left:'14%', width:'52px', height:'3px', background:'rgba(255,255,255,0.45)', boxShadow:'inset 0 2px 4px rgba(0,0,0,0.5)', transform:'rotate(50deg)'}} />
          <div style={{position:'absolute', bottom:'31%', right:'19%', width:'44px', height:'3px', background:'rgba(255,255,255,0.45)', boxShadow:'inset 0 2px 4px rgba(0,0,0,0.5)', transform:'rotate(-40deg)'}} />
        </>
      );
      case 5: return (
        <>
          <div style={{position:'absolute', top:'18%', left:'24%', width:'14px', height:'14px', borderRadius:'50%', background:'rgba(255,255,255,0.35)', boxShadow:'inset 3px 3px 7px rgba(0,0,0,0.55)'}} />
          <div style={{position:'absolute', top:'39%', right:'26%', width:'10px', height:'10px', borderRadius:'50%', background:'rgba(255,255,255,0.35)', boxShadow:'inset 3px 3px 7px rgba(0,0,0,0.55)'}} />
        </>
      );
      case 6: return (
        <>
          <div style={{position:'absolute', top:'19%', left:'17%', width:'32px', height:'32px', border:'3px solid rgba(255,255,255,0.4)', transform:'rotate(25deg)', boxShadow:'inset 5px 5px 10px rgba(0,0,0,0.45)'}} />
          <div style={{position:'absolute', bottom:'21%', right:'19%', fontSize:'28px', color:'rgba(255,255,255,0.9)', transform:'rotate(36deg)', filter:'drop-shadow(2px 3px 5px rgba(0,0,0,0.55))'}}>✦</div>
        </>
      );
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div
        className="three-d-card dashboard-user-banner"
        style={{
          padding: '1.15rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
          borderRadius: '18px',
          boxShadow: `8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.88), inset 2px 2px 4px rgba(255,255,255,0.75), inset -2px -2px 4px rgba(0,0,0,0.08)`,
          transition: 'all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)',
          border: '1px solid rgba(226,232,240,0.9)',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = `12px 12px 24px rgba(0,0,0,0.16), -12px -12px 24px rgba(255,255,255,0.94), inset 3px 3px 6px rgba(255,255,255,0.8)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.88), inset 2px 2px 4px rgba(255,255,255,0.75), inset -2px -2px 4px rgba(0,0,0,0.08)`;
        }}
      >
        <h2 className="dashboard-greeting-title" style={{ fontSize: '1.2rem', color: '#1e293b', fontWeight: 700, fontFamily: 'var(--font-heading)', textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}>
          Good Morning, {user?.name}!
        </h2>

        <button
          onClick={fetchStatsData}
          disabled={refreshing}
          style={{
            border: '1px solid rgba(226,232,240,0.9)',
            background: 'linear-gradient(145deg, #ffffff, #e2e8f0)',
            cursor: 'pointer',
            color: '#475569',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '9999px',
            boxShadow: `4px 4px 8px rgba(0,0,0,0.14), -4px -4px 8px rgba(255,255,255,0.9), inset 2px 2px 4px rgba(255,255,255,0.8)`,
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `6px 6px 12px rgba(0,0,0,0.16), -6px -6px 12px rgba(255,255,255,0.95), inset 2px 2px 4px rgba(255,255,255,0.85)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `4px 4px 8px rgba(0,0,0,0.14), -4px -4px 8px rgba(255,255,255,0.9), inset 2px 2px 4px rgba(255,255,255,0.8)`;
          }}
        >
          <RefreshCw size={18} className={refreshing ? "spin" : ""} />
        </button>
      </div>

      <div
        className="three-d-card dashboard-user-banner"
        style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)',
          border: '1px solid #7dd3fc',
          padding: '2.35rem 2rem',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `12px 12px 24px rgba(14,165,233,0.14), -10px -10px 22px rgba(255,255,255,0.92), inset 2px 2px 4px rgba(255,255,255,0.75), inset -2px -2px 4px rgba(56,189,248,0.08)`,
          transition: 'all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = `18px 18px 32px rgba(14,165,233,0.18), -12px -12px 26px rgba(255,255,255,0.95), inset 3px 3px 6px rgba(255,255,255,0.82)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `12px 12px 24px rgba(14,165,233,0.14), -10px -10px 22px rgba(255,255,255,0.92), inset 2px 2px 4px rgba(255,255,255,0.75), inset -2px -2px 4px rgba(56,189,248,0.08)`;
        }}
      >
        <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.1)' }} />
        <div style={{ position: 'absolute', left: '-4%', bottom: '-18%', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.22)' }} />
        <div className="dashboard-user-banner-avatar" style={{ position: 'relative' }}>
          <img
            className="dashboard-user-banner-image"
            src={user?.kycDetails?.documentUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"}
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              objectFit: 'cover',
              padding: '4px',
              background: 'linear-gradient(135deg, #facc15 0%, #ffffff 50%, #1d4ed8 100%)',
              boxShadow: `
                0 14px 24px rgba(76,29,149,0.22),
                0 6px 10px rgba(14,165,233,0.14),
                inset 0 3px 6px rgba(255,255,255,0.95),
                inset 0 -5px 8px rgba(2,132,199,0.18)
              `,
              transform: 'translateY(-2px)'
            }}
          />
        </div>
        <div className="dashboard-user-banner-content" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h2 className="dashboard-user-banner-name" style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#1d4ed8', margin: 0 }}>{user?.name}</h2>
          <div>
            <span
              style={{
                background: 'linear-gradient(145deg, #38bdf8, #1d4ed8)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '0.45rem 1.1rem',
                borderRadius: '9999px',
                letterSpacing: '0.5px',
                display: 'inline-block',
                boxShadow: `
                  0 10px 18px rgba(14,165,233,0.28),
                  0 4px 8px rgba(56,189,248,0.22),
                  inset 1px 1px 3px rgba(255,255,255,0.38),
                  inset -2px -3px 4px rgba(29,78,216,0.2)
                `,
                transform: 'translateY(-2px)'
              }}
            >
              {'Starter'}
            </span>
          </div>
        </div>
      </div>

      {/* 3D Earning Cards */}
      <div className="dashboard-stats-grid" style={{ display: 'grid', gap: '1.6rem' }}>
        {cardList.map((card, idx) => (
          <div
            key={idx}
            className={`${card.className} three-d-card dashboard-stat-card${idx === 0 ? ' dashboard-stat-card-featured' : ''}`}
            style={{
              borderRadius: '20px',
              padding: '1.8rem 1.5rem',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '130px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)',
              boxShadow: `8px 8px 16px rgba(0,0,0,0.15), -8px -8px 16px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(255,255,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.1)`,
              border: '1px solid rgba(255,255,255,0.3)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-14px)'; e.currentTarget.style.boxShadow = `12px 12px 24px rgba(0,0,0,0.2), -12px -12px 24px rgba(255,255,255,0.9), inset 3px 3px 6px rgba(255,255,255,0.7)`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `8px 8px 16px rgba(0,0,0,0.15), -8px -8px 16px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(255,255,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.1)`; }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = `4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.6), inset 4px 4px 8px rgba(0,0,0,0.2)`; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-14px)'; e.currentTarget.style.boxShadow = `12px 12px 24px rgba(0,0,0,0.2), -12px -12px 24px rgba(255,255,255,0.9), inset 3px 3px 6px rgba(255,255,255,0.7)`; }}
          >
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
              {getAbstractShapes(idx)}
            </div>

            <span className="dashboard-stat-amount" style={{ fontSize: '2.35rem', fontWeight: 800, color: 'white', textShadow: '0 3px 6px rgba(0,0,0,0.4)', zIndex: 2 }}>
              ₹{card.val.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.95)', marginTop: '0.4rem', letterSpacing: '0.6px', zIndex: 2 }}>
              {card.label}
            </span>
          </div>
        ))}
      </div>

      {/* 3D Graph Card with 3D Badge */}
      <div className="three-d-card graph-card" style={{
        padding: '2rem',
        borderRadius: '20px',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        boxShadow: `8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.85), inset 2px 2px 4px rgba(255,255,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.08)`,
        transition: 'all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)',
        cursor: 'default',
        border: '2px solid #1e293b'
      }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-12px)'; e.currentTarget.style.boxShadow = `14px 14px 28px rgba(0,0,0,0.18), -14px -14px 28px rgba(255,255,255,0.9), inset 3px 3px 6px rgba(255,255,255,0.7)`; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.85), inset 2px 2px 4px rgba(255,255,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.08)`; }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>7 Days Sales Graph</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Earning trend for the past calendar week</p>
          </div>

          {/* 3D Growth Positive Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: '#16a34a',
            fontSize: '0.85rem',
            fontWeight: 600,
            background: 'linear-gradient(145deg, #f0fdf4, #dcfce7)',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            boxShadow: `4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(0,0,0,0.1)`,
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.6)'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `6px 6px 12px rgba(0,0,0,0.2), -6px -6px 12px rgba(255,255,255,0.9), inset 3px 3px 5px rgba(255,255,255,0.9)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(0,0,0,0.1)`;
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(2px)';
              e.currentTarget.style.boxShadow = `2px 2px 4px rgba(0,0,0,0.2), inset 3px 3px 6px rgba(0,0,0,0.2)`;
            }}
          >
            <TrendingUp size={16} />
            Growth positive
          </div>
        </div>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.24}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: 'white' }} formatter={(value: any) => [`₹${value}`, 'Earning']} />
              <Area type="monotone" dataKey="amount" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .three-d-card { will-change: transform, box-shadow; }
      `}</style>
    </div>
  );
};

export default UserDashboard;
