import {
    CONNECT_SOCKET,
    DISCONNECT_SOCKET,

    CLEAR,
} from "./actionTypes";
import io from 'socket.io-client';
import { addNotification, removeNotification } from './notificationActions';
import { addFriend } from './authActions';
import { addNewMessage } from './activeChatActions';

import reduxStore from '../store';
let store

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

        // Receiving a new message
        socket.on('new-message', (newMessage) => {
            store = reduxStore.getState();

            // if chat is active, add message to display. Else add to notifications
            if (store.activeChat.id === newMessage.chat_id) {
                // TODO: New message received, add to messages
                dispatch(addNewMessage(newMessage));
            }
            else {
                // TODO: New message received, add to notifications
                //dispatch(addNotification(newMessage));
            }
        });

        // Server added friend
        socket.on('friend-added', (newFriendRequest) => {
            console.log("Adding friend")
            // Friend request received, add to notifications
            dispatch(addFriend(newFriendRequest));
        });

        socket.on('delete-notification', ({ request_id }) => {
            console.log("delete-notification", request_id)
            dispatch(removeNotification(request_id));
        });

        socket.on('message-from-server', ({ message }) => {
            console.log("Message from server:", message)
            alert(message);
            // dispatch(removeNotification(request_id));
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

export const clearSocket = () => async (dispatch) => {
    dispatch({ type: CLEAR });
}

