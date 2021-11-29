export const LOGIN_USER = 'authentication/LOGIN_USER';
export const LOGIN_REQUEST = 'authentication/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'authentication/LOGIN_FAILURE';
export const LOGOUT_USER = 'authentication/LOGOUT_USER';

export default class LoginAction {
  static LOGIN_USER = {
    REQUEST: LOGIN_REQUEST,
    SUCCESS: LOGIN_SUCCESS,
    ERROR: LOGIN_FAILURE
  };

  static loginUser(user) {
    return {
      type: LOGIN_USER,
      payload: user
    };
  }

  static logoutUser(payload) {
    return {
      type: LOGOUT_USER,
      payload: payload
    };
  }
}
