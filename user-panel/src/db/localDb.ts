// Mock Database Layer using LocalStorage with Server Sync for the User Panel

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'user' | 'admin';
  packageName: string;
  sponsorCode: string;
  referredBy: string; // Sponsor who referred this user
  status: 'active' | 'inactive';
  kycStatus: 'pending' | 'approved' | 'rejected' | 'not_submitted';
  kycDetails?: {
    accountHolder: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    documentUrl?: string;
  };
  createdAt: string;
}

export interface EarningStats {
  today: number;
  sevenDays: number;
  thirtyDays: number;
  allTime: number;
  passive: number;
  pending: number;
  industry: number;
}

export interface ChartDataPoint {
  date: string;
  amount: number;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
  lessonsCount: number;
  requiredPackage: string; // Minimum package required to access
  description: string;
  videoUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  packageName: string;
  status: string;
  level: number; // 1 = Direct, 2 = Indirect
  joinedDate: string;
}

export interface CommunityLink {
  platform: string;
  url: string;
  title: string;
}

export interface LiveOffer {
  id: string;
  tag: string;
  title: string;
  desc: string;
}

export interface TrainingVideo {
  id: string;
  title: string;
  duration: string;
  desc: string;
}

export interface Webinar {
  id: string;
  title: string;
  speaker: string;
  time: string;
  url: string;
}

