const { default: DashboardAction } = require("../actions/dashboardAction");

const initialState = {
    bookings: {
        data: [],
        total: null,
        page: 1,
        isFetching: false
    }
};

const dashboardReducer = (state = initialState, { type, payload }) => {
    switch (type) {
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
        default:
            return state
    }
}

export default dashboardReducer