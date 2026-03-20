import { useState } from 'react';
import { Layout } from 'antd';
import { RoadmapTimeline, RoadmapBento, TopicDrawer, ErrorBoundary, Dashboard } from './components';

const { Content, Sider } = Layout;

function App() {
  // Переключатель для просмотра прототипа: ?view=bento в URL
  const [viewMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'bento' ? 'bento' : 'timeline';
  });

  return (
    <ErrorBoundary>
      <Layout style={{ minHeight: '100vh', background: '#0A0A0A' }}>
        <Content style={{ overflow: 'auto' }}>
          {viewMode === 'bento' ? <RoadmapBento /> : <RoadmapTimeline />}
        </Content>
        <Sider
          width={280}
          style={{
            background: '#1a1a1a',
            borderLeft: '1px solid #303030',
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Dashboard />
        </Sider>
      </Layout>
      <TopicDrawer />
    </ErrorBoundary>
  );
}

export default App;
