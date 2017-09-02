import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  Loader,
  Dimmer,
  Divider,
  Item,
  Breadcrumb,
} from 'semantic-ui-react';

import Comments from '../components/Comments';

import {
  getComments,
} from '../actions/comments';

class User extends Component {
  static propTypes = {
    articlesLoading: PropTypes.bool,
    comments: PropTypes.any,
    match: PropTypes.object,
  };

  static defaultProps = {
    articlesLoading: false,
    comments: null,
    match: {
      params: {
        id: null,
      },
    },
    dispatch: () => false,
  };

  renderArticles = () => {
    const { comments } = this.props;
    return (
      <Item.Group>
        <Header as='h2'>Articles</Header>
        <Divider />
        { !comments ? 'No comments'
          : <Comments
            comments={ comments }
          />
        }
      </Item.Group>
    );
  }

  render() {
    const { articlesLoading } = this.props;
    return (
      <Container>
        <Dimmer
          active={ articlesLoading }
          inverted
        >
          <Loader inverted content='Loading' />
        </Dimmer>
        <Breadcrumb>
          <Breadcrumb.Section to='/' as={ Link }>Articles</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>User articles</Breadcrumb.Section>
        </Breadcrumb>
        { this.renderArticles() }
      </Container>
    );
  }
}

export default connect((state, props) => ({
  comments: getComments(state, props.match.params.id),
  articlesLoading: state.articles.get('asyncLoading'),
}))(User);
