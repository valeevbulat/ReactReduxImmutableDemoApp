import { combineReducers } from 'redux';
import articles from './articles';
import users from './users';
import comments from './comments';

export default combineReducers({
  articles,
  users,
  comments,
});
