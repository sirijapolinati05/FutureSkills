import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, MessageSquare, Award, CheckCircle } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Navigation Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.25rem 5%',
        background: 'white',
        borderBottom: '1px solid #f1f5f9',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{
            fontSize: '1.8rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            color: '#0ea5e9',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ color: '#1e3a8a' }}>Skill</span>
            <span style={{ color: '#0ea5e9' }}>To</span>
            <span style={{ color: '#1d4ed8' }}>Wealth</span>
            <span style={{ fontSize: '1rem', verticalAlign: 'super', marginLeft: '2px' }}>🎓</span>
          </div>
        </div>

        <nav className="hide-mobile" style={{ display: 'flex', gap: '2rem', fontWeight: 500, color: '#334155' }}>
          <a href="#" style={{ color: '#0ea5e9' }}>Home</a>
          <a href="#courses">Our Courses</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
        </nav>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/login')} className="btn btn-outline" style={{ borderRadius: '9999px', padding: '0.5rem 1.5rem' }}>Login</button>
          <button onClick={() => navigate('/register')} className="btn btn-primary" style={{ borderRadius: '9999px', padding: '0.5rem 1.5rem', background: '#0ea5e9' }}>Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        padding: '5rem 8%',
        alignItems: 'center',
        minHeight: '80vh',
        background: 'radial-gradient(circle at 10% 20%, rgba(243, 232, 255, 0.4) 0%, rgba(255, 255, 255, 1) 90%)',
        overflow: 'hidden'
      }}>
        {/* Left Side Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.2rem', color: '#0ea5e9' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} fill="#0ea5e9" size={18} />
              ))}
            </div>
            <p style={{
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '1px',
              color: '#334155',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-heading)'
            }}>
              68545+ Students Trust
            </p>
          </div>

          <h1 style={{
            fontSize: '3.75rem',
            lineHeight: 1.1,
            color: '#1e293b',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800
          }}>
            Think Freelance<br />
            <span style={{ color: '#0ea5e9' }}>Think SkillToWealth</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '480px', lineHeight: '1.6' }}>
            Join India's Top Digital Freelance School with 3,50,000+ freelancers who've transformed their skills into income.
          </p>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => navigate('/register')} className="btn btn-primary" style={{
              background: '#1e3a8a',
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              borderRadius: '8px'
            }}>
              Get Started Now <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Side Graphics & Client Feedback Cards (Mocking Image 1) */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Main User Image Wrapper */}
          <div style={{
            position: 'relative',
            width: '320px',
            height: '420px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            zIndex: 10
          }}>
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
              alt="Freelancer Student"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Testimonial Bubble */}
          <div className="glass" style={{
            position: 'absolute',
            top: '15%',
            left: '-15%',
            padding: '1rem',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            display: 'flex',
            gap: '0.75rem',
            maxWidth: '240px',
            zIndex: 20
          }}>
            <div style={{
              background: '#e0e7ff',
              color: '#3b82f6',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <MessageSquare size={18} />
            </div>
            <div>
              <h5 style={{ margin: 0, fontSize: '0.9rem', color: '#1e293b' }}>Rohan Mehra</h5>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', lineHeight: '1.3' }}>
                Hey, I have a quick project need a visiting card design by this weekend
              </p>
            </div>
          </div>

          {/* Client Feedback Card (Matching Image 1 Right Panel) */}
          <div style={{
            position: 'absolute',
            right: '-10%',
            bottom: '5%',
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.25rem',
            width: '280px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            zIndex: 20
          }}>
            <h4 style={{ fontSize: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>Client Feedback</h4>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.75rem' }}>
              {['Work', 'Project', 'Behaviour', 'Punctuality', 'Communication'].map((tag) => (
                <span key={tag} style={{
                  fontSize: '0.65rem',
                  border: '1px solid #3b82f6',
                  color: '#3b82f6',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '4px'
                }}>
                  {tag}
                </span>
              ))}
              <span style={{ fontSize: '0.65rem', background: '#f1f5f9', padding: '0.125rem 0.375rem', borderRadius: '4px' }}>+3</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800 }}>4.5</span>
              <div>
                <div style={{ display: 'flex', gap: '0.05rem', color: '#3b82f6' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} fill={s <= 4 ? "#3b82f6" : "none"} color="#3b82f6" size={12} />
                  ))}
                </div>
                <span style={{ fontSize: '0.6rem', color: '#64748b' }}>Overall rating</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                  style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                />
                <div>
                  <h6 style={{ margin: 0, fontSize: '0.7rem' }}>Rate and Review</h6>
                  <p style={{ margin: 0, fontSize: '0.6rem', color: '#64748b', lineHeight: '1.2' }}>
                    Hey! I'm looking for a freelancer to design a website banner. Are available?
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                />
                <div>
                  <h6 style={{ margin: 0, fontSize: '0.7rem' }}>Nisha Sharma</h6>
                  <p style={{ margin: 0, fontSize: '0.6rem', color: '#64748b', lineHeight: '1.2' }}>
                    Thanks for the quick turnaround. The quality exceeded my expectations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Sneak Peek */}
      <section id="courses" style={{ padding: '5rem 8%', background: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.25rem', color: '#0f172a', fontFamily: 'var(--font-heading)' }}>Our Premium Courses</h2>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Start learning the skills that can make you financially independent.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'Graphic Design Masterclass', price: '₹299', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=60' },
            { title: 'Affiliate Marketing Secrets', price: '₹599', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60' },
            { title: 'Website Development (No-Code)', price: '₹899', img: 'https://images.unsplash.com/photo-1547658719-da2b81169d42?w=500&auto=format&fit=crop&q=60' }
          ].map((course, idx) => (
            <div key={idx} className="card card-hover" style={{ padding: 0, overflow: 'hidden' }}>
              <img src={course.img} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{ fontWeight: 800, color: '#0ea5e9', fontSize: '1.25rem' }}>{course.price}</span>
                  <button onClick={() => navigate('/register')} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Enroll Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '3rem 5%', borderTop: '1px solid #1e293b' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>SkillToWealth</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>India's leading community for freelance learners, enabling people to acquire digital skills and earn commissions through structured affiliate learning.</p>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <li><a href="#">Disclaimer</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Contact Info</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <li>Phone: +91 9502014791</li>
              <li>Email: support@skilltowealth.in</li>
              <li>Address: Ashok Nagar, Madhya Pradesh</li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', borderTop: '1px solid #1e293b', paddingTop: '1.5rem', fontSize: '0.8rem' }}>
          Copyright © 2026 SkillToWealth All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};
