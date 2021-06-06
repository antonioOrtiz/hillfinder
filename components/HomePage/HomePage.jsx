import { Button, Container, Grid, Header, List, Segment } from 'semantic-ui-react';

import MyHeader from '../Header/Header.jsx';

const HomepageLayout = () => {
  return (
    <>
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: 'auto', padding: '4.5em 0em 5em' }}
        vertical
      >
        <MyHeader
          color={'white'}
          content="Welcome to Hillfinders!"
          textAlign={'center'}
        />
        <p style={{ fontSize: '1.33em' }}>
          An app on the decline! <br />
          er about finding declines... Register!
        </p>
      </Segment>

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: '2em' }}>
            "Is it an app to find a hill, to eventually build a hobbit home in a shire"?
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            "No. Essentially Hillfinders is a directions app, except all endpoints of your
            journey try to be on a lower position in elevation than where you started
            from".
          </p>
          <Button as="a" size="large">
            Read More
          </Button>
        </Container>
      </Segment>
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="About" />
                <List link inverted>
                  <List.Item as="a">Contact Us</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Services" />
                <List link inverted>
                  <List.Item as="a">Banana Pre-Order</List.Item>
                  <List.Item as="a">DNA FAQ</List.Item>
                  <List.Item as="a">How To Access</List.Item>
                  <List.Item as="a">Favorite X-Men</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  Footer Header
                </Header>
                <p>
                  Extra space for a call to action inside the footer that could help
                  re-engage users.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </>
  );
};

export default HomepageLayout;
