
import {
  API,
  messageURL,
  serviceRequestURL,
  spURL
} from '../../../services/api'
import { startLoading, endLoading } from '../../loading/actions'
import {_} from '../../../utils/validations'
import {SERVICE_PROVIDERS} from '../../../screens/HomeTabs/index'
import { Get, serviceUrl, baseURL, Post, asyncURL } from '../../../services/http';
import { formatYearDate, getFormatedDate } from '../../../utils/momentUtil';
import { STATUS } from './reducer';
import { storePatientVisitDetailData, getOfflinePatientVisitDetail } from '../../../offline/Dashboard/PatientVisitDetail';
import { storeServiceReqDetailData, getOfflineServiceReqDetail, getOfflineServiceReqDetailByStatusId } from '../../../offline/Dashboard/ServiceRequestDetail';
import { NETWORK_ERROR } from '../../../constants/error';
import { storeServiceProviderDetailData, getOfflineServiceProviderDetail } from '../../../offline/Dashboard/ServiceProviderDetail';
import { API_FETCHING, API_SUCCESS, API_FAILED, REFRESH, API_REFRESH_FETCHING, LOAD_MORE } from '../../../constants/AppAPIConstants';
import { BLOCKED_STATUS_ID, ALL, USER_TYPES, GUIDELINES, DEFAULT_PAGE_SIZE } from '../../../constants/constants';
import { SERVICEPROVIDERS_REQUESTS } from '../../../screens/ServiceProvidersTab';
import { getVisitServiceDetails } from '../../visitSelection/VisitServiceDetails/actions';
import { getLanguagesSuccess } from '../../profile/Languages/actions';
import { getCitySuccess } from '../../profile/PersonalDetail/actions';
import { getDate } from "../../../utils/momentUtil"
import { incrementExecutionCount } from '../../../utils/ApiCounter';
import { storePatientVisitCount, getOfflinePatientVisitCount } from '../../../offline/Dashboard/PatientVisitCount';

import { getProfilePercentage } from '../../../redux/serviceProviderProfile/ProgerssIndicator/actions';
import {getPersonalDetail as getSpPersonalDetail, getImage as getSPImage} from "../../../redux/serviceProviderProfile/PersonalDetail/actions"
import { getServiceOffered } from '../../../redux/serviceProviderProfile/ServiceOffered/actions';
import { getSelectedSkills } from '../../../redux/serviceProviderProfile/Skills/actions';
import {getPointService as getSpPointService } from "../../../redux/serviceProviderProfile/PointService/actions"
import { getBlackOutDays, getAvailableDays } from '../../../redux/serviceProviderProfile/Availability/actions';
import {getSelectedLanguages as getSpSelectedLanguages} from "../../../redux/serviceProviderProfile/Languages/actions"
import { getCertification } from '../../../redux/serviceProviderProfile/Certification/actions';
import { getWorkHistory } from '../../../redux/serviceProviderProfile/WorkHistory/actions';
import { getEducation } from '../../serviceProviderProfile/Education/actions';
import { getUserInfo } from '../../../utils/userUtil';

