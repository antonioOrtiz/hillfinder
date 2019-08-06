import React, { Component } from 'react'
import { Transition, Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import Router from 'next/router'

class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fadeUp: 'fade up',
      // isLoggedIn: true,
      duration: 500,
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      formSuccess: false,
      userNameDup: false,
      error: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    // this.handleIsLoggedInClick = this.handleIsLoggedInClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleErrors = this.handleErrors.bind(this)

  }

  handleChange(event) {
    var { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  // handleIsLoggedInClick() {
  //   this.state.isLoggedIn = this.state.isLoggedIn ? this.setState({ isLoggedIn: true }) : this.setState({ isLoggedIn: false })
  // }

  handleBlur() {
    var { username, password, usernameError } = this.state

    var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if ((!username.match(mailFormat)) && (!usernameError)) {
      this.setState({ usernameError: true, error: true, })
    } else {
      this.setState({ usernameError: false })
    }
    if (password.length <= 8) {
      this.setState({ passwordError: true, error: true })
    } else {
      this.setState({ passwordError: false, error: false })
    }
  }

  handleErrors(response) {
    if (!response.ok) {
      if (response.status === 409) {
        console.log("response.status ", response.status);
        this.setState({
          userNameDup: true, error: true
        })
      }
      throw Error(response.statusText);

    }

    return response;
  }

  handleSubmit(event) {
    event.preventDefault()

    var { username, password } = this.state

    var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!username.match(mailFormat)) {
      this.setState({ usernameError: true, error: true })
    } else {
      this.setState({ usernameError: false, error: false })
    }

    if (password.length <= 8) {
      this.setState({ passwordError: true, error: true })
    } else {
      this.setState({ passwordError: false, error: false, formSuccess: true })
    }


    console.log(`error ${this.state.error}`)
    if (this.state.error == false) {
      this.setState({ formSuccess: true })
    }


    window.fetch('http://localhost:8016/users/registration', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ username_email: username, password: password })
    })
      .then(this.handleErrors)
      .then(function (response) {
        console.log(`response ${response}`)
        return response.json()
      }).then(function (data) {
        console.log('User created:', data)
      }).catch(function (error) {
        console.log(error);
      });

  }

  render() {
    var { username, password, usernameError, passwordError, formSuccess, userNameDup, error } = this.state;

    return (<div className='login-form'> {
      /*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */
    }<style>{`body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`} </style>

      <Grid textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle' >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2'
            color='teal'
            textAlign='center'>
            Register for an account
            {/* {isLoggedIn ? `Register for an account` : ` Log-in to your account`} */}
          </Header>

          <Form size='large'
            onSubmit={this.handleSubmit}
            error={formSuccess || usernameError || passwordError}
            success={!formSuccess}>
            <Segment stacked>
              <Form.Input fluid icon='user'
                iconPosition='left'
                placeholder='E-mail address, e.g. joe@schmoe.com'
                name='username'
                value={username}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                error={usernameError}
              />

              <Transition visible={usernameError}
                animation='scale'
                duration={500}>
                <Message error content='Email is in incorrect format e.g. joe@schmoe.com' />
              </Transition>

              <Form.Input fluid icon='lock'
                iconPosition='left'
                placeholder='Password'
                name='password'
                value={password}
                onChange={this.handleChange}
                error={passwordError}
              />

              <Transition visible={passwordError}
                animation='scale'
                duration={500}>
                <Message error content='Paswword needs to be greater than eight characters.' />
              </Transition>

              <Button color='teal'
                fluid size='large'
                disabled={!this.state.username || !this.state.password}>
                Register
                {/* {isLoggedIn ? `Register` : `Log-in`} */}
              </Button>

              <Transition visible={formSuccess && !userNameDup}
                animation='scale'
                duration={500}>
                <Message success header='Your user registration was successful.'
                  content='You may now log-in with the username you have chosen.' />
              </Transition>

              <Transition visible={userNameDup && error}
                animation='scale'
                duration={500}>
                <Message error centered="true" header='This email exists.'
                  content='Please re-enter another email address.' />
              </Transition>



            </Segment>
          </Form>

          {/* {!isLoggedIn ?
            <Message >
              New to us ?
                <a onClick={this.handleIsLoggedInClick}
                href='#' > Register! </a> </Message > : <Message>
              <a onClick={this.handleIsLoggedInClick}
                href='#' > Back to Login </a> </Message>
          }  */}
        </Grid.Column> </Grid> </div >
    )
  }
}
export default RegisterForm
