import React, { useEffect, useState } from 'react';
import { localDb, MilestoneReward } from '../../db/localDb';

const imageOptions = ['amazon', 'flipkart', 'earphones', 'wireless_earphones', 'earbuds', 'headphones', 'smartwatch'];

export const TargetsManager: React.FC = () => {
  const [milestonesInput, setMilestonesInput] = useState('');
  const [rewards, setRewards] = useState<MilestoneReward[]>([]);
  const [form, setForm] = useState<MilestoneReward>({ id: '', title: '', imageKey: 'amazon', unlockAt: 10000, accent: '#f59e0b', description: '' });

  const refresh = () => {
    const config = localDb.getEarningTargetConfig();
    setMilestonesInput(config.milestones.join(', '));
    setRewards(config.rewards);
  };

  useEffect(() => {
    refresh();
  }, []);

  const saveMilestones = () => {
    const milestones = milestonesInput.split(',').map((item) => Number(item.trim())).filter((item) => !Number.isNaN(item) && item > 0);
    localDb.saveEarningTargetConfig({ milestones, rewards });
    alert('Milestones updated.');
  };

  const addReward = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedRewards = [...rewards, { ...form, id: `reward-${Math.random().toString(36).slice(2, 9)}` }];
    setRewards(updatedRewards);
    localDb.saveEarningTargetConfig({ milestones: milestonesInput.split(',').map((item) => Number(item.trim())).filter(Boolean), rewards: updatedRewards });
    setForm({ id: '', title: '', imageKey: 'amazon', unlockAt: 10000, accent: '#f59e0b', description: '' });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2rem' }} className="admin-grid">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a' }}>Earning Target Manager</h2>
          <p style={{ fontSize: '0.9rem', color: '#475569' }}>Milestone dots, target slabs, reward cards anni ikkade control cheyyachu.</p>
        </div>

        <div className="admin-card" style={{ background: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0 }}>Milestones</h3>
          <textarea className="admin-form-input" value={milestonesInput} onChange={(e) => setMilestonesInput(e.target.value)} style={{ minHeight: '110px' }} />
          <button className="admin-btn admin-btn-primary" onClick={saveMilestones}>Save Milestones</button>
        </div>

        <div className="admin-card" style={{ background: 'white', padding: '1.5rem' }}>
          <h3 style={{ marginTop: 0 }}>Reward Cards</h3>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead><tr><th>Title</th><th>Unlock At</th><th>Asset</th><th /></tr></thead>
              <tbody>
                {rewards.map((reward) => (
                  <tr key={reward.id}>
                    <td><strong>{reward.title}</strong><div style={{ fontSize: '0.75rem', color: '#64748b' }}>{reward.description}</div></td>
                    <td>{reward.unlockAt}</td>
                    <td>{reward.imageKey}</td>
                    <td style={{ textAlign: 'right' }}><button className="admin-btn admin-btn-danger" onClick={() => { const updated = rewards.filter((item) => item.id !== reward.id); setRewards(updated); localDb.saveEarningTargetConfig({ milestones: milestonesInput.split(',').map((item) => Number(item.trim())).filter(Boolean), rewards: updated }); }}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <form onSubmit={addReward} className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0 }}>Add Reward Card</h3>
        <input className="admin-form-input" placeholder="Reward title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <select className="admin-form-input" value={form.imageKey} onChange={(e) => setForm({ ...form, imageKey: e.target.value })}>{imageOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select>
        <input className="admin-form-input" type="number" placeholder="Unlock at amount" value={form.unlockAt} onChange={(e) => setForm({ ...form, unlockAt: Number(e.target.value) })} required />
        <input className="admin-form-input" placeholder="Accent color" value={form.accent} onChange={(e) => setForm({ ...form, accent: e.target.value })} required />
        <textarea className="admin-form-input" placeholder="Reward description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ minHeight: '90px' }} required />
        <button type="submit" className="admin-btn admin-btn-primary">Add Reward</button>
      </form>
      <style>{`@media (max-width: 960px) { .admin-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};
