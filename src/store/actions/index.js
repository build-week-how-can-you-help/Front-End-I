import axios from 'axios';
import { axiosWithAuth, axiosPutAuth, axiosPostAuth } from '../../utilities/axiosWithAuth';

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const QUERY_START = "QUERY_START";
export const QUERY_SUCCESS = "QUERY_SUCCESS";
export const QUERY_FAIL = "QUERY_FAIL";
export const ADD_NONPROFIT_START = "ADD_NONPROFIT_START";
export const ADD_NONPROFIT_SUCCESS = "ADD_NONPROFIT_SUCCESS";
export const ADD_NONPROFIT_FAIL = "ADD_NONPROFIT_FAIL";
export const UPDATE_NONPROFIT_START = "UPDATE_NONPROFIT_START";
export const UPDATE_NONPROFIT_SUCCESS = "UPDATE_NONPROFIT_SUCCESS";
export const UPDATE_NONPROFIT_FAIL = "UPDATE_NONPROFIT_FAIL";
export const DELETE_NONPROFIT_START = "DELETE_NONPROFIT_START";
export const DELETE_NONPROFIT_SUCCESS = "DELETE_NONPROFIT_SUCCESS";
export const DELETE_NONPROFIT_FAIL = "DELETE_NONPROFIT_FAIL";
export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";
export const ADD_NEW_USER_START = "ADD_NEW_USER_START";
export const ADD_NEW_USER_SUCCESS = "ADD_NEW_USER_SUCCESS";
export const ADD_NEW_USER_FAIL = "ADD_NEW_USER_FAIL";
export const GET_CURRENT_USER_START = "GET_CURRENT_USER_START";
export const GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS";
export const GET_CURRENT_USER_FAIL = "GET_CURRENT_USER_FAIL";
export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

const hostURL = "//50.62.56.186:8080";
const hostURL2 = "//50.62.56.186:8000";
const apiKey = process.env.REACT_APP_HOWCANIHELP;

export const loginHandler = (value) => dispatch => {
  dispatch({ type: LOGIN_START });
  localStorage.setItem('username',value.username);
  return axios.post(`${hostURL}/oauth/token`, `grant_type=password&username=${value.username}&password=${value.password}`,{
      headers:{
        'Authorization': `Basic ${apiKey}`,
        'Content-Type':  'application/x-www-form-urlencoded'
      }
    })
    .then(res=> {
      // console.log('login success',res);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.access_token });
      dispatch( getAllUsers(res.data.access_token) );
      return true;
    })
    .catch(err => {
      // console.log('login fail',err);
      dispatch({type: LOGIN_FAIL, payload: err})
    })
}

export const searchQuery = value => dispatch => {
  // console.log('START SEARCH QUERY', value);
  dispatch({ type: QUERY_START });
  let obj =`description_text=${value}`;
  return axios.post(`${hostURL2}/find`,obj,{
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': "text/html; charset=utf-8"
      }
    })
    .then( res => {
      // console.log(res);
      dispatch({ type: QUERY_SUCCESS, payload: res.data })
    })
    .catch( err => {
      // console.log(err);
      dispatch({ type: QUERY_FAIL, payload: err })
    })
}

export const addNonProfit = values => dispatch => {
  dispatch({ type: ADD_NONPROFIT_START });
  return axiosWithAuth().post(`${hostURL}/addnonprofit`, values)
    .then(res => {
      // console.log(res);
      let savedWebsites = [];
      if(localStorage.getItem('addedWebsites')) {
        savedWebsites = localStorage.getItem('addedWebsites');
      }
      localStorage.addItem('added_websites', [...savedWebsites, values]);
      dispatch({ type: ADD_NONPROFIT_SUCCESS, payload: res.data });
      return true;
    })
    .catch( err => {
      // console.log(err);
      dispatch({ type: ADD_NONPROFIT_FAIL, payload: err });
    })
}

export const updateNonProfit = value => dispatch => {
  dispatch({ type: UPDATE_NONPROFIT_START });
  return axiosWithAuth().put(`${hostURL}/nonprofit/${value.id}`)
    .then( res => {
      // console.log(res);
      dispatch({ type: UPDATE_NONPROFIT_SUCCESS, payload: res.data });
      return true;
    })
    .catch( err => {
      // console.log(err);
      dispatch({ type: UPDATE_NONPROFIT_FAIL, payload: err });
    })
}

export const removeNonProfit = id => dispatch => {
  dispatch({ type: DELETE_NONPROFIT_START });
  return axiosWithAuth().delete(`${hostURL}/nonprofit/${id}`)
    .then( res => {
      // console.log(res);
      dispatch({ type: DELETE_NONPROFIT_SUCCESS, payload: res.data });
      return true;
    })
    .catch( err => {
      // console.log(err);
      dispatch({ type: DELETE_NONPROFIT_FAIL, payload: err });
    })
}

export const getCurrentUserInfo = () => dispatch => {
  console.log("get current info");
  dispatch({ type: GET_CURRENT_USER_START });
  return axiosWithAuth().get(`${hostURL}/users/getusername`)
    .then( res => {
      // console.log('get current user',res);
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: res.data });
    })
    .catch( err => {
      // console.log(err.response);
      dispatch({ type: GET_CURRENT_USER_FAIL, payload: err.response });
    })
}

export const getAllUsers = (token = 0) => dispatch => {
  // console.log('GET ALL USERS');
  dispatch({ type: GET_USERS_START });
  // console.log("GET ALL USERS token");
  if(token !== 0) {
    // console.log('TOKEN', token);
    // console.log('token sent');
    return axios.get(`${hostURL}/users/users`,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/x-www-form-urlencoded',
        'Accept': `*/*`
        }
      })
      .then( res => {
        // console.log('GET ALL USERS SUCCEESS');
        dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
      })
      .catch( err => {
        // console.log(err.response);
        dispatch({ type: GET_USERS_FAIL, payload: err.response });
      })
  } else {
    return axiosWithAuth().get(`${hostURL}/users/users`)
      .then( res => {
        // console.log('GET ALL USERS SUCCEESS');
        dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
      })
      .catch( err => {
        // console.log(err.response);
        dispatch({ type: GET_USERS_FAIL, payload: err.response });
      })
  }
}

export const addNewUser = values => dispatch => {
  console.log('add new',values);
  dispatch({ type: ADD_NEW_USER_START });
  return axiosPostAuth().post(`${hostURL}/users/user/`, values)
    .then(res => {
      // console.log('adduser success',res);
      dispatch({ type: ADD_NEW_USER_SUCCESS, payload: res.data });
      return true;
    })
    .catch( err => {
      // console.log('adduser fail', err);
      dispatch({ type: ADD_NEW_USER_FAIL, payload: err });
      return true;
    })
}

export const updateUserInfo = values => dispatch => {
  console.log('update',values);
  dispatch({ type: UPDATE_USER_START });
  return axiosPutAuth().put(`${hostURL}/users/user/${values.id}`)
    .then(res => {
      console.log('updateuserinfo success',res);
    })
    .catch( err => {
      console.log('update user info fail', err);
    })
}