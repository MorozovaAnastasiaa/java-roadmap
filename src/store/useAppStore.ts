import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ProgressStatus } from '../types';
import { getChildrenIds } from '../utils/getChildrenIds';

interface AppState {
  // State
  progress: Record<string, ProgressStatus>;
  selectedTopic: string | null;
  _hasHydrated: boolean;

  // Actions
  setProgress: (topicId: string, status: ProgressStatus) => void;
  selectTopic: (topicId: string | null) => void;
  resetProgress: () => void;
  setHasHydrated: (state: boolean) => void;
}

const STORAGE_KEY = 'java-roadmap-state';
const STORAGE_VERSION = 1;

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      progress: {},
      selectedTopic: null,
      _hasHydrated: false,

      // Actions
      setProgress: (topicId, status) => {
        if (import.meta.env.DEV) {
          console.log(`[persist] setProgress: ${topicId} → ${status}`);
        }
        // Получаем все дочерние ID для каскадного обновления
        const childrenIds = getChildrenIds(topicId);

        set((state) => {
          const newProgress = { ...state.progress, [topicId]: status };
          // Обновляем статус всех дочерних элементов
          for (const childId of childrenIds) {
            newProgress[childId] = status;
          }
          if (import.meta.env.DEV && childrenIds.length > 0) {
            console.log(`[persist] cascade update: ${childrenIds.length} children`);
          }
          return { progress: newProgress };
        });
      },

      selectTopic: (topicId) =>
        set({ selectedTopic: topicId }),

      resetProgress: () => {
        if (import.meta.env.DEV) {
          console.log('[persist] resetProgress: clearing all progress');
        }
        set({ progress: {} });
      },

      setHasHydrated: (state) =>
        set({ _hasHydrated: state }),
    }),
    {
      name: STORAGE_KEY,
      version: STORAGE_VERSION,
      storage: createJSONStorage(() => localStorage),

      // Only persist progress, not UI state
      partialize: (state) => ({
        progress: state.progress,
      }),

      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Failed to rehydrate state:', error);
          // State will fall back to initial state automatically
        } else if (import.meta.env.DEV) {
          console.log('[persist] Hydration complete:', state?.progress);
        }
        state?.setHasHydrated(true);
      },

      migrate: (persistedState: unknown, version: number) => {
        if (import.meta.env.DEV && version < STORAGE_VERSION) {
          console.log(`[persist] Migrating from version ${version} to ${STORAGE_VERSION}`);
        }

        // Validate persisted state structure
        if (!persistedState || typeof persistedState !== 'object') {
          return { progress: {} };
        }

        const state = persistedState as Record<string, unknown>;

        // Ensure progress is a valid object
        if (!state.progress || typeof state.progress !== 'object') {
          return { progress: {} };
        }

        return { progress: state.progress as Record<string, ProgressStatus> };
      },
    }
  )
);

// Selector for checking hydration status
export const useHasHydrated = () => useAppStore((state) => state._hasHydrated);
