import {
    SET_THEME,
} from "./actionTypes";


// Register business
export const selectTheme = (newTheme) => async (dispatch) => {
    dispatch({ type: SET_THEME, payload: newTheme });
}




