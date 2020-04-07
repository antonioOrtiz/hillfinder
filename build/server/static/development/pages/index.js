module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/FormComponent/FormComponent.jsx":
/*!****************************************************!*\
  !*** ./components/FormComponent/FormComponent.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/reducers/users/index */ "./store/reducers/users/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/index */ "./utils/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_7__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;









function FormComponent({
  formType,
  match,
  history,
  logInUser,
  accountVerified,
  userHasBeenVerified,
  userHasNotBeenVerified,
  resetUserAcoountVerified
}) {
  var Forms = {
    Confirmation: [isConfirmationForm],
    ForgotPassword: [isForgotPasswordForm, forgotPasswordSubmit, isGenericUseEffect],
    Login: [isLoginForm, loginSubmit, isGenericUseEffect],
    Registration: [isRegisterForm, registerSubmit, isGenericUseEffect],
    UpdatePassword: [isUpdatePasswordForm, updatePasswordSubmit, isGenericUseEffect]
  };
  var {
    0: duration,
    1: setDuration
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(500);
  var {
    0: username,
    1: setUsername
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  var {
    0: usernameFeedback,
    1: setUsernameFeedback
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  var {
    0: usernameError,
    1: setUsernameError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  var {
    0: userNameDup,
    1: setUserNameDup
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  var {
    0: password,
    1: setPassword
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  var {
    0: passwordFeedback,
    1: setPasswordFeedback
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  var {
    0: passwordError,
    1: setPasswordError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  var {
    0: password_confirmation,
    1: setPasswordConfirmation
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  var {
    0: passwordConfirmationError,
    1: setPasswordConfirmationError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  var {
    0: passwordConfirmationFeedback,
    1: setPasswordConfirmationFeedback
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  var {
    0: formSuccess,
    1: setFormSuccess
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  var {
    0: formError,
    1: setFormError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  var {
    0: disableButton,
    1: setDisableButton
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  var {
    0: isLoading,
    1: setIsLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  var {
    0: responseMessage,
    1: setResponseMessage
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  var {
    0: tokenExpired,
    1: setTokenExpired
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  var {
    0: responseCodeSuccess,
    1: setResponseCodeSuccess
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  var {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  function isConfirmationForm() {
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(`http://localhost:8016/users/confirmation/${match.params.token}`).then(response => {
        if (response.status === 200) {
          setError(false);
          setResponseMessage(response.data.msg); // setTimeout(() => {
          //   userHasBeenVerified();
          // }, 1000);
        }
      }).catch(function (error) {
        if (error.response.status === 404) {
          // Token not in database
          resetUserAcoountVerified();
          setResponseMessage(error.response.data.msg);
          setError(true);
        }

        if (error.response.status === 400) {
          userHasBeenVerified();
          setResponseMessage(error.response.data.msg);
          setError(true);
        }
      });
    }, []);

    const isNull = value => typeof value === 'object' && !value;

    return __jsx("div", {
      className: "login-form"
    }, error === false ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      unmountOnHide: true,
      animation: "scale",
      duration: duration
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      success: true,
      header: responseMessage[0]
    })) : '', accountVerified === true && error === true ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      unmountOnHide: true,
      animation: "scale",
      duration: duration
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      error: true,
      header: responseMessage[0]
    })) : '', isNull(accountVerified) && error === true ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      unmountOnHide: true,
      animation: "scale",
      duration: duration
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      error: true,
      header: responseMessage[0]
    })) : '');
  }

  function isForgotPasswordForm() {
    return __jsx("div", {
      className: "login-form"
    }, ' ', __jsx("style", null, `body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`, ' '), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      textAlign: "center",
      style: {
        height: '100%'
      },
      verticalAlign: "middle"
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"].Column, {
      style: {
        maxWidth: 450
      }
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Header"], {
      as: "h2",
      color: "green",
      textAlign: "center"
    }, "Forgot yee password?"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      color: "olive"
    }, "Not a problem. Just enter your email address below. If it's registered with Hillfinder, we'll send you a link to reset your password.", ' '), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"], {
      size: "large",
      onSubmit: e => handleSubmit(e, formType),
      error: formError
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Segment"], {
      stacked: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"].Input, {
      fluid: true,
      icon: "user",
      iconPosition: "left",
      placeholder: "E-mail address, e.g. joe@schmoe.com",
      name: "username",
      value: username,
      onChange: e => handleChange(e),
      error: usernameError
    }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: usernameError,
      animation: "scale",
      duration: duration
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      error: true,
      content: usernameFeedback
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      color: "green",
      fluid: true,
      size: "large",
      disabled: disableButton
    }, "Yes, send a link"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: formError,
      unmountOnHide: true,
      animation: "scale",
      duration: duration
    }, isLoading ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Dimmer"], {
      active: true,
      inverted: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Loader"], null)) : __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      error: true,
      centered: "true",
      header: responseMessage[0],
      content: responseMessage[1]
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: formSuccess,
      unmountOnHide: true,
      animation: "scale",
      duration: duration
    }, isLoading ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Dimmer"], {
      active: true,
      inverted: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Loader"], null)) : __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      success: true,
      header: responseMessage[0],
      content: responseMessage[1]
    })))), formError ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: formError,
      animation: "scale",
      duration: 1000
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], null, __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
      to: "/register"
    }, "Register"), ' ')) : null), ' '), ' ');
  }

  function isLoginForm() {
    return __jsx("div", {
      className: "login-form"
    }, ' ', __jsx("style", null, `body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`, ' '), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      textAlign: "center",
      style: {
        height: '100%'
      },
      verticalAlign: "middle"
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"].Column, {
      style: {
        maxWidth: 450
      }
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Header"], {
      as: "h2",
      color: "green",
      textAlign: "center"
    }, "Log-in to your account"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"], {
      size: "large",
      onSubmit: e => handleSubmit(e, formType),
      error: formError
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Segment"], {
      stacked: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"].Input, {
      fluid: true,
      icon: "user",
      iconPosition: "left",
      placeholder: "E-mail address, e.g. joe@schmoe.com",
      name: "username",
      value: username,
      onChange: handleChange
    }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: usernameError,
      animation: "scale",
      duration: duration
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      error: true,
      content: usernameFeedback
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"].Input, {
      fluid: true,
      icon: "lock",
      iconPosition: "left",
      placeholder: "Password",
      name: "password",
      type: "password",
      value: password,
      onChange: e => handleChange(e)
    }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: passwordError,
      animation: "scale",
      duration: duration
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      error: true,
      content: passwordFeedback
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      color: "green",
      fluid: true,
      size: "large",
      disabled: disableButton
    }, "Log-in"), __jsx("br", null), __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
      to: "/forgot_password"
    }, "Forgot password?"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: accountVerified === false,
      unmountOnHide: true,
      animation: "scale",
      duration: duration
    }, isLoading ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Dimmer"], {
      active: true,
      inverted: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Loader"], null)) : __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      warning: true,
      color: "yellow",
      centered: "true",
      header: responseMessage[0],
      content: responseMessage[1]
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: formError,
      unmountOnHide: true,
      animation: "scale",
      duration: duration
    }, isLoading ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Dimmer"], {
      active: true,
      inverted: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Loader"], null)) : __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      error: true,
      centered: "true",
      header: responseMessage[0],
      content: responseMessage[1]
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: formSuccess,
      unmountOnHide: true,
      animation: "scale",
      duration: duration
    }, isLoading ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Dimmer"], {
      active: true,
      inverted: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Loader"], null)) : __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      success: true,
      header: responseMessage[0],
      content: responseMessage[1]
    })))), formError ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: formError,
      animation: "scale",
      duration: 1000
    }, isLoading ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Dimmer"], {
      active: true,
      inverted: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Loader"], null)) : __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], null, __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
      to: "/register"
    }, "Register"), ' ')) : null), ' '), ' ');
  }

  function isRegisterForm() {
    return __jsx("div", {
      className: "login-form"
    }, ' ', __jsx("style", null, `body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`, ' '), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      textAlign: "center",
      style: {
        height: '100%'
      },
      verticalAlign: "middle"
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"].Column, {
      style: {
        maxWidth: 450
      }
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Header"], {
      as: "h2",
      color: "green",
      textAlign: "center"
    }, "Register for an account"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"], {
      size: "large",
      onSubmit: e => handleSubmit(e, formType),
      error: userNameDup || formError
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Segment"], {
      stacked: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"].Input, {
      fluid: true,
      icon: "user",
      iconPosition: "left",
      placeholder: "E-mail address, e.g. joe@schmoe.com",
      name: "username",
      value: username,
      onChange: e => handleChange(e),
      error: usernameError
    }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: usernameError,
      animation: "scale",
      duration: duration
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      error: true,
      content: usernameFeedback
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"].Input, {
      fluid: true,
      icon: "lock",
      iconPosition: "left",
      placeholder: "Password",
      name: "password",
      type: "password",
      value: password,
      onChange: e => handleChange(e),
      error: passwordError
    }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: passwordError,
      animation: "scale",
      duration: duration
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      error: true,
      content: passwordFeedback
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      color: "green",
      fluid: true,
      size: "large",
      disabled: disableButton
    }, "Register"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: userNameDup || formError,
      unmountOnHide: true,
      animation: "scale",
      duration: duration
    }, isLoading ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Dimmer"], {
      active: true,
      inverted: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Loader"], null)) : __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      error: true,
      centered: "true",
      header: responseMessage[0],
      content: responseMessage[1]
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: formSuccess,
      unmountOnHide: true,
      animation: "scale",
      duration: duration
    }, isLoading ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Dimmer"], {
      active: true,
      inverted: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Loader"], null)) : __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      success: true,
      header: responseMessage[0],
      content: responseMessage[1]
    })))), formSuccess ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: formSuccess,
      animation: "scale",
      duration: 1000
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], null, __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
      to: "/login"
    }, "Login"), ' ')) : null), ' '), ' ');
  }

  function isUpdatePasswordForm() {
    console.log('disableButton ', disableButton);
    return __jsx("div", {
      className: "login-form"
    }, ' ', __jsx("style", null, `body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`, ' '), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      textAlign: "center",
      style: {
        height: '100%'
      },
      verticalAlign: "middle"
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"].Column, {
      style: {
        maxWidth: 450
      }
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Header"], {
      as: "h2",
      color: "green",
      textAlign: "center"
    }, "Update your password"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      color: "olive"
    }, "Create a new password for your account and sign in. For your security, choose a password you haven't used before"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"], {
      size: "large",
      onSubmit: e => handleSubmit(e, formType),
      error: formError
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Segment"], {
      stacked: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"].Input, {
      fluid: true,
      icon: "user",
      iconPosition: "left",
      placeholder: "New password, 6 - 16 characters",
      name: "password",
      type: "password",
      value: password,
      onChange: e => handleChange(e),
      error: passwordError
    }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: passwordError,
      animation: "scale",
      duration: duration
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      error: true,
      content: passwordFeedback
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"].Input, {
      fluid: true,
      icon: "user",
      iconPosition: "left",
      placeholder: "Confirm new password",
      name: "password_confirmation",
      type: "password",
      value: password_confirmation,
      onChange: e => handleChange(e),
      error: passwordConfirmationError
    }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: passwordConfirmationError,
      animation: "scale",
      duration: duration
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      error: true,
      content: passwordConfirmationFeedback
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      color: "green",
      fluid: true,
      size: "large",
      disabled: disableButton
    }, "Update password"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: tokenExpired,
      unmountOnHide: true,
      animation: "scale",
      duration: duration
    }, isLoading ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Dimmer"], {
      active: true,
      inverted: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Loader"], null)) : __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      error: true,
      header: responseMessage[0]
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: tokenExpired,
      unmountOnHide: true,
      animation: "scale",
      duration: duration
    }, isLoading ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Dimmer"], {
      active: true,
      inverted: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Loader"], null)) : __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
      to: "/forgot_password"
    }, "reset password link?")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Transition"], {
      visible: responseCodeSuccess,
      unmountOnHide: true,
      animation: "scale",
      duration: duration
    }, isLoading ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Dimmer"], {
      active: true,
      inverted: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Loader"], null)) : __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], {
      success: true,
      header: responseMessage[0],
      content: responseMessage[1]
    }))))), ' '), ' ');
  }

  function forgotPasswordSubmit() {
    axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('http://localhost:8016/users/forgot_password', {
      username: username
    }).then(response => {
      if (response.status === 200) {
        setUsername('');
        setResponseMessage(response.data.msg);
        setFormError(false);
        setFormSuccess(true);
        setIsLoading(false);
      }
    }).catch(function (error) {
      console.log(error);

      if (error.response) {
        if (error.response.status === 404) {
          setResponseMessage(error.response.data.msg);
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
        }

        console.log('error.response.data', error.response.data);
        console.log('error.response.headers', error.response.headers);
      }
    });
  }

  function loginSubmit() {
    axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('http://localhost:8016/users/login', {
      username: username,
      password: password
    }).then(response => {
      console.log('response', response);

      if (response.status === 200) {
        setTimeout(() => {
          logInUser();
          history.push('/profile');
        }, 5000);
        setUsername('');
        setPassword('');
        setFormError(false);
        setFormSuccess(true);
        setIsLoading(false);
        setResponseMessage(response.data.msg);
        userHasBeenVerified();
      }
    }).catch(function (error) {
      if (error.response) {
        if (error.response.status === 401) {
          userHasNotBeenVerified();
          setUsername('');
          setPassword('');
          setFormError(false);
          setFormSuccess(false);
          setIsLoading(false);
          setResponseMessage(error.response.data.msg);
        }

        if (error.response.status === 404) {
          resetUserAcoountVerified();
          setUsername('');
          setPassword('');
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
          setResponseMessage(error.response.data.msg);
        }

        console.log('error.response.data', error.response.data);
        console.log('error.response.headers', error.response.headers);
      }
    });
  }

  function registerSubmit() {
    axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('http://localhost:8016/users/registration', {
      username: username,
      password: password
    }).then(response => {
      console.log('response', response);

      if (response.status === 200) {
        setTimeout(() => {
          history.push('/login');
        }, 5000);
        setUsername('');
        setPassword('');
        setResponseMessage(response.data.msg);
        setUserNameDup(false);
        setFormError(false);
        setFormSuccess(true);
        setIsLoading(false);
      }
    }).catch(function (error) {
      console.log('error ', error);

      if (error.response.status === 409) {
        setUserNameDup(true);
        setResponseMessage(error.response.data.msg);
        setFormError(true);
        setIsLoading(false);
        console.log('userNameDup in error ', userNameDup);
        console.log('formError in error', formError);
        console.log('Error in registration', error);
      }
    });
  }

  function updatePasswordSubmit() {
    var {
      token
    } = match.params;
    axios__WEBPACK_IMPORTED_MODULE_2___default.a.post(`http://localhost:8016/users/reset_password/${token}`, {
      password: password
    }).then(response => {
      console.log('response', response);

      if (response.status === 200) {
        setPassword('');
        setPasswordConfirmation('');
        setFormError(false);
        setFormSuccess(true);
        setIsLoading(false);
        setResponseCodeSuccess(true);
        setResponseMessage(response.data.msg);
      }
    }).catch(function (error) {
      console.log(error);

      if (error.response) {
        if (error.response.status === 401) {
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
          setTokenExpired(true);
          setResponseMessage(error.response.data.msg);
        }
      }
    });
  }

  var isGenericUseEffect = Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    Object(_utils_index__WEBPACK_IMPORTED_MODULE_5__["validateInputs"])(formType, username, setUsernameError, setUsernameFeedback, password, password_confirmation, setPasswordConfirmationError, setPasswordConfirmationFeedback, setPasswordError, setPasswordFeedback, setDisableButton);
  }, [formType, accountVerified, username, password, usernameError, passwordError]);

  function handleChange(e) {
    console.log('e ', e);
    e.persist();
    setFormError(false);
    setDisableButton(true);
    console.log('resetUserAcoountVerified fired!');
    resetUserAcoountVerified();
    console.log('resetUserAcoountVerified fired!');
    setUserNameDup(false);

    if (e.target.name === 'username') {
      console.log('username', e.target.name);
      setUsername(e.target.value);
    }

    if (e.target.name === 'password') {
      console.log('password', e.target.name);
      setPassword(e.target.value);
    }

    if (e.target.name === 'password_confirmation') {
      console.log('password_confirmation', e.target.name);
      setPasswordConfirmation(e.target.value);
    }
  }

  function handleSubmit(event, formType) {
    event.preventDefault();
    return Forms[formType][1]();
  }

  return Forms[formType][0]();
}

