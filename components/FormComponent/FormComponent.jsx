import { useState, useEffect } from 'react';

import GenericInputForm from './FormElements.jsx';

import { Message } from 'semantic-ui-react';

import {
  logInUser,
  userHasBeenVerified,
  userHasNotBeenVerified,
  resetUserAcoountVerified,
  errorLoading
} from '../../store/reducers/users/index';

import { validateInputs } from '../../utils/index';

import axios from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userState, userDispatch } from '../Context/UserContext';

function FormComponent({
  formType,
  match,
  history,
  logInUser,
  accountNotVerified,
  userHasBeenVerified,
  userHasNotBeenVerified,
  resetUserAcoountVerified
}) {
  /* This is an object which is used to store the relevant form views for each page/component  */
  var Forms = {
    Confirmation: [isConfirmation],
    ForgotPassword: [isForgotPasswordForm, forgotPasswordSubmit],
    Login: [isLoginForm, loginSubmit],
    Registration: [isRegisterForm, registerSubmit],
    UpdatePassword: [isUpdatePasswordForm, updatePasswordSubmit]
  };

  var [duration, setDuration] = useState(500);
  var [username, setUsername] = useState('');
  var [usernameFeedback, setUsernameFeedback] = useState('');
  var [usernameError, setUsernameError] = useState(false);
  var [userNameDup, setUserNameDup] = useState(false);
  var [password, setPassword] = useState('');
  var [passwordFeedback, setPasswordFeedback] = useState('');
  var [passwordError, setPasswordError] = useState(false);
  var [password_confirmation, setPasswordConfirmation] = useState('');
  var [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
  var [passwordConfirmationFeedback, setPasswordConfirmationFeedback] = useState('');
  var [formSuccess, setFormSuccess] = useState(false);
  var [formError, setFormError] = useState(false);
  var [disableButton, setDisableButton] = useState(false);
  var [isLoading, setIsLoading] = useState(false);
  var [responseMessage, setResponseMessage] = useState({});
  var [tokenExpired, setTokenExpired] = useState(false);
  var [responseCodeSuccess, setResponseCodeSuccess] = useState(false);
  var [error, setError] = useState(false);

  var [current_location, setCurrentLocation] = useState('');
  var [current_destination, setCurrentDestination] = useState('');

  var { state } = userState();
  var { dispatch } = userDispatch();
  var { id } = state;

  function loginSubmit() {
    axios
      .post('/users/login', {
        username: username,
        password: password,
        withCredentials: true
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: 'setUserId',
            payload: { id: response.data.userId }
          });
          setTimeout(() => {
            logInUser();
            history.push('/profile');
          }, 3000);

          setUsername('');
          setPassword('');
          setFormError(false);
          setFormSuccess(true);
          setIsLoading(false);
          setResponseMessage(response.data.msg);
          userHasBeenVerified();
        }
      })
      .catch(function(error) {
        if (error.response.statusText === 'Unauthorized') {
          setUsername('');
          setPassword('');
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
          setResponseMessage([
            `Incorrect password`,
            `The password you've entered with this email/username is incorrect, please reset it using the link above`
          ]);
        }

        if (error.response) {
          if (error.response.status === 401 && error.response.data !== 'Unauthorized') {
            setUsername('');
            setPassword('');
            setFormError(true);
            setFormSuccess(false);
            setIsLoading(false);
            setResponseMessage(error.response.data.msg);
          }

          if (error.response.status === 403) {
            userHasNotBeenVerified();
            setUsername('');
            setPassword('');
            setFormError(false);
            setFormSuccess(false);
            setIsLoading(false);
            setResponseMessage(error.response.data.msg);
          }
          if (error.response.status === 404) {
            setUsername('');
            setPassword('');
            setFormError(true);
            setFormSuccess(false);
            setIsLoading(false);
            setResponseMessage(error.response.data.msg);
          }
          if (error.response.status === 422) {
            setUsername('');
            setPassword('');
            setFormError(true);
            setFormSuccess(false);
            setIsLoading(false);
            setResponseMessage(error.response.data.msg);
          }
        }
      });
  }

  function registerSubmit() {
    axios
      .post('/users/registration', {
        username: username,
        password: password,
        withCredentials: true
      })
      .then(response => {
        if (response.status === 201) {
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
      })
      .catch(function(error) {
        if (error.response.status === 500) {
          setResponseMessage(error.response.data.msg);
          setFormError(true);
          setIsLoading(false);
        }

        if (error.response.status === 401) {
          setResponseMessage(error.response.data.msg);
          setIsLoading(false);
          setFormError(true);
        }

        if (error.response.status === 409) {
          setUserNameDup(true);
          setResponseMessage(error.response.data.msg);
          setIsLoading(false);
        }
      });
  }

  function updatePasswordSubmit() {
    var { token } = match.params;
    axios
      .post(`/users/reset_password/${token}`, {
        password: password
      })
      .then(response => {
        if (response.status === 201) {
          setPassword('');
          setPasswordConfirmation('');
          setFormError(false);
          setFormSuccess(true);
          setIsLoading(false);
          setResponseCodeSuccess(true);
          setResponseMessage(response.data.msg);
        }
      })
      .catch(function(error) {
        if (error.response) {
          if (error.response.status === 401) {
            setFormError(true);
            setFormSuccess(false);
            setIsLoading(false);
            setResponseMessage(error.response.data.msg);
            setTokenExpired(true);
          }
        }
      });
  }

  function handleChange(e) {
    e.persist();
    setFormError(false);
    setFormSuccess(false);
    setUsernameError(false);
    setPasswordError(false);
    setDisableButton(false);

    resetUserAcoountVerified();
    setUserNameDup(false);

    if (e.target.name === 'username') {
      setUsername(e.target.value);
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }

    if (e.target.name === 'password_confirmation') {
      setPasswordConfirmation(e.target.value);
    }

    if (e.target.name === 'current_location') {
      setCurrentLocation(e.target.value);
    }

    if (e.target.name === 'current_destination') {
      setCurrentDestination(e.target.value);
    }
  }

  function handleSubmit(event, formType) {
    event.preventDefault();

    validateInputs(
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
    );

    return Forms[formType][1]();
  }

  function isConfirmation() {
    var [showApi, setShowApi] = useState(true);

    useEffect(() => {
      var isSubscribed = true;
      axios
        .get(`/users/confirmation/${match.params.token}`, {
          cancelToken: source.token
        })
        .then(response => {
          if (response.status === 200) {
            isSubscribed ? setResponseMessage(response.data.msg) : null;
          }
        })
        .catch(function(error) {
          if (error.response.status === 404) {
            resetUserAcoountVerified();
            setError(true);
            isSubscribed ? setResponseMessage(error.response.data.msg) : null;
          }

          if (error.response.status === 400) {
            userHasBeenVerified();
            setError(true);
            isSubscribed ? setResponseMessage(error.response.data.msg) : null;
          }
        });

      return () => {
        //when the component unmounts

        isSubscribed = false;
        setShowApi(prev => !prev);
      };
    }, []);

    if (error) {
      return showApi && <Message negative header={responseMessage[0]} />;
    }
    return showApi && <Message positive header={responseMessage[0]} />;
  }

  function isLoginForm() {
    useEffect(() => {
      resetUserAcoountVerified();
    }, [id]);

    return (
      <GenericInputForm
        formHeader="Log-in to your account"
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        accountNotVerified={accountNotVerified}
        username={username}
        usernameError={usernameError}
        usernameFeedback={usernameFeedback}
        handleChange={handleChange}
        duration={duration}
        password={password}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        disableButton={disableButton}
        buttonName="Log-in"
        isLoading={isLoading}
        responseMessage={responseMessage}
      />
    );
  }

  function isRegisterForm() {
    return (
      <GenericInputForm
        formHeader="Register for an account"
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        accountNotVerified={accountNotVerified}
        username={username}
        userNameDup={userNameDup}
        usernameError={usernameError}
        usernameFeedback={usernameFeedback}
        handleChange={handleChange}
        duration={duration}
        password={password}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        disableButton={disableButton}
        buttonName="Register"
        isLoading={isLoading}
        responseMessage={responseMessage}
      />
    );
  }

  function isUpdatePasswordForm() {
    return (
      <GenericInputForm
        formHeader="Update your password"
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        accountNotVerified={accountNotVerified}
        username={username}
        userNameDup={userNameDup}
        handleChange={handleChange}
        usernameError={usernameError}
        duration={duration}
        usernameFeedback={usernameFeedback}
        password={password}
        password_confirmation={password_confirmation}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        passwordConfirmationError={passwordConfirmationError}
        passwordConfirmationFeedback={passwordConfirmationFeedback}
        disableButton={disableButton}
        buttonName="Update your password"
        isLoading={isLoading}
        responseMessage={responseMessage}
        tokenExpired={tokenExpired}
        responseCodeSuccess={responseCodeSuccess}
      />
    );
  }

  function isForgotPasswordForm() {
    return (
      <GenericInputForm
        formHeader="Forgot yee password?"
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        accountNotVerified={accountNotVerified}
        username={username}
        userNameDup={userNameDup}
        handleChange={handleChange}
        usernameError={usernameError}
        duration={duration}
        usernameFeedback={usernameFeedback}
        password={password}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        disableButton={disableButton}
        buttonName="Yes, send a link"
        isLoading={isLoading}
        responseMessage={responseMessage}
      />
    );
  }

  function forgotPasswordSubmit() {
    axios
      .post('/users/forgot_password', {
        username: username
      })
      .then(response => {
        if (response.status === 200) {
          setUsername('');
          setResponseMessage(response.data.msg);
          setFormError(false);
          setFormSuccess(true);
          setIsLoading(false);
        }
      })
      .catch(function(error) {
        if (error.response) {
          if (error.response.status === 404) {
            setResponseMessage(error.response.data.msg);
            setFormError(true);
            setFormSuccess(false);
            setIsLoading(false);
          }
        }
      });
  }

  return Forms[formType][0]();
}
function mapStateToProps(state) {
  const { users } = state;
  const { accountNotVerified, isLoggedIn } = users;

  return { accountNotVerified, isLoggedIn };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logInUser,
      userHasBeenVerified,
      userHasNotBeenVerified,
      resetUserAcoountVerified,
      errorLoading
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent);
