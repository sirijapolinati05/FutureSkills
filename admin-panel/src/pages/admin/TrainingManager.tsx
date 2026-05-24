import React, { useState, useEffect } from 'react';
import { localDb, TrainingVideo } from '../../db/localDb';
import { Plus, Video, Trash2 } from 'lucide-react';

export const TrainingManager: React.FC = () => {
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  
  // Form State
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [desc, setDesc] = useState('');

  const fetchVideos = () => {
    setVideos(localDb.getTraining());
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !duration || !desc) {
      alert('Please fill out all required fields.');
      return;
    }

    const newVideo: TrainingVideo = {
      id: 't-' + Math.random().toString(36).substr(2, 9),
      title,
      duration,
      desc
    };

    const updated = [...videos, newVideo];
    localDb.saveTraining(updated);
    fetchVideos();

    // Reset Form
    setTitle('');
    setDuration('');
    setDesc('');
    alert('Training Video Added to Library Successfully!');
  };

  const handleDeleteVideo = (id: string) => {
    if (window.confirm('Are you sure you want to remove this video from library?')) {
      const updated = videos.filter(v => v.id !== id);
      localDb.saveTraining(updated);
      fetchVideos();
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }} className="admin-grid">
      {/* List Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a' }}>Training Library Manager</h2>
          <p style={{ fontSize: '0.9rem', color: '#475569' }}>Manage and update training recordings available for affiliates to watch.</p>
        </div>

        <div className="admin-card" style={{ background: 'white', padding: '1.5rem' }}>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Video Details</th>
                  <th>Duration</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                      No training videos found in the database.
                    </td>
                  </tr>
                ) : (
                  videos.map((vid) => (
                    <tr key={vid.id}>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                          <Video size={18} color="#64748b" style={{ marginTop: '3px' }} />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0f172a' }}>{vid.title}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>{vid.desc}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4f46e5' }}>
                          {vid.duration}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteVideo(vid.id)}
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
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit' }}>Add Video to Library</h3>

        <form onSubmit={handleAddVideo} className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Video Title *</label>
            <input
              type="text"
              placeholder="e.g. Masterclass Closing High Ticket Clients"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Duration *</label>
            <input
              type="text"
              placeholder="e.g. 1 hr 15 mins"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Video Description *</label>
            <textarea
              placeholder="Provide a short overview of what affiliates learn..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="admin-form-input"
              style={{ minHeight: '80px', resize: 'vertical' }}
              required
            />
          </div>

          <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.625rem', display: 'flex', justifyContent: 'center' }}>
            <Plus size={16} />
            Publish Video
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
