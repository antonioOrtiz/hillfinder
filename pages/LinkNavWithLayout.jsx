import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import Modal from '../components/Modal/MyModal.jsx'
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


const getWidth = () => {
 const isSSR = typeof window === 'undefined'

 return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const logOutMenuItemHelper = (isMobile, isLoggedIn, history, isModalActive, nav, NavLink,  handleClick, handleSidebarHide) => {
 function mobilelogOutMenuItemHelper(history, isModalActive, nav, NavLink, handleClick, handleSidebarHide) {
  if (nav.name === 'Log in') {
   console.log("mobile nav.name ", nav.name);

   return (
    <Menu.Item
     key="/logout"
     name='Log out'
     onClick={(event) => { handleSidebarHide(); handleClick();}}>
     {isModalActive ? <Modal history={history} isLoggedIn={isLoggedIn} isModalActive={isModalActive} handleClick={handleClick} /> : 'Log Out'}
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

 function desktoplogOutMenuItemHelper(history, isModalActive, nav, NavLink, handleClick) {
  if (nav.name === 'Log in') {
 // console.log("desktop nav.name ", nav.name);

   return (
    <Menu.Item
     key="/logout"
     name='Log out'
     onClick={(event) => { handleClick(); }}>
     {(isModalActive) ? <Modal history={history} isLoggedIn={isLoggedIn} isModalActive={isModalActive} handleClick={handleClick} /> : 'Log Out'}
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
  return mobilelogOutMenuItemHelper(history, isModalActive, nav, NavLink,  handleClick, handleSidebarHide)
 }
 return desktoplogOutMenuItemHelper(history, isModalActive, nav, NavLink,  handleClick)
}

class DesktopContainer extends Component {
 state = { isModalActive: false }

 hideFixedMenu = () => this.setState({ fixed: false })

 showFixedMenu = () => this.setState({ fixed: true })

 handleClick = ()=> {
  this.setState(state => ({
   isModalActive: !state.isModalActive
  }));
 }


 render() {
  const { fixed, isModalActive } = this.state;
  const { history, data, children, isLoggedIn } = this.props
  console.log("this.props desktop in LinkNAV ", this.props);

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
       {/* {console.log("isLoggedIn in desktop homecomponent ", isLoggedIn)} */}
       {isLoggedIn ?
        data.filter(function (nav) {
         return (nav.name !== "Register")
        })
         .map(nav => {
          return (
           logOutMenuItemHelper(false, isLoggedIn, history, isModalActive, nav, NavLink,  this.handleClick)
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
 state = { isModalActive: false }

 handleSidebarHide = () => this.setState({ sidebarOpened: false })

 handleClick = () => {
  this.setState(state => ({
   isModalActive: !state.isModalActive
  }));
 }

 handleToggle = () => this.setState({ sidebarOpened: true })

 logOutUser = () => {
  const { logOutUser } = this.props
  logOutUser()
 }

 render() {
  const { children, history, data, isLoggedIn } = this.props
  const { sidebarOpened, isModalActive } = this.state

 console.log("this.props inMobile ", this.props);
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
     {/* {console.log("isLoggedIn in desktop homecomponent ", isLoggedIn)} */}
     {isLoggedIn ?
      data.filter(function (nav) {
       return (nav.name !== "Register")
      })
       .map(nav => {
        return (
         logOutMenuItemHelper(false, isLoggedIn, history, isModalActive, nav, NavLink, this.logOutUser, this.handleClick, this.handleSidebarHide)
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

const LinkNavWithLayout = ({ GenericHeadingComponent, children, history,  data, isLoggedIn }) => (
 <React.Fragment>
  <DesktopContainer GenericHeadingComponent={GenericHeadingComponent} history={history} data={data} isLoggedIn={isLoggedIn}>
   {children}
  </DesktopContainer>
  <MobileContainer GenericHeadingComponent={GenericHeadingComponent} history={history}  data={data} isLoggedIn={isLoggedIn}>
   {children}
  </MobileContainer>
 </React.Fragment>
)

function mapStateToProps(state) {
 const { isLoggedIn } = state
 return { isLoggedIn }
}


export default withRouter(connect(mapStateToProps)(LinkNavWithLayout))


