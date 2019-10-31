import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
 Button,
 Container,
 Icon,
 Menu,
 Responsive,
 Segment,
 Sidebar,
 Visibility,
} from 'semantic-ui-react'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { logInUser, logOutUser } from '../../store'

import Link from 'next/link';
import Router from 'next/router'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.

var comparator;
const GenericIsUserLoggedInLink = React.memo(({ isHomeButton, isLoggedIn, logOutUser, route, anchorText, mobile, name, active, handleItemClick }) => {

 comparator = (prevProps, nextProps) => {

  if (prevProps.isHomeButton !== nextProps.setProps.isHomeButton) {
   return true;
  }
  if (prevProps.isLoggedIn !== nextProps.setProps.isLoggedIn) {
   return true;
  }
  if (prevProps.mobile !== nextProps.setProps.mobile) {
   return true;
  }
  if (prevProps.name !== nextProps.setProps.name) {
   return true;
  }
  if (prevProps.active !== nextProps.setProps.active) {
   return true;
  }
  return false;
 }

 function currentNav(route, name, active, handleItemClick) {

  // console.log("handleItemClick ", handleItemClick);
  // console.log("active ", active);
  // console.log("name ", name);
  const handler = (route) => {
   Router.push({
    pathname: route
   })
  }


  return (
    <Menu.Item
     to={route}
     key={name}
     name={name}
     active={active == name}
     onClick={(e) => {
      Router.onRouteChangeStart=  handler(route)
       handleItemClick(e, { name });

     }
    }
    >
    </Menu.Item>
  );
 }

 if (isHomeButton) {
  return currentNav(route, name, active, handleItemClick)
 }
 if (isLoggedIn) {
  if (anchorText === undefined) {
   return <Link href="/"><a onClick={() => logOutUser()}>Log out!</a></Link>
  }
  else if (mobile) {
   return currentNav(route, name, active, handleItemClick)
  }
  else if (!(mobile)) {
   return currentNav(route, name, active, handleItemClick)
  }

  else if (anchorText) {
   return <Link href={route}><a>{anchorText}</a></Link>
  }
 } else {
  if (route === "/login") {
   return <Link href="/login"><a>Log in!</a></Link>
  }
  return null
 }
}, comparator);



class DesktopContainer extends Component {
 state = {activeItem : 'home'}

 hideFixedMenu = () => this.setState({ fixed: false })
 showFixedMenu = () => this.setState({ fixed: true })
 handleItemClick = (e, { name }) => this.setState({ activeItem: name })


 logOutUser = () => {
  const { logOutUser } = this.props
  logOutUser()
 }

 render() {
  const { GenericHeadingComponent, children, getWidth, isLoggedIn, logOutUser } = this.props


  const { fixed, activeItem } = this.state

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
      style={{ minHeight: 700, padding: '1em 0em' }}
      vertical
     >
      <Menu
       fixed={fixed ? 'top' : null}
       inverted={!fixed}
       pointing={!fixed}
       secondary={!fixed}
       size='large'
      >
       <Container>

        <GenericIsUserLoggedInLink
         isHomeButton={true}
         route="/"
         name='home'
         active={activeItem}
         handleItemClick={this.handleItemClick}
         mobile={false}
        />

        <GenericIsUserLoggedInLink
         isLoggedIn={isLoggedIn}
         route="/profile"
         anchorText="Profile"
         name='profile'
         active={activeItem}
         handleItemClick={this.handleItemClick}
         mobile={false}
        />

        <GenericIsUserLoggedInLink
         isLoggedIn={isLoggedIn}
         route="/dashboard"
         anchorText="Dashboard"
         name='dashboard'
         active={activeItem}
         handleItemClick={this.handleItemClick}
         mobile={false}
        />


        <Menu.Item position='right'>
         <Button inverted={!fixed}>
          <GenericIsUserLoggedInLink
           route="/login"
           isLoggedIn={isLoggedIn}
           logOutUser={logOutUser}
           />
         </Button>
         <Button inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
          <Link href="/register">
           <a>Register</a>
          </Link>
         </Button>
        </Menu.Item>
       </Container>
      </Menu>
      <GenericHeadingComponent />
     </Segment>
    </Visibility>

    {children}
   </Responsive>
  )
 }
}

DesktopContainer.propTypes = {
 children: PropTypes.node,
}

class MobileContainer extends Component {
 state = { activeItem: 'home' }

 handleSidebarHide = () => this.setState({ sidebarOpened: false })

 handleToggle = () => this.setState({ sidebarOpened: true })
 handleItemClick = (e, { name }) => this.setState({ activeItem: name })

 logOutUser = () => {
  const { logOutUser } = this.props
  logOutUser()
 }

 render() {
  const { GenericHeadingComponent, children, getWidth, isLoggedIn, logOutUser, mobile } = this.props
  const { sidebarOpened, activeItem } = this.state

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

     <GenericIsUserLoggedInLink
      isHomeButton={true}
      route="/"
      name='home'
      active={activeItem}
      handleItemClick={this.handleItemClick}
      mobile={true}
     />


     <GenericIsUserLoggedInLink
      isLoggedIn={isLoggedIn}
      route="/profile"
      anchorText="Profile"
      name='profile'
      active={activeItem}
      handleItemClick={this.handleItemClick}
      mobile={true}
     />

     <GenericIsUserLoggedInLink
      isLoggedIn={isLoggedIn}
      route="/dashboard"
      anchorText="Dashboard"
      name='dashboard'
      active={activeItem}
      handleItemClick={this.handleItemClick}
      mobile={true}
     />

     <Menu.Item>
      <GenericIsUserLoggedInLink
       route="/login"
       isLoggedIn={isLoggedIn}
       logOutUser={logOutUser}
      />
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
        <Menu.Item onClick={this.handleToggle}>
         <Icon name='sidebar' />
        </Menu.Item>
       </Menu>
      </Container>
      <GenericHeadingComponent mobile={mobile} />
     </Segment>
     {children}
    </Sidebar.Pusher>
   </Responsive>
  )
 }
}

MobileContainer.propTypes = {
 children: PropTypes.node,
}

const LayoutComponent = ({ GenericHeadingComponent, children, getWidth, isLoggedIn, logOutUser }) => (
 <React.Fragment>
  <DesktopContainer GenericHeadingComponent={GenericHeadingComponent} isLoggedIn={isLoggedIn} logOutUser={logOutUser}>
   {children}
  </DesktopContainer>
  <MobileContainer GenericHeadingComponent={GenericHeadingComponent} getWidth={getWidth} isLoggedIn={isLoggedIn} logOutUser={logOutUser}>
   {children}
  </MobileContainer>
 </React.Fragment>
)

LayoutComponent.propTypes = {
 children: PropTypes.node,
}

function mapStateToProps(state) {
 const { isLoggedIn, logInUser, logOutUser } = state
 return { isLoggedIn, logInUser, logOutUser }
}
const mapDispatchToProps = dispatch =>
 bindActionCreators({ logInUser, logOutUser }, dispatch)

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(LayoutComponent)

