import { Drawer, Segmented } from 'antd';
import { useAppStore } from '../store/useAppStore';
import { CATEGORIES } from '../data';
import type { ProgressStatus } from '../types';

// Single source of truth for status options - derived from ProgressStatus type
const PROGRESS_STATUS_VALUES: ProgressStatus[] = ['not_started', 'in_progress', 'learned', 'confident'];

const STATUS_LABELS: Record<ProgressStatus, string> = {
  not_started: 'Не начато',
  in_progress: 'В процессе',
  learned: 'Изучено',
  confident: 'Уверенно',
};

const STATUS_OPTIONS = PROGRESS_STATUS_VALUES.map((value) => ({
  label: STATUS_LABELS[value],
  value,
}));

const isValidProgressStatus = (value: string): value is ProgressStatus => {
  return PROGRESS_STATUS_VALUES.includes(value as ProgressStatus);
};

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
        aria-label="Выберите статус изучения темы"
      />
    </Drawer>
  );
};
