const { default: DashboardAction, OPEN_BOOKING_MODAL, CLOSE_BOOKING_MODAL } = require("../actions/dashboardAction");

const initialState = {
    bookingModal: {
        isOpenModal: false,
        modalOpenId: null,
    },
    categoryOptions: [],
    bookings: {
        data: [],
        total: null,
        page: 1,
        isFetching: false
    }
};

const dashboardReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case OPEN_BOOKING_MODAL:
            return {
                ...state,
                bookingModal: {
                    ...state.bookingModal,
                    isOpenModal: true,
                    modalOpenId: payload.id
                }
            }
        case CLOSE_BOOKING_MODAL:
            return {
                ...state,
                bookingModal: {
                    ...state.bookingModal,
                    isOpenModal: false,
                    nodalOpen: null
                }
            }
        case DashboardAction.FETCH_BOOKINGS.REQUEST:
            return {
                ...state,
                bookings: {
                    ...state.bookings,
                    isFetching: true,
                }
            }
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
            }
        case DashboardAction.FETCH_BOOKINGS.SUCCESS:
            return {
                ...state,
                bookings: {
                    ...state.bookings,
                    isFetching: false,
                    error: payload
                }
            }
        case DashboardAction.FETCH_CATEGORY_OPTIONS.SUCCESS:
            return {
                ...state,
                categoryOptions: payload.data
            }
        default:
            return state
    }
}

export default dashboardReducer