import { API, spURL } from '../../../services/api';
import { CareTeamPost, CareTeamGet, Post, Get, serviceUrl, careteamUrl, Put } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { navigateToScreenMainStack, onBack } from '../../navigation/actions';
import { PATH } from '../../../routes';
import { setSelectedPatient } from '../../auth/User/actions';
import { LOAD_MORE, API_FETCHING, API_SUCCESS, API_FAILED, INIT } from '../../../constants/AppAPIConstants';
import { getCareTeamId} from '../../../utils/userUtil';
import { getStatusBasedOnRequestType } from '../../../utils/AppAPIUtils';
import { getTimeZoneOffset } from '../../../utils/momentUtil';
import { CARETEAM_SERVICE_PROVIDERS, USER_TYPES } from '../../../constants/constants';

export const CareTeam = {
   setFromDate: 'careteam/dashboard/setFromDate',
   setToDate: 'careteam/dashboard/setToDate',
   getIndividualCount: 'careteam/dashboard/getIndividualCount',
   setSelectedCount: 'careteam/dashboard/setSelectedCount',
   setSelectedDashboardDetail: 'careteam/dashboard/setSelected_SR_DashboardDetail',
   getDashboardDetail: 'careteam/dashboard/getDashboardDetail',
   getServiceRequestDashboardDetail: 'careteam/dashboard/getServiceRequestDashboardDetail',
   getServiceVisitDashboardDetail: 'careteam/dashboard/getServiceVisitDashboardDetail',
   getServiceProviderDashboardDetail: 'careteam/dashboard/getServiceProviderDashboardDetail',
   setItemDetail: 'careteam/dashboard/setItemDetail',
   getServiceProviderCount: 'careteam/dashboard/getServiceProviderCount',
   setSelectedServiceProviderCount: 'careteam/dashboard/setSelectedServiceProviderCount',
   getServiceRequestCount: 'careteam/dashboard/getServiceRequestCount',
   getServiceVisitCount: 'careteam/dashboard/getServiceVisitCount',
   getCohortsSuccess: 'careteam/dashboard/getCohortsSuccess',
   getContractSuccess: 'careteam/dashboard/getContractSuccess',
   getCareTeamClinicalConditionsSuccess: "careteam/dashboard/getCareTeamClinicalConditions",
   onChangeRequestObject: "careteam/dashboard/onChangeRequestObject",
   getServiceRequestDetailsSuccess: "careteam/dashboard/getServiceRequestDetailsSuccess",
   getDiagnosisCodeSuccess: 'careteam/dashboard/getDiagnosisCodeSuccess',
   postAuthNoSuccess: 'careteam/dashboard/postAuthNoSuccess',
   updateDiagnosisCodeSuccess: 'careteam/dashboard/updateDiagnosisCodeSuccess',
   getPatientImageSuccess: 'careteam/dashboard/getPatientImageSuccess',
   getSPImageSuccess: 'careteam/dashboard/getSPImageSuccess',
   loadingStatus: 'careTeam/dashboard/isLoading',
   clearDashboardDetailState: 'careTeam/clearDashboardDetailState',
   updateGender: 'careTeam/updateGender',
   clearImageData: "clearImageData/careteamDashboardDetailsState",
   resetSelectedIcdCodes: "resetIcdCodes/careteamDashboardDetailsState",
   getFeedbackAlertSuccess: "getFeedbackAlertSuccess/careteamDashboardDetailsState",
   getRiskGroupSuccess:"careTeam/Dashboard/getRiskGroupSuccess"
};

export const resetSelectedIcdCodes = () => ({type: CareTeam.resetSelectedIcdCodes})

export const clearImageData = () => ({type: CareTeam.clearImageData})

export const isLoading = (data) => ({
        type: CareTeam.loadingStatus,
        data
    })

export function setFromDate(data){
   return (dispatch) => {
       dispatch({
            type: CareTeam.setFromDate,
            data
        });
   }
}

export function getServiceRequestDetailsSuccess(data){
  return {
      type: CareTeam.getServiceRequestDetailsSuccess,
      data
  }
}

