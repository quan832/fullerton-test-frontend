import axios from 'axios';

const fetchBookings = (page = 1, perPage = 4, filter = null) => {
  return axios.get(`/bookings`, {
    params: { page, perPage, filter }
  });
};

const deleteBooking = (id) => {
  return axios.delete(`/bookings/${id}`);
};

const createBooking = ({data}) => {
  return axios.post(`/bookings`, data);
};

const Bookings = {
  fetchBookings,
  deleteBooking,
  createBooking
};

export default Bookings;
