// Reducers for Redux store
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import businessReducer from './businessReducer';
import themeReducer from './themeReducer';
import contactReducer from './contactReducer';
import notificationReducer from './notificationReducer';
import socketReducer from './socketReducer';

export default combineReducers({ 
    sockets: socketReducer,
    notifications: notificationReducer,
    contact: contactReducer,
    users: userReducer, 
    error: errorReducer, 
    auth: authReducer,
    business: businessReducer,
    theme: themeReducer,
});