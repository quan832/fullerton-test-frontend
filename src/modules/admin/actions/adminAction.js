const store = 'admin';

export const FETCH_BOOKINGS = `${store}/FETCH_BOOKINGS`;
export const FETCH_BOOKINGS_REQUEST = `${store}/FETCH_BOOKINGS_REQUEST`;
export const FETCH_BOOKINGS_SUCCESS = `${store}/FETCH_BOOKINGS_SUCCESS`;
export const FETCH_BOOKINGS_ERROR = `${store}/FETCH_BOOKINGS_ERROR`;

export const UPDATE_BOOKING = `${store}/UPDATE_BOOKING`;
export const UPDATE_BOOKING_REQUEST = `${store}/UPDATE_BOOKING_REQUEST`;
export const UPDATE_BOOKING_SUCCESS = `${store}/UPDATE_BOOKING_SUCCESS`;
export const UPDATE_BOOKING_ERROR = `${store}/UPDATE_BOOKING_ERROR`;

export const CREATE_FEEDBACK = `${store}/CREATE_FEEDBACK`;
export const CREATE_FEEDBACK_REQUEST = `${store}/CREATE_FEEDBACK_REQUEST`;
export const CREATE_FEEDBACK_SUCCESS = `${store}/CREATE_FEEDBACK_SUCCESS`;
export const CREATE_FEEDBACK_ERROR = `${store}/CREATE_FEEDBACK_ERROR`;

export const OPEN_MODAL = `${store}/OPEN_MODAL`;
export const CLOSE_MODAL = `${store}/CLOSE_MODAL`;

export default class AdminAction {
  static FETCH_BOOKINGS = {
    REQUEST: FETCH_BOOKINGS_REQUEST,
    SUCCESS: FETCH_BOOKINGS_SUCCESS,
    ERROR: FETCH_BOOKINGS_ERROR
  };

  static UPDATE_BOOKING = {
    REQUEST: UPDATE_BOOKING_REQUEST,
    SUCCESS: UPDATE_BOOKING_SUCCESS,
    ERROR: UPDATE_BOOKING_ERROR
  };

  static CREATE_FEEDBACK = {
    REQUEST: CREATE_FEEDBACK_REQUEST,
    SUCCESS: CREATE_FEEDBACK_SUCCESS,
    ERROR: CREATE_FEEDBACK_ERROR
  };

  static createFeedback(id, description) {
    return {
      type: CREATE_FEEDBACK,
      payload: { id, description }
    };
  }

  static fetchBookings(payload) {
    return {
      type: FETCH_BOOKINGS,
      payload: payload
    };
  }

  static openModal(id) {
    return {
      type: OPEN_MODAL,
      payload: { id }
    };
  }

  static closeModal() {
    return {
      type: CLOSE_MODAL
    };
  }

  static updateBooking(id, rest) {
    return {
      type: UPDATE_BOOKING,
      payload: { id, ...rest }
    };
  }
}
