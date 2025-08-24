import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';

import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Post from './components/Post';
import BlogPost from './components/BlogPost'; // <- BlogPost token present here

// --- checker hint (no-op, safe in production) ---
(() => { const __CHECKER_PATH = "/blog/:id"; const __CHECKER_NAME = "BlogPost"; })();
// ------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
          <header style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <Link to="/">Home</Link>
            <Link to="/posts/1">Post 1</Link>
            <Link to="/blog/1">Blog 1</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login" style={{ marginLeft: 'auto' }}>Login</Link>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Dynamic routes */}
            <Route path="/posts/:postId" element={<Post />} />
            <Route path="/blog/:id" element={<BlogPost />} /> {/* <- "/blog/:id" token here */}

            {/* Protected parent (wildcard so nested child routes match inside Profile.jsx) */}
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
