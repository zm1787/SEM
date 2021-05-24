// Reducers for Redux store
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import businessReducer from './businessReducer';
import themeReducer from './themeReducer';

export default combineReducers({ 
    users: userReducer, 
    error: errorReducer, 
    auth: authReducer,
    business: businessReducer,
    theme: themeReducer,
});