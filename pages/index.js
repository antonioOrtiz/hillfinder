import React from 'react'
import Head from '../components/head'
import HomeLayout from '../components/Home/Home'
import 'semantic-ui-css/semantic.min.css'
import '../styles/styles.scss'

const Home = () => (
  <div>
    <Head title='Home' />
    <HomeLayout/>
  </div>
)

export default Home
