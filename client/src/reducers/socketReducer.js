import {
    CONNECT_SOCKET,
    DISCONNECT_SOCKET,
} from "../actions/actionTypes";

const initialState = {}

// socket object shape => [{ socket, name: (String, socket's purpose) }]
const socketReducer = (socket = initialState, action) => {
    switch (action.type) {
        case CONNECT_SOCKET:
            return action.payload;
        
        case DISCONNECT_SOCKET:
            return {};

        default:
            return socket;
    }
}

export default socketReducer;