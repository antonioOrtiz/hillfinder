import RegisterForm from '../components/FormComponent/FormComponent.jsx';
import { withRouter } from 'react-router-dom';

var Register = props => (
  <>
    <RegisterForm formType="Registration" {...props} />
  </>
);

export default withRouter(Register);
