import { API } from '../../../services/api';
import { Get, Post } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { navigateToScreenMainStack } from '../../navigation/actions';
import { clearState as profileTypeClear } from '../ProfileType/actions';
import { PATH } from '../../../routes';
import { getFormatedDate } from '../../../utils/momentUtil';

export const MemberDetails = {
    nextClick: 'next_click/memberdetails',
    cancelClick: 'cancel_click/memberdetails',
    previousClick: 'previous_click/memberdetails',
    getPlansSuccess: 'get_plans_success/memberdetails',
    getPlansError: 'get_plans_error/memberdetails',
    searchMembersSuccess: 'search_members_success/memberdetails',
    searchMembersError: 'search_members_error/memberdetails',
    resetClick: 'reset_click/memberdetails',
    formDirty: 'form_dirty/memberdetails',
    clearState: 'clear_state/memberdetails',
    createPatientSuccess: 'create_patient_success/memberdetails',
    createPatientError: 'create_patient_error/memberdetails'
};

export const nextClick = (data) => ({
        type: MemberDetails.nextClick,
        data
    })

export const formDirty = () => ({type: MemberDetails.formDirty})

export const clearState = () => ({type: MemberDetails.clearState})

export const cancelClick = () => ({type: MemberDetails.cancelClick})

export const getPlansSuccess = (data) => ({
        type: MemberDetails.getPlansSuccess,
        data
    })

export const getPlansError = () => ({type: MemberDetails.getPlansError})

export const searchMembersSuccess = (data) => ({
        type: MemberDetails.searchMembersSuccess,
        data
    })

export const searchMembersError = () => ({type: MemberDetails.searchMembersError})

export const resetClick = () => ({type: MemberDetails.resetClick})

export const createPatientSuccess = () => ({type: MemberDetails.createPatientSuccess})

export const createPatientError = () => ({type: MemberDetails.createPatientError})

export function onNextClick(data, onFailure){
    return (dispatch) => {
        dispatch(nextClick(data, onFailure));
        dispatch(createPatient(data, onFailure));
    }
}

export function onCancelClick(){
    return (dispatch) => {
        dispatch(cancelClick());
        dispatch(profileTypeClear());
        dispatch(navigateToScreenMainStack(PATH.WELCOME_SCREEN));
    }
}

export function getPlans() {
    return (dispatch) => {
        dispatch(startLoading());
        Get(API.GetPlan).then((resp) => {
            if (resp && resp.data){
                dispatch(getPlansSuccess(resp.data));
            } else {
                dispatch(getPlansError());
            }
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(getPlansError());
            dispatch(endLoading());
        })
    }
}

export function searchMembers(data) {
    return (dispatch) => {
        dispatch(startLoading());
        Get(`${API.SearchPatient + data.lastname}/${data.memberId}/${data.planId}/?dob=${getFormatedDate(data.dob)}`).then((resp) => {
            if (resp && resp.data){
                dispatch(searchMembersSuccess(resp.data))
            } else {
                dispatch(searchMembersError());
            }
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(searchMembersError());
            dispatch(endLoading());
        })
    }
}

export function createPatient(data, onFailure) {
    return (dispatch, getState) => {
        const {setPasswordState} = getState().onboardingState,
         values = {
            firstName: data.profileData.firstName,
            lastName: data.profileData.lastName,
            memberId: data.profileData.memberId,
            emailId: setPasswordState && setPasswordState.emailId,
            mpi: data.profileData.mpi,
            userId: setPasswordState && setPasswordState.userId
        };

        Post(API.CreatePatient, values).then((res) => {
                dispatch(createPatientSuccess());
                dispatch(navigateToScreenMainStack(PATH.ADD_GUARDIAN_SCREEN));
            })
.catch((err) => {
                if (err.response && err.response.data && err.response.data){
                    onFailure && onFailure(err.response.data)
                }
                dispatch(createPatientError());
            });
    }
}
