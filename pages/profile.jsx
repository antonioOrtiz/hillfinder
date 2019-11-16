import 'semantic-ui-css/semantic.min.css'
import ProfilePage from '../components/Profile/ProfilePage.jsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  logOutUser } from '../store'
import { withRouter } from "react-router-dom";

const Profile = ({ isLoggedIn, logOutUser, props}) => (
    <>
      <ProfilePage isLoggedIn={isLoggedIn} logOutUser={logOutUser} {...props} />
    </>
 )

function mapStateToProps(state) {
 const { isLoggedIn, logOutUser } = state
 return { isLoggedIn, logOutUser }
}

const mapDispatchToProps = dispatch =>
 bindActionCreators({logOutUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));

