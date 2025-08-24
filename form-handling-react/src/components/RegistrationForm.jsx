import { useState } from 'react';
import { registerUser } from '../api/mockAuth';

export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState({});
  const [status, setStatus]     = useState({ loading: false, success: '', error: '' });

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = 'Username is required';
    if (!email.trim()) e.email = 'Email is required';
    if (!password.trim()) e.password = 'Password is required';
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    try {
      setStatus({ loading: true });
      await registerUser({ username, email, password });
      setStatus({ loading: false, success: `Welcome, ${username}!`, error: '' });
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setStatus({ loading: false, success: '', error: err.message });
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
      <h2>Register (Controlled Components)</h2>

      <label>Username</label>
      <input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.username && <span style={{ color: 'crimson' }}>{errors.username}</span>}

      <label>Email</label>
      <input
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <span style={{ color: 'crimson' }}>{errors.email}</span>}

      <label>Password</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <span style={{ color: 'crimson' }}>{errors.password}</span>}

      <button type="submit" disabled={status.loading}>
        {status.loading ? 'Submitting…' : 'Create Account'}
      </button>

      {status.success && <div style={{ color: 'green' }}>{status.success}</div>}
      {status.error && <div style={{ color: 'crimson' }}>{status.error}</div>}
    </form>
  );
}