const defaultDbData = {
  users: [
    {
      id: 'user-admin',
      email: 'admin@gmail.com',
      name: 'Admin User',
      phone: '9999999999',
      role: 'admin' as const,
      packageName: 'N/A',
      sponsorCode: 'ADMIN-01',
      referredBy: '',
      status: 'active' as const,
      kycStatus: 'approved' as const,
      createdAt: '2026-05-23T08:16:50.914Z',
    },
    {
      id: 'user-standard',
      email: 'login@gmail.com',
      name: 'Mamidala Sujith',
      phone: '9502014791',
      role: 'user' as const,
      packageName: 'Platinum',
      sponsorCode: 'AZ-2396',
      referredBy: 'ADMIN-01',
      status: 'active' as const,
      kycStatus: 'approved' as const,
      kycDetails: {
        accountHolder: 'Mamidala Sujith',
        bankName: 'State Bank of India',
        accountNumber: '32104589213',
        ifscCode: 'SBIN0012345',
      },
      createdAt: '2026-05-23T08:16:50.918Z',
    },
  ],
  earnings: {
    today: 0,
    sevenDays: 77,
    thirtyDays: 3646,
    allTime: 415104,
    passive: 71604,
    pending: 326,
    industry: 415104,
  },
  chartData: [
    { date: '17 May', amount: 50 },
    { date: '18 May', amount: 120 },
    { date: '19 May', amount: 80 },
    { date: '20 May', amount: 200 },
    { date: '21 May', amount: 150 },
    { date: '22 May', amount: 310 },
    { date: '23 May', amount: 77 },
  ],
  courses: [
    {
      id: 'course-1',
      title: 'Graphic Design Masterclass',
      category: 'Design',
      thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=60',
      duration: '12h 30m',
      lessonsCount: 24,
      requiredPackage: 'Classic Package',
      description: 'Learn Adobe Photoshop, Illustrator, and Canva from absolute scratch to earn freelance income.',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
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
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
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
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  ],
  team: [
    {
      id: 'team-1',
      name: 'Rohan Mehra',
      email: 'rohan.mehra@gmail.com',
      phone: '9876543210',
      packageName: 'Classic Package',
      status: 'active',
      level: 1,
      joinedDate: '2026-05-18',
    },
    {
      id: 'team-2',
      name: 'Anjali Sharma',
      email: 'anjali.sharma@gmail.com',
      phone: '9123456780',
      packageName: 'Prime Package',
      status: 'active',
      level: 1,
      joinedDate: '2026-05-20',
    },
    {
      id: 'team-3',
      name: 'Karan Patel',
      email: 'karan.patel@gmail.com',
      phone: '9888877776',
      packageName: 'Platinum Package',
      status: 'active',
      level: 2,
      joinedDate: '2026-05-21',
    },
  ],
  liveOffers: [
    {
      id: 'offer-1',
      tag: 'HOT OFFER',
      title: 'Dubai Leadership Summit 2026',
      desc: 'Accumulate Rs10,00,000 in total sales before August 2026 to win a fully paid 4-day Dubai package.',
    },
  ],
  training: [
    {
      id: 't-1',
      title: 'Affiliate Marketing Kickoff',
      duration: '45 mins',
      desc: 'How to setup your profile, links, and find your first 10 leads.',
    },
    {
      id: 't-2',
      title: 'Closing High Ticket Clients',
      duration: '1 hr 15 mins',
      desc: 'Step-by-step phone script to close premium packages.',
    },
    {
      id: 't-3',
      title: 'Facebook Ads Lead Gen',
      duration: '55 mins',
      desc: 'Running cost-efficient campaign setups for lead funnels.',
    },
  ],
  webinars: [
    {
      id: 'web-1',
      title: 'Weekly Commission Boosting Frameworks',
      speaker: 'Mamidala Sujith (Platinum Achiever)',
      time: 'Sunday at 7:00 PM IST',
      url: '#',
    },
  ],
};

export const localDb = {
  initialize: (data?: any) => {
    const source = data || defaultDbData;

    if (source.users) localStorage.setItem('az_users', JSON.stringify(source.users));
    if (source.earnings) localStorage.setItem('az_earnings', JSON.stringify(source.earnings));
    if (source.chartData) localStorage.setItem('az_chart_data', JSON.stringify(source.chartData));
    if (source.courses) localStorage.setItem('az_courses', JSON.stringify(source.courses));
    if (source.team) localStorage.setItem('az_team', JSON.stringify(source.team));
    if (source.liveOffers) localStorage.setItem('az_live_offers', JSON.stringify(source.liveOffers));
    if (source.training) localStorage.setItem('az_training', JSON.stringify(source.training));
    if (source.webinars) localStorage.setItem('az_webinars', JSON.stringify(source.webinars));
  },

  ensureSeedData: () => {
    const hasUsers = localStorage.getItem('az_users');
    if (!hasUsers) {
      localDb.initialize();
    }
  },

  syncWithServer: async (onComplete?: () => void) => {
    try {
      const res = await fetch('http://localhost:5000/api/db');
      if (res.ok) {
        const data = await res.json();
        localDb.initialize(data);
        if (onComplete) onComplete();
      }
    } catch (e) {
      console.warn('Backend server offline, using local storage cache.', e);
      localDb.ensureSeedData();
      if (onComplete) onComplete();
    }
  },

  saveToServer: async () => {
    try {
      const db = {
        users: JSON.parse(localStorage.getItem('az_users') || '[]'),
        earnings: JSON.parse(localStorage.getItem('az_earnings') || '{}'),
        chartData: JSON.parse(localStorage.getItem('az_chart_data') || '[]'),
        courses: JSON.parse(localStorage.getItem('az_courses') || '[]'),
        team: JSON.parse(localStorage.getItem('az_team') || '[]'),
        liveOffers: JSON.parse(localStorage.getItem('az_live_offers') || '[]'),
        training: JSON.parse(localStorage.getItem('az_training') || '[]'),
        webinars: JSON.parse(localStorage.getItem('az_webinars') || '[]'),
      };

      await fetch('http://localhost:5000/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(db),
      });
    } catch (e) {
      console.warn('Failed to sync changes with backend server.', e);
    }
  },

  getUsers: (): User[] => {
    return JSON.parse(localStorage.getItem('az_users') || '[]');
  },

  saveUsers: (users: User[]) => {
    localStorage.setItem('az_users', JSON.stringify(users));
    localDb.saveToServer();
  },

  getEarnings: (): EarningStats => {
    return JSON.parse(localStorage.getItem('az_earnings') || '{}');
  },

  saveEarnings: (earnings: EarningStats) => {
    localStorage.setItem('az_earnings', JSON.stringify(earnings));
    localDb.saveToServer();
  },

  getChartData: (): ChartDataPoint[] => {
    return JSON.parse(localStorage.getItem('az_chart_data') || '[]');
  },

  saveChartData: (data: ChartDataPoint[]) => {
    localStorage.setItem('az_chart_data', JSON.stringify(data));
    localDb.saveToServer();
  },

  getCourses: (): Course[] => {
    return JSON.parse(localStorage.getItem('az_courses') || '[]');
  },

  saveCourses: (courses: Course[]) => {
    localStorage.setItem('az_courses', JSON.stringify(courses));
    localDb.saveToServer();
  },

  getTeam: (): TeamMember[] => {
    return JSON.parse(localStorage.getItem('az_team') || '[]');
  },

  saveTeam: (team: TeamMember[]) => {
    localStorage.setItem('az_team', JSON.stringify(team));
    localDb.saveToServer();
  },

  getLiveOffers: (): LiveOffer[] => {
    return JSON.parse(localStorage.getItem('az_live_offers') || '[]');
  },

  saveLiveOffers: (offers: LiveOffer[]) => {
    localStorage.setItem('az_live_offers', JSON.stringify(offers));
    localDb.saveToServer();
  },

  getTraining: (): TrainingVideo[] => {
    return JSON.parse(localStorage.getItem('az_training') || '[]');
  },

  saveTraining: (videos: TrainingVideo[]) => {
    localStorage.setItem('az_training', JSON.stringify(videos));
    localDb.saveToServer();
  },

  getWebinars: (): Webinar[] => {
    return JSON.parse(localStorage.getItem('az_webinars') || '[]');
  },

  saveWebinars: (webinars: Webinar[]) => {
    localStorage.setItem('az_webinars', JSON.stringify(webinars));
    localDb.saveToServer();
  },

  getPackages: () => {
    return [
      { id: '1', name: 'Classic Package', price: 299, color: '#2563eb' },
      { id: '2', name: 'Heroic Package', price: 599, color: '#ea580c' },
      { id: '3', name: 'Prime Package', price: 899, color: '#16a34a' },
      { id: '4', name: 'Crystal Package', price: 1299, color: '#06b6d4' },
      { id: '5', name: 'Platinum Package', price: 1699, color: '#f59e0b' },
      { id: '6', name: 'Premium Package', price: 3999, color: '#db2777' },
    ];
  }
};
