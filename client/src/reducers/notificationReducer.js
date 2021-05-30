import {
    ADD_NOTIFICATION,
    LOAD_NOTIFICATION,
    REMOVE_NOTIFICATION,
} from "../actions/actionTypes";


const notificationReducer = (notifications = [], action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            // Add one notification to the list (used while user is online)
            return [...notifications, action.payload];

        case LOAD_NOTIFICATION:
            // This action is used on initial load or to refresh all notifications
            return notifications = action.payload;

        case REMOVE_NOTIFICATION:
            if (!notifications.some(notification => notification._id === action.payload)) {
                console.error("'notifications' state does not contain a notification with id:", action.payload)
                return notifications;
            }
            return notifications.filter((notification) => notification._id !== action.payload);

        default:
            return notifications;
    }
}

export default notificationReducer;