import React from 'react';

// Import all PNG images from assets folder
import WhatsAppImg from '../../assets/WhatsApp.png';
import InstagramImg from '../../assets/Instagram.png';
import FacebookImg from '../../assets/Facebook.png';
import TelegramImg from '../../assets/Telegram.png';
import YouTubeImg from '../../assets/YouTube.png';
import LinkedInImg from '../../assets/LinkedIn.png';
import ThreadsImg from '../../assets/Threads.png';
import TwitterImg from '../../assets/Twitter.png';

// ==================== COMMUNITY LINKS SCREEN ====================
export const CommunityLinks: React.FC = () => {
  const channels = [
    {
      name: 'WhatsApp',
      label: 'WhatsApp',
      url: '#',
      icon: WhatsAppImg,
      alt: 'WhatsApp'
    },
    {
      name: 'Official WhatsApp',
      label: 'WhatsApp',
      url: 'https://whatsapp.com/channel/official',
      icon: WhatsAppImg,
      alt: 'WhatsApp'
    },
    {
      name: 'WhatsApp Story Material',
      label: 'WhatsApp',
      url: 'https://whatsapp.com/channel/story-material',
      icon: WhatsAppImg,
      alt: 'WhatsApp Story'
    },
    {
      name: 'SkillToWealth Official Instagram',
      label: 'Instagram',
      url: 'https://instagram.com/achieverzon',
      icon: InstagramImg,
      alt: 'Instagram'
    },
    {
      name: 'SkillToWealth Official Facebook',
      label: 'Facebook',
      url: 'https://facebook.com/achieverzon',
      icon: FacebookImg,
      alt: 'Facebook'
    },
    {
      name: 'Official Telegram',
      label: 'Telegram',
      url: 'https://t.me/achieverzon',
      icon: TelegramImg,
      alt: 'Telegram'
    },
    {
      name: 'YouTube Official',
      label: 'YouTube',
      url: 'https://youtube.com/c/achieverzon',
      icon: YouTubeImg,
      alt: 'YouTube'
    },
    {
      name: 'LinkedIn Official',
      label: 'LinkedIn',
      url: 'https://linkedin.com/company/achieverzon',
      icon: LinkedInImg,
      alt: 'LinkedIn'
    },
    {
      name: 'Threads Official',
      label: 'Threads',
      url: 'https://threads.net/@achieverzon',
      icon: ThreadsImg,
      alt: 'Threads'
    },
    {
      name: 'Twitter / X Official',
      label: 'Twitter / X',
      url: 'https://x.com/achieverzon',
      icon: TwitterImg,
      alt: 'Twitter'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>
          Community
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Connect with SkillToWealth across all our official social platforms.
        </p>
      </div>

      <div
        className="community-links-grid"
        style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1.4rem'
      }}>
        {channels.map((chan, idx) => (
          <a
            key={idx}
            href={chan.url}
            target={chan.url !== '#' ? "_blank" : undefined}
            rel={chan.url !== '#' ? "noopener noreferrer" : undefined}
            className="card card-hover community-link-card"
            style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.07)',
              transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              aspectRatio: '1 / 1.02',
              minHeight: '225px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.04)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.07)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            {/* Image Container */}
            <div style={{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white',
              padding: '0.9rem 0.9rem 0.4rem'
            }}>
              <img 
                src={chan.icon} 
                alt={chan.alt} 
                style={{ 
                  width: '82%',
                  height: 'auto',
                  maxHeight: '135px',
                  objectFit: 'contain',
                  display: 'block',
                  borderRadius: '16px',
                  border: '3px solid #f8fafc',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                  transition: 'transform 0.35s ease'
                }}
              />
            </div>

            {/* Text Section */}
            <div style={{
              padding: '0.8rem 1rem 1rem',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: 700, 
                color: '#1e293b',
                margin: 0,
                fontFamily: 'var(--font-heading)',
                lineHeight: '1.3'
              }}>
                {chan.name}
              </h3>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .community-links-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            column-gap: 1rem !important;
            row-gap: 1rem !important;
            padding: 0 0.1rem;
          }

          .community-link-card {
            min-height: 192px !important;
            border-radius: 16px !important;
            width: 100%;
            box-sizing: border-box;
          }

          .community-link-card img {
            width: 78% !important;
            max-height: 96px !important;
            border-radius: 14px !important;
          }

          .community-link-card div:last-child {
            min-height: 54px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .community-link-card h3 {
            font-size: 0.88rem !important;
            line-height: 1.25 !important;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            word-break: break-word;
          }
        }
      `}</style>
    </div>
  );
};
