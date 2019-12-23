import {API, baseURL} from '../../../services/api';
import { navigateToScreenMainStack } from '../../navigation/actions';
import { setProfileType, setRelationship } from '../ProfileSelection/actions';
import {PATH} from '../../../routes';
import {UserProfileType, RESPONSE_STATUS} from '../../../constants/constants';
import {clearState as profileTypeClear} from '../ProfileSelection/actions';
import {clearState as memberDetailsClear} from '../MemberDetailsForMC/actions';
import {clearState as personalDetailsClear} from '../PersonalDetailsForMC/actions';
import {encryptPassword} from '../../../utils/encryptPassword';
import {Get, Put} from '../../../services/http';
import { API_FETCHING, API_SUCCESS, API_FAILED } from '../../../constants/AppAPIConstants';

export const SetPasswordForMC = {
    cancelClick: 'cancel_click/setpassword',
    setPasswordSuccess: 'set_password_success/setpassword',
    setPasswordError: 'set_password_error/setpassword',
    getEmailIdSuccess: 'get_email_id_success/setpassword',
    getEmailIdError: 'get_email_id_error/setpassword',
    clearState: 'clear_state/setpassword',
    loadingStatus: 'setPassword/isLoading'
};

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

export const isLoading = (data) => ({
        type: SetPasswordForMC.loadingStatus,
        data
    })
export function onCancelClick(){
    return (dispatch) => {
        dispatch(cancelClick());
        dispatch(profileTypeClear());
        dispatch(memberDetailsClear());
        dispatch(personalDetailsClear());
        dispatch(navigateToScreenMainStack(PATH.WELCOME_SCREEN));
    }
}

export function getEmailId(data) {
    return (dispatch) => {
        let url = `${API.GetEmailIdByUserId + data.uid}/${data.tokenkey}`;

        data.profileType === UserProfileType.Patient 
        ? dispatch(setProfileType(UserProfileType.Individual))
        : dispatch(setProfileType(UserProfileType.Guardian))
        dispatch(isLoading(API_FETCHING));
        Get(url, baseURL).then((resp) => {
            if (resp && resp.data && resp.data.existResult === RESPONSE_STATUS.VALID){
                dispatch(setRelationship(resp.data.relationShipName));
                dispatch(getEmailIdSuccess(resp.data));
            } else {
                dispatch(getEmailIdError(resp.data));
            }
            dispatch(isLoading(API_SUCCESS));
        })
.catch((err) => {
            dispatch(getEmailIdError(err.response.data));
            dispatch(isLoading(API_FAILED));
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
        dispatch(isLoading(API_FETCHING));
        Put(API.SetPassword + patientId, userModel, baseURL).then((resp) => {
            if (resp && resp.data){
                dispatch(setPasswordSuccess(resp.data));
                dispatch(navigateToScreenMainStack(PATH.MEMBER_DETAILS_SCREEN));
            } else {
                dispatch(setPasswordError());
                dispatch(navigateToScreenMainStack(PATH.WELCOME_SCREEN));
            }
            dispatch(isLoading(API_SUCCESS));
        })
.catch((err) => {
            dispatch(setPasswordError());
            dispatch(isLoading(API_FAILED));
            dispatch(navigateToScreenMainStack(PATH.WELCOME_SCREEN));
        })
    }
}
