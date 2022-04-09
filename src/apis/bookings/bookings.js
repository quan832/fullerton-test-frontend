import axios from 'axios';

const fetchBookings = (page = 1, perPage = 4, filter = null) => {
  return axios.get(`/bookings`, {
    params: { page, perPage, filter }
  });
};

const deleteBooking = (id) => {
  return axios.delete(`/bookings/${id}`);
};

const createBooking = (data) => {
  return axios.post(`/bookings`, data);
};

const updateBookingStatus = ({ id, dateId, status }) => {
  const data ={dateId,status}
  return axios.put(`/bookings/${id}/status`, data);
};

const Bookings = {
  fetchBookings,
  deleteBooking,
  createBooking,
  updateBookingStatus
};

export default Bookings;
