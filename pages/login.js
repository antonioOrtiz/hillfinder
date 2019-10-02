import Router from 'next/router'
import withAuth from 'next-authentication'
import 'semantic-ui-css/semantic.min.css'
import LoginForm from '../components/Login/LoginForm'

const Login = () => (
 <div>
  <LoginForm/>
 </div>
)

const authOptions = {
 // client callback for invalid sessions
 callback: () => Router.push('/'),
 // the server takes care of the redirect, only pass a string
 // with the route
 serverRedirect: '/'
}
export default withAuth(authOptions)(Login)
