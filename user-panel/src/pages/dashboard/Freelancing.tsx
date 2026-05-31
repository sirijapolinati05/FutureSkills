import React, { useMemo, useState } from 'react';
import { Search, BriefcaseBusiness, Users, FolderKanban, IndianRupee } from 'lucide-react';
import { localDb } from '../../db/localDb';
import { getDashboardImage } from '../../lib/dashboardAssets';

export const Freelancing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedProjects, setAppliedProjects] = useState<string[]>([]);
  const projects = localDb.getFreelancingProjects();

  const filteredProjects = useMemo(() => projects.filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase())), [projects, searchTerm]);
  const handleApply = (projectId: string) => setAppliedProjects((prev) => (prev.includes(projectId) ? prev : [...prev, projectId]));

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
    boxShadow: '0 8px 14px -10px rgba(148,163,184,0.45), inset 2px 2px 4px rgba(255,255,255,0.95), inset -3px -4px 6px rgba(148,163,184,0.22)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Freelancing Projects</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Admin panel lo manage chese freelancing cards ikkada automatic ga render avtayi.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', padding: '1rem 1.1rem', borderRadius: '18px', background: 'white', boxShadow: '0 18px 38px -18px rgba(15,23,42,0.22)' }}>
        <div style={{ position: 'relative', flex: '1 1 320px' }}>
          <input type="text" placeholder="Search freelancing projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', height: '48px', borderRadius: '14px', border: '1px solid #dbe4f0', padding: '0 3rem 0 1rem', outline: 'none', background: '#f8fafc' }} />
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', right: '14px', top: '15px' }} />
        </div>
        <div style={{ ...badgeStyle, whiteSpace: 'nowrap' }}><BriefcaseBusiness size={16} />{filteredProjects.length} Open Projects</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {filteredProjects.map((project) => {
          const hasApplied = appliedProjects.includes(project.id);

          return (
            <div key={project.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', background: 'white', border: hasApplied ? '2px solid #0ea5e9' : '1px solid #e2e8f0', borderRadius: '18px', boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.12)', height: '100%' }}>
              <div style={{ position: 'relative', height: '190px', overflow: 'hidden', background: '#f8fafc', borderRadius: '18px 18px 0 0', padding: '0.8rem 0.8rem 0.3rem' }}>
                <div style={{ background: 'white', width: '100%', height: '100%', borderRadius: '14px', border: '3px solid #f1f5f9', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
                  <img src={getDashboardImage(project.imageKey)} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <span style={{ position: 'absolute', top: '16px', left: '16px', padding: '0.42rem 0.88rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, background: 'linear-gradient(145deg, #c2410c, #fdba74)', color: '#fff7ed' }}>{project.category}</span>
              </div>

              <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.16rem', fontWeight: 700, lineHeight: '1.35', color: '#1e293b', margin: 0 }}>{project.title}</h3>
                <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: '1.55', margin: 0, flex: 1 }}>{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={badgeStyle}><Users size={16} />{project.seatsLeft} Seats Left</div>
                  <div style={badgeStyle}><FolderKanban size={16} />{project.projectsCount} Projects</div>
                  <div style={badgeStyle}><IndianRupee size={16} />{project.payout.toLocaleString('en-IN')} Per Project</div>
                </div>
                <button type="button" onClick={() => handleApply(project.id)} disabled={hasApplied} style={{ width: '100%', padding: '14px', background: hasApplied ? '#cbd5e1' : 'linear-gradient(135deg, #0369a1, #0ea5e9)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', cursor: hasApplied ? 'not-allowed' : 'pointer', opacity: hasApplied ? 0.82 : 1 }}>
                  {hasApplied ? 'Applied' : project.ctaLabel || 'Apply Now'}
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
