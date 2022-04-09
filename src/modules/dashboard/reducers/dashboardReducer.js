import { LOGOUT_USER } from 'modules/auth/actions/authAction';
import { FORMAT_DATE } from 'utils/ENUM';

const {
  default: DashboardAction,
  OPEN_BOOKING_MODAL,
  CLOSE_BOOKING_MODAL,
  CREATE_BOOKING_STEP1,
  CREATE_BOOKING_STEP2
} = require('../actions/dashboardAction');
const moment = require('moment');
const dataDateBooking = () => {
  const dateBooking = JSON.parse(localStorage.getItem('dataTime'));
  if (!dateBooking || dateBooking?.length === 0) {
    let data = [];
    for (let i = 0; i < 365; i++) {
      const dataTime = {
        date: moment().add(i, 'days').format(FORMAT_DATE),
        timeAvailable: [
          {
            time: '8:30 AM',
            available: Math.random() < 0.5
          },
          {
            time: '9:30 AM',
            available: Math.random() < 0.5
          },
          {
            time: '10:30 AM',
            available: Math.random() < 0.5
          },
          {
            time: '11:30 AM',
            available: Math.random() < 0.5
          },
          {
            time: '13:30 AM',
            available: Math.random() < 0.5
          },
          {
            time: '14:30 AM',
            available: Math.random() < 0.5
          },
          {
            time: '15:30 AM',
            available: Math.random() < 0.5
          },
          {
            time: '16:30 AM',
            available: Math.random() < 0.5
          }
        ]
      };
      data = [...data, dataTime];
    }

    localStorage.setItem('dataTime', JSON.stringify(data));

    return data;
  }
  return dateBooking;
};

const initialState = {
  bookingModal: {
    isOpenModal: false,
    modalOpenId: null,
    type: null
  },
  categoryOptions: [],
  isFetching: false,
  bookings: {
    data: [],
    total: null,
    page: 1,
    isFetching: false,
    temporary: null
  },
  dateBooking: dataDateBooking()
};

const dashboardReducer = (state = initialState, { type, payload }) => {
  let temporary
  let findDate
  switch (type) {
    case DashboardAction.CREATE_BOOKING.REQUEST:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          isFetching: true
        }
      }
    case DashboardAction.CREATE_BOOKING.SUCCESS:
      temporary = { ...state.bookings.temporary }
      findDate = [...state.dateBooking].map((item) => {
        if (item.date === temporary.date[0]) {
          const indexTime = item.timeAvailable.findIndex(e => e.time === temporary.time)
          const timeAvailable = [...item.timeAvailable]
          timeAvailable[indexTime].available = !item.timeAvailable[indexTime]
          return {
            ...item, timeAvailable: timeAvailable
          }
        }
        return item
      })

      console.log(findDate)

      return {
        ...state,
        dateBooking: findDate,
        bookings: {
          data: payload,
          total: payload?.length,
          page: 1,
          isFetching: false,
          temporary: null
        }
      }
    case CREATE_BOOKING_STEP1:
    case CREATE_BOOKING_STEP2:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          temporary: { ...state.bookings.temporary, ...payload }
        }
      }
    case OPEN_BOOKING_MODAL:
      return {
        ...state,
        bookingModal: {
          ...state.bookingModal,
          isOpenModal: true,
          modalOpenId: payload.id,
          type: payload.type
        }
      };
    case CLOSE_BOOKING_MODAL:
      return {
        ...state,
        bookingModal: {
          ...state.bookingModal,
          isOpenModal: false,
          nodalOpen: null,
          type: null
        }
      };
    case DashboardAction.FETCH_BOOKINGS.REQUEST:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          isFetching: true
        }
      };
    case DashboardAction.FETCH_BOOKINGS.SUCCESS:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          isFetching: false,
          data: payload.data,
          page: payload.page,
          total: payload.total
        }
      };
    case DashboardAction.FETCH_BOOKINGS.ERROR:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          isFetching: false,
          error: payload
        }
      };
    case DashboardAction.FETCH_CATEGORY_OPTIONS.SUCCESS:
      return {
        ...state,
        categoryOptions: payload.data
      };
    case DashboardAction.DELETE_BOOKING.REQUEST:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          temporary: payload,
          isFetching: true
        }
      };
    case DashboardAction.DELETE_BOOKING.SUCCESS:
      temporary = { ...state.bookings.temporary }
      const deleteDate = [...state.dateBooking].map((item) => {
        if (item.date === temporary.date[0]) {
          const indexTime = item.timeAvailable.findIndex(e => e.time === temporary.time)
          console.log(indexTime)
          const timeAvailable = [...item.timeAvailable]
          timeAvailable[indexTime].available = true
          return {
            ...item, timeAvailable: timeAvailable
          }
        }
        return item
      })

      return {
        ...state,
        bookings: {
          ...state.bookings,
          data: payload,
          isFetching: false,
          temporary: null,
          dateBooking: deleteDate,
        }
      };
    case DashboardAction.CREATE_CATEGORY.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case DashboardAction.CREATE_CATEGORY.SUCCESS:
      return {
        ...state,
        isFetching: false,
        categoryOptions: [...payload.data]
      };
    case DashboardAction.CREATE_CATEGORY.ERROR:
      return {
        ...state,
        isFetching: false,
        error: ''
      };
    // case LOGOUT_USER:
    //   return initialState
    default:
      return state;
  }
};

export default dashboardReducer;
