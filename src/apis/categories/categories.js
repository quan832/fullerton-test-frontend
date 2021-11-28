import axios from 'axios';

const fetchCategoryOptions = () => {
    return axios.get(`/categories`);
};

const Categories = {
    fetchCategoryOptions
};

export default Categories;
