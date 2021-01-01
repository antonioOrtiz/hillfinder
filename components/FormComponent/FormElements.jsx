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
import { Link } from 'react-router-dom';

export default function GenericInputForm({
  formHeader,
  handleSubmit,
  formType,
  formError,
  formSuccess,
  accountNotVerified,
  username,
  userNameDup,
  handleChange,
  usernameError,
  duration,
  usernameFeedback,
  password,
  password_confirmation,
  passwordConfirmationError,
  passwordConfirmationFeedback,
  passwordError,
  passwordFeedback,
  disableButton,
  buttonName,
  isLoading,
  responseMessage,
  tokenExpired,
  responseCodeSuccess
}) {
  let form;
  switch (buttonName) {
    case 'Log-in':
      form = (
        <div className="login-form">
          <style>
            {`body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`}{' '}
          </style>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" textAlign="center">
                {formHeader}
              </Header>

              <Form
                size="large"
                onSubmit={e => handleSubmit(e, formType)}
                error={formError}
              >
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address, e.g. joe@schmoe.com"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                  <Transition
                    visible={usernameError}
                    animation="scale"
                    duration={duration}
                  >
                    <Message error content={usernameFeedback} />
                  </Transition>
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => handleChange(e)}
                  />
                  <Transition
                    visible={passwordError}
                    animation="scale"
                    duration={duration}
                  >
                    <Message error content={passwordFeedback} />
                  </Transition>
                  <Button fluid size="large" disabled={disableButton}>
                    {buttonName}
                  </Button>
                  <br />
                  <Link to="/forgot_password">Forgot password?</Link>

                  <Transition
                    visible={accountNotVerified && !formError}
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
                        warning
                        color="yellow"
                        centered="true"
                        header={responseMessage[0]}
                        content={responseMessage[1]}
                      />
                    )}
                  </Transition>

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
                        header={responseMessage[0]}
                        content={responseMessage[1]}
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
                        header={responseMessage[0]}
                        content={responseMessage[1]}
                      />
                    )}
                  </Transition>
                </Segment>
              </Form>
              {formError ? (
                <Transition visible={formError} animation="scale" duration={1000}>
                  {isLoading ? (
                    <Dimmer active inverted>
                      <Loader />
                    </Dimmer>
                  ) : (
                    <Message>
                      <Link to="/register">Register</Link>{' '}
                    </Message>
                  )}
                </Transition>
              ) : null}
            </Grid.Column>{' '}
          </Grid>{' '}
        </div>
      );
      break;
    case 'Register':
      form = (
        <div className="login-form">
          <style>
            {`body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`}{' '}
          </style>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" textAlign="center">
                {formHeader}
              </Header>

              <Form
                size="large"
                onSubmit={e => handleSubmit(e, formType)}
                error={userNameDup || formError}
              >
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address, e.g. joe@schmoe.com"
                    name="username"
                    type="text"
                    value={username}
                    onChange={e => handleChange(e)}
                    error={usernameError}
                  />

                  <Transition
                    visible={usernameError}
                    animation="scale"
                    duration={duration}
                  >
                    <Message error content={usernameFeedback} />
                  </Transition>

                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => handleChange(e)}
                    error={passwordError}
                  />

                  <Transition
                    visible={passwordError}
                    animation="scale"
                    duration={duration}
                  >
                    <Message error content={passwordFeedback} />
                  </Transition>

                  <Button fluid size="large" disabled={disableButton}>
                    Register
                  </Button>

                  <Transition
                    visible={userNameDup || formError}
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
                        header={responseMessage[0]}
                        content={responseMessage[1]}
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
                        header={responseMessage[0]}
                        content={responseMessage[1]}
                      />
                    )}
                  </Transition>
                </Segment>
              </Form>

              {formSuccess ? (
                <Transition visible={formSuccess} animation="scale" duration={1000}>
                  <Message>
                    <Link to="/login">Login</Link>{' '}
                  </Message>
                </Transition>
              ) : null}
            </Grid.Column>{' '}
          </Grid>{' '}
        </div>
      );
      break;
    case 'Update your password':
      form = (
        <div className="login-form">
          {' '}
          {}
          <style>
            {`body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`}{' '}
          </style>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" textAlign="center">
                Update your password
              </Header>
              <Message color="olive">
                Create a new password for your account and sign in. For your security,
                choose a password you haven't used before
              </Message>

              <Form
                size="large"
                onSubmit={e => handleSubmit(e, formType)}
                error={formError}
              >
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="New password, 6 - 16 characters"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => handleChange(e)}
                    error={passwordError}
                  />
                  <Transition
                    visible={passwordError}
                    animation="scale"
                    duration={duration}
                  >
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
                    onChange={e => handleChange(e)}
                    error={passwordConfirmationError}
                  />

                  <Transition
                    visible={passwordConfirmationError}
                    animation="scale"
                    duration={duration}
                  >
                    <Message error content={passwordConfirmationFeedback} />
                  </Transition>

                  <Button fluid size="large" disabled={disableButton}>
                    {buttonName}
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
      break;
    case 'Yes, send a link':
      form = (
        <div className="login-form">
          <style>
            {`body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`}{' '}
          </style>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" textAlign="center">
                {formHeader}
              </Header>
              <Message color="olive">
                Not a problem. Just enter your email address below. If it's registered
                with Hillfinder, we'll send you a link to reset your password.{' '}
              </Message>

              <Form
                size="large"
                onSubmit={e => handleSubmit(e, formType)}
                error={formError}
              >
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address, e.g. joe@schmoe.com"
                    name="username"
                    value={username}
                    onChange={e => handleChange(e)}
                    error={usernameError}
                  />

                  <Transition
                    visible={usernameError}
                    animation="scale"
                    duration={duration}
                  >
                    <Message error content={usernameFeedback} />
                  </Transition>

                  <Button fluid size="large" disabled={disableButton}>
                    {buttonName}
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
                        header={responseMessage[0]}
                        content={responseMessage[1]}
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
                        header={responseMessage[0]}
                        content={responseMessage[1]}
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
      break;
    default:
      '';
  }

  return <>{form}</>;
}