export function setToDate(data){
    return (dispatch) => {
        dispatch({
             type: CareTeam.setToDate,
             data
         });
    }
 }

export const setSelectedCount = (data) => ({
        type: CareTeam.setSelectedCount,
        data
    })

export const setSelectedDashboardDetail = (data) => ({
        type: CareTeam.setSelectedDashboardDetail,
        data
    })

export function goToDashboardDetail(data){
   return (dispatch) => {
       dispatch(setSelectedCount(data))
       dispatch(navigateToScreenMainStack(PATH.CARETEAM_DASHBOARD_INDIVIDUAL_DETAIL_SCREEN));
   }
}

export function goToServiceProviderDashboardDetail(data){
    return (dispatch) => {
        dispatch(setSelectedCount(data))
        dispatch(navigateToScreenMainStack(PATH.CARETEAM_DASHBOARD_SERVICEPROVIDER_DETAIL_SCREEN));
    }
 }

export function goToServiceRequestDashboardDetail(data, onSuccess){
    return (dispatch) => {
        dispatch(setSelectedCount(data))
        onSuccess ? onSuccess() : dispatch(navigateToScreenMainStack(PATH.CARETEAM_DASHBOARD_SERVICEREQUEST_DETAIL_SCREEN));
    }
}
 
export function goToServiceVisitDashboardDetail(data){
    return (dispatch) => {
        dispatch(setSelectedCount(data))
        dispatch(navigateToScreenMainStack(PATH.CARETEAM_DASHBOARD_SERVICEVISIT_DETAIL_SCREEN));
    }
 }

export function goToDashboard(){
    return (dispatch) => {
        dispatch(navigateToScreenMainStack(PATH.CARETEAM_SCREEN));
    }
}

export function goBackToIndividualDashboardDetail(){
    return (dispatch) => {
        dispatch(navigateToScreenMainStack(PATH.CARETEAM_DASHBOARD_INDIVIDUAL_DETAIL_SCREEN));
    }
}

export function inpersinatePatient(){
    return (dispatch, getState) => {
        let selectedPatient = getState().careTeamState.dashboardState.itemDetail,
         patient = {
            patientId: selectedPatient.individualId,
            fullName: selectedPatient.individualName,
            image: selectedPatient.thumbNail,
            userType: 'I'
        }

        dispatch(setSelectedPatient(patient));
        dispatch(navigateToScreenMainStack(PATH ? PATH.INPERSONATE_HOME_SCREEN : ""))
    }
}

export function goBackToServiceProviderDashboardDetail(){
    return (dispatch) => {
        dispatch(navigateToScreenMainStack(PATH.CARETEAM_DASHBOARD_SERVICEPROVIDER_DETAIL_SCREEN));
    }
}
export function goToDiagnosisCode(){
    return (dispatch) => {
        dispatch(navigateToScreenMainStack(PATH.CARE_TEAM_DIAGNOSIS_CODE));
    }
}

export function goBackToServiceRequestDashboardDetail(data){
    return (dispatch) => {
        dispatch(getServiceRequestDashboardDetail(data));
        dispatch(navigateToScreenMainStack(PATH.CARETEAM_DASHBOARD_SERVICEREQUEST_DETAIL_SCREEN));
    }
}

export function goBackToServiceVisitDashboardDetail(){
    return (dispatch) => {
        dispatch(navigateToScreenMainStack(PATH.CARETEAM_DASHBOARD_SERVICEVISIT_DETAIL_SCREEN));
    }
}

export const setItemDetail = (data) => ({
        type: CareTeam.setItemDetail,
        data
    })

export const getContractSuccess = (data) => ({
        type: CareTeam.getContractSuccess,
        data
    })

export const getCareTeamClinicalConditionsSuccess = (data) => ({
        type: CareTeam.getCareTeamClinicalConditionsSuccess,
        data
    })

export const getRiskGroupSuccess = (data) => ({
        type: CareTeam.getRiskGroupSuccess,
        data
    })

