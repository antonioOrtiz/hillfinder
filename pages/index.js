import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Index from './home'
import Profile from './profile'
import Dashboard from './dashboard'
import Login from './login'
import Register from './register'
import LinkNav from './LinkNav'

class App extends Component {
  constructor() {
  super()
 }


 render(){
  let navBars = [
   { name: "Home", path: "/"},
   { name: "Profile", path: "/profile"},
   { name: "Dashboard", path: "/dashboard"},
   { name: "Login", path: "/login"},
   { name: "Register", path: "/register"}
  ];
  return (
   <>
    <Switch>
     <Route
      path="/"
      exact
      render={() => <LinkNav data={navBars}><Index /></LinkNav>}
     />
     <Route
      path="/profile/"
      render={() => <LinkNav data={navBars}><Profile /></LinkNav>}
     />
     <Route
      path="/dashboard/"
      render={() => <LinkNav data={navBars}><Dashboard /></LinkNav>}
     />
     <Route
      path="/login"
      render={() => <LinkNav data={navBars}><Login /></LinkNav>}
     />
     <Route
      path="/register"
      render={() => <LinkNav data={navBars}><Register /></LinkNav>}
     />
     {/* <Redirect from="/people/" to="/users/" /> */}
     {/* <Route component={NotFound} /> */}
    </Switch>
   </>
  )
 }
}

export default App;

