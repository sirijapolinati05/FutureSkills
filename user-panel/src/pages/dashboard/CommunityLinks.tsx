import React, { useEffect, useState } from 'react';
import { CommunityLink, localDb } from '../../db/localDb';
import { getCommunityIcon } from '../../lib/dashboardAssets';

export const CommunityLinks: React.FC = () => {
  const [channels, setChannels] = useState<CommunityLink[]>([]);

  useEffect(() => {
    setChannels(localDb.getCommunityLinks());
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Community</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Admin panel lo manage chese official community links ikkada direct ga kanipistayi.</p>
      </div>

      <div className="community-links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.4rem' }}>
        {channels.map((chan) => (
          <a
            key={chan.id}
            href={chan.url}
            target={chan.url !== '#' ? '_blank' : undefined}
            rel={chan.url !== '#' ? 'noopener noreferrer' : undefined}
            className="card card-hover community-link-card"
            style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.07)', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', aspectRatio: '1 / 1.02', minHeight: '225px' }}
          >
            <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', padding: '0.9rem 0.9rem 0.4rem' }}>
              <img src={getCommunityIcon(chan.iconKey)} alt={chan.label} style={{ width: '82%', height: 'auto', maxHeight: '135px', objectFit: 'contain', display: 'block', borderRadius: '16px', border: '3px solid #f8fafc', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)' }} />
            </div>

            <div style={{ padding: '0.8rem 1rem 1rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', margin: 0, fontFamily: 'var(--font-heading)', lineHeight: '1.3' }}>
                {chan.name}
              </h3>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .community-links-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; column-gap: 1rem !important; row-gap: 1rem !important; }
          .community-link-card { min-height: 192px !important; border-radius: 16px !important; }
          .community-link-card img { width: 78% !important; max-height: 96px !important; border-radius: 14px !important; }
        }
      `}</style>
    </div>
  );
};
