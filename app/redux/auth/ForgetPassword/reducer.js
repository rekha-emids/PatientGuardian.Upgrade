import {
    ForgetPassword
} from './actions'

const defaultState = {
    sendResetPasswordLinkSuccess: false,
    sendResetPasswordLinkError: false,
    emailId: ''
};

export const forgetPasswordState = (state = defaultState, action) => {
    switch (action.type) {
        case ForgetPassword.sendResetPasswordLinkSuccess:
            return {
                ...state,
                sendResetPasswordLinkSuccess: true,
                sendResetPasswordLinkError: false,
                emailId: action.emailId
            };
        case ForgetPassword.sendResetPasswordLinkError:
            return {
                ...state,
                sendResetPasswordLinkSuccess: false,
                sendResetPasswordLinkError: true
            };
        case ForgetPassword.clearData:
            return defaultState;
        case ForgetPassword.clearErrorFlag:
            return {
                ...state,
                sendResetPasswordLinkError: false
            };
        default:
            return state;
    }
}

export default forgetPasswordState;