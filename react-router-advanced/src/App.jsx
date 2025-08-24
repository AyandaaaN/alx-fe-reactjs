import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';

import Profile from './components/Profile';
import Post from './components/Post';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
          <header style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <Link to="/">Home</Link>
            <Link to="/posts/1">Post 1</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login" style={{ marginLeft: 'auto' }}>Login</Link>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Dynamic route */}
            <Route path="/posts/:postId" element={<Post />} />

            {/* Protected parent; note the /* so nested child routes match */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile/*" element={<Profile />} />
            </Route>

            <Route path="*" element={<p>Not Found</p>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
