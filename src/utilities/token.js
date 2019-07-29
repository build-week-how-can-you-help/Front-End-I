import { LOGIN_SUCCESS } from '../store/actions';

export const setToken = () => next => action => {
  if(action.type === LOGIN_SUCCESS) {
    localStorage.setItem('token', action.payload.token);
    localStorage.setItem('userId', action.payload.id);
  };
  next(action);
}