import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

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
import { logInUser, logOutUser } from '../store/index'

const getWidth = () => {
 const isSSR = typeof window === 'undefined'

 return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
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
  const { data, children } = this.props


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
      style={{ minHeight: 'auto', padding: '1em 0em' }}
      vertical
     >
      <Menu
       fixed={fixed ? 'top' : null}
       inverted={!fixed}
       pointing={!fixed}
       secondary={!fixed}
       size='large'
      >

       {data.map(nav => {
        return (<Menu.Item
         exact
         key={nav.path}
         as={NavLink}
         to={nav.path}
         name={nav.name}
        >
        </Menu.Item>)
       })}

      </Menu>
     </Segment>
    </Visibility>
    {children}

   </Responsive>
  )
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
  const { children, data } = this.props
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
     {data.map(nav => {
     return (
      <Menu.Item
       key={nav.path}
       as={NavLink}
       to={nav.path}
       name={nav.name}
       onClick={() => this.handleSidebarHide()}
      >
      </Menu.Item>
     )
     })}
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
        <Menu.Item position='right'>
         <Button as='a' inverted>
          Log in
          </Button>
         <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
          Sign Up
         </Button>
        </Menu.Item>
       </Menu>
      </Container>
     </Segment>

     {children}
    </Sidebar.Pusher>
   </Responsive>
  )
 }
}

const LinkNav = ({ GenericHeadingComponent, children,  data, isLoggedIn, logOutUser }) => (
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

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(withRouter(LinkNav))
