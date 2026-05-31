import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
  Users,
  WalletCards,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StarterImg from '../../assets/Starter.jpeg';
import AdvancedImg from '../../assets/Advanced.jpeg';
import ProImg from '../../assets/Pro.jpeg';
import EliteImg from '../../assets/Elite.jpeg';
import PremiumImg from '../../assets/Premium.jpeg';
import skillLogo from '../../assets/Skill-To-Wealth.png';

const packagesList = [
  {
    name: 'Starter Package',
    price: 'Rs 299',
    desc: 'Starter course bundle & basic referral benefits.',
    image: StarterImg,
    color: '#1e3a8a',
  },
  {
    name: 'Advanced Package',
    price: 'Rs 599',
    desc: 'Affiliate marketing secrets & higher commission rates.',
    image: AdvancedImg,
    color: '#f97316',
  },
  {
    name: 'Pro Package',
    price: 'Rs 899',
    desc: 'Website development training & better payouts.',
    image: ProImg,
    color: '#15803d',
  },
  {
    name: 'Elite Package',
    price: 'Rs 1299',
    desc: 'Short-form video editing & Reels mastery included.',
    image: EliteImg,
    color: '#475569',
  },
  {
    name: 'Premium Package',
    price: 'Rs 3999',
    desc: 'Unlock all courses + maximum commissions (85%).',
    image: PremiumImg,
    color: '#ca8a04',
  },
];

