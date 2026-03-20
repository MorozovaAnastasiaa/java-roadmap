import { TOPICS_DATA } from '../data/graphData';
import type { ProgressStatus } from '../types';

export interface ProgressStats {
  total: number;
  notStarted: number;
  inProgress: number;
  learned: number;
  confident: number;
}

// Collect all clickable topic IDs (subtopics + items) from TOPICS_DATA
function getAllTopicIds(): string[] {
  const ids: string[] = [];
  for (const category of TOPICS_DATA) {
    for (const subtopic of category.subtopics) {
      ids.push(subtopic.id);
      if (subtopic.items) {
        for (const item of subtopic.items) {
          ids.push(item.id);
        }
      }
    }
  }
  return ids;
}

export function calculateStats(progress: Record<string, ProgressStatus>): ProgressStats {
  const allTopicIds = getAllTopicIds();
  const total = allTopicIds.length;

  let notStarted = 0;
  let inProgress = 0;
  let learned = 0;
  let confident = 0;

  allTopicIds.forEach(id => {
    const status = progress[id] || 'not_started';
    switch (status) {
      case 'not_started': notStarted++; break;
      case 'in_progress': inProgress++; break;
      case 'learned': learned++; break;
      case 'confident': confident++; break;
    }
  });

  return { total, notStarted, inProgress, learned, confident };
}
