import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';

export default function App() {
  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <RegistrationForm />
      <hr style={{ margin: '2rem 0' }} />
      <FormikForm />
    </div>
  );
}
