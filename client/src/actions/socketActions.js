import {
    ADD_SOCKET,
} from "./actionTypes";
import io from 'socket.io-client';
import { addNotification } from './notificationActions';

const ENDPOINT = 'localhost:5000';

export const addSocket = (newSocketName, user_id) => async (dispatch) => {
    try {
        let socket = io(ENDPOINT);
        socket.emit('connect_to_notifications', { user_id }, (/* {error} */) => {
            // Do something with error
        });

        // Server added friend request
        socket.on('new-friend-request-added', (newFriendRequest) => {
            const {
                _id,
                recipient_id,
                sender_id,
            } = newFriendRequest;

            console.log("New friend request received: ", newFriendRequest)
            // Friend request received, add to notifications
            dispatch(addNotification(newFriendRequest));
        });

        // Add socket to redux store
        dispatch({ type: ADD_SOCKET, payload: { socketName: newSocketName, socket, user_id }});

    } catch (error) {
        console.log(error);
    }
}