export const DashboardDetail = {
  GET_CONVERSATION_DETAIL_SUCCESS: 'dashboard/GET_CONVERSATION_DETAIL_SUCCESS',
  GET_CONVERSATION_DETAIL: 'dashboard/GET_CONVERSATION_DETAIL',
  SET_UNREAD_CONVERSATION_COUNT_DETAILS: 'dashboard/SET_UNREAD_CONVERSATION__COUNT_DETAILS',
  GET_SERVICE_PROVIDER_DETAIL_SUCCESS: 'dashboard/GET_SERVICE_PROVIDER_DETAIL_SUCCESS',
  GET_SERVICE_PROVIDER_DETAIL: 'dashboard/GET_SERVICE_PROVIDER_DETAIL',
  GET_PATIENT_SERVICE_REQUEST_DETAIL: 'dashboard/GET_PATIENT_SERVICE_REQUEST_DETAIL',
  GET_PATIENT_SERVICE_REQUEST_DETAIL_SUCCESS: 'dashboard/GET_PATIENT_SERVICE_REQUEST_DETAIL_SUCCESS',
  GET_PATIENT_VISIT_DETAIL: 'dashboard/GET_PATIENT_VISIT_DETAIL',
  GET_PATIENT_VISIT_DETAIL_SUCCESS: 'dashboard/GET_PATIENT_VISIT_DETAIL_SUCCESS',
  GET_SERVICE_REQUEST_SUCCESS: 'dashboard/GET_SERVICE_REQUEST_SUCCESS',
  GET_SERVICE_REQUEST: 'dashboard/GET_SERVICE_REQUEST',
  CURRENT_VISIT_LIST: 'dashboard/CURRENT_VISIT_LIST',
  MORNING_VISIT_LIST: 'dashboard/MORNING_VISIT_LIST',
  AFTERNOON_VISIT_LIST: 'dashboard/AFTERNOON_VISIT_LIST',
  EVENING_VISIT_LIST: 'dashboard/EVENING_VISIT_LIST',
  changeAPIStatus: "changeAPIStatus/DASHBOARD",
  get_service_visit_count: 'get_service_visit_count',
  UPDATE_TAB_NAVIGATOR: 'dashboard/UPDATE_TAB_NAVIGATOR',
  getLookupSuccess: 'dashboard/getLookupSuccess',
  getVideoConferenceNotificationsSuccess: "getVideoConferenceNotificationSuccess/dashboard",
  resetVideoConferenceNotifications: "resetVideoConferences/dashboard",
  getMenuVideoConferencesSuccess: "getMenuVideoConferencesSuccess/dashboard",
  clearPatientVisit: "clearPatientVisit",
  updateVisitCompletion: "updateVisitCompletion",
  getPatientStagesSuccess: "getPatientStagesSuccess/Dashboard"
}

export const getPatientStagesSuccess = (data) => ({
    type: DashboardDetail.getPatientStagesSuccess,
    data
  })

export const getMenuVideoConferences = (data) => ({
    type: DashboardDetail.getMenuVideoConferencesSuccess,
    data
  })

export const updateVisitCompletion = (data) => ({
    type: DashboardDetail.updateVisitCompletion,
    data
  })

export const clearPatientVisit = () => ({type: DashboardDetail.clearPatientVisit})
export const resetVideoConferenceNotifications = () => ({type: DashboardDetail.resetVideoConferenceNotifications})

export const getVideoConferenceNotificationSuccess = (data) => ({
    type: DashboardDetail.getVideoConferenceNotificationsSuccess,
    data
  })
export const getLookupSuccess = (data) => ({
    type: DashboardDetail.getLookupSuccess,
    data
  })

export const getServiceStatusSuccess = (data) => ({
    type: DashboardDetail.GET_SERVICE_REQUEST_SUCCESS,
    data
  })

export const changeAPIStatus = (data) => ({
    type: DashboardDetail.changeAPIStatus,
    data
  })

export function getServiceStatusDetail () {
  return (dispatch) => {
    dispatch(startLoading())
    Get(API.getServiceRequestStatus, baseURL)
      .then((resp) => {
        dispatch(getServiceStatusSuccess(resp.data))
      })
      .catch(() => {
      })
  }
}

export const getPatientVisitDetailSuccess = (data) => ({
    type: DashboardDetail.GET_PATIENT_VISIT_DETAIL_SUCCESS,
    data
  })

export const getPatientStages = () => (dispatch, getState) => {
    let patientId = getState().authState.userState.patientId;

    Get(`${API.getPatientStages}${patientId}`).then((resp) => {
      let updatedData = {}

      Object.keys(GUIDELINES).map((id) => {
        let key = GUIDELINES[id].key

        updatedData = {
          ...updatedData,
          [id]: resp.data[key]
        }
      })
      dispatch(getPatientStagesSuccess(updatedData))
    }).catch((err) => {
    })
  }

function getFilteredVisitDetail(visitDetails){

  let filteredMorningVisitDetail = visitDetails.filter((el) => el.slot == 'Morning'),

   filteredAfternoonVisitDetail = visitDetails.filter((el) => el.slot == 'Afternoon'),

   filteredEveningVisitDetail = visitDetails.filter((el) => el.slot == 'Evening'),
   filteredVisitArr = [];

   filteredVisitArr = filteredVisitArr.concat(filteredMorningVisitDetail.slice(0, 2));
   filteredVisitArr = filteredVisitArr.concat(filteredAfternoonVisitDetail.slice(0, 2));
   filteredVisitArr = filteredVisitArr.concat(filteredEveningVisitDetail.slice(0, 2));
  return filteredVisitArr;
}

