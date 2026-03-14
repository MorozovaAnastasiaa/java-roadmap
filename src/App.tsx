import { Layout } from 'antd';
import { RoadmapView, TopicDrawer, ErrorBoundary } from './components';

const { Content, Sider } = Layout;

function App() {
  return (
    <ErrorBoundary>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#141414' }}>
        <Sider
          width={250}
          style={{
            backgroundColor: '#1f1f1f',
            borderRight: '1px solid #303030',
          }}
          collapsible
          defaultCollapsed
        >
          {/* TODO: Dashboard будет добавлен в Epic 3 */}
        </Sider>

        <Layout>
          <Content
            style={{
              backgroundColor: '#141414',
              overflow: 'auto',
              height: '100vh',
            }}
          >
            <RoadmapView />
          </Content>
        </Layout>

        <TopicDrawer />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
