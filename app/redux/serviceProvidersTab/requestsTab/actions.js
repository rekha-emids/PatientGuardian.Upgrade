import { API, spURL } from '../../../services/api';
import { Get, Post, serviceUrl, Put, asyncURL } from '../../../services/http';
import {_} from '../../../utils/validations'

import {NO_GENDER_PREFERENCE, NO_PREFERENCE_TEXT, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE} from '../../../constants/constants'
import { API_FETCHING, API_FAILED, API_SUCCESS, INIT, LOAD_MORE } from '../../../constants/AppAPIConstants';
import { getSortFilter } from '../../visitSelection/ServiceRequestSorting/actions';
import { initialState } from '../../../screens/VisitSelection/VisitServiceList';
import {changeAPIStatus as changeAPIStatusInBrowseTab} from '../browseTab/actions'
import { getStatusBasedOnRequestType } from '../../../utils/AppAPIUtils';
export const Requests = {
    getPatientRequestsBypatientId: "get_patient_requests_by_patient_id",
    getServiceRequestsBySRId: "get_service_Requests_by_s_r_id",
    changeSelectedServiceRequestId: "change_selected_service-id",
    getSkills: "get_skills",
    getGender: "get_gender",
    getPointOfServices: "get_point_of_services",
    getTimeSlots: "get_time_slots",
    getStates: "get_states",
    updateFilterState: "updateFilterState",
    changeAPIStatus: "changeAPIStatus/requestsTab",
    getVisitServiceEligibilityStatusSuccess: 'get_visit_service_elibility_status_success/visitservicedetails',
    loadingStatus: 'requestTab/isLoading',
    updatePointOfServices: "updatePointOfServices/requestTab"
}

export const updateNormalizedPointOfServices = (address, addressId) => ({
        type: Requests.updatePointOfServices,
        address,
        addressId
    })

export const isLoading = (data) => ({
        type: Requests.loadingStatus,
        data
    })

export function updateFilterState(data){
    return {
        type: Requests.updateFilterState,
        data
    }
}

export function changeAPIStatus(data){
    return {
        type: Requests.changeAPIStatus,
        data
    }
}

export function changeSelectedServiceRequestId(data){
    return {
        type: Requests.changeSelectedServiceRequestId,
        data
    }
}

export function getPatientRequestsBypatientId(data){
    return {
        type: Requests.getPatientRequestsBypatientId,
        data
    }
}

export function getServiceProvidersBySRId(data, requestId){
    return {
        type: Requests.getServiceRequestsBySRId,
        data: {list: data, requestId}
    }
}

export function getSkillsSuccess(data) {
    return {
        type: Requests.getSkills,
        data
    }
}


export function getGenderSuccess(data){
    return {
        type: Requests.getGender,
        data
    }
}

export function getTimeSlotsSuccess(data){
    return {
        type: Requests.getTimeSlots,
        data
    }
}

export function getPointOfServicesSuccess(data){
    return {
        type: Requests.getPointOfServices,
        data
    }
}

export function getStatesSuccess(data){
    return {
        type: Requests.getStates,
        data
    }
}

export const getVisitServiceEligibilityStatusSuccess = (data) => ({
        type: Requests.getVisitServiceEligibilityStatusSuccess,
        data
    })
export function favouriteSp(spId, isFavourite, onSuccess){
    return (dispatch, getState) => {
        let patientId = getState && getState().authState && getState().authState.userState.patientId;
        let dataModel = {
            patientId,
            serviceProviderId: spId,
            isFavouriteServiceProvider: isFavourite
        }

        dispatch(isLoading(API_FETCHING))
       return Post(API.favouriteSp, dataModel).then((resp) => {   
            onSuccess && onSuccess()
            dispatch(isLoading(API_SUCCESS))

        })
.catch((err) => {
            dispatch(isLoading(API_FAILED))

        })
    }
}

