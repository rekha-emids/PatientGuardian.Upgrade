import {API} from '../../../services/api';
import {startLoading, endLoading} from '../../loading/actions';
import { navigateToScreenMainStack } from '../../navigation/actions';
import { setProfileType, setRelationship } from '../ProfileType/actions';
import {PATH} from '../../../routes';
import {UserProfileType, RESPONSE_STATUS} from '../../../constants/constants';
import {clearState as profileTypeClear} from '../ProfileType/actions';
import {clearState as memberDetailsClear} from '../MemberDetails/actions';
import {clearState as personalDetailsClear} from '../PersonalDetails/actions';
import {encryptPassword} from '../../../utils/encryptPassword';
import {Get, Put} from '../../../services/http';

export const SetPassword = {
    cancelClick: 'cancel_click/setpassword',
    setPasswordSuccess: 'set_password_success/setpassword',
    setPasswordError: 'set_password_error/setpassword',
    getEmailIdSuccess: 'get_email_id_success/setpassword',
    getEmailIdError: 'get_email_id_error/setpassword',
    clearState: 'clear_state/setpassword',
    setUserInfo: 'set_user_info/setpassword'

};

export const setUserInfo = (data) => ({
        type: SetPassword.setUserInfo,
        data
    })


export const clearState = () => ({type: SetPassword.clearState})

export const cancelClick = () => ({type: SetPassword.cancelClick})

export const setPasswordSuccess = (data) => ({
        type: SetPassword.setPasswordSuccess,
        data
    })

export const setPasswordError = () => ({type: SetPassword.setPasswordError})

export const getEmailIdSuccess = (data) => ({
        type: SetPassword.getEmailIdSuccess,
        data
    })

export const getEmailIdError = (data) => ({
        type: SetPassword.getEmailIdError,
        data
    })
export function onCancelClick(){
    return (dispatch) => {
        dispatch(cancelClick());
        dispatch(profileTypeClear());
        dispatch(memberDetailsClear());
        dispatch(personalDetailsClear());
        dispatch(navigateToScreenMainStack(PATH ? PATH.WELCOME_SCREEN : null));
    }
}

export function getEmailId(data) {
    return (dispatch) => {
        let url = `${API.GetEmailIdByUserId + data.uid}/${data.tokenkey}`;

        data.profileType === 'patient' 
        ? dispatch(setProfileType(UserProfileType.Individual))
        : dispatch(setProfileType(UserProfileType.Guardian))
        dispatch(startLoading());
        Get(url).then((resp) => {
            if (resp && resp.data && resp.data.existResult === RESPONSE_STATUS.VALID){
                dispatch(setRelationship(resp.data.relationShipName));
                dispatch(getEmailIdSuccess(resp.data));
            } else {
                dispatch(getEmailIdError(resp.data));
            }
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(getEmailIdError(err.response.data));
            dispatch(endLoading());
        })
    }
}

export function setPassword(data) {
    return (dispatch, getState) => {
        let currstate = getState(),
         patientId = null,
         userModel = {
            userId: '',
            userName: '',
            password: '',
            token: ''
        };
        const encryptedPass = encryptPassword(data),
         {setPasswordState} = currstate.onboardingState;

        if (setPasswordState) {
            patientId = setPasswordState.patientId;
            userModel = {
                userId: setPasswordState.userId,
                userName: setPasswordState.emailId,
                password: encryptedPass,
                token: setPasswordState.token
            };
        }
        dispatch(startLoading());
        Put(API.SetPassword + patientId, userModel).then((resp) => {
            if (resp && resp.data){
                dispatch(setPasswordSuccess(resp.data));
                dispatch(navigateToScreenMainStack(PATH.MEMBER_DETAILS_SCREEN));
            } else {
                dispatch(setPasswordError());
                dispatch(navigateToScreenMainStack(PATH.WELCOME_SCREEN));
            }
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(setPasswordError());
            dispatch(endLoading());
            dispatch(navigateToScreenMainStack(PATH.WELCOME_SCREEN));
        })
    }
}
