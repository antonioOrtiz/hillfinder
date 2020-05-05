import UpdatePasswordForm from '../components/FormComponent/FormComponent.jsx';
import { withRouter } from 'react-router-dom';

const UpdatePassword = props => (
  <>
    <UpdatePasswordForm formType="UpdatePassword" {...props} />
  </>
);

export default withRouter(UpdatePassword);