export function goToItemDetail(data){
    return (dispatch) => {
        dispatch(setItemDetail(data))
        let params = {...data}

        data.label === CARETEAM_SERVICE_PROVIDERS.WITH_FEEDBACK_ALERTS ? dispatch(navigateToScreenMainStack(PATH.FEEDBACK_ALERTS, params))
        : dispatch(navigateToScreenMainStack(PATH.CARETEAM_DASHBOARD_INDIVIDUAL_ITEM_DETAIL_SCREEN, params));
    }
}
export function goToServiceProviderItemDetail(data){

    return (dispatch) => {
        dispatch(setItemDetail(data))
        let params = {...data}

       data.label === CARETEAM_SERVICE_PROVIDERS.WITH_FEEDBACK_ALERTS ? dispatch(navigateToScreenMainStack(PATH.FEEDBACK_ALERTS, params)) : dispatch(navigateToScreenMainStack(PATH.CARETEAM_DASHBOARD_SERVICEPROVIDER_ITEM_DETAIL_SCREEN, params));
    }
}
export function goToServiceRequestItemDetail(data, requestObject){
    return (dispatch) => {
        dispatch(setItemDetail(data))
        let params = {}

        if (requestObject){
            params = {requestObject}
        }
        dispatch(navigateToScreenMainStack(PATH.CARETEAM_DASHBOARD_SERVICEREQUEST_ITEM_DETAIL_SCREEN, params));
    }
}
export function goToServiceVisitItemDetail(data){
    return (dispatch) => {
        dispatch(setItemDetail(data))
        dispatch(navigateToScreenMainStack(PATH.CARETEAM_DASHBOARD_SERVICEVISIT_ITEM_DETAIL_SCREEN));
    }
}


export const getDashboardDetailSuccess = (data) => ({
        type: CareTeam.getDashboardDetail,
        data
    })

export const clearDashboardDetail = () => ({type: CareTeam.clearDashboardDetailState})

export const getCohortsSuccess = (data) => ({
        type: CareTeam.getCohortsSuccess,
        data
    })

