import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../api/mockAuth';

const schema = Yup.object({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid').required('Required'),
  password: Yup.string().min(6, 'Min 6').required('Required'),
});

export default function FormikForm() {
  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
        setStatus('');
        try {
          await registerUser(values);
          setStatus('Success');
          resetForm();
        } catch (e) {
          setStatus(e.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form style={{ display: 'grid', gap: 8 }}>
          <h2>Register (Formik + Yup)</h2>

          <label>Username</label>
          <Field name="username" />
          <ErrorMessage name="username" component="div" />

          <label>Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" />

          <label>Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting…' : 'Create Account'}
          </button>

          {status && <div>{status}</div>}
        </Form>
      )}
    </Formik>
  );
}
