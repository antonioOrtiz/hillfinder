import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Index from './home'
import Profile from './profile'
import Dashboard from './dashboard'
import Login from './login'
import Register from './register'
import LinkNavWithLayout from './LinkNavWithLayout'

class App extends Component {
  constructor(props) {
  super(props)
 }

 render(){
  const { isLoggedIn } = this.props

 console.log("this.props ", this.props);
  let navBars = [
   { name: "Home", path: "/"},
   { name: "Profile", path: "/profile"},
   { name: "Dashboard", path: "/dashboard"},
   { name: "Log in", path: "/login"},
   { name: "Register", path: "/register"}
  ];

  const PrivateRoute = ({ component: Component, children, ...rest }) => (
   <Route {...rest} render={props => {
    console.log("In PrivateRoute isLoggedIn ", isLoggedIn);
    return isLoggedIn === true
     ? <Component {...props} >{children}</Component>
     : <Redirect to='/' />
   }} />
  )

  return (
    <>
    <Switch>
     <Route
      path='/'
      exact
      render={(props) => <LinkNavWithLayout {...props} data={navBars}><Index {...props} /></LinkNavWithLayout>} />

     <Route
      path='/login'
      render={(props) => <Login {...props} />}
     />

     <Route
      path='/register'
      render={(props) => <Register {...props} />}
     />

     <PrivateRoute
      path='/profile'
      isLoggedIn={isLoggedIn}
      component={( ) => ( // not sure where you're planning on passing `children` from `PrivateRoute`
       <LinkNavWithLayout data={navBars}><Profile /></LinkNavWithLayout>
      )}
     />

     <PrivateRoute
      path='/dashboard'
      isLoggedIn={isLoggedIn}
      component={() => ( // not sure where you're planning on passing `children` from `PrivateRoute`
       <LinkNavWithLayout data={navBars}><Dashboard /></LinkNavWithLayout>
      )}
   />
     {/* <Route component={()=> <h1>Not found</h1>} /> */}
    </Switch>
    </>
  )
 }
}

function mapStateToProps(state) {
 const { isLoggedIn } = state
 return { isLoggedIn }
}

export default connect(mapStateToProps)(withRouter(App));
