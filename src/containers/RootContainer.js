import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  asyncArticles,
} from '../actions/articles';

class RootContainer extends Component {
  static propTypes = {
    children: PropTypes.any,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    children: null,
    dispatch: () => false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(asyncArticles());
  }

  render() {
    return this.props.children;
  }
}

export default connect()(RootContainer);
