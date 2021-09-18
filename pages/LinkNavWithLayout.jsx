import React, { useCallback, useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Modal from '../components/Modal/MyModal.jsx';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive'
import Sidebar from 'semantic-ui-react/dist/commonjs/modules/Sidebar'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/'
import Visibility from 'semantic-ui-react/dist/commonjs/behaviors/Visibility'

import { connect } from 'react-redux';
import { modalStateOn, modalStateOff } from '../store/reducers/ui/index';

import UIContext from '../components/Context/UIContext.jsx';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

function logOutMenuItemHelper(
  isMobile,
  isLoggedIn,
  history,
  modalActive,
  nav,
  NavLink,
  modalStateOn,
  modalStateOff,
  handleSidebarHide
) {
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
              message=" Are you sure you want to log out of your account?"
              modalActive={modalActive}
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
          onClick={handleSidebarHide}
        />
      );
    }
  }

  function desktoplogOutMenuItemHelper(
    history,
    modalActive,
    nav,
    NavLink,
    modalStateOn,
    modalStateOff
  ) {
    if (nav.name === 'Log in') {
      return (
        <React.Fragment key={'modalForDesktop'}>
          {modalActive && (
            <Modal
              isAlertModal={false}
              history={history}
              affirmativeUsed="Yes"
              message="Are you sure you want to log out of your account?"
              modalActive={modalActive}
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
}

function LayoutContainer({
  children,
  history,
  data,
  isLoggedIn,
  modalActive,
  modalStateOn,
  modalStateOff,
  userData
}) {
  var useToggle = initialState => {
    const [isToggled, setIsToggled] = React.useState(initialState);
    const toggle = useCallback(() => setIsToggled(state => !state), [setIsToggled]);

    return [isToggled, toggle];
  };

  var { isMobile, isDesktop, setIsMobile, setIsDesktop } = useContext(UIContext);

  var [data, setData] = useState(data);

  var [fixed, setFixed] = useState(null);
  var [isToggled, toggle] = useToggle(false);
  var [Content, setContent] = useState(null);

  function handleSidebarHide() {
    if (isToggled == true) return toggle();
  }
  // var handleToggle = () => setSideBarOpened(true);

  var hideFixedMenu = () => setFixed(false);
  var showFixedMenu = () => setFixed(true);

  useEffect(() => {
    let mounted = true;

    window.addEventListener('load', event => {
      if (window.innerWidth < 768) {
        if (mounted) {
          setIsMobile(true);

          setIsDesktop(false);
        }
      } else {
        if (mounted) {
          setIsDesktop(true);
          setIsMobile(false);
        }
      }
    });

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    window.addEventListener(
      'resize',
      function (e) {
        if (e.target.innerWidth < 768) {
          if (mounted) {
            setIsDesktop(false);
            setIsMobile(true);
          }
        }
        if (e.target.innerWidth > 767) {
          if (mounted) {
            setIsMobile(false);
            setIsDesktop(true);
          }
        }
      },
      false
    );
    return () => (mounted = false);
  }, [isMobile, isDesktop]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setContent(Content => {
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
              onHide={() => handleSidebarHide()}
              vertical
              visible={isToggled}
            >
              {isLoggedIn
                ? data
                  .filter(function (nav) {
                    return nav.name !== 'Register';
                  })
                  .map(nav => {
                    return logOutMenuItemHelper(
                      true,
                      isLoggedIn,
                      history,
                      modalActive,
                      nav,
                      NavLink,
                      modalStateOn,
                      modalStateOff,
                      handleSidebarHide
                    );
                  })
                : data
                  .filter(function (nav) {
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
                        onClick={handleSidebarHide}
                      />
                    );
                  })}
            </Sidebar>

            <Sidebar.Pusher dimmed={isToggled}>
              <Segment
                inverted
                textalign="center"
                style={{ minHeight: 'auto', padding: '1em 0em' }}
              >
                <Container>
                  <Menu inverted pointing secondary size="large">
                    <Menu.Item onClick={toggle}>
                      <Icon name="sidebar" />
                    </Menu.Item>
                    <Menu.Item position="right">
                      <Button inverted>
                        {modalActive && (
                          <Modal
                            isAlertModal={false}
                            history={history}
                            affirmativeUsed="Yes"
                            message="Are you sure you want to log out of your account?"
                            modalActive={modalActive}
                          />
                        )}
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

              {React.cloneElement(children)}
            </Sidebar.Pusher>
          </Responsive>
        );
      });
    } else {
      setContent(Content => (
        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={showFixedMenu}
            onBottomPassedReverse={hideFixedMenu}
          >
            <Segment
              inverted
              textalign="center"
              style={{ minHeight: 'auto', padding: '0' }}

            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size="large"
              >
                {isLoggedIn
                  ? data
                    .filter(function (nav) {
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
                    .filter(function (nav) {
                      return nav.name != 'Profile' && nav.name != 'Dashboard';
                    })
                    .map(nav => {
                      return (
                        <Menu.Item
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
          {React.cloneElement(children)}
        </Responsive>
      ));
    }
  }, [fixed, children, isMobile, isDesktop, isToggled, modalActive]);

  return isMobile ? Content : Content;
}

const LinkNavWithLayout = ({
  children,
  history,
  data,
  modalActive,
  modalStateOn,
  modalStateOff,
  isLoggedIn
}) => {
  return (
    <React.Fragment>
      <LayoutContainer
        history={history}
        data={data}
        modalActive={modalActive}
        modalStateOn={modalStateOn}
        modalStateOff={modalStateOff}
        isLoggedIn={isLoggedIn}
      >
        {children}
      </LayoutContainer>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  const { ui, users } = state;
  const { isLoggedIn } = users;
  const { modalActive } = ui;

  return { isLoggedIn, modalActive };
}

const mapDispatchToProps = dispatch => ({
  modalStateOn: () => dispatch(modalStateOn()),
  modalStateOff: () => dispatch(modalStateOff())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkNavWithLayout);
