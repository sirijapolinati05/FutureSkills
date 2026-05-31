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

export interface PackageConfig {
  id: string;
  name: string;
  price: number;
  description: string;
  imageKey: string;
  color: string;
  level: number;
  activeCommission: number;
  passiveCommission: number;
}

export interface UpgradeCommissionRow {
  id: string;
  fromPackage: string;
  toPackage: string;
  price: number;
  active: number;
  passive: number;
}

export interface AffiliateConfig {
  baseUrl: string;
  commonLinkLabel: string;
  upgradeRows: UpgradeCommissionRow[];
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
  imageKey?: string;
}

export interface LiveOffer {
  id: string;
  tag: string;
  title: string;
  description: string;
  timeline: string;
  reward: string;
  imageKey: string;
  url: string;
  ctaLabel: string;
}

export interface TrainingVideo extends Course {}

export interface Webinar {
  id: string;
  title: string;
  speaker: string;
  time: string;
  url: string;
}

export interface CommunityLink {
  id: string;
  name: string;
  label: string;
  url: string;
  iconKey: string;
}

export interface FreelancingProject {
  id: string;
  title: string;
  category: string;
  imageKey: string;
  description: string;
  seatsLeft: number;
  projectsCount: number;
  payout: number;
  ctaLabel: string;
}

export interface MilestoneReward {
  id: string;
  title: string;
  imageKey: string;
  unlockAt: number;
  accent: string;
  description: string;
}

export interface EarningTargetConfig {
  milestones: number[];
  rewards: MilestoneReward[];
}

export interface EarningsReportRow {
  date: string;
  from: string;
  amount: number;
  type: 'Active' | 'Passive';
  status: string;
}

export interface PayoutReportRow {
  requestedDate: string;
  sentDate: string;
  amount: number;
  tdsAmount: number;
  status: string;
}

export interface WalletReportRow {
  date: string;
  existingAmount: number;
  updatedAmount: number;
  finalBalance: number;
  type: 'Credit' | 'Debit';
  description: string;
}

export interface ReportsData {
  earningsRows: EarningsReportRow[];
  payoutRows: PayoutReportRow[];
  walletRows: WalletReportRow[];
}

type DbShape = {
  users: User[];
  earnings: EarningStats;
  chartData: { date: string; amount: number }[];
  packages: PackageConfig[];
  affiliateConfig: AffiliateConfig;
  courses: Course[];
  team: unknown[];
  liveOffers: LiveOffer[];
  training: TrainingVideo[];
  webinars: Webinar[];
  communityLinks: CommunityLink[];
  freelancingProjects: FreelancingProject[];
  earningTarget: EarningTargetConfig;
  reports: ReportsData;
};

const STORAGE_KEYS = {
  users: 'az_users',
  earnings: 'az_earnings',
  chartData: 'az_chart_data',
  packages: 'az_packages',
  affiliateConfig: 'az_affiliate_config',
  courses: 'az_courses',
  team: 'az_team',
  liveOffers: 'az_live_offers',
  training: 'az_training',
  webinars: 'az_webinars',
  communityLinks: 'az_community_links',
  freelancingProjects: 'az_freelancing_projects',
  earningTarget: 'az_earning_target',
  reports: 'az_reports',
} as const;

const read = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const normalizeDb = (data: Partial<DbShape>): DbShape => ({
  users: data.users || [],
  earnings: data.earnings || { today: 0, sevenDays: 0, thirtyDays: 0, allTime: 0, passive: 0, pending: 0, industry: 0 },
  chartData: data.chartData || [],
  packages: data.packages || [],
  affiliateConfig: data.affiliateConfig || { baseUrl: '', commonLinkLabel: 'Common Link', upgradeRows: [] },
  courses: data.courses || [],
  team: data.team || [],
  liveOffers: data.liveOffers || [],
  training: data.training || [],
  webinars: data.webinars || [],
  communityLinks: data.communityLinks || [],
  freelancingProjects: data.freelancingProjects || [],
  earningTarget: data.earningTarget || { milestones: [], rewards: [] },
  reports: data.reports || { earningsRows: [], payoutRows: [], walletRows: [] },
});

const readAll = (): DbShape =>
  normalizeDb({
    users: read(STORAGE_KEYS.users, []),
    earnings: read(STORAGE_KEYS.earnings, undefined),
    chartData: read(STORAGE_KEYS.chartData, []),
    packages: read(STORAGE_KEYS.packages, []),
    affiliateConfig: read(STORAGE_KEYS.affiliateConfig, undefined),
    courses: read(STORAGE_KEYS.courses, []),
    team: read(STORAGE_KEYS.team, []),
    liveOffers: read(STORAGE_KEYS.liveOffers, []),
    training: read(STORAGE_KEYS.training, []),
    webinars: read(STORAGE_KEYS.webinars, []),
    communityLinks: read(STORAGE_KEYS.communityLinks, []),
    freelancingProjects: read(STORAGE_KEYS.freelancingProjects, []),
    earningTarget: read(STORAGE_KEYS.earningTarget, undefined),
    reports: read(STORAGE_KEYS.reports, undefined),
  });

