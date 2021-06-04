import {
    CONNECT_SOCKET,
    DISCONNECT_SOCKET,
} from "./actionTypes";
import io from 'socket.io-client';
import { addNotification } from './notificationActions';

const ENDPOINT = 'localhost:5000';
let socket

export const connectSocket = (user_id) => async (dispatch) => {
    try {
        socket = io(ENDPOINT);

        socket.emit('connection', { user_id }, (/* {error} */) => {
            // Do something with error
        });

        // Server added friend request
        socket.on('new-friend-request-added', (newFriendRequest) => {
            console.log("Friend request received")
            // Friend request received, add to notifications
            dispatch(addNotification(newFriendRequest));
        });

        // Add socket to redux store
        dispatch({ type: CONNECT_SOCKET, payload: socket });

    } catch (error) {
        console.log(error);
    }
}

export const disconnectSocket = (user_id) => async (dispatch) => {
    try {

        socket.emit('disconnection', { user_id }, (/* {error} */) => {
            // Do something with error
        });

        socket.disconnect();

        // Remove socket from redux store
        dispatch({ type: DISCONNECT_SOCKET });

    } catch (error) {
        console.log(error);
    }
}

