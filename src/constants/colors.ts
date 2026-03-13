import type { ProgressStatus } from '../types';

interface StatusColor {
  border: string;
  glow: string;
  background: string;
}

export const STATUS_COLORS: Record<ProgressStatus, StatusColor> = {
  not_started: {
    border: '#6B7280',
    glow: 'none',
    background: 'transparent',
  },
  in_progress: {
    border: '#FBBF24',
    glow: '0 0 15px rgba(251, 191, 36, 0.5)',
    background: 'rgba(251, 191, 36, 0.1)',
  },
  learned: {
    border: '#34D399',
    glow: '0 0 15px rgba(52, 211, 153, 0.5)',
    background: 'rgba(52, 211, 153, 0.1)',
  },
  confident: {
    border: '#A78BFA',
    glow: '0 0 15px rgba(167, 139, 250, 0.5)',
    background: 'rgba(167, 139, 250, 0.1)',
  },
};
