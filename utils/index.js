import { Responsive } from 'semantic-ui-react';
import { validate } from 'indicative/validator';

export function getWidthFactory(isMobileFromSSR) {
  return function() {
    var isSSR = typeof window === 'undefined';
    var ssrValue = isMobileFromSSR
      ? Responsive.onlyMobile.maxWidth
      : Responsive.onlyTablet.minWidth;
    return isSSR ? ssrValue : window.innerWidth;
  };
}

export function validateInputs(event, state, setState) {
  var { password, passwordError, confirmPassword, confirmPasswordError } = state;

  console.log('setState ', setState);
  var { name, value } = event.target;

  var data = {
    password,
    confirmPassword
  };

  var rules = {};
  rules[name] = 'required|min:4|max:11|same:password';

  var messages = {
    required: 'Make sure to enter the field value',
    min: 'Password is too short.',
    max: 'Password is too long.',
    same: 'Password must be the same.'
  };

  if (rules.field.password) {
    rules.field.password = 'required|email|min:4|max:11|same:password';
  }

  validate(data, rules, messages)
    .then(success => {
      console.log('success ', success);
      setState({
        passwordError: false,
        passwordFeedback: '',
        confirmPasswordError: false,
        confirmPasswordFeedback: '',
        formError: false,
        formSuccess: true
      });
      if (success.password === success.confirmPassword) {
        setState({ disableButton: false });
      } else {
        setState({ disableButton: true });
      }
      return true;
    })
    .catch(errors => {
      console.log('errors ', errors);
      if (
        (errors[0].validation === 'min' ||
          errors[0].validation === 'max' ||
          errors[0].validation === 'required' ||
          errors[0].validation === 'same') &&
        errors[0].field == 'password'
      ) {
        setState({
          passwordError: true,
          passwordFeedback: errors[0].message,
          formError: true,
          formSuccess: false,
          disableButton: true
        });
      }
      if (
        (errors[0].validation === 'min' ||
          errors[0].validation === 'max' ||
          errors[0].validation === 'required' ||
          errors[0].validation === 'same') &&
        errors[0].field == 'confirmPassword'
      ) {
        setState({
          confirmPasswordError: true,
          confirmPasswordFeedback: errors[0].message,
          formSuccess: false,
          formError: true,
          disableButton: true
        });
      }
    });

  setState({
    [name]: value
  });

  console.log('passwordError ', passwordError);

  console.log('confirmPasswordError ', confirmPasswordError);
}
