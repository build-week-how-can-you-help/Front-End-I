import {
  QUERY_START, QUERY_SUCCESS, QUERY_FAIL,
  ADD_NONPROFIT_START, ADD_NONPROFIT_SUCCESS, ADD_NONPROFIT_FAIL,
  UPDATE_NONPROFIT_START, UPDATE_NONPROFIT_SUCCESS, UPDATE_NONPROFIT_FAIL,
  DELETE_NONPROFIT_START, DELETE_NONPROFIT_SUCCESS, DELETE_NONPROFIT_FAIL
} from '../actions';

const initialState = {
  error: null,
  nonProfitList: [],
  isQuerying: false
}

export const query = (state = initialState, action) => {
  switch(action.type) {
    case QUERY_START:
      return {
        ...state,
        error: null,
        isQuerying: true
      }
      case QUERY_SUCCESS:
        let array = Object.values(action.payload);
        return {
          ...state,
          error: null,
          nonProfitList: array,
          isQuerying: true
        }
      case QUERY_FAIL:
        return {
          ...state,
          error: action.payload,
          nonProfitList: [],
          isQuerying: true
        }
      case ADD_NONPROFIT_START:
        return {
          ...state,
          error: null,
          isQuerying: true
        }
      case ADD_NONPROFIT_SUCCESS:
        return {
          ...state,
          error: null,
          nonProfitList: action.payload,
          isQuerying: false
        }
      case ADD_NONPROFIT_FAIL:
        return {
          ...state,
          error: action.payload,
          isQuerying: false
        }
      case UPDATE_NONPROFIT_START:
        return {
          ...state,
          error: null,
          isQuerying: true
        }
      case UPDATE_NONPROFIT_SUCCESS:
        return {
          ...state,
          error: null,
          nonProfitList: action.payload,
          isQuerying: false
        }
      case UPDATE_NONPROFIT_FAIL:
        return {
          ...state,
          error: action.payload,
          isQuerying: false
        }
      case DELETE_NONPROFIT_START:
        return {
          ...state,
          error: null,
          isQuerying: true
        }
      case DELETE_NONPROFIT_SUCCESS:
        return {
          ...state,
          error: null,
          nonProfitList: action.payload,
          isQuerying: false
        }
      case DELETE_NONPROFIT_FAIL:
        return {
          ...state,
          error: action.payload,
          isQuerying: false
        }
    default:
      return state;
  }
}