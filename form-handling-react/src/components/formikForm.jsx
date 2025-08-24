import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../api/mockAuth';

const schema = Yup.object({
  username: Yup.string().trim().min(3, 'Min 3 characters').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Required')
});

export default function FormikForm() {
  return (
    <div style={styles.wrap}>
      <h2>Register (Formik + Yup)</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
          setStatus({ success: '', error: '' });
          try {
            await registerUser(values);
            setStatus({ success: `Account created for ${values.username}!`, error: '' });
            resetForm();
          } catch (e) {
            setStatus({ success: '', error: e.message });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form style={styles.form}>
            <label htmlFor="username">Username</label>
            <Field id="username" name="username" placeholder="e.g. sibusiso" />
            <ErrorMessage name="username" component="div" style={styles.err} />

            <label htmlFor="email">Email</label>
            <Field id="email" name="email" type="email" placeholder="you@example.com" />
            <ErrorMessage name="email" component="div" style={styles.err} />

            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" placeholder="min 6 chars" />
            <ErrorMessage name="password" component="div" style={styles.err} />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Create Account'}
            </button>

            {status?.success && <div style={styles.ok}>{status.success}</div>}
            {status?.error && <div style={styles.err}>{status.error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

const styles = {
  wrap: { maxWidth: 420 },
  form: {
    display: 'grid',
    gap: 8,
    padding: '1rem',
    border: '1px solid #eee',
    borderRadius: 12
  },
  err: { color: 'crimson', fontSize: 13 },
  ok: { color: 'green', marginTop: 8 }
};
