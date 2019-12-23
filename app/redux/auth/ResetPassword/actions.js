import { API } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';
import { resetStack } from '../../navigation/actions';
import { PATH } from '../../../routes';
import {RESPONSE_STATUS} from '../../../constants/constants';
import {encryptPassword} from '../../../utils/encryptPassword';
import {AuthGet, AuthPut} from '../../../services/http';

export const ResetPassword = {
    resetPasswordSuccess: 'set_password_success/ResetPassword',
    resetPasswordError: 'set_password_error/ResetPassword',
    getEmailIdSuccess: 'get_email_id_success/ResetPassword',
    getEmailIdError: 'get_email_id_error/ResetPassword',
    formDirty: 'form_dirty/ResetPassword'
};

export const formDirty = () => ({type: ResetPassword.formDirty})

export const resetPasswordSuccess = (data) => ({
        type: ResetPassword.resetPasswordSuccess,
        data
    })

export const resetPasswordError = (data) => ({
        type: ResetPassword.resetPasswordError,
        data
    })

export const getEmailIdSuccess = (data) => ({
        type: ResetPassword.getEmailIdSuccess,
        data
    })

export const getEmailIdError = (data) => ({
        type: ResetPassword.getEmailIdError,
        data
    })

export function getEmailId() {
    return (dispatch, getState) => {
        const welcomeState = getState().onboardingState && getState().onboardingState.welcomeState;
        let uid = welcomeState && welcomeState.uid
        let tokenkey = welcomeState && welcomeState.tokenkey

        dispatch(startLoading());
        return AuthGet(`${API.GetEmailIdByCoreoHomeUserId + uid}/${tokenkey}`).then((resp) => {
            if (resp && resp.data && resp.data.result === RESPONSE_STATUS.LINK_ACTIVE) {
                dispatch(getEmailIdSuccess(resp.data));
            } else {
                dispatch(getEmailIdError(resp.data));
            }
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(getEmailIdError(err.response.data));
            dispatch(endLoading());
        });
    }
}

export function resetPassword(data) {
    return (dispatch, getState) => {
        let currstate = getState(),
         userModel = {
            userId: '',
            userName: '',
            password: '',
            token: ''
        },
         encryptedPass = encryptPassword(data.password),
         {resetPasswordState} = currstate.authState,
         {welcomeState} = currstate.onboardingState;

        if (resetPasswordState) {
            userModel = {
                userId: welcomeState.uid,
                userName: resetPasswordState.emailId,
                password: encryptedPass,
                token: welcomeState.tokenkey
            };
            dispatch(startLoading());
            return AuthPut(API.ResetPassword, userModel).then((resp) => {
                if (resp && resp.status === RESPONSE_STATUS.SUCCESS) {
                    dispatch(resetPasswordSuccess(resp.data));
                    dispatch(resetStack(PATH.RESET_PASSWORD_SUCCESS));
                } else {
                    dispatch(resetPasswordError());
                }
                dispatch(endLoading());
            })
.catch((err) => {
                dispatch(resetPasswordError(err.response.data));
                dispatch(endLoading());
            })
        } else {
            dispatch(resetPasswordError(err.response.data));
        }
    }
}