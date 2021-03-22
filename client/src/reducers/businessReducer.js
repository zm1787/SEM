import {
    BUSINESS_LOADING,
    BUSINESS_LOADED,
    REGISTER_BUSINESS_SUCCESS,
    REGISTER_BUSINESS_FAIL,
    FETCH_BUSINESS_FAIL,
    FETCH_BUSINESS,
} from "../actions/actionTypes";

const initialState = {
    isLoading: false,
    business: null,
};


const businessReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BUSINESS:
        case BUSINESS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case BUSINESS_LOADED:
            return {
                ...state,
                isLoading: false,
                business: action.payload,
            };
        case REGISTER_BUSINESS_SUCCESS:
            console.log("Business created: ", action.payload);
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            };
        case FETCH_BUSINESS_FAIL:
        case REGISTER_BUSINESS_FAIL:
            console.log("Business Creation Failed.");

            return {
                ...state,
                business: null,
                isLoading: false
            }
        default:
            return state;
    }
}

export default businessReducer;





