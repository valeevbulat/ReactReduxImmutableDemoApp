import { Map } from 'immutable';

import {
  ASYNC_START,
  ASYNC_ERROR,
  ASYNC_SUCCESS,
} from '../actions/articles';

const initialState = Map({
  asyncData: null,
  asyncError: null,
  asyncLoading: false,
});

const actionsMap = {
  // Async action
  [ASYNC_START]: state => {
    return state.merge({
      asyncLoading: true,
      asyncError: null,
    });
  },
  [ASYNC_ERROR]: (state, action) => {
    return state.merge({
      asyncLoading: false,
      asyncError: action.data,
    });
  },
  [ASYNC_SUCCESS]: (state, action) => {
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
