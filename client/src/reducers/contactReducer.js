import {
    FETCH_CONTACTS,
    FETCH_CONTACTS_FAIL,
    FETCH_CONTACTS_SUCCESS,

} from "../actions/actionTypes";


const initialState = {
    contacts: [],
    errorMessage: "",
    isLoading: false,
}

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTACTS:
            return {
                // TODO
                ...state,
                isLoading: true,
            };

        case FETCH_CONTACTS_SUCCESS:
            return {
                ...state,
                errorMessage: "",
                contacts: action.payload,
                isLoading: false,
            };;

        case FETCH_CONTACTS_FAIL:
            return {
                ...state,
                errorMessage: action.payload,
                contacts: [],
                isLoading: false,
            };

        default:
            return state;
    }
}

export default contactReducer;