export function getPatientVisitDetail_Offline(toDayDate = formatYearDate("YYYY-MM-DD"),  onApiSuccess, onFailure) {
  return (dispatch, getState) => {
    let patientId = getState().authState.userState.patientId;
    let dateNumber = Number(getDate(toDayDate));
    const pageNumber = 1;
    const pageSize = 10;

    dispatch(startLoading())
    dispatch(changeAPIStatus({ key: STATUS.getPatientVisitsStatus, status: API_FETCHING }))
    Get(
      `${API.getPatientServiceVists}/${patientId}/ ${pageNumber}/${pageSize}` +
      `?startDate=${toDayDate}&endDate=${toDayDate}`, baseURL)
      .then((resp) => {
        let visitDetails = resp.data;

        __DEV__ && console.log("visit details", resp.data.length)
        visitDetails.map((individualVisitDetail) => {
          incrementExecutionCount();
          dispatch(getVisitServiceDetails(individualVisitDetail.serviceRequestId, onApiSuccess, onFailure));
        })
        storePatientVisitDetailData(visitDetails, dateNumber).then((res) => {
          onApiSuccess && onApiSuccess();
        })
.catch((err) => {
          onFailure && onFailure(err)
        })
        dispatch(getSpProfileData(resp.data, onApiSuccess, onFailure));
        if (typeof resp.data !== "string") {
          dispatch(getPatientVisitDetailSuccess(resp.data))
          dispatch(createVisitData(toDayDate, resp.data))
        }
        dispatch(changeAPIStatus({ key: STATUS.getPatientVisitsStatus, status: API_SUCCESS }))
      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR) {
          getOfflinePatientVisitDetail(dateNumber).then((res) => {
            dispatch(getPatientVisitDetailSuccess(res))
            dispatch(createVisitData(toDayDate, res))
            dispatch(changeAPIStatus({ key: STATUS.getPatientVisitsStatus, status: API_SUCCESS }))
            dispatch(endLoading())
          })
.catch((err) => {
            dispatch(endLoading())
          })
        } else {
          onFailure && onFailure(err);
          dispatch(endLoading())
        }
      })
  }
}


  function getSpProfileData(pgVisitsResp, onApiSuccess, onFailure){
    return (dispatch, getState) => {

      pgVisitsResp.map((singlePGVisit) => {
        let spId = singlePGVisit.serviceProvider.serviceProviderId

        incrementExecutionCount()

        dispatch(getProfilePercentage(spId, onApiSuccess, onFailure))

        incrementExecutionCount()
        
        dispatch(getSpPersonalDetail(spId, onApiSuccess, onFailure))
        
        incrementExecutionCount()

        dispatch(getSPImage(spId, onApiSuccess, onFailure))
        
        incrementExecutionCount()
        
        dispatch(getServiceOffered(spId, onApiSuccess, onFailure))

        incrementExecutionCount()

        dispatch(getSelectedSkills(spId, onApiSuccess, onFailure))

        incrementExecutionCount()

        dispatch(getSpPointService(spId, onApiSuccess, onFailure))

        incrementExecutionCount()

        dispatch(getAvailableDays(spId, onApiSuccess, onFailure))

        incrementExecutionCount()

        dispatch(getBlackOutDays(spId, onApiSuccess, onFailure))

        incrementExecutionCount()

        dispatch(getSpSelectedLanguages(spId, onApiSuccess, onFailure));

        incrementExecutionCount()
        
        dispatch(getCertification(spId, onApiSuccess, onFailure));

        incrementExecutionCount()

        dispatch(getWorkHistory(spId, onApiSuccess, onFailure));

        incrementExecutionCount()

        dispatch(getEducation(spId, onApiSuccess, onFailure))
      })
    }
}

