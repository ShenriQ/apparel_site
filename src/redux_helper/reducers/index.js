import {combineReducers} from 'redux';
// import reducers
import userReducer from './user';
import loadingReducer from './loading';
import alertReducer from './alert';

export default combineReducers({
    userReducer, loadingReducer, alertReducer
});