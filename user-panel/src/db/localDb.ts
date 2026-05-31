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

export interface ChartDataPoint {
  date: string;
  amount: number;
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

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  packageName: string;
  status: 'active' | 'inactive';
  level: number;
  joinedDate: string;
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
  chartData: ChartDataPoint[];
  packages: PackageConfig[];
  affiliateConfig: AffiliateConfig;
  courses: Course[];
  team: TeamMember[];
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

const DEFAULT_DB: DbShape = {
  users: [
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
      createdAt: '2026-05-23T08:16:50.914Z',
    },
    {
      id: 'user-standard',
      email: 'login@gmail.com',
      name: 'Mamidala Sujith',
      phone: '9502014791',
      role: 'user',
      packageName: 'Starter Package',
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
      createdAt: '2026-05-23T08:16:50.918Z',
    },
  ],
  earnings: {
    today: 0,
    sevenDays: 0,
    thirtyDays: 0,
    allTime: 0,
    passive: 0,
    pending: 0,
    industry: 0,
  },
  chartData: [
    { date: '17 May', amount: 0 },
    { date: '18 May', amount: 0 },
    { date: '19 May', amount: 0 },
    { date: '20 May', amount: 0 },
    { date: '21 May', amount: 0 },
    { date: '22 May', amount: 0 },
    { date: '23 May', amount: 0 },
  ],
  packages: [
    { id: 'pkg-classic', name: 'Classic Package', price: 299, description: 'Starter course bundle and basic referral benefits.', imageKey: 'starter_package', color: '#1e3a8a', level: 1, activeCommission: 240, passiveCommission: 24 },
    { id: 'pkg-heroic', name: 'Heroic Package', price: 599, description: 'Affiliate marketing secrets and higher commission rates.', imageKey: 'advanced_package', color: '#f97316', level: 2, activeCommission: 450, passiveCommission: 45 },
    { id: 'pkg-prime', name: 'Prime Package', price: 899, description: 'Website development training and better payouts.', imageKey: 'pro_package', color: '#15803d', level: 3, activeCommission: 650, passiveCommission: 65 },
    { id: 'pkg-crystal', name: 'Crystal Package', price: 1299, description: 'Short-form video editing and reels mastery included.', imageKey: 'elite_package', color: '#475569', level: 4, activeCommission: 950, passiveCommission: 95 },
    { id: 'pkg-platinum', name: 'Platinum Package', price: 2499, description: 'Advanced automation stack with stronger passive leverage.', imageKey: 'premium_package', color: '#7c3aed', level: 5, activeCommission: 1800, passiveCommission: 180 },
    { id: 'pkg-premium', name: 'Premium Package', price: 3999, description: 'Unlock all courses and maximum commissions.', imageKey: 'premium_package', color: '#ca8a04', level: 6, activeCommission: 2800, passiveCommission: 280 },
  ],
  affiliateConfig: {
    baseUrl: 'https://skilltowealth.in/checkout',
    commonLinkLabel: 'Common Link',
    upgradeRows: [
      { id: 'u1', fromPackage: 'Classic Package', toPackage: 'Heroic Package', price: 300, active: 210, passive: 21 },
      { id: 'u2', fromPackage: 'Classic Package', toPackage: 'Prime Package', price: 600, active: 420, passive: 42 },
      { id: 'u3', fromPackage: 'Classic Package', toPackage: 'Crystal Package', price: 1000, active: 700, passive: 70 },
      { id: 'u4', fromPackage: 'Classic Package', toPackage: 'Premium Package', price: 3700, active: 2560, passive: 256 },
      { id: 'u5', fromPackage: 'Heroic Package', toPackage: 'Prime Package', price: 300, active: 210, passive: 21 },
      { id: 'u6', fromPackage: 'Heroic Package', toPackage: 'Crystal Package', price: 700, active: 490, passive: 49 },
      { id: 'u7', fromPackage: 'Prime Package', toPackage: 'Premium Package', price: 3100, active: 2170, passive: 217 },
    ],
  },
  courses: [
    { id: 'course-video-editing', title: 'Video Editing Blueprint', category: 'Design', thumbnail: '', duration: '9h 20m', lessonsCount: 18, requiredPackage: 'Classic Package', description: 'Short-form and long-form editing workflow with cinematic cuts, text hooks, and export settings.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', imageKey: 'video_editing' },
    { id: 'course-facebook-ads', title: 'Facebook Ads Performance Course', category: 'Marketing', thumbnail: '', duration: '11h 10m', lessonsCount: 22, requiredPackage: 'Heroic Package', description: 'Audience targeting, campaign setup, creative testing, and scaling strategies for consistent leads.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', imageKey: 'facebook_ads' },
    { id: 'course-google-adsense', title: 'Google Adsense Revenue System', category: 'Business', thumbnail: '', duration: '7h 35m', lessonsCount: 14, requiredPackage: 'Prime Package', description: 'Learn niche content strategy, site monetization, and Adsense optimization for passive income.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', imageKey: 'google_adsense' },
    { id: 'course-seo', title: 'SEO Ranking Masterclass', category: 'Marketing', thumbnail: '', duration: '13h 05m', lessonsCount: 27, requiredPackage: 'Platinum Package', description: 'Master on-page SEO, keyword clusters, technical audits, and ranking improvements.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', imageKey: 'seo' },
    { id: 'course-email-marketing', title: 'Email Marketing Automation', category: 'Business', thumbnail: '', duration: '10h 15m', lessonsCount: 19, requiredPackage: 'Premium Package', description: 'Build welcome flows, promo sequences, and re-engagement automations that convert.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', imageKey: 'email_marketing' },
    { id: 'course-copyright-mastery', title: 'Copyright Mastery for Creators', category: 'Development', thumbnail: '', duration: '6h 45m', lessonsCount: 12, requiredPackage: 'Premium Package', description: 'Protect digital assets, understand fair use, and use copyright-safe content in client work.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', imageKey: 'copyright_mastery' },
  ],
  team: [
    { id: 'team-1', name: 'Rohan Mehra', email: 'rohan.mehra@gmail.com', phone: '9876543210', packageName: 'Classic Package', status: 'active', level: 1, joinedDate: '2026-05-18' },
    { id: 'team-2', name: 'Anjali Sharma', email: 'anjali.sharma@gmail.com', phone: '9123456780', packageName: 'Prime Package', status: 'active', level: 1, joinedDate: '2026-05-20' },
    { id: 'team-3', name: 'Karan Patel', email: 'karan.patel@gmail.com', phone: '9888877776', packageName: 'Platinum Package', status: 'active', level: 2, joinedDate: '2026-05-21' },
  ],
  liveOffers: [
    { id: 'offer-grand-event', tag: 'Free Entry', title: 'FutureSkills Grand Business Event in Delhi', description: 'Get free registration for the FutureSkills event and secure your seat for the Delhi business meetup experience.', timeline: 'Register this month', reward: 'Free Event Entry', imageKey: 'future_skills', url: '#', ctaLabel: 'View Offer' },
    { id: 'offer-welcome-pass', tag: 'Welcome Pass', title: 'FutureSkills Delhi Welcome Pass', description: 'Complete the welcome milestone and claim your special event access with starter-level recognition benefits.', timeline: 'Target 0 active income', reward: 'Welcome Pass', imageKey: 'future_skills', url: '#', ctaLabel: 'View Offer' },
    { id: 'offer-starter-pass', tag: 'Starter Pass', title: 'FutureSkills Delhi Starter Pass', description: 'Reach the qualifying target and unlock starter pass benefits including entry, certificate, and ID support.', timeline: '1 February to 30 April', reward: 'Earn 11K target', imageKey: 'future_skills', url: '#', ctaLabel: 'View Offer' },
    { id: 'offer-pro-pass', tag: 'Pro Pass', title: 'FutureSkills Delhi Pro Pass', description: 'Push to the next reward slab and unlock the pro pass offer with premium recognition and higher-value perks.', timeline: '1 February to 30 April', reward: 'Earn 21K target', imageKey: 'future_skills', url: '#', ctaLabel: 'View Offer' },
  ],
  training: [
    { id: 'training-video-editing', title: 'Video Editing Training Camp', category: 'Design', thumbnail: '', duration: '6h 20m', lessonsCount: 10, requiredPackage: 'Classic Package', description: 'Hooks, captions, transitions, and export flow with practical editing assignments.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', imageKey: 'video_editing' },
    { id: 'training-facebook-ads', title: 'Facebook Ads Practical Training', category: 'Marketing', thumbnail: '', duration: '8h 10m', lessonsCount: 14, requiredPackage: 'Heroic Package', description: 'Campaign structure, ad set testing, budget control, and real lead generation tactics.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', imageKey: 'facebook_ads' },
    { id: 'training-google-adsense', title: 'Google Adsense Live Training', category: 'Business', thumbnail: '', duration: '5h 45m', lessonsCount: 9, requiredPackage: 'Prime Package', description: 'Adsense approval, content monetization, CTR growth, and revenue-safe optimization methods.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', imageKey: 'google_adsense' },
  ],
  webinars: [
    { id: 'web-1', title: 'Weekly Commission Boosting Frameworks', speaker: 'Mamidala Sujith (Platinum Achiever)', time: 'Sunday at 7:00 PM IST', url: '#' },
  ],
  communityLinks: [
    { id: 'community-1', name: 'Official WhatsApp', label: 'WhatsApp', url: 'https://whatsapp.com/channel/official', iconKey: 'whatsapp' },
    { id: 'community-2', name: 'Story Material', label: 'WhatsApp', url: 'https://whatsapp.com/channel/story-material', iconKey: 'whatsapp' },
    { id: 'community-3', name: 'Instagram', label: 'Instagram', url: 'https://instagram.com/achieverzon', iconKey: 'instagram' },
    { id: 'community-4', name: 'Facebook', label: 'Facebook', url: 'https://facebook.com/achieverzon', iconKey: 'facebook' },
    { id: 'community-5', name: 'Telegram', label: 'Telegram', url: 'https://t.me/achieverzon', iconKey: 'telegram' },
    { id: 'community-6', name: 'YouTube', label: 'YouTube', url: 'https://youtube.com/c/achieverzon', iconKey: 'youtube' },
    { id: 'community-7', name: 'LinkedIn', label: 'LinkedIn', url: 'https://linkedin.com/company/achieverzon', iconKey: 'linkedin' },
    { id: 'community-8', name: 'Threads', label: 'Threads', url: 'https://threads.net/@achieverzon', iconKey: 'threads' },
    { id: 'community-9', name: 'Twitter / X', label: 'Twitter', url: 'https://x.com/achieverzon', iconKey: 'twitter' },
  ],
  freelancingProjects: [
    { id: 'freelance-video-editing', title: 'Video Editing Client Project', category: 'Editing', imageKey: 'video_editing', description: 'Reels, YouTube shorts, and promo cutdowns with hook-based edits for business creators.', seatsLeft: 2, projectsCount: 2, payout: 250, ctaLabel: 'Apply Now' },
    { id: 'freelance-facebook-ads', title: 'Facebook Ads Setup Project', category: 'Marketing', imageKey: 'facebook_ads', description: 'Ad copy, campaign launch, audience testing, and creative coordination for local brands.', seatsLeft: 2, projectsCount: 2, payout: 200, ctaLabel: 'Apply Now' },
    { id: 'freelance-google-adsense', title: 'Google Adsense Growth Project', category: 'Monetization', imageKey: 'google_adsense', description: 'Website monetization support, ad placement optimization, and revenue tracking assistance.', seatsLeft: 2, projectsCount: 2, payout: 200, ctaLabel: 'Apply Now' },
  ],
  earningTarget: {
    milestones: [10000, 25000, 50000, 100000, 300000, 500000, 750000, 1000000, 1500000, 2000000],
    rewards: [
      { id: 'reward-amazon', title: 'Amazon Gift Reward', imageKey: 'amazon', unlockAt: 10000, accent: '#f59e0b', description: 'First milestone reach ayyaka Amazon reward claim cheskovachu.' },
      { id: 'reward-flipkart', title: 'Flipkart Gift Reward', imageKey: 'flipkart', unlockAt: 25000, accent: '#2563eb', description: 'Second milestone unlock ayyaka Flipkart reward active avtundi.' },
      { id: 'reward-earphones', title: 'Ear Phones Reward', imageKey: 'earphones', unlockAt: 50000, accent: '#f97316', description: 'Third milestone complete chesthe Ear Phones claim button enable avtundi.' },
      { id: 'reward-wireless', title: 'Wireless Ear Phones', imageKey: 'wireless_earphones', unlockAt: 100000, accent: '#0ea5e9', description: 'Fourth milestone tarvata wireless audio reward unlock avtundi.' },
      { id: 'reward-earbuds', title: 'Ear Buds Reward', imageKey: 'earbuds', unlockAt: 300000, accent: '#8b5cf6', description: 'Fifth milestone reach ayyaka Ear Buds reward claim cheskovachu.' },
      { id: 'reward-headphones', title: 'Head Phones Reward', imageKey: 'headphones', unlockAt: 500000, accent: '#16a34a', description: 'Next slab cross ayyaka Head Phones reward button active avtundi.' },
      { id: 'reward-smartwatch', title: 'Smart Watch Reward', imageKey: 'smartwatch', unlockAt: 750000, accent: '#dc2626', description: 'Higher milestone reach chesthe Smart Watch reward unlock avtundi.' },
    ],
  },
  reports: {
    earningsRows: [
      { date: '16-05-2026', from: 'Manasa', amount: 77, type: 'Passive', status: 'Verified' },
      { date: '11-05-2026', from: 'Sreerangam meenakumari', amount: 62, type: 'Passive', status: 'Verified' },
      { date: '04-05-2026', from: 'Hima sai', amount: 17, type: 'Passive', status: 'Verified' },
      { date: '03-05-2026', from: 'M.Raghuram', amount: 1200, type: 'Active', status: 'Verified' },
      { date: '30-04-2026', from: 'Manasa', amount: 170, type: 'Passive', status: 'Verified' },
    ],
    payoutRows: [
      { requestedDate: '01-05-2025', sentDate: '02-05-2025', amount: 9000, tdsAmount: 0, status: 'Paid' },
      { requestedDate: '05-05-2025', sentDate: '06-05-2025', amount: 500, tdsAmount: 0, status: 'Paid' },
      { requestedDate: '06-05-2025', sentDate: '07-05-2025', amount: 500, tdsAmount: 0, status: 'Paid' },
      { requestedDate: '12-05-2025', sentDate: '12-05-2025', amount: 1100, tdsAmount: 0, status: 'Paid' },
      { requestedDate: '21-05-2025', sentDate: '21-05-2025', amount: 1300, tdsAmount: 0, status: 'Paid' },
    ],
    walletRows: [
      { date: '16-05-2026', existingAmount: 249, updatedAmount: 77, finalBalance: 326, type: 'Credit', description: 'Passive Commission Add - TXN-1778922897iHLD' },
      { date: '11-05-2026', existingAmount: 187, updatedAmount: 62, finalBalance: 249, type: 'Credit', description: 'Passive Commission Add - TXN-YaU01778489198bRpx' },
      { date: '05-05-2026', existingAmount: 1387, updatedAmount: 1176, finalBalance: 187, type: 'Debit', description: 'Withdrawal request submitted' },
      { date: '04-05-2026', existingAmount: 1370, updatedAmount: 17, finalBalance: 1387, type: 'Credit', description: 'Passive Commission Add - TXN-W6fw1777917548Qc23' },
      { date: '03-05-2026', existingAmount: 170, updatedAmount: 1200, finalBalance: 1370, type: 'Credit', description: 'Active Commission Add - TXN-I7QU1777803989GIV1' },
    ],
  },
};

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

