// Mock Database Layer using LocalStorage with Server Sync for the Admin Panel

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'user' | 'admin';
  packageName: string;
  sponsorCode: string;
  referredBy: string;
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

export interface Course {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
  lessonsCount: number;
  requiredPackage: string;
  description: string;
  videoUrl?: string;
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

export const localDb = {
  initialize: (data?: any) => {
    if (data) {
      if (data.users) localStorage.setItem('az_users', JSON.stringify(data.users));
      if (data.earnings) localStorage.setItem('az_earnings', JSON.stringify(data.earnings));
      if (data.chartData) localStorage.setItem('az_chart_data', JSON.stringify(data.chartData));
      if (data.courses) localStorage.setItem('az_courses', JSON.stringify(data.courses));
      if (data.team) localStorage.setItem('az_team', JSON.stringify(data.team));
      if (data.liveOffers) localStorage.setItem('az_live_offers', JSON.stringify(data.liveOffers));
      if (data.training) localStorage.setItem('az_training', JSON.stringify(data.training));
      if (data.webinars) localStorage.setItem('az_webinars', JSON.stringify(data.webinars));
      return;
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

  getCourses: (): Course[] => {
    return JSON.parse(localStorage.getItem('az_courses') || '[]');
  },

  saveCourses: (courses: Course[]) => {
    localStorage.setItem('az_courses', JSON.stringify(courses));
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

  updateUserStatus: (userId: string, status: 'active' | 'inactive') => {
    const users = localDb.getUsers();
    const updated = users.map(u => u.id === userId ? { ...u, status } : u);
    localDb.saveUsers(updated);
  },

  updateUserKyc: (userId: string, kycStatus: 'pending' | 'approved' | 'rejected') => {
    const users = localDb.getUsers();
    const updated = users.map(u => u.id === userId ? { ...u, kycStatus } : u);
    localDb.saveUsers(updated);
  },

  updateUserPackage: (userId: string, packageName: string) => {
    const users = localDb.getUsers();
    const updated = users.map(u => u.id === userId ? { ...u, packageName } : u);
    localDb.saveUsers(updated);
  }
};
