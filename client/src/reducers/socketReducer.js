import {
    ADD_SOCKET,
} from "../actions/actionTypes";

const initialState = {
    notifications: {},
    activeChat: {},
}

// socket object shape => [{ socket, name: (String, socket's purpose) }]
const socketReducer = (sockets = initialState, action) => {
    switch (action.type) {
        case ADD_SOCKET:
            sockets[action.payload.socketName] = {socket: action.payload.socket, user_id: action.payload.user_id}
            return [...sockets, action.payload];

        default:
            return sockets;
    }
}

export default socketReducer;