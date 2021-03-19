import userReducer from '../../reducers/userReducer';
import { createUser, loginUser, logOutUser } from '../../actions/user';

const initialState = {
  isLogin: false,
  user: {
    username: '',
    id: 0,
  },
  errors: [],
};

describe('User Reducer', () => {
  it('Should return the default state', () => {
    const state = userReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = createUser('Action');
    const state = userReducer(undefined, action);
    expect(state).toEqual({ errors: [], isLogin: false, user: { id: 0, username: '' } });
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = loginUser('Action');
    const state = userReducer(undefined, action);
    expect(state).toEqual({ errors: [], isLogin: false, user: { id: 0, username: '' } });
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = logOutUser('Action');
    const state = userReducer(undefined, action);
    expect(state).toEqual({ errors: [], isLogin: false, user: { id: 0, username: '' } });
  });
});
