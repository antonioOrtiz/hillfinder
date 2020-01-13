import React, { PureComponent } from 'react';

import { Button, Card, Icon, Image, Grid, Input, Segment, Form } from 'semantic-ui-react'

import ImageModal from '../Modal/MyModal.jsx'
import axios from 'axios';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadAvatar, errorLoading } from '../../store/reducers/users/index'
import { avatarModalStateOn } from '../../store/reducers/ui/index'

class ImageUploader extends PureComponent {
 constructor(props) {
  super(props);

  this.state = {
   userAvatar : this.props.userAvatar
  }

  this.uploadImage = this.uploadImage.bind(this);
 }

 fileInputRef = React.createRef();


 setDefaultImage() {
  var defaultImage = '../../static/profile-avatars/assets/default-img.jpg';
  this.loadAvatarImage(defaultImage)
 }

 loadAvatarImage(img) {
  var { loadAvatar } = this.props;
  loadAvatar(img)
 }

 fileChange = (e) => {
  this.uploadImage(e, "multer");
 }

 uploadImage(e, method) {
  e.stopPropagation();

  const { avatarModalStateOn, errorLoading } = this.props

  if (method === "multer") {

   let imageFormObj = new FormData();

   imageFormObj.append("imageName", "multer-image-" + Date.now());
   imageFormObj.append("imageData", e.target.files[0]);

   this.loadAvatarImage(window.URL.createObjectURL(e.target.files[0]))

   var config = { headers: { 'content-type': 'multipart/form-data' } }
   axios.post(`http://localhost:8016/images/uploadmulter`, imageFormObj, config)
    .then((data) => {
     if (data.data.success) {
      console.log("data ", data);
      avatarModalStateOn();
     }
    })
    .catch((err) => {
     if (err.response.status === 500) {
      console.log(err.response.status);
      avatarModalStateOn();
      this.setDefaultImage()
      errorLoading();
     }
    });
  }
 }

 render() {

  var { userAvatar, avatarModalActive, error } = this.props;

  console.log("avatarModalActive ", avatarModalActive);

  var ImageLoaded;
    if (avatarModalActive) {
      ImageLoaded = <ImageModal
        key="AlertModal"
        isAlertModal={avatarModalActive}
        affirmativeUsed="OK!"
        message="Your image has been uploaded succesfully"
     />
    } else if (avatarModalActive && error){
     ImageLoaded =  <ImageModal
      key="AlertModal"
      isAlertModal={avatarModalActive}
      affirmativeUsed="OK!"
      message="There was an error uploading your image, file size was to big!"
     />
    }

  return <>
      <Segment>
        <Card fluid>
         <Image wrapped ui={false} src={userAvatar || this.setDefaultImage()} alt="upload-image" />
          <Segment>
           <Form encType="multipart/form-data">
            <Form.Field>
             <Button
              content="Edit your Avatar!"
              labelPosition="left"
              icon="file"
              onClick={() => this.fileInputRef.current.click()}
             />
             <input
              ref={this.fileInputRef}
              type="file"
              name="avatar"
              hidden
              onChange={this.fileChange}
             />
            </Form.Field>
           </Form>
          </Segment>
          <Card.Content>

           <Card.Header>Charly</Card.Header>
           <Card.Meta>
            <span className='date'>Joined in 2015</span>
           </Card.Meta>
           <Card.Description>
            Charly
           </Card.Description>
           </Card.Content>
           <Card.Content extra>
           <a>
            <Icon name='user' />
            22 Friends
           </a>
          </Card.Content>
       </Card>
     </Segment>
   {ImageLoaded}

  </>;
 }
}

function mapStateToProps(state) {
 const { ui, users } = state
 const { userAvatar, error } = users
 const { avatarModalActive } = ui

 return { userAvatar, avatarModalActive, error }
}

const mapDispatchToProps = dispatch =>
 bindActionCreators({ loadAvatar, errorLoading, avatarModalStateOn }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader)
