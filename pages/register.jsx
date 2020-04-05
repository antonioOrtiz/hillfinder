import 'semantic-ui-css/semantic.min.css';
import RegisterForm from '../components/FormComponent/FormComponent.jsx';
import '../components/Register/Register.css';
import { withRouter } from 'react-router-dom';

const Register = props => (
  <>
    <RegisterForm formType="Registration" {...props} />
  </>
);

export default withRouter(Register);
