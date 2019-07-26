import { Component } from 'react'
import Router from 'next/router'
import { login } from 'next-authentication'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { username, password } = this.state

    try {
      const response = await fetch('https://apiurl.io', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (response.ok) {
        const { token } = await response.json()
        const loginOptions = {
          token,
          cookieOptions: { expires: 1 },
          callback: () => Router.push('/profile')
        }
        login(loginOptions)
      } else {
        console.log('Login failed.')
      }
    } catch (error) {
      console.log('Implementation or Network error.')
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

export default Login
