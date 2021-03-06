import { Map } from 'immutable';

import {
  ASYNC_ARTICLES_START,
  ASYNC_ARTICLES_ERROR,
  ASYNC_ARTICLES_SUCCESS,
} from '../actions/articles';

const initialState = Map({
  byId: null,
  allIds: null,
  asyncError: null,
  asyncLoading: false,
});

const actionsMap = {
  // Async action
  [ASYNC_ARTICLES_START]: state => {
    return state.merge({
      asyncLoading: true,
      asyncError: null,
    });
  },
  [ASYNC_ARTICLES_ERROR]: (state, action) => {
    return state.merge({
      asyncLoading: false,
      asyncError: action.data,
    });
  },
  [ASYNC_ARTICLES_SUCCESS]: (state, action) => {
    const byId = action.data.reduce((obj, item) => {
      obj[item.id] = {
        ...item,
        author: item.author.id,
        comments: item.comments.map(comment => comment.id),
      };
      return obj;
    }, {});
    return state.merge({
      asyncLoading: false,
      byId,
      allIds: action.data.map(i => i.id),
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
