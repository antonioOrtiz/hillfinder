import React, { useState, useEffect } from 'react';

import {
  Loader,
  Dimmer,
  Transition,
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';

import axios from 'axios';

import {
  logInUser,
  userHasBeenVerified,
  userHasNotBeenVerified,
  resetCountNotVerified
} from '../../store/reducers/users/index';

import { Link } from 'react-router-dom';
import { validateInputs } from '../../utils/index';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function FormComponent({
  formType,
  match,
  isLoggedIn,
  accountVerified,
  userHasBeenVerified,
  resetCountNotVerified
}) {
  function isConfirmationForm() {
    useEffect(() => {
      axios
        .get(`http://localhost:8016/users/confirmation/${match.params.token}`)
        .then(response => {
          if (response.status === 200) {
            setError(false);
            setResponseMessage(response.data.msg);
          }
        })
        .catch(function(error) {
          if (error.response.status === 404) {
            // Token not in database
            resetCountNotVerified();
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
    return (
      <div className="login-form">
        {error === false ? (
          <Transition unmountOnHide={true} animation="scale" duration={duration}>
            <Message success header={responseMessage[0]} />
          </Transition>
        ) : (
          ''
        )}

        {accountVerified === true && error === true ? (
          <Transition unmountOnHide={true} animation="scale" duration={duration}>
            <Message error header={responseMessage[0]} />
          </Transition>
        ) : (
          ''
        )}
        {isNull(accountVerified) && error === true ? (
          <Transition unmountOnHide={true} animation="scale" duration={duration}>
            <Message error header={responseMessage[0]} />
          </Transition>
        ) : (
          ''
        )}
      </div>
    );
  }

  function isForgotPasswordForm() {
    return (
      <div className="login-form">
        {' '}
        {}
        <style>
          {`body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`}{' '}
        </style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="green" textAlign="center">
              Forgot yee password?
            </Header>
            <Message color="olive">
              Not a problem. Just enter your email address below. If it's registered with
              Hillfinder, we'll send you a link to reset your password.{' '}
            </Message>

            <Form
              size="large"
              onSubmit={e => handleSubmit(e, formType)}
              error={formError}
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address, e.g. joe@schmoe.com"
                  name="username"
                  value={username}
                  onChange={e => handleChange(e)}
                  error={usernameError}
                />

                <Transition visible={usernameError} animation="scale" duration={duration}>
                  <Message
                    error
                    content="username_Email is in incorrect format e.g. joe@schmoe.com"
                  />
                </Transition>

                <Button color="green" fluid size="large" disabled={!username}>
                  Yes, send a link
                </Button>

                <Transition
                  visible={formError}
                  unmountOnHide={true}
                  animation="scale"
                  duration={duration}
                >
                  {isLoading ? (
                    <Dimmer active inverted>
                      <Loader />
                    </Dimmer>
                  ) : (
                    <Message
                      error
                      centered="true"
                      header={responseMessage[0]}
                      content={responseMessage[1]}
                    />
                  )}
                </Transition>

                <Transition
                  visible={formSuccess}
                  unmountOnHide={true}
                  animation="scale"
                  duration={duration}
                >
                  {isLoading ? (
                    <Dimmer active inverted>
                      <Loader />
                    </Dimmer>
                  ) : (
                    <Message
                      success
                      header={responseMessage[0]}
                      content={responseMessage[1]}
                    />
                  )}
                </Transition>
              </Segment>
            </Form>

            {formError ? (
              <Transition visible={formError} animation="scale" duration={1000}>
                <Message>
                  <Link to="/register">Register</Link>{' '}
                </Message>
              </Transition>
            ) : null}
          </Grid.Column>{' '}
        </Grid>{' '}
      </div>
    );
  }

  function isLoginForm() {
    return (
      <div className="login-form">
        {' '}
        {}
        <style>
          {`body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`}{' '}
        </style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="green" textAlign="center">
              Log-in to your account
            </Header>

            <Form
              size="large"
              onSubmit={e => handleSubmit(e, formType)}
              error={formError}
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address, e.g. joe@schmoe.com"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  error={usernameError}
                />
                <Transition visible={usernameError} animation="scale" duration={duration}>
                  <Message
                    error
                    content="username_Email is in incorrect format e.g. joe@schmoe.com"
                  />
                </Transition>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => handleChange(e)}
                  error={passwordError}
                />
                <Transition visible={passwordError} animation="scale" duration={duration}>
                  <Message error content="Password is incorrect, please try again." />
                </Transition>
                <Button
                  color="green"
                  fluid
                  size="large"
                  disabled={!username || !password}
                >
                  Log-in
                </Button>
                <br />
                <Link to="/forgot_password">Forgot password?</Link>

                <Transition
                  visible={accountVerified === false ? true : false}
                  unmountOnHide={true}
                  animation="scale"
                  duration={duration}
                >
                  {isLoading ? (
                    <Dimmer active inverted>
                      <Loader />
                    </Dimmer>
                  ) : (
                    <Message
                      color="yellow"
                      centered="true"
                      header={responseMessage[0]}
                      content={responseMessage[1]}
                    />
                  )}
                </Transition>

                <Transition
                  visible={formError}
                  unmountOnHide={true}
                  animation="scale"
                  duration={duration}
                >
                  {isLoading ? (
                    <Dimmer active inverted>
                      <Loader />
                    </Dimmer>
                  ) : (
                    <Message
                      error
                      centered="true"
                      header={responseMessage[0]}
                      content={responseMessage[1]}
                    />
                  )}
                </Transition>

                <Transition
                  visible={formSuccess}
                  unmountOnHide={true}
                  animation="scale"
                  duration={duration}
                >
                  {isLoading ? (
                    <Dimmer active inverted>
                      <Loader />
                    </Dimmer>
                  ) : (
                    <Message
                      success
                      header={responseMessage[0]}
                      content={responseMessage[1]}
                    />
                  )}
                </Transition>
              </Segment>
            </Form>

            {formError ? (
              <Transition visible={formError} animation="scale" duration={1000}>
                {isLoading ? (
                  <Dimmer active inverted>
                    <Loader />
                  </Dimmer>
                ) : (
                  <Message>
                    <Link to="/register">Register</Link>{' '}
                  </Message>
                )}
              </Transition>
            ) : null}
          </Grid.Column>{' '}
        </Grid>{' '}
      </div>
    );
  }

  function isRegisterForm() {
    return (
      <div className="login-form">
        {' '}
        {}
        <style>
          {`body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`}{' '}
        </style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="green" textAlign="center">
              Register for an account
              {/* {isLoggedIn ? `Register for an account` : ` Log-in to your account`} */}
            </Header>

            {console.log('formSuccess 1', formSuccess)}
            <Form
              size="large"
              onSubmit={e => handleSubmit(e, formType)}
              error={userNameDup || formError}
            >
              {console.log('formSuccess 2', formSuccess)}

              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address, e.g. joe@schmoe.com"
                  name="username"
                  value={username}
                  onChange={e => handleChange(e)}
                  error={usernameError}
                />

                <Transition visible={usernameError} animation="scale" duration={duration}>
                  <Message
                    error
                    content="username_Email is in incorrect format e.g. joe@schmoe.com"
                  />
                </Transition>

                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => handleChange(e)}
                  error={passwordError}
                />

                <Transition visible={passwordError} animation="scale" duration={duration}>
                  <Message
                    error
                    content="Password needs to be greater than eight characters."
                  />
                </Transition>

                <Button
                  color="green"
                  fluid
                  size="large"
                  disabled={!username || !password}
                >
                  Register
                </Button>

                <Transition
                  visible={userNameDup || formError}
                  unmountOnHide={true}
                  animation="scale"
                  duration={duration}
                >
                  {isLoading ? (
                    <Dimmer active inverted>
                      <Loader />
                    </Dimmer>
                  ) : (
                    <Message
                      error
                      centered="true"
                      header={responseMessage[0]}
                      content={responseMessage[1]}
                    />
                  )}
                </Transition>

                <Transition
                  visible={formSuccess}
                  unmountOnHide={true}
                  animation="scale"
                  duration={duration}
                >
                  {isLoading ? (
                    <Dimmer active inverted>
                      <Loader />
                    </Dimmer>
                  ) : (
                    <Message
                      success
                      header={responseMessage[0]}
                      content={responseMessage[1]}
                    />
                  )}
                </Transition>
              </Segment>
            </Form>

            {formSuccess ? (
              <Transition visible={formSuccess} animation="scale" duration={1000}>
                <Message>
                  <Link to="/login">Login</Link>{' '}
                </Message>
              </Transition>
            ) : null}
          </Grid.Column>{' '}
        </Grid>{' '}
      </div>
    );
  }

  function isUpdatePasswordForm() {
    return (
      <div className="login-form">
        {' '}
        {}
        <style>
          {`body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`}{' '}
        </style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="green" textAlign="center">
              Update your password
            </Header>
            <Message color="olive">
              Create a new password for your account and sign in. For your security,
              choose a password you haven't used before
            </Message>

            <Form
              size="large"
              onSubmit={e => handleSubmit(e, formType)}
              error={formError}
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="New password, 6 - 16 characters"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => handleChange(e)}
                  error={passwordError}
                />
                <Transition visible={passwordError} animation="scale" duration={duration}>
                  <Message error content={passwordFeedback} />
                </Transition>

                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Confirm new password"
                  name="password_confirmation"
                  type="password"
                  value={password_confirmation}
                  onChange={e => handleChange(e)}
                  error={password_confirmationError}
                />

                <Transition
                  visible={password_confirmationError}
                  animation="scale"
                  duration={duration}
                >
                  <Message error content={password_confirmationFeedback} />
                </Transition>

                <Button color="green" fluid size="large" disabled={disableButton}>
                  Update password
                </Button>

                <Transition
                  visible={tokenExpired}
                  unmountOnHide={true}
                  animation="scale"
                  duration={duration}
                >
                  {isLoading ? (
                    <Dimmer active inverted>
                      <Loader />
                    </Dimmer>
                  ) : (
                    <Message error header={responseMessage[0]} />
                  )}
                </Transition>

                <Transition
                  visible={tokenExpired}
                  unmountOnHide={true}
                  animation="scale"
                  duration={duration}
                >
                  {isLoading ? (
                    <Dimmer active inverted>
                      <Loader />
                    </Dimmer>
                  ) : (
                    <Link to="/forgot_password">reset password link?</Link>
                  )}
                </Transition>

                <Transition
                  visible={responseCodeSuccess}
                  unmountOnHide={true}
                  animation="scale"
                  duration={duration}
                >
                  {isLoading ? (
                    <Dimmer active inverted>
                      <Loader />
                    </Dimmer>
                  ) : (
                    <Message
                      success
                      header={responseMessage[0]}
                      content={responseMessage[1]}
                    />
                  )}
                </Transition>
              </Segment>
            </Form>
          </Grid.Column>{' '}
        </Grid>{' '}
      </div>
    );
  }

  var Forms = {
    Confirmation: isConfirmationForm,
    ForgotPassword: isForgotPasswordForm,
    Login: isLoginForm,
    Register: isRegisterForm,
    UpdatePassword: isUpdatePasswordForm
  };

  var [fadeUp, setFadeUp] = useState('fade up');
  var [duration, setDuration] = useState(500);
  var [name, setName] = useState('');
  var [username, setUsername] = useState('');
  var [usernameError, setUsernameError] = useState(false);
  var [userNameDup, setUserNameDup] = useState(false);
  var [password, setPassword] = useState('');
  var [passwordFeedback, setPasswordFeedBack] = useState('');
  var [passwordError, setPasswordError] = useState(false);
  var [password_confirmation, setPasswordConfirmation] = useState('');
  var [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
  var [passwordConfirmationFeedback, setPasswordConfirmationFeedback] = useState('');
  var [formSuccess, setFormSuccess] = useState(false);
  var [formError, setFormError] = useState(false);
  var [disableButton, setDisableButton] = useState(true);
  var [isLoading, setIsLoading] = useState(false);
  var [responseMessage, setResponseMessage] = useState({});
  var [tokenExpired, setTokenExpired] = useState(false);
  var [responseCodeSuccess, setResponseCodeSuccess] = useState(false);
  var [error, setError] = useState(false);

  function handleChange(e) {
    var { name, value } = e.target;
    if (name === username) {
      setUsername(value);
    }
    if (name === password) {
      setPassword(value);
    }
    validateInputs(
      fadeUp,
      setFadeUp,
      duration,
      setDuration,
      name,
      setName,
      username,
      setUsername,
      password,
      history,
      setPassword,
      usernameError,
      setUsernameError,
      passwordError,
      setPasswordError,
      passwordConfirmationError,
      setPasswordConfirmationError,
      passwordConfirmationFeedback,
      setPasswordConfirmationFeedback,
      passwordFeedback,
      setPasswordFeedBack,
      formSuccess,
      setFormSuccess,
      formError,
      setFormError,
      disableButton,
      setDisableButton,
      isLoading,
      setIsLoading,
      responseMessage,
      setResponseMessage,
      error,
      setError,
      logInUser,
      isLoading,
      history,
      userHasBeenVerified,
      userHasNotBeenVerified,
      resetCountNotVerified
    );
  }

  function handleSubmit(event, formType) {
    event.preventDefault();
    var Forms = {
      Confirmation: loginSubmit,
      ForgotPassword: forgotPasswordSubmit,
      Login: loginSubmit,
      Register: registerSubmit,
      UpdatePassword: updatePasswordSubmit
    };
    function forgotPasswordSubmit() {
      var { token } = match.params;
      axios
        .post(`http://localhost:8016/users/reset_password/${token}`, {
          password: password
        })
        .then(response => {
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
        })
        .catch(function(error) {
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

      axios
        .post('http://localhost:8016/users/forgot_password', {
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
        .catch(
          function(error) {
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
          }.bind(this)
        );
    }

    function loginSubmit() {
      axios
        .post('http://localhost:8016/users/login', {
          username: username,
          password: password
        })
        .then(response => {
          console.log('response', response);
          if (response.status === 200) {
            userHasBeenVerified();
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
          }
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.status === 401) {
              userHasNotBeenVerified();
              setUsername('');
              setPassword('');
              setFormError(false);
              setFormSuccess(true);
              setIsLoading(false);
              setResponseMessage(error.response.data.msg);
            }
            if (error.response.status === 404) {
              resetCountNotVerified();
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
      axios
        .post('http://localhost:8016/users/registration', {
          username: username,
          password: password
        })
        .then(response => {
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
        })
        .catch(function(error) {
          console.log('error ', error);
          if (error.response.status === 409) {
            setUserNameDup(true);
            setResponseMessage(error.response.data.msg);

            setFormError(true);
            setFormSuccess(true);
            setIsLoading(false);

            console.log('userNameDup in error ', userNameDup);
            console.log('formError in error', formError);
            console.log('Error in registration', error);
          }
        });
    }
    function updatePasswordSubmit() {
      var { token } = match.params;
      axios
        .post(`http://localhost:8016/users/reset_password/${token}`, {
          password: password
        })
        .then(response => {
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
        })
        .catch(function(error) {
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

    return Forms[formType]();
  }

  return Forms[formType]();
}

function mapStateToProps(state) {
  const { users } = state;
  const { accountVerified, isLoggedIn } = users;

  return { accountVerified, isLoggedIn };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { logInUser, userHasBeenVerified, userHasNotBeenVerified, resetCountNotVerified },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent);
