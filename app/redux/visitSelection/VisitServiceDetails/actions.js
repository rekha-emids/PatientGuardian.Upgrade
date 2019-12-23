
import { API } from '../../../services/api';
import { Get, Post, serviceUrl, Put } from '../../../services/http'
import { endLoading } from '../../loading/actions';
import { onBack } from '../../navigation/actions';
import { storeVisitServiceDetailData, getOfflineVisitServiceDetailData } from '../../../offline/Dashboard/VisitServiceDetails';
import { NETWORK_ERROR } from '../../../constants/error';
import { storeVisitServiceScheduleData, getOfflineVisitServiceScheduleData } from '../../../offline/Dashboard/VisitServiceSchedule';
import { API_FETCHING, API_SUCCESS, API_FAILED, INIT, LOAD_MORE } from '../../../constants/AppAPIConstants';
import { getPatientRequests } from '../../serviceProvidersTab/requestsTab/actions';
import { getSortFilter } from '../ServiceRequestSorting/actions';
import { incrementExecutionCount } from '../../../utils/ApiCounter';
import { initialState } from '../../../screens/VisitSelection/VisitServiceList';
import { USER_TYPES, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_VISIT_DATE } from '../../../constants/constants';
import { getPatientVisitDetail } from '../../dashboard/Dashboard/actions';
import { updateNetworkConnectivity } from '../../../services/OfflineSyncing';
import { isEmpty } from '../../../utils/EmptyObjCheck';
import { getStatusBasedOnRequestType, getServiceRequestId } from '../../../utils/appUtils';
import { getUserIdAndType } from '../../../utils/userUtil';
import { getAPIBasedOnUserType } from '../../../utils/AppAPIUtils';

const CANCEL_SERVICE_REQUEST_STATUS = "cancelServiceRequestStatus"

export const DEFAULT_REQUEST_OBJECT = {
    visitStatuses: [],
    serviceTypes: [],
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
    planScheduleIds: [0],
    entityServiceProviders: [],
    startDate: null,
    endDate: null
  }
  
export const VisitServiceDetails = {
    getVisitServiceDetailsSuccess: 'get_visit_service_details_success/visitservicedetails',
    getVisitServiceScheduleSuccess: 'get_visit_service_schedule_success/visitservicedetails',
    changeAPIStatus: "changeAPIStatus/VisitServiceDetails",
    resetVisitServiceDetails: "resetVisitServiceDetails/visitservicedetails",
    firstAndLastVisitDatesSuccess: "firstAndLastVisitDatesSuccess/visitServiceDetails",
    setSPDetails: "setSPDetails/visitServiceDetails"

};

export const setSPDetails = (data) => ({
        type: VisitServiceDetails.setSPDetails,
        data
    })

export const firstAndLastVisitDatesSuccess = (data) => ({
        type: VisitServiceDetails.firstAndLastVisitDatesSuccess,
        data
    })
export const resetVisitServiceDetails = () => ({type: VisitServiceDetails.resetVisitServiceDetails})

export const getVisitServiceDetailsSuccess = (data) => ({
        type: VisitServiceDetails.getVisitServiceDetailsSuccess,
        data
    })

export const getVisitServiceScheduleSuccess = (data) => ({
        type: VisitServiceDetails.getVisitServiceScheduleSuccess,
        data
    })

const changeAPIStatus = (data) => ({
        type: VisitServiceDetails.changeAPIStatus,
        data
    })

export function cancelServiceVisit(id, isPlanVisit, onSuccess) {
    return (dispatch, getState) => {
        dispatch(changeAPIStatus({ key: CANCEL_SERVICE_REQUEST_STATUS, value: API_FETCHING }))
        Put(getAPIBasedOnUserType(API.cancelServiceVisit, isPlanVisit) + id, null, serviceUrl).then((resp) => {
            onSuccess && onSuccess()
            dispatch(changeAPIStatus({ key: CANCEL_SERVICE_REQUEST_STATUS, value: API_SUCCESS }))
        }).catch((err) => {
            dispatch(changeAPIStatus({ key: CANCEL_SERVICE_REQUEST_STATUS, value: API_FAILED }))
        })
    }
}

