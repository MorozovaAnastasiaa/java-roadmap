import { Drawer, Segmented } from 'antd';
import { useAppStore } from '../store/useAppStore';
import { CATEGORIES } from '../data';
import type { ProgressStatus } from '../types';

const STATUS_OPTIONS = [
  { label: 'Не начато', value: 'not_started' },
  { label: 'В процессе', value: 'in_progress' },
  { label: 'Изучено', value: 'learned' },
  { label: 'Уверенно', value: 'confident' },
];

export const TopicDrawer = () => {
  const { selectedTopic, selectTopic, progress, setProgress } = useAppStore();

  const topic = selectedTopic
    ? CATEGORIES.flatMap((c) => c.topics).find((t) => t.id === selectedTopic)
    : null;

  const currentStatus = selectedTopic
    ? progress[selectedTopic] || 'not_started'
    : 'not_started';

  const handleStatusChange = (value: string) => {
    if (selectedTopic && isValidProgressStatus(value)) {
      setProgress(selectedTopic, value);
    }
  };

  const isValidProgressStatus = (value: string): value is ProgressStatus => {
    return ['not_started', 'in_progress', 'learned', 'confident'].includes(value);
  };

  return (
    <Drawer
      title={topic?.name || ''}
      placement="right"
      open={!!selectedTopic}
      onClose={() => selectTopic(null)}
      width={400}
    >
      <Segmented
        options={STATUS_OPTIONS}
        value={currentStatus}
        onChange={handleStatusChange}
        block
      />
    </Drawer>
  );
};