export const Register: React.FC = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sponsorCode, setSponsorCode] = useState('AZ-2396');
  const [selectedPackage, setSelectedPackage] = useState('Starter Package');
  const [paymentMethod, setPaymentMethod] = useState('Instamojo');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !password) {
      alert('Please fill all required fields.');
      return;
    }
    if (!agreeTerms) {
      alert('You must agree to the Terms & Conditions.');
      return;
    }

    const success = await registerUser({
      name,
      phone,
      email,
      packageName: selectedPackage,
      sponsorCode: 'AZ-' + Math.floor(1000 + Math.random() * 9000),
      referredBy: sponsorCode,
      status: 'active',
    });

    if (success) {
      alert('Registration Successful! Redirecting to Dashboard.');
      navigate('/dashboard');
    }
  };

  return (
    <main className="register-page">
      <div className="register-bg register-bg-blue" />
      <div className="register-bg register-bg-purple" />

      <section className="register-layout">
        <aside className="register-showcase">
          <button className="register-back" onClick={() => navigate('/')}>
            <ArrowLeft size={18} /> Back to Home
          </button>

          <div className="register-brand" onClick={() => navigate('/')}>
            <img src={skillLogo} alt="Skill To Wealth" />
          </div>

          <div className="register-pill">
            <Sparkles size={17} />
            <span>START</span>
            <i />
            <span>LEARN</span>
            <i />
            <span>EARN</span>
          </div>

          <h1>
            Create Your
            <br />
            <span>Digital Earning</span>
            <br />
            Account.
          </h1>

          <p>
            Select the right package, join the learning community, and unlock
            courses with referral benefits from day one.
          </p>

          <div className="register-metrics">
            <div>
              <Users size={26} />
              <strong>68K+</strong>
              <span>Learners</span>
            </div>
            <div>
              <WalletCards size={26} />
              <strong>5 Plans</strong>
              <span>Upgrade Ready</span>
            </div>
            <div>
              <Zap size={26} />
              <strong>Instant</strong>
              <span>Activation</span>
            </div>
          </div>
        </aside>

        <form className="register-card" onSubmit={handleSubmit}>
          <div className="register-card-heading">
            <h2>Register Account</h2>
            <p>Fill your details and choose one package to continue.</p>
          </div>

          <div className="register-fields">
            <label className="register-field">
              <span>Your Name *</span>
              <div>
                <User size={19} />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="register-field">
              <span>Phone Number *</span>
              <div>
                <Phone size={19} />
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="register-field">
              <span>Email Address *</span>
              <div>
                <Mail size={19} />
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="register-field">
              <span>Password *</span>
              <div>
                <Lock size={19} />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="register-field register-field-wide">
              <span>Sponsor Code</span>
              <div>
                <Users size={19} />
                <input
                  type="text"
                  placeholder="Enter sponsor code"
                  value={sponsorCode}
                  onChange={(e) => setSponsorCode(e.target.value)}
                />
              </div>
            </label>
          </div>

          <div className="register-package-block">
            <div>
              <h3>Select Package</h3>
              <p>Same packages and pricing as the Upgrade tab.</p>
            </div>

            <div className="register-package-grid">
              {packagesList.map((pkg) => {
                const isSelected = selectedPackage === pkg.name;

                return (
                  <button
                    key={pkg.name}
                    type="button"
                    className={`register-package-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedPackage(pkg.name)}
                    style={{ '--package-color': pkg.color } as React.CSSProperties}
                  >
                    <img src={pkg.image} alt={pkg.name} />
                    <span className="register-package-check">
                      <CheckCircle size={18} fill="currentColor" />
                    </span>
                    <div>
                      <strong>{pkg.name}</strong>
                      <small>{pkg.desc}</small>
                      <b>{pkg.price}</b>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="register-payment">
            <span>Payment Method</span>
            <label>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'Instamojo'}
                onChange={() => setPaymentMethod('Instamojo')}
              />
              Instamojo
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'Wallet'}
                onChange={() => setPaymentMethod('Wallet')}
              />
              Wallet
            </label>
          </div>

          <label className="register-terms">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            By clicking register you agree to our terms and privacy policy.
          </label>

          <button className="register-submit" type="submit">
            Register Now <ArrowRight size={20} />
          </button>

          <p className="register-login-link">
            Already have an account?
            <button type="button" onClick={() => navigate('/login')}>Login</button>
          </p>
        </form>
      </section>

      <style>{`
        .register-page {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 88% 13%, rgba(118, 52, 255, 0.18), transparent 30%),
            radial-gradient(circle at 8% 92%, rgba(0, 207, 255, 0.12), transparent 26%),
            linear-gradient(112deg, #040711 0%, #070612 50%, #0d0820 100%);
          color: #ffffff;
        }

        .register-page::before {
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

        .register-bg {
          position: absolute;
          border-radius: 999px;
          filter: blur(36px);
          pointer-events: none;
        }

        .register-bg-blue {
          width: 360px;
          height: 360px;
          left: -120px;
          bottom: -150px;
          background: rgba(0, 209, 255, 0.16);
        }

        .register-bg-purple {
          width: 520px;
          height: 520px;
          right: -170px;
          top: 40px;
          background: rgba(138, 64, 255, 0.18);
        }

        .register-layout {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(360px, 0.88fr) minmax(620px, 780px);
          gap: 3.5rem;
          align-items: start;
          width: min(88vw, 1640px);
          min-height: 100vh;
          margin: 0 auto;
          padding: 2.5rem 0;
        }

        .register-showcase {
          position: sticky;
          top: 2.5rem;
          min-height: calc(100vh - 5rem);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .register-back {
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

        .register-brand {
          position: relative;
          display: block;
          width: 260px;
          height: 78px;
          align-items: center;
          cursor: pointer;
          margin-bottom: 4.2rem;
        }

        .register-brand img {
          position: absolute;
          left: 0;
          top: 50%;
          width: 260px;
          height: auto;
          display: block;
          filter: drop-shadow(0 0 18px rgba(67, 182, 255, 0.28));
          transform: translateY(-50%);
        }

        .register-pill {
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

        .register-pill svg {
          color: #b86cff;
        }

        .register-pill i {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: #36d9ff;
        }

        .register-showcase h1 {
          margin: 2.2rem 0 0;
          color: white;
          font-family: var(--font-heading);
          font-size: clamp(3rem, 5.5vw, 5.6rem);
          line-height: 1.03;
          letter-spacing: -0.045em;
        }

        .register-showcase h1 span {
          background: linear-gradient(90deg, #35b7ff, #9c58ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .register-showcase > p {
          max-width: 700px;
          margin-top: 2rem;
          color: #a9c9ed;
          font-size: clamp(1.05rem, 1.45vw, 1.34rem);
          line-height: 1.58;
        }

        .register-metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.2rem;
          width: 100%;
          margin-top: auto;
          padding-top: 3rem;
        }

        .register-metrics div {
          min-height: 118px;
          display: grid;
          place-items: center;
          gap: 0.45rem;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          background: rgba(255,255,255,0.025);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .register-metrics svg {
          color: #20d9ff;
        }

        .register-metrics div:nth-child(2) svg {
          color: #8e5cff;
        }

        .register-metrics div:nth-child(3) svg {
          color: #ffd51d;
        }

        .register-metrics strong {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 1.8vw, 1.85rem);
          line-height: 1;
        }

        .register-metrics span {
          color: #8fa5c2;
          font-weight: 800;
          font-size: 0.76rem;
        }

        .register-card {
          border: 1px solid rgba(132, 151, 190, 0.16);
          border-radius: 28px;
          background: rgba(10, 15, 35, 0.72);
          box-shadow: 0 36px 90px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.06);
          backdrop-filter: blur(18px);
          padding: clamp(1.6rem, 3vw, 2.35rem);
        }

        .register-card-heading h2 {
          margin: 0;
          color: white;
          font-family: var(--font-heading);
          font-size: clamp(1.9rem, 3vw, 2.65rem);
          letter-spacing: -0.025em;
        }

        .register-card-heading p {
          margin: 0.8rem 0 0;
          color: #96a4bd;
          line-height: 1.55;
          font-size: 1rem;
        }

        .register-fields {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          margin-top: 1.6rem;
        }

        .register-field {
          display: block;
        }

        .register-field-wide {
          grid-column: 1 / -1;
        }

        .register-field > span {
          display: block;
          color: #cbd5e1;
          font-weight: 900;
          margin-bottom: 0.65rem;
        }

        .register-field > div {
          display: flex;
          align-items: center;
          gap: 0.78rem;
          border-radius: 15px;
          background: #eaf2ff;
          color: #71829c;
          padding: 0 1rem;
          min-height: 56px;
        }

        .register-field input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #101828;
          font: inherit;
          font-size: 0.98rem;
        }

        .register-package-block {
          margin-top: 1.8rem;
        }

        .register-package-block h3 {
          color: white;
          font-family: var(--font-heading);
          font-size: 1.35rem;
          margin: 0;
        }

        .register-package-block p {
          margin: 0.35rem 0 0;
          color: #96a4bd;
          font-size: 0.9rem;
        }

        .register-package-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .register-package-card {
          position: relative;
          display: grid;
          grid-template-columns: 96px minmax(0, 1fr);
          gap: 0.9rem;
          text-align: left;
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 18px;
          background: rgba(255,255,255,0.035);
          color: white;
          padding: 0.72rem;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }

        .register-package-card:hover,
        .register-package-card.is-selected {
          transform: translateY(-3px);
          border-color: var(--package-color);
          box-shadow: 0 18px 34px rgba(0,0,0,0.22), 0 0 0 1px color-mix(in srgb, var(--package-color) 45%, transparent);
        }

        .register-package-card img {
          width: 96px;
          height: 112px;
          object-fit: cover;
          border-radius: 13px;
          background: #0f172a;
        }

        .register-package-card strong,
        .register-package-card small,
        .register-package-card b {
          display: block;
        }

        .register-package-card strong {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          line-height: 1.2;
        }

        .register-package-card small {
          margin-top: 0.35rem;
          color: #9fb0cb;
          line-height: 1.35;
          font-weight: 700;
        }

        .register-package-card b {
          margin-top: 0.6rem;
          color: var(--package-color);
          font-size: 1.25rem;
          font-weight: 950;
        }

        .register-package-check {
          position: absolute;
          right: 0.85rem;
          top: 0.85rem;
          color: var(--package-color);
          opacity: 0;
          transform: scale(0.85);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .register-package-card.is-selected .register-package-check {
          opacity: 1;
          transform: scale(1);
        }

        .register-payment {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          margin-top: 1.6rem;
          color: #cbd5e1;
          font-weight: 850;
        }

        .register-payment > span {
          margin-right: 0.25rem;
          color: white;
        }

        .register-payment label,
        .register-terms {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
        }

        .register-payment input,
        .register-terms input {
          accent-color: #4b82ff;
        }

        .register-terms {
          margin-top: 1.2rem;
          color: #9baac2;
          font-weight: 800;
          line-height: 1.45;
        }

        .register-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          min-height: 62px;
          border: 0;
          border-radius: 17px;
          margin-top: 1.6rem;
          background: linear-gradient(135deg, #8a5cf6, #3f83f8);
          color: white;
          box-shadow: 0 18px 38px rgba(90, 81, 255, 0.34);
          cursor: pointer;
          font-family: var(--font-heading);
          font-weight: 950;
          font-size: 1.1rem;
        }

        .register-login-link {
          display: flex;
          justify-content: center;
          gap: 0.45rem;
          margin: 1.35rem 0 0;
          color: #94a3b8;
          font-weight: 800;
        }

        .register-login-link button {
          border: 0;
          background: transparent;
          color: #35d9ff;
          cursor: pointer;
          font-weight: 950;
        }

        @media (max-width: 1180px) {
          .register-layout {
            grid-template-columns: minmax(0, 1fr);
            width: min(92vw, 860px);
            gap: 2.5rem;
          }

          .register-showcase {
            position: static;
            min-height: auto;
          }

          .register-brand {
            margin-bottom: 2.6rem;
          }
        }

        @media (max-width: 760px) {
          .register-layout {
            width: min(100% - 2rem, 560px);
            padding: 1.25rem 0 2rem;
          }

          .register-showcase h1 {
            font-size: 2.9rem;
          }

          .register-metrics,
          .register-fields,
          .register-package-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .register-package-card {
            grid-template-columns: 84px minmax(0, 1fr);
          }

          .register-package-card img {
            width: 84px;
            height: 104px;
          }

          .register-card {
            border-radius: 22px;
          }

          .register-login-link {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </main>
  );
};
