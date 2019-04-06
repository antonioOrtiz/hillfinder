import React, { Component } from 'react'
import Router from 'next/router'
import { login } from 'next-authentication'

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
// import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleIsLoggedInClick = this.handleIsLoggedInClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({})
  }

  handleChange(event) {
    var { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleIsLoggedInClick() {
    var { isLoggedIn } = this.state
    !isLoggedIn ? this.setState({ isLoggedIn: true }) : this.setState({ isLoggedIn: false })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { username, password } = this.state

    try {
      const response = await window.fetch('http://localhost:8016/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.ok) {
        const { token } = await response.json()
        const loginOptions = {
          token,
          cookieOptions: { expires: 1 },
          callback: () => Router.push('/users')
        }
        login(loginOptions)
      } else {
        // eslint-disable-next-line no-console
        console.log('Login failed.')
      }
    } catch (error) {
      console.log('Implementation or Network error.')
    }
  }

  render() {
    var { username, password, isLoggedIn } = this.state
    return (
      <div className='login-form'>
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>
          {`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
        </style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              {/* <Image src='/logo.png' /> Log-in to your account */}
              {isLoggedIn ? `Register for an account` : ` Log-in to your account`}
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  name='username'
                  value={username}
                  onChange={this.handleChange}
                />

                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={password}
                  onChange={this.handleChange}
                />
                <Button color='teal' fluid size='large'>
                  {isLoggedIn ? `Register` : `Log-in`}
                </Button>
              </Segment>
            </Form>
            {!isLoggedIn
              ? <Message>
                New to us?
                <a onClick={this.handleIsLoggedInClick} href='#'> Register!</a>
              </Message>
              : <Message>
                <a onClick={this.handleIsLoggedInClick} href='#'>Back to Login</a>
              </Message>
            }
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

Login.propTypes = {}

export default Login
