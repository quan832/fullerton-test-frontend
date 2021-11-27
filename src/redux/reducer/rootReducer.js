import { combineReducers } from 'redux';

import AppReducer from 'App/reducer/App.reducer.js';

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  app: AppReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
