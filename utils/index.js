import { Responsive } from 'semantic-ui-react';
import { sanitize } from 'indicative/sanitizer';

import { extend, validate, validateAll } from 'indicative/validator';
import { validations } from 'indicative/validator';

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
  setDisableButton
) {
  function getFormValidation(formType) {
    function isLoginOrRegistration() {
      var data = {
        username: username,
        password: password
      };

      var schema = {
        username: [
          validations.regex([
            new RegExp(
              '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
            )
          ])
        ],
        password: 'min:7|max:11'
      };
      var messages = {
        regex: 'Make sure this is a valid email!!',
        min: 'The value is too short',
        max: 'The value is too long'
      };

      // sanitize(data, sanitizeSchema);

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
      };
      // extend('username', {
      //   async: true
      // });

      validate(data, schema, messages)
        .then(success => {
          console.log('success ', success);
          // if (success.password) {
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
        })
        .catch(errors => {
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
