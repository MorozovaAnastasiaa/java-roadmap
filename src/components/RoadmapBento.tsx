import { useEffect, useRef, useState } from 'react';
import { TOPICS_DATA } from '../data/graphData';
import { useAppStore } from '../store/useAppStore';
import { STATUS_COLORS, ZONES, GLASS_BASE, type ZoneConfig } from '../constants/colors';
import type { ProgressStatus } from '../types';

// Status icons
const STATUS_ICONS: Record<ProgressStatus, string> = {
  not_started: '○',
  in_progress: '◐',
  learned: '●',
  confident: '✓',
};

// Zone progress
const useZoneProgress = (zone: ZoneConfig) => {
  const progress = useAppStore((state) => state.progress);
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

  if (ids.length === 0) return 0;

  let done = 0;
  for (const id of ids) {
    const status = progress[id];
    if (status === 'confident') done += 1;
    else if (status === 'learned') done += 0.7;
    else if (status === 'in_progress') done += 0.3;
  }

  return Math.round((done / ids.length) * 100);
};

// Zone progress bar
const ZoneProgressBar = ({ zone }: { zone: ZoneConfig }) => {
  const percent = useZoneProgress(zone);

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

// Item block (подтема)
const ItemBlock = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  const selectTopic = useAppStore((state) => state.selectTopic);
  const progress = useAppStore((state) => state.progress);
  const status: ProgressStatus = progress[id] || 'not_started';
  const colors = STATUS_COLORS[status];
  const icon = STATUS_ICONS[status];

  return (
    <div
      className={status === 'in_progress' ? 'topic-block in-progress' : 'topic-block'}
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
        ...GLASS_BASE,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: '6px',
        boxShadow: colors.glow,
        fontSize: '10px',
        fontWeight: 400,
        color: '#D1D5DB',
        cursor: 'pointer',
        transition: 'all 0.2s ease-out',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: '8px', opacity: status === 'not_started' ? 0.5 : 1 }}>
        {icon}
      </span>
      {name}
    </div>
  );
};

// Subtopic block (тема-заголовок группы) — выделенный стиль
const SubtopicBlock = ({
  id,
  name,
  zoneAccent,
  zoneGlow,
}: {
  id: string;
  name: string;
  zoneAccent: string;
  zoneGlow: string;
}) => {
  const selectTopic = useAppStore((state) => state.selectTopic);
  const progress = useAppStore((state) => state.progress);
  const status: ProgressStatus = progress[id] || 'not_started';
  const icon = STATUS_ICONS[status];

  // Цвета в зависимости от статуса
  const statusColors = {
    not_started: {
      bg: `rgba(${zoneGlow}, 0.08)`,
      border: `rgba(${zoneGlow}, 0.3)`,
      text: '#E5E7EB',
    },
    in_progress: {
      bg: 'rgba(250, 204, 21, 0.12)',
      border: 'rgba(250, 204, 21, 0.5)',
      text: '#FDE047',
    },
    learned: {
      bg: 'rgba(74, 222, 128, 0.12)',
      border: 'rgba(74, 222, 128, 0.5)',
      text: '#86EFAC',
    },
    confident: {
      bg: 'rgba(167, 139, 250, 0.15)',
      border: 'rgba(167, 139, 250, 0.6)',
      text: '#C4B5FD',
    },
  };

  const c = statusColors[status];

  return (
    <div
      className={status === 'in_progress' ? 'topic-block in-progress' : 'topic-block'}
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
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 10px',
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: '6px',
        borderLeft: `3px solid ${status === 'not_started' ? zoneAccent : c.border}`,
        fontSize: '12px',
        fontWeight: 600,
        color: c.text,
        cursor: 'pointer',
        transition: 'all 0.2s ease-out',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: '10px', opacity: status === 'not_started' ? 0.6 : 1 }}>
        {icon}
      </span>
      {name}
    </div>
  );
};

// Category block (center)
const CategoryBlock = ({ name, zoneGlow }: { name: string; zoneGlow: string }) => (
  <div
    style={{
      ...GLASS_BASE,
      padding: '12px 20px',
      backgroundColor: `rgba(${zoneGlow}, 0.2)`,
      border: `1px solid rgba(${zoneGlow}, 0.5)`,
      borderRadius: '12px',
      boxShadow: `0 0 25px rgba(${zoneGlow}, 0.3), 0 4px 20px rgba(0, 0, 0, 0.3)`,
      fontSize: '14px',
      fontWeight: 600,
      color: '#fff',
      textAlign: 'center',
      minWidth: '160px',
    }}
  >
    {name}
  </div>
);