function mapStateToProps(state) {
  const {
    users
  } = state;
  const {
    accountVerified,
    isLoggedIn
  } = users;
  return {
    accountVerified,
    isLoggedIn
  };
}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_7__["bindActionCreators"])({
  logInUser: _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_3__["logInUser"],
  userHasBeenVerified: _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_3__["userHasBeenVerified"],
  userHasNotBeenVerified: _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_3__["userHasNotBeenVerified"],
  resetUserAcoountVerified: _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_3__["resetUserAcoountVerified"]
}, dispatch);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps, mapDispatchToProps)(FormComponent));

/***/ }),

/***/ "./components/Header/Header.jsx":
/*!**************************************!*\
  !*** ./components/Header/Header.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const MyHeader = ({
  mobile,
  content,
  textAlign
}) => __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Header"], {
  as: "h1",
  content: content,
  textAlign: textAlign,
  inverted: true,
  style: {
    fontSize: mobile ? '.5em' : '2.5em',
    fontWeight: 'normal',
    padding: mobile ? '0' : '0',
    margin: mobile ? '1em 0 0 0' : '0'
  }
});

MyHeader.propTypes = {
  mobile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  H1Header: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  H2Header: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (MyHeader);

/***/ }),

/***/ "./components/HomePage/HomePage.jsx":
/*!******************************************!*\
  !*** ./components/HomePage/HomePage.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Header_Header_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Header/Header.jsx */ "./components/Header/Header.jsx");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const HomepageLayout = () => __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Segment"], {
  inverted: true,
  textAlign: "center",
  style: {
    minHeight: 'auto',
    padding: '4.5em 0em 5em'
  },
  vertical: true
}, __jsx(_Header_Header_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
  content: "Welcome to Hillfinder!",
  textAlign: 'center'
}), __jsx("p", {
  style: {
    fontSize: '1.33em'
  }
}, "An app on the decline! ", __jsx("br", null), "er about finding declines... Register!")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Segment"], {
  style: {
    padding: '8em 0em'
  },
  vertical: true
}, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Container"], {
  text: true
}, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Header"], {
  as: "h3",
  style: {
    fontSize: '2em'
  }
}, "\"Is it an app to find a hill, to eventually build a hobbit home in a shire\"?"), __jsx("p", {
  style: {
    fontSize: '1.33em'
  }
}, "\"No. Essentially Hillfinder is a directions app, except all endpoints of your journey try to be on a lower position in elevation than where you started from\"."), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
  as: "a",
  size: "large"
}, "Read More"))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Segment"], {
  inverted: true,
  vertical: true,
  style: {
    padding: '5em 0em'
  }
}, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Container"], null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
  divided: true,
  inverted: true,
  stackable: true
}, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"].Row, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"].Column, {
  width: 3
}, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Header"], {
  inverted: true,
  as: "h4",
  content: "About"
}), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["List"], {
  link: true,
  inverted: true
}, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["List"].Item, {
  as: "a"
}, "Contact Us"))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"].Column, {
  width: 3
}, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Header"], {
  inverted: true,
  as: "h4",
  content: "Services"
}), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["List"], {
  link: true,
  inverted: true
}, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["List"].Item, {
  as: "a"
}, "Banana Pre-Order"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["List"].Item, {
  as: "a"
}, "DNA FAQ"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["List"].Item, {
  as: "a"
}, "How To Access"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["List"].Item, {
  as: "a"
}, "Favorite X-Men"))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"].Column, {
  width: 7
}, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Header"], {
  as: "h4",
  inverted: true
}, "Footer Header"), __jsx("p", null, "Extra space for a call to action inside the footer that could help re-engage users.")))))));

