import React, { Component } from 'react'
import { Loader, Transition, Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link';
import Router from 'next/router'
import { login } from 'next-authentication'
import { connect } from 'react-redux'


class RegisterForm extends Component {
  constructor(props) {
    super(props)

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
      isLoading: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {
    this.setState({isLoading: false})
  }

  handleChange(event) {
    var { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleBlur() {
    var { username } = this.state;
    var error = false;

    var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ((!username.match(mailFormat)) || (!username)) {
      error = true;
      this.setState({ usernameError: true });
    } else {
      this.setState({ usernameError: false, });
    }
  }


  handleSubmit(event) {
    event.preventDefault();

    var error = false;

    var { username, password } = this.state

    var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


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
      this.setState({ passwordError: false })
    }

    if (error) {
      this.setState({ formSuccess: false });
      return;
    }

    return window.fetch('http://localhost:8016/users/registration', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ username_email: username, password: password })
    })
     .then((response)=>{
      if (response.ok) {
       const { token } = response.clone();

       const loginOptions = {
        token,
        cookieOptions: { expires: 1 },
        callback: () => Router.push('/login')
       }
       setTimeout(() => {
        login(loginOptions)
       }, 5000)

       this.setState({
        username: '', password: '', userNameDup: false, formError: false, formSuccess: true
       })

       return response.json();
      } else if (!response.ok) {
       if (response.status === 409) {
        console.log("response.status ", response.status);
        this.setState({
         userNameDup: true, formError: true, formSuccess: false
        });
        return;
       }
      }
      return response;
     })
    .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    var { username, password, usernameError, passwordError, formSuccess, formError, userNameDup, duration, isLoading } = this.state;
   const { state } = this.props
   console.log("isLoggedIn ", state.isLoggedIn);

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

            {console.log("formSuccess 1", formSuccess)}
          <Form size='large'
            onSubmit={this.handleSubmit}
            error={userNameDup || formError}>
            {console.log("formSuccess 2", formSuccess)}


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
                duration={duration}>
                <Message error content='username_Email is in incorrect format e.g. joe@schmoe.com' />
              </Transition>

              <Form.Input fluid icon='lock'
                iconPosition='left'
                placeholder='Password'
                name='password'
                value={password}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                error={passwordError}
              />

              <Transition visible={passwordError}
                animation='scale'
                duration={duration}>
                <Message error content='Password needs to be greater than eight characters.' />
              </Transition>

              <Button color='teal'
                fluid size='large'
                disabled={!username || !password}>
                Register
              </Button>
          {isLoading
          ? <Loader> Loading </Loader>
          : <Transition visible={userNameDup || formError}
                unmountOnHide={true}
                animation='scale'
                duration={duration}>
                <Message
                  error
                  centered="true" header='This email exists.'
                  content='Please re-enter another email address.' />
              </Transition>
          }

          {isLoading
          ? <Loader> Loading </Loader>
          :  <Transition visible={formSuccess}
                unmountOnHide={true}
                animation='scale'
                duration={duration}>
                <Message
                  success
                  header='Your user registration was successful.'
                  content='You may now log-in with the username you have chosen.' />
              </Transition>
          }
            </Segment>
          </Form>

          {formSuccess ?
            <Transition visible={formSuccess}
              animation='scale'
              duration={1000}>
              <Message>
                <Link href="/login">
                  <a>Login</a>
                </Link> </Message>
            </Transition>
            : null
          }
        </Grid.Column> </Grid> </div>
    )
  }
}


const mapStateToProps = state => {
 return {
  state
 }
}

export default connect(mapStateToProps)(RegisterForm)
