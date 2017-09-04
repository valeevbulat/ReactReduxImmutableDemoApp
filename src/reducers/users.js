import { Map } from 'immutable';

import {
  ASYNC_ARTICLES_SUCCESS,
} from '../actions/articles';

import {
  EDIT_USER,
} from '../actions/users';

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
      byId,
      allIds: [...new Set(users.map(i => i.id))],
    });
  },

  [EDIT_USER]: (state, action) => {
    const { name, userId } = action.user;
    return state.update('byId', v => v.update(userId, x => x.merge({ name })));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