/* harmony default export */ __webpack_exports__["default"] = (HomepageLayout);

/***/ }),

/***/ "./components/ImageUploader/ImageUploader.jsx":
/*!****************************************************!*\
  !*** ./components/ImageUploader/ImageUploader.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Modal_MyModal_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Modal/MyModal.jsx */ "./components/Modal/MyModal.jsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/reducers/users/index */ "./store/reducers/users/index.js");
/* harmony import */ var _store_reducers_ui_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/reducers/ui/index */ "./store/reducers/ui/index.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class ImageUploader extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "fileInputRef", react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef());

    _defineProperty(this, "fileChange", e => {
      this.uploadImage(e, "multer");
    });

    this.state = {
      userAvatar: this.props.userAvatar
    };
    this.uploadImage = this.uploadImage.bind(this);
  }

  setDefaultImage() {
    var defaultImage = '../../static/profile-avatars/assets/default-img.jpg';
    this.loadAvatarImage(defaultImage);
  }

  loadAvatarImage(img) {
    var {
      loadAvatar
    } = this.props;
    loadAvatar(img);
  }

  uploadImage(e, method) {
    e.stopPropagation();
    const {
      avatarModalStateOn,
      errorLoading
    } = this.props;

    if (method === "multer") {
      let imageFormObj = new FormData();
      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);
      this.loadAvatarImage(window.URL.createObjectURL(e.target.files[0]));
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(`http://localhost:8016/images/uploadmulter`, imageFormObj, config).then(data => {
        if (data.data.success) {
          console.log("data ", data);
          avatarModalStateOn();
        }
      }).catch(err => {
        if (err.response.status === 500) {
          console.log(err.response.status);
          avatarModalStateOn();
          this.setDefaultImage();
          errorLoading();
        }
      });
    }
  }

  render() {
    var {
      userAvatar,
      avatarModalActive,
      error
    } = this.props;
    console.log("avatarModalActive ", avatarModalActive);
    var ImageLoaded;

    if (avatarModalActive) {
      ImageLoaded = __jsx(_Modal_MyModal_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
        key: "AlertModal",
        isAlertModal: avatarModalActive,
        affirmativeUsed: "OK!",
        message: "Your image has been uploaded succesfully"
      });
    } else if (avatarModalActive && error) {
      ImageLoaded = __jsx(_Modal_MyModal_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
        key: "AlertModal",
        isAlertModal: avatarModalActive,
        affirmativeUsed: "OK!",
        message: "There was an error uploading your image, file size was to big!"
      });
    }

    return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Segment"], null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Card"], {
      fluid: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Image"], {
      wrapped: true,
      ui: false,
      src: userAvatar || this.setDefaultImage(),
      alt: "upload-image"
    }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Segment"], null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"], {
      encType: "multipart/form-data"
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"].Field, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      content: "Edit your Avatar!",
      labelPosition: "left",
      icon: "file",
      onClick: () => this.fileInputRef.current.click()
    }), __jsx("input", {
      ref: this.fileInputRef,
      type: "file",
      name: "avatar",
      hidden: true,
      onChange: this.fileChange
    })))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Card"].Content, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Card"].Header, null, "Charly"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Card"].Meta, null, __jsx("span", {
      className: "date"
    }, "Joined in 2015")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Card"].Description, null, "Charly")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Card"].Content, {
      extra: true
    }, __jsx("a", null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      name: "user"
    }), "22 Friends")))), ImageLoaded);
  }

}

function mapStateToProps(state) {
  const {
    ui,
    users
  } = state;
  const {
    userAvatar,
    error
  } = users;
  const {
    avatarModalActive
  } = ui;
  return {
    userAvatar,
    avatarModalActive,
    error
  };
}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_5__["bindActionCreators"])({
  loadAvatar: _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_6__["loadAvatar"],
  errorLoading: _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_6__["errorLoading"],
  avatarModalStateOn: _store_reducers_ui_index__WEBPACK_IMPORTED_MODULE_7__["avatarModalStateOn"]
}, dispatch);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(ImageUploader));

