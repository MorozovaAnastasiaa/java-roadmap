import { Layout } from 'antd';
import { RoadmapView, TopicDrawer } from './components';

const { Content, Sider } = Layout;

function App() {
  return (
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
        {/* Dashboard будет добавлен в следующих историях */}
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
  );
}

export default App;
