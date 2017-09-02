import { Map } from 'immutable';

import { saveName } from './users';

export const EDIT_COMMENT = 'EDIT_COMMENT';

export const saveComment = (comment) => dispatch => {
  dispatch(saveName(comment));
  return dispatch({
    type: EDIT_COMMENT,
    comment,
  });
};

export const getComments = ({ comments, users }, userId) => {
  if (comments.get('allIds')) {
    let commentsAllIds = comments.get('allIds');
    if (userId) {
      commentsAllIds = comments
        .get('allIds')
        .filter(id => comments.get('byId').get(id).get('commenter') === userId);
    }
    return commentsAllIds.size && commentsAllIds.map(id => {
      const comment = comments.get('byId').get(id);
      return Map({
        ...comment.toJS(),
        commenter: users.get('byId').get(comment.get('commenter')),
      });
    });
  }
  return null;
};

export const getComment = ({ comments, users }, id) => {
  if (comments.get('allIds') && id) {
    const comment = comments.get('byId').get(id);
    return Map({
      ...comment.toJS(),
      commenter: users.get('byId').get(comment.get('commenter')),
    });
  }
  return null;
};
