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
import activeChatReducer from './activeChatReducer';

export default combineReducers({ 
    activeChat: activeChatReducer,
    socket: socketReducer,
    notifications: notificationReducer,
    contact: contactReducer,
    users: userReducer, 
    error: errorReducer, 
    auth: authReducer,
    business: businessReducer,
    theme: themeReducer,
});