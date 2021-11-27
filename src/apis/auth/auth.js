import axios from 'axios';

const loginUser = (user) => {
  return axios.post(`/login`, user);
};

const Account = {
  loginUser
};

export default Account;
