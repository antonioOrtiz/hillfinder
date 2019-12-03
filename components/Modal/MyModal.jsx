import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Button, Modal, Transition } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOutUser, modalStateOn, modalStateOff  } from '../../store/index'



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
  const { modalActive } = this.props

  console.log("this.props in Modal ", this.props);

   return (
    <>

      <Modal dimmer={'blurring'} size={'mini'} open={modalActive} onClose={this.close}>
        <Modal.Header>
         <p>Are you sure you want to log out of your account?</p>
        </Modal.Header>
        <Modal.Actions>
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
          content='Yes'
         onClick={() => { this.close(); this.logOutUser() }}
         />
        </Modal.Actions>
      </Modal>
    </>
   )
 }
}




function mapStateToProps(state) {
 const { modalActive } = state
 return { modalActive }
}
const mapDispatchToProps = dispatch =>
 bindActionCreators({ logOutUser, modalStateOn, modalStateOff }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
