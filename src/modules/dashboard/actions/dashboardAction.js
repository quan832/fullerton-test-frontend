const store = 'dashboard'

export const FETCH_BOOKINGS = `${store}/FETCH_BOOKINGS`
export const FETCH_BOOKINGS_REQUEST = `${store}/FETCH_BOOKINGS_REQUEST`
export const FETCH_BOOKINGS_SUCCESS = `${store}/FETCH_BOOKINGS_SUCCESS`
export const FETCH_BOOKINGS_ERROR = `${store}/FETCH_BOOKINGS_ERROR`


export default class DashboardAction {
    static FETCH_BOOKINGS = {
        REQUEST: FETCH_BOOKINGS_REQUEST,
        SUCCESS: FETCH_BOOKINGS_SUCCESS,
        ERROR: FETCH_BOOKINGS_ERROR
    };

    static fetchBookings(payload) {
        return {
            type: FETCH_BOOKINGS,
            payload: payload
        };
    }


}
