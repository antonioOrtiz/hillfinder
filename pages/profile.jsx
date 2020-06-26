import ProfilePage from '../components/Profile/ProfilePage.jsx';
import { withRouter } from 'react-router-dom';

const Profile = props => {
  // console.log('props line 5', props);
  return (
    <>
      <ProfilePage {...props} />
    </>
  );
};

export default withRouter(Profile);
