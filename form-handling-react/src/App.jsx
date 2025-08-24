import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';

export default function App() {
  const [view, setView] = useState('controlled'); // 'controlled' | 'formik'
  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Form Handling in React</h1>
      <p style={{ marginBottom: 16 }}>
        Toggle between a controlled-components form and a Formik+Yup form.
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button
          onClick={() => setView('controlled')}
          disabled={view === 'controlled'}
        >
          Controlled Components
        </button>
        <button
          onClick={() => setView('formik')}
          disabled={view === 'formik'}
        >
          Formik + Yup
        </button>
      </div>

      {view === 'controlled' ? <RegistrationForm /> : <FormikForm />}
    </div>
  );
}
