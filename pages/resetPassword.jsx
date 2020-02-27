import 'semantic-ui-css/semantic.min.css';
import ResetPasswordForm from '../components/ResetPassword/ResetPasswordForm.jsx';
import { withRouter } from 'react-router-dom';

const ResetPassword = props => (
  <>
    <ResetPasswordForm {...props} />
  </>
);

export default withRouter(ResetPassword);
