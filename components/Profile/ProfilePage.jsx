import {
  Button,
  Card,
  Feed,
  Icon,
  Segment,
  Grid,
  Divider,
  Container,
  Header
} from 'semantic-ui-react';

import MyHeader from '../Header/Header.jsx';
import ImageUploader from '../ImageUploader/ImageUploader.jsx';

const ProfilePage = () => {
  return (
    <>
      <Grid container columns={1} relaxed stackable>
        <Grid.Column>
          <MyHeader as="h2" content="Welcome!" textAlign="left" />
        </Grid.Column>
      </Grid>

      <Grid container columns={2} divided relaxed stackable>
        <Grid.Column>
          <Segment>
            <Card fluid>
              <ImageUploader />
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
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Card fluid>
              <Card.Content>
                <Card.Header>Recent Activity</Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date content="1 day ago" />
                      <Feed.Summary>
                        You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>

                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date content="3 days ago" />
                      <Feed.Summary>
                        You added <a>Molly Malone</a> as a friend.
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>

                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date content="4 days ago" />
                      <Feed.Summary>
                        You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </Card>
          </Segment>

          <Segment>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User>Elliot Fu</Feed.User> added you as a friend
                    <Feed.Date>1 Hour Ago</Feed.Date>
                  </Feed.Summary>
                  <Feed.Meta>
                    <Feed.Like>
                      <Icon name="like" />4 Likes
                    </Feed.Like>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    <a>Helen Troy</a> added <a>2 new illustrations</a>
                    <Feed.Date>4 days ago</Feed.Date>
                  </Feed.Summary>

                  <Feed.Meta>
                    <Feed.Like>
                      <Icon name="like" />1 Like
                    </Feed.Like>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary
                    date="2 Days Ago"
                    user="Jenny Hess"
                    content="add you as a friend"
                  />
                  <Feed.Meta>
                    <Feed.Like>
                      <Icon name="like" />8 Likes
                    </Feed.Like>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    <a>Joe Henderson</a> posted on his page
                    <Feed.Date>3 days ago</Feed.Date>
                  </Feed.Summary>
                  <Feed.Extra text>
                    Ours is a life of constant reruns. We're always circling back to where
                    we'd we started, then starting all over again. Even if we don't run
                    extra laps that day, we surely will come back for more of the same
                    another day soon.
                  </Feed.Extra>
                  <Feed.Meta>
                    <Feed.Like>
                      <Icon name="like" />5 Likes
                    </Feed.Like>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    <a>Justen Kitsune</a> added <a>2 new photos</a> of you
                    <Feed.Date>4 days ago</Feed.Date>
                  </Feed.Summary>

                  <Feed.Meta>
                    <Feed.Like>
                      <Icon name="like" />
                      41 Likes
                    </Feed.Like>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Segment>
        </Grid.Column>
      </Grid>

      <Divider
        as="h4"
        className="header"
        horizontal
        style={{ margin: '3em 0em', textTransform: 'uppercase' }}
      >
        <a href="#">Case Studies</a>
      </Divider>

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: '2em' }}>
            Breaking The Grid, Grabs Your Attention
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Instead of focusing on content creation and hard work, we have learned how to
            master the art of doing nothing by providing massive amounts of whitespace and
            generic content that can seem massive, monolithic and worth your attention.
          </p>
          <Button as="a" size="large">
            Read More
          </Button>
        </Container>
      </Segment>
      <Segment inverted vertical style={{ padding: '5em 0em' }} />
    </>
  );
};

export default ProfilePage;
