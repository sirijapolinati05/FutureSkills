import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { localDb, Course, getPackageLevel } from '../../db/localDb';
import { Play, BookOpen, Clock } from 'lucide-react';
import { getDashboardImage } from '../../lib/dashboardAssets';

export const MyCourses: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeVideo, setActiveVideo] = useState<Course | null>(null);

  useEffect(() => {
    setCourses(localDb.getCourses());
  }, []);

  const userPkgLevel = getPackageLevel(user?.packageName || 'Classic Package');

  const checkAccess = (requiredPkg: string): boolean => {
    if (user?.role === 'admin') return true;
    return userPkgLevel >= getPackageLevel(requiredPkg);
  };

  const getCategoryStyle = (category: string) => ({
    background: 'linear-gradient(145deg, #c2410c, #fdba74)',
    color: '#fff7ed',
    border: '1px solid rgba(194, 65, 12, 0.45)',
    boxShadow:
      '7px 7px 14px rgba(124, 45, 18, 0.22), -3px -3px 8px rgba(255,255,255,0.36), inset 2px 2px 4px rgba(255,244,230,0.32), inset -3px -3px 6px rgba(124,45,18,0.16)',
    textTransform: 'capitalize' as const,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>My Courses</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Admin panel lo add chesina courses ikkada direct ga load avtayi.
        </p>
      </div>

      {activeVideo && (
        <div
          className="card"
          style={{
            backgroundColor: '#0f172a',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
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
              src={activeVideo.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
              title={activeVideo.title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
            />
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '1rem' }}>{activeVideo.description}</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {courses.map((course) => {
          const hasAccess = checkAccess(course.requiredPackage);

          return (
            <div
              key={course.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                overflow: 'hidden',
                background: 'white',
                border: hasAccess ? '1px solid #e2e8f0' : '1px solid #fed7aa',
                borderRadius: '18px',
                boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.12)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                height: '100%',
              }}
            >
              <div style={{ position: 'relative', height: '190px', overflow: 'hidden', background: '#f8fafc', borderRadius: '18px 18px 0 0', padding: '0.8rem 0.8rem 0.3rem' }}>
                <div style={{ background: 'white', width: '100%', height: '100%', borderRadius: '14px', border: '3px solid #f1f5f9', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
                  <img
                    src={course.thumbnail || getDashboardImage(course.imageKey)}
                    alt={course.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                <span style={{ position: 'absolute', top: '16px', left: '16px', padding: '0.42rem 0.88rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap', letterSpacing: '0.01em', ...getCategoryStyle(course.category) }}>
                  {course.category}
                </span>
              </div>

              <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '0.9rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: '1.35', color: '#1e293b' }}>{course.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', flex: 1, lineHeight: '1.5' }}>{course.description}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '0.8rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '0.9rem' }}>
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
                      padding: '14px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      background: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 6px 12px -3px rgb(3 105 161 / 0.4), inset 0 -2px 4px rgba(255,255,255,0.3)',
                    }}
                  >
                    <Play size={18} fill="white" />
                    View Course
                  </button>
                ) : (
                  <button
                    type="button"
                    style={{
                      marginTop: '0.8rem',
                      width: '100%',
                      padding: '14px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      background: '#f8fafc',
                      color: '#475569',
                      boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(148,163,184,0.14)',
                    }}
                  >
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

export default MyCourses;
