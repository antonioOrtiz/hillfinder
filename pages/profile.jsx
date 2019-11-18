import 'semantic-ui-css/semantic.min.css'
import ProfilePage from '../components/Profile/ProfilePage.jsx'
import { withRouter } from "react-router-dom";

const Profile = (props) => (<>
 <ProfilePage {...props} />
</>)

export default withRouter(Profile)


