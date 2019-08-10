import React from 'react'
import Link from 'next/link'
import 'semantic-ui-css/semantic.min.css'
import RegisterForm from '../components/RegisterForm'
import '../components/Register.css'

const Register = () => (
  <div>
    {/* <Link href='/login'>
      <a className='btn btn-light'>Login</a>
    </Link> */}

    <RegisterForm />

  </div>
)

export default Register
