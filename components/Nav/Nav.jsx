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
} from 'semantic-ui-react';

import { HomepageHeading } from '../Home/Home-redux.jsx'

export default function Nav({ children, mobile, fixed, isLoggedIn, isMobile, handleSidebarHide, handleToggle, sidebarOpened  }) {
  console.log("fixed ", fixed);
  console.log("isLoggedIn ", isLoggedIn)

  return (
     <React.Fragment>
     {isMobile ?
      <React.Fragment>
       <Sidebar
        as={Menu}
        animation='push'
        inverted
        onHide={()=>handleSidebarHide}
        vertical
        visible={sidebarOpened}
       >
       <Menu.Item active>
        <Link href="/">
         <a>Home</a>
        </Link>
       </Menu.Item>
       {isLoggedIn ? <Menu.Item as='a'> <Link href="/profile">
           <a>Profile</a>
          </Link></Menu.Item> : null}
       {isLoggedIn ? <Menu.Item as='a'> <Link href="/dashboard">
           <a>Dashboard</a>
          </Link></Menu.Item> : null}
       <Menu.Item>
        <Link href="/login">
         <a>Log in!</a>
        </Link>
        </Menu.Item>
         <Menu.Item >
          <Link href="/register">
           <a>Register</a>
          </Link>
         </Menu.Item>
       </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
       <Segment
        inverted
        textAlign='center'
        style={{ minHeight: 350, padding: '1em 0em' }}
        vertical
       >
        <Container>
         <Menu inverted pointing secondary size='large'>
          <Menu.Item onClick={()=>handleToggle}>
           <Icon name='sidebar' />
          </Menu.Item>

         </Menu>
        </Container>
        <HomepageHeading mobile />
       </Segment>

       {children}
      </Sidebar.Pusher>
      </React.Fragment>
      : <Container>
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
       </Container> }
     </React.Fragment>
  )
}
