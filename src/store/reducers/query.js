import { QUERY_START, QUERY_SUCCESS, QUERY_FAIL } from '../actions';

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
        return {
          ...state,
          error: null,
          nonProfitList: action.payload,
          isQuerying: true
        }
        case QUERY_FAIL:
          return {
            ...state,
            error: action.payload,
            nonProfitList: [],
            isQuerying: true
          }
    default:
      return state;
  }
}