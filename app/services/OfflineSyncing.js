import { store } from '../redux/store';
import { fetchLoginData } from '../offline/Login';
import { getOfflineUserRelatedData } from '../offline/UserRelatedDetail';
import { getPointService } from '../redux/profile/PointService/actions';
import { getPersonalDetail, getImage } from '../redux/profile/PersonalDetail/actions';
import { getPatientVisitDetail_Offline, getServiceProviderDetail } from '../redux/dashboard/Dashboard/actions';
import { getOfflineUserRolesData } from '../offline/UserRoles';
import { setCompleteUserData } from '../redux/auth/User/actions';
import { getFormatedDate, getDateBasedOnNumber } from '../utils/momentUtil';
import {  storeSyncHistory } from '../offline/SyncingDataWithServer/SyncHistory';
import { clearOfflinePatientImageData } from '../offline/Dashboard/PatientImage';
import { clearOfflinePatientVisitDetail } from '../offline/Dashboard/PatientVisitDetail';
import { clearOfflineServiceProviderDetail } from '../offline/Dashboard/ServiceProviderDetail';
import { clearOfflineServiceReqDetail } from '../offline/Dashboard/ServiceRequestDetail';
import { clearOfflineUserInfoData } from '../offline/Dashboard/UserInfo';
import { clearOfflineVisitServiceDetailData } from '../offline/Dashboard/VisitServiceDetails';
import { clearOfflineVisitServiceScheduleData } from '../offline/Dashboard/VisitServiceSchedule';
import { clearOfflinePointService } from '../offline/Profile/PointService/PointService';
import { clearOfflinePersonalDetails } from '../offline/Profile/PersonalDetails/PersonalDetail';
import { clearOfflineImage } from '../offline/Profile/PersonalDetails/Image';
import { clearOfflineGenderDetails } from '../offline/Profile/PersonalDetails/GenderDetail';
import { clearOfflineCityDetails } from '../offline/Profile/PersonalDetails/CityDetail';
import { clearOfflineSelectedLanguages } from '../offline/Profile/Languages/SelectedLanguages';
import { clearOfflineSelectedClinicalCondition } from '../offline/Profile/ClinicalCondition.js/SelectedClinicalCondition';
import { incrementExecutionCount, incrementSuccessCount, incrementFailureCount, offlineApiCalls } from '../utils/ApiCounter';
import { CURRENT_DATE, PAST_DATE, FUTURE_DATE,  PAST_DATE_2, FUTURE_DATE_2,  DD_MMM_HH_MM, USER_TYPES,  BACKGROUND_SYNC_FAILED, BACKGROUND_SYNC_SUCCESS } from "../constants/constants";
import { syncToServerSuccess, syncToServerComplete } from '../redux/syncToServer/actions';
import { objectCreationRoles } from '../utils/roleUtil';
import { checkNetworkConnectivity } from '../../app/redux/network/action';
import { clearOfflineSpAvailableDays } from '../offline/SPProfile/SpAvailableDays';
import { clearOfflineSpBlockoutDays } from '../offline/SPProfile/SpBlockOutDays';
import { clearOfflineSpCertifications } from '../offline/SPProfile/SpCertifications';
import { clearOfflineSpEducation } from '../offline/SPProfile/SpEducation';
import { clearOfflineSpPersonalDetails } from '../offline/SPProfile/SpPersonalDetails';
import { clearOfflineSpPointOfServ } from '../offline/SPProfile/SpPointOfService';
import { clearOfflineSpProfileImage } from '../offline/SPProfile/SpImage';
import { clearOfflineSpProfilePercentage } from '../offline/SPProfile/SpProfilePercentage';
import { clearOfflineSpSelectedLanguages } from '../offline/SPProfile/SpSelectedLanguages';
import { clearOfflineSpSelectedSkills } from '../offline/SPProfile/spSelectedSkills';
import { clearOfflineSpServicesOffered } from '../offline/SPProfile/SpServicesOffered';
import { clearOfflineSpWorkHistory } from '../offline/SPProfile/SpWorkHistory';
import { getCurrentLocalDateFromUtc } from "../utils/momentUtil";
import { storeLastSyncedDate } from "../offline/SyncingDataWithServer/LastSyncedDate";
import { getUserInfo } from '../utils/userUtil';
import { ServiceRequestPost } from './http';
import { API } from './api';
import { onLoginSuccess } from '../redux/auth/Login/actions';
import { updateLastSyncedDate } from '../redux/Notifications/NotificationSettings/actions';

