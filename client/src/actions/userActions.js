import { FETCH_ALL, CREATE, UPDATE, DELETE } from './actionTypes';
import * as api from '../api';

// Action Creators

// Action creators are functions that return an action 
// An action is an object that has a type and a payload
// We wrap the function in a parent function (async (dispatch)) for the asyncronous logic

export const getUsers = () => async (dispatch) => {
    try {
        // Fetch all users from the api
        const { data } = await api.getUsers();

        // Dispatch action
        dispatch({ type: FETCH_ALL, payload: data }); 
    } catch (error) {
        console.log(error);
    }
}

// Old register user function
/* 
export const createUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.createUser(user);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}
*/

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, user); // data from the response

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id); // no need to store any respose. Just deleting

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}






