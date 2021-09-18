import React from 'react';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOutUser } from '../../store/reducers/users/index';
import { modalStateOn, modalStateOff } from '../../store/reducers/ui/index';

function MyModal({
  message,
  modalActive,
  isAlertModal,
  modalStateOff,
  logOutUser,
  affirmativeUsed
}) {
  return (
    <>
      <Modal
        dimmer={'blurring'}
        centered={true}
        size={'mini'}
        open={modalActive}
        onClose={() => modalStateOff()}
      >
        <Modal.Header>
          <p>{message}</p>
        </Modal.Header>
        <Modal.Actions>
          {isAlertModal ? (
            <Button
              color="black"
              onClick={() => modalStateOff()}
              content={affirmativeUsed}
            />
          ) : (
            <>
              <Button color="black" onClick={() => modalStateOff()}>
                No
              </Button>
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content={affirmativeUsed}
                onClick={() => {
                  modalStateOff();
                  logOutUser();
                  window.localStorage.clear();
                }}
              />
            </>
          )}
        </Modal.Actions>
      </Modal>
    </>
  );
}

MyModal.propTypes = {
  message: PropTypes.string,
  affirmativeUsed: PropTypes.string
};

function mapStateToProps(state) {
  const { ui } = state;
  const { modalActive } = ui;

  return { modalActive };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ logOutUser, modalStateOn, modalStateOff }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyModal);
