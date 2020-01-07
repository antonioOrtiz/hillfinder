import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOutUser  } from '../../store/reducers/users/index'
import { modalStateOn, modalStateOff  } from '../../store/reducers/ui/index'


class MyModal extends Component {

 close = () => {
  const { modalStateOff } = this.props
  modalStateOff();
 }

 logOutUser = () => {
  const { logOutUser } = this.props
  logOutUser()
 }

 render() {
  const { modalActive, isAlertModal } = this.props

   return (
    <>
      <Modal dimmer={'blurring'} centered={true} size={'mini'} open={modalActive} onClose={this.close}>
        <Modal.Header>
         <p>{this.props.message}</p>
        </Modal.Header>
        <Modal.Actions>
         {this.props.isAlertModal ?
         <Button
          color='black'
          onClick={this.close}
          content={this.props.affirmativeUsed}
         />
         :
        <>
         <Button
           color='black'
           onClick={this.close}
          >
           No
          </Button>
          <Button
           positive
           icon='checkmark'
           labelPosition='right'
           content={this.props.affirmativeUsed}
           onClick={() => { this.close(); this.logOutUser() }}
          />
        </>
         }
        </Modal.Actions>
      </Modal>
    </>
   )
 }
}

MyModal.propTypes = {
 message: PropTypes.string,
 affirmativeUsed: PropTypes.string
}

function mapStateToProps(state) {
 const { ui } = state
 const { modalActive } = ui

 return { modalActive }
}
const mapDispatchToProps = dispatch =>
 bindActionCreators({ logOutUser, modalStateOn, modalStateOff }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
