import { CATEGORIES } from '../data';
import { CategorySection } from './CategorySection';

export const RoadmapView = () => {
  const sortedCategories = [...CATEGORIES].sort((a, b) => a.order - b.order);

  return (
    <div
      className="roadmap-view"
      style={{
        padding: '24px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          color: '#ffffff',
          fontSize: '28px',
          fontWeight: 700,
          marginBottom: '32px',
          textAlign: 'center',
        }}
      >
        Java Developer Roadmap
      </h1>

      <div className="roadmap-timeline">
        {sortedCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};
