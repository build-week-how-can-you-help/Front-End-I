import axios from 'axios';

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const QUERY_START = "QUERY_START";
export const QUERY_SUCCESS = "QUERY_SUCCESS";
export const QUERY_FAIL = "QUERY_FAIL";

const hostURL = "//thewebbranch.com/oauth/token";
const apiKey = process.env.REACT_APP_HOWCANIHELP;

export const loginHandler = (value) => dispatch => {
  console.log('LOGIN ACTION');
  dispatch({ type: LOGIN_START });
  return axios.post(hostURL, `grant_type=password&username=${value.username}&password=${value.password}`,{
      headers:{
        'Authorization': `Basic ${apiKey}`,
        'Content-Type':  'application/x-www-form-urlencoded'
      }
    })
    .then(res=> {
      // console.log('login res',res.data.access_token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.access_token });
      return true;
    })
    .catch(err => {
      console.log('login fail',err.response);
      // dispatch({type: LOGIN_FAIL, payload:err})
    })
}

export const searchQuery = (value) => dispatch => {
  console.log('START SEARCH QUERY');
  dispatch({ type: QUERY_START });
}