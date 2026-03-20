import { TOPICS_DATA } from '../data/graphData';
import type { ProgressStatus } from '../types';

export interface ProgressStats {
  total: number;
  notStarted: number;
  learned: number;
  percentages: ProgressPercentages;
  overallProgress: number;
}

export interface ProgressPercentages {
  not_started: number;
  learned: number;
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

  let learned = 0;

  allTopicIds.forEach(id => {
    const status = progress[id] || 'not_started';
    if (status === 'learned') {
      learned++;
    }
  });

  const notStarted = total - learned;
  const overallProgress = total > 0 ? Math.round((learned / total) * 100) : 0;

  const percentages: ProgressPercentages = {
    not_started: total > 0 ? Math.round((notStarted / total) * 100) : 0,
    learned: overallProgress,
  };

  return { total, notStarted, learned, percentages, overallProgress };
}
