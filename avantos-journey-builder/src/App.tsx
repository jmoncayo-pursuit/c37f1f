import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { api } from './services/api';
import type { Form, Node } from './services/api';
import { colors, shadows, spacing } from './styles/theme';
import { FlowDiagram } from './components/FlowDiagram';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${colors.background};
`;

const Header = styled.header`
  background: ${colors.white};
  padding: ${spacing.md};
  box-shadow: ${shadows.sm};
`;

const Title = styled.h1`
  margin: 0;
  color: ${colors.text.primary};
  font-size: 24px;
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

function App() {
  const [graphData, setGraphData] = useState<{ nodes: Node[]; forms: Form[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getGraphData();
        setGraphData({
          nodes: data.nodes,
          forms: data.forms,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!graphData) {
    return null;
  }

  return (
    <AppContainer>
      <Header>
        <Title>Journey Builder</Title>
      </Header>
      <Main>
        <FlowDiagram nodes={graphData.nodes} forms={graphData.forms} />
      </Main>
    </AppContainer>
  );
}

export default App;
