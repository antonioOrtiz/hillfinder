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
import { Link } from 'react-router-dom';

import { validateInputs } from '../../utils/index';

class UpdatePasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeUp: 'fade up',
      duration: 500,
      password: '',
      password_confirmation: '',
      passwordError: false,
      password_confirmationError: false,
      formSuccess: false,
      formError: false,
      isLoading: true,
      disableButton: true,
      tokenExpired: false,
      responseMessage: {},
      responseCodeSuccess: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputValidators = this.inputValidators.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }
  inputValidators() {
    validateInputs(this.state, this);
  }

  handleChange(e) {
    var { name, value } = e.target;
    this.setState({ [name]: value }, this.inputValidators);
  }

  handleSubmit(event) {
    event.preventDefault();
    var { token } = this.props.match.params;
    var { password, password_confirmation } = this.state;

    axios
      .post(`http://localhost:8016/users/reset_password/${token}`, {
        password: password
      })
      .then(response => {
        console.log('response', response);
        if (response.status === 200) {
          this.setState({
            password: '',
            password_confirmation: '',
            formError: false,
            formSuccess: true,
            isLoading: false,
            responseCodeSuccess: true,
            responseMessage: response.data.msg
          });
        }
      })
      .catch(
        function(error) {
          console.log(error);
          if (error.response) {
            if (error.response.status === 401) {
              this.setState({
                formError: true,
                formSuccess: false,
                isLoading: false,
                tokenExpired: true,
                responseMessage: error.response.data.msg
              });
            }
          }
        }.bind(this)
      );
  }

  render() {
    var {
      password,
      password_confirmation,
      passwordError,
      passwordFeedback,
      password_confirmationError,
      password_confirmationFeedback,
      responseCodeSuccess,
      formError,
      duration,
      disableButton,
      isLoading,
      tokenExpired,
      responseMessage
    } = this.state;

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
                  type="password"
                  value={password}
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
}

export default UpdatePasswordForm;
