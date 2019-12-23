import { API, serviceRequestURL } from '../../../services/api';
import { Get, serviceUrl, Post, Put } from '../../../services/http';
import { API_FETCHING, API_FAILED, INIT, API_SUCCESS, LOAD_MORE } from '../../../constants/AppAPIConstants';
import {_} from '../../../utils/validations'
import { getStatusBasedOnRequestType } from '../../../utils/AppAPIUtils';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../../constants/constants';
import { navigateToScreenMainStack } from '../../navigation/actions';
import { PATH } from '../../../routes';
export const Browse = {
    getServiceCategorySuccess: "get_service_category_success/browse",
    getServiceProvidersSuccess: "get_service_providers_success/browse",
    changeAPIStatus: "changeAPIStatus/browse",
    changeSelectedServiceCategoryId: "change_service_category-id/browse",
    getEngageSPServiceRequestsSuccess: "getEngageSPServiceRequestsSuccess/browse"
}

const getServiceCategorySuccess = (data) => ({
        type: Browse.getServiceCategorySuccess,
        data
    }),

 getServiceProvidersSuccess = (data) => ({
        type: Browse.getServiceProvidersSuccess,
        data
    }),

 getEngageSPServiceRequestsSuccess = (data) => ({
        type: Browse.getEngageSPServiceRequestsSuccess,
        data
    })

export const changeAPIStatus = (data) => ({
        type: Browse.changeAPIStatus,
        data
    })
const changeSelectedServiceCategoryId = (data) => ({
        type: Browse.changeSelectedServiceCategoryId,
        data
    })
 
export function patientBrowseStage(){
    return (dispatch, getState) => {
        const {patientId} = getState().authState.userState;
        //ToDo: Need to remove unnecessary parameters
        let requestObject = {
            patientId,
            browseProvidersStage: true,
            engageProviderStage: false,
            createRequestStage: false,
            visitScheduleStage: false,
            submitFeedbackStage: false,
            isActive: true
        }

        Post(API.patientBrowseStage, requestObject).then((resp) => {
        }).catch((err) => {
        })
    }
}

export function getServiceCategories(){
    return (dispatch, getState) => {
        dispatch(changeAPIStatus({key: "getServiceCategoriesStatus", status: API_FETCHING}))
        Get(API.getServiceCategories, serviceUrl).then((response) => {           
            dispatch(getServiceCategorySuccess(response.data))
         })
.catch((error) => {
            dispatch(changeAPIStatus({key: "getServiceCategoriesStatus", status: API_FAILED}))
         })
    }
}

export function getServiceProviders(requestType = INIT, updateNetworkOnResponse, requestObject = {pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE}){
    return (dispatch, getState) => {
        const {selectedServiceCategoryId} = getState().serviceProvidersTabState.browseState,
         {patientId} = getState().authState.userState;
        let {network} = getState().networkReducer;

        dispatch(changeAPIStatus({key: "getServiceProviderStatus", status: getStatusBasedOnRequestType(requestType)}))
        Get(`${API.getBrowseServiceProviders + selectedServiceCategoryId}/${patientId}/${requestObject.pageNumber}/${requestObject.pageSize}`, serviceUrl).then((response) => {
            let {serviceProviders, selectedServiceCategoryId} = getState().serviceProvidersTabState.browseState,
             updatedData = [...response.data],
             existingData = serviceProviders[selectedServiceCategoryId] ? [...serviceProviders[selectedServiceCategoryId]] : []

            if (requestType === LOAD_MORE){
                updatedData = existingData.concat(response.data)
            }
            dispatch(getServiceProvidersSuccess({data: updatedData, id: selectedServiceCategoryId}))
            if (!network){
                updateNetworkOnResponse && updateNetworkOnResponse(true)
            }
        })
.catch((error) => {
            dispatch(changeAPIStatus({key: "getServiceProviderStatus", status: API_FAILED}))
        })
    }
}

export function browseFilteredServiceProviders(data, requestObject){
    return (dispatch, getState) => {
        const {patientId} = getState().authState.userState

        dispatch(changeAPIStatus({key: "getServiceProviderStatus", status: getStatusBasedOnRequestType(requestObject.requestType)}))
        Post(API.browseAllFilterServiceProviders, {...data, patientId, pageNumber: requestObject.pageNumber, pageSize: requestObject.pageSize}, serviceUrl).then((resp) => {
            let {serviceProviders, selectedServiceCategoryId} = getState().serviceProvidersTabState.browseState
            let updatedData = [...resp.data]
            let existingData = serviceProviders[data.selectedServiceCategoryId] ? [...serviceProviders[data.selectedServiceCategoryId]] : []

            if (requestObject.requestType === LOAD_MORE){
                updatedData = existingData.concat(resp.data)
            }
            dispatch(getServiceProvidersSuccess({data: updatedData, id: data.selectedServiceCategoryId}))
            dispatch(patientBrowseStage())
        }).catch((error) => {
            dispatch(changeAPIStatus({key: "getServiceProviderStatus", status: API_FAILED}))
        })
    }
}

