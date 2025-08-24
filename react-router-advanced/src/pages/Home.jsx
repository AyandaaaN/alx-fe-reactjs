import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h2>Home</h2>
      <p>Demo of nested, protected, and dynamic routes.</p>
      <nav style={{ display: 'flex', gap: 8 }}>
        <Link to="/">Home</Link>
        <Link to="/posts/42">Post 42 (dynamic)</Link>
        <Link to="/profile">Profile (protected)</Link>
      </nav>
    </>
  );
}
