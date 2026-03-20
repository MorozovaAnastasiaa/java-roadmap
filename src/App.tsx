import { RoadmapTimeline, TopicDrawer, ErrorBoundary } from './components';

function App() {
  return (
    <ErrorBoundary>
      <div style={{ position: 'relative' }}>
        <RoadmapTimeline />
        <TopicDrawer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
