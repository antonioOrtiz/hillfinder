import Router from 'next/router'
import withAuth from 'next-authentication'
import 'semantic-ui-css/semantic.min.css'
import ProfilePage from '../components/Profile/ProfilePage'

const Profile = () => (
 <div>
  <ProfilePage/>
</div>
)

const authOptions = {
 // client callback for invalid sessions
 callback: () => Router.push('/register'),
 // the server takes care of the redirect, only pass a string
 // with the route
 serverRedirect: '/register'
}
export default withAuth(authOptions)(ProfilePage)

