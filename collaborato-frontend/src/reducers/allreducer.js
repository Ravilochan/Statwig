import {combineReducers} from 'redux';
import FeedReducer from './feed-reducer.js';
const storeManager = combineReducers({
  FeedReducer
});

export default storeManager;
