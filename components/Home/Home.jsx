import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  List,
  Segment,
} from 'semantic-ui-react'

import { getWidthFactory } from '../../utils/utils';
import MyHeader from '../Header/Header.jsx'
import { connect } from 'react-redux'

const HomepageLayout = () => (
 <>
  <Segment
   inverted
   textAlign='center'
   style={{ minHeight: 'auto', padding: '4.5em 0em 5em' }}
   vertical
  >
  <MyHeader H1HeaderContent="foo" H2HeaderContent="bar" />
  </Segment>

  <Segment style={{ padding: '0em' }} vertical>
   <Grid celled='internally' columns='equal' stackable>
    <Grid.Row textAlign='center'>
     <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
      <Header as='h3' style={{ fontSize: '2em' }}>
       "What a Company"
            </Header>
      <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
     </Grid.Column>
     <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
      <Header as='h3' style={{ fontSize: '2em' }}>
       "I shouldn't have gone with their competitor."
            </Header>
      <p style={{ fontSize: '1.33em' }}>
       <b>Nan</b> Chief Fun Officer Acme Toys
            </p>
     </Grid.Column>
    </Grid.Row>
   </Grid>
  </Segment>
  <Segment style={{ padding: '8em 0em' }} vertical>
   <Container text>
    <Header as='h3' style={{ fontSize: '2em' }}>
     Breaking The Grid, Grabs Your Attention
        </Header>
    <p style={{ fontSize: '1.33em' }}>
     Instead of focusing on content creation and hard work, we have learned how to master the
     art of doing nothing by providing massive amounts of whitespace and generic content that
     can seem massive, monolithic and worth your attention.
        </p>
    <Button as='a' size='large'>
     Read More
        </Button>


   </Container>
  </Segment>
  <Segment inverted vertical style={{ padding: '5em 0em' }}>
   <Container>
    <Grid divided inverted stackable>
     <Grid.Row>
      <Grid.Column width={3}>
       <Header inverted as='h4' content='About' />
       <List link inverted>
        <List.Item as='a'>Sitemap</List.Item>
        <List.Item as='a'>Contact Us</List.Item>
        <List.Item as='a'>Religious Ceremonies</List.Item>
        <List.Item as='a'>Gazebo Plans</List.Item>
       </List>
      </Grid.Column>
      <Grid.Column width={3}>
       <Header inverted as='h4' content='Services' />
       <List link inverted>
        <List.Item as='a'>Banana Pre-Order</List.Item>
        <List.Item as='a'>DNA FAQ</List.Item>
        <List.Item as='a'>How To Access</List.Item>
        <List.Item as='a'>Favorite X-Men</List.Item>
       </List>
      </Grid.Column>
      <Grid.Column width={7}>
       <Header as='h4' inverted>
        Footer Header
              </Header>
       <p>
        Extra space for a call to action inside the footer that could help re-engage users.
              </p>
      </Grid.Column>
     </Grid.Row>
    </Grid>
   </Container>
  </Segment>


 </>
)



function mapStateToProps(state) {
 const { isLoggedIn, logInUser, logOutUser } = state
 return { isLoggedIn, logInUser, logOutUser }
}

export default connect(
 mapStateToProps,
)(HomepageLayout)
