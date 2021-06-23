// Reducers for Redux store
import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import businessReducer from './businessReducer';
import themeReducer from './themeReducer';
import notificationReducer from './notificationReducer';
import socketReducer from './socketReducer';
import activeChatReducer from './activeChatReducer';

export default combineReducers({ 
    activeChat: activeChatReducer,
    socket: socketReducer,
    notifications: notificationReducer,
    error: errorReducer, 
    auth: authReducer,
    business: businessReducer,
    theme: themeReducer,
});