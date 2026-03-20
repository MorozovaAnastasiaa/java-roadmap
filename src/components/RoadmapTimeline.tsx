import { useEffect, useRef, useState } from 'react';
import { TOPICS_DATA } from '../data/graphData';
import { useAppStore } from '../store/useAppStore';
import { STATUS_COLORS, ZONES, GLASS_BASE, type ZoneConfig } from '../constants/colors';
import type { ProgressStatus } from '../types';

// Collect all topic IDs for a zone (subtopics + items)
const getZoneTopicIds = (zone: ZoneConfig): string[] => {
  const ids: string[] = [];
  const zoneTopics = TOPICS_DATA.filter((t) => zone.categoryIds.includes(t.id));
  for (const topic of zoneTopics) {
    for (const subtopic of topic.subtopics) {
      ids.push(subtopic.id);
      if (subtopic.items) {
        for (const item of subtopic.items) {
          ids.push(item.id);
        }
      }
    }
  }
  return ids;
};

// Calculate zone progress (0-100) - simplified
const useZoneProgress = (zone: ZoneConfig) => {
  const progress = useAppStore((state) => state.progress);
  const topicIds = getZoneTopicIds(zone);
  if (topicIds.length === 0) return { percent: 0, total: 0, done: 0 };

  let done = 0;
  for (const id of topicIds) {
    if (progress[id] === 'learned') done += 1;
  }
  return {
    percent: Math.round((done / topicIds.length) * 100),
    total: topicIds.length,
    done,
  };
};

// Zone progress bar component
const ZoneProgressBar = ({ zone }: { zone: ZoneConfig }) => {
  const { percent } = useZoneProgress(zone);

  return (
    <div style={{
      position: 'relative',
      height: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '2px',
      marginTop: '12px',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: `${percent}%`,
        background: `linear-gradient(90deg, rgba(${zone.glowColor}, 0.6), rgba(${zone.glowColor}, 0.9))`,
        boxShadow: `0 0 8px rgba(${zone.glowColor}, 0.5)`,
        borderRadius: '2px',
        transition: 'width 0.3s ease-out',
      }} />
      {percent > 0 && (
        <span style={{
          position: 'absolute',
          right: '4px',
          top: '-18px',
          fontSize: '10px',
          color: zone.accentColor,
          fontWeight: 500,
          opacity: 0.9,
        }}>
          {percent}%
        </span>
      )}
    </div>
  );
};

// Gradient glow orbs - simplified for cleaner look
const GlowOrbs = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    {/* Blue - top left */}
    <div style={{
      position: 'absolute',
      top: '-10%',
      left: '-15%',
      width: '900px',
      height: '700px',
      background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.1) 0%, transparent 60%)',
      filter: 'blur(100px)',
    }} />
    {/* Purple - upper right */}
    <div style={{
      position: 'absolute',
      top: '10%',
      right: '-10%',
      width: '800px',
      height: '600px',
      background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.08) 0%, transparent 65%)',
      filter: 'blur(90px)',
    }} />
    {/* Green - center left */}
    <div style={{
      position: 'absolute',
      top: '40%',
      left: '-8%',
      width: '700px',
      height: '600px',
      background: 'radial-gradient(ellipse, rgba(16, 185, 129, 0.07) 0%, transparent 60%)',
      filter: 'blur(90px)',
    }} />
    {/* Orange - lower right */}
    <div style={{
      position: 'absolute',
      top: '60%',
      right: '-5%',
      width: '750px',
      height: '650px',
      background: 'radial-gradient(ellipse, rgba(251, 146, 60, 0.07) 0%, transparent 60%)',
      filter: 'blur(95px)',
    }} />
    {/* Cyan - bottom center */}
    <div style={{
      position: 'absolute',
      top: '80%',
      left: '20%',
      width: '800px',
      height: '600px',
      background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.06) 0%, transparent 55%)',
      filter: 'blur(100px)',
    }} />
  </div>
);

// Status icons (simplified to 2)
const STATUS_ICONS: Record<ProgressStatus, string> = {
  not_started: '○',
  learned: '✓',
};

// Balance subtopics between left and right by weight (item count)
const balanceSubtopics = <T extends { items?: unknown[] }>(subtopics: T[]): { left: T[]; right: T[] } => {
  // Sort by weight (heavier first)
  const sorted = [...subtopics].sort((a, b) =>
    (b.items?.length || 0) - (a.items?.length || 0)
  );

  const left: T[] = [];
  const right: T[] = [];
  let leftWeight = 0;
  let rightWeight = 0;

  // Greedy distribution - add to lighter side
  for (const sub of sorted) {
    const weight = 1 + (sub.items?.length || 0);
    if (leftWeight <= rightWeight) {
      left.push(sub);
      leftWeight += weight;
    } else {
      right.push(sub);
      rightWeight += weight;
    }
  }

  return { left, right };
};

