import React from 'react';
import ReactDOM from 'react-dom';
// import "@/assets/scss/index.scss"
import App from './App/App';

// redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

// root Saga
import rootSaga from './redux/saga/rootSaga';

// redux persit
import { persistor, sagaMiddleware } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
