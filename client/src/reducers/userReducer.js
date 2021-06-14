import { 
    FETCH_ALL, 
    CREATE, 
    UPDATE, 
    DELETE,
} from '../actions/actionTypes';


const userReducer = (users = [], action) => {  
    switch (action.type) {
        case DELETE:
            return users.filter((user) => user._id !== action.payload);
        case UPDATE:
            return users.map((user) => (user._id === action.payload._id ? action.payload : user));
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...users, action.payload];
        default:
            //console.log(`ERROR: No action type called: ${action.type}`);
            return users;
    }

}

export default userReducer;