// Fixed card width for consistent layout
const CARD_WIDTH = 200;

// Clickable topic block with glassmorphism
const TopicBlock = ({
  id,
  name,
  level = 'item'
}: {
  id: string;
  name: string;
  level?: 'subtopic' | 'item';
}) => {
  const selectTopic = useAppStore((state) => state.selectTopic);
  const progress = useAppStore((state) => state.progress);
  const status: ProgressStatus = progress[id] || 'not_started';
  const colors = STATUS_COLORS[status];
  const icon = STATUS_ICONS[status];

  const glassStyle = {
    ...GLASS_BASE,
    cursor: 'pointer',
    transition: 'all 0.2s ease-out',
  };

  const className = 'topic-block';

  const iconStyle = {
    marginRight: '6px',
    fontSize: level === 'subtopic' ? '12px' : '10px',
    opacity: status === 'not_started' ? 0.5 : 1,
    flexShrink: 0,
  };

  // Subtopic (first level) - larger, prominent glass card
  if (level === 'subtopic') {
    return (
      <div
        className={className}
        onClick={() => selectTopic(id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectTopic(id);
          }
        }}
        tabIndex={0}
        role="button"
        style={{
          ...glassStyle,
          display: 'flex',
          alignItems: 'center',
          padding: '10px 14px',
          backgroundColor: colors.background,
          border: `1px solid ${colors.border}`,
          borderRadius: '10px',
          boxShadow: colors.glow,
          fontSize: '13px',
          fontWeight: 500,
          color: '#F3F4F6',
        }}
      >
        <span style={iconStyle}>{icon}</span>
        <span style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {name}
        </span>
      </div>
    );
  }

  // Item (second level) - smaller glass pill
  return (
    <div
      className={className}
      onClick={() => selectTopic(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectTopic(id);
        }
      }}
      tabIndex={0}
      role="button"
      style={{
        ...glassStyle,
        display: 'flex',
        alignItems: 'center',
        padding: '5px 10px',
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: '6px',
        boxShadow: colors.glow,
        fontSize: '11px',
        color: '#D1D5DB',
      }}
    >
      <span style={iconStyle}>{icon}</span>
      <span style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
    </div>
  );
};

// Category header block with zone-colored glass effect - more prominent
const CategoryBlock = ({ name, zoneGlow }: { name: string; zoneGlow: string }) => (
  <div
    style={{
      ...GLASS_BASE,
      padding: '16px 32px',
      backgroundColor: `rgba(${zoneGlow}, 0.22)`,
      border: `2px solid rgba(${zoneGlow}, 0.5)`,
      borderRadius: '14px',
      boxShadow: `0 0 35px rgba(${zoneGlow}, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)`,
      fontSize: '15px',
      fontWeight: 600,
      color: '#fff',
      textAlign: 'center',
      minWidth: '180px',
      maxWidth: '220px',
    }}
  >
    {name}
  </div>
);

// Glowing connection line - stronger visual
const ConnectionLine = ({ align, zoneGlow }: { align: 'left' | 'right'; zoneGlow: string }) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      [align === 'left' ? 'right' : 'left']: '100%',
      width: '32px',
      height: '2px',
      background: `linear-gradient(${align === 'left' ? 'to left' : 'to right'}, rgba(${zoneGlow}, 0.8), rgba(${zoneGlow}, 0.15))`,
      boxShadow: `0 0 10px rgba(${zoneGlow}, 0.5)`,
      transform: 'translateY(-50%)',
    }}
  />
);

// Subtopic group with items and connection line
const SubtopicGroup = ({
  subtopic,
  align,
  zoneGlow
}: {
  subtopic: { id: string; name: string; items?: { id: string; name: string }[] };
  align: 'left' | 'right';
  zoneGlow: string;
}) => (
  <div
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: align === 'left' ? 'flex-end' : 'flex-start',
      gap: '6px',
      width: `${CARD_WIDTH}px`,
    }}
  >
    <div style={{ position: 'relative', width: '100%' }}>
      <ConnectionLine align={align} zoneGlow={zoneGlow} />
      <TopicBlock id={subtopic.id} name={subtopic.name} level="subtopic" />
    </div>
    {subtopic.items && subtopic.items.length > 0 && (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: align === 'left' ? 'flex-end' : 'flex-start',
          gap: '3px',
          width: '100%',
          marginLeft: align === 'right' ? '12px' : '0',
          marginRight: align === 'left' ? '12px' : '0',
          paddingLeft: align === 'right' ? '10px' : '0',
          paddingRight: align === 'left' ? '10px' : '0',
          borderLeft: align === 'right' ? `1px solid rgba(${zoneGlow}, 0.25)` : 'none',
          borderRight: align === 'left' ? `1px solid rgba(${zoneGlow}, 0.25)` : 'none',
        }}
      >
        {subtopic.items.map((item) => (
          <TopicBlock key={item.id} id={item.id} name={item.name} level="item" />
        ))}
      </div>
    )}
  </div>
);

