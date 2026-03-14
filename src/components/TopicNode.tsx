import type { CSSProperties } from 'react';
import type { Topic } from '../types';
import { useAppStore } from '../store/useAppStore';
import { STATUS_COLORS, META_TEXT_COLOR } from '../constants/colors';
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

  // Заменяем transparent на #262626 (цвет фона карточки) для not_started,
  // чтобы обеспечить видимость на тёмном фоне #141414
  const baseBackground = colors.background === 'transparent' ? '#262626' : colors.background;

  const style: CSSProperties = {
    padding: '12px 16px',
    marginBottom: '8px',
    borderRadius: '8px',
    backgroundColor: baseBackground,
    border: `2px solid ${colors.border}`,
    boxShadow: colors.glow,
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
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
      style={style}
    >
      <span style={{ color: '#E5E7EB', fontSize: '14px' }}>{topic.name}</span>
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
