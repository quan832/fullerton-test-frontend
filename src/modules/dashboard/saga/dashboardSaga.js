import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { Message } from 'utils/Message';
import { errorNotification, getError, successNotification } from 'utils/Notifcation';
import { API } from 'apis/index';
import DashboardAction, { FETCH_BOOKINGS, FETCH_CATEGORY_OPTIONS } from '../actions/dashboardAction';


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

function* watchFetchListBookings() {
    yield takeLatest(FETCH_BOOKINGS, fetchListBookings)
}

function* watchFetchCategoryOptions() {
    yield takeLatest(FETCH_CATEGORY_OPTIONS, fetchCategoryOptions)
}

export default function* dashboardSaga() {
    yield all([watchFetchListBookings(), watchFetchCategoryOptions()])
}