import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logInUser, logOutUser } from '../store/index'
import { bindActionCreators, compose } from 'redux'

import {
 Route,
 Switch,
 Redirect,
 withRouter
} from 'react-router-dom'

import LinkNavWithLayout from './LinkNavWithLayout'
import Index from './home'
import Profile from './profile'
import Dashboard from './dashboard'
import Login from './login'
import Register from './register'

class App extends Component {
 static getInitialProps({ store, isLoggedIn, logInUser, logOutUser }) {
  return { store, isLoggedIn, logInUser, logOutUser }
 }

 constructor(props) {
  super(props)

  this.state = {
   isLoggedIn: false
  }
 }

 render(){
  const { isLoggedIn } = this.props

 console.log("pages/index this.props ", this.props);
  let navBars = [
   { name: "Home", path: "/"},
   { name: "Profile", path: "/profile"},
   { name: "Dashboard", path: "/dashboard"},
   { name: "Log in", path: "/login"},
   { name: "Register", path: "/register"}
  ];

  const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route {...rest}
     render={props =>
      isLoggedIn === true
       ? <Component  {...props}/>
       : <Redirect to={{
          pathname: '/',
          state: {from: props.location}
      }}/>}
  />)


  return (
    <>
    <Switch>
     <Route
      path='/'
      exact
      render={(props) => <LinkNavWithLayout {...props} data={navBars}><Index /></LinkNavWithLayout>} />

     <PrivateRoute
      path='/profile'
      isLoggedIn={isLoggedIn}
      component={() => <LinkNavWithLayout data={navBars}><Profile /></LinkNavWithLayout>}
     />

     <PrivateRoute
      path='/dashboard'
      isLoggedIn={isLoggedIn}
      component={()=><LinkNavWithLayout data={navBars}><Dashboard /></LinkNavWithLayout>}/>

     <Route
      path='/login'
      render={(props) => <Login {...props}/>}
     />

     <Route
      path='/register'
      render={() => <Register />}
     />

     <Route component={({ location }) => <p>Sorry but the page <h1>{location.pathname.substring(1)} </h1> Page, Could Not be found</p>} />
    </Switch>
    </>
  )
 }
}

function mapStateToProps(state) {
 const { isLoggedIn, logInUser, logOutUser } = state
 return { isLoggedIn, logInUser, logOutUser }
}

const mapDispatchToProps = dispatch =>
 bindActionCreators({ logInUser, logOutUser }, dispatch)



export default compose(
 withRouter,
 connect(mapStateToProps, mapDispatchToProps)
)(withRouter(App));
