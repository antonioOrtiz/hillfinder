import React from 'react'
import {
 withRouter
} from 'react-router-dom'
import Head from '../components/head'
import HomePage from '../components/Home/Home.jsx'
import 'semantic-ui-css/semantic.min.css'
import '../styles/styles.scss'

class Home extends React.Component {
    render() {
         return (
          <>
           <Head title = 'Home' />
           <HomePage/>
          </>
         )
    }
}

export default withRouter(Home)

