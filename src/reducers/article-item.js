import { Map } from 'immutable';

import {
  ASYNC_ARTICLE_ITEM_START,
  ASYNC_ARTICLE_ITEM_ERROR,
  ASYNC_ARTICLE_ITEM_SUCCESS,
} from '../actions/article-item';

const initialState = Map({
  asyncData: null,
  asyncError: null,
  asyncLoading: false,
});

const actionsMap = {
  // Async action
  [ASYNC_ARTICLE_ITEM_START]: state => {
    return state.merge({
      asyncLoading: true,
      asyncError: null,
    });
  },
  [ASYNC_ARTICLE_ITEM_ERROR]: (state, action) => {
    return state.merge({
      asyncLoading: false,
      asyncError: action.data,
    });
  },
  [ASYNC_ARTICLE_ITEM_SUCCESS]: (state, action) => {
    return state.merge({
      asyncLoading: false,
      asyncData: action.data,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
