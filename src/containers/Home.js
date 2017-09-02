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
  Button,
} from 'semantic-ui-react';

import {
  getArticles,
} from '../actions/articles';

import Article from '../components/Article';

class Home extends Component {
  static propTypes = {
    articlesLoading: PropTypes.bool,
    articles: PropTypes.any,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    articlesLoading: false,
    articles: null,
    dispatch: () => false,
  };

  renderArticles = () => {
    const { articles } = this.props;
    if (!articles) return false;

    return (
      <Item.Group>
        <Header as='h2'>Articles</Header>
        <Divider />
        { articles.map(article => (
          <Article
            key={ article.get('id') }
            article={ article }
            link
            commentsCount
          />
        ))}
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
        <Header as='h1'>Frontend Developer Anna Financial Test</Header>
        <Button secondary to='/comments' as={ Link }>All comments</Button>
        { this.renderArticles() }
      </Container>
    );
  }
}

export default connect(state => ({
  articles: getArticles(state),
  articlesLoading: state.articles.get('asyncLoading'),
  articlesError: state.articles.get('asyncError'),
}))(Home);
