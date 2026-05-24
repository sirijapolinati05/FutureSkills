import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { localDb, Course } from '../../db/localDb';
import { Play, Lock, BookOpen, Clock, AlertTriangle } from 'lucide-react';

export const MyCourses: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeVideo, setActiveVideo] = useState<Course | null>(null);

  useEffect(() => {
    setCourses(localDb.getCourses());
  }, []);

  const getPackageLevel = (pkgName: string): number => {
    const levels: Record<string, number> = {
      'Classic Package': 1,
      'Heroic Package': 2,
      'Prime Package': 3,
      'Crystal Package': 4,
      'Platinum Package': 5,
      'Premium Package': 6,
    };
    return levels[pkgName] || 0;
  };

  const userPkgLevel = getPackageLevel(user?.packageName || 'Classic Package');

  const checkAccess = (requiredPkg: string): boolean => {
    if (user?.role === 'admin') return true;
    return userPkgLevel >= getPackageLevel(requiredPkg);
  };

  const getCategoryStyle = (category: string) => {
    const styles: Record<string, React.CSSProperties> = {
      Design: { background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', color: 'white' },
      Development: { background: 'linear-gradient(135deg, #0284c8, #22d3ee)', color: 'white' },
      Marketing: { background: 'linear-gradient(135deg, #0c4a6e, #22d3ee)', color: 'white' },
      Business: { background: 'linear-gradient(135deg, #0369a1, #67e8f9)', color: 'white' },
    };
    return styles[category] || { background: 'linear-gradient(135deg, #0ea5e9, #67e8f9)', color: 'white' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>My Courses</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Access your enrolled learning content. Higher packages unlock more advanced Masterclasses.
        </p>
      </div>

      {/* Video Player */}
      {activeVideo && (
        <div className="card" style={{
          backgroundColor: '#0f172a', color: 'white', padding: '1.5rem',
          borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: 'white', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
              Now Playing: {activeVideo.title}
            </h3>
            <button 
              onClick={() => setActiveVideo(null)}
              style={{ background: '#334155', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
            >
              Close Player
            </button>
          </div>
          
          <div style={{ position: 'relative', paddingTop: '56.25%', background: 'black', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              src={activeVideo.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"}
              title={activeVideo.title}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
            />
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '1rem' }}>{activeVideo.description}</p>
        </div>
      )}

      {/* Courses Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem'
      }}>
        {courses.map((course) => {
          const hasAccess = checkAccess(course.requiredPackage);
          
          return (
            <div
              key={course.id}
              className="card"
              style={{
                padding: 0,
                overflow: 'hidden',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: hasAccess ? 'pointer' : 'default',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.transform = hasAccess ? 'translateY(-12px) scale(1.04)' : 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = hasAccess
                  ? '0 25px 50px -12px rgba(14, 165, 233, 0.3), 0 20px 40px -10px rgba(0,0,0,0.2)'
                  : '0 22px 40px -12px rgba(251, 146, 60, 0.28), 0 16px 30px -10px rgba(15,23,42,0.18)';

                const img = card.querySelector('img') as HTMLImageElement;
                if (img) img.style.transform = hasAccess ? 'scale(1.1)' : 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)';
                
                const img = card.querySelector('img') as HTMLImageElement;
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Image Section */}
              <div style={{
                position: 'relative',
                height: '200px',
                overflow: 'hidden',
                background: '#f8fafc'
              }}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                />

                {/* Locked Overlay */}
                {!hasAccess && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.78)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    gap: '0.6rem',
                  }}>
                    <Lock size={32} color="#f59e0b" />
                    <span style={{ fontSize: '1rem', fontWeight: 700 }}>Locked Content</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>Requires {course.requiredPackage}</span>
                  </div>
                )}

                {/* Category Badge */}
                <span style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 15px rgba(14, 165, 233, 0.25)',
                  backdropFilter: 'blur(6px)',
                  ...getCategoryStyle(course.category)
                }}>
                  {course.category}
                </span>
              </div>

              {/* Content Section */}
              <div style={{ 
                padding: '1.6rem', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.9rem', 
                flex: 1 
              }}>
                <h3 style={{ 
                  fontSize: '1.15rem', 
                  fontWeight: 700, 
                  lineHeight: '1.35',
                  color: '#1e293b'
                }}>
                  {course.title}
                </h3>
                
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: '#64748b', 
                  flex: 1,
                  lineHeight: '1.5'
                }}>
                  {course.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  fontSize: '0.8rem',
                  color: '#64748b',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '0.9rem',
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <BookOpen size={15} /> {course.lessonsCount} Lessons
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={15} /> {course.duration}
                  </span>
                </div>

                {hasAccess ? (
                  <button
                    onClick={() => setActiveVideo(course)}
                    style={{
                      marginTop: '0.8rem',
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 10px 20px -10px rgba(14,165,233,0.45)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 16px 26px -12px rgba(14,165,233,0.55)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 20px -10px rgba(14,165,233,0.45)';
                    }}
                  >
                    <Play size={18} fill="white" />
                    Start Learning
                  </button>
                ) : (
                  <div style={{
                    marginTop: '0.8rem',
                    padding: '1rem 1.15rem',
                    textAlign: 'center',
                    border: '2px dashed #fb923c',
                    borderRadius: '14px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    background: 'linear-gradient(145deg, #fef3c7 0%, #fed7aa 100%)',
                    color: '#c2410c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 18px 30px -16px rgba(251,146,60,0.56), 8px 8px 16px rgba(194,65,12,0.18), -5px -5px 12px rgba(255,255,255,0.55), inset 2px 2px 5px rgba(255,255,255,0.48)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
                    e.currentTarget.style.boxShadow = '0 24px 36px -18px rgba(251,146,60,0.62), 10px 10px 18px rgba(194,65,12,0.2), -6px -6px 14px rgba(255,255,255,0.58), inset 2px 2px 5px rgba(255,255,255,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 18px 30px -16px rgba(251,146,60,0.56), 8px 8px 16px rgba(194,65,12,0.18), -5px -5px 12px rgba(255,255,255,0.55), inset 2px 2px 5px rgba(255,255,255,0.48)';
                  }}>
                    <AlertTriangle size={18} color="#ea580c" />
                    Upgrade Package to Unlock
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourses;
