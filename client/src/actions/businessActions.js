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

    GET_NEARBY_BUSINESSES,
    GET_NEARBY_BUSINESSES_FAIL,
    GET_NEARBY_BUSINESSES_SUCCESS,

    CLEAR,
} from "./actionTypes";
import { returnErrors } from './errorActions';
import * as api from '../api';
import tokenConfig from './tokenConfig';

import history from '../history';


// Register business
export const registerBusiness = (newBusinessInfo) => async (dispatch, getState) => {

    // Request body
    const body = JSON.stringify(newBusinessInfo)

    try {
        dispatch({ type: REGISTER_BUSINESS });
        const { data } = await api.registerBusiness(body, tokenConfig(getState));
        dispatch({ type: REGISTER_BUSINESS_SUCCESS, payload: data });
        history.push("/my-business-list");
    } catch (error) {
        if (error.response !== undefined) {
            dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_BUSINESS_FAIL'));
            dispatch({ type: REGISTER_BUSINESS_FAIL });
        }
        else {
            console.log(error);
        }
    }
}

export const fetchMyBusinesses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_MY_BUSINESSES });
        const { data } = await api.fetchMyBusinesses(tokenConfig(getState));
        dispatch({ type: FETCH_MY_BUSINESSES_SUCCESS, payload: data });
    } catch (error) {
        if (error.response !== undefined) {
            dispatch(returnErrors(error.response.data, error.response.status, FETCH_MY_BUSINESSES_FAIL));
            dispatch({ type: FETCH_MY_BUSINESSES_FAIL });
        }
        else {
            console.log(error);
        }
    }
}

export const getNearbyBusinesses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_NEARBY_BUSINESSES });
        const { data } = await api.getNearbyBusinesses(tokenConfig(getState));
        dispatch({ type: GET_NEARBY_BUSINESSES_SUCCESS, payload: data });
    } catch (error) {
        if (error.response !== undefined) {
            dispatch(returnErrors(error.response.data, error.response.status, GET_NEARBY_BUSINESSES_FAIL));
            dispatch({ type: GET_NEARBY_BUSINESSES_FAIL });
        }
        else {
            console.log(error);
        }
    }
}



// Fetch business
export const fetchBusiness = (businessID) => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_BUSINESS_DETAILS });
        const { data } = await api.fetchBusinessDetails(businessID, tokenConfig(getState));
        dispatch({ type: FETCH_BUSINESS_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        if (error.response !== undefined) {
            dispatch(returnErrors(error.response.data, error.response.status, FETCH_BUSINESS_DETAILS_FAIL));
            dispatch({ type: FETCH_BUSINESS_DETAILS_FAIL });
        }
        else {
            console.log(error);
        }
    }
}

export const clearBusiness = () => async (dispatch) => {
    dispatch({ type: CLEAR });
}