export function getPatientRequests(serviceRequestId) {
    return (dispatch, getState) => {
        let patientId = getState && getState().authState && getState().authState.userState.patientId;

        dispatch(isLoading(API_FETCHING))
        return Get(API.getServiceRequestsById + patientId, serviceUrl).then((resp) => {   
           dispatch(getPatientRequestsBypatientId(resp.data))
           let requestId = serviceRequestId || (resp.data.length === 0 ? null : resp.data[0].serviceRequestId)

           if (resp.data.length === 0){
               dispatch(changeSelectedServiceRequestId(null))
           }
           resp.data.length && requestId ? dispatch(getServiceProviders(requestId)) : dispatch(isLoading(API_SUCCESS))
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}


export function getServiceProviders(serviceRequestId, requestObject = {pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE, requestType: INIT}){

    return (dispatch, getState) => {
        let requestType = requestObject && requestObject.requestType ? requestObject.requestType : INIT

        dispatch(isLoading(getStatusBasedOnRequestType(requestType)))
        return Get(`${API.getServiceProvidersBySRId + serviceRequestId}/${requestObject.pageNumber}/${requestObject.pageSize}`, serviceUrl).then((response) => {           
            let updatedData = updateServiceProvidersData(getState, response, requestObject.requestType, serviceRequestId)

            dispatch(getServiceProvidersBySRId(updatedData, serviceRequestId))
            dispatch(isLoading(API_SUCCESS))
        }).catch((error) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export function getSortedServiceProviders(serviceRequestId, data){
    return (dispatch) => {
        dispatch(isLoading(API_FETCHING))

       return Get(`${API.sortServiceProviders + serviceRequestId}/${data.sortByOrder}/${data.sortByColumn}/1/50`, serviceUrl).then((response) => {           
            dispatch(getServiceProvidersBySRId(response.data, serviceRequestId))
            dispatch(isLoading(API_SUCCESS))

         })
.catch((error) => {
            dispatch(isLoading(API_FAILED))

         })
    }
}


export function getSkills(){
    return (dispatch) => {
        dispatch(isLoading(API_FETCHING))
       return Get(API.getSkills, spURL).then((response) => {           
            dispatch(getSkillsSuccess(response.data))
            dispatch(isLoading(API_SUCCESS))
        })
.catch((error) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export function getGender(serviceRequestId){
    return (dispatch) => {
        dispatch(isLoading(API_FETCHING))

        return Get(API.getGender, spURL).then((response) => {
            let selectedGenderDetails = response.data.filter((gender) => gender.id !== NO_GENDER_PREFERENCE)
            let updatedGenderDetails = [{id: NO_GENDER_PREFERENCE, name: NO_PREFERENCE_TEXT}, ...selectedGenderDetails]

            dispatch(getGenderSuccess(response.data))
            
            dispatch(isLoading(API_SUCCESS))

         })
.catch((error) => {
            dispatch(isLoading(API_FAILED))

         })
    }
}

export function getPointOfServices(){
    return (dispatch, getState) => {
        let patientId = getState() && getState().authState && getState().authState.userState.patientId;

        dispatch(getStates())
        return Get(API.getPointOfServices + patientId, serviceUrl).then((response) => {      
            dispatch(getPointOfServicesSuccess(response.data))
        }).catch((error) => {
        })
    }
}

export function getTimeSlots(){
    return (dispatch) => {
        dispatch(isLoading(API_FETCHING))
        Get(API.getLookupSlots, serviceUrl).then((response) => {           
            dispatch(getTimeSlotsSuccess(response.data))
            dispatch(isLoading(API_SUCCESS))
        })
.catch((error) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export function getStates () {
    return (dispatch) => {
        // dispatch(isLoading(API_FETCHING))
        Get(API.getState, spURL).then((response) => {           
            dispatch(getStatesSuccess(response.data))
            // dispatch(isLoading(API_SUCCESS))
        })
.catch((error) => {
            // dispatch(isLoading(API_FAILED))
        })
    }
}

function updateServiceProvidersData(getState, response, requestType, serviceRequestId){
    let updatedData = [...response.data]

    if (requestType === LOAD_MORE){
        let {serviceProviders} = getState().serviceProvidersTabState.requestsState,
         existingData = serviceProviders && serviceProviders[serviceRequestId] ? [...serviceProviders[serviceRequestId]] : []

        updatedData = existingData.concat(response.data)
    }
    return updatedData
}

export function getFilteredServiceProviders(data) {
    return (dispatch, getState) => {
        const {selectedAddressId, requestType, ...other} = data,
             {pointOfServices, selectedServiceRequestId} = getState().serviceProvidersTabState.requestsState
            let services = null

                pointOfServices && pointOfServices.map((pos) => {
                    if (pos.addressId === selectedAddressId){
                        services = {
                                lat: pos.lat,
                                lon: pos.lon
                        }
                    }
                })
                dispatch(isLoading(getStatusBasedOnRequestType(requestType)))
                Post(API.getFilteredServiceProviders, {...other, pointOfservice: services, servicerequestid: selectedServiceRequestId }, serviceUrl).then((response) => {
                let updatedData = updateServiceProvidersData(getState, response, data.requestType, selectedServiceRequestId)

                dispatch(getServiceProvidersBySRId(updatedData, selectedServiceRequestId))
                dispatch(isLoading(API_SUCCESS))

             })
.catch((error) => {
                dispatch(isLoading(API_FAILED))

             })
    }
}
export function searchForServiceProviders(data, srId, requestObject){
    return (dispatch, getState) => {
        const {selectedServiceRequestId} = getState().serviceProvidersTabState.requestsState

        dispatch(isLoading(getStatusBasedOnRequestType(requestObject.requestType)))
        Get(`${API.searchServiceProviders + data}/${selectedServiceRequestId}/${requestObject.pageNumber}/${requestObject.pageSize}`, serviceUrl).then((response) => {
            let updatedData = updateServiceProvidersData(getState, response, requestObject.requestType, selectedServiceRequestId)

            dispatch(getServiceProvidersBySRId(updatedData, srId))
            dispatch(isLoading(API_SUCCESS))
        })
.catch((error) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export function inviteServiceProvider(srId, spId, flag){
    return (dispatch, getState) => {
        const {selectedServiceRequestId} = getState().serviceProvidersTabState.requestsState
        let modal = {
            "serviceRequestId": selectedServiceRequestId,
            "serviceProviderId": spId,
            "isInvite": flag
        }

        dispatch(isLoading(API_FETCHING))

        Post(API.inviteSp, modal, serviceUrl).then((response) => {
            dispatch(getServiceProviders(selectedServiceRequestId))
            dispatch(isLoading(API_SUCCESS))

        })
.catch((error) => {
            dispatch(isLoading(API_FAILED))

        })
    }
}

export function hireServiceProvider(srId, spId){
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
        const {selectedServiceRequestId} = getState().serviceProvidersTabState.requestsState

        Put(`${API.hireServiceProvider}${selectedServiceRequestId}/${spId}`, null, serviceUrl).then((response) => {
            dispatch(getServiceProviders(selectedServiceRequestId))
            dispatch(isLoading(API_SUCCESS))
            dispatch(getSortFilter(initialState))
        })
.catch((error) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export function cancelInvitation(id, spId, onSuccess, displayLoader){
    return (dispatch, getState) => {
        const {patientId} = getState().authState.userState
        let requestObject = {
            isInvite: false,
            serviceProviderId: spId,
            serviceRequestId: id
        }
        const {selectedServiceRequestId} = getState().serviceProvidersTabState.requestsState

        dispatch(isLoading(API_FETCHING))
        displayLoader && dispatch(changeAPIStatusInBrowseTab({key: "getEngageServiceRequests", status: API_FETCHING}))
        Put(API.cancelInvitation, requestObject, serviceUrl).then((response) => {
           if (onSuccess){
               onSuccess()
               !onSuccess && dispatch(changeAPIStatusInBrowseTab({key: "getEngageServiceRequests", status: API_SUCCESS}))

           } else {
            dispatch(getServiceProviders(selectedServiceRequestId, {pageNumber: 1, pageSize: 20}))
           }
           dispatch(getSortFilter(initialState))
           dispatch(isLoading(API_SUCCESS))

        })
.catch((error) => {
            dispatch(changeAPIStatus({key: "getServiceProviderStatus", status: API_FAILED}))
            dispatch(isLoading(API_FAILED))

        })
    }
}
export function getVisitServiceEligibilityStatus(serviceProviderData, onSuccess) {
    return (dispatch, getState) => {
        let {patientId} = getState().authState.userState,
         data = {
            patientId,
            "serviceRequestId": serviceProviderData.serviceRequestId,
            "serviceProviderId": serviceProviderData.serviceProviderId
        }

        dispatch(changeAPIStatus(API_FETCHING))
        dispatch(isLoading(API_FETCHING))

        Post(API.getServiceRequestEligibilityStatus, data, asyncURL).then((resp) => {
            if (resp.data) {
                onSuccess && onSuccess(resp.data.authorizationRequired)
            } else {
                onSuccess && onSuccess(false)
            }
            dispatch(getVisitServiceEligibilityStatusSuccess(resp.data))
            // dispatch(isLoading(API_SUCCESS))

        })
.catch((err) => {
            dispatch(changeAPIStatus(API_FAILED))
            dispatch(isLoading(API_FAILED))

        })
    }
}