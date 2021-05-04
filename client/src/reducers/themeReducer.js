import { 
    SET_THEME,
} from '../actions/actionTypes';

const initialState = {
    selectedTheme: 'light',
}

const themeReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_THEME:
            return {
                selectedTheme: action.payload,
            };
        default:
            return state;
    }
}

export default themeReducer;