import React from 'react';

type Milestone = {
  amount: number;
  label: string;
  color: string;
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
      </div>
    </div>
  );
};
export default EarningTarget;
