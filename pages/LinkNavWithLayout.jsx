import React, { Component, useState, useEffect, useContext } from 'react';
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
import { modalStateOn, modalStateOff } from '../store/reducers/ui/index';

import UserContext from '../components/UserContext/UserContext.jsx';

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
          onClick={() => {
            handleSidebarHide();
          }}
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
              window.localStorage.clear();
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
};


function LayoutContainer({
  children,
  history,
  data,
  isLoggedIn,
  modalActive,
  modalStateOn,
  modalStateOff,
  userData}){

  var [fixed, setFixed] = useState(null);
  var [sidebarOpened, setSideBarOpened] = useState(null);
  var [Content, setContent] = useState(null)


  var [isMobile, setIsMobile] = useState(false);
  var [isDesktop, setIsDesktop] = useState(false);

  var handleSidebarHide = () => setSideBarOpened(() => false)
  var handleToggle = () => setSideBarOpened(true);


  var hideFixedMenu = () => setFixed(false);
  var showFixedMenu = () => setFixed(true);

useEffect(() => {
  window.addEventListener('resize',function(e){
   if (e.target.innerWidth < 768){
     setIsMobile(isMobile => true)
      setIsDesktop(isDesktop => false)

   }

   if (e.target.innerWidth > 767) {
     setIsDesktop(isDesktop => true);
     setIsMobile(isMobile => false)
   }
  }, false);

 console.log("isMobile ", isMobile);

 console.log("isDesktop ", isDesktop);
}, [isMobile, isDesktop]);

  useEffect(() => {
    if (window.innerWidth < 768){
       setContent(Content => <Responsive
         as={Sidebar.Pushable}
         getWidth={getWidth}
         maxWidth={Responsive.onlyMobile.maxWidth}
       >
         <Sidebar
           as={Menu}
           animation="push"
           inverted
           onHide={handleSidebarHide}
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
                       onClick={handleSidebarHide}
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
                 <Menu.Item onClick={handleToggle}>
                   <Icon name="sidebar" />
                 </Menu.Item>
                 <Menu.Item position="right">
                   <Button inverted>
                     {isLoggedIn ? (
                       <Link to="#" onClick={modalStateOn}>
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

          {React.cloneElement(children, { userData })}
        </Sidebar.Pusher>
      </Responsive>)
  } else {
      setContent(Content => <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
         <Visibility
           once={false}
           onBottomPassed={showFixedMenu}
           onBottomPassedReverse={hideFixedMenu}
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
         {React.cloneElement(children, { userData })}
       </Responsive>)
  }
  }, [isMobile, isDesktop]);

   return isMobile ? Content : Content

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
  var userData = useContext(UserContext);
  return (
    <React.Fragment>
      <LayoutContainer
        history={history}
        data={data}
        modalActive={modalActive}
        modalStateOn={modalStateOn}
        modalStateOff={modalStateOff}
        isLoggedIn={isLoggedIn}
        userData={userData}
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
