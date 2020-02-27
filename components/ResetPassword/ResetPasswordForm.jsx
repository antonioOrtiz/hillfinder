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
import { Link } from 'react-router-dom';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeUp: 'fade up',
      duration: 500,
      username: '',
      usernameError: false,
      formSuccess: false,
      formError: false,
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
    var { username, isLoading } = this.state;
    var { history } = this.props;

    var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!username.match(mailFormat)) {
      this.setState({ usernameError: true });
      error = true;
    } else {
      this.setState({ usernameError: false });
    }

    if (error) {
      this.setState({ formSuccess: false });
      return;
    }

    axios
      .post('http://localhost:8016/users/reset_password', {
        username: username
      })
      .then(response => {
        console.log('response', response);
        if (response.status === 200) {
          this.setState({
            username: '',
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
      username,
      usernameError,
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
              Forgot yee password?
            </Header>
            <Message color="olive">
              Not a problem. Just enter your email address below. If it's registered with
              Hillfinder, we'll send you a link to reset your password.{' '}
            </Message>

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

                <Button color="green" fluid size="large" disabled={!username}>
                  Reset password
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
                      header="This email does not exist..."
                      content="Please re-enter another email address, or click the link below to register."
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
                      header="You will recieve an email shortly to reset password."
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
