import React, { useEffect, useState } from 'react';
import { Play, BookOpen, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Course } from '../../db/localDb';
import VideoEditingImg from '../../assets/Video-Editing.jpeg';
import FacebookAdsImg from '../../assets/Facebook-Ads.jpeg';
import GoogleAdsenseImg from '../../assets/Google-Adsense.jpeg';

export const Training: React.FC = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState<Course[]>([]);
  const [activeVideo, setActiveVideo] = useState<Course | null>(null);

  const trainingCourses: Course[] = [
    {
      id: 'training-video-editing',
      title: 'Video Editing Training Camp',
      category: 'Design',
      thumbnail: VideoEditingImg,
      duration: '6h 20m',
      lessonsCount: 10,
      requiredPackage: 'Classic Package',
      description: 'Hooks, captions, transitions, and export flow with practical editing assignments.',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 'training-facebook-ads',
      title: 'Facebook Ads Practical Training',
      category: 'Marketing',
      thumbnail: FacebookAdsImg,
      duration: '8h 10m',
      lessonsCount: 14,
      requiredPackage: 'Heroic Package',
      description: 'Campaign structure, ad set testing, budget control, and real lead generation tactics.',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 'training-google-adsense',
      title: 'Google Adsense Live Training',
      category: 'Business',
      thumbnail: GoogleAdsenseImg,
      duration: '5h 45m',
      lessonsCount: 9,
      requiredPackage: 'Prime Package',
      description: 'Adsense approval, content monetization, CTR growth, and revenue-safe optimization methods.',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  ];

  useEffect(() => {
    setVideos(trainingCourses);
  }, []);

  const getPackageLevel = (pkgName: string): number => {
    const levels: Record<string, number> = {
      'Classic Package': 1,
      Classic: 1,
      'Heroic Package': 2,
      Heroic: 2,
      'Prime Package': 3,
      Prime: 3,
      'Crystal Package': 4,
      Crystal: 4,
      'Platinum Package': 5,
      Platinum: 5,
      'Premium Package': 6,
      Premium: 6,
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
      Design: {
        background: 'linear-gradient(145deg, #c2410c, #fdba74)',
        color: '#fff7ed',
        border: '1px solid rgba(194, 65, 12, 0.45)',
        boxShadow:
          '7px 7px 14px rgba(124, 45, 18, 0.22), -3px -3px 8px rgba(255,255,255,0.36), inset 2px 2px 4px rgba(255,244,230,0.32), inset -3px -3px 6px rgba(124,45,18,0.16)',
      },
      Marketing: {
        background: 'linear-gradient(145deg, #c2410c, #fdba74)',
        color: '#fff7ed',
        border: '1px solid rgba(194, 65, 12, 0.45)',
        boxShadow:
          '7px 7px 14px rgba(124, 45, 18, 0.22), -3px -3px 8px rgba(255,255,255,0.36), inset 2px 2px 4px rgba(255,244,230,0.32), inset -3px -3px 6px rgba(124,45,18,0.16)',
      },
      Business: {
        background: 'linear-gradient(145deg, #c2410c, #fdba74)',
        color: '#fff7ed',
        border: '1px solid rgba(194, 65, 12, 0.45)',
        boxShadow:
          '7px 7px 14px rgba(124, 45, 18, 0.22), -3px -3px 8px rgba(255,255,255,0.36), inset 2px 2px 4px rgba(255,244,230,0.32), inset -3px -3px 6px rgba(124,45,18,0.16)',
      },
    };

    return styles[category] || styles.Business;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>
          Training Library
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          My Courses style lo curated training cards with package-based access.
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: 'white', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
              Now Playing: {activeVideo.title}
            </h3>
            <button
              onClick={() => setActiveVideo(null)}
              style={{
                background: '#334155',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Close Player
            </button>
          </div>

          <div
            style={{
              position: 'relative',
              paddingTop: '56.25%',
              background: 'black',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <iframe
              src={activeVideo.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
              title={activeVideo.title}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
            />
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '1rem' }}>{activeVideo.description}</p>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {videos.map((video) => {
          const hasAccess = checkAccess(video.requiredPackage);

          return (
            <div
              key={video.id}
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
                cursor: hasAccess ? 'pointer' : 'default',
                position: 'relative',
                height: '100%',
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 30px 50px -12px rgb(0 0 0 / 0.18)';

                const img = card.querySelector('img') as HTMLImageElement;
                if (img) img.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 20px 40px -10px rgb(0 0 0 / 0.12)';

                const img = card.querySelector('img') as HTMLImageElement;
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              <div
                style={{
                  position: 'relative',
                  height: '190px',
                  overflow: 'hidden',
                  background: '#f8fafc',
                  borderRadius: '18px 18px 0 0',
                  padding: '0.8rem 0.8rem 0.3rem',
                }}
              >
                <div
                  style={{
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    borderRadius: '14px',
                    border: '3px solid #f1f5f9',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      display: 'block',
                    }}
                  />
                </div>

                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    padding: '0.42rem 0.88rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.01em',
                    ...getCategoryStyle(video.category),
                  }}
                >
                  {video.category}
                </span>
              </div>

              <div
                style={{
                  padding: '1.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.9rem',
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    lineHeight: '1.35',
                    color: '#1e293b',
                  }}
                >
                  {video.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    flex: 1,
                    lineHeight: '1.5',
                  }}
                >
                  {video.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                    fontSize: '0.8rem',
                    color: '#64748b',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '0.9rem',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <BookOpen size={15} /> {video.lessonsCount} Lessons
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={15} /> {video.duration}
                  </span>
                </div>

                {hasAccess ? (
                  <button
                    onClick={() => setActiveVideo(video)}
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
                      transition: 'all 0.3s ease',
                      boxShadow: '0 6px 12px -3px rgb(3 105 161 / 0.4), inset 0 -2px 4px rgba(255,255,255,0.3)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 16px -4px rgb(3 105 161 / 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow =
                        '0 6px 12px -3px rgb(3 105 161 / 0.4), inset 0 -2px 4px rgba(255,255,255,0.3)';
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
                      textAlign: 'center',
                      border: '1px solid #cbd5e1',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      background: '#f8fafc',
                      color: '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(148,163,184,0.14)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow =
                        '0 6px 12px -10px rgba(15,23,42,0.2), inset 2px 2px 4px rgba(255,255,255,0.95)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow =
                        'inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(148,163,184,0.14)';
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

export default Training;
