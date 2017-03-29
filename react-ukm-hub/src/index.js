import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware,compose} from 'redux'
import reducers from './reducers/index.js'
import thunk from 'redux-thunk'
//const createStoreMiddleware = applyMiddleware(thunk)(createStore)
const middleware = applyMiddleware(thunk)
const store = createStore(reducers, compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
