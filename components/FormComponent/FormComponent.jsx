import React, { useState, useEffect } from 'react';
import MyHeader from '../Header/Header.jsx';

import {
  Loader,
  Input,
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
import { Container } from 'next/app';

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
  var Forms = {
    Hillfinders: [isHillfindersForm],
    Confirmation: [isConfirmationForm],
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

  function isHillfindersForm() {
    return (
      <Container>
        <MyHeader content="Go find a hill!" textAlign={'center'} />
        <br />

        <Grid columns={2} stackable className="hillfinder-container">
          <Grid.Column>
            <p style={{ fontSize: '1.33em' }}>Where you are...</p>
            <Input fluid icon="search" placeholder="Search..." />
          </Grid.Column>
          <Grid.Column>
            <p style={{ fontSize: '1.33em' }}>
              Where you wanna go; Hopefully on a downhill...
            </p>
            <Input fluid icon="search" placeholder="Search..." />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }

  function isConfirmationForm() {
    useEffect(() => {
      axios
        .get(`/users/confirmation/${match.params.token}`)
        .then(response => {
          if (response.status === 200) {
            setError(false);
            setResponseMessage(response.data.msg);
          }
        })
        .catch(function(error) {
          if (error.response.status === 404) {
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

        {accountNotVerified === false && error === true ? (
          <Transition unmountOnHide={true} animation="scale" duration={duration}>
            <Message error header={responseMessage[0]} />
          </Transition>
        ) : (
          ''
        )}
        {isNull(accountNotVerified) && error === true ? (
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
    console.log('accountNotVerified ', accountNotVerified);
    useEffect(() => {}, []);

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
                  visible={accountNotVerified}
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
                  type="text"
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
        console.log(error);
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

  function loginSubmit() {
    axios
      .post('/users/login', {
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
        password: password
      })
      .then(response => {
        console.log('response', response);
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
        console.log('error ', error);
        console.log('error.response', error.response);

        console.log('error.response.status', error.response.status);
        if (error.response.status === 500) {
          setResponseMessage(error.response.data.msg);
          setIsLoading(false);
          setFormError(true);
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
        console.log('response', response);
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
  }

  function handleSubmit(event, formType) {
    event.preventDefault();

    console.log('before validate');
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
    console.log('after validate');

    return Forms[formType][1]();
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
    { logInUser, userHasBeenVerified, userHasNotBeenVerified, resetUserAcoountVerified },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent);