export function getPatientVisitDetail (toDayDate = formatYearDate("YYYY-MM-DD"), requestObject, requestType, updateNetworkOnResponse) {
  return (dispatch, getState) => {
    let patientId =  getState().authState.userState.patientId;
    let network = getState().networkReducer.network;
    let reduxVisits = getState().dashboardState.dashboardState.patientVisit;
    const pageNumber = requestType === LOAD_MORE  ? Math.ceil(reduxVisits.length / DEFAULT_PAGE_SIZE) + 1 : 1;
    let dateNumber = Number(getDate(toDayDate));
    let apiStatus = requestType === REFRESH ? API_REFRESH_FETCHING : API_FETCHING

    dispatch(changeAPIStatus({key: STATUS.getPatientVisitsStatus, status: apiStatus}))
     requestObject = {
       ...requestObject,
       pageNumber
     }
    if (requestObject.method === "POST"){
      Post(API.getAggregatedPatientAPIS, {...requestObject, visitDate: toDayDate, patientId}).then((resp) => {
        if (!resp.data.serviceVisits || resp.data.serviceVisits.length === 0){
          dispatch(updateVisitCompletion(true))
        }
        let serviceProviders = resp.data.serviceProviders.length > 5 ? resp.data.serviceProviders.splice(0, 5) : resp.data.serviceProviders
        let visitCount = resp.data.serviceVisitCounts;

        visitCount.map((individualVisit) => {
          storePatientVisitCount(individualVisit.visitDate, individualVisit.visits);
          
        })
        
        requestObject.pageNumber === 1 && storePatientVisitDetailData(resp.data.serviceVisits, dateNumber);
        storeServiceProviderDetailData(serviceProviders);
        storeServiceReqDetailData(resp.data.serviceRequests)
        if (!network){
          updateNetworkOnResponse && updateNetworkOnResponse(true)
        }

        dispatch(createVisitData(toDayDate, resp.data.serviceVisits, requestObject))
        dispatch(getServiceProviderDetailSuccess(serviceProviders))
        dispatch(onUnreadCountSuccess(resp.data.conversationCount))
        dispatch(getPatientServiceRequestDetailSuccess(resp.data.serviceRequests.length > 5 ? resp.data.serviceRequests.splice(0, 5) : resp.data.serviceRequests))
        dispatch(getServiceVisitCountSuccess(normalizeDate(resp.data.serviceVisitCounts)))
        dispatch(changeAPIStatus({key: STATUS.getPatientVisitsStatus, status: API_SUCCESS}))
        getUserInfo().userType !== USER_TYPES.CARE_TEAM && dispatch(getVideoConferenceNotifications())
      }).catch((err) => {
        getOfflinePatientVisitDetail(dateNumber).then((res) => {
          dispatch(getPatientVisitDetailSuccess(res))
          dispatch(createVisitData(toDayDate, res, requestObject))
          dispatch(changeAPIStatus({ key: STATUS.getPatientVisitsStatus, status: API_SUCCESS }))
          dispatch(endLoading())
          getOfflineServiceProviderDetail().then((spDetail) => {
            dispatch(getServiceProviderDetailSuccess(spDetail))

            getOfflineServiceReqDetail().then((serviceReqRes) => {
              dispatch(getPatientServiceRequestDetailSuccess(serviceReqRes.splice(0, 5)))

              getOfflinePatientVisitCount().then((res) => {
                dispatch(getServiceVisitCountSuccess(normalizeDate(res)))
              })
            })
          })
        }).catch((err) => {
          dispatch(endLoading())
          dispatch(changeAPIStatus({key: STATUS.getPatientVisitsStatus, status: API_FAILED}))
        })
      })
    } else {
    Get(
      `${API.getPatientServiceVists}/${patientId}/${requestObject.pageNumber}/${requestObject.pageSize}` + 
      `?startDate=${toDayDate}&endDate=${toDayDate}`)
      .then((resp) => {
        __DEV__ && console.log("getting patient visits", resp.data)
        let visitsArr = [];

        visitsArr = visitsArr.concat(reduxVisits, resp.data)
        if (!resp.data || resp.data.length === 0){
          dispatch(updateVisitCompletion(true))
        }
        let visitDetails = resp.data;
        let filteredVisitArr = getFilteredVisitDetail(visitDetails)

        requestObject.pageNumber === 1 && storePatientVisitDetailData(filteredVisitArr, dateNumber);
        if (typeof resp.data !== "string"){
          dispatch(getPatientVisitDetailSuccess(visitsArr))
          dispatch(createVisitData(toDayDate, visitsArr))  
        }
        dispatch(changeAPIStatus({key: STATUS.getPatientVisitsStatus, status: API_SUCCESS}))
      })
      .catch((err) => {
        __DEV__ && console.log("error in getting patient visits", err)
        if (err.message === NETWORK_ERROR) {
          getOfflinePatientVisitDetail(dateNumber).then((res) => {
            dispatch(getPatientVisitDetailSuccess(res))
            dispatch(createVisitData(toDayDate, res))
            dispatch(changeAPIStatus({ key: STATUS.getPatientVisitsStatus, status: API_SUCCESS }))
            dispatch(endLoading())
          }).catch((err) => {
            dispatch(endLoading())
          })
        } else {
          dispatch(changeAPIStatus({key: STATUS.getPatientVisitsStatus, status: API_FAILED}))
        }
      })
    }
  }
}


