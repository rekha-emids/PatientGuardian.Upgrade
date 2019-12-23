import { API } from '../../../services/api';
import {Get, Post, attributeURL, serviceUrl} from '../../../services/http'
import { startLoading, endLoading } from '../../loading/actions';
import { API_FAILED, LOAD_MORE, API_SUCCESS } from '../../../constants/AppAPIConstants';
import { getStatusBasedOnRequestType } from '../../../utils/appUtils';
import { USER_TYPES } from '../../../constants/constants';

export const vistServiceHistoryDetails = {
    getVisitServiceHistoryDetailsSuccess: 'getVisitServiceHistoryDetailsSuccess/visitHistory',
    updateVisitHistoryFilter: 'updateVisitHistoryFilter/visitHistory',
    getServiceCategoriesSuccess: "getServiceCategoriesSuccess/VisitHistory/Filter",
    getSubmittedResponse: "getSubmittedResponse/visitHistory",
    getAllServiceProviders: "getServiceProviders",
    getAttributeProvidersSuccess: "getAttributeProviderSuccess/visitHistory",
    changeAPIStatus: "changeAPIStatus/Visithistory",
    resetState: "resetState/VisitHistory",
    getQuestionsListSuccess: "assessments/questionList",
    clearAssessmentState: 'assessments/clearAssessmentState'
};

export const getQuestionsListSuccess = (data) => ({
        type: vistServiceHistoryDetails.getQuestionsListSuccess,
        data
    })

export const clearAssessmentState = () => ({type: vistServiceHistoryDetails.clearAssessmentState})

export const resetVisitHistory = () => ({type: vistServiceHistoryDetails.resetState})

export const getAttributeProvidersSuccess = (data) => ({
        type: vistServiceHistoryDetails.getAttributeProvidersSuccess,
        data
    })

export const changeAPIStatus = (data) => ({
        type: vistServiceHistoryDetails.changeAPIStatus,
        data
    })


export const getVisitServiceHistoryDetailsSuccess = (data) => ({
        type: vistServiceHistoryDetails.getVisitServiceHistoryDetailsSuccess,
        data
    })

export const getSubmittedResponse = (data) => ({
        type: vistServiceHistoryDetails.getSubmittedResponse,
        data
    })

export const updateVisitHistoryFilterState = (data) => ({
        type: vistServiceHistoryDetails.updateVisitHistoryFilter,
        data
    })

export const getServiceCategoriesSuccess = (data) => ({
        type: vistServiceHistoryDetails.getServiceCategoriesSuccess,
        data
    })

export const getServiceProviders = (data) => ({
        type: vistServiceHistoryDetails.getAllServiceProviders,
        data
    })

export function getVisitServiceDetails(requestObject, filterData, updateNetworkOnResponse) {
    return (dispatch, getState) => {
        let network = getState().networkReducer && getState().networkReducer.network;

        dispatch(changeAPIStatus(getStatusBasedOnRequestType(requestObject.requestType)))
        let pageNumber = requestObject && requestObject.pageNumber ? requestObject.pageNumber : 1
        let pageSize = requestObject && requestObject.pageSize ? requestObject.pageSize : 10
        let patientId = getState().authState.userState.patientId;
        let data  = {
            ...filterData,
            pageNumber,
            pageSize,
            patientId
        }

        Post(API.getVisitHistoryList, data, serviceUrl).then((resp) => {
            if (!network){
                updateNetworkOnResponse && updateNetworkOnResponse(true)
            }           
            let updatedData = [...resp.data]

            if (requestObject.requestType === LOAD_MORE){
               let existingData = [...getState().visitHistoryState.vistServiceHistoryState.VisitServiceHistory]

               updatedData = existingData.concat(resp.data)
            }
            dispatch(getVisitServiceHistoryDetailsSuccess(updatedData)) 
        })
.catch((err) => {
            dispatch(changeAPIStatus(API_FAILED))
        })
    }
}

