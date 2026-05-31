import React, { useState, useEffect } from 'react';
import { localDb, Webinar } from '../../db/localDb';
import { Calendar } from 'lucide-react';

export const Webinars: React.FC = () => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);

  useEffect(() => {
    setWebinars(localDb.getWebinars());
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Upcoming Webinars</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Admin panel lo schedule chesina webinars ikkada live ga load avtayi.</p>
      </div>

      {webinars.length === 0 ? (
        <div className="card" style={{ background: 'white', padding: '2rem', textAlign: 'center', color: '#64748b' }}>
          <Calendar size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
          <p>No webinars scheduled right now. Stay tuned!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {webinars.map((web) => (
            <div key={web.id} className="card card-hover" style={{ background: 'white', display: 'flex', alignItems: 'center', gap: '1.25rem', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Calendar size={24} color="#16a34a" />
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#0f172a', margin: 0 }}>{web.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.25rem 0 0' }}>Speaker: {web.speaker}</p>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#f0fdf4', color: '#16a34a', padding: '0.3rem 0.6rem', borderRadius: '6px', display: 'inline-block', marginBottom: '0.5rem' }}>
                  {web.time}
                </span>
                {web.url !== '#' && (
                  <div>
                    <a href={web.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}>
                      Join Link →
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
