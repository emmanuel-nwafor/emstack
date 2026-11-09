import { ReactNode } from "react";

export type NavMode = "ai" | "swe";
export type PortfolioMode = "ai" | "swe";

export interface ProjectSubApp {
  id: string;
  label: string;
  roleDescription: string;
  image: string;
  playStore?: string;
  appStore?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  tag?: string;
  headline: string;
  desc: string;
  role: string;
  outcome: string;
  stack: string;
  liveOn?: string;
  link: string;
  accent: string;
  deviceType: "mobile" | "browser" | "desktop";
  image?: string;
  subApps?: ProjectSubApp[];
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  iconType: "ai" | "backend" | "frontend";
}

export interface ExperienceItem {
  period: string;
  isCurrent?: boolean;
  role: string;
  company: string;
  desc: string;
}

export interface PrincipleItem {
  num: string;
  title: string;
  desc: string;
}

export interface ToolkitCategory {
  title: string;
  highlight: boolean;
  items: string[];
}

export interface StatItem {
  value: string;
  suffix?: string;
  label: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  readTime: string;
  date: string;
  tags: string[];
  content?: string[];
  author?: string;
  project?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  metric?: string;
  project?: string;
  linkedIn?: string;
}

export interface ModeContent {
  eyebrow: {
    status: string;
    location: string;
  };
  headlinePrefix: string;
  headlineEm: string;
  headlineSuffix: string;
  roleAlias: string;
  roleTitle: string;
  lede: string;
  contextBadgeNow: string;
  contextBadgeStack: string;
  stats: StatItem[];
  ticker: string[];
  services: ServiceItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  principles: PrincipleItem[];
  toolkit: ToolkitCategory[];
  inquiryTopics: string[];
  articles: ArticleItem[];
  testimonials: TestimonialItem[];
}

export interface HeroSectionProps {
  content: ModeContent;
  onScrollTo: (id: string) => void;
  currentFrame: number;
  isPlayingAudio?: boolean;
  onScrub?: (fraction: number) => void;
  onReleaseScrub?: () => void;
}

export interface ServicesSectionProps {
  services: ServiceItem[];
  mode?: NavMode;
}

export interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export interface PrinciplesSectionProps {
  principles: PrincipleItem[];
}

export interface ToolkitSectionProps {
  toolkit: ToolkitCategory[];
}

export interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export interface BlogSectionProps {
  articles: ArticleItem[];
}

export interface ContactSectionProps {
  topics: string[];
}

export interface InteractiveComposerProps {
  topics: string[];
}

export interface NavbarHeaderProps {
  mode: NavMode;
  setMode: (mode: NavMode) => void;
  isDarkTheme?: boolean;
  onScrollTo: (id: string) => void;
}

export interface BubbleNavProps {
  mode: NavMode;
  onChange: (mode: NavMode) => void;
  isDarkTheme: boolean;
}

export interface CanvasFramePlayerProps {
  className?: string;
  currentFrame: number;
  isPlaying?: boolean;
  onScrub?: (fraction: number) => void;
  onReleaseScrub?: () => void;
}

export interface MusicPlayerWidgetProps {
  isPlaying: boolean;
  onToggle: () => void;
  frequencyData: number[];
  trackTitle: string;
  isDarkTheme?: boolean;
  onLoadCustomTrack?: (file: File) => void;
}

export interface StatsBarProps {
  stats: StatItem[];
}

export interface MarqueeTickerProps {
  items: string[];
}

export interface ScrollAnimationManagerProps {
  mode: string;
}

export interface SmoothScrollProps {
  children: ReactNode;
}

export interface UseAudioBeatSyncOptions {
  totalFrames?: number;
  audioSrc?: string;
  fps?: number;
}

export interface DockItem {
  id: string;
  label: string;
  icon?: string;
}

export interface IOSControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection?: (id: string) => void;
  isDarkTheme?: boolean;
}

export interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export interface TabItem {
  id: string;
  label: string;
}

export interface LiquidNavToggleProps {
  mode: PortfolioMode;
  onChange: (mode: PortfolioMode) => void;
  isDarkTheme: boolean;
}

export interface GlassToggleProps {
  initialState?: boolean;
  onToggle?: (isDark: boolean) => void;
  className?: string;
}

export interface GlassKnobProps {
  isToggled: boolean;
}

export interface LiquidGlassToggleProps {
  leftLabel?: string;
  rightLabel?: string;
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
  className?: string;
}

export const CAREER_START_YEAR = 2022;

export function getYearsOfExperience(): number {
  const currentYear = new Date().getFullYear();
  return Math.max(4, currentYear - CAREER_START_YEAR);
}

