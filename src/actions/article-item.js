import api from '../api';

export const ASYNC_ARTICLE_ITEM_START = 'ASYNC_ARTICLE_ITEM_START';
export const ASYNC_ARTICLE_ITEM_ERROR = 'ASYNC_ARTICLE_ITEM_ERROR';
export const ASYNC_ARTICLE_ITEM_SUCCESS = 'ASYNC_ARTICLE_ITEM_SUCCESS';

// Async action example
function asyncStart() {
  return {
    type: ASYNC_ARTICLE_ITEM_START,
  };
}

function asyncSuccess(data) {
  return {
    type: ASYNC_ARTICLE_ITEM_SUCCESS,
    data,
  };
}

function asyncError(error) {
  return {
    type: ASYNC_ARTICLE_ITEM_ERROR,
    data: error,
  };
}

export function getArticle(id) {
  return (dispatch) => {
    dispatch(asyncStart());
    return api
      .getArticle(id)
      .then(data => {
        dispatch(asyncSuccess(data));
      })
      .catch(errors => {
        dispatch(asyncError(errors));
      });
  };
}
