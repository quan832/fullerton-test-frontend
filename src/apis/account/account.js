import axios from 'axios';

const getUsers = () => {
    return axios.get(`/account/getUsers`);
};

const createAccount = (data) => {
    return axios.post(`/account/createAccount`, data);
};

const AccountManagement = {
    getUsers,
    createAccount
};

export default AccountManagement;
