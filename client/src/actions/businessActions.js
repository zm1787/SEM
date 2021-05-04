import {
    REGISTER_BUSINESS_SUCCESS,
    REGISTER_BUSINESS_FAIL,
    REGISTER_BUSINESS,

    FETCH_BUSINESS_DETAILS,
    FETCH_BUSINESS_DETAILS_FAIL,
    FETCH_BUSINESS_DETAILS_SUCCESS,

    FETCH_MY_BUSINESSES_FAIL,
    FETCH_MY_BUSINESSES,
    FETCH_MY_BUSINESSES_SUCCESS,
} from "./actionTypes";
import { returnErrors } from './errorActions';
import * as api from '../api';

import history from '../history';


// Register business
export const registerBusiness = (newBusinessInfo) => async (dispatch, getState) => {

    // Request body
    const body = JSON.stringify(newBusinessInfo)

    try {
        dispatch({ type: REGISTER_BUSINESS });
        const { data } = await api.registerBusiness(body, tokenConfig(getState));
        dispatch({ type: REGISTER_BUSINESS_SUCCESS, payload: data });
        history.push("/myBusinesses");
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_BUSINESS_FAIL'));
        dispatch({ type: REGISTER_BUSINESS_FAIL });
    }
}

export const fetchMyBusinesses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_MY_BUSINESSES });
        const { data } = await api.fetchMyBusinesses(tokenConfig(getState));
        dispatch({ type: FETCH_MY_BUSINESSES_SUCCESS, payload: data.businesses });
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, FETCH_MY_BUSINESSES_FAIL));
        dispatch({ type: FETCH_MY_BUSINESSES_FAIL });
    }
}



// Fetch business
export const fetchBusiness = (businessID) => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_BUSINESS_DETAILS });
        const { data } = await api.fetchBusinessDetails(businessID, tokenConfig(getState));
        dispatch({ type: FETCH_BUSINESS_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, FETCH_BUSINESS_DETAILS_FAIL));
        dispatch({ type: FETCH_BUSINESS_DETAILS_FAIL });
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


