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
import { logInUser } from '../../store/reducers/users/index';
import { validate } from 'indicative/validator';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeUp: 'fade up',
      duration: 500,
      password: '',
      confirmPassword: '',
      passwordError: false,
      confirmPasswordError: false,
      formSuccess: false,
      formError: false,
      isLoading: true
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.validateInputs = this.validateInputs.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handlePasswordChange(event) {
    var error = false;

    if (this.validateInputs(event)) {
      error = true;
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }

    if (error) {
      this.setState({ formSuccess: false });
      return;
    }
  }

  handleConfirmPassword(event) {
    var error = false;

    if (this.validateInputs(event)) {
      error = true;
      this.setState({ confirmPasswordError: true });
    } else {
      this.setState({ confirmPasswordError: false });
    }

    if (error) {
      this.setState({ formSuccess: false });
      return;
    }
  }

  validateInputs(event) {
    var { password, confirmPassword } = this.state;
    var { name, value } = event.target;

    var data = {
      password,
      confirmPassword
    };

    var rules = {};
    rules[name] = 'required|min:4|max:10';

    if (rules['confirmPassword']) {
      rules.confirmPassword = rules['confirmPassword'].concat(`|name:password`);
    }
    var messages = {
      'password.min': 'Password is too short.',
      'password.max': 'Password is too long.',
      'confirmPassword.min': 'Password is too short.',
      'confirmPassword.max': 'Password is too long.'
    };

    validate(data, rules, messages)
      .then(feedback => console.log(feedback))
      .catch(errors => console.log('foo', errors));

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    var { password } = this.state;

    axios
      .post('http://localhost:8016/users/reset_password', {
        password: password
      })
      .then(response => {
        console.log('response', response);
        if (response.status === 200) {
          this.setState({
            password: '',
            formError: false,
            formSuccess: true,
            isLoading: false
          });
        }
      })
      .catch(
        function(error) {
          console.log(error);
          if (error.response) {
            if (response.status === 404) {
              this.setState({
                formError: true,
                formSuccess: false,
                isLoading: false
              });

              return;
            }

            console.log('error.response.data', error.response.data);
            console.log('error.response.headers', error.response.headers);
          }
        }.bind(this)
      );
  }

  render() {
    var {
      password,
      confirmPassword,
      passwordError,
      confirmPasswordError,
      formSuccess,
      formError,
      duration,
      isLoading
    } = this.state;

    var { isLoggedIn } = this.props;

    console.log('isLoggedIn ', isLoggedIn);
    formSuccess === true ? (isLoggedIn = true) : (isLoggedIn = false);

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

            <Form size="large" onSubmit={this.handleSubmit} error={formError}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="New password, 6 - 16 characters"
                  name="password"
                  value={password}
                  onChange={this.handlePasswordChange}
                  error={passwordError}
                />
                <Transition visible={passwordError} animation="scale" duration={duration}>
                  <Message error content="Passwords must be greater than 3 characters" />
                </Transition>

                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Confirm new password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleConfirmPassword}
                  error={confirmPasswordError}
                />

                <Transition
                  visible={confirmPasswordError}
                  animation="scale"
                  duration={duration}
                >
                  <Message error content="Passwords must match!" />
                </Transition>

                <Button color="green" fluid size="large" disabled={!password}>
                  Update password
                </Button>

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
                      header="You have successfully changed your password; You will recieve a confirmation email shortly"
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
}

function mapStateToProps(state) {
  console.log('state ', state);
  const { users } = state;
  console.log('users ', users);
  const { isLoggedIn } = users;
  console.log('isLoggedIn ', isLoggedIn);
  return { isLoggedIn };
}
const mapDispatchToProps = dispatch => bindActionCreators({ logInUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
