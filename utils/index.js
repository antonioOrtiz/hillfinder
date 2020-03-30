import { Responsive } from 'semantic-ui-react';
import { sanitize, validateAll } from 'indicative/validator';

export function getWidthFactory(isMobileFromSSR) {
  return function() {
    var isSSR = typeof window === 'undefined';
    var ssrValue = isMobileFromSSR
      ? Responsive.onlyMobile.maxWidth
      : Responsive.onlyTablet.minWidth;
    return isSSR ? ssrValue : window.innerWidth;
  };
}

export function validateInputs(state, component) {
  var { password, password_confirmation } = state;

  var data = {
    password: password,
    password_confirmation: password_confirmation
  };

  console.log('data ', data);

  var schema = {
    password: 'required|min:4|max:11|string',
    password_confirmation: 'required|min:4|max:11|string|same:password'
  };

  var messages = {
    required: 'Make sure to enter the field value',
    min: 'Password is too short.',
    max: 'Password is too long.',
    same: 'Password must match.'
  };

  validateAll(data, schema, messages)
    .then(success => {
      console.log('success ', success);
      if (success.password === success.password_confirmation) {
        component.setState({
          disableButton: false,
          formSuccess: true,
          formError: false,
          passwordError: false,
          password_confirmationError: false
        });
      }
    })
    .catch(errors => {
      console.log('errors ', errors);
      var { error } = errors[0];
      if (errors[0].field === 'password') {
        component.setState({
          passwordError: true,
          passwordFeedback: errors[0].message,
          disableButton: true,
          formSuccess: false,
          formError: true
        });
      }

      if (errors[0].field !== 'password') {
        component.setState({
          passwordError: false,
          passwordFeedback: ''
        });
      }

      if (errors[0].field === 'password_confirmation') {
        component.setState({
          password_confirmationError: true,
          password_confirmationFeedback: errors[0].message,
          disableButton: true,
          formSuccess: false,
          formError: true
        });
      }

      if (errors[0].field !== 'password_confirmation') {
        component.setState({
          password_confirmationError: false,
          password_confirmationFeedback: ''
        });
      }
    });
}
