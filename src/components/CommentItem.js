import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Divider,
  Comment,
  Form,
  Button,
} from 'semantic-ui-react';

class CommentItem extends Component {
  static propTypes = {
    comment: PropTypes.any,
    handleSaveComment: PropTypes.func,
  }

  static defaultProps = {
    comment: null,
    handleSaveComment: () => false,
  }

  constructor() {
    super();

    this.state = {
      editable: false,
      comment: null,
    };
  }

  openEdit = () => {
    const { comment } = this.props;
    this.setState({ editable: true, comment });
  }

  saveComment = () => {
    const { comment } = this.state;
    const { handleSaveComment } = this.props;

    this.setState({ editable: false, comment: null }, () => {
      handleSaveComment(comment);
    });
  }

  rednerInfo() {
    const { comment } = this.props;

    return (
      <Comment.Content>
        <Comment.Author as={ Link } to={ `/users/${ comment.get('commenter').get('id') }` }>{comment.get('commenter').get('name')}</Comment.Author>
        <Comment.Text>{comment.get('text')}</Comment.Text>
        <Comment.Actions>
          <Comment.Action onClick={ this.openEdit }>Edit</Comment.Action>
        </Comment.Actions>
        <Divider />
      </Comment.Content>
    );
  }

  renderEdit() {
    const { comment } = this.state;
    return (
      <Form onSubmit={ this.saveComment }>
        <Form.Field>
          <input
            placeholder='Text'
            value={ comment.get('text') }
          />
        </Form.Field>
        <Form.Field>
          <input
            placeholder='Author'
            value={ comment.get('commenter').get('name') }
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    );
  }

  render() {
    const { editable } = this.state;
    const { comment } = this.props;
    if (!comment) return false;
    return (
      <Comment>
        { !editable ? this.rednerInfo() : this.renderEdit() }
      </Comment>
    );
  }
}

export default CommentItem;
