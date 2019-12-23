import { combineReducers } from 'redux';
import forgetPasswordState from './ForgetPassword/reducer';
import loginState from './Login/reducer';
import logoutState from './Logout/reducer';
import userState from './User/reducer';
import resetPasswordState from './ResetPassword/reducer';
import userAgreementState from './UserAgreement/reducer';
import {navigateToLoginReducer} from "./navigatedToLogin/reducer"
export const authState = combineReducers({
    forgetPasswordState,
    loginState,
    logoutState,
    resetPasswordState,
    userState,
    userAgreementState,
    navigateToLoginReducer
});