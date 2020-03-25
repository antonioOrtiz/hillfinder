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
import axios from 'axios';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class RegisterForm extends Component {
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
      userNameDup: false,
      responseMessage: {},
      isLoading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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

    var error = false;

    var { username, password, formError, userNameDup } = this.state;

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
    } else {
      this.setState({ passwordError: false });
    }

    if (error) {
      this.setState({ formSuccess: false });
      return;
    }

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

          this.setState({
            username: '',
            password: '',
            responseMessage: response.data.msg,
            userNameDup: false,
            formError: false,
            formSuccess: true,
            isLoading: false
          });
        }
      })
      .catch(
        function(error) {
          if (error.response.status === 409) {
            this.setState({
              userNameDup: true,
              responseMessage: error.response.data.msg,
              formError: true,
              formSuccess: false,
              isLoading: false
            });
            console.log('userNameDup in error ', userNameDup);
            console.log('formError in error', formError);
            console.log('Error in registration', error);

            // console.log('error.response.data', error.response.data);
            // console.log('error.response.headers', error.response.headers);
            return;
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
      userNameDup,
      responseMessage,

      duration,
      isLoading
    } = this.state;

    console.log('RegisterForm this.props ', this.props);
    console.log('userNameDup ', userNameDup);
    console.log('formError ', formError);

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
              onSubmit={this.handleSubmit}
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
                  value={password}
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
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
}

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(mapStateToProps)(RegisterForm);
