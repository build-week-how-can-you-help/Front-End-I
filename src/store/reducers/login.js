import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from "../actions";


const initialState = {
  error: null,
  nonProfitList: null,
  isLoggingIn: false
};

export const login = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_START:
      return {
        ...state,
        error: null,
        isLoggingIn: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        nonProfitList: action.payload,
        isLoggingIn: false
      }
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoggingIn: false
      }
    default:
      return state,
  };
}