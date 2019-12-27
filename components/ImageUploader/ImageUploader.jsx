import React, { Component } from 'react';
import './ImageUploader.css';
import Modal from '../Modal/MyModal.jsx'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadAvatar } from '../../store/reducers/users/index'
import { modalStateOn, modalStateOff } from '../../store/reducers/ui/index'


// base api url being used
const API_URL = "http://localhost:8016";

class ImageUploader extends Component {
 constructor(props) {
  super(props);
 }

 componentDidMount() {
  this.setDefaultImage()
 }

 setDefaultImage(){
   var defaultImage =  '../../static/profile-avatars/assets/default-img.jpg';
   var { loadAvatarImage } = this.props;
    this.loadAvatarImage(defaultImage)
 }

 loadAvatarImage(img) {
    var { loadAvatar } = this.props;
     loadAvatar(img)
 }
 // function to upload image once it has been captured
 // includes multer and firebase methods
 uploadImage(e, method) {

  let imageObj = {};

  if (method === "multer") {

   let imageFormObj = new FormData();

   imageFormObj.append("imageName", "multer-image-" + Date.now());
   imageFormObj.append("imageData", e.target.files[0]);

   this.loadAvatarImage(window.URL.createObjectURL(e.target.files[0]))


   return window.fetch('http://localhost:8016/images/uploadmulter', {
    method: 'POST',
    // body: e.target.files[0]
    body: imageFormObj
   })
    .then((response) => {
     if (response.status === 200){
      response.json()
     } else if (response.status === 413) {
      this.setDefaultImage();
     }
    })
    .then((data) => {
     console.log("data!", data);
    })
    .catch((err) => {
     console.log('error', err);
     this.setDefaultImage();
    });
  }
 } // end upload function

 render() {
  // var {imageUploaded} = this.state;
  var { history, userAvatar, isLoggedIn, modalActive, modalStateOn, modalStateOff } = this.props
  console.log('userAvatar', userAvatar)

  return (
   <>
    <div className="main-container">
     <h3 className="main-heading">Image Upload App</h3>

     <div className="image-container">
      <div className="process">
       <h4 className="process__heading">Process: Using Multer</h4>
       <p className="process__details">Upload image to a node server, connected to a MongoDB database, with the help of multer</p>
       <form action="/uploadmulter" method="post" encType="multipart/form-data" >
        <input type="file" name="avatar" className="process__upload-btn" onChange={(e) => this.uploadImage(e, "multer")} />
        <img src={userAvatar || `/server/uploads/ ${userAvatar}`} alt="upload-image" className="process__image" />
       </form>
      </div>
     </div>
    </div>
  </>
  );
 }
}

function mapStateToProps(state) {
 const { ui, users } = state
 const { isLoggedIn, userAvatar } = users
 const { modalActive } = ui

 return { isLoggedIn, userAvatar, modalActive }
}

const mapDispatchToProps = dispatch =>
 bindActionCreators({ loadAvatar, modalStateOn, modalStateOff }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader)
