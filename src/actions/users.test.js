import {
  saveName,
  EDIT_USER,
} from './users';

describe('users action', () => {
  it('should create an action to edit user', () => {
    const user = {
      name,
      userId: 1,
    };
    const expectedAction = {
      type: EDIT_USER,
      user,
    };

    expect(saveName(user)).toEqual(expectedAction);
  });
});