// Subtopic with items - in a card container
const SubtopicWithItems = ({
  subtopic,
  zoneGlow,
  zoneAccent,
  align,
}: {
  subtopic: { id: string; name: string; items?: { id: string; name: string }[] };
  zoneGlow: string;
  zoneAccent: string;
  align: 'left' | 'right';
}) => (
  <div
    style={{
      ...GLASS_BASE,
      display: 'flex',
      flexDirection: 'column',
      alignItems: align === 'left' ? 'flex-end' : 'flex-start',
      gap: '8px',
      padding: '10px 12px',
      backgroundColor: `rgba(${zoneGlow}, 0.04)`,
      border: `1px solid rgba(${zoneGlow}, 0.12)`,
      borderRadius: '10px',
      minWidth: '140px',
      maxWidth: '220px',
    }}
  >
    <SubtopicBlock
      id={subtopic.id}
      name={subtopic.name}
      zoneAccent={zoneAccent}
      zoneGlow={zoneGlow}
    />
    {subtopic.items && subtopic.items.length > 0 && (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3px',
          justifyContent: align === 'left' ? 'flex-end' : 'flex-start',
        }}
      >
        {subtopic.items.map((item) => (
          <ItemBlock key={item.id} id={item.id} name={item.name} />
        ))}
      </div>
    )}
  </div>
);

// Category row with multi-column subtopics
const CategoryRow = ({ topic, zoneGlow, zoneAccent }: { topic: typeof TOPICS_DATA[0]; zoneGlow: string; zoneAccent: string }) => {
  const subtopics = topic.subtopics;

  // Split into left and right (alternating)
  const leftSubtopics = subtopics.filter((_, i) => i % 2 === 0);
  const rightSubtopics = subtopics.filter((_, i) => i % 2 === 1);

  // Group into rows of 2 for each side
  const groupIntoRows = <T,>(arr: T[], size: number): T[][] => {
    const rows: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      rows.push(arr.slice(i, i + size));
    }
    return rows;
  };

  const leftRows = groupIntoRows(leftSubtopics, 2);
  const rightRows = groupIntoRows(rightSubtopics, 2);
  const maxRows = Math.max(leftRows.length, rightRows.length);

  return (
    <div style={{ marginBottom: '28px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '20px',
          alignItems: 'start',
        }}
      >
        {/* Left side - multiple columns */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'flex-end',
          }}
        >
          {Array.from({ length: maxRows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-end',
              }}
            >
              {(leftRows[rowIndex] || []).map((sub) => (
                <SubtopicWithItems key={sub.id} subtopic={sub} zoneGlow={zoneGlow} zoneAccent={zoneAccent} align="left" />
              ))}
            </div>
          ))}
        </div>

        {/* Center - Category */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '100%',
          paddingTop: '20px',
        }}>
          <CategoryBlock name={topic.name} zoneGlow={zoneGlow} />
        </div>

        {/* Right side - multiple columns */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'flex-start',
          }}
        >
          {Array.from({ length: maxRows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-start',
              }}
            >
              {(rightRows[rowIndex] || []).map((sub) => (
                <SubtopicWithItems key={sub.id} subtopic={sub} zoneGlow={zoneGlow} zoneAccent={zoneAccent} align="right" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Zone section
const ZoneSection = ({ zone, index }: { zone: ZoneConfig; index: number }) => {
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

  const zoneTopics = TOPICS_DATA.filter((topic) => zone.categoryIds.includes(topic.id));

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
        padding: '20px',
        marginBottom: '20px',
        boxShadow: `0 0 50px rgba(${zone.glowColor}, 0.06), 0 4px 24px rgba(0, 0, 0, 0.25)`,
        overflow: 'hidden',
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Zone glow orb */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '250px',
        height: '150px',
        background: `radial-gradient(ellipse, rgba(${zone.glowColor}, 0.12) 0%, transparent 70%)`,
        pointerEvents: 'none',
        filter: 'blur(30px)',
      }} />

      {/* Zone header */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
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

      {/* Vertical connector line */}
      {zoneTopics.length > 1 && (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '80px',
          bottom: '40px',
          width: '2px',
          background: `linear-gradient(to bottom, rgba(${zone.glowColor}, 0.3), rgba(${zone.glowColor}, 0.1), rgba(${zone.glowColor}, 0.3))`,
          boxShadow: `0 0 10px rgba(${zone.glowColor}, 0.2)`,
          transform: 'translateX(-50%)',
          zIndex: 0,
        }} />
      )}

      {/* Categories */}
      <div style={{ position: 'relative' }}>
        {zoneTopics.map((topic) => (
          <CategoryRow key={topic.id} topic={topic} zoneGlow={zone.glowColor} zoneAccent={zone.accentColor} />
        ))}
      </div>
    </div>
  );
};

// Main component
export const RoadmapBento = () => {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        padding: '28px 16px',
      }}
    >
      {/* Subtle background glow */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100vh',
        background: 'radial-gradient(ellipse at 30% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(168, 85, 247, 0.04) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <h1
        style={{
          position: 'relative',
          color: '#fff',
          fontSize: '24px',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '28px',
          textShadow: '0 0 30px rgba(99, 102, 241, 0.25)',
        }}
      >
        Java Developer Roadmap
      </h1>

      {/* Zones */}
      <div style={{ position: 'relative', maxWidth: '1150px', margin: '0 auto' }}>
        {ZONES.map((zone, index) => (
          <ZoneSection key={zone.id} zone={zone} index={index} />
        ))}
      </div>
    </div>
  );
};
