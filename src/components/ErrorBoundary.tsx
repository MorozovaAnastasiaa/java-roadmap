import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Button, Result } from 'antd';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#141414'
        }}>
          <Result
            status="error"
            title="Произошла ошибка"
            subTitle="Приложение столкнулось с неожиданной ошибкой."
            extra={[
              <Button type="primary" key="reload" onClick={() => window.location.reload()}>
                Перезагрузить страницу
              </Button>,
              <Button key="retry" onClick={this.handleReset}>
                Попробовать снова
              </Button>,
            ]}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
