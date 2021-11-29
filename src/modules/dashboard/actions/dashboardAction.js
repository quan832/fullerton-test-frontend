const store = 'dashboard';

export const FETCH_BOOKINGS = `${store}/FETCH_BOOKINGS`;
export const FETCH_BOOKINGS_REQUEST = `${store}/FETCH_BOOKINGS_REQUEST`;
export const FETCH_BOOKINGS_SUCCESS = `${store}/FETCH_BOOKINGS_SUCCESS`;
export const FETCH_BOOKINGS_ERROR = `${store}/FETCH_BOOKINGS_ERROR`;

export const FETCH_CATEGORY_OPTIONS = `${store}/FETCH_CATEGORY_OPTIONS`;
export const FETCH_CATEGORY_OPTIONS_REQUEST = `${store}/FETCH_CATEGORY_OPTIONS_REQUEST`;
export const FETCH_CATEGORY_OPTIONS_SUCCESS = `${store}/FETCH_CATEGORY_OPTIONS_SUCCESS`;
export const FETCH_CATEGORY_OPTIONS_ERROR = `${store}/FETCH_CATEGORY_OPTIONS_ERROR`;

export const CREATE_CATEGORY = `${store}/CREATE_CATEGORY`;
export const CREATE_CATEGORY_REQUEST = `${store}/CREATE_CATEGORY_REQUEST`;
export const CREATE_CATEGORY_SUCCESS = `${store}/CREATE_CATEGORY_SUCCESS`;
export const CREATE_CATEGORY_ERROR = `${store}/CREATE_CATEGORY_ERROR`;

export const CREATE_BOOKING = `${store}/CREATE_BOOKING`;
export const CREATE_BOOKING_REQUEST = `${store}/CREATE_BOOKING_REQUEST`;
export const CREATE_BOOKING_SUCCESS = `${store}/CREATE_BOOKING_SUCCESS`;
export const CREATE_BOOKING_ERROR = `${store}/CREATE_BOOKING_ERROR`;

export const DELETE_BOOKING = `${store}/DELETE_BOOKING`;
export const DELETE_BOOKING_REQUEST = `${store}/DELETE_BOOKING_REQUEST`;
export const DELETE_BOOKING_SUCCESS = `${store}/DELETE_BOOKING_SUCCESS`;
export const DELETE_BOOKING_ERROR = `${store}/DELETE_BOOKING_ERROR`;

export const OPEN_BOOKING_MODAL = `${store}/OPEN_BOOKING_MODAL`;
export const CLOSE_BOOKING_MODAL = `${store}/CLOSE_BOOKING_MODAL`;

export default class DashboardAction {
  static FETCH_BOOKINGS = {
    REQUEST: FETCH_BOOKINGS_REQUEST,
    SUCCESS: FETCH_BOOKINGS_SUCCESS,
    ERROR: FETCH_BOOKINGS_ERROR
  };

  static FETCH_CATEGORY_OPTIONS = {
    REQUEST: FETCH_CATEGORY_OPTIONS_REQUEST,
    SUCCESS: FETCH_CATEGORY_OPTIONS_SUCCESS,
    ERROR: FETCH_CATEGORY_OPTIONS_ERROR
  };

  static CREATE_CATEGORY = {
    REQUEST: CREATE_CATEGORY_REQUEST,
    SUCCESS: CREATE_CATEGORY_SUCCESS,
    ERROR: CREATE_CATEGORY_ERROR
  };

  static CREATE_BOOKING = {
    REQUEST: CREATE_BOOKING_REQUEST,
    SUCCESS: CREATE_BOOKING_SUCCESS,
    ERROR: CREATE_BOOKING_ERROR
  };

  static DELETE_BOOKING = {
    REQUEST: DELETE_BOOKING_REQUEST,
    SUCCESS: DELETE_BOOKING_SUCCESS,
    ERROR: DELETE_BOOKING_ERROR
  };

  static createCategory(payload) {
    return {
      type: CREATE_CATEGORY,
      payload: { data: payload }
    };
  }

  static createBooking(payload) {
    return {
      type: CREATE_BOOKING,
      payload: { data: payload }
    };
  }

  static deleteBooking(id) {
    return {
      type: DELETE_BOOKING,
      payload: { id }
    };
  }

  static fetchBookings(payload) {
    return {
      type: FETCH_BOOKINGS,
      payload: payload
    };
  }

  static fetchCategoryOptions() {
    return {
      type: FETCH_CATEGORY_OPTIONS
    };
  }

  static openBookingModal(id, type) {
    return {
      type: OPEN_BOOKING_MODAL,
      payload: { id, type }
    };
  }

  static closeBookingModal() {
    return {
      type: CLOSE_BOOKING_MODAL
    };
  }
}
