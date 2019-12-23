import { API } from '../../../services/api';
import { Get, Post, baseURL } from '../../../services/http';
import { navigateToScreenMainStack } from '../../navigation/actions';
import { clearState as profileTypeClear } from '../PersonalDetailsForMC/actions';
import { getManageConnection, } from '../ManageConnectionData/actions'
import { PATH } from '../../../routes';
import { API_FETCHING, API_SUCCESS, API_FAILED } from '../../../constants/AppAPIConstants';
import { getFormatedDate } from '../../../utils/momentUtil';
export const MemberDetailsForMC = {
    nextClick: 'next_click/memberdetailsformc',
    cancelClick: 'cancel_click/memberdetailsformc',
    previousClick: 'previous_click/memberdetailsformc',
    getPlansSuccess: 'get_plans_success/memberdetailsformc',
    getPlansError: 'get_plans_error/memberdetailsformc',
    searchMembersSuccess: 'search_members_success/memberdetailsformc',
    searchMembersError: 'search_members_error/memberdetailsformc',
    resetClick: 'reset_click/memberdetailsformc',
    formDirty: 'form_dirty/memberdetailsformc',
    clearState: 'clear_state/memberdetailsformc',
    createPatientSuccess: 'create_patient_success/memberdetailsformc',
    createPatientError: 'create_patient_error/memberdetailsformc',
    loadingStatus: 'memberDetails/isLoading'
};

export const nextClick = (data) => ({
        type: MemberDetailsForMC.nextClick,
        data
    })

export const formDirty = () => ({type: MemberDetailsForMC.formDirty})

export const clearState = () => ({type: MemberDetailsForMC.clearState})

export const cancelClick = () => ({type: MemberDetailsForMC.cancelClick})


export const getPlansSuccess = (data) => ({
        type: MemberDetailsForMC.getPlansSuccess,
        data
    })

export const getPlansError = () => ({type: MemberDetailsForMC.getPlansError})

export const searchMembersSuccess = (data) => ({
        type: MemberDetailsForMC.searchMembersSuccess,
        data
    })

export const searchMembersError = () => ({type: MemberDetailsForMC.searchMembersError})

export const resetClick = () => (dispatch) => {
        dispatch({type: MemberDetailsForMC.resetClick})
        // dispatch(goToManageConnection())
    }

export const createPatientSuccess = (data) => ({
        type: MemberDetailsForMC.createPatientSuccess,
        data
    })

export const createPatientError = () => ({type: MemberDetailsForMC.createPatientError})

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
        dispatch(navigateToScreenMainStack(PATH.MANAGE_CONNECTION));
    }
}

export const isLoading = (data) => ({
        type: MemberDetailsForMC.loadingStatus,
        data
    })

export function getPlans() {
    return (dispatch) => {
        dispatch(isLoading(API_FETCHING));
        Get(API.GetPlan, baseURL).then((resp) => {
            if (resp && resp.data){
                dispatch(getPlansSuccess(resp.data));
            } else {
                dispatch(getPlansError());
            }
            dispatch(isLoading(API_SUCCESS));
        })
.catch((err) => {
            dispatch(getPlansError());
            dispatch(isLoading(API_FAILED));
        })
    }
}

export function searchMembers(data) {
    return (dispatch) => {
        dispatch(isLoading(API_FETCHING));
        Get(`${API.SearchPatient + data.lastname}/${data.memberId}/${data.planId}/?dob=${getFormatedDate(data.dob)}`, baseURL).then((resp) => {
            if (resp && resp.data){
                dispatch(searchMembersSuccess(resp.data))
            } else {
                dispatch(searchMembersError());
            }
            dispatch(isLoading(API_SUCCESS));
        })
.catch((err) => {
            dispatch(searchMembersError());
            dispatch(isLoading(API_FAILED));
        })
    }
}

export function createPatient(data, onFailure) {
    return (dispatch, getState) => {
        const {userState} = getState().authState,
         values = {
            firstName: data.profileData.firstName,
            lastName: data.profileData.lastName,
            memberId: data.profileData.memberId,
            emailId: userState && userState.emailId,
            mpi: data.profileData.mpi,
            userId: userState && userState.userId,
            relationshipId: data.profileData.relationshipId === null ? 1 : data.profileData.relationshipId
        };

        dispatch(isLoading(API_FETCHING));
        Post(API.CreatePatient, values, baseURL).then((res) => {
                dispatch(createPatientSuccess());
                dispatch(navigateToScreenMainStack(PATH.MANAGE_CONNECTION))
                dispatch(getManageConnection());
                dispatch(isLoading(API_SUCCESS));

            })
.catch((err) => {
                if (err.response && err.response.data && err.response.data){
                    onFailure && onFailure(err.response.data)
                }
                dispatch(createPatientError());

                dispatch(isLoading(API_FAILED));
            });
    }
}
