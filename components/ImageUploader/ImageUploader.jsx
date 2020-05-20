import { useState, useEffect } from 'react';

import { Card, Icon, Image, Segment, Form } from 'semantic-ui-react';

import axios from 'axios';

function ImageUploader() {
  var [userAvatar, setUserAvatar] = useState(
    require('../../assests/profile-avatars/placeholder.jpg')
  );
  useEffect(() => {
    setUserAvatar(userAvatar);
  }, [userAvatar]);

  function fileUploader(e) {
    e.persist();

    var imageFormObj = new FormData();
    console.log('e.target.files[0 ', e.target.files[0]);

    imageFormObj.append('imageName', 'multer-image-' + Date.now());
    imageFormObj.append('imageData', e.target.files[0]);

    axios
      .post(`/users/uploadmulter`, imageFormObj)
      .then(data => {
        if (data.status === 200) {
          console.log('data ', data);
          var { path } = data.data;
          console.log('path ', path);

          console.log('It woriks!');
          setUserAvatar('../../' + path);
        }
      })
      .catch(err => {
        alert('Error while uploading image using multer');
      });
  }

  console.log('userAvatar ', userAvatar);
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

export default ImageUploader;
