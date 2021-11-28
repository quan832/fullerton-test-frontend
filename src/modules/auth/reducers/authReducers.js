import LoginAction, { LOGOUT_USER } from '../actions/authAction';
import { checkAuthenticate } from '../saga/authSaga.js';
import { getUserInfo } from './../saga/authSaga';

const initialState = {
  isAuthenticated: checkAuthenticate(),
  isFetching: false,
  user: getUserInfo()
};

function authentication(state = initialState, { type, payload }) {
  switch (type) {
    case LoginAction.LOGIN_USER.REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        error: ''
      };
    case LoginAction.LOGIN_USER.SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: getUserInfo(),
        error: ''
      };
    case LoginAction.LOGIN_USER.ERROR:
      return {
        ...state,
        error: payload,
        isFetching: false,
        isAuthenticated: false
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
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
