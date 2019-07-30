import { GET_USERS_START, GET_USERS_SUCCESS, GET_USERS_FAIL } from '../actions';

const initialState = {
  error: null,
  userList: null,
  isGetting: false
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
    default:
      return state;
  }
}