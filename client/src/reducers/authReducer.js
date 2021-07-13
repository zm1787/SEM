import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_USER,
    ADD_FRIEND,
} from "../actions/actionTypes";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                /*{
                    // only add/refresh received information, keep any other fields  
                    ...state.user,
                    ...action.payload,
                },*/
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token); // Set token in local storage
            return {
                ...state,
                ...action.payload, // user and token
                isAuthenticated: true,
                isLoading: false,
            };

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_USER:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }

        case ADD_FRIEND:
            if(action.payload.businessName) {
                // if new friend has business name, it's a business
                return {
                    ...state,
                    user: {
                        ...state.user,
                        contacts: {
                            businesses: [...state.user.friends, action.payload]
                        }
                    }
                }
            }
            else {
                // if new friend has no business name, it's a client
                return {
                    ...state,
                    user: {
                        ...state.user,
                        contacts: {
                            clients: [...state.user.friends, action.payload]
                        }
                    }
                }
            }
            
        default:
            return state;
    }
}

export default authReducer;