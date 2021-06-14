import {
    FETCH_CONTACTS,
    FETCH_CONTACTS_FAIL,
    FETCH_CONTACTS_SUCCESS,

} from "./actionTypes";
import * as api from '../api';
import { returnErrors } from './errorActions';
    

export const fetchContacts = (newRequest) => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_CONTACTS });
        const { data } = await api.fetchContacts(tokenConfig(getState));
        dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, FETCH_CONTACTS_FAIL));
        dispatch({ type: FETCH_CONTACTS_FAIL, payload: error.response.data });
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