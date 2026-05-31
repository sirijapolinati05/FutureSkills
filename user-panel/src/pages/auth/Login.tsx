import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Lock, Mail, Sparkles, Star, TrendingUp, Users, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import skillLogo from '../../assets/Skill-To-Wealth.png';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password, rememberMe);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
      }
    } catch {
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const autofillUser = () => {
    setEmail('login@gmail.com');
    setPassword('user123');
  };

  return (
    <main className="auth-page">
      <div className="auth-bg auth-bg-blue" />
      <div className="auth-bg auth-bg-purple" />

      <section className="auth-layout">
        <div className="auth-showcase">
          <button className="auth-back" onClick={() => navigate('/')}>
            <ArrowLeft size={18} /> Back to Home
          </button>

          <div className="auth-brand" onClick={() => navigate('/')}>
            <img src={skillLogo} alt="Skill To Wealth" />
          </div>

          <div className="auth-pill">
            <Sparkles size={17} />
            <span>LEARN</span>
            <i />
            <span>PRACTICE</span>
            <i />
            <span>EARN</span>
          </div>

          <h1>
            India's Premier
            <br />
            <span>Digital Freelance</span>
            <br />
            School.
          </h1>

          <p>
            Empowering 68,500+ digital learners to acquire valuable modern skills
            and build scalable affiliate commissions.
          </p>

          <div className="auth-metrics">
            <div>
              <Users size={26} />
              <strong>68K+</strong>
              <span>Learners</span>
            </div>
            <div>
              <TrendingUp size={26} />
              <strong>₹35 Cr+</strong>
              <span>Earnings</span>
            </div>
            <div>
              <Star size={26} />
              <strong>4.8 ★</strong>
              <span>Rating</span>
            </div>
          </div>
        </div>

        <form className="auth-card" onSubmit={handleLogin}>
          <div>
            <h2>Welcome Back</h2>
            <p>Sign in to resume learning advanced skills & growing your digital earnings.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <label className="auth-field">
            <span>Email Address</span>
            <div>
              <Mail size={20} />
              <input
                type="email"
                placeholder="login@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="auth-field">
            <span>
              Password
              <button type="button">Forgot?</button>
            </span>
            <div>
              <Lock size={20} />
              <input
                type="password"
                placeholder="••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="auth-remember">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In to Dashboard'}
            <ArrowRight size={20} />
          </button>

          <div className="auth-divider">
            <span>Quick Access</span>
          </div>

          <button className="auth-demo" type="button" onClick={autofillUser}>
            <Zap size={16} fill="currentColor" />
            <span>
              Quick Autofill Demo Login
              <small>login@gmail.com / user123</small>
            </span>
          </button>

          <p className="auth-register">
            Don't have an account?
            <button type="button" onClick={() => navigate('/register')}>Create Account</button>
          </p>
        </form>
      </section>

      <style>{`
        .auth-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 85% 15%, rgba(118, 52, 255, 0.18), transparent 28%),
            radial-gradient(circle at 8% 92%, rgba(0, 207, 255, 0.12), transparent 25%),
            linear-gradient(112deg, #040711 0%, #070612 50%, #0d0820 100%);
          color: #ffffff;
        }

        .auth-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 84px 84px;
          opacity: 0.45;
          pointer-events: none;
        }

        .auth-bg {
          position: absolute;
          border-radius: 999px;
          filter: blur(36px);
          pointer-events: none;
        }

        .auth-bg-blue {
          width: 360px;
          height: 360px;
          left: -120px;
          bottom: -150px;
          background: rgba(0, 209, 255, 0.16);
        }

        .auth-bg-purple {
          width: 520px;
          height: 520px;
          right: -170px;
          top: 40px;
          background: rgba(138, 64, 255, 0.18);
        }

        .auth-layout {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(420px, 600px);
          gap: 4.5rem;
          align-items: center;
          width: min(86vw, 1600px);
          min-height: 100vh;
          margin: 0 auto;
          padding: 2.5rem 0;
        }

        .auth-showcase {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .auth-back {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          border: 0;
          background: transparent;
          color: #a9c9ed;
          cursor: pointer;
          font-weight: 800;
          font-size: 1rem;
          margin-bottom: 2.7rem;
        }

        .auth-brand {
          position: relative;
          display: block;
          width: 260px;
          height: 78px;
          align-items: center;
          cursor: pointer;
          margin-bottom: 4.2rem;
        }

        .auth-brand img {
          position: absolute;
          left: 0;
          top: 50%;
          width: 260px;
          height: auto;
          display: block;
          filter: drop-shadow(0 0 18px rgba(67, 182, 255, 0.28));
          transform: translateY(-50%);
        }

        .auth-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          border: 1px solid rgba(126, 95, 255, 0.42);
          border-radius: 999px;
          background: rgba(0, 203, 255, 0.08);
          color: #d7adff;
          padding: 0.64rem 1.28rem;
          font-weight: 950;
          letter-spacing: 0.13em;
          font-size: 0.8rem;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 0 24px rgba(100, 70, 255, 0.22);
        }

        .auth-pill svg {
          color: #b86cff;
        }

        .auth-pill i {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: #36d9ff;
        }

        .auth-showcase h1 {
          margin: 2.2rem 0 0;
          color: white;
          font-family: var(--font-heading);
          font-size: clamp(3.2rem, 5.7vw, 6rem);
          line-height: 1.03;
          letter-spacing: -0.045em;
        }

        .auth-showcase h1 span {
          background: linear-gradient(90deg, #35b7ff, #9c58ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .auth-showcase > p {
          max-width: 700px;
          margin-top: 2rem;
          color: #a9c9ed;
          font-size: clamp(1.08rem, 1.6vw, 1.48rem);
          line-height: 1.58;
        }

        .auth-metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.4rem;
          width: min(100%, 820px);
          margin-top: 3.7rem;
        }

        .auth-metrics div {
          min-height: 132px;
          display: grid;
          place-items: center;
          gap: 0.5rem;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          background: rgba(255,255,255,0.025);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .auth-metrics svg {
          color: #20d9ff;
        }

        .auth-metrics div:nth-child(2) svg {
          color: #8e5cff;
        }

        .auth-metrics div:nth-child(3) svg {
          color: #ffd51d;
        }

        .auth-metrics strong {
          font-family: var(--font-heading);
          font-size: clamp(1.55rem, 2vw, 2.1rem);
          line-height: 1;
        }

        .auth-metrics span {
          color: #8fa5c2;
          font-weight: 800;
          font-size: 0.78rem;
        }

        .auth-card {
          border: 1px solid rgba(132, 151, 190, 0.16);
          border-radius: 28px;
          background: rgba(10, 15, 35, 0.72);
          box-shadow: 0 36px 90px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.06);
          backdrop-filter: blur(18px);
          padding: clamp(2rem, 4vw, 3rem);
        }

        .auth-card h2 {
          margin: 0;
          color: white;
          font-family: var(--font-heading);
          font-size: clamp(2rem, 3vw, 2.8rem);
          letter-spacing: -0.025em;
        }

        .auth-card > div > p {
          margin: 1rem 0 0;
          color: #96a4bd;
          line-height: 1.55;
          font-size: 1.02rem;
        }

        .auth-error {
          margin-top: 1.4rem;
          border: 1px solid rgba(248, 113, 113, 0.35);
          border-radius: 14px;
          background: rgba(127, 29, 29, 0.28);
          color: #fecaca;
          padding: 0.85rem 1rem;
          font-weight: 800;
        }

        .auth-field {
          display: block;
          margin-top: 1.75rem;
        }

        .auth-field > span {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #cbd5e1;
          font-weight: 900;
          margin-bottom: 0.8rem;
        }

        .auth-field > span button {
          border: 0;
          background: transparent;
          color: #31d7ff;
          cursor: pointer;
          font-weight: 900;
        }

        .auth-field > div {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          border-radius: 17px;
          background: #eaf2ff;
          color: #71829c;
          padding: 0 1.1rem;
          min-height: 62px;
        }

        .auth-field input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #101828;
          font: inherit;
          font-size: 1.05rem;
        }

        .auth-remember {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          color: #9baac2;
          margin: 1.55rem 0 0;
          font-weight: 800;
        }

        .auth-remember input {
          width: 18px;
          height: 18px;
          accent-color: #4b82ff;
        }

        .auth-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          min-height: 66px;
          border: 0;
          border-radius: 17px;
          margin-top: 2.2rem;
          background: linear-gradient(135deg, #8a5cf6, #3f83f8);
          color: white;
          box-shadow: 0 18px 38px rgba(90, 81, 255, 0.34);
          cursor: pointer;
          font-family: var(--font-heading);
          font-weight: 950;
          font-size: 1.1rem;
        }

        .auth-submit:disabled {
          cursor: wait;
          opacity: 0.72;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          margin: 2.3rem 0 1.55rem;
          color: #64748b;
          text-transform: uppercase;
          font-size: 0.78rem;
          font-weight: 950;
          letter-spacing: 0.08em;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: rgba(148, 163, 184, 0.18);
        }

        .auth-demo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          width: 100%;
          border: 1px dashed rgba(24, 198, 255, 0.45);
          border-radius: 15px;
          background: rgba(7, 89, 133, 0.14);
          color: #43e3ff;
          cursor: pointer;
          padding: 0.95rem 1rem;
          font-weight: 950;
        }

        .auth-demo small {
          display: block;
          margin-top: 0.18rem;
          color: #6ddcff;
          font-weight: 800;
        }

        .auth-register {
          display: flex;
          justify-content: center;
          gap: 0.45rem;
          margin: 1.55rem 0 0;
          color: #94a3b8;
          font-weight: 800;
        }

        .auth-register button {
          border: 0;
          background: transparent;
          color: #35d9ff;
          cursor: pointer;
          font-weight: 950;
        }

        @media (max-width: 1100px) {
          .auth-page {
            overflow: auto;
          }

          .auth-layout {
            grid-template-columns: minmax(0, 1fr);
            width: min(92vw, 720px);
            gap: 2.5rem;
          }

          .auth-brand {
            margin-bottom: 2.6rem;
          }
        }

        @media (max-width: 680px) {
          .auth-layout {
            width: min(100% - 2rem, 520px);
            padding: 1.25rem 0 2rem;
          }

          .auth-back {
            margin-bottom: 1.8rem;
          }

          .auth-showcase h1 {
            font-size: 3rem;
          }

          .auth-metrics {
            grid-template-columns: minmax(0, 1fr);
            margin-top: 2rem;
          }

          .auth-metrics div {
            min-height: 104px;
          }

          .auth-card {
            border-radius: 22px;
          }

          .auth-register {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </main>
  );
};
