import axios from 'axios';
const token = localStorage.getItem("token");

export const axiosWithAuth = () => {
  return axios.create({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type':  'application/x-www-form-urlencoded',
      'Accept': `*/*`
    }
  });
}

export const axiosPutAuth = () => {
  return axios.create({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type':  'application/x-www-form-urlencoded',
      'Accept': `*/*`
    }
  });
}

export const axiosPostAuth = () => {
  console.log('axiosPutAuth');
  return axios.create({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type':  'application/x-www-form-urlencoded',
      'Accept': `*/*`
    }
  });
}