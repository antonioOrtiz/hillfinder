import React, { Component } from 'react'
import { Loader, Dimmer, Transition, Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link';
import { login } from 'next-authentication'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logInUser } from '../../store/reducers/users/index'

class LoginForm extends Component {
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
   isLoading: true,
  }

  this.handleChange = this.handleChange.bind(this)
  this.handleBlur = this.handleBlur.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)

 }

 componentDidMount() {
  this.setState({ isLoading: false })
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

  this.setState({
   isLoading: true
  })

  var error = false;
  var { username, password, isLoading } = this.state;
  var { history } = this.props

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

  return window.fetch('http://localhost:8016/users/login', {
   method: 'POST',
   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
   body: JSON.stringify({ username, password })
  })
   .then((response) => {
    if (response.ok) {

     const { token } = response.clone();

     const loginOptions = {
      token,
      cookieOptions: { expires: 1 },
      callback: () => history.push('/profile')
     }

     setTimeout(() => {
      this.props.logInUser()

      login(loginOptions);
     }, 5000)

     this.setState({
      username: username, password: '', formError: false, formSuccess: true, isLoading: false
     })

    } else if (!response.ok) {
     if (response.status === 404) {
      // console.log("response.status ", response.status);
      // { console.log("isLoading 2", isLoading) }
      this.setState({
       formError: true, formSuccess: false, isLoading: false
      });
      return;
     }
    }

    return response;
   })
   .catch(err => console.dir(err))

 }

 render() {
  var { username, password, usernameError, passwordError, formSuccess, formError, duration, isLoading } = this.state;
  // console.log("LoginForm this.props ", this.props);

  var { isLoggedIn } = this.props;

 // console.log("isLoggedIn ", isLoggedIn);
  // { console.log('isLoggedIn', isLoggedIn) }
  (formSuccess === true) ? isLoggedIn = true : isLoggedIn = false;

  return (<div className='login-form'> {

  }<style>{`body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`} </style>

   <Grid textAlign='center'
    style={{ height: '100%' }}
    verticalAlign='middle' >
    <Grid.Column style={{ maxWidth: 450 }}>
     <Header as='h2'
      color='teal'
      textAlign='center'>
      Log-in to your account
     </Header>

     <Form size='large'
      onSubmit={this.handleSubmit}
      error={formError}>


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
        <Message error content='Password is incorrect, please try again.' />
       </Transition>

       <Button color='teal'
        fluid size='large'
        disabled={!username || !password}>
        Log-in
       </Button>

       <Transition visible={formError}
        unmountOnHide={true}
        animation='scale'
        duration={duration}>

        {isLoading ?
         <Dimmer active inverted>
          <Loader />
         </Dimmer>
         :
         <Message
          error
          centered="true" header='This email does not exist...'
          content='Please re-enter another email address, or  click the link below to register.' />
        }
       </Transition>



       <Transition visible={formSuccess}
        unmountOnHide={true}
        animation='scale'
        duration={duration}>
        {isLoading ?
         <Dimmer active inverted>
          <Loader />
         </Dimmer>
         :
         <Message
          success
          header='Your have successfully logged in.'
          content='Welcome to Hillfinder!' />
        }
       </Transition>

      </Segment>
     </Form>

     {formError ?
      <Transition visible={formError}
       animation='scale'
       duration={1000}>
       <Message>
        <Link href="/register">
         <a>Register</a>
        </Link> </Message>
      </Transition>
      : null
     }
    </Grid.Column> </Grid> </div>
  )
 }
}

function mapStateToProps(state) {
 console.log("state ", state);
 const { users } = state
 console.log("users ", users);
 const { isLoggedIn } = users
  console.log("isLoggedIn ", isLoggedIn);
 return { isLoggedIn }
}
const mapDispatchToProps = dispatch =>
 bindActionCreators({ logInUser }, dispatch)

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(LoginForm)