export function cancelServiceRequest(id) {
    return (dispatch, getState) => {
        dispatch(changeAPIStatus({ key: CANCEL_SERVICE_REQUEST_STATUS, value: API_FETCHING }))
        let modal = {
            serviceRequestId: id,
            serviceProviderId: 0,
            patientId: '',
            cancelledDescription: ""
        }

        if (getState() && getState().authState) {
            const { selectedPatientInfo, userInfo } = getState().authState.userState,   
            PID = userInfo && userInfo.patientId,
            SELECTED_PID = selectedPatientInfo && selectedPatientInfo.patientId,
            userType = userInfo && userInfo.userType;
            let patientId = userType !== USER_TYPES.PATIENT ? SELECTED_PID : PID
            modal = {
                serviceRequestId: id,
                serviceProviderId: 0,
                patientId,
                cancelledDescription: ""
            }
        }

        return Put(API.cancelHiredServiceRequest, modal, serviceUrl).then((resp) => {
            dispatch(onBack())
            dispatch(changeAPIStatus({ key: CANCEL_SERVICE_REQUEST_STATUS, value: API_SUCCESS }))
            dispatch(getPatientRequests())
            dispatch(getSortFilter(initialState))
            const { dashboardRequestObject, selectedStatusId } = getState().dashboardState.dashboardState
            const { toDayDate, ...other } = dashboardRequestObject

            dispatch(getPatientVisitDetail(toDayDate, { ...other, statusId: selectedStatusId }, INIT, updateNetworkConnectivity))
        }).catch((err) => {
            dispatch(changeAPIStatus({ key: CANCEL_SERVICE_REQUEST_STATUS, value: API_FAILED }))
            dispatch(endLoading());
        })
    }
}

export function cancelHiredServiceRequest(id) {
    return (dispatch, getState) => {
        let modal = {
            serviceRequestId: id,
            serviceProviderId: 0,
            patientId: '',
            cancelledDescription: ""
        }

        if (getState() && getState().authState){
            const { selectedPatientInfo, userInfo } = getState().authState.userState
            let patientId = userInfo.userType !== USER_TYPES.PATIENT ? selectedPatientInfo.patientId : userInfo.patientId

            modal = {
                serviceRequestId: id,
                serviceProviderId: 0,
                patientId,
                cancelledDescription: ""
            }
        }
       
        return Put(API.cancelHiredServiceRequest, modal, serviceUrl).then((resp) => {
            dispatch(getSortFilter(initialState))
            dispatch(getPatientRequests())
            dispatch(onBack())
        })
.catch((err) => {
            dispatch(endLoading());
        })
    }
}

export function getEspPlanVisits(data, requestType){
    return (dispatch, getState) => {
        dispatch(changeAPIStatus({key: "getServiceScheduleStatus", value: getStatusBasedOnRequestType(data.requestType || INIT)}))
        Post(API.getFilteredServiceVisits, data, serviceUrl).then((resp) => {
            let updatedData = resp.data

            if (data.requestType === LOAD_MORE){
                let existingData = getState().visitSelectionState.VisitServiceDetailsState.VisitServiceSchedule;

                updatedData = existingData.concat(resp.data)
            }
            dispatch(getVisitServiceScheduleSuccess(updatedData))
            storeVisitServiceScheduleData(resp.data, data).then((res) => {
                onApiSuccess && onApiSuccess()
            }).catch((err) => {
                onFailure && onFailure(err)
            })
            dispatch(changeAPIStatus({key: "getServiceScheduleStatus", value: API_SUCCESS}))
        }).catch((error) => {
            dispatch(changeAPIStatus({key: "getServiceScheduleStatus", value: API_FAILED}))
        })
    }
}

