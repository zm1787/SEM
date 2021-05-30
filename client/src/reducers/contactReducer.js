import {
	SEND_CONTACT_REQUEST,
	SEND_CONTACT_REQUEST_FAIL,
	SEND_CONTACT_REQUEST_SUCCESS,

} from "../actions/actionTypes";

const initialState = {
    // TODO
};


const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_CONTACT_REQUEST:
            return {
                // TODO
                ...state,
            };
        case SEND_CONTACT_REQUEST_SUCCESS:
            return {
                // TODO
                ...state,
            };
        case SEND_CONTACT_REQUEST_FAIL:
            return {
                // TODO
                ...state,
            }
    
        default:
            return state;
    }
}

export default contactReducer;