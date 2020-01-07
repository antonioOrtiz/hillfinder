import React, { Component } from 'react';
import './ImageUploader.css';
import ImageModal from '../Modal/MyModal.jsx'
import axios from 'axios';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadAvatar } from '../../store/reducers/users/index'
import { modalStateOn, modalStateOff } from '../../store/reducers/ui/index'

class ImageUploader extends Component {
 constructor(props) {
  super(props);
    this.uploadImage = this.uploadImage.bind(this);
 }

 componentDidUpdate(previousProps, previousState) {
  if (previousProps.userAvatar !== this.props.userAvatar) {
  console.log("this.props.userAvatar in componentDidUpdate", this.props.userAvatar);
   loadAvatarImage(this.props.userAvatar)
  }
 }
 componentWillUnmount(){
  var { modalStateOff } = this.props
  modalStateOff()
 }

 setDefaultImage(){
  var defaultImage =  '../../static/profile-avatars/assets/default-img.jpg';
  this.loadAvatarImage(defaultImage)
 }

 loadAvatarImage(img) {
  var { loadAvatar } = this.props;
  loadAvatar(img)
 }

 uploadImage(e, method) {
  e.stopPropagation();



  const { modalStateOn } = this.props
  console.log('this.props in ImageUploader uploadImageFunction', this.props)

  if (method === "multer") {

   let imageFormObj = new FormData();

   imageFormObj.append("imageName", "multer-image-" + Date.now());
   imageFormObj.append("imageData", e.target.files[0]);

   this.loadAvatarImage(window.URL.createObjectURL(e.target.files[0]))

   var config = { headers: { 'content-type': 'multipart/form-data' }}
   axios.post(`http://localhost:8016/images/uploadmulter`, imageFormObj, config )
    .then((data) => {
     if (data.data.success) {
      console.log("data ", data);
      modalStateOn();
     }
    })
    .catch((err) => {
     alert("Error while uploading image using multer");
      this.setDefaultImage();
    });
  }
 }

 render() {
  var {  userAvatar, modalActive } = this.props;

  return (
   <>

    <div className="main-container">
     <h3 className="main-heading">Image Upload App</h3>

     <div className="image-container">
      <div className="process">
       <h4 className="process__heading">Process: Using Multer</h4>
       <p className="process__details">Upload image to a node server, connected to a MongoDB database, with the help of multer</p>
       <form action="/uploadmulter" method="post" encType="multipart/form-data" >
        <input type="file" name="avatar" className="process__upload-btn"
         onChange={(e) => {
          this.uploadImage(e, "multer");
        }} />
        <img src={userAvatar} alt="upload-image" className="process__image" />
       </form>
      </div>
     </div>
    </div>
    {modalActive && <ImageModal
     isAlertModal={true}
     affirmativeUsed="OK!"
     message="Your image has been uploaded succesfully"
    />}
  </>
  );
 }
}

function mapStateToProps(state) {
 const { ui, users } = state
 const { userAvatar } = users
 const { modalActive } = ui

 return { userAvatar, modalActive }
}

const mapDispatchToProps = dispatch =>
 bindActionCreators({ loadAvatar, modalStateOn, modalStateOff  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader)
