import ForgotPasswordForm from '../components/FormComponent/FormComponent.jsx';
import { withRouter } from 'react-router-dom';

const ForgotPassword = props => (
  <>
    <ForgotPasswordForm formType="ForgotPassword" {...props} />
  </>
);

export default withRouter(ForgotPassword);
