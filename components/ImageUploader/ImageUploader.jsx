import { useContext, useEffect } from 'react';
import {
  fetchPhotos,
  openUploadWidget
} from '../CloudinaryService/CloudinaryService.jsx';

import { Button, Card, Dimmer, Icon, Image, Loader, Segment } from 'semantic-ui-react';
import UserContext from '../UserContext/UserContext.jsx';

function ImageUploader() {
  const { userId, userAvatar, setUserAvatar, isAvatarUploading } = useContext(
    UserContext
  );

  function avatarUpdater(avatarPath) {
    setUserAvatar(avatarPath);
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
    // console.log('isAvatarUploading in imageUploaderUseEffect', isAvatarUploading);
    return () => {};
  });

  return (
    <>
      <Segment>
        <Card fluid>
          {isAvatarUploading ? (
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          ) : (
            <Image src={userAvatar} />
          )}
          <Segment>
            <Button className="process__upload-btn" onClick={() => beginUpload(userId)}>
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
