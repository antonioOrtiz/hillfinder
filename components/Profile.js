import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

let extra;

extra = <a>
 <Icon name='user' />
 16 Friends
 </a>;

const Profile = () => (
 <Card
  image='/profile-avatars/charly-desktop.jpg'
  header='Charly Pavicevac-Ortiz'
  meta='Friend'
  description='Charly was the son of Antonio and Barbara, and the brother to Aria'
  extra={extra}
 />
)

export default Profile
