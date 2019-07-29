import axios from 'axios';

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

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