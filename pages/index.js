import React from 'react'
import { connect } from 'react-redux'
import Head from '../components/head'
import HomePage from '../components/Home/Home.jsx'
import 'semantic-ui-css/semantic.min.css'
import '../styles/styles.scss'
import { logInUser, logOutUser } from '../store'
import { bindActionCreators } from 'redux'

class Home extends React.Component {
 static getInitialProps({ isLoggedIn, logInUser, logOutUser}) {

  return { isLoggedIn, logInUser, logOutUser}
  }

    render() {
     const { isLoggedIn, logInUser, logOutUser } = this.props
     console.log("isLoggedIn", isLoggedIn );

     console.log(" logInUser", logInUser);

     console.log("logOutUser", logOutUser);

         return (
          <>
           <Head title = 'Home' />
           <HomePage isLoggedIn={isLoggedIn} logInUser={logInUser} logOutUser={logOutUser}/>
          </>
         )
    }
}

function mapStateToProps(state) {
 const { isLoggedIn, logInUser, logOutUser } = state
 return { isLoggedIn, logInUser, logOutUser  }
}
const mapDispatchToProps = dispatch =>
 bindActionCreators({ logInUser, logOutUser }, dispatch)

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(Home)

