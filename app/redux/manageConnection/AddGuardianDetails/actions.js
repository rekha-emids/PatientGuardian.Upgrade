import { API, baseURL } from '../../../services/api';
import { Get, Post } from '../../../services/http';
import { navigateToScreenMainStack } from '../../navigation/actions';
import {clearState as profileTypeClear} from '../ProfileSelection/actions';
import { PATH } from '../../../routes';
import { clearState as setPasswordStateClear } from '../SetPasswordForMC/actions';
import { clearState as memberDetailsStateClear } from '../MemberDetailsForMC/actions';
import {MY_CONNECTION_INDIVIDUAL, MY_CONNECTION_GUARDIAN} from '../../../constants/constants'
import {onBack} from '../../../redux/navigation/actions'
import { API_SUCCESS, API_FAILED, API_FETCHING} from '../../../constants/AppAPIConstants';
export const AddGuardianDetails = {
    sendGuardianDetails: 'send_guardian_details/addGuardianDetails',
    getRelationship: 'get_relationship/addGuardianDetails',
    nextClick: 'next_click/addGuardianDetails',
    clearState: 'clear_state/addGuardianDetails',
    cancelClick: 'cancel_click/addGuardianDetails',
    loadingStatus: 'addGuardianDetails/isLoading'
};

export const isLoading = (data) => ({
        type: AddGuardianDetails.loadingStatus,
        data
    })

export const sendGuardianDetailsSuccess = (data, isSuccess) => ({
        type: AddGuardianDetails.sendGuardianDetails,
        data,
        isSuccess
    })

export const getRelationshipSuccess = (data) => ({
        type: AddGuardianDetails.getRelationship,
        data
    })

export const nextClick = () => ({type: AddGuardianDetails.nextClick})

export const cancelClick = () => ({type: AddGuardianDetails.cancelClick})

export const clearState = () => ({type: AddGuardianDetails.clearState})

export function onCancelClick() {
    return (dispatch) => {
        dispatch(cancelClick());
        dispatch(setPasswordStateClear());
        dispatch(memberDetailsStateClear());
        dispatch(profileTypeClear());
        dispatch(clearState());
        dispatch(navigateToScreenMainStack(PATH.MANAGE_CONNECTION));
    }
}

export function onNextClick() {
    return (dispatch) => {
        dispatch(nextClick());
        dispatch(getManageConnection(MY_CONNECTION_INDIVIDUAL))
        dispatch(getManageConnection(MY_CONNECTION_GUARDIAN))
        dispatch(onBack());    
    }
}

export function getRelationship() {
    return (dispatch) => {
        dispatch(isLoading(API_FETCHING));
        Get(API.GetRelationship, baseURL).then((resp) => {
            if (resp && resp.data) {
                dispatch(getRelationshipSuccess(resp.data))
                dispatch(isLoading(API_SUCCESS));
            } else {
                dispatch(isLoading(API_SUCCESS));
            }
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED));
        })
    }
}
export function getManageConnection (data) {
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING));
      let PATIENT_ID = getState().authState && getState().authState.userState.patientId;

      Get(`${API.getManageConnections + PATIENT_ID}/${data}`, baseURL)
        .then((resp) => {
          if (resp && resp.data.users) {
            data === 'i'
              ? dispatch(getManageConnectionSuccess(resp.data.users, manageConnection.getIndividualList))
              : dispatch(getManageConnectionSuccess(resp.data.users, manageConnection.getPatientGuardianList,))
          }
  
          dispatch(isLoading(API_SUCCESS));
        })
        .catch((err) => {
            dispatch(isLoading(API_FAILED));
        })
    }
  }
export function sendGuardianDetails(data) {
    return (dispatch, getState) => {
        const {userState} = getState().authState;
        let guardianModel = {
            firstName: data.firstName,
            lastName: data.lastName,
            emailId: data.emailId,
            contactNumber: data.contactNumber,
            userId: userState && userState.userId,
            relationshipId: data.relationshipId
        };

        dispatch(isLoading(API_FETCHING));
        Post(
            API.AddGuardian,
            guardianModel,
            baseURL
          ).then((resp) => {
            if (resp && resp.data){
                dispatch(sendGuardianDetailsSuccess(resp.data, true)); 
                dispatch(getManageConnection(MY_CONNECTION_INDIVIDUAL))
                dispatch(getManageConnection(MY_CONNECTION_GUARDIAN))            
                dispatch(isLoading(API_SUCCESS));
            } else {
                dispatch(isLoading(API_SUCCESS));
            }
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED));
        })
    }
}