/***/ }),

/***/ "./components/Modal/MyModal.jsx":
/*!**************************************!*\
  !*** ./components/Modal/MyModal.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/reducers/users/index */ "./store/reducers/users/index.js");
/* harmony import */ var _store_reducers_ui_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/reducers/ui/index */ "./store/reducers/ui/index.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class MyModal extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "close", () => {
      const {
        modalStateOff
      } = this.props;
      modalStateOff();
    });

    _defineProperty(this, "logOutUser", () => {
      const {
        logOutUser
      } = this.props;
      logOutUser();
    });
  }

  render() {
    const {
      modalActive,
      isAlertModal
    } = this.props;
    return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
      dimmer: 'blurring',
      centered: true,
      size: 'mini',
      open: modalActive,
      onClose: this.close
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, null, __jsx("p", null, this.props.message)), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Modal"].Actions, null, this.props.isAlertModal ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      color: "black",
      onClick: this.close,
      content: this.props.affirmativeUsed
    }) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      color: "black",
      onClick: this.close
    }, "No"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      positive: true,
      icon: "checkmark",
      labelPosition: "right",
      content: this.props.affirmativeUsed,
      onClick: () => {
        this.close();
        this.logOutUser();
      }
    })))));
  }

}

MyModal.propTypes = {
  message: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  affirmativeUsed: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};

function mapStateToProps(state) {
  const {
    ui
  } = state;
  const {
    modalActive
  } = ui;
  return {
    modalActive
  };
}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])({
  logOutUser: _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_5__["logOutUser"],
  modalStateOn: _store_reducers_ui_index__WEBPACK_IMPORTED_MODULE_6__["modalStateOn"],
  modalStateOff: _store_reducers_ui_index__WEBPACK_IMPORTED_MODULE_6__["modalStateOff"]
}, dispatch);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(MyModal));

/***/ }),

/***/ "./components/Profile/ProfilePage.jsx":
/*!********************************************!*\
  !*** ./components/Profile/ProfilePage.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header_Header_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Header/Header.jsx */ "./components/Header/Header.jsx");
/* harmony import */ var _ImageUploader_ImageUploader_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ImageUploader/ImageUploader.jsx */ "./components/ImageUploader/ImageUploader.jsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






const style = {
  h1: {
    marginTop: '3em'
  },
  h2: {
    margin: '4em 0em 2em'
  },
  h3: {
    marginTop: '1em',
    padding: '0'
  },
  last: {
    marginBottom: '300px'
  }
};

const ProfilePage = (_ref) => {
  let {
    history,
    isMobileFromSSR
  } = _ref,
      props = _objectWithoutProperties(_ref, ["history", "isMobileFromSSR"]);

  var {
    userAvatar
  } = props;
  return __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, console.log('Profile Page!! ', props), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Grid"], {
    container: true,
    columns: 1,
    relaxed: true,
    stackable: true
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Grid"].Column, null, __jsx(_Header_Header_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
    as: "h2",
    content: "Foo",
    textAlign: "left"
  }))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Grid"], {
    container: true,
    columns: 2,
    divided: true,
    relaxed: true,
    stackable: true
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Grid"].Column, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Segment"], null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Card"], {
    fluid: true
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Image"], {
    src: "static/profile-avatars/charly_desktop.jpg",
    wrapped: true,
    ui: false
  }), __jsx(_ImageUploader_ImageUploader_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    userAvatar: userAvatar,
    history: history
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Card"].Content, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Card"].Header, null, "Charly"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Card"].Meta, null, __jsx("span", {
    className: "date"
  }, "Joined in 2015")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Card"].Description, null, "Charly")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Card"].Content, {
    extra: true
  }, __jsx("a", null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Icon"], {
    name: "user"
  }), "22 Friends"))))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Grid"].Column, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Segment"], null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Card"], {
    fluid: true
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Card"].Content, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Card"].Header, null, "Recent Activity")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Card"].Content, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"], null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Event, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Label, {
    image: "/images/avatar/small/jenny.jpg"
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Content, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Date, {
    content: "1 day ago"
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Summary, null, "You added ", __jsx("a", null, "Jenny Hess"), " to your ", __jsx("a", null, "coworker"), " group."))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Event, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Label, {
    image: "/images/avatar/small/molly.png"
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Content, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Date, {
    content: "3 days ago"
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Summary, null, "You added ", __jsx("a", null, "Molly Malone"), " as a friend."))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Event, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Label, {
    image: "/images/avatar/small/elliot.jpg"
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Content, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Date, {
    content: "4 days ago"
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Summary, null, "You added ", __jsx("a", null, "Elliot Baker"), " to your ", __jsx("a", null, "musicians"), " group."))))))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Segment"], null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"], null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Event, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Label, null, __jsx("img", {
    src: "/images/avatar/small/elliot.jpg"
  })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Content, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Summary, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].User, null, "Elliot Fu"), " added you as a friend", __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Date, null, "1 Hour Ago")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Meta, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Like, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Icon"], {
    name: "like"
  }), "4 Likes")))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Event, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Label, {
    image: "/images/avatar/small/helen.jpg"
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Content, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Summary, null, __jsx("a", null, "Helen Troy"), " added ", __jsx("a", null, "2 new illustrations"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Date, null, "4 days ago")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Extra, {
    images: true
  }, __jsx("a", null, __jsx("img", {
    src: "/images/wireframe/image.png"
  })), __jsx("a", null, __jsx("img", {
    src: "/images/wireframe/image.png"
  }))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Meta, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Like, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Icon"], {
    name: "like"
  }), "1 Like")))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Event, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Label, {
    image: "/images/avatar/small/jenny.jpg"
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Content, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Summary, {
    date: "2 Days Ago",
    user: "Jenny Hess",
    content: "add you as a friend"
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Meta, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Like, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Icon"], {
    name: "like"
  }), "8 Likes")))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Event, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Label, {
    image: "/images/avatar/small/joe.jpg"
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Content, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Summary, null, __jsx("a", null, "Joe Henderson"), " posted on his page", __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Date, null, "3 days ago")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Extra, {
    text: true
  }, "Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again. Even if we don't run extra laps that day, we surely will come back for more of the same another day soon."), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Meta, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Like, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Icon"], {
    name: "like"
  }), "5 Likes")))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Event, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Label, {
    image: "/images/avatar/small/justen.jpg"
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Content, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Summary, null, __jsx("a", null, "Justen Kitsune"), " added ", __jsx("a", null, "2 new photos"), " of you", __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Date, null, "4 days ago")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Extra, {
    images: true
  }, __jsx("a", null, __jsx("img", {
    src: "/images/wireframe/image.png"
  })), __jsx("a", null, __jsx("img", {
    src: "/images/wireframe/image.png"
  }))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Meta, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Feed"].Like, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Icon"], {
    name: "like"
  }), "41 Likes")))))))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Divider"], {
    as: "h4",
    className: "header",
    horizontal: true,
    style: {
      margin: '3em 0em',
      textTransform: 'uppercase'
    }
  }, __jsx("a", {
    href: "#"
  }, "Case Studies")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Segment"], {
    style: {
      padding: '8em 0em'
    },
    vertical: true
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Container"], {
    text: true
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Header"], {
    as: "h3",
    style: {
      fontSize: '2em'
    }
  }, "Breaking The Grid, Grabs Your Attention"), __jsx("p", {
    style: {
      fontSize: '1.33em'
    }
  }, "Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention."), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    as: "a",
    size: "large"
  }, "Read More"))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Segment"], {
    inverted: true,
    vertical: true,
    style: {
      padding: '5em 0em'
    }
  }));
};

function mapStateToProps(state) {
  const {
    users
  } = state;
  const {
    userAvatar
  } = users;
  return {
    userAvatar
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps)(ProfilePage));

/***/ }),

