import {
  GET_USERS_START, GET_USERS_SUCCESS, GET_USERS_FAIL,
  GET_CURRENT_USER_START, GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_FAIL,
  ADD_NEW_USER_START, ADD_NEW_USER_SUCCESS, ADD_NEW_USER_FAIL
} from '../actions';

const initialState = {
  error: null,
  userList: null,
  newUser: null,
  currentUserInfo: null,
  isGetting: false,
  isAdding: false
}

export const getUsers = (state = initialState, action) => {
  switch(action.type) {
    case GET_USERS_START:
      return {
        ...state,
        error: null,
        isGetting: true,
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        error: null,
        userList: action.payload,
        isGetting: false
      }
    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
        isGetting: false
      }
    case GET_CURRENT_USER_START:
      return {
        ...state,
        error: null,
        isGetting: true,
      }
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        error: null,
        currentUserInfo: action.payload,
        isGetting: false
      }
    case GET_CURRENT_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        isGetting: false
      }
    case ADD_NEW_USER_START:
      return {
        ...state,
        error: null,
        isAdding: true,
      }
    case ADD_NEW_USER_SUCCESS:
      return {
        ...state,
        error: null,
        newUser: action.payload,
        isAdding: false
      }
    case ADD_NEW_USER_FAIL:
      console.log('reducer fail');
      return {
        ...state,
        error: action.payload,
        isAdding: false
      }
    default:
      return state;
  }
}