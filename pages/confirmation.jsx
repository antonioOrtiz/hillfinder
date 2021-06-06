import ConfirmationPage from '../components/FormComponent/FormComponent.jsx';
import { withRouter } from 'react-router-dom';

var Confirmation = props => (
  <>
    <ConfirmationPage formType="Confirmation" {...props} />
  </>
);

export default withRouter(Confirmation);
