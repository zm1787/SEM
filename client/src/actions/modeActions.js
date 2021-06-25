import {
    TOGGLE
} from "./actionTypes";

export const toggleMode = () => async (dispatch) => {
    dispatch({ type: TOGGLE });
}