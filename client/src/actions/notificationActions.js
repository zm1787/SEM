import {
    ADD_NOTIFICATION,
    LOAD_NOTIFICATION,
    REMOVE_NOTIFICATION,

    CLEAR,
} from "./actionTypes";
import tokenConfig from './tokenConfig';

export const addNotification = (newNotification) => async (dispatch) => {
    try {
        dispatch({ type: ADD_NOTIFICATION, payload: newNotification });
    } catch (error) {
        console.log(error);
    }
}

export const loadNotification = (notifications) => async (dispatch) => {
    try {
        // Notifications are part of auth.user, so it is already 
        dispatch({ type: LOAD_NOTIFICATION, payload: notifications });
    } catch (error) {
        console.log(error);
    }
}

export const removeNotification = (notification_id) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_NOTIFICATION, payload: notification_id });
    } catch (error) {
        console.log(error);
    }
}

export const clearNotifications = () => async (dispatch) => {
    dispatch({ type: CLEAR });
}