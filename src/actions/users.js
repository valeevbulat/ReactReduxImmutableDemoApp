export const EDIT_USER = 'EDIT_USER';

export const saveName = (user) => ({
  type: EDIT_USER,
  user,
});

export const getUsers = (state) =>
  state.get('allIds') && state.get('allIds').map(id => state.get('byId').get(id));
