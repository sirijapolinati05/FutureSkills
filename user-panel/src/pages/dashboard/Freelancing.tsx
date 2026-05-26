import React, { useMemo, useState } from 'react';
import { Search, BriefcaseBusiness, Users, FolderKanban, IndianRupee } from 'lucide-react';
import VideoEditingImg from '../../assets/Video-Editing.jpeg';
import FacebookAdsImg from '../../assets/Facebook-Ads.jpeg';
import GoogleAdsenseImg from '../../assets/Google-Adsense.jpeg';

type FreelanceProject = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  seatsLeft: number;
  projectsCount: number;
  payout: number;
};

export const Freelancing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedProjects, setAppliedProjects] = useState<string[]>([]);

  const projects: FreelanceProject[] = [
    {
      id: 'freelance-video-editing',
      title: 'Video Editing Client Project',
      category: 'Editing',
      image: VideoEditingImg,
      description: 'Reels, YouTube shorts, and promo cutdowns with hook-based edits for business creators.',
      seatsLeft: 2,
      projectsCount: 2,
      payout: 250,
    },
    {
      id: 'freelance-facebook-ads',
      title: 'Facebook Ads Setup Project',
      category: 'Marketing',
      image: FacebookAdsImg,
      description: 'Ad copy, campaign launch, audience testing, and creative coordination for local brands.',
      seatsLeft: 2,
      projectsCount: 2,
      payout: 200,
    },
    {
      id: 'freelance-google-adsense',
      title: 'Google Adsense Growth Project',
      category: 'Monetization',
      image: GoogleAdsenseImg,
      description: 'Website monetization support, ad placement optimization, and revenue tracking assistance.',
      seatsLeft: 2,
      projectsCount: 2,
      payout: 200,
    },
  ];

  const filteredProjects = useMemo(
    () => projects.filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase())),
    [projects, searchTerm]
  );

  const handleApply = (projectId: string) => {
    setAppliedProjects((prev) => (prev.includes(projectId) ? prev : [...prev, projectId]));
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    padding: '0.5rem 0.9rem',
    borderRadius: '999px',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#475569',
    background: 'linear-gradient(145deg, #f8fafc, #dbe4f0)',
    border: '1px solid #cbd5e1',
    boxShadow:
      '0 8px 14px -10px rgba(148,163,184,0.45), inset 2px 2px 4px rgba(255,255,255,0.95), inset -3px -4px 6px rgba(148,163,184,0.22)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>
          Freelancing Projects
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Modified UI lo active freelancing opportunities. Skills match ayye project ki direct ga apply cheyyachu.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '1rem 1.1rem',
          borderRadius: '18px',
          background: 'white',
          boxShadow: '0 18px 38px -18px rgba(15,23,42,0.22)',
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 320px' }}>
          <input
            type="text"
            placeholder="Search freelancing projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              height: '48px',
              borderRadius: '14px',
              border: '1px solid #dbe4f0',
              padding: '0 3rem 0 1rem',
              outline: 'none',
              background: '#f8fafc',
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.95), inset -2px -2px 4px rgba(148,163,184,0.18)',
              fontSize: '0.95rem',
              color: '#0f172a',
            }}
          />
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', right: '14px', top: '15px' }} />
        </div>

        <div style={{ ...badgeStyle, whiteSpace: 'nowrap' }}>
          <BriefcaseBusiness size={16} />
          {filteredProjects.length} Open Projects
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}
      >
        {filteredProjects.map((project) => {
          const hasApplied = appliedProjects.includes(project.id);

          return (
            <div
              key={project.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                overflow: 'hidden',
                background: 'white',
                border: hasApplied ? '2px solid #0ea5e9' : '1px solid #e2e8f0',
                borderRadius: '18px',
                boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.12)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                height: '100%',
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 30px 50px -12px rgb(0 0 0 / 0.18)';

                const img = card.querySelector('img') as HTMLImageElement | null;
                if (img) img.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 20px 40px -10px rgb(0 0 0 / 0.12)';

                const img = card.querySelector('img') as HTMLImageElement | null;
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
                    src={project.image}
                    alt={project.title}
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
                    background: 'linear-gradient(145deg, #c2410c, #fdba74)',
                    color: '#fff7ed',
                    border: '1px solid rgba(194, 65, 12, 0.45)',
                    boxShadow:
                      '7px 7px 14px rgba(124, 45, 18, 0.22), -3px -3px 8px rgba(255,255,255,0.36), inset 2px 2px 4px rgba(255,244,230,0.32), inset -3px -3px 6px rgba(124,45,18,0.16)',
                  }}
                >
                  {project.category}
                </span>
              </div>

              <div
                style={{
                  padding: '1.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontSize: '1.16rem',
                    fontWeight: 700,
                    lineHeight: '1.35',
                    color: '#1e293b',
                    margin: 0,
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.86rem',
                    color: '#64748b',
                    lineHeight: '1.55',
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={badgeStyle}>
                    <Users size={16} />
                    {project.seatsLeft} Seats Left
                  </div>
                  <div style={badgeStyle}>
                    <FolderKanban size={16} />
                    {project.projectsCount} Projects
                  </div>
                  <div style={badgeStyle}>
                    <IndianRupee size={16} />
                    {project.payout.toLocaleString('en-IN')} Per Project
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleApply(project.id)}
                  disabled={hasApplied}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: hasApplied ? '#cbd5e1' : 'linear-gradient(135deg, #0369a1, #0ea5e9)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: hasApplied ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: hasApplied
                      ? 'none'
                      : '0 6px 12px -3px rgb(3 105 161 / 0.4), inset 0 -2px 4px rgba(255,255,255,0.3)',
                    opacity: hasApplied ? 0.82 : 1,
                    marginTop: '0.2rem',
                  }}
                  onMouseEnter={(e) => {
                    if (!hasApplied) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 16px -4px rgb(3 105 161 / 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!hasApplied) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow =
                        '0 6px 12px -3px rgb(3 105 161 / 0.4), inset 0 -2px 4px rgba(255,255,255,0.3)';
                    }
                  }}
                >
                  {hasApplied ? 'Applied' : 'Apply Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Freelancing;
