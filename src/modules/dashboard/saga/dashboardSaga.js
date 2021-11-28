import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { Message } from 'utils/Message';
import { errorNotification, getError, successNotification } from 'utils/Notifcation';
import { API } from 'apis/index';
import DashboardAction, { FETCH_BOOKINGS } from '../actions/dashboardAction';


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

function* watchFetchListBookings() {
    yield takeLatest(FETCH_BOOKINGS, fetchListBookings)
}

export default function* dashboardSaga() {
    yield all([watchFetchListBookings()])
}