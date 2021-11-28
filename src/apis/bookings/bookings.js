import axios from 'axios';

const fetchBookings = (page = 1, perPage = 4, filter = null) => {
    return axios.get(`/bookings`, {
        params: { page, perPage, filter }
    });
};

const Bookings = {
    fetchBookings
};

export default Bookings;
