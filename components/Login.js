import React, { Component } from 'react'
import { Transition, Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fadeUp: 'fade up',
      isLoggedIn: true,
      duration: 500,
      isVisible: false,
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      formError: true,
      formSuccess: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleIsLoggedInClick = this.handleIsLoggedInClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    var { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleIsLoggedInClick () {
    this.state.isLoggedIn = this.state.isLoggedIn ? this.setState({ isLoggedIn: true }) : this.setState({ isLoggedIn: false })
  }

  handleBlur () {
    var { username, password, usernameError, passwordError } = this.state

    var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var error = false

    if ((!username.match(mailFormat)) && (!usernameError)) {
      this.setState({ usernameError: true })
      error = true
    } else {
      this.setState({ usernameError: false })
    }
  }

  handleSubmit (event) {
    event.preventDefault()

    var { username, password } = this.state

    var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var error = false

    if (!username.match(mailFormat)) {
      this.setState({ usernameError: true })
      error = true
    } else {
      this.setState({ usernameError: false })
    }

    if (password.length <= 8) {
      this.setState({ passwordError: true })
      error = true
    } else {
      this.setState({ passwordError: false })
    }

    console.log(`error ${error}`)
    if (error == false) {
      this.setState({ formError: false, formSuccess: true })
    }

    window.fetch('http://localhost:8016/auth/users', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password: password })
    }).then(function (response) {
      console.log(`response ${response}`)
      return response.json()
    }).then(function (data) {
      console.log('User created:', data)
    })
  }

  render () {
    var { username, password, usernameError, passwordError, formError, formSuccess, isLoggedIn } = this.state
    return (<div className='login-form' > {
      /*
                      Heads up! The styles below are necessary for the correct render of this example.
                      You can do same with CSS, the main idea is that all the elements up to the `Grid`
                      below must have a height of 100%.
                    */
    } <style > {`body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`} </style>

    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center' > {isLoggedIn ? `Register for an account` : ` Log-in to your account`}</Header>

        <Form size='large' onSubmit={this.handleSubmit} error={(formError || formSuccess) || usernameError || passwordError} success={!formError && !formSuccess}>
          <Segment stacked >
            <Form.Input fluid icon='user'
              iconPosition='left'
              placeholder='E-mail address, e.g. joe@schmoe.com'
              name='username'
              value={username}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              error={usernameError}
            />

            <Transition visible={usernameError} animation='scale' duration={500}>
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

            <Transition visible={passwordError} animation='scale' duration={500} >
              <Message error content='Paswword needs to be greater than eight characters.' />
            </Transition>

            <Button color='teal' fluid size='large' disabled={!this.state.username || !this.state.password} > {isLoggedIn ? `Register` : `Log-in`} </Button>

            <Transition visible={(!formError && formSuccess)} animation='scale' duration={500} >
              <Message success header='Your user registration was successful' content='You may now log-in with the username you have chosen' />
            </Transition>

          </Segment>
        </Form>

        {
          !isLoggedIn
            ? <Message >
                New to us ?
              <a onClick={this.handleIsLoggedInClick}
                href='#' > Register! </a> </Message> : <Message >
              <a onClick={this.handleIsLoggedInClick}
                href='#' > Back to Login </a> </Message>
        } </Grid.Column> </Grid> </div>
    )
  }
}
export default Login
