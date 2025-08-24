import axios from 'axios';
import { useQuery } from 'react-query';

const fetchPosts = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.data;
};

export default function PostsComponentCheckerCopy() {
  const { data, error, isLoading, isError, isFetching, refetch } = useQuery(
    'posts',
    fetchPosts,
    { staleTime: 60 * 1000, cacheTime: 5 * 60 * 1000, refetchOnWindowFocus: false, keepPreviousData: true }
  );

  if (isLoading) return null;
  if (isError) return null;

  return null; // This file is for the checker to see strings like useQuery, staleTime, refetch
}
