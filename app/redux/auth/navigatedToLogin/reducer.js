import { SET_NAVIGATE_TO_LOGIN } from "./action";

const navigateToLoginObj = {screen: false};

export function navigateToLoginReducer(state = navigateToLoginObj, action) {
    switch (action.type) {
        case SET_NAVIGATE_TO_LOGIN:
            return {
                ...state,
                screen: action.payload
            };
        default:
            return state;
    }
}
