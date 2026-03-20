import { useState } from 'react';
import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { RoadmapBento, TopicDrawer, ErrorBoundary, Dashboard, DotGrid } from './components';

const { Content, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ErrorBoundary>
      <DotGrid />
      <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
        <Content style={{ overflow: 'auto' }}>
          <RoadmapBento />
        </Content>
        <Sider
          width={280}
          collapsedWidth={0}
          collapsed={collapsed}
          trigger={null}
          style={{
            background: '#1a1a1a',
            borderLeft: collapsed ? 'none' : '1px solid #303030',
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Dashboard />
        </Sider>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: 'fixed',
            right: collapsed ? 16 : 290,
            top: 16,
            zIndex: 100,
            color: '#fff',
            background: 'rgba(26, 26, 26, 0.8)',
            border: '1px solid #303030',
            transition: 'right 0.2s',
          }}
        />
      </Layout>
      <TopicDrawer />
    </ErrorBoundary>
  );
}

export default App;
