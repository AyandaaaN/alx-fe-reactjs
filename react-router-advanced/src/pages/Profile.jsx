import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h2>Profile</h2>
      <p>Signed in as: <strong>{user?.email}</strong></p>
      <button onClick={logout}>Sign out</button>

      <nav style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>

      {/* Nested routes render here */}
      <div style={{ marginTop: 16, padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
        <Outlet />
      </div>
    </div>
  );
}
