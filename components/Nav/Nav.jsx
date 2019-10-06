import Link from 'next/link';

import React, { Component } from 'react'
import {
 Button,
 Container,
 Divider,
 Grid,
 Header,
 Icon,
 Image,
 List,
 Menu,
 Responsive,
 Segment,
 Sidebar,
 Visibility,
} from 'semantic-ui-react'


class Nav extends Component {

 render() {
  const { fixed, isLoggedIn } = this.props;

  console.log("fixed ", fixed)

  return (
       <Container>
        <Menu.Item active>
         <Link href="/">
          <a>Home</a>
         </Link>
        </Menu.Item>
        {isLoggedIn ?
         <Menu.Item>
          <Link href="/profile">
           <a>Profile</a>
          </Link>
         </Menu.Item>
         : null}
        {isLoggedIn ?
         <Menu.Item>
          <Link href="/dashboard">
           <a>Dashboard</a>
          </Link>
         </Menu.Item>
         : null}
        <Menu.Item position='right'>
         <Button inverted={!fixed}>
          <Link href="/login">
           <a>Login</a>
          </Link>
         </Button>
         <Button inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
          <Link href="/register">
           <a>Register</a>
          </Link>
         </Button>
        </Menu.Item>
       </Container>
  )
 }
}
export default Nav
