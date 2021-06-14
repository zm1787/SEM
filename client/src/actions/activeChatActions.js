import {
    NEW_MESSAGE,

    FETCH_CHAT,
    FETCH_CHAT_FAIL,
    FETCH_CHAT_SUCCESS,

    CLEAR,
} from "./actionTypes";
import { returnErrors } from './errorActions';
import * as api from '../api';


export const addNewMessage = (newMessage) => async (dispatch) => {
    try {
        dispatch({ type: NEW_MESSAGE, payload: newMessage });
    } catch (error) {
        console.log(error);
    }
}

export const fetchChat = (friend_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_CHAT });
        const { data } = await api.fetchChat(friend_id, tokenConfig(getState));
        console.log(data)
        dispatch({ type: FETCH_CHAT_SUCCESS, payload: data });
    } catch (error) {
        if (error.response !== undefined) {
            dispatch(returnErrors(error.response.data, error.response.status, FETCH_CHAT_FAIL));
            dispatch({ type: FETCH_CHAT_FAIL });
        }
        else {
            console.log(error);
        }
    }
}

export const clearActiveChat = () => async (dispatch) => {
    dispatch({ type: CLEAR });
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