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

import {
  getComments,
  saveComment,
} from '../actions/comments';

import Comments from '../components/Comments';

class AllComments extends Component {
  static propTypes = {
    articlesLoading: PropTypes.bool,
    comments: PropTypes.any,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    articlesLoading: false,
    comments: null,
    dispatch: () => false,
  };

  handleSaveComment = (comment) => {
    const { dispatch } = this.props;
    dispatch(saveComment(comment));
  }

  renderArticles = () => {
    const { comments } = this.props;
    if (!comments) return false;
    return (
      <Item.Group>
        <Header as='h2'>Articles</Header>
        <Divider />
        { !comments ? 'No comments'
          : <Comments
            handleSaveComment={ this.handleSaveComment }
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
          <Breadcrumb.Section active>All comments</Breadcrumb.Section>
        </Breadcrumb>
        { this.renderArticles() }
      </Container>
    );
  }
}

export default connect((state) => ({
  comments: getComments(state),
  articlesLoading: state.articles.get('asyncLoading'),
}))(AllComments);
