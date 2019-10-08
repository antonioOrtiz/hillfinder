import React from 'react'
import Head from '../components/head'
import HomeLayout from '../components/Home/Home.jsx'
import 'semantic-ui-css/semantic.min.css'
import '../styles/styles.scss'
import { connect } from 'react-redux'

// import {bindActionCreators} from 'redux'
// import withRedux from 'next-redux-wrapper'
import { logInUser } from '../store'


class Home extends React.Component {
    static async getInitialProps({ isLoggedIn }) {
        return { isLoggedIn }
    }



    render() {
        const { isLoggedIn } = this.props
        return (
        <div>
        {console.log("isLoggedIn ", isLoggedIn)}
           <Head title = 'Home' />
            <HomeLayout isLoggedIn = { isLoggedIn }/>
        </div>
        )
    }
}




export default connect(state => state)(Home);
