import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { localDb, TeamMember } from '../../db/localDb';
import { Star, ArrowRight, ArrowUpCircle, Users, Award, Calendar, Video, Gift, TrendingUp, Search, IndianRupee } from 'lucide-react';

// ==================== TRAINING SCREEN ====================
export const Training: React.FC = () => {
  const [videos, setVideos] = useState<{id: string; title: string; duration: string; desc: string}[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const data = localDb.getTraining();
    setVideos(data);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Training Library</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Master affiliate strategies, sales closing, and marketing techniques with our curated training recordings.</p>
      </div>

      {videos.length === 0 ? (
        <div className="card" style={{ background: 'white', padding: '2rem', textAlign: 'center', color: '#64748b' }}>
          <Video size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
          <p>No training videos available yet. Check back soon!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {videos.map((vid) => (
            <div key={vid.id} className="card card-hover" style={{
              background: 'white',
              padding: 0,
              overflow: 'hidden',
              borderRadius: '12px',
              border: activeVideo === vid.id ? '2px solid #0ea5e9' : '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Video thumbnail area */}
              <div
                onClick={() => setActiveVideo(activeVideo === vid.id ? null : vid.id)}
                style={{
                  height: '120px',
                  background: 'linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(8px)'
                }}>
                  <Video size={24} color="white" />
                </div>
                <span style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '10px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  background: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  padding: '0.15rem 0.4rem',
                  borderRadius: '4px'
                }}>
                  {vid.duration}
                </span>
              </div>

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#0f172a', margin: 0 }}>{vid.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: '1.4', margin: 0, flex: 1 }}>{vid.desc}</p>
                <button
                  onClick={() => setActiveVideo(activeVideo === vid.id ? null : vid.id)}
                  className="btn btn-outline"
                  style={{ marginTop: '0.5rem', padding: '0.5rem', fontSize: '0.8rem', width: '100%' }}
                >
                  {activeVideo === vid.id ? 'Close Preview' : 'Watch Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