export function searchBrowseServiceProviders (searchText, requestObject) {
    return (dispatch, getState) => {
        const {selectedServiceCategoryId} = getState().serviceProvidersTabState.browseState,
         {patientId} = getState().authState.userState

        dispatch(changeAPIStatus({key: "getServiceProviderStatus", status: getStatusBasedOnRequestType(requestObject.requestType)}))
        Get(`${API.searchBrowseSp + selectedServiceCategoryId}/${patientId}/${searchText}/${requestObject.pageNumber}/${requestObject.pageSize}`, serviceUrl).then((resp) => {
            let {serviceProviders, selectedServiceCategoryId} = getState().serviceProvidersTabState.browseState,
             updatedData = [...resp.data],
             existingData = serviceProviders[selectedServiceCategoryId] ? [...serviceProviders[selectedServiceCategoryId]] : []

            if (requestObject.requestType === LOAD_MORE){
                updatedData = existingData.concat(resp.data)
            }
            dispatch(getServiceProvidersSuccess({data: updatedData, id: selectedServiceCategoryId}))
        })
.catch((error) => {
            dispatch(changeAPIStatus({key: "getServiceProviderStatus", status: API_FAILED}))
        })
    }
}

export function onChangeServiceCategoryId(categoryId){
    return (dispatch) => {
        dispatch(changeSelectedServiceCategoryId(categoryId))
    }
}

export function getEngagedServiceRequests(spId, onSuccess){
    return (dispatch, getState) => {
        let {patientId} = getState() && getState().authState && getState().authState.userState;
        const {tabNavigation} =  getState() && getState().dashboardState && getState().dashboardState.dashboardState;
        dispatch(changeAPIStatus({key: "getEngageServiceRequests", status: API_FETCHING}))
        Get(`${API.engageServiceProvider}${patientId}/${spId}`, serviceUrl).then((resp) => {
            if (onSuccess){
                let params = {
                    navigator: tabNavigation,
                    spId
                }

                resp.data.length ? onSuccess() : dispatch(navigateToScreenMainStack(PATH.REQUIREMENTS_SCREEN, params))
            }
            dispatch(getEngageSPServiceRequestsSuccess(resp.data))
            dispatch(changeAPIStatus({key: "getEngageServiceRequests", status: API_SUCCESS}))
        })
.catch((err) => {
            dispatch(changeAPIStatus({key: "getEngageServiceRequests", status: API_FAILED}))
        })
    }
}

export function inviteServiceProvider(srId, spId, onSuccess, displayLoader){
    return (dispatch, getState) => {
        let requestObject = {
            isInvite: true,
            serviceProviderId: spId,
            serviceRequestId: srId
        }

        displayLoader && dispatch(changeAPIStatus({key: "getEngageServiceRequests", status: API_FETCHING}))
        Post(API.inviteSp, requestObject, serviceRequestURL).then((response) => {
            onSuccess && onSuccess()
            !onSuccess && dispatch(changeAPIStatus({key: "getEngageServiceRequests", status: API_SUCCESS}))
        })
.catch((err) => {
            connsole.log("ERROR", err)
            displayLoader && dispatch(changeAPIStatus({key: "getEngageServiceRequests", status: API_FAILED}))
        })
    }
}


export function hireServiceProvider(srId, spId, onSuccess, displayLoader){
    return (dispatch, getState) => {
        displayLoader && dispatch(changeAPIStatus({key: "getEngageServiceRequests", status: API_FETCHING}))
        const data = {
            serviceProviderId: spId,
            serviceRequestId: srId,
            engagedBy: getState().authState.userState.userInfo.userType
        };

        Put(API.hireServiceProvider, data, serviceRequestURL).then((response) => {
            onSuccess && onSuccess()
            !onSuccess && dispatch(changeAPIStatus({key: "getEngageServiceRequests", status: API_SUCCESS}))
        })
.catch((error) => {
            displayLoader && dispatch(changeAPIStatus({key: "getEngageServiceRequests", status: API_FAILED}))
        })
    }
}
