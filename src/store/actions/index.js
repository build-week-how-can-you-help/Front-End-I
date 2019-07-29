export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const loginHandler = (u,p) => dispatch => {
  dispatch({ type: LOGIN_START });
  axios.post(`http://thewebbranch.com/oauth/token`, `grant_type=password&username=${u}&password=${p}`,{
      headers:{
        'Authorization': `Basic process.env.REACT_APP_HOWCANIHELP`,
        'Content-Type':  'application/x-www-form-urlencoded'
      }
    })
    .then(res=> {
      console.log('login res',res);
      // dispatch({ type: LOGIN_SUCCESS, payload:res })
    })
    .catch(err => {
      console.log('login fail',err);
      // dispatch({type: LOGIN_FAIL, payload:err})
    })
}