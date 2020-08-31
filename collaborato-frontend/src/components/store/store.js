import {createStore, applyMiddleware} from 'redux';
import storeManager from './../../reducers/allreducer.js';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || window.__REDUX_DEVTOOLS_EXTENSION__();
const middleware = [thunk , promise];
const store = createStore(storeManager, composeWithDevTools(
  applyMiddleware(...middleware),
));
export default store;
