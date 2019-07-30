import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from "../actions";


const initialState = {
  error: null,
  isLoggingIn: false
};

export const login = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_START:
      return {
        error: null,
        isLoggingIn: true,
      };
    case LOGIN_SUCCESS:
      return {
        error: null,
        isLoggingIn: false
      };
    case LOGIN_FAIL:
      return {
        error: action.payload,
        isLoggingIn: false
      };
    default:
      return state;
  }
}