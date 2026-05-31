import React, { useEffect, useState } from 'react';
import { CommunityLink, localDb } from '../../db/localDb';

const iconOptions = ['whatsapp', 'instagram', 'facebook', 'telegram', 'youtube', 'linkedin', 'threads', 'twitter'];

export const CommunityLinksManager: React.FC = () => {
  const [links, setLinks] = useState<CommunityLink[]>([]);
  const [form, setForm] = useState<CommunityLink>({ id: '', name: '', label: '', url: '', iconKey: 'whatsapp' });

  const refresh = () => setLinks(localDb.getCommunityLinks());
  useEffect(() => { refresh(); }, []);

  const addLink = (e: React.FormEvent) => {
    e.preventDefault();
    localDb.saveCommunityLinks([...links, { ...form, id: `community-${Math.random().toString(36).slice(2, 9)}` }]);
    setForm({ id: '', name: '', label: '', url: '', iconKey: 'whatsapp' });
    refresh();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }} className="admin-grid">
      <div className="admin-card" style={{ background: 'white' }}>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a', marginTop: 0 }}>Community Links</h2>
        <p style={{ fontSize: '0.9rem', color: '#475569' }}>Community tab lo kanipinche social cards ni ikkada manage cheyyachu.</p>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Label</th><th>Icon</th><th>URL</th><th /></tr></thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id}>
                  <td>{link.name}</td>
                  <td>{link.label}</td>
                  <td>{link.iconKey}</td>
                  <td>{link.url}</td>
                  <td style={{ textAlign: 'right' }}><button className="admin-btn admin-btn-danger" onClick={() => { localDb.saveCommunityLinks(links.filter((item) => item.id !== link.id)); refresh(); }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form onSubmit={addLink} className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0 }}>Add Community Card</h3>
        <input className="admin-form-input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="admin-form-input" placeholder="Label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required />
        <input className="admin-form-input" placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required />
        <select className="admin-form-input" value={form.iconKey} onChange={(e) => setForm({ ...form, iconKey: e.target.value })}>{iconOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select>
        <button type="submit" className="admin-btn admin-btn-primary">Add Link</button>
      </form>
      <style>{`@media (max-width: 960px) { .admin-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};