/**
* Method: fetchDashboardAPI
* Description: make server call to fetch serviceStatusDetail, serviceProvider visits, PatientServiceRequestDetail
*/
function fetchDashboardAPI() {
  incrementExecutionCount()
  store.dispatch(getPatientVisitDetail_Offline(getUTC(CURRENT_DATE), onApiSuccess, onFailure));
  incrementExecutionCount()
  store.dispatch(getServiceProviderDetail(onApiSuccess, onFailure));
  fetchProfileApi(); // fetch profile API
}



/**
 * Method: getUTC
 * Description: Get Current Date in UTC Format
 */
function getUTC(date) {
  switch (date) {
    case CURRENT_DATE:
      let utc = getDateBasedOnNumber(0)

      return utc;

    case PAST_DATE:
      utc = getDateBasedOnNumber(-1)
      return utc;

    case FUTURE_DATE:

      utc = getDateBasedOnNumber(1)
      return utc;
    case PAST_DATE_2:
      utc = getDateBasedOnNumber(-2)
      return utc
    case FUTURE_DATE_2:
      utc = getDateBasedOnNumber(2)
      return utc
  }

}

/**
 * Method: fetchProfileApi
 * Description: make server call to fetch all profile information
 */

function fetchProfileApi() {

  incrementExecutionCount()

  store.dispatch(getPointService(null, onApiSuccess, onFailure));

  if (getUserInfo().userType === USER_TYPES.PATIENT){
    incrementExecutionCount()

    store.dispatch(getPersonalDetail({}, null, onApiSuccess, onFailure))
  }  else if (getUserInfo().userType === USER_TYPES.GUARDIAN){
    let params = {
      userType: USER_TYPES.GUARDIAN,
      id: getUserInfo().userId
    }

    store.dispatch(getPersonalDetail(params))
    params = {
      userType: USER_TYPES.PATIENT,
      id: store.getState().authState.userState.patientId
    }
    store.dispatch(getPersonalDetail(params))
  }


  if (getUserInfo().userType === USER_TYPES.PATIENT){
    incrementExecutionCount()
    store.dispatch(getImage(null, onApiSuccess, onFailure))
  }  else if (getUserInfo().userType === USER_TYPES.GUARDIAN){
    let params = {
      userType: USER_TYPES.GUARDIAN,
      id: getUserInfo().userId
    }

    incrementExecutionCount()
    store.dispatch(getImage(params, onApiSuccess, onFailure))

    params = {
      userType: USER_TYPES.PATIENT,
      id: store.getState().authState.userState.patientId
    }
    incrementExecutionCount()
    store.dispatch(getImage(params, onApiSuccess, onFailure))
  }
  
}


function getLocalDbJSONStructure(loginRes, userData, userRoles) {
  let userJSONData = {
    userId: userData.userId,
    authData: userData.authData,
    userEmail: userData.emailId,
    patientId: userData.patientId,
    userType: userData.userType,
    autoLogoutTime: 120000,
    roles: userRoles
  }

  return userJSONData;
}

export function offlineSyncing() {
  global.isSyncing = true
  fetchServerData()
}

function onFailure(err) {
  __DEV__ && console.log("Err in onFailure: ", err)
  //logger API to intimate sync is failed
  const logURL = `${API.postErrorMessage + BACKGROUND_SYNC_FAILED + new Date()} ${err}'`

  ServiceRequestPost(logURL).then((res) => {
  }).catch((err) => {
    __DEV__ && console.log("err in sync ", err)
  })
  incrementFailureCount()
  store.dispatch(syncToServerSuccess(false))
  store.dispatch(syncToServerComplete(true))
  store.dispatch(syncToServerComplete)
  let currentDate = getFormatedDate(new Date()),

   syncObj = {
    date: currentDate,
    status: 0
  }

  storeSyncHistory(syncObj).then((isStored) => {

  })

}

