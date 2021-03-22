import {
    BUSINESS_LOADING,
    BUSINESS_LOADED,
    REGISTER_BUSINESS_SUCCESS,
    REGISTER_BUSINESS_FAIL,
} from "./actionTypes";
import { returnErrors } from './errorActions';
import * as api from '../api';
import { useSelector, useDispatch } from 'react-redux';


// Register business
export const registerBusiness = (formInfo) => async (dispatch, getState) => {

    // Request body
    const body = JSON.stringify(formInfo)

    try {
        dispatch({ type: BUSINESS_LOADING});
        const { data } = await api.registerBusiness(body, tokenConfig(getState));
        dispatch({ type: REGISTER_BUSINESS_SUCCESS, payload: data });
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_BUSINESS_FAIL'));
        dispatch({ type: REGISTER_BUSINESS_FAIL });
    }
}

/*
// Fetch business
export const fetchBusiness = ({ businessID }) => async (dispatch) => {
    const auth = useSelector((store) => store.auth);

}
*/


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


