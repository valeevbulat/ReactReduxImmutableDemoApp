import React from 'react';
import PropTypes from 'prop-types';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

import CommentItem from './CommentItem';

const Comments = ({ comments, onSubmit, hasForm, title, handleSaveComment }) => {
  return (
    <Comment.Group>
      <Header as='h3' dividing>{ title || 'Comments' }</Header>
      {comments && comments.map(comment => (
        <CommentItem
          key={ comment.get('id') }
          comment={ comment }
          handleSaveComment={ handleSaveComment }
        />
      ))}

      {hasForm && <Form onSubmit={ onSubmit } reply>
        <Form.TextArea />
        <Button content='Add comment' labelPosition='left' icon='edit' primary />
      </Form> }
    </Comment.Group>
  );
};

Comments.propTypes = {
  title: PropTypes.string,
  comments: PropTypes.any,
  onSubmit: PropTypes.func,
  handleSaveComment: PropTypes.func,
  hasForm: PropTypes.bool,
};

Comments.defaultProps = {
  title: '',
  hasForm: false,
  comments: null,
  onSubmit: (e) => e.preventDefault(),
  handleSaveComment: () => false,
};

export default Comments;
