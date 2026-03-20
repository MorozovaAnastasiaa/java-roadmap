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

// Calculate zone progress (0-100)
const useZoneProgress = (zone: ZoneConfig) => {
  const progress = useAppStore((state) => state.progress);
  const topicIds = getZoneTopicIds(zone);
  if (topicIds.length === 0) return { percent: 0, total: 0, done: 0 };

  let done = 0;
  for (const id of topicIds) {
    const status = progress[id];
    if (status === 'confident') done += 1;
    else if (status === 'learned') done += 0.7;
    else if (status === 'in_progress') done += 0.3;
  }
  return {
    percent: Math.round((done / topicIds.length) * 100),
    total: topicIds.length,
    done: Math.round(done),
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

// Gradient glow orbs - large organic scattered layout
const GlowOrbs = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    {/* Huge blue - top left */}
    <div style={{
      position: 'absolute',
      top: '-15%',
      left: '-20%',
      width: '1100px',
      height: '900px',
      background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.18) 0%, transparent 60%)',
      filter: 'blur(120px)',
    }} />
    {/* Large purple - upper right */}
    <div style={{
      position: 'absolute',
      top: '-8%',
      right: '-15%',
      width: '900px',
      height: '800px',
      background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.14) 0%, transparent 65%)',
      filter: 'blur(100px)',
    }} />
    {/* Medium cyan - top center */}
    <div style={{
      position: 'absolute',
      top: '5%',
      left: '30%',
      width: '600px',
      height: '600px',
      background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
      filter: 'blur(90px)',
    }} />
    {/* Huge emerald - left side */}
    <div style={{
      position: 'absolute',
      top: '18%',
      left: '-12%',
      width: '950px',
      height: '750px',
      background: 'radial-gradient(ellipse, rgba(16, 185, 129, 0.12) 0%, transparent 60%)',
      filter: 'blur(110px)',
    }} />
    {/* Large orange accent - right */}
    <div style={{
      position: 'absolute',
      top: '25%',
      right: '5%',
      width: '700px',
      height: '650px',
      background: 'radial-gradient(ellipse, rgba(251, 146, 60, 0.1) 0%, transparent 65%)',
      filter: 'blur(95px)',
    }} />
    {/* Huge purple - center */}
    <div style={{
      position: 'absolute',
      top: '35%',
      left: '20%',
      width: '1000px',
      height: '850px',
      background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.09) 0%, transparent 55%)',
      filter: 'blur(130px)',
    }} />
    {/* Large cyan - left lower */}
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '-10%',
      width: '800px',
      height: '700px',
      background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.11) 0%, transparent 65%)',
      filter: 'blur(100px)',
    }} />
    {/* Large green - right center */}
    <div style={{
      position: 'absolute',
      top: '48%',
      right: '-8%',
      width: '850px',
      height: '750px',
      background: 'radial-gradient(ellipse, rgba(34, 197, 94, 0.1) 0%, transparent 60%)',
      filter: 'blur(110px)',
    }} />
    {/* Medium blue - center */}
    <div style={{
      position: 'absolute',
      top: '55%',
      left: '35%',
      width: '650px',
      height: '650px',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
      filter: 'blur(90px)',
    }} />
    {/* Huge orange - lower left */}
    <div style={{
      position: 'absolute',
      top: '65%',
      left: '-5%',
      width: '900px',
      height: '800px',
      background: 'radial-gradient(ellipse, rgba(251, 146, 60, 0.11) 0%, transparent 60%)',
      filter: 'blur(115px)',
    }} />
    {/* Large purple - lower right */}
    <div style={{
      position: 'absolute',
      top: '70%',
      right: '10%',
      width: '750px',
      height: '700px',
      background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.1) 0%, transparent 65%)',
      filter: 'blur(100px)',
    }} />
    {/* Huge emerald - bottom */}
    <div style={{
      position: 'absolute',
      top: '80%',
      left: '25%',
      width: '1000px',
      height: '800px',
      background: 'radial-gradient(ellipse, rgba(16, 185, 129, 0.1) 0%, transparent 55%)',
      filter: 'blur(120px)',
    }} />
    {/* Large blue - bottom right */}
    <div style={{
      position: 'absolute',
      top: '85%',
      right: '-12%',
      width: '850px',
      height: '750px',
      background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.12) 0%, transparent 60%)',
      filter: 'blur(110px)',
    }} />
  </div>
);

