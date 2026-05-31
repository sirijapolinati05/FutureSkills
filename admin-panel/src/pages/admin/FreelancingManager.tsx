import React, { useEffect, useState } from 'react';
import { FreelancingProject, localDb } from '../../db/localDb';

const imageOptions = ['video_editing', 'facebook_ads', 'google_adsense', 'future_skills'];

export const FreelancingManager: React.FC = () => {
  const [projects, setProjects] = useState<FreelancingProject[]>([]);
  const [form, setForm] = useState<FreelancingProject>({ id: '', title: '', category: '', imageKey: 'video_editing', description: '', seatsLeft: 2, projectsCount: 2, payout: 250, ctaLabel: 'Apply Now' });

  const refresh = () => setProjects(localDb.getFreelancingProjects());
  useEffect(() => { refresh(); }, []);

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    localDb.saveFreelancingProjects([...projects, { ...form, id: `freelancing-${Math.random().toString(36).slice(2, 9)}` }]);
    setForm({ id: '', title: '', category: '', imageKey: 'video_editing', description: '', seatsLeft: 2, projectsCount: 2, payout: 250, ctaLabel: 'Apply Now' });
    refresh();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }} className="admin-grid">
      <div className="admin-card" style={{ background: 'white' }}>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a', marginTop: 0 }}>Freelancing Projects</h2>
        <p style={{ fontSize: '0.9rem', color: '#475569' }}>Freelancing tab project cards, badges, payouts ni ikkada update cheyyachu.</p>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>Project</th><th>Seats</th><th>Payout</th><th /></tr></thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td><strong>{project.title}</strong><div style={{ fontSize: '0.75rem', color: '#64748b' }}>{project.category} | {project.imageKey}</div></td>
                  <td>{project.seatsLeft} seats / {project.projectsCount} projects</td>
                  <td>Rs.{project.payout}</td>
                  <td style={{ textAlign: 'right' }}><button className="admin-btn admin-btn-danger" onClick={() => { localDb.saveFreelancingProjects(projects.filter((item) => item.id !== project.id)); refresh(); }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form onSubmit={addProject} className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0 }}>Add Freelancing Card</h3>
        <input className="admin-form-input" placeholder="Project title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input className="admin-form-input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <select className="admin-form-input" value={form.imageKey} onChange={(e) => setForm({ ...form, imageKey: e.target.value })}>{imageOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select>
        <textarea className="admin-form-input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ minHeight: '90px' }} required />
        <input className="admin-form-input" type="number" placeholder="Seats left" value={form.seatsLeft} onChange={(e) => setForm({ ...form, seatsLeft: Number(e.target.value) })} />
        <input className="admin-form-input" type="number" placeholder="Projects count" value={form.projectsCount} onChange={(e) => setForm({ ...form, projectsCount: Number(e.target.value) })} />
        <input className="admin-form-input" type="number" placeholder="Payout" value={form.payout} onChange={(e) => setForm({ ...form, payout: Number(e.target.value) })} />
        <input className="admin-form-input" placeholder="CTA Label" value={form.ctaLabel} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })} />
        <button type="submit" className="admin-btn admin-btn-primary">Add Project</button>
      </form>
      <style>{`@media (max-width: 960px) { .admin-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};
