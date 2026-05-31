import React, { useState, useEffect } from 'react';
import { localDb, TrainingVideo } from '../../db/localDb';

const imageOptions = ['video_editing', 'facebook_ads', 'google_adsense'];

export const TrainingManager: React.FC = () => {
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  const [form, setForm] = useState<TrainingVideo>({ id: '', title: '', category: 'Design', thumbnail: '', duration: '', lessonsCount: 8, requiredPackage: 'Classic Package', description: '', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', imageKey: 'video_editing' });
  const packages = localDb.getPackages().map((pkg) => pkg.name);

  const fetchVideos = () => setVideos(localDb.getTraining());
  useEffect(() => { fetchVideos(); }, []);

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    localDb.saveTraining([...videos, { ...form, id: 't-' + Math.random().toString(36).substr(2, 9) }]);
    setForm({ id: '', title: '', category: 'Design', thumbnail: '', duration: '', lessonsCount: 8, requiredPackage: 'Classic Package', description: '', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', imageKey: 'video_editing' });
    fetchVideos();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }} className="admin-grid">
      <div className="admin-card" style={{ background: 'white' }}>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a', marginTop: 0 }}>Training Library Manager</h2>
        <p style={{ fontSize: '0.9rem', color: '#475569' }}>Training tab cards and access tiers ni manage cheyyachu.</p>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>Video Details</th><th>Tier</th><th>Asset</th><th /></tr></thead>
            <tbody>
              {videos.map((vid) => (
                <tr key={vid.id}>
                  <td><strong>{vid.title}</strong><div style={{ fontSize: '0.75rem', color: '#64748b' }}>{vid.duration} | {vid.lessonsCount} lessons</div></td>
                  <td>{vid.requiredPackage}</td>
                  <td>{vid.imageKey}</td>
                  <td style={{ textAlign: 'right' }}><button className="admin-btn admin-btn-danger" onClick={() => { localDb.saveTraining(videos.filter((item) => item.id !== vid.id)); fetchVideos(); }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form onSubmit={handleAddVideo} className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0 }}>Add Training Card</h3>
        <input className="admin-form-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input className="admin-form-input" placeholder="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required />
        <input className="admin-form-input" type="number" placeholder="Lessons" value={form.lessonsCount} onChange={(e) => setForm({ ...form, lessonsCount: Number(e.target.value) })} />
        <select className="admin-form-input" value={form.requiredPackage} onChange={(e) => setForm({ ...form, requiredPackage: e.target.value })}>{packages.map((pkg) => <option key={pkg} value={pkg}>{pkg}</option>)}</select>
        <select className="admin-form-input" value={form.imageKey} onChange={(e) => setForm({ ...form, imageKey: e.target.value })}>{imageOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select>
        <textarea className="admin-form-input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ minHeight: '90px' }} required />
        <button type="submit" className="admin-btn admin-btn-primary">Publish Video</button>
      </form>
      <style>{`@media (max-width: 900px) { .admin-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};
