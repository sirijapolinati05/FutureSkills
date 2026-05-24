import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { localDb, TeamMember } from '../../db/localDb';
import { Star, ArrowRight, ArrowUpCircle, Users, Award, Calendar, Video, Gift, TrendingUp, Search, IndianRupee } from 'lucide-react';

// ==================== COMMUNITY LINKS SCREEN ====================
export const CommunityLinks: React.FC = () => {
  const channels = [
    {
      name: 'WhatsApp channel',
      isTextOnly: true,
      url: '#'
    },
    {
      name: 'Official WhatsApp Chenal',
      url: 'https://whatsapp.com/channel/official',
      color: '#25D366',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.49 1.966 14.01 1.91 12.008 1.91c-5.439 0-9.863 4.374-9.868 9.802-.003 1.83.5 3.61 1.47 5.162l-1.025 3.746 3.822-1.002zM16.58 13.91c-.246-.123-1.454-.716-1.68-.798-.225-.082-.389-.123-.553.123-.164.246-.636.798-.779.962-.143.164-.287.185-.533.061-.245-.123-1.037-.382-1.976-1.22-.73-.65-1.223-1.454-1.367-1.701-.143-.246-.015-.379.108-.501.111-.11.246-.287.369-.43.123-.143.164-.246.246-.41.082-.164.041-.307-.02-.43-.062-.124-.553-1.332-.758-1.824-.2-.48-.4-.415-.553-.423-.14-.007-.307-.008-.47-.008-.164 0-.43.061-.655.307-.225.246-.86.84-.86 2.048 0 1.208.88 2.376.98 2.54.103.164 1.732 2.646 4.198 3.71 2.467 1.064 2.467.71 2.958.665.49-.045 1.454-.593 1.658-1.168.205-.574.205-1.066.144-1.168-.06-.102-.224-.184-.47-.307z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp story material channel',
      url: 'https://whatsapp.com/channel/story-material',
      color: '#25D366',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.49 1.966 14.01 1.91 12.008 1.91c-5.439 0-9.863 4.374-9.868 9.802-.003 1.83.5 3.61 1.47 5.162l-1.025 3.746 3.822-1.002zM16.58 13.91c-.246-.123-1.454-.716-1.68-.798-.225-.082-.389-.123-.553.123-.164.246-.636.798-.779.962-.143.164-.287.185-.533.061-.245-.123-1.037-.382-1.976-1.22-.73-.65-1.223-1.454-1.367-1.701-.143-.246-.015-.379.108-.501.111-.11.246-.287.369-.43.123-.143.164-.246.246-.41.082-.164.041-.307-.02-.43-.062-.124-.553-1.332-.758-1.824-.2-.48-.4-.415-.553-.423-.14-.007-.307-.008-.47-.008-.164 0-.43.061-.655.307-.225.246-.86.84-.86 2.048 0 1.208.88 2.376.98 2.54.103.164 1.732 2.646 4.198 3.71 2.467 1.064 2.467.71 2.958.665.49-.045 1.454-.593 1.658-1.168.205-.574.205-1.066.144-1.168-.06-.102-.224-.184-.47-.307z"/>
        </svg>
      )
    },
    {
      name: 'SkillToWealth Official Instagram',
      url: 'https://instagram.com/achieverzon',
      color: '#E1306C',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    {
      name: 'SkillToWealth Official Facebook',
      url: 'https://facebook.com/achieverzon',
      color: '#1877F2',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Official telegram channel',
      url: 'https://t.me/achieverzon',
      color: '#0088cc',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M11.944 0C5.344 0 0 5.344 0 11.944c0 6.6 5.344 11.944 11.944 11.944 6.6 0 11.944-5.344 11.944-11.944C23.888 5.344 18.544 0 11.944 0zm5.82 8.354l-1.968 9.274c-.147.662-.54 8.24-.54.824-.147-.074-.5-.3-.97-.61l-2.92-2.155-1.41 1.356c-.147.147-.272.272-.375.272l.21-2.98L15.6 9.44c.236-.21.052-.326-.257-.12l-6.72 4.23-2.89-.9c-.63-.2-.644-.63.13-.93l11.29-4.35c.522-.2.98.115.81.984z"/>
        </svg>
      )
    },
    {
      name: 'YouTube Official Channel',
      url: 'https://youtube.com/c/achieverzon',
      color: '#FF0000',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.52 3.52 12 3.52 12 3.52s-7.52 0-9.388.535a3.003 3.003 0 00-2.11 2.108C0 8.03 0 12 0 12s0 3.97-.502 5.837a3.003 3.003 0 002.11 2.108c1.868.535 9.388.535 9.388.535s7.52 0 9.388-.535a3.003 3.003 0 002.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn official channel',
      url: 'https://linkedin.com/company/achieverzon',
      color: '#0A66C2',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Threads official channel',
      url: 'https://threads.net/@achieverzon',
      color: '#000000',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M12.000 0c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12zm2.083 14.154c-.218-.621-.611-.849-1.258-.87-1.503-.049-2.084.773-2.084 1.838 0 1.106.666 1.794 1.954 1.794.697 0 1.171-.247 1.388-.857v.759c0 .487-.279.799-.785.799-.445 0-.766-.231-.766-.693h-1.55c.01 1.254.912 2.148 2.316 2.148 1.488 0 2.335-.85 2.335-2.229v-5.267c0-2.316-1.517-3.834-3.835-3.834-2.583 0-4.148 1.754-4.148 4.298 0 2.457 1.545 4.316 3.978 4.316 1.298 0 2.366-.54 2.871-1.463l-1.045-.693c-.309.526-.957.759-1.748.759-1.52 0-2.399-.958-2.456-2.502h5.719c.071-.462.109-.949.109-1.414 0-1.849-.971-3.003-2.569-3.003-1.636 0-2.593 1.168-2.593 2.92 0 1.794.945 2.969 2.598 2.969.576 0 .984-.187 1.246-.689v.766z"/>
        </svg>
      )
    },
    {
      name: 'Twitter official channel',
      url: 'https://x.com/achieverzon',
      color: '#000000',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>Community</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Connect with SkillToWealth across all our official social platforms.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1.5rem'
      }}>
        {channels.map((chan, idx) => {
          if (chan.isTextOnly) {
            return (
              <div key={idx} className="card" style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '150px',
                padding: '1rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#1e293b' }}>
                  {chan.name}
                </span>
              </div>
            );
          }
          return (
            <a
              key={idx}
              href={chan.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover"
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '150px',
                padding: '1.5rem',
                color: 'inherit',
                textDecoration: 'none',
                gap: '1rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ color: chan.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {chan.icon}
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155', fontFamily: 'var(--font-heading)' }}>
                {chan.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

