import React, { useState, useEffect } from 'react';

import { Loader, Dimmer, Transition, Message } from 'semantic-ui-react';

// import { confirmUser } from '../../utils/index';
import { hasBeenVerified } from '../../store/reducers/users/index';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Confirmation({ match, isAccountVerified, hasBeenVerified }) {
  var [duration, setDuration] = useState(500);
  var [responseMessage, setResponseMessage] = useState({});
  var [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8016/users/confirmation/${match.params.token}`)
      .then(response => {
        if (response.status === 200) {
          hasBeenVerified();
          setResponseMessage(response.data.msg);
        }
      })
      .catch(function(error) {
        if (error.response.status === 404) {
          setResponseMessage(error.response.data.msg);
          setError(true);
        }
        if (error.response.status === 400) {
          setResponseMessage(error.response.data.msg);
          setError(true);
        }
      });
  }, []);

  console.log('isAccountVerified ', isAccountVerified);
  console.log('match', match);
  console.log('responseMessage', responseMessage);
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
