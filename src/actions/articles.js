import api from '../api';

export const ASYNC_START = 'ASYNC_START';
export const ASYNC_ERROR = 'ASYNC_ERROR';
export const ASYNC_SUCCESS = 'ASYNC_SUCCESS';

// Async action example
function asyncStart() {
  return {
    type: ASYNC_START,
  };
}

function asyncSuccess(data) {
  return {
    type: ASYNC_SUCCESS,
    data,
  };
}

function asyncError(error) {
  return {
    type: ASYNC_ERROR,
    data: error,
  };
}

export function getArticles() {
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
