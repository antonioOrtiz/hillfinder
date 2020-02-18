import 'semantic-ui-css/semantic.min.css';
import ForgotPasswordForm from '../components/ForgotPassword/ForgotPasswordForm.jsx';
import { withRouter } from 'react-router-dom';

const ForgotPassword = props => (
  <>
    <ForgotPasswordForm {...props} />
  </>
);

export default withRouter(ForgotPassword);
