import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Login from '../components/Login'
import 'semantic-ui-css/semantic.min.css'

const Home = () => (
  <div>
    <Head title='Home' />
    <Nav />
    <Login />
  </div>
)

export default Home
