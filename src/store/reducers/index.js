import { combineReducers } from 'redux';

import { login } from './login';
import {  } from './query';
import { getUsers } from './users';

export default combineReducers({
  login,
  getUsers
})