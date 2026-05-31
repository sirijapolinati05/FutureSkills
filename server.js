const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize PostgreSQL Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

// Helper: Query all tables to construct the complete DB structure (GET /api/db)
async function readDbFromPg() {
  const db = {};

  try {
    // 1. Users
    const usersRes = await pool.query('SELECT * FROM users ORDER BY created_at ASC');
    db.users = usersRes.rows.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      packageName: user.package_name,
      sponsorCode: user.sponsor_code,
      referredBy: user.referred_by,
      status: user.status,
      kycStatus: user.kyc_status,
      kycDetails: user.kyc_details,
      createdAt: user.created_at
    }));

    // 2. Earnings
    const earningsRes = await pool.query('SELECT * FROM earnings WHERE id = 1');
    if (earningsRes.rowCount > 0) {
      const e = earningsRes.rows[0];
      db.earnings = {
        today: Number(e.today),
        sevenDays: Number(e.seven_days),
        thirtyDays: Number(e.thirty_days),
        allTime: Number(e.all_time),
        passive: Number(e.passive),
        pending: Number(e.pending),
        industry: Number(e.industry)
      };
    } else {
      db.earnings = { today: 0, sevenDays: 0, thirtyDays: 0, allTime: 0, passive: 0, pending: 0, industry: 0 };
    }

    // 3. Chart Data
    const chartRes = await pool.query('SELECT * FROM chart_data ORDER BY id ASC');
    db.chartData = chartRes.rows.map(pt => ({
      date: pt.date,
      amount: Number(pt.amount)
    }));

    // 4. Courses
    const coursesRes = await pool.query('SELECT * FROM courses');
    db.courses = coursesRes.rows.map(c => ({
      id: c.id,
      title: c.title,
      category: c.category,
      thumbnail: c.thumbnail,
      duration: c.duration,
      lessonsCount: c.lessons_count,
      requiredPackage: c.required_package,
      description: c.description,
      videoUrl: c.video_url
    }));

    // 5. Team
    const teamRes = await pool.query('SELECT * FROM team ORDER BY joined_date ASC');
    db.team = teamRes.rows.map(t => ({
      id: t.id,
      name: t.name,
      email: t.email,
      phone: t.phone,
      packageName: t.package_name,
      status: t.status,
      level: t.level,
      joinedDate: t.joined_date
    }));

    // 6. Live Offers
    const offersRes = await pool.query('SELECT * FROM live_offers');
    db.liveOffers = offersRes.rows.map(o => ({
      id: o.id,
      tag: o.tag,
      title: o.title,
      desc: o.description
    }));

    // 7. Training
    const trainingRes = await pool.query('SELECT * FROM training');
    db.training = trainingRes.rows.map(tr => ({
      id: tr.id,
      title: tr.title,
      duration: tr.duration,
      desc: tr.description
    }));

    // 8. Webinars
    const webinarsRes = await pool.query('SELECT * FROM webinars');
    db.webinars = webinarsRes.rows.map(w => ({
      id: w.id,
      title: w.title,
      speaker: w.speaker,
      time: w.time,
      url: w.url
    }));

    // 9. Community Links
    const linksRes = await pool.query('SELECT * FROM community_links');
    db.communityLinks = linksRes.rows.map(cl => ({
      id: cl.id,
      name: cl.name,
      label: cl.label,
      url: cl.url,
      iconKey: cl.icon_key
    }));

    // 10. System Configs
    const configRes = await pool.query('SELECT * FROM system_config');
    const configs = {};
    configRes.rows.forEach(row => {
      configs[row.key] = row.value;
    });

    db.packages = configs.packages || [];
    db.affiliateConfig = configs.affiliateConfig || {};
    db.freelancingProjects = configs.freelancingProjects || [];
    db.earningTarget = configs.earningTarget || {};
    db.reports = configs.reports || {};

  } catch (err) {
    console.error('Error reading database from PostgreSQL:', err);
    throw err;
  }

  return db;
}

