import PropTypes from 'prop-types'
import Link from 'next/link';


import React, { useState, Component } from 'react'
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

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
 const isSSR = typeof window === 'undefined'

 return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
 <Container text>
  <Header
   as='h1'
   content='Hillfinder'
   inverted
   style={{
    fontSize: mobile ? '2em' : '4em',
    fontWeight: 'normal',
    marginBottom: 0,
    marginTop: mobile ? '1.5em' : '3em',
   }}
  />
  <Header
   as='h2'
   content='An app on the decline...Er about!'
   inverted
   style={{
    fontSize: mobile ? '1.5em' : '1.7em',
    fontWeight: 'normal',
    marginTop: mobile ? '0.5em' : '1.5em',
   }}
  />
  <Button primary size='huge'>
   Get Started
      <Icon name='right arrow' />
  </Button>
 </Container>
)

HomepageHeading.propTypes = {
 mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
 state = {}

 hideFixedMenu = () => this.setState({ fixed: false })
 showFixedMenu = () => this.setState({ fixed: true })

 render() {
  const { children, isLoggedIn } = this.props
  const { fixed } = this.state

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
        <Menu.Item  active>
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
         {isLoggedIn  ?
         <Button inverted={!fixed}>
         <Link href="/login">
           <a>Login</a>
          </Link>
         </Button> : null}
         <Button inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
          <Link href="/register">
           <a>Register</a>
          </Link>
         </Button>
        </Menu.Item>
       </Container>
      </Menu>
      <HomepageHeading />
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
 state = {}

 handleSidebarHide = () => this.setState({ sidebarOpened: false })

 handleToggle = () => this.setState({ sidebarOpened: true })

 render() {
  const { children, isLoggedIn } = this.props
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
     <Menu.Item active>
      <Link href="/">
       <a>Home</a>
      </Link>
     </Menu.Item>

     {isLoggedIn ? <Menu.Item as='a'>Profile</Menu.Item> : null}
     {isLoggedIn ? <Menu.Item as='a'>Dashboard</Menu.Item> : null}
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
         {isLoggedIn ? <Button as='a' inverted>
          Log in!
         </Button> : null}
         <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
          Register!
         </Button>
        </Menu.Item>
       </Menu>
      </Container>
      <HomepageHeading mobile />
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

const ResponsiveContainer = ({ children }) => (
 <div>
  <DesktopContainer>{children}</DesktopContainer>
  <MobileContainer>{children}</MobileContainer>
 </div>
)

ResponsiveContainer.propTypes = {
 children: PropTypes.node,
}

const HomepageLayout = ({custom}) => {
 // var [isLoggedIn, setLogInState] = useState(false)
 return (
  <ResponsiveContainer>
   <Segment style={{ padding: '8em 0em' }} vertical>
    <Container text>
     <Header as='h3' style={{ fontSize: '2em' }}>
      Breaking The Grid, Grabs Your Attention
         </Header>
     <p style={{ fontSize: '1.33em' }}>
      Instead of focusing on content creation and hard work, we have learned how to master the
      art of doing nothing by providing massive amounts of whitespace and generic content that
      can seem massive, monolithic and worth your attention.
         </p>
     <Button as='a' size='large'>
      Read More
         </Button>

     <Divider
      as='h4'
      className='header'
      horizontal
      style={{ margin: '3em 0em', textTransform: 'uppercase' }}
     >
      <a href='#'>Case Studies</a>
     </Divider>


    </Container>
   </Segment>

   <Segment inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
     <Grid divided inverted stackable>
      <Grid.Row>
       <Grid.Column width={3}>
        <Header inverted as='h4' content='About' />
        <List link inverted>
         <List.Item as='a'>Sitemap</List.Item>
         <List.Item as='a'>Contact Us</List.Item>
         <List.Item as='a'>Religious Ceremonies</List.Item>
         <List.Item as='a'>Gazebo Plans</List.Item>
        </List>
       </Grid.Column>
       <Grid.Column width={3}>
        <Header inverted as='h4' content='Services' />
        <List link inverted>
         <List.Item as='a'>Banana Pre-Order</List.Item>
         <List.Item as='a'>DNA FAQ</List.Item>
         <List.Item as='a'>How To Access</List.Item>
         <List.Item as='a'>Favorite X-Men</List.Item>
        </List>
       </Grid.Column>
       <Grid.Column width={7}>
        <Header as='h4' inverted>
         Footer Header
        </Header>
        <p>
         Extra space for a call to action inside the footer that could help re-engage users.
        </p>
       </Grid.Column>
      </Grid.Row>
     </Grid>
    </Container>
   </Segment>
  </ResponsiveContainer>
 )
}

export default HomepageLayout
