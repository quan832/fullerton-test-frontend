import AdminAction, { CLOSE_MODAL, OPEN_MODAL } from '../actions/adminAction';

const initialState = {
  isOpenModal: false,
  bookingIdReject: null,
  data: [],
  total: null,
  page: 1,
  isFetching: false,
  accountManagement: {
    data: []
  }
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AdminAction.CREATE_ACCOUNT.SUCCESS:

      console.log(payload)
      return {
        ...state,
        accountManagement: {
          ...state.accountManagement,
          data: payload
        }
      }
    case OPEN_MODAL:
      return {
        ...state,
        isOpenModal: true,
        bookingIdReject: payload.id
      };
    case AdminAction.GET_USERS.REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case AdminAction.GET_USERS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        accountManagement: {
          ...state.accountManagement,
          data: payload.data
        }
      }
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
    case AdminAction.CREATE_FEEDBACK.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case AdminAction.CREATE_FEEDBACK.SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: payload.data
      };
    case AdminAction.CREATE_FEEDBACK.ERROR:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default adminReducer;
