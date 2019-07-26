import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Register from '../components/Register'
import '../components/Register.css'
import 'semantic-ui-css/semantic.min.css'

const Home = () => (
  <div>
    <Head title='Home' />
    <Link href='/about'>
      <a className='btn btn-light'>About us</a>
    </Link>
    <Register />
  </div>
)

export default Home
