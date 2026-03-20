import { Card, Progress, Divider } from 'antd';
import { useAppStore } from '../store/useAppStore';
import { STATUS_COLORS, ZONES } from '../constants/colors';
import { calculateStats } from '../utils/calculateStats';
import { TOPICS_DATA } from '../data/graphData';
import type { ProgressStatus } from '../types';

interface StatItem {
  label: string;
  status: ProgressStatus;
  count: number;
  percentage: number;
}

interface CategoryProgress {
  id: string;
  name: string;
  total: number;
  completed: number;
  percentage: number;
}

// Вычисляет прогресс по зонам (6 категорий)
function calculateCategoryProgress(
  progress: Record<string, ProgressStatus>
): CategoryProgress[] {
  return ZONES.map(zone => {
    // Собираем все topic IDs для этой зоны из TOPICS_DATA
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
      return status === 'learned' || status === 'confident';
    }).length;

    return {
      id: zone.id,
      name: zone.name,
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  });
}

export const Dashboard = () => {
  const progress = useAppStore((state) => state.progress);

  // Вычисляем статистику (реактивно обновляется при изменении progress)
  const stats = calculateStats(progress);

  // Вычисляем прогресс по категориям (зонам)
  const categoryProgress = calculateCategoryProgress(progress);

  const statItems: StatItem[] = [
    { label: 'Не начато', status: 'not_started', count: stats.notStarted, percentage: stats.percentages.not_started },
    { label: 'В процессе', status: 'in_progress', count: stats.inProgress, percentage: stats.percentages.in_progress },
    { label: 'Изучено', status: 'learned', count: stats.learned, percentage: stats.percentages.learned },
    { label: 'Уверенно', status: 'confident', count: stats.confident, percentage: stats.percentages.confident },
  ];

  return (
    <div style={{ padding: '16px' }}>
      {/* Общий прогресс (learned + confident) */}
      <Card size="small" style={{ marginBottom: '16px', background: '#1f1f1f', border: 'none' }}>
        <div style={{ marginBottom: '8px' }}>
          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Общий прогресс</span>
        </div>
        <Progress
          percent={stats.overallProgress}
          strokeColor={{
            '0%': 'rgba(74, 222, 128, 0.6)',
            '100%': 'rgba(167, 139, 250, 0.7)',
          }}
          trailColor="#303030"
          format={(percent) => <span style={{ color: '#E5E7EB' }}>{percent}%</span>}
        />
      </Card>

      {/* Статистика по статусам с процентами и Progress bars */}
      {statItems.map(item => (
        <div
          key={item.status}
          style={{
            padding: '12px',
            marginBottom: '8px',
            borderRadius: '6px',
            background: '#1f1f1f',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: STATUS_COLORS[item.status].border,
                marginRight: '12px',
                boxShadow: STATUS_COLORS[item.status].glow,
              }}
            />
            <span style={{ color: '#9CA3AF', flex: 1, fontSize: '14px' }}>{item.label}</span>
            <span style={{ color: '#E5E7EB', fontWeight: 'bold', fontSize: '14px' }}>
              {item.count} ({item.percentage}%)
            </span>
          </div>
          <Progress
            percent={item.percentage}
            strokeColor={STATUS_COLORS[item.status].border}
            trailColor="#303030"
            showInfo={false}
            size="small"
          />
        </div>
      ))}

      {/* Прогресс по категориям */}
      <Divider style={{ borderColor: '#303030', margin: '16px 0' }}>
        <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Прогресс по категориям</span>
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
            strokeColor={{
              '0%': STATUS_COLORS.learned.border,
              '100%': STATUS_COLORS.confident.border,
            }}
            trailColor="#303030"
            showInfo={false}
            size="small"
          />
        </div>
      ))}
    </div>
  );
};