/***/ "./components/Register/Register.css":
/*!******************************************!*\
  !*** ./components/Register/Register.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/head.jsx":
/*!*****************************!*\
  !*** ./components/head.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const defaultDescription = '';
const defaultOGURL = '';
const defaultOGImage = '';

const Head = props => __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, null, __jsx("meta", {
  charSet: "UTF-8"
}), __jsx("title", null, props.title || ''), __jsx("meta", {
  name: "description",
  content: props.description || defaultDescription
}), __jsx("meta", {
  name: "viewport",
  content: "width=device-width, initial-scale=1"
}), __jsx("link", {
  rel: "icon",
  sizes: "192x192",
  href: "/static/touch-icon.png"
}), __jsx("link", {
  rel: "apple-touch-icon",
  href: "/static/touch-icon.png"
}), __jsx("link", {
  rel: "mask-icon",
  href: "/static/favicon-mask.svg",
  color: "#49B882"
}), __jsx("link", {
  rel: "icon",
  href: "/static/favicon.ico"
}), __jsx("link", {
  rel: "icon",
  href: "/static/styles.css"
}), __jsx("meta", {
  property: "og:url",
  content: props.url || defaultOGURL
}), __jsx("meta", {
  property: "og:title",
  content: props.title || ''
}), __jsx("meta", {
  property: "og:description",
  content: props.description || defaultDescription
}), __jsx("meta", {
  name: "twitter:site",
  content: props.url || defaultOGURL
}), __jsx("meta", {
  name: "twitter:card",
  content: "summary_large_image"
}), __jsx("meta", {
  name: "twitter:image",
  content: props.ogImage || defaultOGImage
}), __jsx("meta", {
  property: "og:image",
  content: props.ogImage || defaultOGImage
}), __jsx("meta", {
  property: "og:image:width",
  content: "1200"
}), __jsx("meta", {
  property: "og:image:height",
  content: "630"
}));

Head.propTypes = {
  title: prop_types__WEBPACK_IMPORTED_MODULE_2__["string"],
  description: prop_types__WEBPACK_IMPORTED_MODULE_2__["string"],
  url: prop_types__WEBPACK_IMPORTED_MODULE_2__["string"],
  ogImage: prop_types__WEBPACK_IMPORTED_MODULE_2__["string"]
};
/* harmony default export */ __webpack_exports__["default"] = (Head);

/***/ }),

/***/ "./node_modules/semantic-ui-css/semantic.min.css":
/*!*******************************************************!*\
  !*** ./node_modules/semantic-ui-css/semantic.min.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./pages/LinkNavWithLayout.jsx":
/*!*************************************!*\
  !*** ./pages/LinkNavWithLayout.jsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Modal_MyModal_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Modal/MyModal.jsx */ "./components/Modal/MyModal.jsx");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _store_reducers_ui_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../store/reducers/ui/index */ "./store/reducers/ui/index.js");
/* harmony import */ var _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../store/reducers/users/index */ "./store/reducers/users/index.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










const getWidth = () => {
  const isSSR = true;
  return isSSR ? semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Responsive"].onlyTablet.minWidth : window.innerWidth;
};

const logOutMenuItemHelper = (isMobile, isLoggedIn, history, modalActive, nav, NavLink, modalStateOn, modalStateOff, handleSidebarHide) => {
  function mobilelogOutMenuItemHelper(history, modalActive, nav, NavLink, modalStateOn, handleSidebarHide) {
    if (nav.name === 'Log in') {
      console.log('mobile nav.name ', nav.name);
      return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
        key: 'modalForMobile'
      }, modalActive && __jsx(_components_Modal_MyModal_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
        isAlertModal: false,
        history: history,
        affirmativeUsed: "Yes",
        message: " Are you sure you want to log out of your account?",
        modalActive: modalActive
      }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
        key: 'modalForMobile',
        name: "Log out",
        onClick: event => {
          modalStateOn();
          handleSidebarHide();
        }
      }, "Log Out"));
    } else {
      return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
        exact: true,
        key: nav.name,
        as: NavLink,
        to: nav.path,
        name: nav.name,
        onClick: () => {
          handleSidebarHide();
        }
      });
    }
  }

  function desktoplogOutMenuItemHelper(history, modalActive, nav, NavLink, modalStateOn, modalStateOff) {
    if (nav.name === 'Log in') {
      return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
        key: 'modalForDesktop'
      }, modalActive && __jsx(_components_Modal_MyModal_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
        isAlertModal: false,
        history: history,
        affirmativeUsed: "Yes",
        message: "Are you sure you want to log out of your account?",
        modalActive: modalActive
      }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
        key: 'modalForDesktop',
        name: "Log out",
        onClick: event => {
          modalStateOn();
        }
      }, "Log Out"));
    } else {
      return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
        exact: true,
        key: nav.name,
        as: NavLink,
        to: nav.path,
        name: nav.name
      });
    }
  }

  if (isMobile && isLoggedIn) {
    return mobilelogOutMenuItemHelper(history, modalActive, nav, NavLink, modalStateOn, modalStateOff, handleSidebarHide);
  }

  return desktoplogOutMenuItemHelper(history, modalActive, nav, NavLink, modalStateOn, modalStateOff);
};

class DesktopContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "hideFixedMenu", () => this.setState({
      fixed: false
    }));

    _defineProperty(this, "showFixedMenu", () => this.setState({
      fixed: true
    }));
  }

  render() {
    const {
      fixed
    } = this.state;
    const {
      history,
      data,
      children,
      isLoggedIn,
      modalActive,
      modalStateOn,
      modalStateOff
    } = this.props; // console.log("this.props desktop in LinkNAV ", this.props);

    return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Responsive"], {
      getWidth: getWidth,
      minWidth: semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Responsive"].onlyTablet.minWidth
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Visibility"], {
      once: false,
      onBottomPassed: this.showFixedMenu,
      onBottomPassedReverse: this.hideFixedMenu
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Segment"], {
      inverted: true,
      textAlign: "center",
      style: {
        minHeight: 'auto',
        padding: '0'
      },
      vertical: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Menu"], {
      fixed: fixed ? 'top' : null,
      inverted: !fixed,
      pointing: !fixed,
      secondary: !fixed,
      size: "large"
    }, isLoggedIn ? data.filter(function (nav) {
      return nav.name !== 'Register';
    }).map(nav => {
      return logOutMenuItemHelper(false, isLoggedIn, history, modalActive, nav, react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], modalStateOn, modalStateOff);
    }) : data.filter(function (nav) {
      return nav.name != 'Profile' && nav.name != 'Dashboard';
    }).map(nav => {
      return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
        exact: true,
        key: nav.path,
        as: react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"],
        to: nav.path,
        name: nav.name
      });
    })))), children);
  }

}

class MobileContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "handleSidebarHide", () => this.setState({
      sidebarOpened: false
    }));

    _defineProperty(this, "handleToggle", () => this.setState({
      sidebarOpened: true
    }));
  }

  render() {
    const {
      children,
      history,
      data,
      isLoggedIn,
      modalActive,
      modalStateOn,
      modalStateOff
    } = this.props;
    const {
      sidebarOpened
    } = this.state;
    return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Responsive"], {
      as: semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Sidebar"].Pushable,
      getWidth: getWidth,
      maxWidth: semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Responsive"].onlyMobile.maxWidth
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Sidebar"], {
      as: semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Menu"],
      animation: "push",
      inverted: true,
      onHide: this.handleSidebarHide,
      vertical: true,
      visible: sidebarOpened
    }, isLoggedIn ? data.filter(function (nav) {
      return nav.name !== 'Register';
    }).map(nav => {
      return logOutMenuItemHelper(false, isLoggedIn, history, modalActive, nav, react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], modalStateOn, modalStateOff, this.handleSidebarHide);
    }) : data.filter(function (nav) {
      return nav.name != 'Profile' && nav.name != 'Dashboard';
    }).map(nav => {
      return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
        exact: true,
        key: nav.name,
        as: react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"],
        to: nav.path,
        name: nav.name,
        onClick: this.handleSidebarHide
      });
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Sidebar"].Pusher, {
      dimmed: sidebarOpened
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Segment"], {
      inverted: true,
      textAlign: "center",
      style: {
        minHeight: 'auto',
        padding: '1em 0em'
      },
      vertical: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Container"], null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Menu"], {
      inverted: true,
      pointing: true,
      secondary: true,
      size: "large"
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
      onClick: this.handleToggle
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
      name: "sidebar"
    })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
      position: "right"
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      inverted: true
    }, isLoggedIn ? __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
      to: "/"
    }, "Log out") : __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
      to: "/login"
    }, "Log in")), !isLoggedIn ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      inverted: true,
      style: {
        marginLeft: '0.5em'
      }
    }, __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
      to: "/register"
    }, __jsx("span", null, "Register!"))) : null)))), children));
  }

}

