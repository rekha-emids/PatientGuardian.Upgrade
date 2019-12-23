import { API } from '../../../services/api';
import { Get, Post } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { navigateToScreenMainStack } from '../../navigation/actions';
import {clearState as profileTypeClear} from '../ProfileType/actions';
import { PATH } from '../../../routes';
import { clearState as setPasswordStateClear } from '../SetPassword/actions';
import { clearState as memberDetailsStateClear } from '../MemberDetails/actions';
import { USERS } from '../../../constants/constants';
import { API_FETCHING, API_FAILED, API_SUCCESS } from '../../../constants/AppAPIConstants';

export const AddGuardian = {
    sendGuardianDetails: 'send_guardian_details/addGuardian',
    getRelationship: 'get_relationship/addGuardian',
    nextClick: 'next_click/addGuardian',
    clearState: 'clear_state/addGuardian',
    cancelClick: 'cancel_click/addGuardian',
    loadingStatus: 'addGuardian/isLaoding'
};

export const isLoading = (data) => ({
        type: AddGuardian.loadingStatus,
        data
    })

export const sendGuardianDetailsSuccess = (data, isSuccess) => ({
        type: AddGuardian.sendGuardianDetails,
        data,
        isSuccess
    })

export const getRelationshipSuccess = (data) => ({
        type: AddGuardian.getRelationship,
        data
    })

export const nextClick = () => ({type: AddGuardian.nextClick})

export const cancelClick = () => ({type: AddGuardian.cancelClick})

export const clearState = () => ({type: AddGuardian.clearState})

export function onCancelClick() {
    return (dispatch) => {
        dispatch(cancelClick());
        dispatch(setPasswordStateClear());
        dispatch(memberDetailsStateClear());
        dispatch(profileTypeClear());
        dispatch(clearState());
        dispatch(navigateToScreenMainStack(PATH.WELCOME_SCREEN));
    }
}

export function onNextClick() {
    return (dispatch) => {
        dispatch(nextClick());
        dispatch(navigateToScreenMainStack(PATH ? PATH.ONBOARDING_COMPLETE : null));
    }
}

export function getRelationship() {
    return (dispatch) => {
        dispatch(startLoading());
        dispatch(isLoading(API_FETCHING))
        Get(API.GetRelationship).then((resp) => {
            if (resp && resp.data) {
                let relationships = resp.data.filter((relationship) => relationship.name !== USERS.SERVICE_PROVIDER &&
                            relationship.name !== USERS.CARETEAM);

                dispatch(getRelationshipSuccess(relationships))
                dispatch(endLoading());

            } else {
                dispatch(endLoading());

            }
            dispatch(isLoading(API_SUCCESS))
        })
.catch((err) => {
            dispatch(endLoading());
            dispatch(isLoading(API_FAILED))
        })
    }
}

export function sendGuardianDetails(data) {
    return (dispatch, getState) => {
        let {setPasswordState} = getState().onboardingState,
         guardianModel = {
            firstName: data.firstName,
            lastName: data.lastName,
            emailId: data.emailId,
            contactNumber: data.contactNumber,
            userId: setPasswordState && setPasswordState.userId,
            relationshipId: data.relationshipId
        };

        dispatch(startLoading()); 
        Post(
            API.AddGuardian,
            guardianModel
          ).then((resp) => {
            if (resp && resp.data){
                dispatch(sendGuardianDetailsSuccess(resp.data, true));               
                dispatch(endLoading());
            } else {
                dispatch(endLoading());
            }
        })
.catch((err) => {
           dispatch(endLoading());
        })
    }
}
