import { Drawer, Button, Card, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useAppStore } from '../store/useAppStore';
import { getQuestionsByTopicId, TOPICS_DATA } from '../data';
import { META_TEXT_COLOR } from '../constants/colors';

const { Text } = Typography;

// Find topic name from graph data (full hierarchy)
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

  const isLearned = currentStatus === 'learned';

  const questions = selectedTopic ? getQuestionsByTopicId(selectedTopic) : [];

  const handleToggle = () => {
    if (selectedTopic) {
      setProgress(selectedTopic, isLearned ? 'not_started' : 'learned');
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
      <Button
        type={isLearned ? 'primary' : 'default'}
        icon={isLearned ? <CheckOutlined /> : null}
        onClick={handleToggle}
        block
        size="large"
        style={{
          backgroundColor: isLearned ? '#22C55E' : undefined,
          borderColor: isLearned ? '#22C55E' : undefined,
        }}
      >
        {isLearned ? 'Изучено' : 'Отметить как изученное'}
      </Button>

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
