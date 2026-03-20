import { TOPICS_DATA } from '../data/graphData';
import type { ProgressStatus } from '../types';

export interface ProgressStats {
  total: number;
  notStarted: number;
  inProgress: number;
  learned: number;
  confident: number;
  percentages: ProgressPercentages;
  overallProgress: number;
}

export interface ProgressPercentages {
  not_started: number;
  in_progress: number;
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

// Вычисляет проценты с корректировкой, чтобы сумма всегда равнялась 100%
function calculatePercentages(
  counts: { notStarted: number; inProgress: number; learned: number; confident: number },
  total: number
): ProgressPercentages {
  if (total === 0) {
    return { not_started: 0, in_progress: 0, learned: 0, confident: 0 };
  }

  const percentages: ProgressPercentages = {
    not_started: Math.round((counts.notStarted / total) * 100),
    in_progress: Math.round((counts.inProgress / total) * 100),
    learned: Math.round((counts.learned / total) * 100),
    confident: Math.round((counts.confident / total) * 100),
  };

  // Корректируем, если сумма !== 100 (добавляем/вычитаем из наибольшего)
  const sum = percentages.not_started + percentages.in_progress + percentages.learned + percentages.confident;
  if (sum !== 100) {
    const diff = 100 - sum;
    const statuses: (keyof ProgressPercentages)[] = ['not_started', 'in_progress', 'learned', 'confident'];
    const maxStatus = statuses.reduce((a, b) =>
      percentages[a] > percentages[b] ? a : b
    );
    percentages[maxStatus] += diff;
  }

  return percentages;
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

  const percentages = calculatePercentages({ notStarted, inProgress, learned, confident }, total);
  const overallProgress = total > 0 ? Math.round(((learned + confident) / total) * 100) : 0;

  return { total, notStarted, inProgress, learned, confident, percentages, overallProgress };
}
