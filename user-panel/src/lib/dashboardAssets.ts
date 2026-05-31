import AmazonImg from '../assets/Amazon.png';
import FlipkartImg from '../assets/Flipkart.png';
import EarPhonesImg from '../assets/EarPhones.png';
import WirelessEarPhonesImg from '../assets/Wireless-EarPhones.png';
import EarBudsImg from '../assets/EarBuds.png';
import HeadPhonesImg from '../assets/HeadPhones.png';
import SmartWatchImg from '../assets/SmartWatch.png';
import VideoEditingImg from '../assets/Video-Editing.jpeg';
import FacebookAdsImg from '../assets/Facebook-Ads.jpeg';
import GoogleAdsenseImg from '../assets/Google-Adsense.jpeg';
import SEOImg from '../assets/SEO.jpeg';
import EmailMarketingImg from '../assets/Email-Marketing.jpeg';
import CopyrightMasteryImg from '../assets/Copyright-Mastery.jpeg';
import FutureSkillsImg from '../assets/FutureSkills.jpeg';
import StarterImg from '../assets/Starter.jpeg';
import AdvancedImg from '../assets/Advanced.jpeg';
import ProImg from '../assets/Pro.jpeg';
import EliteImg from '../assets/Elite.jpeg';
import PremiumImg from '../assets/Premium.jpeg';
import WhatsAppImg from '../assets/WhatsApp.png';
import InstagramImg from '../assets/Instagram.png';
import FacebookImg from '../assets/Facebook.png';
import TelegramImg from '../assets/Telegram.png';
import YouTubeImg from '../assets/YouTube.png';
import LinkedInImg from '../assets/LinkedIn.png';
import ThreadsImg from '../assets/Threads.png';
import TwitterImg from '../assets/Twitter.png';

const imageMap: Record<string, string> = {
  amazon: AmazonImg,
  flipkart: FlipkartImg,
  earphones: EarPhonesImg,
  wireless_earphones: WirelessEarPhonesImg,
  earbuds: EarBudsImg,
  headphones: HeadPhonesImg,
  smartwatch: SmartWatchImg,
  video_editing: VideoEditingImg,
  facebook_ads: FacebookAdsImg,
  google_adsense: GoogleAdsenseImg,
  seo: SEOImg,
  email_marketing: EmailMarketingImg,
  copyright_mastery: CopyrightMasteryImg,
  future_skills: FutureSkillsImg,
  starter_package: StarterImg,
  advanced_package: AdvancedImg,
  pro_package: ProImg,
  elite_package: EliteImg,
  premium_package: PremiumImg,
};

const iconMap: Record<string, string> = {
  whatsapp: WhatsAppImg,
  instagram: InstagramImg,
  facebook: FacebookImg,
  telegram: TelegramImg,
  youtube: YouTubeImg,
  linkedin: LinkedInImg,
  threads: ThreadsImg,
  twitter: TwitterImg,
};

export const getDashboardImage = (key?: string) => {
  if (!key) {
    return FutureSkillsImg;
  }

  return imageMap[key] || FutureSkillsImg;
};

export const getCommunityIcon = (key?: string) => {
  if (!key) {
    return WhatsAppImg;
  }

  return iconMap[key] || WhatsAppImg;
};
