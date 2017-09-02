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
      commentId: null,
      userId: null,
      text: null,
      name: null,
    };
  }

  onChangeField = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  openEdit = () => {
    const { comment } = this.props;
    this.setState({
      editable: true,
      commentId: comment.get('id'),
      userId: comment.get('commenter').get('id'),
      name: comment.get('commenter').get('name'),
      text: comment.get('text'),
    });
  }

  saveComment = () => {
    const { handleSaveComment } = this.props;
    handleSaveComment(this.state);
    this.setState({ editable: false });
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
    const { name, text } = this.state;
    return (
      <Form onSubmit={ this.saveComment }>
        <Form.Field>
          <input
            placeholder='Author'
            name='name'
            onChange={ this.onChangeField }
            value={ name }
          />
        </Form.Field>
        <Form.Field>
          <input
            placeholder='Text'
            name='text'
            onChange={ this.onChangeField }
            value={ text }
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
