import { memo, type CSSProperties } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import type { TopicNodeData } from '../../data/graphData';
import { useAppStore } from '../../store/useAppStore';
import { STATUS_COLORS, GLASS_BASE } from '../../constants/colors';

const glassBase: CSSProperties = {
  ...GLASS_BASE,
  transition: 'all 0.2s ease-out',
};

const nodeStyles: Record<string, CSSProperties> = {
  root: {
    padding: '16px 24px',
    borderRadius: '16px',
    backgroundColor: 'rgba(124, 58, 237, 0.3)',
    border: '1px solid rgba(139, 92, 246, 0.6)',
    boxShadow: '0 0 30px rgba(124, 58, 237, 0.4), 0 8px 32px rgba(0, 0, 0, 0.4)',
    minWidth: '180px',
    textAlign: 'center' as const,
    ...glassBase,
  },
  category: {
    padding: '12px 20px',
    borderRadius: '12px',
    backgroundColor: 'rgba(38, 38, 38, 0.6)',
    border: '1px solid rgba(107, 114, 128, 0.4)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
    minWidth: '200px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    ...glassBase,
  },
  topic: {
    padding: '10px 16px',
    borderRadius: '10px',
    backgroundColor: 'rgba(31, 31, 31, 0.7)',
    border: '1px solid rgba(75, 85, 99, 0.5)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
    minWidth: '150px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    ...glassBase,
  },
  subtopic: {
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: 'rgba(23, 23, 23, 0.7)',
    border: '1px solid rgba(55, 65, 81, 0.5)',
    boxShadow: '0 2px 16px rgba(0, 0, 0, 0.2)',
    minWidth: '120px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    fontSize: '12px',
    ...glassBase,
  },
};

const labelStyles = {
  root: {
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 700,
  },
  category: {
    color: '#E5E7EB',
    fontSize: '14px',
    fontWeight: 600,
  },
  topic: {
    color: '#D1D5DB',
    fontSize: '13px',
    fontWeight: 500,
  },
  subtopic: {
    color: '#9CA3AF',
    fontSize: '12px',
    fontWeight: 400,
  },
};

export const TopicGraphNode = memo(({ data, id }: NodeProps<TopicNodeData>) => {
  const selectTopic = useAppStore((state) => state.selectTopic);
  const progress = useAppStore((state) => state.progress);

  const status = data.topicId ? progress[data.topicId] || 'not_started' : 'not_started';
  const colors = STATUS_COLORS[status];

  const baseStyle = nodeStyles[data.type] || nodeStyles.topic;
  const baseLabelStyle = labelStyles[data.type] || labelStyles.topic;

  // Apply status colors for clickable nodes with glassmorphism
  const statusStyle = data.topicId ? {
    border: `1px solid ${colors.border}`,
    boxShadow: colors.glow,
    backgroundColor: colors.background,
  } : {};

  const handleClick = () => {
    if (data.topicId) {
      selectTopic(data.topicId);
    } else if (data.type === 'category') {
      selectTopic(id);
    }
  };

  return (
    <div
      style={{ ...baseStyle, ...statusStyle }}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: 'rgba(156, 163, 175, 0.6)', border: 'none', width: 6, height: 6 }}
      />
      <span style={baseLabelStyle}>{data.label}</span>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: 'rgba(156, 163, 175, 0.6)', border: 'none', width: 6, height: 6 }}
      />
    </div>
  );
});

TopicGraphNode.displayName = 'TopicGraphNode';
