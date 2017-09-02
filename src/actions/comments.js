import { Map } from 'immutable';

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

