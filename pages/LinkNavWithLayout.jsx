import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

import {
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
  Sidebar,
  Icon,
  Button
} from 'semantic-ui-react'

import { connect } from 'react-redux'

import { bindActionCreators, compose } from 'redux'
import { logInUser, logOutUser } from '../store/index'

const getWidth = () => {
 const isSSR = typeof window === 'undefined'

 return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const logOutMenuItem = (isMobile, isLoggedIn, nav, NavLink, logOutUser, handleSidebarHide) => {
 function mobilelogOutMenuItemHelper(nav, NavLink, logOutUser, handleSidebarHide) {
  if (nav.name === 'Log in') {
   console.log("mobile nav.name ", nav.name);

   return (
    <Menu.Item
     exact
     key={nav.path}
     as={NavLink}
     to={nav.path}
     name='Log out'
     onClick={() => {
      logOutUser(); handleSidebarHide()
     }}
    >
    </Menu.Item>
   )
  } else {
   return (
    <Menu.Item
     exact
     key={nav.name}
     as={NavLink}
     to={nav.path}
     name={nav.name}
     onClick={() => {
      handleSidebarHide()
     }}
    >
    </Menu.Item>
   )
  }

 }
 function desktoplogOutMenuItemHelper(nav, NavLink, logOutUser) {
  if (nav.name === 'Log in') {
 console.log("desktop nav.name ", nav.name);
   return (
    <Menu.Item
     exact
     key={nav.path}
     as={NavLink}
     to={nav.path}
     name='Log out'
     onClick={() => {
      console.log("nav ", nav); logOutUser();
     }}
    >
    </Menu.Item>
   )
  } else {
   return (
    <Menu.Item
     exact
     key={nav.name}
     as={NavLink}
     to={nav.path}
     name={nav.name}
    >
    </Menu.Item>
   )
  }

 }
 if (isMobile && isLoggedIn) {
  return mobilelogOutMenuItemHelper(nav, NavLink, logOutUser, handleSidebarHide)
 }
 return desktoplogOutMenuItemHelper(nav, NavLink, logOutUser)

}


class DesktopContainer extends Component {
 state = {}

 hideFixedMenu = () => this.setState({ fixed: false })
 showFixedMenu = () => this.setState({ fixed: true })

 logOutUser = () => {
  const { logOutUser } = this.props
  logOutUser()

 }

 render() {
  const { fixed } = this.state;
  const { data, children, isLoggedIn } = this.props

  return (
   <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
    <Visibility
     once={false}
     onBottomPassed={this.showFixedMenu}
     onBottomPassedReverse={this.hideFixedMenu}
    >
     <Segment
      inverted
      textAlign='center'
      style={{ minHeight: 'auto', padding: '0' }}
      vertical
     >
      <Menu
       fixed={fixed ? 'top' : null}
       inverted={!fixed}
       pointing={!fixed}
       secondary={!fixed}
       size='large'
      >

       {isLoggedIn ?
        data.filter(function (nav) {
         return (nav.name !== "Register")
        })
         .map(nav => {
          return (
           <Menu.Item
            exact
            key={nav.path}
            as={NavLink}
            to={nav.path}
            name={nav.name}
           >
           </Menu.Item>
          )
         })
        :
        data.filter(function (nav) {
         return (nav.name != "Profile") && (nav.name != "Dashboard")
        })
         .map(nav => {
          return (
           <Menu.Item
            exact
            key={nav.path}
            as={NavLink}
            to={nav.path}
            name={nav.name}
           >
           </Menu.Item>
          )
         })}

      </Menu>
     </Segment>
    </Visibility>
    {children}

   </Responsive>
  );
 }
}

class MobileContainer extends Component {
 state = {}

 handleSidebarHide = () => this.setState({ sidebarOpened: false })

 handleToggle = () => this.setState({ sidebarOpened: true })

 logOutUser = () => {
  const { logOutUser } = this.props
  logOutUser()
 }

 render() {
  const { children, data, isLoggedIn } = this.props
  const { sidebarOpened } = this.state

  return (
   <Responsive
    as={Sidebar.Pushable}
    getWidth={getWidth}
    maxWidth={Responsive.onlyMobile.maxWidth}
   >
    <Sidebar
     as={Menu}
     animation='push'
     inverted
     onHide={this.handleSidebarHide}
     vertical
     visible={sidebarOpened}
    >
     {isLoggedIn ?
      data.filter(function (nav) {
       return (nav.name !== "Register")
      })
       .map(nav => {
        return (
         <Menu.Item
          exact
          key={nav.path}
          as={NavLink}
          to={nav.path}
          name={nav.name}
         >
         </Menu.Item>
        )
       })
      :
      data.filter(function (nav) {
       return (nav.name != "Profile") && (nav.name != "Dashboard")
      })
       .map(nav => {
        return (
         <Menu.Item
          exact
          key={nav.name}
          as={NavLink}
          to={nav.path}
          name={nav.name}
          onClick={this.handleSidebarHide}
         >
         </Menu.Item>
        )
       })}

    </Sidebar>

    <Sidebar.Pusher dimmed={sidebarOpened}>
     <Segment
      inverted
      textAlign='center'
      style={{ minHeight: 'auto', padding: '1em 0em' }}
      vertical
     >
      <Container>
       <Menu inverted pointing secondary size='large'>
        <Menu.Item onClick={this.handleToggle}>
         <Icon name='sidebar' />
        </Menu.Item>
        <Menu.Item position='right'>

         <Button inverted>
          {isLoggedIn
           ? <Link to="/" onClick={this.logOutUser}>Log out</Link>
           : <Link to="/login">Log in</Link>
          }
          </Button>
         {!isLoggedIn ? <Button inverted style={{ marginLeft: '0.5em' }}>
          <Link to="/register"><span>Register!</span></Link>
         </Button>: null}
        </Menu.Item>
       </Menu>
      </Container>
     </Segment>

     {children}

    </Sidebar.Pusher>
   </Responsive>
  );
 }
}

const LinkNavWithLayout = ({ GenericHeadingComponent, children, data, isLoggedIn, logOutUser }) => (
 <React.Fragment>
  <DesktopContainer GenericHeadingComponent={GenericHeadingComponent} data={data} isLoggedIn={isLoggedIn} logOutUser={logOutUser}>
  {children}
  </DesktopContainer>
  <MobileContainer GenericHeadingComponent={GenericHeadingComponent} data={data} isLoggedIn={isLoggedIn} logOutUser={logOutUser}>
   {children}
  </MobileContainer>
 </React.Fragment>
)

function mapStateToProps(state) {
 const { isLoggedIn, logInUser, logOutUser } = state
 return { isLoggedIn, logInUser, logOutUser }
}
const mapDispatchToProps = dispatch =>
 bindActionCreators({ logInUser, logOutUser }, dispatch)

export default compose(
 withRouter,
 connect(mapStateToProps, mapDispatchToProps)
)(withRouter(LinkNavWithLayout));
