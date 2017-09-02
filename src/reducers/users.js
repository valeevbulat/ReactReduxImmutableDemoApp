import { Map } from 'immutable';

import {
  ASYNC_ARTICLES_SUCCESS,
} from '../actions/articles';

const initialState = Map({
  byId: null,
  allIds: null,
});

const actionsMap = {
  [ASYNC_ARTICLES_SUCCESS]: (state, action) => {
    const users = action.data.map(article => article.author);
    const byId = users.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {});
    return state.merge({
      asyncLoading: false,
      byId,
      allIds: [...new Set(users.map(i => i.id))],
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