const LinkNavWithLayout = ({
  children,
  history,
  data,
  userAvatar,
  modalActive,
  modalStateOn,
  modalStateOff,
  isLoggedIn
}) => __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(DesktopContainer, {
  history: history,
  data: data,
  userAvatar: userAvatar,
  modalActive: modalActive,
  modalStateOn: modalStateOn,
  modalStateOff: modalStateOff,
  isLoggedIn: isLoggedIn
}, children), __jsx(MobileContainer, {
  history: history,
  data: data,
  userAvatar: userAvatar,
  modalActive: modalActive,
  modalStateOn: modalStateOn,
  modalStateOff: modalStateOff,
  isLoggedIn: isLoggedIn
}, children));

function mapStateToProps(state) {
  const {
    ui,
    users
  } = state;
  const {
    isLoggedIn,
    userAvatar
  } = users;
  const {
    modalActive
  } = ui;
  return {
    isLoggedIn,
    userAvatar,
    modalActive
  };
}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_5__["bindActionCreators"])({
  modalStateOn: _store_reducers_ui_index__WEBPACK_IMPORTED_MODULE_6__["modalStateOn"],
  modalStateOff: _store_reducers_ui_index__WEBPACK_IMPORTED_MODULE_6__["modalStateOff"],
  loadAvatar: _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_7__["loadAvatar"]
}, dispatch);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(LinkNavWithLayout));

/***/ }),

/***/ "./pages/confirmation.jsx":
/*!********************************!*\
  !*** ./pages/confirmation.jsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-css/semantic.min.css */ "./node_modules/semantic-ui-css/semantic.min.css");
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_FormComponent_FormComponent_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FormComponent/FormComponent.jsx */ "./components/FormComponent/FormComponent.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





const Confirmation = props => __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_components_FormComponent_FormComponent_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
  formType: "Confirmation"
}, props)));

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Confirmation));

/***/ }),

/***/ "./pages/dashboard.jsx":
/*!*****************************!*\
  !*** ./pages/dashboard.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/reducers/users/index */ "./store/reducers/users/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




let Dashboard;

Dashboard = ({
  isLoggedIn,
  logOutUser
}) => __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("h1", null, "Dashboard"));

function mapStateToProps(state) {
  const {
    users
  } = state;
  const {
    isLoggedIn
  } = users;
  return {
    isLoggedIn
  };
}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
  logOutUser: _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_3__["logOutUser"]
}, dispatch);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Dashboard)));

/***/ }),

/***/ "./pages/forgotPassword.jsx":
/*!**********************************!*\
  !*** ./pages/forgotPassword.jsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-css/semantic.min.css */ "./node_modules/semantic-ui-css/semantic.min.css");
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_FormComponent_FormComponent_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FormComponent/FormComponent.jsx */ "./components/FormComponent/FormComponent.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





const ForgotPassword = props => __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_components_FormComponent_FormComponent_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
  formType: "ForgotPassword"
}, props)));

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(ForgotPassword));

/***/ }),

/***/ "./pages/home.jsx":
/*!************************!*\
  !*** ./pages/home.jsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/head */ "./components/head.jsx");
/* harmony import */ var _components_HomePage_HomePage_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/HomePage/HomePage.jsx */ "./components/HomePage/HomePage.jsx");
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! semantic-ui-css/semantic.min.css */ "./node_modules/semantic-ui-css/semantic.min.css");
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/styles.scss */ "./styles/styles.scss");
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_styles_scss__WEBPACK_IMPORTED_MODULE_5__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







class Home extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_components_head__WEBPACK_IMPORTED_MODULE_2__["default"], {
      title: "Home"
    }), __jsx(_components_HomePage_HomePage_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], null));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(Home));

/***/ }),

/***/ "./pages/index.jsx":
/*!*************************!*\
  !*** ./pages/index.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/reducers/users/index */ "./store/reducers/users/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _LinkNavWithLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LinkNavWithLayout */ "./pages/LinkNavWithLayout.jsx");
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home */ "./pages/home.jsx");
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./profile */ "./pages/profile.jsx");
/* harmony import */ var _dashboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dashboard */ "./pages/dashboard.jsx");
/* harmony import */ var _forgotPassword__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./forgotPassword */ "./pages/forgotPassword.jsx");
/* harmony import */ var _updatePassword__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./updatePassword */ "./pages/updatePassword.jsx");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./login */ "./pages/login.jsx");
/* harmony import */ var _confirmation__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./confirmation */ "./pages/confirmation.jsx");
/* harmony import */ var _store_reducers_ui_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../store/reducers/ui/index */ "./store/reducers/ui/index.js");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./register */ "./pages/register.jsx");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

















class App extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  static getInitialProps({
    store,
    accountVerified,
    isLoggedIn,
    logInUser,
    logOutUser
  }) {
    console.log('store', store);
    return {
      store,
      accountVerified,
      isLoggedIn,
      logInUser,
      logOutUser
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      isLoggedIn,
      accountVerified
    } = this.props;
    console.log('accountVerified ', accountVerified);
    console.log('this.props ', this.props);
    let navBars = [{
      name: 'Home',
      path: '/'
    }, {
      name: 'Profile',
      path: '/profile'
    }, {
      name: 'Dashboard',
      path: '/dashboard'
    }, {
      name: 'Log in',
      path: '/login'
    }, {
      name: 'Register',
      path: '/register'
    }];

    function PrivateRoute(_ref) {
      let {
        children
      } = _ref,
          rest = _objectWithoutProperties(_ref, ["children"]);

      return __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], _extends({}, rest, {
        render: ({
          location
        }) => isLoggedIn && accountVerified ? _objectSpread({}, children) : __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Redirect"], {
          to: {
            pathname: '/',
            state: {
              from: location
            }
          }
        })
      }));
    }

    return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Switch"], null, __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
      path: "/",
      isLoggedIn: isLoggedIn,
      exact: true,
      render: props => __jsx(_LinkNavWithLayout__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, props, {
        data: navBars
      }), __jsx(_home__WEBPACK_IMPORTED_MODULE_6__["default"], null))
    }), __jsx(PrivateRoute, {
      path: "/profile",
      isLoggedIn: isLoggedIn
    }, __jsx(_LinkNavWithLayout__WEBPACK_IMPORTED_MODULE_5__["default"], {
      data: navBars
    }, __jsx(_profile__WEBPACK_IMPORTED_MODULE_7__["default"], {
      user: true
    }))), __jsx(PrivateRoute, {
      path: "/dashboard",
      isLoggedIn: isLoggedIn
    }, __jsx(_LinkNavWithLayout__WEBPACK_IMPORTED_MODULE_5__["default"], {
      data: navBars
    }, __jsx(_dashboard__WEBPACK_IMPORTED_MODULE_8__["default"], null))), __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
      path: "/login",
      render: props => __jsx(_login__WEBPACK_IMPORTED_MODULE_11__["default"], _extends({
        accountVerified: accountVerified
      }, props))
    }), __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
      path: "/forgot_password",
      render: props => __jsx(_forgotPassword__WEBPACK_IMPORTED_MODULE_9__["default"], props)
    }), __jsx(PrivateRoute, {
      path: "/update_password/:token",
      component: _updatePassword__WEBPACK_IMPORTED_MODULE_10__["default"]
    }), __jsx(PrivateRoute, {
      path: "/confirmed/:token",
      accountVerified: accountVerified,
      component: _confirmation__WEBPACK_IMPORTED_MODULE_12__["default"]
    }), __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
      path: "/register",
      render: props => __jsx(_register__WEBPACK_IMPORTED_MODULE_14__["default"], props)
    }), __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
      component: ({
        location
      }) => __jsx("h1", null, "Sorry but the page", ' ', __jsx("p", {
        style: {
          fontWeight: 'strong'
        }
      }, location.pathname.substring(1), " "), ' ', "Page, Could Not be found")
    })));
  }

}

