import { Map } from 'immutable';
import api from '../api';

export const ASYNC_ARTICLES_START = 'ASYNC_ARTICLES_START';
export const ASYNC_ARTICLES_ERROR = 'ASYNC_ARTICLES_ERROR';
export const ASYNC_ARTICLES_SUCCESS = 'ASYNC_ARTICLES_SUCCESS';

// Async action example
function asyncStart() {
  return {
    type: ASYNC_ARTICLES_START,
  };
}

function asyncSuccess(data) {
  return {
    type: ASYNC_ARTICLES_SUCCESS,
    data,
  };
}

function asyncError(error) {
  return {
    type: ASYNC_ARTICLES_ERROR,
    data: error,
  };
}

export function asyncArticles() {
  return (dispatch) => {
    dispatch(asyncStart());
    return api
      .getArticles()
      .then(data => {
        dispatch(asyncSuccess(data));
      })
      .catch(errors => {
        dispatch(asyncError(errors));
      });
  };
}

export const getArticles = ({ articles, users, comments }) =>
  articles.get('allIds') && articles.get('allIds')
    .map(id => {
      const article = articles.get('byId').get(id);
      return Map({
        ...article.toJS(),
        author: users.get('byId').get(article.get('author')),
        comments: article.get('comments').map(comment => comments.get('byId').get(comment)),
      });
    });
