import React, { Component } from 'react';
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
// import Link from 'next/link';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  logInUser,
  resetUserAcoountVerified,
  userHasNotBeenVerified,
  userHasBeenVerified
} from '../../store/reducers/users/index';
import { Link } from 'react-router-dom';
import { validate } from 'indicative/validator';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeUp: 'fade up',
      duration: 500,
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      formSuccess: false,
      formError: false,
      isLoading: true,
      responseMessage: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.resetUserAcoountVerified();
    this.setState({ isLoading: false });
  }

  handleChange(event) {
    var { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleBlur() {
    var { username } = this.state;

    var error = false;

    var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!username.match(mailFormat) || !username) {
      error = true;
      this.setState({ usernameError: true });
    } else {
      this.setState({ usernameError: false });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoading: true
    });

    var error = false;
    var { username, password, isLoading } = this.state;
    var { history } = this.props;

    var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!username.match(mailFormat)) {
      this.setState({ usernameError: true });
      error = true;
    } else {
      this.setState({ usernameError: false });
    }

    if (password.length < 8) {
      this.setState({ passwordError: true });
      error = true;
    } else {
      this.setState({ passwordError: false });
    }

    if (error) {
      this.setState({ formSuccess: false });
      return;
    }

    axios
      .post('http://localhost:8016/users/login', {
        username: username,
        password: password
      })
      .then(response => {
        console.log('response', response);
        if (response.status === 200) {
          this.props.userHasBeenVerified();
          setTimeout(() => {
            this.props.logInUser();
            history.push('/profile');
          }, 5000);
          this.setState({
            username: '',
            password: '',
            formError: false,
            formSuccess: true,
            isLoading: false,
            responseMessage: response.data.msg
          });
        }
      })
      .catch(
        function(error) {
          if (error.response) {
            if (error.response.status === 401) {
              this.props.userHasNotBeenVerified();
              this.setState({
                responseMessage: error.response.data.msg,
                username: '',
                password: '',
                formError: false,
                formSuccess: false,
                isLoading: false
              });
            }
            if (error.response.status === 404) {
              this.props.resetUserAcoountVerified();
              this.setState({
                responseMessage: error.response.data.msg,
                username: '',
                password: '',
                formError: true,
                formSuccess: false,
                isLoading: false
              });
            }
            console.log('error.response.data', error.response.data);
            console.log('error.response.headers', error.response.headers);
          }
        }.bind(this)
      );
  }

  render() {
    var {
      username,
      password,
      usernameError,
      passwordError,
      formSuccess,
      formError,
      duration,
      isLoading,
      responseMessage
    } = this.state;
    var { accountVerified } = this.props;
    // formSuccess === true ? (isLoggedIn = true) : (isLoggedIn = false);

    console.log('this.props ', this.props);
    console.log('accountVerified ', accountVerified);
    console.log('responseMessage ', responseMessage);
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

            <Form size="large" onSubmit={this.handleSubmit} error={formError}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address, e.g. joe@schmoe.com"
                  name="username"
                  value={username}
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
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
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
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
}

function mapStateToProps(state) {
  const { users } = state;
  const { isLoggedIn, accountVerified } = users;

  return { isLoggedIn, accountVerified };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { logInUser, resetUserAcoountVerified, userHasNotBeenVerified, userHasBeenVerified },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
