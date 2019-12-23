import {API} from '../../../services/api';
import {Post} from '../../../services/http';
import {startLoading, endLoading} from '../../loading/actions';
import { navigateToScreenMainStack } from '../../navigation/actions';
import {PATH} from '../../../routes';
import {clearState as profileTypeClear} from '../ProfileType/actions';
import {clearState as memberDetailsClear} from '../MemberDetails/actions';
import {clearState as personalDetailsClear} from '../PersonalDetails/actions';
import { UserProfileType } from '../../../constants/constants';
import { API_FETCHING } from '../../../constants/AppAPIConstants';

export const SetUserId = {
    sendVerificationLinkSuccess: 'send_verification_link_success/setuserid',
    sendVerificationLinkError: 'send_verification_link_error/setuserid',
    cancelClick: 'cancel_click/setuserid',
    previousClick: 'previous_click/setuserid',
    clearState: 'clear_state/setuserid',
    formDirty: 'form_dirty/setuserid',
    loadingStatus: 'setUserId/isLoading'
};

export const isLoading = (data) => ({
        type: SetUserId.loadingStatus,
        data
    })

export const clearState = () => ({type: SetUserId.clearState})

export const formDirty = () => ({type: SetUserId.formDirty})

export const cancelClick = () => ({type: SetUserId.cancelClick})

export const previousClick = () => ({type: SetUserId.previousClick})

export const sendVerificationLinkSuccess = () => ({type: SetUserId.sendVerificationLinkSuccess})

export const sendVerificationLinkError = () => ({type: SetUserId.sendVerificationLinkError})

export function onPreviousClick(){
    return (dispatch, getState) => {
        let currstate = getState();

        if (currstate.onboardingState.profileTypeState.profileType === UserProfileType.Guardian){
            dispatch(previousClick());
            dispatch(navigateToScreenMainStack(PATH ? PATH.PERSONAL_DETAILS_SCREEN : null));
        } else {
            dispatch(previousClick());
            dispatch(navigateToScreenMainStack(PATH ? PATH.PROFILE_TYPE_SCREEN : null));
        }
    }
}

export function onCancelClick(){
    return (dispatch, getState) => {
        let currstate = getState();

        dispatch(cancelClick());
        dispatch(profileTypeClear());
        dispatch(memberDetailsClear());
        if (currstate.onboardingState.profileTypeState.profileType === UserProfileType.Guardian){
            dispatch(personalDetailsClear());
        }
        dispatch(navigateToScreenMainStack(PATH ? PATH.WELCOME_SCREEN : null));
    }
}

export function sendVerificationLink(data) {
    return (dispatch, getState) => {
        let currstate = getState(),
         personalDetails = currstate.onboardingState.personalDetailsState,
         {profileTypeState} = currstate.onboardingState,
         patientModel = {
            emailId: data && data.emailId,
            firstName: personalDetails.firstName,
            lastName: personalDetails.lastName,
            contactNumber: personalDetails.contactNumber,
            relationshipId: profileTypeState.selectedRelationId ? profileTypeState.selectedRelationId : 0
        };

        dispatch(startLoading());
        dispatch(isLoading(API_FETCHING))
        Post(API.SendVerificationLink, patientModel).then((resp) => {
            if (resp && resp.data && resp.data.isSuccessStatusCode){
                dispatch(sendVerificationLinkSuccess());
            } else {
                dispatch(sendVerificationLinkError());
            }
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(sendVerificationLinkError());
            dispatch(endLoading());
        })
    }
}
