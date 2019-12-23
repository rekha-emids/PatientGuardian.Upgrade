import { API} from '../../../services/api';
import { Get, Put } from '../../../services/http';
import {  endLoading } from '../../loading/actions';
import {getArrayFromNormalizedData} from '../../../utils/appUtils'
import { storeSelectedClinicalCondition, getOfflineSelectedClinicalCondition } from '../../../offline/Profile/ClinicalCondition.js/SelectedClinicalCondition';
import { NETWORK_ERROR } from '../../../constants/error';
import { getProfilePercentage } from '../PersonalDetail/actions';
import { onBack } from "../../navigation/actions";
import { isEmpty } from '../../../utils/EmptyObjCheck';
import { API_SUCCESS, API_FAILED, API_FETCHING } from '../../../constants/AppAPIConstants';

export const ClinicalCondition = {
    getClinicalConditionSuccess: 'getClinicalConditionSuccess/ClinicalCondition',
    getSelectedClinicalConditionDetails: 'getSelectedClinicalConditionDetails/ClinicalCondition',
    GET_SELECTED_CLINICAL_CONDITION_SUCCESS: 'GET_SELECTED_CLINICAL_CONDITION_SUCCESS',
    addClinicalCondition: 'addClinicalCondition/ClinicalCondition',
    resetUpdatedClinicalCondition: 'resetClinicalCondition/ClinicalCondition',
    loadingStatus: 'clicnicalConditions/isLoading'
};

export const isLoading = (data) => ({
        type: ClinicalCondition.loadingStatus,
        data
    })

export const getClinicalConditionSuccess = (data) => ({
        type: ClinicalCondition.getClinicalConditionSuccess,
        data
    })

export const getSelectedClinicalConditionSuccess = (data) => ({
        type: ClinicalCondition.getSelectedClinicalConditionDetails,
        data
    })

export const resetUpdatedClinicalCondition = (data) => ({
        type: ClinicalCondition.resetUpdatedClinicalCondition,
        data
    })

export const getSelectedClinicalConditionDetails = (data) => ({
        type: ClinicalCondition.getSelectedClinicalConditionDetails,
        data
    })

export function getClinicalCondition() {
    return (dispatch) => {
        Get(API.getAllClinicalCondition).then((resp) => {
            dispatch(getClinicalConditionSuccess(resp.data))
        })
.catch(() => {
        })
    }
}

export function updateClinicalCondition(onSuccess, screenParams) {
    return (dispatch, getState) => {
        let {patientId} = getState().authState.userState,
         {userType} = getState().authState.userState,
         updatedClinicalCondition = getState().profileState.ClinicalConditionState.updateClinicalCondition

        if (screenParams && screenParams.id !== global.currentUserPatientId){
            patientId = screenParams.id
            userType = screenParams.userType
            updatedClinicalCondition = getState().profileState.ClinicalConditionState.impersonatedClinicalDetails[screenParams.id].updateClinicalCondition
        }
        let modal = {
            patientId,
            clinicalCondition: getArrayFromNormalizedData(updatedClinicalCondition)
        },
         params = {id: patientId, userType}

        dispatch(isLoading(API_FETCHING))

        Put(API.addClinicalCondition + patientId, modal.clinicalCondition).then((resp) => {
            dispatch(getSelectedClinicalCondition(params));
            dispatch(onBack());
            dispatch(getProfilePercentage(params))
            dispatch(isLoading(API_SUCCESS))

        })
.catch((err) => {
            dispatch(isLoading(API_FAILED))

        })
    }  
}

export function addSelectedClinicalCondition(data) {

    return (dispatch, getState) => {
        let PATIENT_ID = getState().authState.userState.patientId,
         clinicalCondition = data ? data.split(/\s*,\s*/).map((val) => ({
                attributeId: Number.parseInt(val, 10),
                patientId: PATIENT_ID
            })) : [],
         modal = {clinicalCondition};

        dispatch(isLoading(API_FETCHING))
        Put(API.addClinicalCondition + PATIENT_ID, modal.clinicalCondition).then(() => {
            dispatch(getSelectedClinicalCondition());
            dispatch(getProfilePercentage())
            dispatch(isLoading(API_SUCCESS))
        })
.catch(() => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export function addClinicalCondition(requestObject, params) {
    return {
        type: ClinicalCondition.addClinicalCondition,
        data: {
            data: requestObject,
            params
        }
    }
}


export function getSelectedClinicalCondition(params, onApiSuccess, onFailure) {
    return (dispatch, getState) => {
        let PATIENT_ID;

        if (isEmpty(params)){
             PATIENT_ID = getState().authState.userState.patientId;
        } else {
            PATIENT_ID = params.id;
        }
        Get(API.getClinicalCondition + PATIENT_ID).then((resp) => {
            storeSelectedClinicalCondition(resp.data, PATIENT_ID).then((res) => {
                onApiSuccess && onApiSuccess()
            })
.catch((err) => {
                onFailure && onFailure(err)
            })
            dispatch(getSelectedClinicalConditionDetails({data: resp.data, id: params.id}))
        })
.catch((err) => {
            if (err.message === NETWORK_ERROR) {
                getOfflineSelectedClinicalCondition(PATIENT_ID).then((res) => {
                    dispatch(getSelectedClinicalConditionDetails({data: res, id: params.id}))
                    dispatch(endLoading());
                })
.catch((err) => {
                    dispatch(endLoading());
                })
            } else {
                onFailure && onFailure(err)
                dispatch(endLoading());
            }
        })
    }
}