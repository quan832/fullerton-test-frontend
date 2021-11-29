import axios from 'axios';

const loginUser = (user) => {
  return axios.post(`/login`, user);
};

const refreshToken = (accessToken, refreshToken) => {
  const data = {
    accessToken,
    refreshToken
  };

  return axios.post(`/refresh-token`, data);
};

const Account = {
  loginUser,
  refreshToken
};

export default Account;
