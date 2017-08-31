import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  List,
  Container,
  Header,
  Loader,
  Segment,
  Dimmer,
  Image,
} from 'semantic-ui-react';

import {
  getArticles,
} from '../../actions/articles';

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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getArticles());
  }

  renderNews = () => {
    const { articles } = this.props;
    if (!articles) return false;
    return (
      <List>
        <List.Header>
          <Header as='h1'>Список статей</Header>
        </List.Header>
        { articles.map(item => (
          <List.Item key={ item.get('') }>
            <List.Content>
              <Segment>
                <Header as='h3'>{item.get('title')}</Header>
                {item.get('text')}
              </Segment>
            </List.Content>
          </List.Item>
        ))}
      </List>
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
        { this.renderNews() }
      </Container>
    );
  }
}

export default connect(state => ({
  articles: state.articles.get('asyncData'),
  articlesLoading: state.articles.get('asyncLoading'),
  articlesError: state.articles.get('asyncError'),
}))(Home);
