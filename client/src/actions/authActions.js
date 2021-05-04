import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_USER,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./actionTypes";
import { returnErrors } from './errorActions';
import * as api from '../api';

// auth only: Gets first name, last name and email
export const loadUser = () => async (dispatch, getState) => {
    // User loading 
    dispatch({ type: USER_LOADING });

    try {
        const { data } = await api.loadUser(tokenConfig(getState));
        dispatch({ type: USER_LOADED, payload: data });
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({ type: AUTH_ERROR });
    }
}

// auth only: Gets firstName, lastName, email, userType and location
export const loadUserProfile = () => async (dispatch, getState) => {
    // User loading 
    dispatch({ type: USER_LOADING });

    try {
        const { data } = await api.loadUserProfile(tokenConfig(getState));
        dispatch({ type: USER_LOADED, payload: data });
    } catch (error) {
        console.log(error);
        dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({ type: AUTH_ERROR });
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
        dispatch({ type: USER_LOADING});
        const { data } = await api.registerUser(body, config);
        dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'));
        dispatch({ type: REGISTER_FAIL });
    }
}

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
        dispatch({ type: USER_LOADING});
        const { data } = await api.loginUser(body, config);
        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'));
        dispatch({ type: LOGIN_FAIL });
    }
}

// Logout User
export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    };
}



// Setup config/headers with the token
export const tokenConfig = getState => {
    // Get token from localStorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}
