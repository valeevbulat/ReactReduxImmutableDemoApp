
export const getUsers = (state) =>
  state.get('allIds') && state.get('allIds').map(id => state.get('byId').get(id));