// Status icons for visual indication
const STATUS_ICONS: Record<ProgressStatus, string> = {
  not_started: '○',
  in_progress: '◐',
  learned: '●',
  confident: '✓',
};

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

  const className = status === 'in_progress' ? 'topic-block in-progress' : 'topic-block';

  const iconStyle = {
    marginRight: '6px',
    fontSize: level === 'subtopic' ? '12px' : '10px',
    opacity: status === 'not_started' ? 0.5 : 1,
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
          padding: '12px 16px',
          backgroundColor: colors.background,
          border: `1px solid ${colors.border}`,
          borderRadius: '10px',
          boxShadow: colors.glow,
          fontSize: '14px',
          fontWeight: 500,
          color: '#F3F4F6',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={iconStyle}>{icon}</span>
        {name}
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
        padding: '6px 12px',
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        boxShadow: colors.glow,
        fontSize: '12px',
        color: '#D1D5DB',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={iconStyle}>{icon}</span>
      {name}
    </div>
  );
};

// Category header block with zone-colored glass effect
const CategoryBlock = ({ name, zoneGlow }: { name: string; zoneGlow: string }) => (
  <div
    style={{
      ...GLASS_BASE,
      padding: '14px 28px',
      backgroundColor: `rgba(${zoneGlow}, 0.2)`,
      border: `1px solid rgba(${zoneGlow}, 0.4)`,
      borderRadius: '12px',
      boxShadow: `0 0 30px rgba(${zoneGlow}, 0.35), 0 8px 32px rgba(0, 0, 0, 0.3)`,
      fontSize: '15px',
      fontWeight: 600,
      color: '#fff',
      textAlign: 'center',
      minWidth: '200px',
    }}
  >
    {name}
  </div>
);

// Glowing connection line
const ConnectionLine = ({ align, zoneGlow }: { align: 'left' | 'right'; zoneGlow: string }) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      [align === 'left' ? 'right' : 'left']: '100%',
      width: '24px',
      height: '2px',
      background: `linear-gradient(${align === 'left' ? 'to left' : 'to right'}, rgba(${zoneGlow}, 0.6), rgba(${zoneGlow}, 0.1))`,
      boxShadow: `0 0 8px rgba(${zoneGlow}, 0.4)`,
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
    }}
  >
    <div style={{ position: 'relative' }}>
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
          gap: '4px',
          marginLeft: align === 'right' ? '20px' : '0',
          marginRight: align === 'left' ? '20px' : '0',
          paddingLeft: align === 'right' ? '12px' : '0',
          paddingRight: align === 'left' ? '12px' : '0',
          borderLeft: align === 'right' ? `1px solid rgba(${zoneGlow}, 0.2)` : 'none',
          borderRight: align === 'left' ? `1px solid rgba(${zoneGlow}, 0.2)` : 'none',
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
  // Split subtopics: odd indices left, even indices right
  const leftSubtopics = topic.subtopics.filter((_, i) => i % 2 === 0);
  const rightSubtopics = topic.subtopics.filter((_, i) => i % 2 === 1);

  return (
    <div className="category-row" style={{ position: 'relative', marginBottom: '40px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Left subtopics */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'flex-end',
            paddingRight: '20px',
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
            gap: '12px',
            alignItems: 'flex-start',
            paddingLeft: '20px',
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
        {/* Vertical glow line connecting categories within zone */}
        {zoneTopics.length > 1 && (
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '30px',
            bottom: '60px',
            width: '2px',
            background: `linear-gradient(to bottom, rgba(${zone.glowColor}, 0.4), rgba(${zone.glowColor}, 0.15), rgba(${zone.glowColor}, 0.4))`,
            boxShadow: `0 0 12px rgba(${zone.glowColor}, 0.3)`,
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
