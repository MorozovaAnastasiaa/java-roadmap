import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProgressStatus } from '../types';

interface AppState {
  // State
  progress: Record<string, ProgressStatus>;
  selectedTopic: string | null;

  // Actions
  setProgress: (topicId: string, status: ProgressStatus) => void;
  selectTopic: (topicId: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      progress: {},
      selectedTopic: null,

      setProgress: (topicId, status) =>
        set((state) => ({
          progress: { ...state.progress, [topicId]: status },
        })),

      selectTopic: (topicId) =>
        set({ selectedTopic: topicId }),
    }),
    {
      name: 'java-roadmap-state',
    }
  )
);
