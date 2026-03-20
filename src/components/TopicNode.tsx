import type { CSSProperties } from 'react';
import type { Topic } from '../types';
import { useAppStore } from '../store/useAppStore';
import { STATUS_COLORS, META_TEXT_COLOR, GLASS_BASE } from '../constants/colors';
import { getQuestionCountByTopicId } from '../data';

interface TopicNodeProps {
  topic: Topic;
}

export const TopicNode = ({ topic }: TopicNodeProps) => {
  const selectTopic = useAppStore((state) => state.selectTopic);
  const progress = useAppStore((state) => state.progress);
  const status = progress[topic.id] || 'not_started';
  const colors = STATUS_COLORS[status];
  const questionCount = getQuestionCountByTopicId(topic.id);

  const handleClick = () => {
    selectTopic(topic.id);
  };

  const style: CSSProperties = {
    padding: '12px 16px',
    marginBottom: '8px',
    borderRadius: '12px',
    backgroundColor: colors.background,
    border: `1px solid ${colors.border}`,
    boxShadow: colors.glow,
    cursor: 'pointer',
    transition: 'all 0.2s ease-out',
    ...GLASS_BASE,
  };

  const className = status === 'in_progress' ? 'topic-node in-progress' : 'topic-node';

  return (
    <div
      className={className}
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
      style={style}
    >
      <span style={{ color: '#F3F4F6', fontSize: '14px', fontWeight: 500 }}>{topic.name}</span>
      {questionCount > 0 && (
        <span style={{
          marginLeft: '8px',
          color: META_TEXT_COLOR,
          fontSize: '12px',
          fontWeight: 400,
        }}>
          {questionCount}
        </span>
      )}
    </div>
  );
};
