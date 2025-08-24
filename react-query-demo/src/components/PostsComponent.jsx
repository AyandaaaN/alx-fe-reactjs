import axios from 'axios';
import { useQuery } from 'react-query';

const fetchPosts = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.data;
};

export default function PostsComponent() {
  const {
    data,
    error,
    isLoading,
    isError,
    isFetching,
    refetch
  } = useQuery(
    'posts',                 // query key
    fetchPosts,              // query function
    {
      staleTime: 60 * 1000,  // 1 minute: data considered fresh -> served from cache
      cacheTime: 5 * 60 * 1000, // 5 minutes in cache after unmount
      refetchOnWindowFocus: false,
      keepPreviousData: true
    }
  );

  if (isLoading) return <p>Loading posts…</p>;
  if (isError)   return <p style={{color:'crimson'}}>Error: {String(error.message || error)}</p>;

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <button onClick={() => refetch()}>Refetch</button>
        {isFetching && <small>Updating…</small>}
      </div>

      <ul style={{ display: 'grid', gap: 8, paddingLeft: 18 }}>
        {data.slice(0, 10).map(post => (
          <li key={post.id}>
            <strong>#{post.id}: </strong>{post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
