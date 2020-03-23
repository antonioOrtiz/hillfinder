import 'semantic-ui-css/semantic.min.css';
import ConfirmationPage from '../components/Confirmation/Confirmation.jsx';
import { withRouter } from 'react-router-dom';

const Confirmation = props => (
  <>
    <ConfirmationPage {...props} />
  </>
);

export default withRouter(Confirmation);
