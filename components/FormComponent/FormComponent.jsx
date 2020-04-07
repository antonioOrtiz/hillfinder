import React, { useState, useEffect, useCallback } from 'react';

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
  resetUserAcoountVerified
} from '../../store/reducers/users/index';

import { Link } from 'react-router-dom';
import { validateInputs } from '../../utils/index';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
  var [disableButton, setDisableButton] = useState(true);
  var [isLoading, setIsLoading] = useState(false);
  var [responseMessage, setResponseMessage] = useState({});
  var [tokenExpired, setTokenExpired] = useState(false);
  var [responseCodeSuccess, setResponseCodeSuccess] = useState(false);
  var [error, setError] = useState(false);

  function isConfirmationForm() {
    useEffect(() => {
      axios
        .get(`http://localhost:8016/users/confirmation/${match.params.token}`)
        .then(response => {
          if (response.status === 200) {
            setError(false);
            setResponseMessage(response.data.msg);
            // setTimeout(() => {
            //   userHasBeenVerified();
            // }, 1000);
          }
        })
        .catch(function(error) {
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
                  <Message error content={usernameFeedback} />
                </Transition>

                <Button color="green" fluid size="large" disabled={disableButton}>
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
                />
                <Transition visible={usernameError} animation="scale" duration={duration}>
                  <Message error content={usernameFeedback} />
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
                />
                <Transition visible={passwordError} animation="scale" duration={duration}>
                  <Message error content={passwordFeedback} />
                </Transition>
                <Button color="green" fluid size="large" disabled={disableButton}>
                  Log-in
                </Button>
                <br />
                <Link to="/forgot_password">Forgot password?</Link>

                <Transition
                  visible={accountVerified === false}
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
                      warning
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

            <Form
              size="large"
              onSubmit={e => handleSubmit(e, formType)}
              error={userNameDup || formError}
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
                  <Message error content={usernameFeedback} />
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
                  <Message error content={passwordFeedback} />
                </Transition>

                <Button color="green" fluid size="large" disabled={disableButton}>
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
    console.log('disableButton ', disableButton);
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
                  error={passwordConfirmationError}
                />

                <Transition
                  visible={passwordConfirmationError}
                  animation="scale"
                  duration={duration}
                >
                  <Message error content={passwordConfirmationFeedback} />
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

  function forgotPasswordSubmit() {
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
      .catch(function(error) {
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
    axios
      .post('http://localhost:8016/users/login', {
        username: username,
        password: password
      })
      .then(response => {
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
      })
      .catch(function(error) {
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

  var isGenericUseEffect = useEffect(() => {
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
      setDisableButton
    );
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
  const { users } = state;
  const { accountVerified, isLoggedIn } = users;

  return { accountVerified, isLoggedIn };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { logInUser, userHasBeenVerified, userHasNotBeenVerified, resetUserAcoountVerified },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent);
