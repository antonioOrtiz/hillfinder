import { useState, useEffect } from 'react';

import { Card, Icon, Image, Segment, Form } from 'semantic-ui-react';

import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function ImageUploader({ userAvatar }) {
  var [defaultImage, setDefaultImage] = useState(
    require('../../uploads/avatar/placeholder.jpg')
  );
  var [userAvatar, setUserAvatar] = useState(defaultImage);

  useEffect(() => {
    setUserAvatar(userAvatar);
  }, [userAvatar]);

  function fileUploader(e) {
    console.log('event fileUploader ', e);
    var imageFormObj = new FormData();

    console.log('e.target.files[0] ', e.target.files[0]);

    imageFormObj.append('imageName', 'multer-image-' + Date.now());
    imageFormObj.append('imageData', e.target.files[0]);
    setUserAvatar(window.URL.createObjectURL(e.target.files[0]));

    console.log('userAvatar ', userAvatar);
    console.log('imageFormObj ', imageFormObj);

    axios
      .post(`/users/uploadmulter`, imageFormObj)
      .then(data => {
        if (data.data.success) {
          alert('Image has been successfully uploaded using multer');
        }
      })
      .catch(err => {
        alert('Error while uploading image using multer');
      });
  }

  return (
    <>
      <Segment>
        <Card fluid>
          <Image src={userAvatar} alt="upload-image" />
          <Segment>
            <Form encType="multipart/form-data">
              <Form.Field>
                <input
                  placeholder="Name of image"
                  className="process__upload-btn"
                  type="file"
                  content="Edit your Avatar!"
                  onChange={e => fileUploader(e)}
                  name="avatar"
                />
                {/* <Button
                  content="Edit your Avatar!"
                  labelPosition="left"
                  icon="file"
                  onClick={e => fileUploader(e)}
                /> */}
              </Form.Field>
            </Form>
          </Segment>
          <Card.Content>
            <Card.Header>Charly</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
            <Card.Description>Charly</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      </Segment>
    </>
  );
}

function mapStateToProps(state) {
  const { users } = state;
  const { userAvatar } = users;

  return { userAvatar };
}

const mapDispatchToProps = dispatch => bindActionCreators({ loadAvatar }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageUploader);
