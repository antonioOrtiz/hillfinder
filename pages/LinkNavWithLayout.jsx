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
import { bindActionCreators } from 'redux'
import { modalStateOn, modalStateOff } from '../store/index'

const getWidth = () => {
 const isSSR = typeof window === 'undefined'

 return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const logOutMenuItemHelper = (isMobile, isLoggedIn, history, modalActive, nav, NavLink, modalStateOn, modalStateOff, handleSidebarHide) => {
 function mobilelogOutMenuItemHelper(history, modalActive, nav, NavLink, modalStateOn, modalStateOff, handleSidebarHide) {

  if (nav.name === 'Log in') {
   console.log("mobile nav.name ", nav.name);

   return (
    <React.Fragment key={"modalForMobile"}>
     {modalActive && <Modal
      history={history} isLoggedIn={isLoggedIn} modalActive={modalActive} modalStateOn={modalStateOn} modalStateOff={modalStateOff} />}
     <Menu.Item
      key={"modalForMobile"}
      name='Log out'
      onClick={(event) => { modalStateOn(); handleSidebarHide(); }}>
      Log Out
     </Menu.Item>
    </React.Fragment >
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

 function desktoplogOutMenuItemHelper(history, modalActive, nav, NavLink, modalStateOn,  modalStateOff) {
  if (nav.name === 'Log in') {
   return (
    <React.Fragment key={"modalForDesktop"}>
     {modalActive && <Modal history={history} isLoggedIn={isLoggedIn} modalActive={modalActive} modalStateOn={modalStateOn} modalStateOff={modalStateOff} />}
     <Menu.Item
      key={"modalForDesktop"}
      name='Log out'
      onClick={(event) => { modalStateOn()}}>
      Log Out
     </Menu.Item>
    </React.Fragment>
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
  return mobilelogOutMenuItemHelper(history, modalActive, nav, NavLink, modalStateOn, modalStateOff, handleSidebarHide)
 }
 return desktoplogOutMenuItemHelper(history, modalActive, nav, NavLink, modalStateOn, modalStateOff)
}

class DesktopContainer extends Component {
 state = {}

 hideFixedMenu = () => this.setState({ fixed: false })
 showFixedMenu = () => this.setState({ fixed: true })

 render() {
  const { fixed } = this.state;
  const { history, data, children, isLoggedIn, modalActive, modalStateOn, modalStateOff } = this.props
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
           logOutMenuItemHelper(false, isLoggedIn, history, modalActive, nav, NavLink, modalStateOn, modalStateOff)
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

 render() {
  const { children, history, data, isLoggedIn, modalActive, modalStateOn, modalStateOff } = this.props
  const { sidebarOpened} = this.state

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
     {isLoggedIn ?
      data.filter(function (nav) {
       return (nav.name !== "Register")
      })
       .map(nav => {
        return (
         logOutMenuItemHelper(false, isLoggedIn, history, modalActive, nav, NavLink, modalStateOn, modalStateOff, this.handleSidebarHide)
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
           ? <Link to="/">Log out</Link>
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

const LinkNavWithLayout = ({ GenericHeadingComponent, children, history, data, modalActive, modalStateOn, modalStateOff, isLoggedIn }) => (
 <React.Fragment>
  <DesktopContainer GenericHeadingComponent={GenericHeadingComponent} history={history} data={data} modalActive={modalActive} modalStateOn={modalStateOn} modalStateOff={modalStateOff} isLoggedIn={isLoggedIn}>
   {children}
  </DesktopContainer>
  <MobileContainer GenericHeadingComponent={GenericHeadingComponent} history={history} data={data} modalActive={modalActive} modalStateOn={modalStateOn} modalStateOff={modalStateOff} isLoggedIn={isLoggedIn}>
   {children}
  </MobileContainer>
 </React.Fragment>
)

function mapStateToProps(state) {
 const { isLoggedIn, modalActive } = state
 return { isLoggedIn, modalActive }
}

const mapDispatchToProps = dispatch =>
 bindActionCreators({ modalStateOn, modalStateOff }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinkNavWithLayout))


