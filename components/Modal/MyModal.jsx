import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Button, Modal, Transition } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOutUser } from '../../store/index'



class MyModal extends Component {
 state = { open: false }

 show = (size, dimmer) => () => this.setState({ size, dimmer, open: true })

 close = () => {
  const { handleClick } = this.props
  handleClick();
 }

 logOutUser = () => {
  const { logOutUser } = this.props
  logOutUser()
 }

 render() {
  const { size, dimmer } = this.state
  const { isModalActive } = this.props

  console.log("this.props in Modal ", this.props);

  if (isModalActive){
   return (
    <>
      <Transition
       animation="fade"
       duration={1000000}
       unmountOnHide={true}
       visible={true}
       >
      <Modal dimmer={'blurring'} size={'mini'} open={isModalActive} onClose={this.close}>
        <Modal.Header>
         <p>Are you sure you want to log out of your account?</p>
        </Modal.Header>
        <Modal.Actions>
         <Button
          color='black'
          onClick={() => { this.close }}

         >
          No
       </Button>
         <Button
          positive
          icon='checkmark'
          labelPosition='right'
          content='Yes'
          onClick={() => { this.logOutUser() }}
         />
        </Modal.Actions>
      </Modal>
      </Transition>
    </>
   )
  } else {
   null
  }
 }
}




function mapStateToProps(state) {
 const {logOutUser } = state
 return {logOutUser }
}
const mapDispatchToProps = dispatch =>
 bindActionCreators({ logOutUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
