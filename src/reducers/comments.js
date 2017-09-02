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
    const comments = action.data.reduce((arr, article) => [...arr, ...article.comments], []);
    const byId = comments.reduce((obj, item) => {
      obj[item.id] = {
        ...item,
        commenter: item.commenter.id,
      };
      return obj;
    }, {});
    return state.merge({
      asyncLoading: false,
      byId,
      allIds: [...new Set(comments.map(i => i.id))],
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