function onApiSuccess() {
  incrementSuccessCount()
  if (offlineApiCalls.total === offlineApiCalls.success || offlineApiCalls.success >= 100) {
    //logger API to intimate sync is successfull
    const logURL = `${API.postErrorMessage + BACKGROUND_SYNC_SUCCESS + new Date()}'`

    ServiceRequestPost(logURL).then((res) => {
    }).catch((err) => {
    })
    const dateTime = getCurrentLocalDateFromUtc(DD_MMM_HH_MM)

    global.isSyncing = false
    storeLastSyncedDate(dateTime).then((res) => {
      store.dispatch(updateLastSyncedDate())
    })
    // store.dispatch(onBack());
    store.dispatch(syncToServerComplete(true))
    store.dispatch(syncToServerSuccess(true))
  }
}

export function fetchServerData() {
  global.isSyncing = true
  fetchLoginData()
    .then((loginResponse) => {
      if (loginResponse.length){
        let loginResp =  loginResponse[0];
        let authData = {
          username: loginResp.userName,
          password: loginResp.password
      }
      let resp = {
        data: {
          access_token: loginResp.access_token,
          expires_in: loginResp.expires_in,
          token_type: loginResp.token_type
        }
      }

      store.dispatch(onLoginSuccess({userData: {accessToken: loginResp.access_token}}, resp, authData));

      getOfflineUserRelatedData().then((res) => {
        let userData = JSON.parse(res[0].userRelatedData);
        // fetch userRoles data

        getOfflineUserRolesData().then((userRolesRes) => {
          let userRoles = { ...userRolesRes};

          userRoles = Object.values(userRoles)
          userRoles = objectCreationRoles(userRoles)
          let userJSONData = getLocalDbJSONStructure(loginResp, userData, userRoles);

          store.dispatch(setCompleteUserData(userJSONData));
          fetchDashboardAPI(); // fetch dashboard API
        })
.catch((err) => {
          // console.log("err is: ", err)
        })
      }).catch((err) => {
        throw err;
      }) 
      
      }
    })
    .catch((err) => {
      // console.log("err is: ", err);
    })
}

export async function clearLocalDb() {

  //clear dashboard data
  let clearDb = await clearOfflinePatientImageData().then((res) => {
    clearOfflinePatientVisitDetail().then((res) => {
      clearOfflineServiceProviderDetail().then((res) => {
        clearOfflineServiceReqDetail().then((res) => {
          clearOfflineUserInfoData().then((res) => {
            clearOfflineVisitServiceDetailData().then((res) => {
              clearOfflineVisitServiceScheduleData().then((res) => {
                //clear profile data 
                clearOfflineSelectedClinicalCondition().then((res) => {
                  clearOfflineSelectedLanguages().then((res) => {
                    clearOfflineCityDetails().then((res) => {
                      clearOfflineGenderDetails().then((res) => {
                        clearOfflineImage().then((res) => {
                          clearOfflinePersonalDetails().then((res) => {
                            clearOfflinePointService().then((res) => {
                              clearOfflineSpAvailableDays().then((res) => {
                                clearOfflineSpBlockoutDays().then((res) => {
                                  clearOfflineSpCertifications().then((res) => {
                                    clearOfflineSpEducation().then((res) => {
                                      clearOfflineSpPersonalDetails().then((res) => {
                                        clearOfflineSpPointOfServ().then((res) => {
                                          clearOfflineSpProfileImage().then((res) => {
                                            clearOfflineSpProfilePercentage().then((res) => {
                                              clearOfflineSpSelectedLanguages().then((res) => {
                                                clearOfflineSpSelectedSkills().then((res) => {
                                                  clearOfflineSpServicesOffered().then((res) => {
                                                    clearOfflineSpWorkHistory().then((res) => {
                                                      // console.log("cleared db")
                                                    })
                                                  })
                                                })
                                              })
                                            })
                                          })
                                        })
                                      })
                                    })
                                  })
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
.catch((err) => {

  })


}

export function updateNetworkConnectivity(network){
  store && store.dispatch(checkNetworkConnectivity(network))
}