export const getPatientServiceRequestDetailSuccess = (response, statusId = ALL) => ({
    type: DashboardDetail.GET_PATIENT_SERVICE_REQUEST_DETAIL_SUCCESS,
    data: {
      data: response,
      statusId
    }
  })

export function getPatientServiceRequestDetail(data) {
  let type = data ? data : 0;

  return (dispatch, getState) => {
    let {patientId} = getState().authState.userState;

    dispatch(startLoading())
    dispatch(changeAPIStatus({key: STATUS.getPatientServiceRequestsStatus, status: API_FETCHING}))
    Get(`${API.getPatientServiceRequests + patientId}/${type}/1/6/default/default`, serviceRequestURL)
      .then((resp) => {
        let updatedData = [];

        resp.data.map((serviceRequest) => {
          if (BLOCKED_STATUS_ID.indexOf(serviceRequest.statusId) === -1){
            updatedData.push(serviceRequest)
          }
        })
          storeServiceReqDetailData(updatedData);
        dispatch(getPatientServiceRequestDetailSuccess(updatedData, data))
        dispatch(changeAPIStatus({key: STATUS.getPatientServiceRequestsStatus, status: API_SUCCESS}))
      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR) {
          getOfflineServiceReqDetailByStatusId(data).then((res) => {
            dispatch(getPatientServiceRequestDetailSuccess(res, data))
            dispatch(changeAPIStatus({ key: STATUS.getPatientServiceRequestsStatus, status: API_SUCCESS }))
            dispatch(endLoading())
          })
.catch((err) => {
            dispatch(endLoading())
            dispatch(changeAPIStatus({ key: STATUS.getPatientServiceRequestsStatus, status: API_FAILED }))
          })
        } else {
          dispatch(endLoading())
          dispatch(changeAPIStatus({ key: STATUS.getPatientServiceRequestsStatus, status: API_FAILED }))
        }
      })
  }
}

export const getServiceProviderDetailSuccess = (data) => ({
    type: DashboardDetail.GET_SERVICE_PROVIDER_DETAIL_SUCCESS,
    data
  })

export function getServiceProviderDetail(onApiSuccess, onFailure) {
  return (dispatch, getState) => {
    let {patientId} = getState().authState.userState;

    dispatch(changeAPIStatus({key: STATUS.getServiceProvidersStatus, status: API_FETCHING}))
    Get(API.getServiceProviders + patientId)
      .then((resp) => {
        storeServiceProviderDetailData(resp.data).then((res) => {
          onApiSuccess && onApiSuccess();
        })
.catch((err) => {
          onFailure && onFailure(err);
        })
        dispatch(getServiceProviderDetailSuccess(resp.data))
        dispatch(changeAPIStatus({key: STATUS.getServiceProvidersStatus, status: API_SUCCESS}))
      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR) {
          getOfflineServiceProviderDetail().then((res) => {
            dispatch(getServiceProviderDetailSuccess(res))
            dispatch(changeAPIStatus({ key: STATUS.getServiceProvidersStatus, status: API_SUCCESS }))
            dispatch(endLoading())
          })
.catch((err) => {
            dispatch(endLoading())
            dispatch(changeAPIStatus({ key: STATUS.getServiceProvidersStatus, status: API_FAILED }))
          })
        } else {
          onFailure && onFailure(err);
          dispatch(endLoading())
          dispatch(changeAPIStatus({ key: STATUS.getServiceProvidersStatus, status: API_FAILED }))
        }
      })
  }
}

export function navigatToServiceProvider(extraProps) {
  extraProps.navigate(SERVICE_PROVIDERS)
  extraProps.navigate(SERVICEPROVIDERS_REQUESTS)
}

export const getConversationDetailSuccess = (data) => ({
    type: DashboardDetail.GET_CONVERSATION_DETAIL_SUCCESS,
    data
  })

