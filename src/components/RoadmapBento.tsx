import { useEffect, useRef, useState } from 'react';
import { TOPICS_DATA } from '../data/graphData';
import { useAppStore } from '../store/useAppStore';
import { STATUS_COLORS, ZONES, GLASS_BASE, getLearnedColors, type ZoneConfig } from '../constants/colors';
import type { ProgressStatus } from '../types';

// Balance subtopics between left and right by weight (item count)
const balanceSubtopics = <T extends { items?: unknown[] }>(subtopics: T[]): { left: T[]; right: T[] } => {
  const sorted = [...subtopics].sort((a, b) =>
    (b.items?.length || 0) - (a.items?.length || 0)
  );

  const left: T[] = [];
  const right: T[] = [];
  let leftWeight = 0;
  let rightWeight = 0;

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

// Fixed card width
const CARD_WIDTH = 210;

// Zone progress (simplified: learned = 100%)
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
    if (progress[id] === 'learned') done += 1;
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

// Item block (подтема) - click toggles status directly (no drawer)
const ItemBlock = ({
  id,
  name,
  zoneGlow,
}: {
  id: string;
  name: string;
  zoneGlow: string;
}) => {
  const { progress, setProgress } = useAppStore();
  const status: ProgressStatus = progress[id] || 'not_started';
  const isLearned = status === 'learned';
  // Use zone color for learned status
  const colors = isLearned ? getLearnedColors(zoneGlow) : STATUS_COLORS.not_started;

  const toggleStatus = () => {
    setProgress(id, isLearned ? 'not_started' : 'learned');
  };

  return (
    <div
      className="topic-block"
      onClick={toggleStatus}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleStatus();
        }
      }}
      tabIndex={0}
      role="button"
      title={name}
      style={{
        ...GLASS_BASE,
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 8px',
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: '6px',
        boxShadow: colors.glow,
        fontSize: '11px',
        fontWeight: status === 'learned' ? 500 : 400,
        color: status === 'learned' ? '#F3F4F6' : '#9CA3AF',
        cursor: 'pointer',
        transition: 'all 0.2s ease-out',
        maxWidth: '100%',
      }}
    >
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

// Subtopic block (тема-заголовок группы) — full width header
const SubtopicBlock = ({
  id,
  name,
  zoneGlow,
}: {
  id: string;
  name: string;
  zoneGlow: string;
}) => {
  const selectTopic = useAppStore((state) => state.selectTopic);
  const progress = useAppStore((state) => state.progress);
  const status: ProgressStatus = progress[id] || 'not_started';
  const isLearned = status === 'learned';

  return (
    <div
      className="subtopic-header"
      onClick={() => selectTopic(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectTopic(id);
        }
      }}
      tabIndex={0}
      role="button"
      title={name}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '8px 12px',
        backgroundColor: isLearned ? `rgba(${zoneGlow}, 0.12)` : 'rgba(255, 255, 255, 0.03)',
        borderBottom: `1px solid rgba(${zoneGlow}, ${isLearned ? 0.4 : 0.15})`,
        borderRadius: '6px 6px 0 0',
        fontSize: '13px',
        fontWeight: 600,
        color: isLearned ? '#F3F4F6' : '#D1D5DB',
        cursor: 'pointer',
        transition: 'all 0.2s ease-out',
      }}
    >
      <span style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
      }}>
        {name}
      </span>
    </div>
  );
};

// Category block (center) - more prominent
const CategoryBlock = ({ name, zoneGlow }: { name: string; zoneGlow: string }) => (
  <div
    style={{
      ...GLASS_BASE,
      padding: '14px 24px',
      backgroundColor: `rgba(${zoneGlow}, 0.22)`,
      border: `2px solid rgba(${zoneGlow}, 0.5)`,
      borderRadius: '14px',
      boxShadow: `0 0 30px rgba(${zoneGlow}, 0.35), 0 6px 24px rgba(0, 0, 0, 0.3)`,
      fontSize: '14px',
      fontWeight: 600,
      color: '#fff',
      textAlign: 'center',
      minWidth: '160px',
      maxWidth: '200px',
    }}
  >
    {name}
  </div>
);

// Subtopic with items - fixed width card container
const SubtopicWithItems = ({
  subtopic,
  zoneGlow,
}: {
  subtopic: { id: string; name: string; items?: { id: string; name: string }[] };
  zoneGlow: string;
  align: 'left' | 'right';
}) => (
  <div
    style={{
      ...GLASS_BASE,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: `rgba(${zoneGlow}, 0.04)`,
      border: `1px solid rgba(${zoneGlow}, 0.15)`,
      borderRadius: '10px',
      width: `${CARD_WIDTH}px`,
      overflow: 'hidden',
    }}
  >
    {/* Header - full width */}
    <SubtopicBlock
      id={subtopic.id}
      name={subtopic.name}
      zoneGlow={zoneGlow}
    />
    {/* Items below header */}
    {subtopic.items && subtopic.items.length > 0 && (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          padding: '10px',
          width: '100%',
        }}
      >
        {subtopic.items.map((item) => (
          <ItemBlock key={item.id} id={item.id} name={item.name} zoneGlow={zoneGlow} />
        ))}
      </div>
    )}
  </div>
);

// Category row with multi-column subtopics (2 columns per side)
const CategoryRow = ({ topic, zoneGlow }: { topic: typeof TOPICS_DATA[0]; zoneGlow: string }) => {
  // Balance subtopics by weight for visual symmetry
  const { left: leftSubtopics, right: rightSubtopics } = balanceSubtopics(topic.subtopics);

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
                <SubtopicWithItems key={sub.id} subtopic={sub} zoneGlow={zoneGlow} align="left" />
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
                <SubtopicWithItems key={sub.id} subtopic={sub} zoneGlow={zoneGlow} align="right" />
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
          <CategoryRow key={topic.id} topic={topic} zoneGlow={zone.glowColor} />
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
        backgroundColor: 'transparent',
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
