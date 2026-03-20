import type { ProgressStatus } from '../types';

export interface StatusColor {
  border: string;
  glow: string;
  background: string;
}

// Мета-информация: счётчики, нумерация, вспомогательный текст
export const META_TEXT_COLOR = '#9CA3AF';

// Glassmorphism base styles
export const GLASS_BASE = {
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
};

export const STATUS_COLORS: Record<ProgressStatus, StatusColor> = {
  not_started: {
    border: 'rgba(107, 114, 128, 0.4)',
    glow: '0 4px 24px rgba(0, 0, 0, 0.3)',
    background: 'rgba(38, 38, 38, 0.6)',
  },
  in_progress: {
    border: 'rgba(250, 204, 21, 0.6)',
    glow: '0 0 20px rgba(250, 204, 21, 0.3), 0 4px 24px rgba(0, 0, 0, 0.3)',
    background: 'rgba(250, 204, 21, 0.1)',
  },
  learned: {
    border: 'rgba(74, 222, 128, 0.6)',
    glow: '0 0 20px rgba(74, 222, 128, 0.3), 0 4px 24px rgba(0, 0, 0, 0.3)',
    background: 'rgba(74, 222, 128, 0.1)',
  },
  confident: {
    border: 'rgba(167, 139, 250, 0.7)',
    glow: '0 0 25px rgba(167, 139, 250, 0.4), 0 4px 24px rgba(0, 0, 0, 0.3)',
    background: 'rgba(167, 139, 250, 0.15)',
  },
};

// Zone visual groupings with glow colors
export interface ZoneConfig {
  id: string;
  name: string;
  categoryIds: string[];
  glowColor: string;      // RGB for glow effects
  accentColor: string;    // Solid accent for borders/highlights
}

export const ZONES: ZoneConfig[] = [
  {
    id: 'java-core',
    name: 'Java Core',
    categoryIds: ['string', 'collections', 'hashmap', 'exceptions', 'stream-api', 'generics-records', 'immutability'],
    glowColor: '59, 130, 246',      // Blue
    accentColor: '#3B82F6',
  },
  {
    id: 'oop-architecture',
    name: 'ООП и Архитектура',
    categoryIds: ['oop-solid', 'patterns'],
    glowColor: '16, 185, 129',      // Emerald
    accentColor: '#10B981',
  },
  {
    id: 'concurrency',
    name: 'Многопоточность',
    categoryIds: ['concurrency', 'completable-future'],
    glowColor: '168, 85, 247',      // Purple
    accentColor: '#A855F7',
  },
  {
    id: 'spring',
    name: 'Spring',
    categoryIds: ['spring', 'transactions'],
    glowColor: '34, 197, 94',       // Green
    accentColor: '#22C55E',
  },
  {
    id: 'data',
    name: 'Данные',
    categoryIds: ['databases', 'hibernate'],
    glowColor: '6, 182, 212',       // Cyan
    accentColor: '#06B6D4',
  },
  {
    id: 'infrastructure',
    name: 'Инфраструктура',
    categoryIds: ['rest-http', 'microservices', 'docker-k8s', 'kafka', 'memory-gc'],
    glowColor: '251, 146, 60',      // Orange
    accentColor: '#FB923C',
  },
];
