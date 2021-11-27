import LoginAction from '../actions/authAction';
import { checkAuthenticate } from '../saga/authSaga.js';

const initialState = {
  isAuthenticated: checkAuthenticate(),
  isFetching: false
};

function authentication(state = initialState, { type, payload }) {
  switch (type) {
    case LoginAction.LOGIN_USER.REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: payload,
        error: ''
      };
    case LoginAction.LOGIN_USER.SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: payload.user,
        error: ''
      };
    case LoginAction.LOGIN_USER.ERROR:
      return {
        ...state,
        error: payload,
        isFetching: false,
        isAuthenticated: false
      };
    // case actionLogout.LOGOUT_USER.SUCCESS:
    // case actionLogout.LOGOUT_USER.ERROR:
    //   return {
    //     ...state,
    //     isAuthenticated: false,
    //     user: {}
    //   };
    default:
      return state;
  }
}

export default authentication;
