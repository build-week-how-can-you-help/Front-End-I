import { combineReducers } from 'redux';

import { login } from './login';
import { query } from './query';
import { getUsers } from './users';

export default combineReducers({
  login,
  getUsers,
  query
})