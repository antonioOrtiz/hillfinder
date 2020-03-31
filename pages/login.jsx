import 'semantic-ui-css/semantic.min.css';
import LoginForm from '../components/FormComponent/FormComponent.jsx';
import { withRouter } from 'react-router-dom';

const Login = props => (
  <>
    <LoginForm formType={'Login'} {...props} />
  </>
);

export default withRouter(Login);
