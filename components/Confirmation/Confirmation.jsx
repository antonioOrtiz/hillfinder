import React, { Component } from 'react';

import { Loader, Dimmer, Transition, Message } from 'semantic-ui-react';
import axios from 'axios';

import { hasBeenVerified } from '../../store/reducers/users/index';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Confirmation extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      duration: 500,
      confirmedParam: false,
      responseMessage: {},
      error: false
    };
  }

  componentDidMount() {
    this._isMounted = true;

    var { token } = this.props.match.params;
    var { hasBeenVerified } = this.props;
    axios
      .get(`http://localhost:8016/users/confirmation/${token}`)
      .then(response => {
        console.log('response', response);
        if (response.status === 200) {
          hasBeenVerified();
          this.setState({
            responseMessage: response.data.msg
          });
          return;
        }

        // this.setState(() => ({ confirmedParam }));
      })
      .catch(
        function(error) {
          if (error.response.status === 404) {
            this.setState({
              responseMessage: error.response.data.msg,
              error: true
            });
            return;
          }
          if (error.response.status === 400) {
            this.setState({
              responseMessage: error.response.data.msg,
              error: true
            });
            return;
          }
        }.bind(this)
      );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    var { responseMessage, duration, error } = this.state;
    console.log('responseMessage ', responseMessage);

    console.log('this.props ', this.props);
    var { isAccountVerified } = this.props;
    console.log('isAccountVerified ', isAccountVerified);
    return (
      <div className="login-form">
        <Transition
          visible={isAccountVerified}
          unmountOnHide={true}
          animation="scale"
          duration={duration}
        >
          {!isAccountVerified ? (
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          ) : (
            <Message success={!error} error={error} header={responseMessage[0]} />
          )}
        </Transition>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state;
  const { isAccountVerified } = users;

  return { isAccountVerified };
}

const mapDispatchToProps = dispatch => bindActionCreators({ hasBeenVerified }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirmation);
