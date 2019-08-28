import Router from 'next/router'
import withAuth from 'next-authentication'
import 'semantic-ui-css/semantic.min.css'

const Login = () => (
 <div>
  {/* <Link href='/register'>
   <a className='btn btn-light'>Register</a>
  </Link> */}

  <h2>LOGIN</h2>
  <p>This is the login page</p>
 </div>
)

const authOptions = {
 // client callback for invalid sessions
 callback: () => Router.push('/register'),
 // the server takes care of the redirect, only pass a string
 // with the route
 serverRedirect: '/register'
}
export default withAuth(authOptions)(Login)

