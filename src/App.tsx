import { Layout } from 'antd';
import { RoadmapBento, TopicDrawer, ErrorBoundary, Dashboard, DotGrid } from './components';

const { Content, Sider } = Layout;

function App() {
  return (
    <ErrorBoundary>
      <DotGrid />
      <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
        <Content style={{ overflow: 'auto' }}>
          <RoadmapBento />
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
