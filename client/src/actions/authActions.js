import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../constants/actionTypes";
import { returnErrors } from './errorActions';
import * as api from '../api';

// Check token and load user
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

// Register User
export const registerUser = ({ firstName, lastName, email, password, passwordCheck }) => async (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ firstName, lastName, email, password, passwordCheck })

    try {
        const { data } = await api.registerUser(body, config);
        dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'));
        dispatch({ type: REGISTER_FAIL });
    }

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
