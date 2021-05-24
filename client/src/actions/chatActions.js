import {
    CREATE_NEW_CHAT, 
    CREATE_NEW_CHAT_FAIL,
    CREATE_NEW_CHAT_SUCCESS,

    FETCH_CHAT,
    FETCH_CHAT_FAIL,
    FETCH_CHAT_SUCCESS,
} from "./actionTypes";
import * as api from '../api';
import { returnErrors } from './errorActions';


// Create A New Chat
export const createNewChat = (newChat) => async (dispatch, getState) => {
    // Request body
    const body = JSON.stringify(newChat)

    try {
        dispatch({ type: CREATE_NEW_CHAT });
        const { data } = await api.createNewChat(body, tokenConfig(getState));
        dispatch({ type: CREATE_NEW_CHAT_SUCCESS, payload: data });
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, CREATE_NEW_CHAT_FAIL));
        dispatch({ type: CREATE_NEW_CHAT_FAIL });
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