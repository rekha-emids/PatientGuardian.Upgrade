import {API} from '../../../services/api';
import {ServiceRequestGet, Get, Post, serviceUrl} from '../../../services/http';
import {startLoading, endLoading} from '../../loading/actions';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import { API_FETCHING, API_FAILED, API_SUCCESS } from '../../../constants/AppAPIConstants';

export const SchedulePreferences = {
    cancelClick: 'cancel_click/schedulepreferences',
    nextClick: 'next_click/schedulepreferences',
    previousClick: 'prev_click/schedulepreferences',
    getScheduleTypeSuccess: 'get_scheduletype_success/schedulepreferences',
    getGenderSuccess: 'get_gender_success/schedulepreferences',
    getRecurringPatternSuccess: 'get_recurringpattern_success/schedulepreferences',
    getSlotSuccess: 'get_slot_success/schedulepreferences',
    getsingleSlotSuccess: 'get_singleslot_success/schedulepreferences',
    getDaysSuccess: 'get_days_success/schedulepreferences',
    getStatesSuccess: 'get_states_success/schedulepreferences',
    getPatientSuccess: 'get_patient_success/schedulepreferences',
    changeAPIStatus: "changeAPIStatus/schedulepreference"
}; 

export function onCancelClick() {
    return (dispatch) => {
        dispatch(cancelClick());
        dispatch(push(Path.dashboard));
    }
}

export function onPreviousClick(){
    return (dispatch) => {
        dispatch(previousClick());
    }
}

export function onNextClick(data){
    return (dispatch) => {
        dispatch(nextClick(data));
    }
}

export const cancelClick = () => ({type: SchedulePreferences.cancelClick})
export const nextClick = (data) => ({
        type: SchedulePreferences.nextClick,
        data
    })

export const previousClick = () => ({type: SchedulePreferences.previousClick})
export const getScheduleTypeSuccess = (data) => ({
        type: SchedulePreferences.getScheduleTypeSuccess,
        data
    })

export const changeAPIStatus = (data) => ({
        type: SchedulePreferences.changeAPIStatus,
        data
    })

export function getScheduleType() {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(`${API.servicerequest}LookUp/ScheduleType`).then((resp) => {
            dispatch(getScheduleTypeSuccess(resp.data))
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(endLoading());
        })
    }
}


export const getGenderSuccess = (data) => ({
        type: SchedulePreferences.getGenderSuccess,
        data
    })

export function getGender() {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(`${API.servicerequest}LookUp/Gender`).then((resp) => {
            dispatch(getGenderSuccess(resp.data))
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(endLoading());
        })
    }
}

export const getRecurringPatternSuccess = (data) => ({
        type: SchedulePreferences.getRecurringPatternSuccess,
        data
    })

export function getRecurringPattern() {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(`${API.servicerequest}LookUp/RecurringPattern`).then((resp) => {
            dispatch(getRecurringPatternSuccess(resp.data))
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(endLoading());
        })
    }
}

export const getSlotSuccess = (data) => ({
        type: SchedulePreferences.getSlotSuccess,
        data
    })

export function getSlot() {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(`${API.servicerequest}LookUp/Slot`).then((resp) => {
            dispatch(getSlotSuccess(resp.data))
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(endLoading());
        })
    }
}

export const getsingleSlotSuccess = (data) => ({
        type: SchedulePreferences.getsingleSlotSuccess,
        data
    })

export function getsingleSlot() {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(`${API.servicerequest}LookUp/Slot`).then((resp) => {
            dispatch(getsingleSlotSuccess(resp.data))
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(endLoading());
        })
    }
}

export const getDaysSuccess = (data) => ({
        type: SchedulePreferences.getDaysSuccess,
        data
    })

export function getDays() {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(`${API.servicerequest}LookUp/Days`).then((resp) => {
            dispatch(getDaysSuccess(resp.data))
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(endLoading());
        })
    }
}

export const getStatesSuccess = (data) => ({
        type: SchedulePreferences.getStatesSuccess,
        data
    })

export function getStates() {
    return (dispatch) => {
        dispatch(startLoading());
        Get(API.getStates).then((resp) => {
            dispatch(getStatesSuccess(resp.data))
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(endLoading());
        })

    }
}

export const getPatientSuccess = (data) => ({
        type: SchedulePreferences.getPatientSuccess,
        data
    })

export function getPatientAddress() {
    return (dispatch, getState) => {
        dispatch(startLoading());
        dispatch(changeAPIStatus(API_FETCHING))
        let {patientId} = getState().authState.userState,
         url = `${API.SearchPatient}${patientId}/PatientAddress`

        Get(url).then((resp) => {
            dispatch(getPatientSuccess(resp.data))
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(changeAPIStatus(API_FAILED))
            dispatch(endLoading());
        })
    }
}

export function posValidation(data, onSuccess, onFailure) {
    return (dispatch, getState) => {
        dispatch(changeAPIStatus(API_FETCHING))
        let patientId = getState().authState.userState.patientId
        let requestObject = {
            patientId,
            "patientAddressId": 0,
            "streetAddress": data.street,
            "city": data.city,
            "stateName": data.state,
            "stateId": data.selectedStateKey,
            "zipCode": data.zip,
            "isPrimaryAddress": false,
            "addressId": 0,
            "state": {
              "id": data.selectedStateKey,
              "name": data.state
            },
            "zip": data.zip,
            "street": data.street,
            "isActive": true,
            "addressTypeId": data.addressTypeId,
            "lat": 0,
            "lon": 0,
            "isAddressVerified": false 
          }

        Post(API.checkPosValidation, requestObject, serviceUrl).then((resp) => {
            resp.data && resp.data.lat && resp.data.lon ? onSuccess && onSuccess() : onFailure && onFailure()
            dispatch(changeAPIStatus(API_SUCCESS))
        }).catch((err) => {
            onFailure && onFailure()
            dispatch(changeAPIStatus(API_FAILED))
        })
    }
}