import { Drawer, Segmented, Card } from 'antd';
import { useAppStore } from '../store/useAppStore';
import { CATEGORIES, getQuestionsByTopicId } from '../data';
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

  const questions = selectedTopic ? getQuestionsByTopicId(selectedTopic) : [];

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

      {questions.length > 0 && (
        <div
          style={{
            marginTop: 24,
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto',
          }}
        >
          {questions.map((question) => (
            <Card key={question.id} size="small" style={{ marginBottom: 12 }}>
              {question.text}
            </Card>
          ))}
        </div>
      )}
    </Drawer>
  );
};
