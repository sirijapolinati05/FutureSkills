import React, { useEffect, useState } from 'react';
import { Play, BookOpen, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Course, getPackageLevel, localDb } from '../../db/localDb';
import { getDashboardImage } from '../../lib/dashboardAssets';

export const Training: React.FC = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState<Course[]>([]);
  const [activeVideo, setActiveVideo] = useState<Course | null>(null);

  useEffect(() => {
    setVideos(localDb.getTraining());
  }, []);

  const userPkgLevel = getPackageLevel(user?.packageName || 'Classic Package');
  const checkAccess = (requiredPkg: string): boolean => user?.role === 'admin' || userPkgLevel >= getPackageLevel(requiredPkg);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Training Library</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Admin panel lo publish chesina training cards ikkada render avtayi.</p>
      </div>

      {activeVideo && (
        <div className="card" style={{ backgroundColor: '#0f172a', color: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <h3 style={{ color: 'white', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Now Playing: {activeVideo.title}</h3>
            <button onClick={() => setActiveVideo(null)} style={{ background: '#334155', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
              Close Player
            </button>
          </div>
          <div style={{ position: 'relative', paddingTop: '56.25%', background: 'black', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe src={activeVideo.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'} title={activeVideo.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} allowFullScreen />
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '1rem' }}>{activeVideo.description}</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {videos.map((video) => {
          const hasAccess = checkAccess(video.requiredPackage);

          return (
            <div key={video.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', background: 'white', border: hasAccess ? '1px solid #e2e8f0' : '1px solid #fed7aa', borderRadius: '18px', boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.12)', height: '100%' }}>
              <div style={{ position: 'relative', height: '190px', overflow: 'hidden', background: '#f8fafc', borderRadius: '18px 18px 0 0', padding: '0.8rem 0.8rem 0.3rem' }}>
                <div style={{ background: 'white', width: '100%', height: '100%', borderRadius: '14px', border: '3px solid #f1f5f9', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
                  <img src={video.thumbnail || getDashboardImage(video.imageKey)} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>

              <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '0.9rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: '1.35', color: '#1e293b' }}>{video.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', flex: 1, lineHeight: '1.5' }}>{video.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '0.8rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '0.9rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><BookOpen size={15} /> {video.lessonsCount} Lessons</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Clock size={15} /> {video.duration}</span>
                </div>

                {hasAccess ? (
                  <button onClick={() => setActiveVideo(video)} style={{ marginTop: '0.8rem', width: '100%', padding: '14px', fontSize: '1rem', fontWeight: 600, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #0369a1, #0ea5e9)', color: 'white', border: 'none', cursor: 'pointer' }}>
                    <Play size={18} fill="white" />
                    View Course
                  </button>
                ) : (
                  <button type="button" style={{ marginTop: '0.8rem', width: '100%', padding: '14px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, background: '#f8fafc', color: '#475569' }}>
                    Upgrade Package to Unlock
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Training;
