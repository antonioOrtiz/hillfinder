import React, { Component, createRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Modal from '../components/Modal/MyModal.jsx';
import {
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
  Sidebar,
  Icon,
  Button
} from 'semantic-ui-react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalStateOn, modalStateOff } from '../store/reducers/ui/index';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const logOutMenuItemHelper = (
  isMobile,
  isLoggedIn,
  history,
  modalActive,
  nav,
  NavLink,
  modalStateOn,
  modalStateOff,
  handleSidebarHide
) => {
  function mobilelogOutMenuItemHelper(
    history,
    modalActive,
    nav,
    NavLink,
    modalStateOn,
    handleSidebarHide
  ) {
    if (nav.name === 'Log in') {
      return (
        <React.Fragment key={'modalForMobile'}>
          {modalActive && (
            <Modal
              isAlertModal={false}
              history={history}
              affirmativeUsed="Yes"
              message=" Are you sure you want to log out of your account??"
              modalActive={modalActive}
              isLoggedIn={isLoggedIn}
            />
          )}
          <Menu.Item
            key={'modalForMobile'}
            name="Log out"
            onClick={event => {
              modalStateOn();
              handleSidebarHide();
            }}
          >
            Log Out
          </Menu.Item>
        </React.Fragment>
      );
    } else {
      return (
        <Menu.Item
          exact
          key={nav.name}
          as={NavLink}
          to={nav.path}
          name={nav.name}
          onClick={() => {
            handleSidebarHide();
          }}
        />
      );
    }
  }

  function desktoplogOutMenuItemHelper(history, modalActive, nav, NavLink, modalStateOn) {
    if (nav.name === 'Log in') {
      return (
        <React.Fragment key={'modalForDesktop'}>
          {modalActive && (
            <Modal
              isAlertModal={false}
              history={history}
              affirmativeUsed="Yes"
              message="Are you sure you want to log out of your account??"
              modalActive={modalActive}
              isLoggedIn={isLoggedIn}
            />
          )}
          <Menu.Item
            key={'modalForDesktop'}
            name="Log out"
            onClick={event => {
              modalStateOn();
            }}
          >
            Log Out
          </Menu.Item>
        </React.Fragment>
      );
    } else {
      return (
        <Menu.Item exact key={nav.name} as={NavLink} to={nav.path} name={nav.name} />
      );
    }
  }

  if (isMobile && isLoggedIn) {
    return mobilelogOutMenuItemHelper(
      history,
      modalActive,
      nav,
      NavLink,
      modalStateOn,
      modalStateOff,
      handleSidebarHide
    );
  }
  return desktoplogOutMenuItemHelper(
    history,
    modalActive,
    nav,
    NavLink,
    modalStateOn,
    modalStateOff
  );
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { fixed } = this.state;
    const {
      history,
      data,
      isLoggedIn,
      modalActive,
      modalStateOn,
      modalStateOff,
      userAvatar
    } = this.props;
    console.log('1A: In DesktopContainer userAvatar ', userAvatar);
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 'auto', padding: '0' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              {/* {console.log("isLoggedIn in desktop homecomponent ", isLoggedIn)} */}
              {isLoggedIn
                ? data
                    .filter(function(nav) {
                      return nav.name !== 'Register';
                    })
                    .map(nav => {
                      return logOutMenuItemHelper(
                        false,
                        isLoggedIn,
                        history,
                        modalActive,
                        nav,
                        NavLink,
                        modalStateOn,
                        modalStateOff
                      );
                    })
                : data
                    .filter(function(nav) {
                      return nav.name != 'Profile' && nav.name != 'Dashboard';
                    })
                    .map(nav => {
                      return (
                        <Menu.Item
                          exact
                          key={nav.path}
                          as={NavLink}
                          to={nav.path}
                          name={nav.name}
                        />
                      );
                    })}
            </Menu>
          </Segment>
        </Visibility>
        {React.cloneElement(this.props.children, { userAvatar: userAvatar })}
      </Responsive>
    );
  }
}

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const {
      history,
      data,
      isLoggedIn,
      modalActive,
      modalStateOn,
      modalStateOff,
      userAvatar
    } = this.props;
    const { sidebarOpened } = this.state;

    console.log('1B: In MobileContainer userAvatar ', userAvatar);
    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          {isLoggedIn
            ? data
                .filter(function(nav) {
                  return nav.name !== 'Register';
                })
                .map(nav => {
                  return logOutMenuItemHelper(
                    false,
                    isLoggedIn,
                    history,
                    modalActive,
                    nav,
                    NavLink,
                    modalStateOn,
                    modalStateOff,
                    this.handleSidebarHide
                  );
                })
            : data
                .filter(function(nav) {
                  return nav.name != 'Profile' && nav.name != 'Dashboard';
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
                    />
                  );
                })}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 'auto', padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button inverted>
                    {isLoggedIn ? (
                      <Link to="/" onClick={modalStateOn}>
                        Log out
                      </Link>
                    ) : (
                      <Link to="/login">Log in</Link>
                    )}
                  </Button>
                  {!isLoggedIn ? (
                    <Button inverted style={{ marginLeft: '0.5em' }}>
                      <Link to="/register">
                        <span>Register!</span>
                      </Link>
                    </Button>
                  ) : null}
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {React.cloneElement(this.props.children, { userAvatar: userAvatar })}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

const LinkNavWithLayout = ({
  children,
  history,
  data,
  modalActive,
  modalStateOn,
  modalStateOff,
  isLoggedIn,
  userAvatar
}) => (
  <React.Fragment>
    <DesktopContainer
      history={history}
      data={data}
      modalActive={modalActive}
      modalStateOn={modalStateOn}
      modalStateOff={modalStateOff}
      isLoggedIn={isLoggedIn}
      userAvatar={userAvatar}
    >
      {children}
    </DesktopContainer>
    <MobileContainer
      history={history}
      data={data}
      modalActive={modalActive}
      modalStateOn={modalStateOn}
      modalStateOff={modalStateOff}
      isLoggedIn={isLoggedIn}
      userAvatar={userAvatar}
    >
      {children}
    </MobileContainer>
  </React.Fragment>
);

function mapStateToProps(state) {
  const { ui, users } = state;
  const { isLoggedIn, userAvatar } = users;
  const { modalActive } = ui;

  return { isLoggedIn, modalActive, userAvatar };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ modalStateOn, modalStateOff }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkNavWithLayout);
