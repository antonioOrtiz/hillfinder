import Router from 'next/router'
import withAuth from 'next-authentication'
import 'semantic-ui-css/semantic.min.css'
import ProfilePage from '../components/Profile/ProfilePage.jsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  logOutUser } from '../store'

const Profile = ({ isLoggedIn, logOutUser}) => (
    <>
     <ProfilePage isLoggedIn={isLoggedIn} logOutUser={logOutUser}/>
    </>
 )


const authOptions = {
    // client callback for invalid sessions
    callback: () => Router.push('/'),
    // the server takes care of the redirect, only pass a string
    // with the route
    serverRedirect: '/'
}


function mapStateToProps(state) {
 const { isLoggedIn, logOutUser } = state
 return { isLoggedIn, logOutUser }
}
const mapDispatchToProps = dispatch =>
 bindActionCreators({logOutUser }, dispatch)

export default withAuth(authOptions)(connect(mapStateToProps, mapDispatchToProps)(Profile));
// export default withAuth(authOptions)(Profile)
