import type { Category } from '../types';
import { TopicNode } from './TopicNode';

interface CategorySectionProps {
  category: Category;
}

export const CategorySection = ({ category }: CategorySectionProps) => {
  return (
    <div
      className="category-section"
      style={{
        marginBottom: '32px',
        position: 'relative',
        paddingLeft: '24px',
      }}
    >
      {/* Timeline marker */}
      <div
        style={{
          position: 'absolute',
          left: '0',
          top: '8px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#595959',
          border: '2px solid #434343',
        }}
      />

      {/* Timeline line */}
      <div
        style={{
          position: 'absolute',
          left: '5px',
          top: '24px',
          bottom: '-24px',
          width: '2px',
          backgroundColor: '#303030',
        }}
      />

      {/* Category header */}
      <h2
        style={{
          color: '#ffffff',
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '16px',
          marginTop: '0',
        }}
      >
        {category.name}
      </h2>

      {/* Topics list */}
      <div style={{ marginLeft: '8px' }}>
        {category.topics.map((topic) => (
          <TopicNode key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
};
