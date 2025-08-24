import { useState } from 'react';
import { registerUser } from '../api/mockAuth';

export default function RegistrationForm() {
  const [values, setValues] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!values.username.trim()) e.username = 'Username is required';
    if (!values.email.trim()) e.email = 'Email is required';
    if (!values.password.trim()) e.password = 'Password is required';
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, success: '', error: '' });

    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    try {
      setStatus((s) => ({ ...s, loading: true }));
      const res = await registerUser(values);
      setStatus({ loading: false, success: `Welcome, ${res.username}!`, error: '' });
      setValues({ username: '', email: '', password: '' });
    } catch (err) {
      setStatus({ loading: false, success: '', error: err.message });
    }
  };

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <h2>Register (Controlled Components)</h2>

      <label>Username</label>
      <input
        name="username"
        value={values.username}
        onChange={onChange}
        placeholder="e.g. sibusiso"
      />
      {errors.username && <span style={styles.err}>{errors.username}</span>}

      <label>Email</label>
      <input
        name="email"
        type="email"
        value={values.email}
        onChange={onChange}
        placeholder="you@example.com"
      />
      {errors.email && <span style={styles.err}>{errors.email}</span>}

      <label>Password</label>
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={onChange}
        placeholder="min 6 chars"
      />
      {errors.password && <span style={styles.err}>{errors.password}</span>}

      <button type="submit" disabled={status.loading}>
        {status.loading ? 'Submitting…' : 'Create Account'}
      </button>

      {status.success && <div style={styles.ok}>{status.success}</div>}
      {status.error && <div style={styles.err}>{status.error}</div>}
    </form>
  );
}

const styles = {
  form: {
    display: 'grid',
    gap: 8,
    maxWidth: 420,
    padding: '1rem',
    border: '1px solid #eee',
    borderRadius: 12
  },
  err: { color: 'crimson', fontSize: 13 },
  ok: { color: 'green', marginTop: 8 }
};
