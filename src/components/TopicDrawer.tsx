import { Drawer, Segmented, Card, Typography } from 'antd';
import { useAppStore } from '../store/useAppStore';
import { getQuestionsByTopicId, TOPICS_DATA } from '../data';
import { META_TEXT_COLOR } from '../constants/colors';
import type { ProgressStatus } from '../types';

const { Text } = Typography;

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

// Find topic name from graph data
const findTopicName = (topicId: string): string | null => {
  // Check if it's a category
  const category = TOPICS_DATA.find(t => t.id === topicId);
  if (category) return category.name;

  // Check subtopics and items
  for (const cat of TOPICS_DATA) {
    for (const sub of cat.subtopics) {
      if (sub.id === topicId) return sub.name;
      if (sub.items) {
        const item = sub.items.find(i => i.id === topicId);
        if (item) return item.name;
      }
    }
  }
  return null;
};

export const TopicDrawer = () => {
  const { selectedTopic, selectTopic, progress, setProgress } = useAppStore();

  const topicName = selectedTopic ? findTopicName(selectedTopic) : null;

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
      title={topicName || ''}
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

      <div
        role="region"
        aria-label="Вопросы для собеседования"
        style={{
          marginTop: 24,
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
        }}
      >
        {questions.length > 0 ? (
          <ul
            role="list"
            aria-label={`${questions.length} вопросов по теме`}
            style={{ listStyle: 'none', margin: 0, padding: 0 }}
          >
            {questions.map((question, index) => (
              <li key={question.id} role="listitem">
                <Card size="small" style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <span>{question.text}</span>
                    <span
                      aria-label={`Вопрос ${index + 1} из ${questions.length}`}
                      style={{
                        color: META_TEXT_COLOR,
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}/{questions.length}
                    </span>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
            Для этой темы вопросов пока нет
          </Text>
        )}
      </div>
    </Drawer>
  );
};
