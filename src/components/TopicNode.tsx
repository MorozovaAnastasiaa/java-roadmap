import type { Topic } from '../types';
import { useAppStore } from '../store/useAppStore';

interface TopicNodeProps {
  topic: Topic;
}

export const TopicNode = ({ topic }: TopicNodeProps) => {
  const selectTopic = useAppStore((state) => state.selectTopic);

  const handleClick = () => {
    selectTopic(topic.id);
  };

  return (
    <div
      className="topic-node"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Тема: ${topic.name}`}
      style={{
        padding: '12px 16px',
        marginBottom: '8px',
        borderRadius: '8px',
        backgroundColor: '#262626',
        border: '1px solid #434343',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#303030';
        e.currentTarget.style.borderColor = '#595959';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#262626';
        e.currentTarget.style.borderColor = '#434343';
      }}
    >
      <span style={{ color: '#d9d9d9', fontSize: '14px' }}>{topic.name}</span>
    </div>
  );
};
