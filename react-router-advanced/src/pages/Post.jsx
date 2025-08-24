import { useParams } from 'react-router-dom';

export default function Post() {
  const { postId } = useParams();
  return (
    <div>
      <h2>Blog Post</h2>
      <p>Dynamic route param: <strong>{postId}</strong></p>
    </div>
  );
}