export function getInTotalDashboardDetail (data, requestType) {
    data.careTeamId = getCareTeamId();
    return (dispatch, getState) => {
        dispatch(isLoading(getStatusBasedOnRequestType(requestType)))
        return CareTeamPost(API.getCareTeamInTotalDashboardDetail, data)
        .then((resp) => {
            let updatedData = [...resp.data]

            if (requestType === LOAD_MORE){
                let existingData = [...getState().careTeamState.dashboardState.dashboardDetail]

                updatedData = existingData.concat(updatedData)
            }
            dispatch(getDashboardDetailSuccess(updatedData))
            dispatch(isLoading(API_SUCCESS))
        })
        .catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export const getPatientImageSuccess = (data) => ({
        type: CareTeam.getPatientImageSuccess,
        data
    })

export function getImage(id) {
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
        return Get(API.getPatientImage + id).then((response) => {
            dispatch(getPatientImageSuccess(response.data));
            dispatch(isLoading(API_SUCCESS))
        })
        .catch((error) => {
            dispatch(isLoading(API_FAILED))
        });
    }
}

export const SPImgSuccess = (data) => ({
      type: CareTeam.getSPImageSuccess,
      data
    })

export function getSPImage (spId) {
    return (dispatch, getState) => {
      // const {serviceProviderId} = getState().authState.userState;
      dispatch(isLoading(API_FETCHING))
        return Get(API.getSPImage + spId, spURL)
        .then((resp) => {
          dispatch(SPImgSuccess(resp.data))
          dispatch(isLoading(API_SUCCESS))
        })
        .catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export function getVisitDashboardDetail (data) {
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
        return CareTeamPost(`${API.getCareTeamVisitDashboardDetail}?fromDate=${data.fromDate}&toDate=${data.toDate}&careTeamId=${data.careTeamId}`, data)
        .then((resp) => {
            let updatedData = [...resp.data]

            if (data.requestType === LOAD_MORE){
                let existingData = [...getState().careTeamState.dashboardState.dashboardDetail]

                updatedData = existingData.concat(updatedData)
            }
            dispatch(getDashboardDetailSuccess(updatedData))
            dispatch(isLoading(API_SUCCESS))
        })
        .catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export function getServiceRequestDetails(data) {
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
        return Get(API.getServiceRequestDetails + data, serviceUrl).then((resp) => {
            dispatch(getServiceRequestDetailsSuccess(resp.data))
            dispatch(isLoading(API_SUCCESS))
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export function approveOrDeclineServiceRequest(srId, statusId, requestObject) {
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
        return Put(`${API.approveOrDeclineServiceRequest + srId}/${statusId}`, null, careteamUrl).then((resp) => {
            dispatch(onBack())
            dispatch(onBack())
            dispatch(getServiceRequestDashboardDetail(requestObject, INIT))
            dispatch(isLoading(API_SUCCESS))
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export const getServiceRequestDashboardDetailSuccess = (data) => ({
        type: CareTeam.getServiceRequestDashboardDetail,
        data
    })

export function getServiceRequestDashboardDetail (data, requestType) {
    return (dispatch, getState) => {
        dispatch(isLoading(getStatusBasedOnRequestType(requestType)))
        dispatch(setSelectedDashboardDetail(data))

        return CareTeamPost(API.getCareTeamServiceRequestDashboardDetail, data)
        .then((resp) => {
            let updatedData = [...resp.data]

            if (requestType === LOAD_MORE){
                let existingData = [...getState().careTeamState.dashboardState.serviceRequestDashboardDetail]

                updatedData = existingData.concat(updatedData)
            }
            dispatch(getServiceRequestDashboardDetailSuccess(updatedData))
            dispatch(isLoading(API_SUCCESS))
        })
        .catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}


export const getServiceVisitDashboardDetailSuccess = (data) => ({
        type: CareTeam.getServiceVisitDashboardDetail,
        data
    })

export function getServiceVisitDashboardDetail (data, apiRequestType) {
    return (dispatch, getState) => {
        dispatch(isLoading(getStatusBasedOnRequestType(apiRequestType)))
        const {requestType, tabFilter, ...other} = data

       return CareTeamPost(API.getCareTeamServiceVisitDashboardDetail, {...other})
        .then((resp) => {
            let updatedData = [...resp.data]

            if (apiRequestType === LOAD_MORE){
                let existingData = [...getState().careTeamState.dashboardState.serviceVisitDashboardDetail]

                updatedData = existingData.concat(updatedData)
            }
            dispatch(getServiceVisitDashboardDetailSuccess(updatedData))
            dispatch(isLoading(API_SUCCESS))
        })
        .catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export const getServiceProviderDashboardDetailSuccess = (data) => ({
        type: CareTeam.getServiceProviderDashboardDetail,
        data
    })

export function getServiceProviderDashboardDetail (data, requestType) {
    return (dispatch, getState) => {
        dispatch(isLoading(getStatusBasedOnRequestType(requestType)))
        return CareTeamPost(API.getCareTeamServiceProviderDashboardDetail, data)
        .then((resp) => {
            let updatedData = null

            updatedData = [...resp.data]
            if (requestType === LOAD_MORE){
                let existingData = [...getState().careTeamState.dashboardState.serviceProviderDashboardDetail]

                updatedData = existingData.concat(updatedData)
            }
            dispatch(getServiceProviderDashboardDetailSuccess(updatedData))
            dispatch(isLoading(API_SUCCESS))
        })
        .catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export const updateCareTeamGender = (data) => ({
        type: CareTeam.updateGender,
        data
})

export function getFeedbackAlertSuccess(data){
    return {
        type: CareTeam.getFeedbackAlertSuccess,
        data
    }
}

export function getFeedbackAlerts(id, userType, requestObject, requestType) {
    return (dispatch, getState) => {
        dispatch(isLoading(getStatusBasedOnRequestType(requestType)))
        let fromDate = '11-1-19'
        let toDate = '11-1-19'

        if (getState() && getState().careTeamState && getState().careTeamState.dashboardState){
            fromDate = getState().careTeamState.dashboardState.fromDate
            toDate = getState().careTeamState.dashboardState.toDate
        }
        let postData = {
            fromDate,
            toDate,
            pageNumber: requestObject.pageNumber,
            pageSize: requestObject.pageSize
        }
        let api = API.getPatientFeedbackAlerts

        if (userType === USER_TYPES.SERVICE_PROVIDER){
            api = API.getServiceProviderFeedbackAlerts
            postData = {
                ...postData,
                serviceProviderId: id
            }
        } else {
            postData = {
                ...postData,
                patientId: id
            }
        }
        return CareTeamPost(api, postData).then((resp) => {
            let updatedData = [...resp.data]

            if (requestType === LOAD_MORE){
                let existingData = [...getState().careTeamState.dashboardState.feedbackAlerts]

                updatedData = existingData.concat(updatedData)
            }
            dispatch(getFeedbackAlertSuccess(updatedData))
            dispatch(isLoading(API_SUCCESS))
        }).catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}



export const getIndividualCountSuccess = (data, requestObject) => ({
        type: CareTeam.getIndividualCount,
        data,
        requestObject
    })

export function getIndividualCount (data) {
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
        return CareTeamPost(API.getCareTeamIndividualCount, data)
        .then((resp) => {
            dispatch(getIndividualCountSuccess(resp.data, data))
            dispatch(isLoading(API_SUCCESS))
        })
        .catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export const getServiceProviderCountSuccess = (data, requestObject) => ({
        type: CareTeam.getServiceProviderCount,
        data,
        requestObject
    })

export function getServiceProviderCount (data) {
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
        return CareTeamGet(`${API.getCareTeamServiceProviderCount}?fromDate=${data.fromDate}&toDate=${data.toDate}&careTeamId=${data.careTeamId}&offset=${getTimeZoneOffset()}`, data)
        .then((resp) => {
            dispatch(getServiceProviderCountSuccess(resp.data, data))
            dispatch(isLoading(API_SUCCESS))

        })
        .catch((err) => {
            dispatch(isLoading(API_FAILED))

        })
    }
}

export const getServiceRequestCountSuccess = (data, requestObject) => ({
        type: CareTeam.getServiceRequestCount,
        data,
        requestObject
    })

export function getServiceRequestCount (data) {
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
        return CareTeamGet(`${API.getCareTeamServiceRequestCount}?fromDate=${data.fromDate}&toDate=${data.toDate}&careTeamId=${data.careTeamId}&offset=${getTimeZoneOffset()}`, data)
        .then((resp) => {
            dispatch(getServiceRequestCountSuccess(resp.data, data))
            dispatch(isLoading(API_SUCCESS))
        })
        .catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export const getServiceVisitCountSuccess = (data, requestObject) => ({
        type: CareTeam.getServiceVisitCount,
        data,
        requestObject
    })

export function getServiceVisitCount (data) {
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
        return CareTeamPost(API.getCareTeamServiceVisitCount, data)
        .then((resp) => {
            dispatch(getServiceVisitCountSuccess(resp.data, data))
            dispatch(isLoading(API_SUCCESS))
        })
        .catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}
export function getCohort(pageNumber, pageSize){
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
        return Get(`${API.getCohorts}${pageNumber}/${pageSize}?searchText=null`).then((resp) => {
            dispatch(getCohortsSuccess(resp.data))
            dispatch(isLoading(API_SUCCESS))
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export function getContract(){
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
        return Get(API.getContracts).then((resp) => {
            dispatch(getContractSuccess(resp.data))
            dispatch(isLoading(API_SUCCESS))
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export function getCareTeamClinicalConditions(){
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
        return Get(API.getClinicalCondition).then((resp) => {
            dispatch(getCareTeamClinicalConditionsSuccess(resp.data))
            dispatch(isLoading(API_SUCCESS))
        }).catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
}
}
export const updateDiagnosisCodeSuccess = (data) => ({
      type: CareTeam.updateDiagnosisCodeSuccess,
      data
    })
export const getDiagnosisCodeSuccess = (data, selectedIcdCodes) => ({
      type: CareTeam.getDiagnosisCodeSuccess,
      data,
      selectedIcdCodes
    })
  
export function getDiagnosisCode (data) {
    let endPoint = API.getDiagnosisCode

    if (data && data !== '') {
endPoint = `${API.getDiagnosisCode}?searchText=${data}` 
} 
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
      return Get(endPoint)
        .then((resp) => {
          let itemDetails = getState().careTeamState.dashboardState.itemDetail
          let selectedIcdCodes = [...getState().careTeamState.dashboardState.selectedIcdCodes]
          const {diagnosisCode} = itemDetails
          let diagnosisCodeList = diagnosisCode ? diagnosisCode.replace(/ /g, '').split(",") : [],
           updatedResponse = resp.data.slice(0, 25).map((item) => {
              if (diagnosisCodeList.indexOf(item.diagnosisCodes) !== -1 || selectedIcdCodes.indexOf(item.diagnosisCodes) !== -1){
                  selectedIcdCodes.push(item.diagnosisCodes.toString())
                  return {
                      ...item,
                      selected: true
                  }
              } else {
                  return {
                      ...item,
                      selected: false
                  }
              }
          })

          dispatch(getDiagnosisCodeSuccess(updatedResponse, selectedIcdCodes))
          dispatch(isLoading(API_SUCCESS))
        })
        .catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
  }
  
  export function postDiagnosisCode (data, requestModal) {
    return (dispatch, getState) => {
        let modal = getState().careTeamState && getState().careTeamState.dashboardState.selectedCount

        dispatch(isLoading(API_FETCHING))
        return Post(API.postDiagnosisCode, data).then((resp) => {
            dispatch(isLoading(API_SUCCESS))
            dispatch(getServiceRequestDashboardDetail(requestModal))
            let onSuccess = () => {
                let diagnosisCodes = data.diagnosisCodes.map((code) => code)
                let itemDetails = getState().careTeamState.dashboardState.itemDetail

                dispatch(setItemDetail({...itemDetails, diagnosisCode: diagnosisCodes.join(",")}))
                dispatch(resetSelectedIcdCodes())
                dispatch(onBack())
            }

            dispatch(goToServiceRequestDashboardDetail(modal, onSuccess))
        })
        .catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
  }

  export const postAuthNoSuccess = (authNo, requestId) => ({
        type: CareTeam.postAuthNoSuccess,
        data: {
            authNo,
            serviceRequestId: requestId
        }
      })

  export function postAuthNo (data) {
    return (dispatch, getState) => {
        let modal = getState().careTeamState && getState().careTeamState.dashboardState.selectedCount

      dispatch(startLoading())
      return Post(API.postAuthNo, data)
        .then((resp) => {
          dispatch(endLoading())
          dispatch(postAuthNoSuccess(data.AuthorizationNumber, data.serviceRequestId))
        })
        .catch((err) => {
          dispatch(endLoading())
        })
    }
  }

  export function onSelectDiagnosisCode (diagnosisCodes, emidsFlag) {
    return (dispatch) => {
        
    }
  }

  export function getRiskGroup () {
      return (dispatch) => {
        dispatch(isLoading(API_FETCHING))
        return Get(API.getRiskGroup).then((resp) => {
            let modifiedData = resp.data.map((item , index) => {
                return {...item, selected:false}
            } )
            dispatch(getRiskGroupSuccess(modifiedData))
            dispatch(isLoading(API_SUCCESS))
        }).catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
      }
  }

export function updateRiskGroup(id) {
    return (dispatch,getState) => {
        let existingData = getState().careTeamState.dashboardState.riskGroup

        let updatedData = existingData.map((item,index)=>{
            
            return item.id === id ? {...item, selected: !item.selected}: item
             
        })

        dispatch(getRiskGroupSuccess(updatedData))
    }
 }

 export function resetRiskGroup() {
    return (dispatch,getState) => {
        let existingData = getState().careTeamState.dashboardState.riskGroup

        let updatedData = existingData.map((item,index)=>{
            
            return {...item, selected: false}
             
        })

        dispatch(getRiskGroupSuccess(updatedData))
    }
 }
 






