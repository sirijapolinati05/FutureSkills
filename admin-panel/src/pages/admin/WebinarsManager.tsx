import React, { useState, useEffect } from 'react';
import { localDb, Webinar } from '../../db/localDb';
import { Plus, Calendar, Trash2 } from 'lucide-react';

export const WebinarsManager: React.FC = () => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  
  // Form State
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [time, setTime] = useState('');
  const [url, setUrl] = useState('#');

  const fetchWebinars = () => {
    setWebinars(localDb.getWebinars());
  };

  useEffect(() => {
    fetchWebinars();
  }, []);

  const handleAddWebinar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !speaker || !time) {
      alert('Please fill out all required fields.');
      return;
    }

    const newWebinar: Webinar = {
      id: 'web-' + Math.random().toString(36).substr(2, 9),
      title,
      speaker,
      time,
      url: url || '#'
    };

    const updated = [...webinars, newWebinar];
    localDb.saveWebinars(updated);
    fetchWebinars();

    // Reset Form
    setTitle('');
    setSpeaker('');
    setTime('');
    setUrl('#');
    alert('Webinar Scheduled and Published Successfully!');
  };

  const handleDeleteWebinar = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this webinar schedule?')) {
      const updated = webinars.filter(w => w.id !== id);
      localDb.saveWebinars(updated);
      fetchWebinars();
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }} className="admin-grid">
      {/* List Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a' }}>Live Webinars Scheduler</h2>
          <p style={{ fontSize: '0.9rem', color: '#475569' }}>Schedule weekly Q&A workshops and strategy meetings for your affiliates.</p>
        </div>

        <div className="admin-card" style={{ background: 'white', padding: '1.5rem' }}>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Topic &amp; Host Info</th>
                  <th>Schedule Time</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {webinars.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                      No webinars currently scheduled.
                    </td>
                  </tr>
                ) : (
                  webinars.map((web) => (
                    <tr key={web.id}>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                          <Calendar size={18} color="#64748b" style={{ marginTop: '3px' }} />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0f172a' }}>{web.title}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 0 }}>Host: {web.speaker}</div>
                            {web.url !== '#' && <div style={{ fontSize: '0.75rem', color: '#2563eb', textDecoration: 'underline' }}>{web.url}</div>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, backgroundColor: '#f0fdf4', color: '#16a34a', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          {web.time}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteWebinar(web.id)}
                          className="admin-btn admin-btn-danger"
                          style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit' }}>Schedule Live Webinar</h3>

        <form onSubmit={handleAddWebinar} className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Webinar Topic *</label>
            <input
              type="text"
              placeholder="e.g. Weekly Commission Boosting Frameworks"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Host Name / Speaker *</label>
            <input
              type="text"
              placeholder="e.g. Mamidala Sujith"
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Webinar Date &amp; Time *</label>
            <input
              type="text"
              placeholder="e.g. Sunday at 7:00 PM IST"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Join Link URL</label>
            <input
              type="text"
              placeholder="e.g. https://zoom.us/j/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="admin-form-input"
            />
          </div>

          <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.625rem', display: 'flex', justifyContent: 'center' }}>
            <Plus size={16} />
            Schedule &amp; Broadcast
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
