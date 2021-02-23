// Reducers for Redux store
import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({ 
    users: usersReducer, 
    error: errorReducer, 
    auth: authReducer
});