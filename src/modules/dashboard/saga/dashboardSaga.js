import { all, call, fork, put, select, takeLatest } from '@redux-saga/core/effects';
import { Message } from 'utils/Message';
import { errorNotification, getError, successNotification } from 'utils/Notifcation';
import { API } from 'apis/index';
import DashboardAction, { CLOSE_BOOKING_MODAL, DELETE_BOOKING, FETCH_BOOKINGS, FETCH_CATEGORY_OPTIONS } from '../actions/dashboardAction';


const getBookings = (state) => state.dashboard.bookings.data


function* fetchListBookings({ payload }) {
    try {
        const { page = 1, perPage = 4 } = payload
        yield put({ type: DashboardAction.FETCH_BOOKINGS.REQUEST })

        const { data: { data, total } } = yield call(API.bookingAPI.fetchBookings, page, perPage)

        yield put({
            type: DashboardAction.FETCH_BOOKINGS.SUCCESS, payload: {
                data,
                page,
                total,
            }
        })
    } catch (error) {
        errorNotification(getError(error));
    }
}

function* fetchCategoryOptions() {
    try {
        yield put({ type: DashboardAction.FETCH_CATEGORY_OPTIONS.REQUEST })
        const { data } = yield call(API.categoriesAPI.fetchCategoryOptions)
        yield put({
            type: DashboardAction.FETCH_CATEGORY_OPTIONS.SUCCESS, payload: { data }
        })
    } catch (error) {
        errorNotification(getError(error));
        yield put({
            type: DashboardAction.FETCH_CATEGORY_OPTIONS.ERROR, payload: getError(error)
        })
    }
}


function* deleteBooking({ payload }) {
    try {
        const bookingData = yield select(getBookings)
        const { id } = payload
        yield put({ type: DashboardAction.DELETE_BOOKING.REQUEST })
        const { data: { message } } = yield call(API.bookingAPI.deleteBooking, id)

        let newData = [...bookingData];
        newData = newData.filter((item) => item.id !== id)

        yield put({ type: CLOSE_BOOKING_MODAL })
        yield put({ type: DashboardAction.DELETE_BOOKING.SUCCESS, payload: { data: newData } })

        yield fork(fetchListBookings, { payload: { page: 1, perPage: 4 } })
        successNotification(message)
    } catch (error) {
        errorNotification(getError(error));
        yield put({
            type: DashboardAction.DELETE_BOOKING.ERROR, payload: getError(error)
        })
    }
}

// function* fetchAndUpdateBookings() {
//     yield fork(fetchListBookings, { payload: { page: 1, perPage: 4 } }{ payload: { page: 1, perPage: 4 } })
// }

function* watchFetchListBookings() {
    yield takeLatest(FETCH_BOOKINGS, fetchListBookings)
}

function* watchDeleteBooking() {
    yield takeLatest(DELETE_BOOKING, deleteBooking)
}

function* watchFetchCategoryOptions() {
    yield takeLatest(FETCH_CATEGORY_OPTIONS, fetchCategoryOptions)
}

export default function* dashboardSaga() {
    yield all([watchFetchListBookings(), watchFetchCategoryOptions(), watchDeleteBooking()])
}