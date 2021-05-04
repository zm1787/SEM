// Reducers for Redux store
import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import businessReducer from './businessReducer';
import themeReducer from './themeReducer';

export default combineReducers({ 
    users: usersReducer, 
    error: errorReducer, 
    auth: authReducer,
    business: businessReducer,
    theme: themeReducer,
});