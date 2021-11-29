import axios from 'axios';

const fetchCategoryOptions = () => {
  return axios.get(`/categories`);
};

const createCategory = (title) => {
  const data = { title };
  return axios.post(`/categories`, data);
};

const Categories = {
  fetchCategoryOptions,
  createCategory
};

export default Categories;
