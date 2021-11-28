import { combineReducers } from 'redux';

import AppReducer from 'App/reducer/App.reducer.js';
import AuthReducer from 'modules/auth/reducers/authReducers.js';
import DashboardReducer from 'modules/dashboard/reducers/dashboardReducer.js';
import AdminReducer from 'modules/admin/reducers/adminReducer.js';

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  app: AppReducer,
  auth: AuthReducer,
  dashboard: DashboardReducer,
  admin: AdminReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
