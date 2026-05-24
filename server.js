const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'db.json');

const DEFAULT_USERS = [
  {
    id: 'user-admin',
    email: 'admin@gmail.com',
    name: 'Admin User',
    phone: '9999999999',
    role: 'admin',
    packageName: 'N/A',
    sponsorCode: 'ADMIN-01',
    referredBy: '',
    status: 'active',
    kycStatus: 'approved',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-standard',
    email: 'login@gmail.com',
    name: 'Mamidala Sujith',
    phone: '9502014791',
    role: 'user',
    packageName: 'Platinum',
    sponsorCode: 'AZ-2396',
    referredBy: 'ADMIN-01',
    status: 'active',
    kycStatus: 'approved',
    kycDetails: {
      accountHolder: 'Mamidala Sujith',
      bankName: 'State Bank of India',
      accountNumber: '32104589213',
      ifscCode: 'SBIN0012345',
    },
    createdAt: new Date().toISOString(),
  }
];

const DEFAULT_EARNINGS = {
  today: 0,
  sevenDays: 77,
  thirtyDays: 3646,
  allTime: 415104,
  passive: 71604,
  pending: 326,
  industry: 415104,
};

const DEFAULT_CHART_DATA = [
  { date: '17 May', amount: 50 },
  { date: '18 May', amount: 120 },
  { date: '19 May', amount: 80 },
  { date: '20 May', amount: 200 },
  { date: '21 May', amount: 150 },
  { date: '22 May', amount: 310 },
  { date: '23 May', amount: 77 },
];

const DEFAULT_COURSES = [
  {
    id: 'course-1',
    title: 'Graphic Design Masterclass',
    category: 'Design',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=60',
    duration: '12h 30m',
    lessonsCount: 24,
    requiredPackage: 'Classic Package',
    description: 'Learn Adobe Photoshop, Illustrator, and Canva from absolute scratch to earn freelance income.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 'course-2',
    title: 'Affiliate Marketing Secrets',
    category: 'Marketing',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60',
    duration: '8h 15m',
    lessonsCount: 15,
    requiredPackage: 'Heroic Package',
    description: 'Master lead generation, sales closing, and automated funnel creation for online marketing.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 'course-3',
    title: 'Website Development (No-Code)',
    category: 'Development',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b81169d42?w=500&auto=format&fit=crop&q=60',
    duration: '15h 45m',
    lessonsCount: 30,
    requiredPackage: 'Prime Package',
    description: 'Build premium responsive websites for international clients using WordPress and Elementor.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  }
];

const DEFAULT_TEAM = [
  {
    id: 'team-1',
    name: 'Rohan Mehra',
    email: 'rohan.mehra@gmail.com',
    phone: '9876543210',
    packageName: 'Classic Package',
    status: 'active',
    level: 1,
    joinedDate: '2026-05-18'
  },
  {
    id: 'team-2',
    name: 'Anjali Sharma',
    email: 'anjali.sharma@gmail.com',
    phone: '9123456780',
    packageName: 'Prime Package',
    status: 'active',
    level: 1,
    joinedDate: '2026-05-20'
  },
  {
    id: 'team-3',
    name: 'Karan Patel',
    email: 'karan.patel@gmail.com',
    phone: '9888877776',
    packageName: 'Platinum Package',
    status: 'active',
    level: 2,
    joinedDate: '2026-05-21'
  }
];

const DEFAULT_LIVE_OFFERS = [
  {
    id: 'offer-1',
    tag: 'HOT OFFER',
    title: 'Dubai Leadership Summit 2026',
    desc: 'Accumulate ₹10,00,000 in total sales before August 2026 to win a fully paid 4-day Dubai package.'
  }
];

const DEFAULT_TRAINING = [
  { id: 't-1', title: 'Affiliate Marketing Kickoff', duration: '45 mins', desc: 'How to setup your profile, links, and find your first 10 leads.' },
  { id: 't-2', title: 'Closing High Ticket Clients', duration: '1 hr 15 mins', desc: 'Step-by-step phone script to close premium packages.' },
  { id: 't-3', title: 'Facebook Ads Lead Gen', duration: '55 mins', desc: 'Running cost-efficient campaign setups for lead funnels.' }
];

const DEFAULT_WEBINARS = [
  {
    id: 'web-1',
    title: 'Weekly Commission Boosting Frameworks',
    speaker: 'Mamidala Sujith (Platinum Achiever)',
    time: 'Sunday at 7:00 PM IST',
    url: '#'
  }
];

function readDb() {
  if (!fs.existsSync(DB_PATH)) {
    const initialDb = {
      users: DEFAULT_USERS,
      earnings: DEFAULT_EARNINGS,
      chartData: DEFAULT_CHART_DATA,
      courses: DEFAULT_COURSES,
      team: DEFAULT_TEAM,
      liveOffers: DEFAULT_LIVE_OFFERS,
      training: DEFAULT_TRAINING,
      webinars: DEFAULT_WEBINARS
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2));
    return initialDb;
  }
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading database file', e);
    return {};
  }
}

app.get('/api/db', (req, res) => {
  res.json(readDb());
});

app.post('/api/db', (req, res) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (e) {
    console.error('Error writing to database file', e);
    res.status(500).json({ error: 'Failed to write data' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Shared database server listening on port ${PORT}`);
});
