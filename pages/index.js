import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Register from '../components/RegisterForm'
import '../components/Register.css'
import 'semantic-ui-css/semantic.min.css'

const Home = () => (
  <div>
    <Head title='Home' />
    <Register />
  </div>
)

export default Home
