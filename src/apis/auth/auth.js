import axios from 'axios';

// {email: "",password: ""}
const loginUser = (user) => {
  return axios.post(`/auth/login`, user);
};

const Account = {
  loginUser
};

export default Account;
