import React, { useState } from 'react';
import AmazonImg from '../../assets/Amazon.png';
import FlipkartImg from '../../assets/Flipkart.png';
import EarPhonesImg from '../../assets/EarPhones.png';
import WirelessEarPhonesImg from '../../assets/Wireless-EarPhones.png';
import EarBudsImg from '../../assets/EarBuds.png';
import HeadPhonesImg from '../../assets/HeadPhones.png';
import SmartWatchImg from '../../assets/SmartWatch.png';

type Milestone = {
  amount: number;
  label: string;
  color: string;
};

type ClaimFormState = {
  fullName: string;
  phoneNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
};

const defaultClaimForm: ClaimFormState = {
  fullName: '',
  phoneNumber: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
};

const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

const formatMilestoneLabel = (amount: number) => {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${Number.isInteger(lakhs) ? lakhs : lakhs.toFixed(1)}L`;
  }

  return `₹${Math.round(amount / 1000)}K`;
};

const buildMilestones = (currentEarnings: number) => {
  const baseMilestones = [
    10000,
    25000,
    50000,
    100000,
    300000,
    500000,
    750000,
    1000000,
    1500000,
    2000000,
  ];

  const milestones = [...baseMilestones];
  let nextAmount = milestones[milestones.length - 1] + 500000;
  const visibleLimit = Math.max(currentEarnings + 1000000, 2500000);

  while (milestones[milestones.length - 1] < visibleLimit) {
    milestones.push(nextAmount);
    nextAmount += 500000;
  }

  return milestones;
};

// ==================== EARNING TARGET SCREEN ====================
export const EarningTarget: React.FC = () => {
  const currentEarnings = 415104;
  const dotSize = 18;
  const lineCenter = dotSize / 2;
  const [activeClaimCard, setActiveClaimCard] = useState<string | null>(null);
  const [claimForm, setClaimForm] = useState<ClaimFormState>(defaultClaimForm);
  const milestoneAmounts = buildMilestones(currentEarnings);
  const target =
    milestoneAmounts.find((amount) => currentEarnings < amount) ??
    milestoneAmounts[milestoneAmounts.length - 1];
  const percentage = Math.min(100, Math.floor((currentEarnings / target) * 100));
  const remainingAmount = Math.max(target - currentEarnings, 0);
  const lastAchievedIndex = milestoneAmounts.reduce(
    (lastIndex, amount, index) => (currentEarnings >= amount ? index : lastIndex),
    -1
  );
  const nextMilestoneIndex = Math.min(lastAchievedIndex + 1, milestoneAmounts.length - 1);
  const previousAmount = lastAchievedIndex >= 0 ? milestoneAmounts[lastAchievedIndex] : 0;
  const nextAmount = milestoneAmounts[nextMilestoneIndex];
  const segmentProgress =
    nextAmount > previousAmount
      ? Math.min(Math.max((currentEarnings - previousAmount) / (nextAmount - previousAmount), 0), 1)
      : 0;
  const progressPosition =
    lastAchievedIndex < 0
      ? 0
      : lastAchievedIndex + (nextMilestoneIndex > lastAchievedIndex ? segmentProgress : 0);
  const progressWidth =
    milestoneAmounts.length > 1 ? `${(progressPosition / (milestoneAmounts.length - 1)) * 100}%` : '0%';
  const milestoneColors = [
    '#22c55e',
    '#eab308',
    '#f97316',
    '#06b6d4',
    '#8b5cf6',
    '#ef4444',
    '#14b8a6',
    '#f59e0b',
  ];
  const milestones: Milestone[] = milestoneAmounts.map((amount, index) => ({
    amount,
    label: formatMilestoneLabel(amount),
    color: milestoneColors[index % milestoneColors.length],
  }));
  const rewardCards = [
    {
      title: 'Amazon Gift Reward',
      image: AmazonImg,
      unlockAt: milestones[0],
      accent: '#f59e0b',
      desc: 'First milestone reach ayyaka Amazon reward claim cheskovachu.',
    },
    {
      title: 'Flipkart Gift Reward',
      image: FlipkartImg,
      unlockAt: milestones[1],
      accent: '#2563eb',
      desc: 'Second milestone unlock ayyaka Flipkart reward active avtundi.',
    },
    {
      title: 'Ear Phones Reward',
      image: EarPhonesImg,
      unlockAt: milestones[2],
      accent: '#f97316',
      desc: 'Third milestone complete chesthe Ear Phones claim button enable avtundi.',
    },
    {
      title: 'Wireless Ear Phones',
      image: WirelessEarPhonesImg,
      unlockAt: milestones[3],
      accent: '#0ea5e9',
      desc: 'Fourth milestone tarvata wireless audio reward unlock avtundi.',
    },
    {
      title: 'Ear Buds Reward',
      image: EarBudsImg,
      unlockAt: milestones[4],
      accent: '#8b5cf6',
      desc: 'Fifth milestone reach ayyaka Ear Buds reward claim cheskovachu.',
    },
    {
      title: 'Head Phones Reward',
      image: HeadPhonesImg,
      unlockAt: milestones[5],
      accent: '#16a34a',
      desc: 'Next slab cross ayyaka Head Phones reward button active avtundi.',
    },
    {
      title: 'Smart Watch Reward',
      image: SmartWatchImg,
      unlockAt: milestones[6],
      accent: '#dc2626',
      desc: 'Higher milestone reach chesthe Smart Watch reward unlock avtundi.',
    },
  ];
  const updateClaimField = (field: keyof ClaimFormState, value: string) => {
    setClaimForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const selectedReward = rewardCards.find((reward) => reward.title === activeClaimCard) ?? null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#1e293b' }}>
          Earning Target Tracker
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Monitor your progress toward hitting your direct affiliate milestones.
        </p>
      </div>

      <div
        style={{
          padding: '2.8rem',
          background: 'white',
          borderRadius: '28px',
          boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15), 0 10px 15px -3px rgb(0 0 0 / 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(to right, #38bdf8, #1d4ed8)',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Current Progress</span>
            <h3 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0ea5e9', margin: '0.2rem 0 0' }}>
              {formatCurrency(currentEarnings)}
            </h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Target Milestone</span>
            <h3 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#1e293b', margin: '0.2rem 0 0' }}>
              {formatCurrency(target)}
            </h3>
          </div>
        </div>

        <div
          style={{
            width: '100%',
            height: '20px',
            backgroundColor: '#f1f5f9',
            borderRadius: '999px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'inset 0 3px 8px rgba(148, 163, 184, 0.22), inset 0 -2px 4px rgba(255,255,255,0.95)',
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: '100%',
              background: 'linear-gradient(to right, #38bdf8, #1d4ed8)',
              borderRadius: '999px',
              transition: 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -3px 6px rgba(29, 78, 216, 0.28)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: '10px',
              right: '10px',
              height: '38%',
              borderRadius: '999px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0))',
              pointerEvents: 'none',
            }}
          />
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '0.78rem',
              fontWeight: 800,
              color: percentage > 55 ? 'white' : '#1e293b',
              whiteSpace: 'nowrap',
            }}
          >
            {percentage}% Achieved
          </span>
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569', margin: 0 }}>Milestones</p>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
              Auto extends after every target
            </span>
          </div>

          <div style={{ overflowX: 'auto', paddingBottom: '0.45rem' }}>
            <div
              style={{
                position: 'relative',
                minWidth: `${Math.max(milestones.length * 88, 760)}px`,
                padding: '0 0.25rem',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: `${lineCenter}px`,
                  left: `${lineCenter + 4}px`,
                  right: `${lineCenter + 4}px`,
                  height: '5px',
                  background: '#e2e8f0',
                  borderRadius: '999px',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: `${lineCenter}px`,
                  left: `${lineCenter + 4}px`,
                  width: progressWidth,
                  height: '5px',
                  background: '#0f172a',
                  borderRadius: '999px',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  transition: 'width 0.6s ease',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  position: 'relative',
                  zIndex: 3,
                  gap: '1rem',
                }}
              >
                {milestones.map((milestone) => {
                  const isAchieved = currentEarnings >= milestone.amount;

                  return (
                    <div
                      key={milestone.amount}
                      style={{
                        textAlign: 'center',
                        minWidth: '72px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: `${dotSize}px`,
                          height: `${dotSize}px`,
                          boxSizing: 'border-box',
                          borderRadius: '50%',
                          background: isAchieved
                            ? `radial-gradient(circle at 30% 30%, #ffffff, ${milestone.color} 45%, ${milestone.color} 72%, rgba(15, 23, 42, 0.22) 100%)`
                            : 'radial-gradient(circle at 30% 30%, #ffffff, #f8fafc 50%, #d9e2ef 100%)',
                          border: isAchieved ? `1px solid ${milestone.color}` : '1px solid #cbd5e1',
                          boxShadow: isAchieved
                            ? `0 0 10px ${milestone.color}55, inset 2px 2px 3px rgba(255,255,255,0.7), inset -3px -4px 6px rgba(15,23,42,0.22), 0 5px 10px rgba(15,23,42,0.18)`
                            : 'inset 2px 2px 3px rgba(255,255,255,0.95), inset -3px -4px 6px rgba(148,163,184,0.24), 0 4px 9px rgba(148,163,184,0.22)',
                          transition: 'all 0.4s ease',
                        }}
                      />

                      <div
                        style={{
                          marginTop: '10px',
                          fontSize: '0.8rem',
                          fontWeight: isAchieved ? 700 : 500,
                          color: isAchieved ? milestone.color : '#64748b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {milestone.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#f8fafc',
            padding: '1.1rem 1.3rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.08), inset 0 -2px 3px rgba(255, 255, 255, 0.6)',
            fontSize: '0.9rem',
            color: '#475569',
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '-10px',
              left: '20px',
              background: 'white',
              padding: '0 8px',
              fontSize: '0.75rem',
              color: '#64748b',
              fontWeight: 600,
            }}
          >
            TIP
          </span>

          You are only <strong>{formatCurrency(remainingAmount)}</strong> away from your next{' '}
          <strong>{formatCurrency(target)}</strong> milestone reward. Keep pushing your premium referrals to
          unlock the next slab faster.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#1e293b', margin: 0 }}>Milestone Rewards</h3>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.88rem', color: '#64748b' }}>
              Claim buttons milestone reach ayyaka one-by-one activate avtayi.
            </p>
          </div>

          <div
            className="earning-target-rewards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: '1.6rem',
            }}
          >
            {rewardCards.map((reward, index) => {
              const isUnlocked = currentEarnings >= reward.unlockAt.amount;

              return (
                <div
                  key={reward.title}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: isUnlocked ? `2px solid ${reward.accent}` : '1px solid #e2e8f0',
                    borderRadius: '18px',
                    background: 'white',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.12)',
                    position: 'relative',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    height: '100%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 30px 50px -12px rgb(0 0 0 / 0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 20px 40px -10px rgb(0 0 0 / 0.12)';
                  }}
                >
                  <div
                    style={{
                      height: '190px',
                      overflow: 'hidden',
                      background: '#f8fafc',
                      borderRadius: '18px 18px 0 0',
                      padding: '0.8rem 0.8rem 0.3rem',
                    }}
                  >
                    <div
                      style={{
                        background: 'white',
                        width: '100%',
                        height: '100%',
                        borderRadius: '14px',
                        border: '3px solid #f1f5f9',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={reward.image}
                        alt={reward.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.5s ease',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'scale(1.06)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    </div>
                  </div>

                  <span
                    style={{
                      position: 'absolute',
                      top: '24px',
                      right: '16px',
                      background: isUnlocked ? reward.accent : '#cbd5e1',
                      color: 'white',
                      fontSize: '0.74rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      fontWeight: 700,
                      boxShadow: isUnlocked
                        ? `0 8px 14px -6px ${reward.accent}aa, inset 1px 1px 2px rgba(255,255,255,0.55), inset -2px -3px 5px rgba(15,23,42,0.22)`
                        : '0 7px 12px -7px rgba(148,163,184,0.9), inset 1px 1px 2px rgba(255,255,255,0.85), inset -2px -3px 5px rgba(148,163,184,0.22)',
                    }}
                  >
                    {isUnlocked ? 'UNLOCKED' : `M${index + 1}`}
                  </span>

                  <div style={{ padding: '1rem 1.2rem', flex: 1 }}>
                    <h3
                      style={{
                        fontSize: '1.12rem',
                        fontFamily: 'var(--font-heading)',
                        margin: '0 0 0.5rem 0',
                        color: '#1e293b',
                      }}
                    >
                      {reward.title}
                    </h3>

                    <span
                      style={{
                        fontSize: '1rem',
                        fontWeight: 800,
                        color: reward.accent,
                        display: 'block',
                        marginBottom: '0.6rem',
                      }}
                    >
                      Unlock at {reward.unlockAt.label}
                    </span>

                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: '#64748b',
                        lineHeight: '1.5',
                        margin: 0,
                      }}
                    >
                      {reward.desc}
                    </p>
                  </div>

                  <div style={{ padding: '0 1.2rem 1.2rem' }}>
                    <button
                      disabled={!isUnlocked}
                      type="button"
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: isUnlocked
                          ? 'linear-gradient(135deg, #0369a1, #0ea5e9)'
                          : '#cbd5e1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: isUnlocked ? 'pointer' : 'not-allowed',
                        transition: 'all 0.3s ease',
                        boxShadow: isUnlocked
                          ? '0 6px 12px -3px rgb(3 105 161 / 0.4), inset 0 -2px 4px rgba(255,255,255,0.3)'
                          : 'none',
                        opacity: isUnlocked ? 1 : 0.75,
                      }}
                      onMouseEnter={(e) => {
                        if (isUnlocked) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 10px 16px -4px rgb(3 105 161 / 0.5)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isUnlocked) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow =
                            '0 6px 12px -3px rgb(3 105 161 / 0.4), inset 0 -2px 4px rgba(255,255,255,0.3)';
                        }
                      }}
                      onClick={() => {
                        if (!isUnlocked) {
                          return;
                        }

                        setActiveClaimCard((prev) => (prev === reward.title ? null : reward.title));
                        setClaimForm(defaultClaimForm);
                      }}
                    >
                      Claim
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedReward && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 1000,
          }}
          onClick={() => setActiveClaimCard(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '760px',
              maxHeight: 'calc(100vh - 2rem)',
              overflowY: 'auto',
              borderRadius: '28px',
              padding: '1.2rem',
              background: 'linear-gradient(145deg, #f8fbff, #e7eef8)',
              border: '1px solid rgba(191, 219, 254, 0.95)',
              boxShadow: `
                22px 22px 40px rgba(15, 23, 42, 0.18),
                -16px -16px 34px rgba(255, 255, 255, 0.92),
                inset 5px 5px 10px rgba(255, 255, 255, 0.86),
                inset -6px -6px 12px rgba(148, 163, 184, 0.2)
              `,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>{selectedReward.title}</h3>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
                  Delivery details fill cheyyandi. Team verify chesi reward process chestharu.
                </p>
              </div>
              <span
                style={{
                  whiteSpace: 'nowrap',
                  background: `linear-gradient(135deg, ${selectedReward.accent}, #0f172a)`,
                  color: 'white',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '999px',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  boxShadow:
                    '0 10px 16px -10px rgba(15,23,42,0.6), inset 1px 1px 3px rgba(255,255,255,0.35)',
                }}
              >
                Unlock at {selectedReward.unlockAt.label}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '0.9rem',
              }}
              className="claim-modal-grid"
            >
              {[
                { key: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter your name' },
                { key: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'Enter phone number' },
                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter email' },
                { key: 'pincode', label: 'Pincode', type: 'text', placeholder: 'Enter pincode' },
              ].map((field) => (
                <label key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>{field.label}</span>
                  <input
                    type={field.type}
                    value={claimForm[field.key as keyof ClaimFormState]}
                    placeholder={field.placeholder}
                    onChange={(e) => updateClaimField(field.key as keyof ClaimFormState, e.currentTarget.value)}
                    style={{
                      height: '44px',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      padding: '0 0.9rem',
                      outline: 'none',
                      background: '#f8fafc',
                      boxShadow:
                        'inset 2px 2px 4px rgba(255,255,255,0.95), inset -2px -2px 4px rgba(148,163,184,0.18)',
                      fontSize: '0.9rem',
                      color: '#0f172a',
                    }}
                  />
                </label>
              ))}

              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem', gridColumn: '1 / -1' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>Address Line 1</span>
                <input
                  type="text"
                  value={claimForm.addressLine1}
                  placeholder="House no, street, area"
                  onChange={(e) => updateClaimField('addressLine1', e.currentTarget.value)}
                  style={{
                    height: '44px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    padding: '0 0.9rem',
                    outline: 'none',
                    background: '#f8fafc',
                    boxShadow:
                      'inset 2px 2px 4px rgba(255,255,255,0.95), inset -2px -2px 4px rgba(148,163,184,0.18)',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                  }}
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem', gridColumn: '1 / -1' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>Address Line 2</span>
                <input
                  type="text"
                  value={claimForm.addressLine2}
                  placeholder="Landmark, apartment, optional"
                  onChange={(e) => updateClaimField('addressLine2', e.currentTarget.value)}
                  style={{
                    height: '44px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    padding: '0 0.9rem',
                    outline: 'none',
                    background: '#f8fafc',
                    boxShadow:
                      'inset 2px 2px 4px rgba(255,255,255,0.95), inset -2px -2px 4px rgba(148,163,184,0.18)',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                  }}
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>City</span>
                <input
                  type="text"
                  value={claimForm.city}
                  placeholder="Enter city"
                  onChange={(e) => updateClaimField('city', e.currentTarget.value)}
                  style={{
                    height: '44px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    padding: '0 0.9rem',
                    outline: 'none',
                    background: '#f8fafc',
                    boxShadow:
                      'inset 2px 2px 4px rgba(255,255,255,0.95), inset -2px -2px 4px rgba(148,163,184,0.18)',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                  }}
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>State</span>
                <input
                  type="text"
                  value={claimForm.state}
                  placeholder="Enter state"
                  onChange={(e) => updateClaimField('state', e.currentTarget.value)}
                  style={{
                    height: '44px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    padding: '0 0.9rem',
                    outline: 'none',
                    background: '#f8fafc',
                    boxShadow:
                      'inset 2px 2px 4px rgba(255,255,255,0.95), inset -2px -2px 4px rgba(148,163,184,0.18)',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                  }}
                />
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.15rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setActiveClaimCard(null)}
                style={{
                  padding: '12px 18px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 8px 14px -12px rgba(15,23,42,0.35), inset 2px 2px 4px rgba(255,255,255,0.95)',
                }}
              >
                Close
              </button>
              <button
                type="button"
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: 'none',
                  background: `linear-gradient(135deg, ${selectedReward.accent}, #0f172a)`,
                  color: 'white',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 10px 18px -10px rgba(15,23,42,0.55), inset 0 2px 3px rgba(255,255,255,0.28)',
                }}
              >
                Submit Claim
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1200px) {
          .earning-target-rewards-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 900px) {
          .earning-target-rewards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .claim-modal-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }

        @media (max-width: 560px) {
          .earning-target-rewards-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};
export default EarningTarget;
