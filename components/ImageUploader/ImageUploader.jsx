import { useContext, useEffect } from 'react';
import {
  fetchPhotos,
  openUploadWidget
} from '../CloudinaryService/CloudinaryService.jsx';

import { Button, Card, Dimmer, Icon, Image, Loader, Segment } from 'semantic-ui-react';
import { userState, userDispatch } from '../Context/UserContext.jsx';
import { getUserAvatar } from '../../utils/index';

function ImageUploader() {
  var { id, avatar } = userState();
  var dispatch = userDispatch();

  useEffect(() => {
    if (id) {
      getUserAvatar()
        .then(userAvatar => {
          console.log('userAvatar ', userAvatar);
          dispatch({
            type: 'setIsAvatarUploading',
            payload: { isAvatarUploading: false }
          });
          dispatch({
            type: 'setAvatar',
            payload: { avatar: userAvatar }
          });
        })
        .catch(err => console.log('error thrown from getUserAvatar', err));
    } else {
      console.log('No user yet!');
    }
  }, [id]);

  function avatarUpdater(avatarPath) {
    dispatch({
      type: 'setAvatar',
      payload: { avatar: avatarPath }
    });
  }

  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: 'hillfinders',
      context: `userId=${tag}`,
      tags: [`userId=${tag}`],

      uploadPreset: 'upload'
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === 'success') {
          console.log('photos  ', photos);
          avatarUpdater(photos.info.secure_url);
        }
      } else {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    console.log('avatar ', avatar);
    return () => {};
  }, [avatar]);

  return (
    <>
      <Segment>
        <Card fluid>
          {avatar == false ? (
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          ) : (
            <Image src={avatar} />
          )}
          <Segment>
            <Button className="process__upload-btn" onClick={() => beginUpload(id)}>
              Upload your Avatar!
            </Button>
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