export function getVisitServiceDetails(serviceRequestId, onApiSuccess, onFailure, pId, isPlanVisit) {
    return (dispatch, getState) => {
        dispatch(changeAPIStatus({ key: "getServiceDetailsStatus", value: API_FETCHING }))
        incrementExecutionCount()
        const {patientId} = getUserIdAndType()
        let requestObject = {
            ...DEFAULT_REQUEST_OBJECT,
            serviceRequestId,
            patientId: pId ? pId : patientId,
            pageNumber: DEFAULT_PAGE_NUMBER,
            pageSize: DEFAULT_PAGE_SIZE
        }

        return Get(API.getServiceRequestDetails + serviceRequestId, serviceUrl).then((resp) => {
            dispatch(getVisitServiceDetailsSuccess(resp.data))
            dispatch(changeAPIStatus({ key: "getServiceDetailsStatus", value: API_SUCCESS }))
            if (serviceRequestId && !isPlanVisit){
                dispatch(getVisitServiceSchedule(requestObject))
                storeVisitServiceDetailData(resp.data).then((res) => {
                    onApiSuccess && onApiSuccess();
                }).catch((err) => {
                    dispatch(changeAPIStatus({ key: "getServiceDetailsStatus", value: API_FAILED }))
                    onFailure && onFailure(err);
                })
            } else {
                dispatch(getEspPlanVisits(requestObject))
            }
        }).catch((err) => {
            const serviceProviderId = getState().visitSelectionState.VisitServiceDetailsState.serviceProviderId

            if (err.message === NETWORK_ERROR) {
                getOfflineVisitServiceDetailData(getServiceRequestId({...requestObject, serviceProviderId})).then((res) => {
                    dispatch(getVisitServiceSchedule(requestObject))
                    dispatch(getVisitServiceDetailsSuccess(res))
                    dispatch(endLoading());
                    if (!isEmpty(res)) {
                        dispatch(changeAPIStatus({ key: "getServiceDetailsStatus", value: API_SUCCESS }))
                    } else {
                        dispatch(changeAPIStatus({ key: "getServiceDetailsStatus", value: API_FAILED }))
                    }
                }).catch((err) => {
                    __DEV__ && console.log("ERROR while getting sp id", err)
                    dispatch(changeAPIStatus({ key: "getServiceDetailsStatus", value: API_FAILED }))
                    dispatch(endLoading());
                    dispatch(changeAPIStatus(API_FAILED))
                })

            } else {
                dispatch(getEspPlanVisits(requestObject))
                onFailure && onFailure(err);
                dispatch(endLoading());
                dispatch(changeAPIStatus(API_FAILED))
                dispatch(changeAPIStatus({ key: "getServiceDetailsStatus", value: API_FAILED }))
            }
        })
    }
}

export function getVisitServiceSchedule(data, onApiSuccess, onFailure) {
    return (dispatch, getState) => {
        let requestType = data.requestType || INIT

        dispatch(changeAPIStatus({ key: "getServiceScheduleStatus", value: getStatusBasedOnRequestType(requestType) }))
        return Post(API.getServiceRequestSchedule, data, serviceUrl).then((resp) => {
            storeVisitServiceScheduleData(resp.data, data).then((res) => {
                onApiSuccess && onApiSuccess()
            }).catch((err) => {
                onFailure && onFailure(err)
            })
            const { VisitServiceSchedule } = getState().visitSelectionState.VisitServiceDetailsState
            let updatedData = [...resp.data]
            let existingData = VisitServiceSchedule ? [...VisitServiceSchedule] : []

            if (data && data.requestType === LOAD_MORE) {
                updatedData = existingData.concat(resp.data)
            }
            dispatch(getVisitServiceScheduleSuccess(updatedData))
            dispatch(changeAPIStatus({ key: "getServiceScheduleStatus", value: API_SUCCESS }))
        }).catch((err) => {
            const serviceProviderId = getState().visitSelectionState.VisitServiceDetailsState.serviceProviderId

            if (err.message === NETWORK_ERROR) {
                getOfflineVisitServiceScheduleData(getServiceRequestId({...data, serviceProviderId})).then((res) => {
                    dispatch(getVisitServiceScheduleSuccess(res))
                    dispatch(endLoading());
                }).catch((err) => {
                    dispatch(changeAPIStatus({ key: "getServiceScheduleStatus", value: API_FAILED }))
                    dispatch(endLoading());
                })
            } else {
                onFailure && onFailure(err)
                dispatch(endLoading());
                dispatch(changeAPIStatus({ key: "getServiceScheduleStatus", value: API_FAILED }))
            }

        })
    }
}

export function getFirstAndLastVisitOfRequest(data){
    return (dispatch, getState) => {
        dispatch(changeAPIStatus({ key: "getDatesStatus", value: API_FETCHING }))
        Post(`${API.getFirstAndLastDatesOfRequest}`, data, serviceUrl).then((resp) => {
            dispatch(changeAPIStatus({ key: "getDatesStatus", value: API_SUCCESS }))
             let updatedResponses = {
                startVisitDate: resp.data.startVisitDate === DEFAULT_VISIT_DATE ? null : resp.data.startVisitDate,
                endVisitDate: resp.data.endVisitDate === DEFAULT_VISIT_DATE ? null : resp.data.endVisitDate
            }

            dispatch(firstAndLastVisitDatesSuccess(updatedResponses))
        }).catch((err) => {
            dispatch(changeAPIStatus({ key: "getDatesStatus", value: API_FAILED }))
        })
    }
}
