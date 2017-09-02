import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Container,
  Loader,
  Dimmer,
  Item,
  Divider,
  Breadcrumb,
} from 'semantic-ui-react';

import {
  getArticle,
  saveComment,
} from '../actions/article-item';

import Comments from '../components/Comments';
import Article from '../components/Article';

class ArticlePage extends Component {
  static propTypes = {
    articleLoading: PropTypes.bool,
    article: PropTypes.any,
    articleError: PropTypes.string,
    match: PropTypes.object,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    articleLoading: false,
    article: null,
    articleError: '',
    match: {
      params: {
        id: null,
      },
    },
    dispatch: () => false,
  };

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(getArticle(match.params.id));
  }

  handleSaveComment = (comment) => {
    const { dispatch } = this.props;
    dispatch(saveComment(comment));
  }

  renderArticle = () => {
    const { article, articleError } = this.props;
    if (articleError) return <Redirect to='/' />;
    if (!article) return false;
    return (
      <Item.Group>
        <Article article={ article } />
        <Comments
          comments={ article.get('comments') }
          handleSaveComment={ this.handleSaveComment }
          hasForm
        />
      </Item.Group>
    );
  }

  render() {
    const { articleLoading, article } = this.props;
    return (
      <Container>
        <Dimmer
          active={ articleLoading }
          inverted
        >
          <Loader inverted content='Loading' />
        </Dimmer>
        <Breadcrumb>
          <Breadcrumb.Section to='/' as={ Link }>Articles</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{article && article.get('title')}</Breadcrumb.Section>
        </Breadcrumb>
        { this.renderArticle() }

      </Container>
    );
  }
}

export default connect(state => ({
  article: state.articleItem.get('asyncData'),
  articleLoading: state.articleItem.get('asyncLoading'),
  articleError: state.articleItem.get('asyncError'),
}))(ArticlePage);
