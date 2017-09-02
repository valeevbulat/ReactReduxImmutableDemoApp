import { combineReducers } from 'redux';
import articles from './articles';
import users from './users';
import comments from './comments';
import articleItem from './article-item';

export default combineReducers({
  articles,
  users,
  comments,
  articleItem,
});