// Category row with subtopics branching left and right
const CategoryRow = ({ topic, zoneGlow }: { topic: typeof TOPICS_DATA[0]; zoneGlow: string }) => {
  // Balance subtopics by weight (item count) for visual symmetry
  const { left: leftSubtopics, right: rightSubtopics } = balanceSubtopics(topic.subtopics);

  return (
    <div className="category-row" style={{ position: 'relative', marginBottom: '48px' }}>
      {/* Center node marker */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '20px',
        transform: 'translateX(-50%)',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: `rgba(${zoneGlow}, 0.7)`,
        boxShadow: `0 0 12px rgba(${zoneGlow}, 0.5)`,
        zIndex: 3,
      }} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '32px',
          alignItems: 'start',
        }}
      >
        {/* Left subtopics */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'flex-end',
            paddingRight: '24px',
          }}
        >
          {leftSubtopics.map((sub) => (
            <SubtopicGroup key={sub.id} subtopic={sub} align="left" zoneGlow={zoneGlow} />
          ))}
        </div>

        {/* Center: Category */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <CategoryBlock name={topic.name} zoneGlow={zoneGlow} />
        </div>

        {/* Right subtopics */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'flex-start',
            paddingLeft: '24px',
          }}
        >
          {rightSubtopics.map((sub) => (
            <SubtopicGroup key={sub.id} subtopic={sub} align="right" zoneGlow={zoneGlow} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Zone container with colored glassmorphism + scroll animation
const ZoneSection = ({ zone, index }: { zone: typeof ZONES[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const zoneTopics = TOPICS_DATA.filter((topic) =>
    zone.categoryIds.includes(topic.id)
  );

  if (zoneTopics.length === 0) return null;

  return (
    <div
      ref={ref}
      className={`zone-section ${isVisible ? 'visible' : ''}`}
      style={{
        position: 'relative',
        ...GLASS_BASE,
        backgroundColor: `rgba(${zone.glowColor}, 0.03)`,
        border: `1px solid rgba(${zone.glowColor}, 0.15)`,
        borderRadius: '16px',
        padding: '28px',
        marginBottom: '32px',
        boxShadow: `0 0 60px rgba(${zone.glowColor}, 0.08), 0 8px 32px rgba(0, 0, 0, 0.3)`,
        overflow: 'hidden',
        animationDelay: `${index * 0.15}s`,
      }}
    >
      {/* Zone glow orb */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '200px',
        background: `radial-gradient(ellipse, rgba(${zone.glowColor}, 0.15) 0%, transparent 70%)`,
        pointerEvents: 'none',
        filter: 'blur(40px)',
      }} />

      {/* Zone header with accent color + progress bar */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <div
          style={{
            color: zone.accentColor,
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            paddingLeft: '4px',
            textShadow: `0 0 20px rgba(${zone.glowColor}, 0.5)`,
          }}
        >
          {zone.name}
        </div>
        <ZoneProgressBar zone={zone} />
      </div>

      {/* Categories inside zone with vertical connector */}
      <div style={{ position: 'relative' }}>
        {/* Vertical glow line connecting categories within zone - stronger */}
        {zoneTopics.length > 1 && (
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '20px',
            bottom: '50px',
            width: '3px',
            background: `linear-gradient(to bottom, rgba(${zone.glowColor}, 0.6), rgba(${zone.glowColor}, 0.25), rgba(${zone.glowColor}, 0.6))`,
            boxShadow: `0 0 15px rgba(${zone.glowColor}, 0.4)`,
            transform: 'translateX(-50%)',
            zIndex: 0,
          }} />
        )}
        {zoneTopics.map((topic) => (
          <CategoryRow key={topic.id} topic={topic} zoneGlow={zone.glowColor} />
        ))}
      </div>
    </div>
  );
};

export const RoadmapTimeline = () => {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        padding: '40px 20px',
        overflowX: 'auto',
      }}
    >
      {/* Background glow orbs for glassmorphism */}
      <GlowOrbs />

      <h1
        style={{
          position: 'relative',
          color: '#fff',
          fontSize: '28px',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '48px',
          textShadow: '0 0 40px rgba(99, 102, 241, 0.3)',
        }}
      >
        Java Developer Roadmap
      </h1>

      {/* Zones with categories */}
      <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
        {ZONES.map((zone, index) => (
          <ZoneSection key={zone.id} zone={zone} index={index} />
        ))}
      </div>
    </div>
  );
};
