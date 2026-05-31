import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Clock,
  GraduationCap,
  Headphones,
  Play,
  Star,
  Users,
  WalletCards,
} from 'lucide-react';
import skillLogo from '../assets/Skill-To-Wealth.png';
import heroPrism from '../assets/hero.png';
import { Course, PackageConfig, localDb } from '../db/localDb';
import { getDashboardImage } from '../lib/dashboardAssets';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [packages, setPackages] = useState<PackageConfig[]>([]);

  useEffect(() => {
    setCourses(localDb.getCourses());
    setPackages(localDb.getPackages());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCoursePrice = (requiredPackage: string) => {
    const packageInfo = packages.find((pkg) => pkg.name === requiredPackage);
    return packageInfo ? `INR ${packageInfo.price}` : requiredPackage;
  };

  return (
    <div className="landing-page">
      <header className={`landing-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="landing-brand" onClick={() => navigate('/')}>
          <img src={skillLogo} alt="Skill To Wealth" className="landing-brand-logo" />
        </div>

        <nav className="landing-nav hide-mobile">
          <a href="#">Home</a>
          <a href="#courses">Our Courses</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
        </nav>

        <div className="landing-header-actions">
          <button onClick={() => navigate('/login')} className="landing-login-button">
            Login
          </button>
          <button onClick={() => navigate('/register')} className="landing-signup-button">
            Sign Up
          </button>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-glow landing-glow-blue" />
        <div className="landing-glow landing-glow-purple" />

        <div className="landing-grid">
          <div className="landing-copy">
            <div className="landing-pill">
              <span>LEARN</span>
              <i />
              <span>PRACTICE</span>
              <i />
              <span>EARN</span>
            </div>

            <h1 className="landing-title">
              Learn Skills.
              <br />
              Build Income.
              <br />
              <span>Change Your Life.</span>
            </h1>

            <p className="landing-subtitle">
              Access high-quality courses, practical projects and real earning
              opportunities - all in one platform.
            </p>

            <div className="landing-cta-row">
              <button onClick={() => navigate('/register')} className="landing-primary-cta">
                Start Learning Now <ArrowRight size={19} />
              </button>
              <button className="landing-demo-cta">
                <Play size={17} fill="white" /> Watch Demo
              </button>
            </div>

            <div className="landing-stats">
              {[
                { icon: Users, value: '10K+', label: 'Active Students' },
                { icon: BookOpen, value: '50+', label: 'Premium Courses' },
                { icon: WalletCards, value: '100+', label: 'Earning Methods' },
                { icon: Headphones, value: '24/7', label: 'Support' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="landing-stat">
                  <Icon size={24} />
                  <div>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="landing-visual">
            <div className="trusted-card">
              <span>Trusted by</span>
              <strong>10K+ Learners</strong>
              <div className="trusted-avatars">
                {[
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=90&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=90&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=90&auto=format&fit=crop&q=80',
                ].map((src) => (
                  <img key={src} src={src} alt="" />
                ))}
              </div>
            </div>

            <div className="hero-orbit" />
            <img className="hero-prism" src={heroPrism} alt="" aria-hidden="true" />

            <div className="student-frame">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=760&auto=format&fit=crop&q=85"
                alt="Student learning online with laptop"
              />
            </div>

            <div className="earnings-card">
              <span>Total Earnings</span>
              <strong>INR 2,45,000+</strong>
              <small>+37% this month</small>
              <svg viewBox="0 0 160 54" aria-hidden="true">
                <path d="M5 43 L26 31 L43 36 L62 18 L82 26 L104 14 L124 20 L153 8" />
              </svg>
            </div>

            {[
              { className: 'float-badge float-cap', icon: GraduationCap },
              { className: 'float-badge float-money', icon: WalletCards },
              { className: 'float-badge float-star', icon: Star },
            ].map(({ className, icon: Icon }) => (
              <div key={className} className={className}>
                <Icon size={28} fill="currentColor" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="landing-courses">
        <div className="landing-section-heading">
          <h2>Our Premium Courses</h2>
          <p>Start learning the skills that can make you financially independent.</p>
        </div>

        <div className="landing-course-grid">
          {courses.map((course) => (
            <div key={course.id} className="landing-course-card">
              <div className="landing-course-media">
                <img src={course.thumbnail || getDashboardImage(course.imageKey)} alt={course.title} />
                <span>{course.category}</span>
              </div>
              <div className="landing-course-body">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="landing-course-meta">
                  <span><BookOpen size={15} /> {course.lessonsCount} Lessons</span>
                  <span><Clock size={15} /> {course.duration}</span>
                </div>
                <div className="landing-course-footer">
                  <span>{getCoursePrice(course.requiredPackage)}</span>
                  <button onClick={() => navigate('/register')}>Enroll Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer id="about" className="landing-footer">
        <div className="landing-footer-grid">
          <div>
            <img src={skillLogo} alt="Skill To Wealth" className="landing-footer-logo" />
            <p>
              India's leading community for freelance learners, enabling people to
              acquire digital skills and earn through structured learning.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Disclaimer</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
          <div id="contact">
            <h4>Contact Info</h4>
            <ul>
              <li>Phone: +91 9502014791</li>
              <li>Email: support@skilltowealth.in</li>
              <li>Address: Ashok Nagar, Madhya Pradesh</li>
            </ul>
          </div>
        </div>
        <div className="landing-footer-bottom">
          Copyright 2026 SkillToWealth All Rights Reserved.
        </div>
      </footer>

      <style>{`
        .landing-page {
          position: relative;
          min-height: 100vh;
          width: 100%;
          max-width: 100%;
          overflow-x: clip;
          background:
            radial-gradient(circle at 78% 22%, rgba(91, 58, 255, 0.42) 0 12%, transparent 34%),
            radial-gradient(circle at 92% 38%, rgba(255, 50, 206, 0.26), transparent 28%),
            radial-gradient(circle at 38% 18%, rgba(0, 100, 255, 0.16), transparent 30%),
            linear-gradient(115deg, #03020a 0%, #050317 45%, #07011a 100%);
          color: white;
        }

        .landing-page::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(5, 2, 15, 0.86) 0%, rgba(5, 2, 15, 0.62) 44%, rgba(5, 2, 15, 0.18) 100%),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 110px);
        }

        .landing-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.22rem 5.5% 0.38rem;
          background: linear-gradient(180deg, rgba(4, 3, 18, 0.92), rgba(4, 3, 18, 0.38), transparent);
          transition: background 0.25s ease, box-shadow 0.25s ease, padding 0.25s ease, border-color 0.25s ease;
          border-bottom: 1px solid transparent;
        }

        .landing-header.is-scrolled {
          padding-top: 0.55rem;
          padding-bottom: 0.55rem;
          background: rgba(255, 255, 255, 0.96);
          border-bottom-color: rgba(15, 23, 42, 0.08);
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.09);
          backdrop-filter: blur(14px);
        }

        .landing-brand {
          position: relative;
          display: flex;
          align-items: center;
          width: 210px;
          height: 62px;
          cursor: pointer;
        }

        .landing-brand-logo {
          position: absolute;
          left: 0;
          top: 50%;
          width: 210px;
          height: auto;
          display: block;
          filter: drop-shadow(0 0 18px rgba(67, 182, 255, 0.26));
          transition: filter 0.25s ease, transform 0.25s ease;
          transform: translateY(-50%);
        }

        .landing-header.is-scrolled .landing-brand-logo {
          width: 210px;
          transform: translateY(-50%);
          filter: drop-shadow(0 8px 18px rgba(15, 23, 42, 0.08));
        }

        .landing-header.is-scrolled .landing-nav {
          font-size: 1rem;
        }

        .landing-nav {
          display: flex;
          gap: 2.1rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.76);
          transition: color 0.25s ease;
        }

        .landing-header.is-scrolled .landing-nav {
          color: #101828;
        }

        .landing-nav a:hover {
          color: white;
        }

        .landing-header.is-scrolled .landing-nav a:hover {
          color: #0ea5e9;
        }

        .landing-header-actions {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }

        .landing-login-button,
        .landing-signup-button {
          border: 1px solid rgba(255,255,255,0.24);
          border-radius: 999px;
          padding: 0.54rem 1.05rem;
          color: white;
          cursor: pointer;
          font-weight: 800;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .landing-login-button {
          background: rgba(255,255,255,0.06);
        }

        .landing-header.is-scrolled .landing-login-button {
          color: #0f172a;
          border-color: #dbe3ef;
          background: #ffffff;
        }

        .landing-header.is-scrolled .landing-login-button,
        .landing-header.is-scrolled .landing-signup-button {
          padding: 0.52rem 1.05rem;
          font-size: 0.94rem;
        }

        .landing-signup-button {
          background: linear-gradient(135deg, #b719ff, #2ecbff);
          box-shadow: 0 0 22px rgba(82, 121, 255, 0.44);
          border-color: transparent;
        }

        .landing-hero {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          overflow: hidden;
          padding: 7rem 5.5% 3.2rem;
          background: transparent;
        }

        .landing-hero::before {
          display: none;
        }

        .landing-glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(20px);
          opacity: 0.55;
          pointer-events: none;
        }

        .landing-glow-blue {
          width: 360px;
          height: 360px;
          right: 18%;
          top: 11%;
          background: rgba(0, 151, 255, 0.26);
        }

        .landing-glow-purple {
          width: 420px;
          height: 420px;
          right: -10%;
          bottom: -12%;
          background: rgba(196, 39, 255, 0.28);
        }

        .landing-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(420px, 0.88fr);
          gap: 3.6rem;
          align-items: center;
          max-width: 1440px;
          min-height: calc(100vh - 10rem);
          margin: 0 auto;
        }

        .landing-copy {
          max-width: 680px;
        }

        .landing-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.52rem;
          padding: 0.6rem 0.9rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(118, 95, 255, 0.32);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.13), 0 0 22px rgba(73, 80, 255, 0.2);
          color: #cdbdff;
          font-weight: 900;
          letter-spacing: 0.12em;
          font-size: 0.8rem;
        }

        .landing-pill i {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: #35e4ff;
          box-shadow: 0 0 10px #35e4ff;
        }

        .landing-title {
          margin: 1.2rem 0 0;
          color: white;
          font-family: var(--font-heading);
          font-size: clamp(3.2rem, 6vw, 5.9rem);
          line-height: 0.96;
          font-weight: 950;
          letter-spacing: -0.055em;
        }

        .landing-title span {
          background: linear-gradient(90deg, #ff2df7 0%, #8b5cff 50%, #4cc8ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 34px rgba(156, 78, 255, 0.22);
        }

        .landing-subtitle {
          max-width: 620px;
          margin: 1.4rem 0 0;
          color: rgba(255, 255, 255, 0.88);
          font-size: 1.12rem;
          line-height: 1.65;
          font-weight: 700;
        }

        .landing-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 1.7rem;
        }

        .landing-primary-cta,
        .landing-demo-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          min-height: 54px;
          border-radius: 999px;
          padding: 0 1.55rem;
          color: white;
          cursor: pointer;
          font-weight: 900;
          font-size: 1rem;
        }

        .landing-primary-cta {
          border: 0;
          background: linear-gradient(135deg, #d619ff, #7b35ff 48%, #25d4ff);
          box-shadow: 0 14px 32px rgba(92, 74, 255, 0.42), inset 0 1px 0 rgba(255,255,255,0.35);
        }

        .landing-demo-cta {
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
        }

        .landing-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1.2rem;
          margin-top: 2rem;
        }

        .landing-stat {
          display: flex;
          align-items: center;
          gap: 0.62rem;
          color: white;
        }

        .landing-stat svg {
          color: #d75cff;
          filter: drop-shadow(0 0 10px rgba(205, 92, 255, 0.8));
        }

        .landing-stat strong,
        .landing-stat span {
          display: block;
        }

        .landing-stat strong {
          font-size: 1.02rem;
          line-height: 1.05;
        }

        .landing-stat span {
          margin-top: 0.12rem;
          color: rgba(255,255,255,0.72);
          font-size: 0.66rem;
          font-weight: 700;
        }

        .landing-visual {
          position: relative;
          min-height: 620px;
        }

        .hero-orbit {
          position: absolute;
          width: 470px;
          height: 470px;
          right: 1%;
          top: 10%;
          border-radius: 999px;
          border: 2px solid rgba(126, 87, 255, 0.8);
          box-shadow: 0 0 50px rgba(118, 87, 255, 0.6), inset 0 0 48px rgba(24, 203, 255, 0.18);
        }

        .student-frame {
          position: absolute;
          right: 2%;
          bottom: 2%;
          width: min(92%, 560px);
          height: 520px;
          overflow: hidden;
          border-radius: 40px;
          mask-image: linear-gradient(to bottom, black 72%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 72%, transparent 100%);
        }

        .student-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.05) contrast(1.08);
        }

        .hero-prism {
          position: absolute;
          left: 8%;
          top: 5%;
          width: 96px;
          opacity: 0.86;
          filter: drop-shadow(0 0 28px rgba(87, 115, 255, 0.85));
        }

        .trusted-card,
        .earnings-card {
          position: absolute;
          z-index: 4;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(10, 13, 38, 0.62);
          backdrop-filter: blur(18px);
          border-radius: 18px;
          box-shadow: 0 18px 44px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.12);
        }

        .trusted-card {
          top: 0;
          right: 0;
          min-width: 210px;
          padding: 0.8rem 0.95rem;
        }

        .trusted-card span,
        .earnings-card span {
          display: block;
          color: rgba(255,255,255,0.58);
          font-size: 0.72rem;
          font-weight: 800;
        }

        .trusted-card strong {
          display: block;
          margin-top: 0.1rem;
          color: white;
          font-size: 0.98rem;
        }

        .trusted-avatars {
          position: absolute;
          top: 50%;
          right: 0.8rem;
          display: flex;
          transform: translateY(-50%);
        }

        .trusted-avatars img {
          width: 40px;
          height: 40px;
          margin-left: -9px;
          border: 2px solid rgba(255,255,255,0.85);
          border-radius: 999px;
          object-fit: cover;
        }

        .earnings-card {
          left: 4%;
          top: 34%;
          width: 250px;
          padding: 1rem 1.1rem 0.8rem;
        }

        .earnings-card strong {
          display: block;
          margin-top: 0.35rem;
          color: white;
          font-size: 1.46rem;
        }

        .earnings-card small {
          display: block;
          margin-top: 0.22rem;
          color: #18e68c;
          font-weight: 800;
        }

        .earnings-card svg {
          width: 100%;
          height: 54px;
          margin-top: 0.2rem;
        }

        .earnings-card path {
          fill: none;
          stroke: #18f09b;
          stroke-width: 5;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 7px rgba(24, 240, 155, 0.65));
        }

        .float-badge {
          position: absolute;
          z-index: 5;
          display: grid;
          place-items: center;
          width: 70px;
          height: 70px;
          border-radius: 999px;
          color: white;
          border: 1px solid rgba(255,255,255,0.24);
          box-shadow: 0 0 36px rgba(164, 61, 255, 0.76), inset 0 1px 0 rgba(255,255,255,0.24);
        }

        .float-cap {
          top: 13%;
          left: 10%;
          background: linear-gradient(135deg, #274cff, #8c36ff);
        }

        .float-money {
          top: 24%;
          right: 4%;
          background: linear-gradient(135deg, #742dff, #db33ff);
        }

        .float-star {
          right: 0;
          bottom: 27%;
          width: 58px;
          height: 58px;
          background: linear-gradient(135deg, #ff8b25, #c932ff);
        }

        .landing-courses {
          position: relative;
          z-index: 1;
          padding: 5rem 8%;
          overflow: hidden;
          background: transparent;
          color: white;
        }

        .landing-courses::before {
          display: none;
        }

        .landing-courses::after {
          display: none;
        }

        .landing-courses > * {
          position: relative;
          z-index: 1;
        }

        .landing-section-heading {
          text-align: center;
          margin-bottom: 3rem;
        }

        .landing-section-heading h2 {
          font-size: 2.35rem;
          color: white;
        }

        .landing-section-heading p {
          color: rgba(226, 232, 240, 0.82);
          margin-top: 0.5rem;
        }

        .landing-course-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 2rem;
        }

        .landing-course-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          border: 1px solid rgba(148, 210, 255, 0.2);
          border-radius: 20px;
          background: linear-gradient(180deg, rgba(255,255,255,0.11), rgba(255,255,255,0.045));
          box-shadow: 0 24px 54px rgba(0, 0, 0, 0.32);
          backdrop-filter: blur(16px);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .landing-course-card:hover {
          transform: translateY(-6px);
          border-color: rgba(46, 203, 255, 0.52);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.34);
        }

        .landing-course-media {
          position: relative;
          height: 205px;
          padding: 0.75rem;
          background: linear-gradient(135deg, rgba(46, 203, 255, 0.08), rgba(183, 25, 255, 0.16));
        }

        .landing-course-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.18);
        }

        .landing-course-media span {
          position: absolute;
          left: 1.15rem;
          top: 1.15rem;
          padding: 0.42rem 0.82rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #2ecbff, #274cff);
          color: white;
          font-size: 0.78rem;
          font-weight: 900;
          box-shadow: 0 10px 22px rgba(14, 165, 233, 0.32);
        }

        .landing-course-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 0.85rem;
          padding: 1.4rem;
        }

        .landing-course-card h3 {
          font-size: 1.1rem;
          color: white;
          line-height: 1.35;
        }

        .landing-course-card p {
          flex: 1;
          color: rgba(226, 232, 240, 0.78);
          font-size: 0.9rem;
          line-height: 1.55;
        }

        .landing-course-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem 1rem;
          padding-top: 0.15rem;
          color: rgba(226, 232, 240, 0.84);
          font-size: 0.82rem;
        }

        .landing-course-meta span {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .landing-course-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 0.25rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(226, 232, 240, 0.12);
        }

        .landing-course-footer > span {
          font-weight: 900;
          color: #6ee7ff;
          font-size: 1.15rem;
          white-space: nowrap;
        }

        .landing-course-footer button {
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 999px;
          background: linear-gradient(135deg, #2ecbff, #274cff);
          padding: 0.58rem 1rem;
          color: white;
          cursor: pointer;
          font-weight: 800;
          box-shadow: 0 12px 24px rgba(39, 76, 255, 0.28);
        }

        .landing-footer {
          position: relative;
          z-index: 2;
          background: #03020a;
          color: #94a3b8;
          padding: 3rem 5%;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .landing-footer-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .landing-footer-logo {
          width: 210px;
          max-width: 100%;
          display: block;
          margin-bottom: 1rem;
        }

        .landing-footer h4 {
          color: white;
          margin-bottom: 1rem;
        }

        .landing-footer p,
        .landing-footer li {
          font-size: 0.88rem;
          line-height: 1.7;
        }

        .landing-footer ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .landing-footer-bottom {
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 1.5rem;
          font-size: 0.82rem;
        }

        @media (max-width: 1080px) {
          .landing-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 2rem;
          }

          .landing-visual {
            min-height: 520px;
          }

          .student-frame,
          .hero-orbit {
            right: 50%;
            transform: translateX(50%);
          }

          .landing-course-grid,
          .landing-footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .landing-page,
          .landing-hero,
          .landing-courses,
          .landing-footer {
            width: 100%;
            max-width: 100%;
            overflow-x: clip;
          }

          .landing-header {
            width: 100%;
            max-width: 100%;
            padding: 0.75rem 1rem;
            gap: 0.75rem;
          }

          .landing-brand {
            width: min(150px, 48vw);
            height: 48px;
            flex-shrink: 1;
          }

          .landing-brand-logo,
          .landing-header.is-scrolled .landing-brand-logo {
            width: min(150px, 48vw);
          }

          .landing-header-actions {
            flex-shrink: 0;
            gap: 0.5rem;
          }

          .landing-login-button {
            display: none;
          }

          .landing-signup-button {
            min-height: 40px;
            padding: 0.52rem 0.85rem;
            font-size: 0.88rem;
            white-space: nowrap;
          }

          .landing-hero {
            min-height: auto;
            padding: 5.8rem 1rem 2.5rem;
          }

          .landing-grid {
            width: 100%;
            max-width: 100%;
            min-height: auto;
            margin: 0 auto;
            justify-items: center;
          }

          .landing-copy {
            width: 100%;
            max-width: 520px;
            text-align: center;
          }

          .landing-pill {
            max-width: 100%;
            margin: 0 auto;
            gap: 0.4rem;
            padding: 0.55rem 0.75rem;
            font-size: 0.68rem;
            letter-spacing: 0.09em;
          }

          .landing-title {
            font-size: clamp(2.55rem, 13vw, 3.85rem);
            letter-spacing: -0.04em;
          }

          .landing-subtitle {
            max-width: 100%;
            font-size: 1rem;
          }

          .landing-cta-row {
            width: 100%;
          }

          .landing-primary-cta,
          .landing-demo-cta {
            width: 100%;
            padding: 0 1rem;
          }

          .landing-stats,
          .landing-course-grid,
          .landing-footer-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .landing-stats {
            width: 100%;
            max-width: 360px;
            margin-right: auto;
            margin-left: auto;
          }

          .landing-stat {
            justify-content: center;
            text-align: left;
          }

          .landing-visual {
            display: grid;
            place-items: center;
            width: 100%;
            max-width: 100%;
            min-height: auto;
            padding-top: 1.5rem;
            overflow: hidden;
          }

          .student-frame {
            position: relative;
            right: auto;
            bottom: auto;
            width: min(100%, 330px);
            height: 360px;
            margin: 4.25rem auto 0;
            border-radius: 28px;
            transform: none;
          }

          .hero-orbit {
            left: 50%;
            right: auto;
            top: 5.5rem;
            width: 280px;
            height: 280px;
            transform: translateX(-50%);
          }

          .trusted-card {
            top: 0;
            right: auto;
            left: 50%;
            width: min(100%, 280px);
            min-width: 0;
            transform: translateX(-50%);
            transform-origin: center top;
          }

          .earnings-card {
            left: 50%;
            top: auto;
            bottom: 1rem;
            width: min(86%, 230px);
            transform: translateX(-50%);
            transform-origin: center bottom;
          }

          .float-badge {
            width: 54px;
            height: 54px;
          }

          .float-cap {
            top: 6.5rem;
            left: max(0.5rem, calc(50% - 155px));
          }

          .float-money {
            top: 8.25rem;
            right: max(0.5rem, calc(50% - 155px));
          }

          .float-star {
            right: max(0.5rem, calc(50% - 160px));
            bottom: 5.5rem;
          }

          .landing-courses,
          .landing-footer {
            padding-right: 1rem;
            padding-left: 1rem;
          }

          .landing-section-heading h2 {
            font-size: 2rem;
          }

          .landing-course-card,
          .landing-footer-grid > div {
            width: 100%;
            max-width: 100%;
          }

          .landing-course-footer {
            align-items: stretch;
            flex-direction: column;
            gap: 0.9rem;
          }

          .landing-course-footer button {
            width: 100%;
          }
        }

        @media (max-width: 380px) {
          .landing-brand,
          .landing-brand-logo,
          .landing-header.is-scrolled .landing-brand-logo {
            width: 128px;
          }

          .landing-signup-button {
            padding-inline: 0.7rem;
            font-size: 0.82rem;
          }

          .landing-title {
            font-size: clamp(2.25rem, 12vw, 3.1rem);
          }
        }
      `}</style>
    </div>
  );
};