const persistDb = (db: DbShape) => {
  write(STORAGE_KEYS.users, db.users);
  write(STORAGE_KEYS.earnings, db.earnings);
  write(STORAGE_KEYS.chartData, db.chartData);
  write(STORAGE_KEYS.packages, db.packages);
  write(STORAGE_KEYS.affiliateConfig, db.affiliateConfig);
  write(STORAGE_KEYS.courses, db.courses);
  write(STORAGE_KEYS.team, db.team);
  write(STORAGE_KEYS.liveOffers, db.liveOffers);
  write(STORAGE_KEYS.training, db.training);
  write(STORAGE_KEYS.webinars, db.webinars);
  write(STORAGE_KEYS.communityLinks, db.communityLinks);
  write(STORAGE_KEYS.freelancingProjects, db.freelancingProjects);
  write(STORAGE_KEYS.earningTarget, db.earningTarget);
  write(STORAGE_KEYS.reports, db.reports);
};

const refreshAdminSession = () => {
  const raw = localStorage.getItem('az_admin_session') || sessionStorage.getItem('az_admin_session');
  if (!raw) {
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    const freshAdmin = localDb.getUsers().find((user) => user.id === parsed.id || user.email === parsed.email);
    if (!freshAdmin) {
      return;
    }

    const serialized = JSON.stringify(freshAdmin);
    if (localStorage.getItem('az_admin_session')) {
      localStorage.setItem('az_admin_session', serialized);
    }
    if (sessionStorage.getItem('az_admin_session')) {
      sessionStorage.setItem('az_admin_session', serialized);
    }
  } catch {
    // ignore
  }
};

export const localDb = {
  initialize: (data?: Partial<DbShape>) => {
    if (data) {
      persistDb(normalizeDb(data));
      refreshAdminSession();
    }
  },

  syncWithServer: async (onComplete?: () => void) => {
    try {
      const res = await fetch('http://localhost:5000/api/db');
      if (res.ok) {
        localDb.initialize(await res.json());
      }
      if (onComplete) onComplete();
    } catch (e) {
      console.warn('Backend server offline, using local storage cache.', e);
      if (onComplete) onComplete();
    }
  },

  saveToServer: async () => {
    try {
      await fetch('http://localhost:5000/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(readAll()),
      });
    } catch (e) {
      console.warn('Failed to sync changes with backend server.', e);
    }
  },

  getUsers: (): User[] => read(STORAGE_KEYS.users, []),
  saveUsers: (users: User[]) => {
    write(STORAGE_KEYS.users, users);
    refreshAdminSession();
    localDb.saveToServer();
  },

  getPackages: (): PackageConfig[] => read(STORAGE_KEYS.packages, []),
  savePackages: (packages: PackageConfig[]) => {
    write(STORAGE_KEYS.packages, packages);
    localDb.saveToServer();
  },

  getAffiliateConfig: (): AffiliateConfig => read(STORAGE_KEYS.affiliateConfig, { baseUrl: '', commonLinkLabel: 'Common Link', upgradeRows: [] }),
  saveAffiliateConfig: (affiliateConfig: AffiliateConfig) => {
    write(STORAGE_KEYS.affiliateConfig, affiliateConfig);
    localDb.saveToServer();
  },

  getCourses: (): Course[] => read(STORAGE_KEYS.courses, []),
  saveCourses: (courses: Course[]) => {
    write(STORAGE_KEYS.courses, courses);
    localDb.saveToServer();
  },

  getLiveOffers: (): LiveOffer[] => read(STORAGE_KEYS.liveOffers, []),
  saveLiveOffers: (offers: LiveOffer[]) => {
    write(STORAGE_KEYS.liveOffers, offers);
    localDb.saveToServer();
  },

  getTraining: (): TrainingVideo[] => read(STORAGE_KEYS.training, []),
  saveTraining: (videos: TrainingVideo[]) => {
    write(STORAGE_KEYS.training, videos);
    localDb.saveToServer();
  },

  getWebinars: (): Webinar[] => read(STORAGE_KEYS.webinars, []),
  saveWebinars: (webinars: Webinar[]) => {
    write(STORAGE_KEYS.webinars, webinars);
    localDb.saveToServer();
  },

  getCommunityLinks: (): CommunityLink[] => read(STORAGE_KEYS.communityLinks, []),
  saveCommunityLinks: (links: CommunityLink[]) => {
    write(STORAGE_KEYS.communityLinks, links);
    localDb.saveToServer();
  },

  getFreelancingProjects: (): FreelancingProject[] => read(STORAGE_KEYS.freelancingProjects, []),
  saveFreelancingProjects: (projects: FreelancingProject[]) => {
    write(STORAGE_KEYS.freelancingProjects, projects);
    localDb.saveToServer();
  },

  getEarningTargetConfig: (): EarningTargetConfig => read(STORAGE_KEYS.earningTarget, { milestones: [], rewards: [] }),
  saveEarningTargetConfig: (config: EarningTargetConfig) => {
    write(STORAGE_KEYS.earningTarget, config);
    localDb.saveToServer();
  },

  getReports: (): ReportsData => read(STORAGE_KEYS.reports, { earningsRows: [], payoutRows: [], walletRows: [] }),
  saveReports: (reports: ReportsData) => {
    write(STORAGE_KEYS.reports, reports);
    localDb.saveToServer();
  },

  updateUserStatus: (userId: string, status: 'active' | 'inactive') => {
    const updated = localDb.getUsers().map((user) => (user.id === userId ? { ...user, status } : user));
    localDb.saveUsers(updated);
  },

  updateUserKyc: (userId: string, kycStatus: 'pending' | 'approved' | 'rejected') => {
    const updated = localDb.getUsers().map((user) => (user.id === userId ? { ...user, kycStatus } : user));
    localDb.saveUsers(updated);
  },

  updateUserPackage: (userId: string, packageName: string) => {
    const updated = localDb.getUsers().map((user) => (user.id === userId ? { ...user, packageName } : user));
    localDb.saveUsers(updated);
  },
};
