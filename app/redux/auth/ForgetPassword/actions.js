import { API } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';
import { PATH } from '../../../routes';
import {RESPONSE_STATUS} from '../../../constants/constants';
import {AuthGet} from '../../../services/http';
import { resetStack } from '../../navigation/actions';

export const ForgetPassword = {
    sendResetPasswordLinkSuccess: 'send_verification_link_success/forgetPassword',
    sendResetPasswordLinkError: 'send_verification_link_error/forgetPassword',
    clearData: 'clear_data/forgetPassword',
    clearErrorFlag: 'clear_error_flag/forgetPassword'
};

export const clearData = () => ({type: ForgetPassword.clearData})

export const sendResetPasswordLinkSuccess = (data, emailId) => ({
        type: ForgetPassword.sendResetPasswordLinkSuccess,
        data,
        emailId
    })

export const sendResetPasswordLinkError = () => ({type: ForgetPassword.sendResetPasswordLinkError})

export const clearErrorFlag = () => ({type: ForgetPassword.clearErrorFlag})

export function backToLogin() {
    return (dispatch) => {
        dispatch(clearData());
        dispatch(resetStack(PATH ? PATH.LOGIN_SCREEN : null));
    }
}

export function backToForgotPassword() {
    return (dispatch) => {
        dispatch(clearData());
        dispatch(resetStack(PATH.FORGET_PASSWORD_SCREEN));
    }
}

export function sendResetPasswordLink(data) {
    return (dispatch) => {
        let emailId = data && data.emailId;

        dispatch(startLoading());
        return AuthGet(API.SendResetPasswordLink + emailId).then((resp) => {
                if (resp && resp.status === RESPONSE_STATUS.SUCCESS) {
                    dispatch(sendResetPasswordLinkSuccess(resp.data, emailId));
                    dispatch(resetStack(PATH.SENT_EMAIL_CONFIRMATION));
                } else {
                    dispatch(sendResetPasswordLinkError());
                }
                dispatch(endLoading());
            })
.catch((err) => {
                dispatch(sendResetPasswordLinkError());
                dispatch(endLoading());
            });
    }
}