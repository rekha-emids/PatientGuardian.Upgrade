import { API} from '../../../services/api';
import { Get, Put } from '../../../services/http';
import { isEmpty } from '../../../utils/EmptyObjCheck';
import {getSelectedPatientInfo, getUserIdAndType} from '../../../utils/userUtil'
import { ClinicalCondition } from '../ClinicalCondition/actions';
import { API_FETCHING, API_SUCCESS, API_FAILED } from '../../../constants/AppAPIConstants';

export const CoreoAssociation = {
    getCoreoAssociationSuccess: 'getCoreoAssociationSuccess/CoreoAssociation',
    getHeightWeightSuccess: 'getHeightWeightSuccess/CoreoAssociation'

};

export const isLoading = (data) => ({
        type: ClinicalCondition.loadingStatus,
        data
    })

export const getCoreoAssociationSuccess = (data) => ({
        type: CoreoAssociation.getCoreoAssociationSuccess,
        data
    })

export const getHeightWeightSuccess = (data) => ({
        type: CoreoAssociation.getHeightWeightSuccess,
        data
    })


export const getCoreoAssociation = (params, onApiSuccess, onFailure) => (dispatch, getState) => {
        let PATIENT_ID = isEmpty(params) ?  getSelectedPatientInfo() && getSelectedPatientInfo().patientId : params && params.id

        Get(API.GetPatientCoreoDetails + PATIENT_ID).then((resp) => {
            dispatch(getCoreoAssociationSuccess(resp.data))
        })
.catch((err) => {
                onFailure && onFailure(err)
        })
    }

export const getHeightWeight = () => (dispatch) => {
        dispatch(isLoading(API_FETCHING))
        let patientId = getUserIdAndType().patientId

        Get(API.getHeightWeightDetails + patientId).then((resp) => {
            dispatch(isLoading(API_SUCCESS))
            dispatch(getHeightWeightSuccess(resp.data))
        }).catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }

export const updateHeightWeightDetails = (data, onSuccess) => (dispatch) => {
        dispatch(isLoading(API_FETCHING))
        Put(API.updateHeightWeightDetails, data).then((resp) => {
            dispatch(isLoading(API_SUCCESS))
            dispatch(getHeightWeight())
            onSuccess && onSuccess()
        }).catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }