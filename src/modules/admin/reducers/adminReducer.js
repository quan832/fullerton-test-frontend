import AdminAction, { CLOSE_MODAL, OPEN_MODAL } from '../actions/adminAction';

const initialState = {
  isOpenModal: false,
  bookingIdReject: null,
  data: [],
  total: null,
  page: 1,
  isFetching: false
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpenModal: true,
        bookingIdReject: payload.id
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpenModal: false,
        bookingIdReject: null
      };
    case AdminAction.FETCH_BOOKINGS.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case AdminAction.FETCH_BOOKINGS.SUCCESS:
      return {
        ...state,

        isFetching: false,
        data: payload.data,
        page: payload.page,
        total: payload.total
      };
    case AdminAction.FETCH_BOOKINGS.ERROR:
      return {
        ...state,
        isFetching: false,
        error: payload
      };
    default:
      return state;
  }
};

export default adminReducer;
