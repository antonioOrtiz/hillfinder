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
      isLoading: true,
      disableButton: true
    };

    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  validateInputs(event) {
    var { password, passwordError, confirmPassword, confirmPasswordError } = this.state;
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

    validate(data, rules, messages)
      .then(success => {
        console.log('success ', success);
        this.setState({
          passwordError: false,
          passwordFeedback: '',
          confirmPasswordError: false,
          confirmPasswordFeedback: '',
          formError: false,
          formSuccess: true
        });
        if (success.password === success.confirmPassword) {
          this.setState({ disableButton: false });
        } else {
          this.setState({ disableButton: true });
        }
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
          this.setState({
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
          this.setState({
            confirmPasswordError: true,
            confirmPasswordFeedback: errors[0].message,
            formSuccess: false,
            formError: true,
            disableButton: true
          });
        }
      });

    this.setState({
      [name]: value
    });

    console.log('passwordError ', passwordError);

    console.log('confirmPasswordError ', confirmPasswordError);
  }

  handleSubmit(event) {
    event.preventDefault();

    var { password } = this.state;
    console.log('submitted');
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
      passwordFeedback,
      confirmPasswordError,
      confirmPasswordFeedback,
      formSuccess,
      formError,
      duration,
      disableButton,
      isLoading
    } = this.state;

    var { isLoggedIn } = this.props;

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
                  onChange={this.handleChange}
                  onBlur={this.validateInputs}
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
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  onBlur={this.validateInputs}
                  error={confirmPasswordError}
                />

                <Transition
                  visible={confirmPasswordError}
                  animation="scale"
                  duration={duration}
                >
                  <Message error content={confirmPasswordFeedback} />
                </Transition>

                <Button color="green" fluid size="large" disabled={disableButton}>
                  Update password
                </Button>

                <Transition
                  visible={formSuccess && formError}
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
