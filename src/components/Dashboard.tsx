import { Card, Progress, Divider } from 'antd';
import { useAppStore } from '../store/useAppStore';
import { ZONES } from '../constants/colors';
import { calculateStats } from '../utils/calculateStats';
import { TOPICS_DATA } from '../data/graphData';
import type { ProgressStatus } from '../types';

interface CategoryProgress {
  id: string;
  name: string;
  total: number;
  completed: number;
  percentage: number;
  zoneColor: string;
}

// Вычисляет прогресс по зонам (6 категорий)
function calculateCategoryProgress(
  progress: Record<string, ProgressStatus>
): CategoryProgress[] {
  return ZONES.map(zone => {
    const zoneTopicIds: string[] = [];

    for (const categoryId of zone.categoryIds) {
      const topicData = TOPICS_DATA.find(t => t.id === categoryId);
      if (topicData) {
        for (const subtopic of topicData.subtopics) {
          zoneTopicIds.push(subtopic.id);
          if (subtopic.items) {
            for (const item of subtopic.items) {
              zoneTopicIds.push(item.id);
            }
          }
        }
      }
    }

    const total = zoneTopicIds.length;
    const completed = zoneTopicIds.filter(id => {
      const status = progress[id] || 'not_started';
      return status === 'learned';
    }).length;

    return {
      id: zone.id,
      name: zone.name,
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      zoneColor: zone.accentColor,
    };
  });
}

export const Dashboard = () => {
  const progress = useAppStore((state) => state.progress);

  // Вычисляем статистику
  const stats = calculateStats(progress);

  // Вычисляем прогресс по категориям (зонам)
  const categoryProgress = calculateCategoryProgress(progress);

  return (
    <div style={{ padding: '16px' }}>
      {/* Общий прогресс */}
      <Card size="small" style={{ marginBottom: '16px', background: '#1f1f1f', border: 'none' }}>
        <div style={{ marginBottom: '8px' }}>
          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Общий прогресс</span>
        </div>
        <Progress
          percent={stats.overallProgress}
          strokeColor={{
            '0%': '#3B82F6',
            '100%': '#22C55E',
          }}
          trailColor="#303030"
          format={(percent) => <span style={{ color: '#E5E7EB' }}>{percent}%</span>}
        />
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
          <span style={{ color: '#9CA3AF' }}>Изучено</span>
          <span style={{ color: '#E5E7EB', fontWeight: 'bold' }}>{stats.learned} / {stats.total}</span>
        </div>
      </Card>

      {/* Прогресс по зонам */}
      <Divider style={{ borderColor: '#303030', margin: '16px 0' }}>
        <span style={{ color: '#9CA3AF', fontSize: '12px' }}>По категориям</span>
      </Divider>

      {categoryProgress.map(cat => (
        <div
          key={cat.id}
          style={{
            padding: '10px 12px',
            marginBottom: '8px',
            borderRadius: '6px',
            background: '#1f1f1f',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px'
          }}>
            <span style={{ color: '#E5E7EB', fontSize: '13px' }}>{cat.name}</span>
            <span style={{ color: '#9CA3AF', fontSize: '12px' }}>
              {cat.completed}/{cat.total}
            </span>
          </div>
          <Progress
            percent={cat.percentage}
            strokeColor={cat.zoneColor}
            trailColor="#303030"
            showInfo={false}
            size="small"
          />
        </div>
      ))}
    </div>
  );
};
