import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_USER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ADD_FRIEND,
} from "./actionTypes";
import { returnErrors } from './errorActions';
import * as api from '../api';
import { clearActiveChat } from './activeChatActions'
import { clearBusiness } from './businessActions'
import { disconnectSocket } from './socketActions'
import { clearNotifications } from './notificationActions'
import tokenConfig from './tokenConfig';
import history from '../history';


// Login User
export const loginUser = ({ email, password }) => async (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ email, password })

    try {
        dispatch({ type: USER_LOADING });
        const { data } = await api.loginUser(body, config);
        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        if (error.response !== undefined) {
            dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'));
            dispatch({ type: LOGIN_FAIL });
        }
        else {
            console.log(error);
        }
    }
}

// Logout User
export const logoutUser = () => async (dispatch) => {
    // Clear user related stores and go to home page
    dispatch(clearActiveChat());
    dispatch(clearBusiness());
    dispatch(disconnectSocket());
    dispatch(clearNotifications());
    dispatch({ type: LOGOUT_USER });
    history.push("/");
}

export const loadUserProfile = () => async (dispatch, getState) => {
    // User loading 
    dispatch({ type: USER_LOADING });

    try {
        const { data } = await api.loadUserProfile(tokenConfig(getState));
        dispatch({ type: USER_LOADED, payload: data });
    } catch (error) {
        if (error.response !== undefined) {
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({ type: AUTH_ERROR });
        }
        else {
            console.log(error);
        }
    }
}

// Register User
export const registerUser = (newUser) => async (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify(newUser)

    try {
        dispatch({ type: USER_LOADING });
        const { data } = await api.registerUser(body, config);
        dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (error) {
        if (error.response !== undefined) {
            dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'));
            dispatch({ type: REGISTER_FAIL });
        }
        else {
            console.log(error);
        }
    }
}

export const addFriend = (newFriend) => async (dispatch) => {
    try {
        dispatch({ type: ADD_FRIEND, payload: newFriend });
    } catch (error) {
        console.log(error);
    }
}









