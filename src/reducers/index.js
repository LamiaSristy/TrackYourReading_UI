import { combineReducers } from 'redux';
import userReducer from './userReducer';
import bookReducer from './bookReducer';
import trackingReducer from './trackingReducer';

export default combineReducers({
  user: userReducer,
  book: bookReducer,
  tracking: trackingReducer,
});
