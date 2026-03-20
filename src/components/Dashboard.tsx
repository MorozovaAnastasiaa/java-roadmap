import { Card, Statistic } from 'antd';
import { useAppStore } from '../store/useAppStore';
import { STATUS_COLORS } from '../constants/colors';
import { calculateStats } from '../utils/calculateStats';
import type { ProgressStatus } from '../types';

interface StatItem {
  label: string;
  status: ProgressStatus;
  count: number;
}

export const Dashboard = () => {
  const progress = useAppStore((state) => state.progress);

  // Вычисляем статистику (реактивно обновляется при изменении progress)
  const stats = calculateStats(progress);

  const statItems: StatItem[] = [
    { label: 'Не начато', status: 'not_started', count: stats.notStarted },
    { label: 'В процессе', status: 'in_progress', count: stats.inProgress },
    { label: 'Изучено', status: 'learned', count: stats.learned },
    { label: 'Уверенно', status: 'confident', count: stats.confident },
  ];

  return (
    <div style={{ padding: '16px' }}>
      <Card size="small" style={{ marginBottom: '16px', background: '#1f1f1f', border: 'none' }}>
        <Statistic
          title={<span style={{ color: '#9CA3AF' }}>Всего тем</span>}
          value={stats.total}
          valueStyle={{ color: '#E5E7EB', fontSize: '32px' }}
        />
      </Card>

      {statItems.map(item => (
        <div
          key={item.status}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            marginBottom: '8px',
            borderRadius: '6px',
            background: '#1f1f1f',
          }}
        >
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
          <span style={{ color: '#E5E7EB', fontWeight: 'bold', fontSize: '16px' }}>
            {item.count}
          </span>
        </div>
      ))}
    </div>
  );
};
