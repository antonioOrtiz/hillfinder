import ProfilePage from '../components/Profile/ProfilePage.jsx';
import { withRouter } from 'react-router-dom';

var Profile = props => (
  <>
    <ProfilePage {...props} />
  </>
);

export default withRouter(Profile);
