import { QueryClient, QueryClientProvider } from 'react-query';
import PostsComponent from './components/PostsComponent.jsx';

const queryClient = new QueryClient();

export default function AppCheckerCopy() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostsComponent />
    </QueryClientProvider>
  );
}