function mapStateToProps(state) {
  const {
    ui,
    users
  } = state;
  const {
    isLoggedIn,
    userAvatar,
    accountVerified
  } = users;
  const {
    modalActive
  } = ui;
  return {
    isLoggedIn,
    accountVerified,
    userAvatar,
    modalActive
  };
}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({
  modalStateOn: _store_reducers_ui_index__WEBPACK_IMPORTED_MODULE_13__["modalStateOn"],
  modalStateOff: _store_reducers_ui_index__WEBPACK_IMPORTED_MODULE_13__["modalStateOff"],
  logInUser: _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_2__["logInUser"],
  logOutUser: _store_reducers_users_index__WEBPACK_IMPORTED_MODULE_2__["logOutUser"]
}, dispatch);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(App)));

/***/ }),

/***/ "./pages/login.jsx":
/*!*************************!*\
  !*** ./pages/login.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-css/semantic.min.css */ "./node_modules/semantic-ui-css/semantic.min.css");
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_FormComponent_FormComponent_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FormComponent/FormComponent.jsx */ "./components/FormComponent/FormComponent.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





const Login = props => __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_components_FormComponent_FormComponent_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
  formType: "Login"
}, props)));

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Login));

/***/ }),

/***/ "./pages/profile.jsx":
/*!***************************!*\
  !*** ./pages/profile.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-css/semantic.min.css */ "./node_modules/semantic-ui-css/semantic.min.css");
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Profile_ProfilePage_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Profile/ProfilePage.jsx */ "./components/Profile/ProfilePage.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const Profile = props => __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_components_Profile_ProfilePage_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], props));

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Profile));

/***/ }),

/***/ "./pages/register.jsx":
/*!****************************!*\
  !*** ./pages/register.jsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-css/semantic.min.css */ "./node_modules/semantic-ui-css/semantic.min.css");
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_FormComponent_FormComponent_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FormComponent/FormComponent.jsx */ "./components/FormComponent/FormComponent.jsx");
/* harmony import */ var _components_Register_Register_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Register/Register.css */ "./components/Register/Register.css");
/* harmony import */ var _components_Register_Register_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_Register_Register_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






const Register = props => __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_components_FormComponent_FormComponent_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
  formType: "Registration"
}, props)));

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["withRouter"])(Register));

/***/ }),

/***/ "./pages/updatePassword.jsx":
/*!**********************************!*\
  !*** ./pages/updatePassword.jsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-css/semantic.min.css */ "./node_modules/semantic-ui-css/semantic.min.css");
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_FormComponent_FormComponent_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FormComponent/FormComponent.jsx */ "./components/FormComponent/FormComponent.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





const UpdatePassword = props => __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_components_FormComponent_FormComponent_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
  formType: "UpdatePassword"
}, props)));

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(UpdatePassword));

/***/ }),

/***/ "./store/reducers/ui/index.js":
/*!************************************!*\
  !*** ./store/reducers/ui/index.js ***!
  \************************************/
/*! exports provided: uiStartState, actionTypes, default, modalStateOn, modalStateOff, avatarModalStateOn, avatarModalStateOff */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uiStartState", function() { return uiStartState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionTypes", function() { return actionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ui; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modalStateOn", function() { return modalStateOn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modalStateOff", function() { return modalStateOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avatarModalStateOn", function() { return avatarModalStateOn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avatarModalStateOff", function() { return avatarModalStateOff; });
/* initial state */
var uiStartState = {
  modalActive: false,
  avatarModalActive: false
};
/* action types */

const actionTypes = {
  MODAL_ACTIVE: 'MODAL_ACTIVE',
  MODAL_INACTIVE: 'MODAL_INACTIVE',
  AVATAR_MODAL_ACTIVE: 'AVATAR_MODAL_ACTIVE',
  AVATAR_MODAL_INACTIVE: 'AVATAR_MODAL_INACTIVE'
};
/* reducer(s) */

function ui(state = uiStartState, action) {
  switch (action.type) {
    case actionTypes.MODAL_ACTIVE:
      return Object.assign({}, state, {
        modalActive: true
      });

    case actionTypes.MODAL_INACTIVE:
      return Object.assign({}, state, {
        modalActive: false
      });

    case actionTypes.AVATAR_MODAL_ACTIVE:
      return Object.assign({}, state, {
        avatarModalActive: true
      });

    case actionTypes.AVATAR_MODAL_INACTIVE:
      return Object.assign({}, state, {
        avatarModalActive: false
      });

    default:
      return state;
  }
}
;
/* actions */

const modalStateOn = () => {
  return {
    type: actionTypes.MODAL_ACTIVE
  };
};
const modalStateOff = () => {
  return {
    type: actionTypes.MODAL_INACTIVE
  };
};
const avatarModalStateOn = () => {
  return {
    type: actionTypes.AVATAR_MODAL_ACTIVE
  };
};
const avatarModalStateOff = () => {
  return {
    type: actionTypes.AVATAR_MODAL_INACTIVE
  };
};

/***/ }),

/***/ "./store/reducers/users/index.js":
/*!***************************************!*\
  !*** ./store/reducers/users/index.js ***!
  \***************************************/
/*! exports provided: usersStartState, actionTypes, default, resetUserAcoountVerified, userHasBeenVerified, userHasNotBeenVerified, logInUser, logOutUser, loadAvatar, errorLoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usersStartState", function() { return usersStartState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionTypes", function() { return actionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return users; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetUserAcoountVerified", function() { return resetUserAcoountVerified; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userHasBeenVerified", function() { return userHasBeenVerified; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userHasNotBeenVerified", function() { return userHasNotBeenVerified; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logInUser", function() { return logInUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logOutUser", function() { return logOutUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAvatar", function() { return loadAvatar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorLoading", function() { return errorLoading; });
/* initial state */
var usersStartState = {
  accountVerified: null,
  isLoggedIn: false,
  error: true,
  userAvatar: ''
};
/* action types */

const actionTypes = {
  RESET_USER_ACCOUNT_IS_VERIFIED: 'RESET_USER_ACCOUNT_IS_VERIFIED',
  USER_ACCOUNT_IS_VERIFIED: 'USER_ACCOUNT_IS_VERIFIED',
  USER_ACCOUNT_NOT_VERIFIED: 'USER_ACCOUNT_NOT_VERIFIED',
  IS_LOGGED_IN: 'IS_LOGGED_IN',
  IS_LOGGED_OUT: 'IS_LOGGED_OUT',
  LOAD_USER_AVATAR: 'LOAD_USER_AVATAR',
  ERROR_LOADING: 'ERROR_LOADING' // LOAD_MULTER_IMAGE: "LOAD_MULTER_IMAGE"

};
/* reducer(s) */

function users(state = usersStartState, action) {
  switch (action.type) {
    case actionTypes.RESET_USER_ACCOUNT_IS_VERIFIED:
      return Object.assign({}, state, {
        accountVerified: null
      });

    case actionTypes.USER_ACCOUNT_IS_VERIFIED:
      return Object.assign({}, state, {
        accountVerified: true
      });

    case actionTypes.USER_ACCOUNT_NOT_VERIFIED:
      return Object.assign({}, state, {
        accountVerified: false
      });

    case actionTypes.IS_LOGGED_IN:
      return Object.assign({}, state, {
        isLoggedIn: true
      });

    case actionTypes.IS_LOGGED_OUT:
      return Object.assign({}, state, {
        isLoggedIn: false
      });

    case actionTypes.LOAD_USER_AVATAR:
      return Object.assign({}, state, {
        error: false,
        userAvatar: action.data
      });

    case actionTypes.ERROR_LOADING:
      return Object.assign({}, state, {
        error: true
      });

    default:
      return state;
  }
}
/* actions */

