import { Responsive } from 'semantic-ui-react';
import { validate, validateAll } from 'indicative/validator';
import axios from 'axios';

export function getWidthFactory(isMobileFromSSR) {
  return function() {
    var isSSR = typeof window === 'undefined';
    var ssrValue = isMobileFromSSR
      ? Responsive.onlyMobile.maxWidth
      : Responsive.onlyTablet.minWidth;
    return isSSR ? ssrValue : window.innerWidth;
  };
}

export function validateInputs(
  formType,
  username,
  setUsernameError,
  setUsernameFeedback,
  password,
  password_confirmation,
  setPasswordConfirmationError,
  setPasswordConfirmationFeedback,
  setPasswordError,
  setPasswordFeedback,
  setDisableButton,
  setFormSuccess,
  setFormError
) {
  function getFormValidation(formType) {
    function isLoginOrRegistration() {
      var data = {
        username: username,
        password: password
      };

      var schema = {
        username: 'required|email',
        password: 'required|min:7|max:11'
      };
      var messages = {
        email: 'Make sure this is a valid email',
        required: 'This is a required field.',
        min: 'The password is too short. Minimum 7 characters.',
        max: 'The password is too long. Maximum 11 characters.'
      };

      validateAll(data, schema, messages)
        .then(success => {
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
        })
        .catch(errors => {
          console.log('errors ', errors);
          if (errors[0].field === 'username') {
            setUsernameError(true);
            setUsernameFeedback(errors[0].message);
            setDisableButton(true);
            setFormSuccess(false);
          }

          if (errors[0].field === 'password') {
            setPasswordError(true);
            setPasswordFeedback(errors[0].message);
            setDisableButton(true);
            setFormSuccess(false);
          }
        });
    }

    function isConfirmation() {
      validate(data, schema, messages)
        .then(success => {
          console.log('success ', success);
          if (success.password === success.password_confirmation) {
            setDisableButton(false),
              setFormSuccess(true),
              setFormError(false),
              setPasswordError(false),
              setPassword_confirmationError(false);
          }
        })
        .catch(errors => {
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
      validate(data, schema, messages)
        .then(success => {
          if (success.username) {
            console.log('success.username ', success.username);
            setUsernameError(false);
            setDisableButton(false);
          }
        })
        .catch(errors => {
          console.log('errors ', errors);
          if (errors[0].validation === 'email') {
            const { message } = errors[0];
            setUsernameError(true);
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
        password: 'required|min:4|max:11|string',
        password_confirmation: 'required|min:7|max:11|string|same:password'
      };
      var messages = {
        required: 'Make sure to enter the field value',
        min: 'The password is too short. Minimum 7 characters.',
        max: 'The password is too long. Maximum 11 characters.',
        same: 'Passwords must match.'
      };

      validateAll(data, schema, messages)
        .then(success => {
          console.log('success ', success);

          if (success.password) {
            setPasswordError(false);
            setDisableButton(false);
          }

          if (success.password === success.password_confirmation) {
            console.log('success.username ', success.username);
            setPasswordError(false);
            setPasswordConfirmationError(false);
          }
        })
        .catch(errors => {
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
      Forms[formType]();
    } catch (error) {}
  }

  return getFormValidation(formType);
}

export function logOutUserSession() {
  axios
    .get('/users/logout')
    .then(response => {
      if (response.status === 200) {
        console.log('you have been logged out');
      }
    })
    .catch(error => {
      console.log('error ', error);
    });
}

export function getUserAvatar() {
  return axios
    .get('/users/user_avatar')
    .then(response => {
      if (response.status === 200) {
        // console.log('response ', response);
        if (!response.data.hasOwnProperty('avatar_info')) {
          return '/static/uploads/profile-avatars/placeholder.jpg';
        }
        return response.data.avatar_info.secure_url;
      }
    })
    .catch(function(error) {
      console.log(`error in /users/user_avatar`);
    });
}
