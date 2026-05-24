import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { localDb, TeamMember } from '../../db/localDb';
import { Star, ArrowRight, ArrowUpCircle, Users, Award, Calendar, Video, Gift, TrendingUp, Search, IndianRupee } from 'lucide-react';

// ==================== FREELANCING SCREEN ====================
export const Freelancing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const jobs = [
    {
      id: 'job-1',
      title: 'Graphic Designer',
      seats: 2,
      pay: 250,
      image: '/hiring_designer.png',
    },
    {
      id: 'job-2',
      title: 'Video Editor',
      seats: 1,
      pay: 500,
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'job-3',
      title: 'Social Media Manager',
      seats: 3,
      pay: 300,
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60',
    }
  ];

  const handleApply = (jobId: string, jobTitle: string) => {
    if (appliedJobs.includes(jobId)) return;
    setAppliedJobs([...appliedJobs, jobId]);
    alert(`Successfully applied for the ${jobTitle} position!`);
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Search Bar */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '0 1 300px' }}>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingRight: '40px' }}
          />
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', right: '12px', top: '12px' }} />
        </div>
        <button className="btn btn-primary" style={{ background: '#2563eb', padding: '0.75rem 1.5rem' }}>
          SEARCH
        </button>
      </div>

      {/* Grid of Projects */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '2rem'
      }}>
        {filteredJobs.map((job) => {
          const hasApplied = appliedJobs.includes(job.id);
          return (
            <div key={job.id} className="card card-hover" style={{
              background: 'white',
              padding: '0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              {/* Card Image */}
              <div style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
                <img
                  src={job.image}
                  alt={job.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  {job.title}
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Seats info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f1f5f9', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', color: '#475569' }}>
                    <Users size={16} />
                    <span>{job.seats} seats</span>
                  </div>

                  {/* Pricing info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f1f5f9', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', color: '#475569' }}>
                    <IndianRupee size={16} />
                    <span>{job.pay} per project</span>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(job.id, job.title)}
                  disabled={hasApplied}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    background: hasApplied ? '#10b981' : '#2563eb',
                    marginTop: 'auto',
                    padding: '0.75rem'
                  }}
                >
                  {hasApplied ? 'APPLIED' : 'APPLY NOW'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          background: '#2563eb',
          color: 'white',
          borderRadius: '4px',
          fontWeight: 700,
          cursor: 'pointer'
        }}>
          1
        </button>
      </div>
    </div>
  );
};

