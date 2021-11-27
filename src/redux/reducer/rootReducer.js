import { combineReducers } from 'redux';

import AppReducer from 'App/reducer/App.reducer.js';
import AuthReducer from 'modules/auth/reducers/authReducers.js';

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  app: AppReducer,
  auth: AuthReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
