import React from 'react'
import Link from 'next/link'
import 'semantic-ui-css/semantic.min.css'

const Login = () => (
  <div>
    <Link href='/register'>
      <a className='btn btn-light'>Register</a>
    </Link>

    <h2>LOGIN</h2>
    <p>This is the login page</p>
  </div>
)

export default Login
