import React, { useState, useEffect } from 'react';

import { Loader, Dimmer, Transition, Message } from 'semantic-ui-react';
import axios from 'axios';

// import { confirmUser } from '../../utils/index';
import {
  userHasBeenVerified,
  userHasNotBeenVerified,
  resetCountNotVerified
} from '../../store/reducers/users/index';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Confirmation({
  match,
  accountVerified,
  userHasBeenVerified,
  resetCountNotVerified
}) {
  var [duration, setDuration] = useState(500);
  var [responseMessage, setResponseMessage] = useState({});
  var [error, setError] = useState(false);

  var ResponseComponent;

  useEffect(() => {
    axios
      .get(`http://localhost:8016/users/confirmation/${match.params.token}`)
      .then(response => {
        if (response.status === 200) {
          setError(false);
          setResponseMessage(response.data.msg);
        }
      })
      .catch(function(error) {
        if (error.response.status === 404) {
          // Token not in database
          resetCountNotVerified();
          setResponseMessage(error.response.data.msg);
          setError(true);
        }
        if (error.response.status === 400) {
          userHasBeenVerified();
          setResponseMessage(error.response.data.msg);
          setError(true);
        }
      });
  }, []);

  const isNull = value => typeof value === 'object' && !value;

  console.log('accountVerified ', accountVerified);
  console.log('match', match);
  console.log('responseMessage', responseMessage);
  return (
    <div className="login-form">
      {error === false ? (
        <Transition unmountOnHide={true} animation="scale" duration={duration}>
          <Message success header={responseMessage[0]} />
        </Transition>
      ) : (
        ''
      )}

      {accountVerified === true && error === true ? (
        <Transition unmountOnHide={true} animation="scale" duration={duration}>
          <Message error header={responseMessage[0]} />
        </Transition>
      ) : (
        ''
      )}
      {isNull(accountVerified) && error === true ? (
        <Transition unmountOnHide={true} animation="scale" duration={duration}>
          <Message error header={responseMessage[0]} />
        </Transition>
      ) : (
        ''
      )}
    </div>
  );
}

function mapStateToProps(state) {
  const { users } = state;
  const { accountVerified } = users;

  return { accountVerified };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { userHasBeenVerified, userHasNotBeenVerified, resetCountNotVerified },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirmation);
