import axios from 'axios';

const createFeedback = (id, description) => {
  const data = { description };
  return axios.post(`/booking/${id}/feedback`, data);
};

const feedback = {
  createFeedback
};

export default feedback;
