export const SET_NAVIGATE_TO_LOGIN = "SET_NAVIGATE_TO_LOGIN";
export const LOGIN_SCREEN = "LOGIN_SCREEN";
export const EMPTY_SCREEN = "";
export const SET_PASSWORD_SCREEN = "SET_PASSWORD_SCREEN";
export const setNavigateToLogin = (navigateToLoginObj) => ({
        type: SET_NAVIGATE_TO_LOGIN,
        payload: navigateToLoginObj
    })