export function getConversationDetail() {
  return (dispatch, getState) => {
    let {patientId} = getState().authState.userState;

    dispatch(startLoading())
    Get(`${API.getConversation + patientId}/i`, messageURL)
      .then((resp) => {
        dispatch(getConversationDetailSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch((err) => {
        dispatch(endLoading())
      })
  }
}
export const onUnreadCountSuccess = (data) => ({
    type: DashboardDetail.SET_UNREAD_CONVERSATION_COUNT_DETAILS,
    data
  })
export function getUnreadMessageCounts(userId) {
  return (dispatch, getState) => {
    let {patientId} = getState().authState.userState;

    dispatch(startLoading())
    Get(`${API.getUnreadCount + patientId}?participantType=i`, messageURL)
      .then((resp) => {
        dispatch(onUnreadCountSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch((err) => {
        dispatch(endLoading())
      })
  }
}

export function updateTabNavigator(navigation) {
  return {
    type: DashboardDetail.UPDATE_TAB_NAVIGATOR,
    data: navigation
  }
}

export const getServiceVisitCountSuccess = (data) => ({
    type: DashboardDetail.get_service_visit_count,
    data
  })
const normalizeDate = (data) => {
  let normalizedData = {}

  data && data.map((date) => {
    normalizedData = {
      ...normalizedData,
      [getFormatedDate(date.visitDate, "MM-DD-YYYY")]: date.visits
    }
  })
  return normalizedData
}

export function getServiceVisitsCount(startDate, endDate){
  return (dispatch, getState) => {
    let {patientId} = getState().authState.userState;

    dispatch(changeAPIStatus({key: "getServiceVisitsStatus", status: API_FETCHING}))
    Get(`${API.serviceVisitsCount + patientId}/${ 
    startDate 
    }/${ 
    endDate}`, serviceUrl).then((resp) => {
      dispatch(getServiceVisitCountSuccess(normalizeDate(resp.data)))
    })
.catch((err) => {
      dispatch(changeAPIStatus({key: "getServiceVisitsStatus", status: API_FAILED}))
    })
  }
}

export function createVisitData (date, patientVisitList, requestObject = {}) {
  return (dispatch, getState) => {
    if (!_.isNil(date) && !_.isNil(patientVisitList)){
      let currentVisitList = patientVisitList.filter((visit) => getFormatedDate(visit.visitDate, "YYYY-MM-DD") === getFormatedDate(date, "YYYY-MM-DD"))
      let morningVisits = currentVisitList.filter((visit) => visit.slot === 'Morning')

      let afternoonVisits = currentVisitList.filter((visit) => visit.slot === 'Afternoon')

      let eveningVisits = currentVisitList.filter((visit) => visit.slot === 'Evening')
    
      dispatch({
        type: DashboardDetail.CURRENT_VISIT_LIST,
          data: {patientVisitList, currentVisitList, morningVisits, afternoonVisits, eveningVisits, dashboardRequestObject: {...requestObject, toDayDate: date}}
      })
    }
  }
}

export function getLookupDetails(){
  return (dispatch) => {
    Get(API.getAggregatedLookupDetails, spURL).then((resp) => {
      dispatch(getLookupSuccess(resp.data))
      dispatch(getLanguagesSuccess(resp.data.language))
      dispatch(getCitySuccess(resp.data.state))
    })
.catch((err) => {
    })
  }
}

export function getVideoConferenceNotifications(isFromMenu){
  return (dispatch) => {
    dispatch(changeAPIStatus({key: "getOngoingVideoConferenceStatus", status: API_FETCHING}))
    Get(API.getVideoConferenceNotifications, asyncURL).then((resp) => {
      dispatch(changeAPIStatus({key: "getOngoingVideoConferenceStatus", status: API_SUCCESS}))
      isFromMenu ? dispatch(getMenuVideoConferences(resp.data)) : dispatch(getVideoConferenceNotificationSuccess(resp.data))
    }).catch((err) => {
      dispatch(changeAPIStatus({key: "getOngoingVideoConferenceStatus", status: API_FAILED}))
    })
  }
}


export function isActiveCall(roomNumber, onSuccess, onFailure){
  return (dispatch) => {
    Get(API.getVideoConferenceNotifications, asyncURL).then((resp) => {
      let data = resp.data

      if (roomNumber && onSuccess){
        let result  = data.filter((item) => item.roomNumber == roomNumber)

        result.length ? onSuccess && dispatch(onSuccess()) : onFailure && onFailure()
      }
    }).catch((err) => {
    })
  }
}