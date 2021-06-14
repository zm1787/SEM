import {
    NEW_MESSAGE,

    FETCH_CHAT,
    FETCH_CHAT_FAIL,
    FETCH_CHAT_SUCCESS,

    CLEAR,
} from "../actions/actionTypes";

const initialState = {
    id: "",
    friendName: "",
    friend_id: "",
    createNewChat: false,
    isLoading: false,
    messages: [],
}

const activeChatReducer = (activeChat = initialState, action) => {
    switch (action.type) {
        case NEW_MESSAGE:
            // Add one notification to the list (used while user is online)
            return {
                ...activeChat,
                messages: [...activeChat.messages, action.payload]
            }

        case FETCH_CHAT:
            // This action is used on initial load or to refresh all notifications
            return {
                ...activeChat,
                isLoading: true,
            };

        case FETCH_CHAT_FAIL:
            // This action is used on initial load or to refresh all notifications
            return {
                ...activeChat,
                friendName: "",
                friend_id: "",
                isLoading: false,
                messages: [],
            };

        case FETCH_CHAT_SUCCESS:
            // This action is used on initial load or to refresh all notifications
            const { friendName, friend_id, messages, _id } = action.payload;
            return {
                ...activeChat,
                id: _id,
                friendName,
                friend_id,
                isLoading: false,
                messages,
            };

        case CLEAR:
            return initialState;



        default:
            return activeChat;
    }
}

export default activeChatReducer;