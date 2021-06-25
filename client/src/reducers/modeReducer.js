import {
    TOGGLE,
} from "../actions/actionTypes";

const initialMode = "seeker"

const modeReducer = (mode = initialMode, action) => {
    switch (action.type) {
        case TOGGLE:
            // Add one notification to the list (used while user is online)
            return mode === "seeker" ? "business" : "seeker"

        default:
            return mode;
    }
}

export default modeReducer;