export function getFilteredData(data, updateNetworkOnResponse){
    return (dispatch, getState) => {
        let {network} = getState().networkReducer,
         {patientId} = getState().authState.userState,
         model = {
            ...data,
            patientId
        }

        dispatch(changeAPIStatus(getStatusBasedOnRequestType(data.requestType)))
        Post(API.getFilteredVisitHistory, model, serviceUrl).then((resp) => {
            if (!network){
                updateNetworkOnResponse && updateNetworkOnResponse(true)
            }        
            let response = resp.data

            if (data.requestType === LOAD_MORE){
                response = getState().visitHistoryState.vistServiceHistoryState.VisitServiceHistory.concat(resp.data)
            }
            dispatch(getVisitServiceHistoryDetailsSuccess(response))
            dispatch(changeAPIStatus(API_SUCCESS))
 
        })
.catch((err) => {
            dispatch(changeAPIStatus(API_FAILED))

        })
    }
}

export function getSort(data){
    return (dispatch, getState) => {
        let {patientId} = getState().authState.userState,
         url = `${patientId}/${data.sortByOrder}/${data.sortByColumn}?fromDate=${data.fromDate}&toDate=${data.toDate}`

        Get(API.getSortedVisitHistory + url, serviceUrl).then((resp) => {           
            dispatch(getVisitServiceHistoryDetailsSuccess(resp.data)) 
        })
.catch((err) => {
        })
    }
}

export function getServiceProviderRating(data, feedbackAlertUserType, isPlanVisit){
    return (dispatch, getState) => {
        let url = feedbackAlertUserType === USER_TYPES.SERVICE_PROVIDER ? API.getPatientRating : isPlanVisit ? API.getESPServiceProviderRating : API.getServiceProviderRating

        Get(url + data.serviceVisitId, serviceUrl).then((resp) => {
            dispatch(getSubmittedResponse(resp.data))
        })
.catch((err) => {
        })
    }
}

export function getAllServiceProviders(){
    return (dispatch, getState) => {
        dispatch(startLoading())
        const patientId = getState().authState && getState().authState.userState.patientId

        Get(API.getAllServiceProviders + patientId, serviceUrl).then((resp) => {
            dispatch(getServiceProviders(resp.data))
            dispatch(endLoading())
        })
.catch((err) => {
            dispatch(endLoading());
        })
    }
}

function getAllServiceCategories(data){
    return (dispatch) => {
        let serviceCategories = []

        data.map(async (service, index) => {
            dispatch(startLoading())
            await Get(API.getServiceTasks + service.serviceCategoryId, serviceUrl).then((payload) => {
                let serviceCategoryResponse = {
                    ...service,
                    serviceTypeTasks: payload.data
                }

                serviceCategories.push(serviceCategoryResponse)
                if (serviceCategories.length === data.length){
                    serviceCategories.sort((categoryA, categoryB) => categoryA.serviceCategoryId - categoryB.serviceCategoryId)
                    dispatch(endLoading())
                    dispatch(getServiceCategoriesSuccess(serviceCategories))
                }
            })
.catch((error) => {
                dispatch(endLoading())
            })
        })
        dispatch(startLoading())
    }
}

export function getServiceCategories(){
    return (dispatch, getState) => {
        dispatch(startLoading())
        Get(API.getServiceCategories, serviceUrl).then((resp) => {
            dispatch(getAllServiceCategories(resp.data))
            dispatch(endLoading())
        })
.catch((err) => {
            dispatch(endLoading());
        })
    }
}

export function getAllAttributeProviders(){
    return (dispatch, getState) => {
        dispatch(startLoading())
        Get(API.getAllAttributeProviders, attributeURL).then((resp) => {
            dispatch(getAttributeProvidersSuccess(resp.data))
            dispatch(endLoading())
        })
.catch((err) => {
            dispatch(endLoading())
        })
    }
}

export function getQuestionsList(data) {
    return (dispatch) => {
        const {serviceProviderId, serviceRequestVisitId} = data;

        Get(`${API.getAssessmentQuestionsList}${serviceProviderId}/${serviceRequestVisitId}`, serviceUrl).then((resp) => {
            dispatch(getQuestionsListSuccess(resp.data))
        })
    }
}





