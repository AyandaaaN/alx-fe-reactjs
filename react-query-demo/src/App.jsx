import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PostsComponent from './components/PostsComponent.jsx';

const queryClient = new QueryClient();

export default function App() {
  const [show, setShow] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
        <h1>React Query Demo (JSONPlaceholder)</h1>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button onClick={() => setShow((s) => !s)}>
            {show ? 'Hide' : 'Show'} PostsComponent
          </button>
        </div>

        {show && <PostsComponent />}
      </div>
    </QueryClientProvider>
  );
}
