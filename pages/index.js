import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Index from './home'
import Profile from './profile'
import Dashboard from './dashboard'
import Login from './login'
import Register from './register'
import LinkNavWithLayout from './LinkNavWithLayout'

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
      render={() => <LinkNavWithLayout data={navBars}><Index /></LinkNavWithLayout>}
     />
     <Route
      path="/profile/"
      render={() => <LinkNavWithLayout data={navBars}><Profile /></LinkNavWithLayout>}
     />
     <Route
      path="/dashboard/"
      render={() => <LinkNavWithLayout data={navBars}><Dashboard /></LinkNavWithLayout>}
     />
     <Route
      path="/login"
      render={() => <LinkNavWithLayout data={navBars}><Login /></LinkNavWithLayout>}
     />
     <Route
      path="/register"
      render={() => <LinkNavWithLayout data={navBars}><Register /></LinkNavWithLayout>}
     />
     {/* <Route component={()=> <h1>Not found</h1>} /> */}
    </Switch>
   </>
  )
 }
}

export default App;

