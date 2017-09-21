import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import App from 'App';
import { Quiz, reducer } from './';


const preloadedState = window.PRELOADED_STATE;

delete window.PRELOADED_STATE;

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
  reducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
    ),
  ),
);

render(
  <Provider store={store}>
    <App>
      <Quiz />
    </App>
  </Provider>,
  document.getElementById('app'),
);

