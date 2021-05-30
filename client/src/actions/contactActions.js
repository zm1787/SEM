import {
	SEND_CONTACT_REQUEST,
	SEND_CONTACT_REQUEST_FAIL,
	SEND_CONTACT_REQUEST_SUCCESS,

} from "./actionTypes";
import * as api from '../api';
import { returnErrors } from './errorActions';
    
    

export const sendContactRequest = (newRequest) => async (dispatch, getState) => {
    // Request body
    const body = JSON.stringify(newRequest)

    try {
        dispatch({ type: SEND_CONTACT_REQUEST });
        const { data } = await api.sendContactRequest(body, tokenConfig(getState));
        dispatch({ type: SEND_CONTACT_REQUEST_SUCCESS, payload: data });
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, SEND_CONTACT_REQUEST_FAIL));
        dispatch({ type: SEND_CONTACT_REQUEST_FAIL });
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