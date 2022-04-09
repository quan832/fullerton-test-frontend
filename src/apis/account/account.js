import axios from 'axios';

const getUsers = () => {
    return axios.get(`/account/getUsers`);
};

const AccountManagement = {
    getUsers
};

export default AccountManagement;
