import {
    REGISTER_BUSINESS_SUCCESS,
    REGISTER_BUSINESS_FAIL,
    REGISTER_BUSINESS,
    CLEAR_REGISTER_SUCCESS,

    FETCH_BUSINESS_DETAILS,
    FETCH_BUSINESS_DETAILS_FAIL,
    FETCH_BUSINESS_DETAILS_SUCCESS,

    FETCH_MY_BUSINESSES_FAIL,
    FETCH_MY_BUSINESSES,
    FETCH_MY_BUSINESSES_SUCCESS,

    GET_NEARBY_BUSINESSES,
    GET_NEARBY_BUSINESSES_FAIL,
    GET_NEARBY_BUSINESSES_SUCCESS,

    CLEAR,
} from "../actions/actionTypes";

const initialState = {
    businessDetailsIsLoading: false,
    businessDetails: null,

    myBusinessesIsLoading: false,
    myBusinessList: [],

    nearbyBusinessesIsLoading: false,
    nearbyBusinesses: [],
};


const businessReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BUSINESS_DETAILS:
            return {
                ...state,
                businessDetailsIsLoading: true
            };
        case FETCH_BUSINESS_DETAILS_SUCCESS:
            return {
                ...state,
                businessDetailsIsLoading: false,
                businessDetails: action.payload,
            };
        case FETCH_BUSINESS_DETAILS_FAIL:
            return {
                ...state,
                businessDetails: null,
                businessDetailsIsLoading: false
            }




        case REGISTER_BUSINESS:
            return {
                ...state,
                businessDetailsIsLoading: true
            };
        case REGISTER_BUSINESS_SUCCESS:
            return {
                ...state,
                businessDetails: action.payload,
                businessDetailsIsLoading: false,
            };
        case REGISTER_BUSINESS_FAIL:
            return {
                ...state,
                businessDetails: null,
                businessDetailsIsLoading: false,
            }
        case CLEAR_REGISTER_SUCCESS:
            return {
                ...state,
            }




        case FETCH_MY_BUSINESSES:
            return {
                ...state,
                myBusinessesIsLoading: false
            }
        case FETCH_MY_BUSINESSES_SUCCESS:
            return {
                ...state,
                myBusinessesIsLoading: false,
                myBusinessList: action.payload,
            };
        case FETCH_MY_BUSINESSES_FAIL:
            return {
                ...state,
                myBusinessesIsLoading: false,
                myBusinessList: [],
            }


        case GET_NEARBY_BUSINESSES:
            return {
                ...state,
                nearbyBusinessesIsLoading: false
            }
        case GET_NEARBY_BUSINESSES_SUCCESS:
            return {
                ...state,
                nearbyBusinessesIsLoading: false,
                nearbyBusinesses: action.payload,
            };
        case GET_NEARBY_BUSINESSES_FAIL:
            return {
                ...state,
                nearbyBusinessesIsLoading: false,
                nearbyBusinesses: [],
            }

        case CLEAR:
            return initialState;

        default:
            return state;
    }
}

export default businessReducer;





