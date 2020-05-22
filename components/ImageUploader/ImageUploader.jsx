import { useState, useEffect } from 'react';

import { Card, Icon, Image, Segment, Form } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import axios from 'axios';

import { loadAvatar } from '../../store/reducers/users/index';

function ImageUploader({ userAvatar }) {
  function fileUploader(e) {
    e.persist();

    var imageFormObj = new FormData();

    imageFormObj.append('imageName', 'multer-image-' + Date.now());
    imageFormObj.append('imageData', e.target.files[0]);

    loadAvatar(URL.createObjectURL(e.target.files[0]));

    axios
      .post(`/users/uploadmulter`, imageFormObj)
      .then(data => {
        if (data.status === 200) {
          console.log('data ', data);
          var { path } = data.data;
          console.log('path ', data.data.path);

          loadAvatar(data.data.path);
        }
      })
      .catch(err => {
        alert('Error while uploading image using multer');
      });
  }

  console.log('userAvatar in imageUploader ', userAvatar);
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
                />
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