// Helper: Save/Update complete DB structure to PostgreSQL tables (POST /api/db)
async function writeDbToPg(dbData) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Sync Users
    if (dbData.users && Array.isArray(dbData.users)) {
      const userIds = dbData.users.map(u => u.id);
      if (userIds.length > 0) {
        await client.query('DELETE FROM users WHERE id NOT IN (' + userIds.map((_, i) => `$${i+1}`).join(',') + ')', userIds);
      } else {
        await client.query('DELETE FROM users');
      }

      for (const user of dbData.users) {
        await client.query(`
          INSERT INTO users (id, email, name, phone, role, package_name, sponsor_code, referred_by, status, kyc_status, kyc_details, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          ON CONFLICT (id) DO UPDATE SET
            email = EXCLUDED.email,
            name = EXCLUDED.name,
            phone = EXCLUDED.phone,
            role = EXCLUDED.role,
            package_name = EXCLUDED.package_name,
            sponsor_code = EXCLUDED.sponsor_code,
            referred_by = EXCLUDED.referred_by,
            status = EXCLUDED.status,
            kyc_status = EXCLUDED.kyc_status,
            kyc_details = EXCLUDED.kyc_details,
            created_at = EXCLUDED.created_at
        `, [
          user.id,
          user.email,
          user.name,
          user.phone || null,
          user.role || 'user',
          user.packageName || 'N/A',
          user.sponsorCode || null,
          user.referredBy || null,
          user.status || 'active',
          user.kycStatus || 'pending',
          user.kycDetails ? JSON.stringify(user.kycDetails) : null,
          user.createdAt || new Date()
        ]);
      }
    }

    // 2. Sync Earnings
    if (dbData.earnings) {
      const e = dbData.earnings;
      await client.query(`
        INSERT INTO earnings (id, today, seven_days, thirty_days, all_time, passive, pending, industry)
        VALUES (1, $1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          today = EXCLUDED.today,
          seven_days = EXCLUDED.seven_days,
          thirty_days = EXCLUDED.thirty_days,
          all_time = EXCLUDED.all_time,
          passive = EXCLUDED.passive,
          pending = EXCLUDED.pending,
          industry = EXCLUDED.industry
      `, [e.today || 0, e.sevenDays || 0, e.thirtyDays || 0, e.allTime || 0, e.passive || 0, e.pending || 0, e.industry || 0]);
    }

    // 3. Sync Chart Data
    if (dbData.chartData && Array.isArray(dbData.chartData)) {
      await client.query('DELETE FROM chart_data');
      for (const pt of dbData.chartData) {
        await client.query(`
          INSERT INTO chart_data (date, amount)
          VALUES ($1, $2)
        `, [pt.date, pt.amount || 0]);
      }
    }

    // 4. Sync Courses
    if (dbData.courses && Array.isArray(dbData.courses)) {
      const courseIds = dbData.courses.map(c => c.id);
      if (courseIds.length > 0) {
        await client.query('DELETE FROM courses WHERE id NOT IN (' + courseIds.map((_, i) => `$${i+1}`).join(',') + ')', courseIds);
      } else {
        await client.query('DELETE FROM courses');
      }

      for (const c of dbData.courses) {
        await client.query(`
          INSERT INTO courses (id, title, category, thumbnail, duration, lessons_count, required_package, description, video_url)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            category = EXCLUDED.category,
            thumbnail = EXCLUDED.thumbnail,
            duration = EXCLUDED.duration,
            lessons_count = EXCLUDED.lessons_count,
            required_package = EXCLUDED.required_package,
            description = EXCLUDED.description,
            video_url = EXCLUDED.video_url
        `, [c.id, c.title, c.category || null, c.thumbnail || null, c.duration || null, c.lessonsCount || 0, c.requiredPackage || null, c.description || null, c.videoUrl || null]);
      }
    }

    // 5. Sync Team
    if (dbData.team && Array.isArray(dbData.team)) {
      const teamIds = dbData.team.map(t => t.id);
      if (teamIds.length > 0) {
        await client.query('DELETE FROM team WHERE id NOT IN (' + teamIds.map((_, i) => `$${i+1}`).join(',') + ')', teamIds);
      } else {
        await client.query('DELETE FROM team');
      }

      for (const t of dbData.team) {
        await client.query(`
          INSERT INTO team (id, name, email, phone, package_name, status, level, joined_date)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            email = EXCLUDED.email,
            phone = EXCLUDED.phone,
            package_name = EXCLUDED.package_name,
            status = EXCLUDED.status,
            level = EXCLUDED.level,
            joined_date = EXCLUDED.joined_date
        `, [t.id, t.name, t.email || null, t.phone || null, t.packageName || null, t.status || 'active', t.level || 1, t.joinedDate || null]);
      }
    }

    // 6. Sync Live Offers
    if (dbData.liveOffers && Array.isArray(dbData.liveOffers)) {
      const offerIds = dbData.liveOffers.map(o => o.id);
      if (offerIds.length > 0) {
        await client.query('DELETE FROM live_offers WHERE id NOT IN (' + offerIds.map((_, i) => `$${i+1}`).join(',') + ')', offerIds);
      } else {
        await client.query('DELETE FROM live_offers');
      }

      for (const o of dbData.liveOffers) {
        await client.query(`
          INSERT INTO live_offers (id, tag, title, description)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id) DO UPDATE SET
            tag = EXCLUDED.tag,
            title = EXCLUDED.title,
            description = EXCLUDED.description
        `, [o.id, o.tag || null, o.title, o.desc || null]);
      }
    }

    // 7. Sync Training
    if (dbData.training && Array.isArray(dbData.training)) {
      const trainingIds = dbData.training.map(tr => tr.id);
      if (trainingIds.length > 0) {
        await client.query('DELETE FROM training WHERE id NOT IN (' + trainingIds.map((_, i) => `$${i+1}`).join(',') + ')', trainingIds);
      } else {
        await client.query('DELETE FROM training');
      }

      for (const tr of dbData.training) {
        await client.query(`
          INSERT INTO training (id, title, duration, description)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            duration = EXCLUDED.duration,
            description = EXCLUDED.description
        `, [tr.id, tr.title, tr.duration || null, tr.desc || null]);
      }
    }

    // 8. Sync Webinars
    if (dbData.webinars && Array.isArray(dbData.webinars)) {
      const webinarIds = dbData.webinars.map(w => w.id);
      if (webinarIds.length > 0) {
        await client.query('DELETE FROM webinars WHERE id NOT IN (' + webinarIds.map((_, i) => `$${i+1}`).join(',') + ')', webinarIds);
      } else {
        await client.query('DELETE FROM webinars');
      }

      for (const w of dbData.webinars) {
        await client.query(`
          INSERT INTO webinars (id, title, speaker, time, url)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            speaker = EXCLUDED.speaker,
            time = EXCLUDED.time,
            url = EXCLUDED.url
        `, [w.id, w.title, w.speaker || null, w.time || null, w.url || null]);
      }
    }

    // 9. Sync Community Links
    if (dbData.communityLinks && Array.isArray(dbData.communityLinks)) {
      const linkIds = dbData.communityLinks.map(cl => cl.id);
      if (linkIds.length > 0) {
        await client.query('DELETE FROM community_links WHERE id NOT IN (' + linkIds.map((_, i) => `$${i+1}`).join(',') + ')', linkIds);
      } else {
        await client.query('DELETE FROM community_links');
      }

      for (const cl of dbData.communityLinks) {
        await client.query(`
          INSERT INTO community_links (id, name, label, url, icon_key)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            label = EXCLUDED.label,
            url = EXCLUDED.url,
            icon_key = EXCLUDED.icon_key
        `, [cl.id, cl.name, cl.label || null, cl.url || null, cl.iconKey || null]);
      }
    }

    // 10. Sync Configs
    const configs = [
      { key: 'packages', val: dbData.packages || [] },
      { key: 'affiliateConfig', val: dbData.affiliateConfig || {} },
      { key: 'freelancingProjects', val: dbData.freelancingProjects || [] },
      { key: 'earningTarget', val: dbData.earningTarget || {} },
      { key: 'reports', val: dbData.reports || {} }
    ];

    for (const conf of configs) {
      await client.query(`
        INSERT INTO system_config (key, value)
        VALUES ($1, $2)
        ON CONFLICT (key) DO UPDATE SET
          value = EXCLUDED.value
      `, [conf.key, JSON.stringify(conf.val)]);
    }

    await client.query('COMMIT');
    return { success: true };
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Error writing to PostgreSQL database:', e);
    throw e;
  } finally {
    client.release();
  }
}

app.get('/api/db', async (req, res) => {
  try {
    const data = await readDbFromPg();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch database state' });
  }
});

app.post('/api/db', async (req, res) => {
  try {
    await writeDbToPg(req.body);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to write data to PostgreSQL' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Shared database server listening on port ${PORT} with PostgreSQL!`);
});