const resetUserAcoountVerified = () => {
  return {
    type: actionTypes.RESET_USER_ACCOUNT_IS_VERIFIED
  };
};
const userHasBeenVerified = () => {
  return {
    type: actionTypes.USER_ACCOUNT_IS_VERIFIED
  };
};
const userHasNotBeenVerified = () => {
  return {
    type: actionTypes.USER_ACCOUNT_NOT_VERIFIED
  };
};
const logInUser = () => {
  return {
    type: actionTypes.IS_LOGGED_IN
  };
};
const logOutUser = () => {
  return {
    type: actionTypes.IS_LOGGED_OUT
  };
};
const loadAvatar = data => {
  return {
    type: actionTypes.LOAD_USER_AVATAR,
    data
  };
};
const errorLoading = () => {
  return {
    type: actionTypes.ERROR_LOADING
  };
};

/***/ }),

/***/ "./styles/styles.scss":
/*!****************************!*\
  !*** ./styles/styles.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./utils/index.js":
/*!************************!*\
  !*** ./utils/index.js ***!
  \************************/
/*! exports provided: getWidthFactory, validateInputs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWidthFactory", function() { return getWidthFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateInputs", function() { return validateInputs; });
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var indicative_sanitizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! indicative/sanitizer */ "indicative/sanitizer");
/* harmony import */ var indicative_sanitizer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(indicative_sanitizer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var indicative_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! indicative/validator */ "indicative/validator");
/* harmony import */ var indicative_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(indicative_validator__WEBPACK_IMPORTED_MODULE_2__);




function getWidthFactory(isMobileFromSSR) {
  return function () {
    var isSSR = true;
    var ssrValue = isMobileFromSSR ? semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Responsive"].onlyMobile.maxWidth : semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Responsive"].onlyTablet.minWidth;
    return isSSR ? ssrValue : window.innerWidth;
  };
}
function validateInputs(formType, username, setUsernameError, setUsernameFeedback, password, password_confirmation, setPasswordConfirmationError, setPasswordConfirmationFeedback, setPasswordError, setPasswordFeedback, setDisableButton) {
  function getFormValidation(formType) {
    function isLoginOrRegistration() {
      var data = {
        username: username,
        password: password
      };
      var schema = {
        username: 'email',
        // username: [
        //   validations.regex([
        //     new RegExp(
        //       '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
        //     )
        //   ])
        // ],
        password: 'min:7|max:11'
      };
      var messages = {
        email: 'Make sure this is a valid email!!',
        // regex: 'Make sure this is a valid email!!',
        min: 'The value is too short',
        max: 'The value is too long'
      }; // sanitize(data, sanitizeSchema);

      Object(indicative_validator__WEBPACK_IMPORTED_MODULE_2__["validateAll"])(data, schema, messages).then(success => {
        if (success.username) {
          console.log('success.username ', success.username);
          setUsernameError(false);
        }

        if (success.password) {
          console.log('success.password ', success.password);
          setPasswordError(false);
        }

        if (success.username && success.password) {
          console.log('success.username ', success.username);
          setDisableButton(false);
        }
      }).catch(errors => {
        console.log('errors ', errors);

        if (errors[0].field === 'username') {
          setUsernameError(true);
          setDisableButton(true);
          setUsernameFeedback(errors[0].message);
        }

        if (errors[0].field === 'password') {
          setPasswordError(true);
          setDisableButton(true);
          setPasswordFeedback(errors[0].message);
        }
      });
    }

    function isConfirmation() {
      Object(indicative_validator__WEBPACK_IMPORTED_MODULE_2__["validate"])(data, schema, messages).then(success => {
        console.log('success ', success);

        if (success.password === success.password_confirmation) {
          setDisableButton(false), setFormSuccess(true), setFormError(false), setPasswordError(false), setPassword_confirmationError(false);
        }
      }).catch(errors => {
        console.log('errors ', errors);

        if (errors[0].field === 'password') {
          setPasswordError(true);
          setPasswordFeedBack(errors[0].message);
          setDisableButton(true);
          setFormSuccess(false);
          setFormError(true);
        }

        if (errors[0].field !== 'password') {
          setPasswordError(false);
          setPasswordFeedBack('');
        }

        if (errors[0].field === 'password_confirmation') {
          setPasswordConfirmationError(false);
          setPasswordConfirmationFeedback(errors[0].message);
          setDisableButton(true);
          setFormSuccess(false);
          setFormError(true);
        }

        if (errors[0].field !== 'password_confirmation') {
          setPasswordConfirmationError(false);
          setPasswordConfirmationFeedback('');
        }
      });
    }

    function isForgotPassword() {
      var data = {
        username: username
      };
      var sanitizeSchema = {
        username: 'normalize_email'
      };
      var schema = {
        username: 'email'
      };
      var messages = {
        required: 'Make sure to enter the field value',
        email: 'Enter valid email address'
      };
      Object(indicative_validator__WEBPACK_IMPORTED_MODULE_2__["validate"])(data, schema, messages).then(success => {
        if (success.username) {
          console.log('success.username ', success.username);
          setUsernameError(false);
          setDisableButton(false);
        }
      }).catch(errors => {
        console.log('errors ', errors);

        if (errors[0].validation === 'email') {
          const {
            message
          } = errors[0];
          setUsernameError(true);
          setDisableButton(true);
          setUsernameFeedback(message);
        }
      });
    }

    function isUpdatePassword() {
      var data = {
        password: password,
        password_confirmation: password_confirmation
      };
      var schema = {
        password: 'min:4|max:11|string',
        password_confirmation: 'required|min:4|max:11|string|same:password'
      };
      var messages = {
        required: 'Make sure to enter the field value',
        min: 'Password is too short.',
        max: 'Password is too long.',
        same: 'Password must match.'
      }; // extend('username', {
      //   async: true
      // });

      Object(indicative_validator__WEBPACK_IMPORTED_MODULE_2__["validate"])(data, schema, messages).then(success => {
        console.log('success ', success); // if (success.password) {
        //   setPasswordError(false);
        //   // if (success.password_confirmation) {
        //   //   setPasswordConfirmationError(false);
        //   // }
        //   if (success.password === success.password_confirmation) {
        //     console.log('success.username ', success.username);
        //     setPasswordConfirmationError(false);
        //     setDisableButton(false);
        //     setPasswordConfirmationError(false);
        //   }
        // }
      }).catch(errors => {
        console.log('errors ', errors);

        if (errors[0].field === 'password') {
          setPasswordError(true);
          setPasswordFeedback(errors[0].message);
          setDisableButton(true);
        }

        if (errors[0].field === 'password_confirmation') {
          setPasswordConfirmationError(true);
          setPasswordConfirmationFeedback(errors[0].message);
          setDisableButton(true);
        }
      });
    }

    var Forms = {
      Login: isLoginOrRegistration,
      Registration: isLoginOrRegistration,
      ForgotPassword: isForgotPassword,
      UpdatePassword: isUpdatePassword
    };

    try {
      //  setFormError(false);
      Forms[formType]();
    } catch (error) {
      console.log(error);
    }
  }

  return getFormValidation(formType);
}

/***/ }),

/***/ 3:
/*!*******************************!*\
  !*** multi ./pages/index.jsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/antonio-pavicevac-ortiz/Dropbox/developer_folder/hillfinder/pages/index.jsx */"./pages/index.jsx");


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "indicative/sanitizer":
/*!***************************************!*\
  !*** external "indicative/sanitizer" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("indicative/sanitizer");

/***/ }),

/***/ "indicative/validator":
/*!***************************************!*\
  !*** external "indicative/validator" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("indicative/validator");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "semantic-ui-react":
/*!************************************!*\
  !*** external "semantic-ui-react" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("semantic-ui-react");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map