import { Link, Routes, Route } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      {user && <p>Signed in as: <strong>{user.email}</strong></p>}
      <button onClick={logout}>Sign out</button>

      <nav style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>

      {/* Nested routes declared INSIDE Profile.jsx */}
      <div style={{ marginTop: 16 }}>
        <Routes>
          <Route index element={<ProfileDetails />} />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>
      </div>
    </div>
  );
}
