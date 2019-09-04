import React from 'react'
import Head from '../components/head'
import Register from '../components/Register/RegisterForm'
import '../components/Register/Register.css'
import 'semantic-ui-css/semantic.min.css'
import '../styles/styles.scss'

const Home = () => (
  <div>
    <Head title='Home' />
    <Register />
  </div>
)

export default Home
