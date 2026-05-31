const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuration from environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433', 10),
  user: process.env.DB_USER || 'pavan',
  password: process.env.DB_PASSWORD || 'Sirija2004',
};

async function runMigration() {
  console.log('Connecting to PostgreSQL to check/create database...');
  
  // Connect to default 'postgres' database first to create 'futureskills_db'
  const defaultClient = new Client({
    ...dbConfig,
    database: 'postgres', // default db
  });

  try {
    await defaultClient.connect();
    console.log('Successfully connected to postgres default database.');
    
    // Check if futureskills_db exists
    const dbCheckRes = await defaultClient.query(
      "SELECT 1 FROM pg_database WHERE datname = 'futureskills_db'"
    );

    if (dbCheckRes.rowCount === 0) {
      console.log("Database 'futureskills_db' does not exist. Creating it...");
      await defaultClient.query('CREATE DATABASE futureskills_db');
      console.log("Database 'futureskills_db' created successfully.");
    } else {
      console.log("Database 'futureskills_db' already exists.");
    }
  } catch (err) {
    console.error('Error checking/creating database:', err.message);
    // If postgres default database connection fails, let's try connecting with workflow_db
    console.log("Attempting connection via 'workflow_db' instead...");
    const workflowClient = new Client({
      ...dbConfig,
      database: 'workflow_db',
    });
    try {
      await workflowClient.connect();
      const dbCheckRes = await workflowClient.query(
        "SELECT 1 FROM pg_database WHERE datname = 'futureskills_db'"
      );
      if (dbCheckRes.rowCount === 0) {
        await workflowClient.query('CREATE DATABASE futureskills_db');
        console.log("Database 'futureskills_db' created successfully via workflow_db.");
      }
      await workflowClient.end();
    } catch (innerErr) {
      console.error('Failed to create database via workflow_db too:', innerErr.message);
    }
  } finally {
    try {
      await defaultClient.end();
    } catch (e) {}
  }

  // Now connect to the newly created/existing futureskills_db
  console.log("\nConnecting directly to 'futureskills_db'...");
  const client = new Client({
    ...dbConfig,
    database: 'futureskills_db',
  });

  try {
    await client.connect();
    console.log('Connected to futureskills_db.');

    // 1. Create tables
    console.log('Creating tables...');

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(100) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        role VARCHAR(50) DEFAULT 'user',
        package_name VARCHAR(100) DEFAULT 'N/A',
        sponsor_code VARCHAR(100),
        referred_by VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active',
        kyc_status VARCHAR(50) DEFAULT 'pending',
        kyc_details JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS earnings (
        id INT PRIMARY KEY DEFAULT 1,
        today NUMERIC(15, 2) DEFAULT 0,
        seven_days NUMERIC(15, 2) DEFAULT 0,
        thirty_days NUMERIC(15, 2) DEFAULT 0,
        all_time NUMERIC(15, 2) DEFAULT 0,
        passive NUMERIC(15, 2) DEFAULT 0,
        pending NUMERIC(15, 2) DEFAULT 0,
        industry NUMERIC(15, 2) DEFAULT 0,
        CONSTRAINT one_row CHECK (id = 1)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS chart_data (
        id SERIAL PRIMARY KEY,
        date VARCHAR(50) NOT NULL,
        amount NUMERIC(15, 2) DEFAULT 0
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        thumbnail VARCHAR(500),
        duration VARCHAR(50),
        lessons_count INT DEFAULT 0,
        required_package VARCHAR(100),
        description TEXT,
        video_url VARCHAR(500)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS team (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        package_name VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active',
        level INT DEFAULT 1,
        joined_date VARCHAR(50)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS live_offers (
        id VARCHAR(100) PRIMARY KEY,
        tag VARCHAR(100),
        title VARCHAR(255) NOT NULL,
        description TEXT
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS training (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        duration VARCHAR(50),
        description TEXT
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS webinars (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        speaker VARCHAR(255),
        time VARCHAR(100),
        url VARCHAR(500)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS community_links (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        label VARCHAR(255),
        url VARCHAR(500),
        icon_key VARCHAR(100)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS system_config (
        key VARCHAR(100) PRIMARY KEY,
        value JSONB NOT NULL
      );
    `);

    console.log('Tables created successfully.');

    // 2. Load and migrate data from db.json if it exists
    const dbPath = path.join(__dirname, 'db.json');
    if (fs.existsSync(dbPath)) {
      console.log('\nFound db.json! Migrating data...');
      const fileData = fs.readFileSync(dbPath, 'utf8');
      const dbData = JSON.parse(fileData);

      // --- Migrate Users ---
      if (dbData.users && Array.isArray(dbData.users)) {
        console.log(`Migrating ${dbData.users.length} users...`);
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

      // --- Migrate Earnings ---
      if (dbData.earnings) {
        console.log('Migrating earnings...');
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

      // --- Migrate Chart Data ---
      if (dbData.chartData && Array.isArray(dbData.chartData)) {
        console.log(`Migrating ${dbData.chartData.length} chart data points...`);
        await client.query('TRUNCATE chart_data RESTART IDENTITY');
        for (const pt of dbData.chartData) {
          await client.query(`
            INSERT INTO chart_data (date, amount)
            VALUES ($1, $2)
          `, [pt.date, pt.amount || 0]);
        }
      }

      // --- Migrate Courses ---
      if (dbData.courses && Array.isArray(dbData.courses)) {
        console.log(`Migrating ${dbData.courses.length} courses...`);
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

      // --- Migrate Team ---
      if (dbData.team && Array.isArray(dbData.team)) {
        console.log(`Migrating ${dbData.team.length} team members...`);
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

      // --- Migrate Live Offers ---
      if (dbData.liveOffers && Array.isArray(dbData.liveOffers)) {
        console.log(`Migrating ${dbData.liveOffers.length} live offers...`);
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

      // --- Migrate Training ---
      if (dbData.training && Array.isArray(dbData.training)) {
        console.log(`Migrating ${dbData.training.length} training items...`);
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

      // --- Migrate Webinars ---
      if (dbData.webinars && Array.isArray(dbData.webinars)) {
        console.log(`Migrating ${dbData.webinars.length} webinars...`);
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

      // --- Migrate Community Links ---
      if (dbData.communityLinks && Array.isArray(dbData.communityLinks)) {
        console.log(`Migrating ${dbData.communityLinks.length} community links...`);
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

      // --- Migrate System Configs (packages, affiliateConfig, freelancingProjects, earningTarget, reports) ---
      const configs = [
        { key: 'packages', val: dbData.packages || [] },
        { key: 'affiliateConfig', val: dbData.affiliateConfig || {} },
        { key: 'freelancingProjects', val: dbData.freelancingProjects || [] },
        { key: 'earningTarget', val: dbData.earningTarget || {} },
        { key: 'reports', val: dbData.reports || {} }
      ];

      console.log('Migrating system configs...');
      for (const conf of configs) {
        await client.query(`
          INSERT INTO system_config (key, value)
          VALUES ($1, $2)
          ON CONFLICT (key) DO UPDATE SET
            value = EXCLUDED.value
        `, [conf.key, JSON.stringify(conf.val)]);
      }

      console.log('\nMigration and data seeding completed successfully!');
    } else {
      console.log('\nNo db.json file found to migrate. Tables are created empty.');
    }

  } catch (err) {
    console.error('Error during migration:', err);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

runMigration();