const normalizeDb = (data?: Partial<DbShape>): DbShape => ({
  users: data?.users || DEFAULT_DB.users,
  earnings: data?.earnings || DEFAULT_DB.earnings,
  chartData: data?.chartData || DEFAULT_DB.chartData,
  packages: data?.packages || DEFAULT_DB.packages,
  affiliateConfig: data?.affiliateConfig || DEFAULT_DB.affiliateConfig,
  courses: data?.courses || DEFAULT_DB.courses,
  team: data?.team || DEFAULT_DB.team,
  liveOffers: data?.liveOffers || DEFAULT_DB.liveOffers,
  training: data?.training || DEFAULT_DB.training,
  webinars: data?.webinars || DEFAULT_DB.webinars,
  communityLinks: data?.communityLinks || DEFAULT_DB.communityLinks,
  freelancingProjects: data?.freelancingProjects || DEFAULT_DB.freelancingProjects,
  earningTarget: data?.earningTarget || DEFAULT_DB.earningTarget,
  reports: data?.reports || DEFAULT_DB.reports,
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

const readAll = (): DbShape =>
  normalizeDb({
    users: read(STORAGE_KEYS.users, DEFAULT_DB.users),
    earnings: read(STORAGE_KEYS.earnings, DEFAULT_DB.earnings),
    chartData: read(STORAGE_KEYS.chartData, DEFAULT_DB.chartData),
    packages: read(STORAGE_KEYS.packages, DEFAULT_DB.packages),
    affiliateConfig: read(STORAGE_KEYS.affiliateConfig, DEFAULT_DB.affiliateConfig),
    courses: read(STORAGE_KEYS.courses, DEFAULT_DB.courses),
    team: read(STORAGE_KEYS.team, DEFAULT_DB.team),
    liveOffers: read(STORAGE_KEYS.liveOffers, DEFAULT_DB.liveOffers),
    training: read(STORAGE_KEYS.training, DEFAULT_DB.training),
    webinars: read(STORAGE_KEYS.webinars, DEFAULT_DB.webinars),
    communityLinks: read(STORAGE_KEYS.communityLinks, DEFAULT_DB.communityLinks),
    freelancingProjects: read(STORAGE_KEYS.freelancingProjects, DEFAULT_DB.freelancingProjects),
    earningTarget: read(STORAGE_KEYS.earningTarget, DEFAULT_DB.earningTarget),
    reports: read(STORAGE_KEYS.reports, DEFAULT_DB.reports),
  });

const refreshSessionUser = () => {
  const raw = localStorage.getItem('az_session') || sessionStorage.getItem('az_session');
  if (!raw) {
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    const freshUser = localDb.getUsers().find((user) => user.id === parsed.id || user.email === parsed.email);
    if (!freshUser) {
      return;
    }

    const serialized = JSON.stringify(freshUser);
    if (localStorage.getItem('az_session')) {
      localStorage.setItem('az_session', serialized);
    }
    if (sessionStorage.getItem('az_session')) {
      sessionStorage.setItem('az_session', serialized);
    }
  } catch {
    // ignore
  }
};

export const getPackageLevel = (pkgName: string): number => {
  const pkg = localDb.getPackages().find((item) => item.name === pkgName);
  if (pkg) {
    return pkg.level;
  }

  const aliases: Record<string, number> = {
    Classic: 1,
    Heroic: 2,
    Prime: 3,
    Crystal: 4,
    Platinum: 5,
    Premium: 6,
  };

  return aliases[pkgName] || 0;
};

export const localDb = {
  initialize: (data?: Partial<DbShape>) => {
    persistDb(normalizeDb(data));
    refreshSessionUser();
  },

  ensureSeedData: () => {
    if (!localStorage.getItem(STORAGE_KEYS.users)) {
      persistDb(DEFAULT_DB);
    } else {
      persistDb(readAll());
    }
  },

  syncWithServer: async (onComplete?: () => void) => {
    try {
      const res = await fetch('http://localhost:5000/api/db');
      if (res.ok) {
        const data = await res.json();
        localDb.initialize(data);
      } else {
        localDb.ensureSeedData();
      }
      if (onComplete) onComplete();
    } catch (e) {
      localDb.ensureSeedData();
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

  getUsers: (): User[] => read(STORAGE_KEYS.users, DEFAULT_DB.users),
  saveUsers: (users: User[]) => {
    write(STORAGE_KEYS.users, users);
    refreshSessionUser();
    localDb.saveToServer();
  },

  getEarnings: (): EarningStats => read(STORAGE_KEYS.earnings, DEFAULT_DB.earnings),
  saveEarnings: (earnings: EarningStats) => {
    write(STORAGE_KEYS.earnings, earnings);
    localDb.saveToServer();
  },

  getChartData: (): ChartDataPoint[] => read(STORAGE_KEYS.chartData, DEFAULT_DB.chartData),
  getPackages: (): PackageConfig[] => read(STORAGE_KEYS.packages, DEFAULT_DB.packages),
  savePackages: (packages: PackageConfig[]) => {
    write(STORAGE_KEYS.packages, packages);
    localDb.saveToServer();
  },

  getAffiliateConfig: (): AffiliateConfig => read(STORAGE_KEYS.affiliateConfig, DEFAULT_DB.affiliateConfig),
  saveAffiliateConfig: (affiliateConfig: AffiliateConfig) => {
    write(STORAGE_KEYS.affiliateConfig, affiliateConfig);
    localDb.saveToServer();
  },

  getCourses: (): Course[] => read(STORAGE_KEYS.courses, DEFAULT_DB.courses),
  saveCourses: (courses: Course[]) => {
    write(STORAGE_KEYS.courses, courses);
    localDb.saveToServer();
  },

  getTeam: (): TeamMember[] => read(STORAGE_KEYS.team, DEFAULT_DB.team),
  getLiveOffers: (): LiveOffer[] => read(STORAGE_KEYS.liveOffers, DEFAULT_DB.liveOffers),
  saveLiveOffers: (offers: LiveOffer[]) => {
    write(STORAGE_KEYS.liveOffers, offers);
    localDb.saveToServer();
  },

  getTraining: (): TrainingVideo[] => read(STORAGE_KEYS.training, DEFAULT_DB.training),
  saveTraining: (videos: TrainingVideo[]) => {
    write(STORAGE_KEYS.training, videos);
    localDb.saveToServer();
  },

  getWebinars: (): Webinar[] => read(STORAGE_KEYS.webinars, DEFAULT_DB.webinars),
  saveWebinars: (webinars: Webinar[]) => {
    write(STORAGE_KEYS.webinars, webinars);
    localDb.saveToServer();
  },

  getCommunityLinks: (): CommunityLink[] => read(STORAGE_KEYS.communityLinks, DEFAULT_DB.communityLinks),
  saveCommunityLinks: (links: CommunityLink[]) => {
    write(STORAGE_KEYS.communityLinks, links);
    localDb.saveToServer();
  },

  getFreelancingProjects: (): FreelancingProject[] => read(STORAGE_KEYS.freelancingProjects, DEFAULT_DB.freelancingProjects),
  saveFreelancingProjects: (projects: FreelancingProject[]) => {
    write(STORAGE_KEYS.freelancingProjects, projects);
    localDb.saveToServer();
  },

  getEarningTargetConfig: (): EarningTargetConfig => read(STORAGE_KEYS.earningTarget, DEFAULT_DB.earningTarget),
  saveEarningTargetConfig: (config: EarningTargetConfig) => {
    write(STORAGE_KEYS.earningTarget, config);
    localDb.saveToServer();
  },

  getReports: (): ReportsData => read(STORAGE_KEYS.reports, DEFAULT_DB.reports),
  saveReports: (reports: ReportsData) => {
    write(STORAGE_KEYS.reports, reports);
    localDb.saveToServer();
  },
};
