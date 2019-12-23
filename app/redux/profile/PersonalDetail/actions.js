
import { API, spURL,  } from '../../../services/api'
import { Get, Post, Put } from '../../../services/http'
import {  endLoading } from '../../loading/actions'
import { ACTION_MODEL, getModal } from './modal'
import { onBack } from '../../navigation/actions';
import { storePersonalDetailData, getOfflinePersonalDetails } from '../../../offline/Profile/PersonalDetails/PersonalDetail';
import { NETWORK_ERROR } from '../../../constants/error';
import { storeGenderDetailData, getOfflineGenderDetails } from '../../../offline/Profile/PersonalDetails/GenderDetail';
import { storeCityDetailData, getOfflineCityDetails } from '../../../offline/Profile/PersonalDetails/CityDetail';
import { storeImageData, getOfflineImage } from '../../../offline/Profile/PersonalDetails/Image';
import { USER_TYPES } from '../../../constants/constants';
import { isPatientGuardian, getPatientInfo, getUserInfo, getSelectedPatientInfo } from '../../../utils/userUtil'

import { getPatientImageSuccess, onSetGuardianUserImage, onSetPatientUserImage } from '../../auth/User/actions';
import { isEmpty } from '../../../utils/EmptyObjCheck';
import { getSelectedClinicalConditionDetails } from '../ClinicalCondition/actions';
import { getSelectedLanguageDetails } from '../Languages/actions';
import { getPointServiceSuccess } from '../PointService/actions';
import { getManageConnectionSuccess, manageConnection } from '../../manageConnection/ManageConnectionData/actions';
import { storeSelectedClinicalCondition, getOfflineSelectedClinicalCondition } from '../../../offline/Profile/ClinicalCondition.js/SelectedClinicalCondition';
import { storeSelectedLanguages, getOfflineSelectedLanguages } from '../../../offline/Profile/Languages/SelectedLanguages';
import { storePointService, getOfflinePointService } from '../../../offline/Profile/PointService/PointService';
import { API_SUCCESS, API_FETCHING, API_FAILED } from '../../../constants/AppAPIConstants';
import { getStatusBasedOnRequestType } from '../../../utils/appUtils';
import { storeManageConnection, getOfflineMangeConnection } from '../../../offline/Profile/ManageConnection/ManageConnection';
import { storeProfilePercentage, getOfflineSpProfilePercentage } from '../../../offline/SPProfile/SpProfilePercentage';
import { getHeightWeight } from '../CoreoAssociation/actions';

export const PersonalDetails = {
  getPersonalDetailSuccess: 'getPersonalDetailSuccess/PersonalDetail',
  updatePersonalDetailSuccess: 'updatePersonalDetailSuccess/PersonalDetail',
  getPersonalDetail: 'getPersonalDetail/PersonalDetail',
  getCitySuccess: 'getCitySuccess/PersonalDetail',
  getCityDetail: 'getCityDetail/PersonalDetail',
  getGenderSuccess: 'getGenderSuccess/PersonalDetail',
  getGenderDetail: 'getGenderDetail/PersonalDetail',
  uploadImgSuccess: 'uploadImgSuccess/PersonalDetail',
  uploadImage: 'uploadImage/PersonalDetail',
  getImageSuccess: "getImageSuccess/PersonalDetials",
  getPersonalDetailGuardianSuccess: 'getPersonalDetailGuardianSuccess/PersonalDetials',
  getProfilePercentageSuccess: 'get_profile_percentage_success/progressIndicator',
  setUser: 'setUser/PersonalDetail',
  loadingStatus: 'PersonalDetail/isLoading',
  changeAPIStatus: "changeAPIStatus/PersonalDetails"

}

export const isLoading = (data) => ({
    type: PersonalDetails.loadingStatus,
    data
  })

export const getImageSuccess = (data) => ({
    type: PersonalDetails.getImageSuccess,
    data
  })

export const getPersonalDetailSuccess = (data) => ({
    type: PersonalDetails.getPersonalDetailSuccess,
    data
  })

export const uploadImgSuccess = (data) => ({
    type: PersonalDetails.uploadImgSuccess,
    data
  })

export const getCitySuccess = (data) => ({
    type: PersonalDetails.getCitySuccess,
    data
  })

export const getGenderSuccess = (data) => ({
    type: PersonalDetails.getGenderSuccess,
    data
  })

export const setUser = (data) => ({
    type: PersonalDetails.setUser,
    data
  })

export function getGenderDetail(onApiSuccess, onFailure) {
  return (dispatch) => {
    Get(API.getGender, spURL)
      .then((resp) => {
        storeGenderDetailData(resp.data).then((res) => {
          onApiSuccess && onApiSuccess();
        })
.catch((err) => {
          onFailure && onFailure(err);
        })
        dispatch(getGenderSuccess(resp.data))
      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR) {
          getOfflineGenderDetails().then((res) => {
            dispatch(getGenderSuccess(res))
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

export function getCityDetail(onApiSuccess, onFailure) {
  return (dispatch) => {
    Get(API.getState, spURL)
      .then((resp) => {
        storeCityDetailData(resp.data).then((res) => {
          onApiSuccess && onApiSuccess()
        })
.catch((err) => {
          onFailure && onFailure(err)
        })
        dispatch(getCitySuccess(resp.data))
      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR) {
          getOfflineCityDetails().then((res) => {
            dispatch(getCitySuccess(res));
            dispatch(endLoading());
          })
.catch((err) => {
            dispatch(endLoading())
          })
        } else {
          onFailure && onFailure(err)
          dispatch(endLoading())
        }
      })
  }
}

export const updatePersonalDetailSuccess = (isSuccess) => ({
    type: PersonalDetails.updatePersonalDetailSuccess,
    isSuccess
  })

export function uploadImg(data, params) {
  let isGuardian = params === undefined && getUserInfo().userType === USER_TYPES.GUARDIAN

  return (dispatch, getState) => {
    let userState = getState().authState && getState().authState.userState;
    let patientId = userState && userState.patientId;
    let coreoHomeUserId = userState && userState.userInfo.coreoHomeUserId;

    dispatch(isLoading(API_FETCHING))
    if (isGuardian) {
      dispatch(uploadImgGuardian(data, coreoHomeUserId));
      dispatch(isLoading(API_SUCCESS))

    } else {
      dispatch(uploadImgIndividual(data, patientId));
      dispatch(isLoading(API_FAILED))

    }
  }
}

export function uploadImgIndividual(data, patientId) {
  return (dispatch) => {
    let modal = {
      PatientId: patientId,
      image: data
    }

    dispatch(isLoading(API_FETCHING))
    Post(API.uploadImage, modal)
      .then((resp) => {
        dispatch(getImageIndividual(patientId))
        dispatch(getProfilePercentage(patientId))
        dispatch(isLoading(API_SUCCESS))
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED))
      })
  }
}

export function uploadImgGuardian(data, userId) {
  return (dispatch) => {
    let modal = {
      coreoHomeUserId: userId,
      image: data
    }

    dispatch(isLoading(API_FETCHING))

    Post(API.uploadImageGuardian, modal)
      .then((resp) => {
        dispatch(getImageGuardian(userId))
        dispatch(getProfilePercentage(userId));
        dispatch(isLoading(API_SUCCESS))

      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED))

      })
  }
}

export function getImage(params, onApiSuccess, onFailure, updateNetworkOnResponse) {
  return (dispatch, getState) => {
    if (isEmpty(params)) {
      let userState = getState().authState && getState().authState.userState;

      if (userState && userState.userType === USER_TYPES.GUARDIAN) {
        dispatch(getImageGuardian(userState && userState.userId, onApiSuccess, onFailure, updateNetworkOnResponse));
      } else {
        dispatch(getImageIndividual(userState && userState.patientId, onApiSuccess, onFailure, updateNetworkOnResponse));
      }
    } else if (params && params.userType === USER_TYPES.GUARDIAN) {
        dispatch(getImageGuardian(params && params.id, onApiSuccess, onFailure, updateNetworkOnResponse));
      } else {
        dispatch(getImageIndividual(params && params.id, onApiSuccess, onFailure, updateNetworkOnResponse));
      }
}
}



export function getImageIndividual(patientId, onApiSuccess, onFailure, updateNetworkOnResponse) {
  return (dispatch, getState) => {
    let network = getState().networkReducer && getState().networkReducer.network;

    Get(API.getImage + patientId)
      .then((resp) => {
        if (!network){
          updateNetworkOnResponse && updateNetworkOnResponse(true)
        }
        storeImageData(resp.data, patientId).then((res) => {
          onApiSuccess && onApiSuccess();
        })
.catch((err) => {
          onFailure && onFailure(err)
        })
        dispatch(getImageSuccess({ data: resp.data, id: patientId }))
        if (getSelectedPatientInfo() && getSelectedPatientInfo().patientId === patientId) {
dispatch(getPatientImageSuccess(resp.data, { id: patientId }))
}
        if (getUserInfo() && getUserInfo().patientId === patientId) {
dispatch(onSetPatientUserImage({ data: resp.data, id: patientId })) 
}
      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR) {
          getOfflineImage(patientId).then((resp) => {
            dispatch(getImageSuccess({ data: resp, id: patientId }))
            if (getSelectedPatientInfo().patientId === patientId) {
dispatch(getPatientImageSuccess(resp, { id: patientId })) 
}
            if (getUserInfo().patientId === patientId) {
 dispatch(onSetPatientUserImage({ data: resp, id: patientId })) 
}
            dispatch(endLoading())
          })
.catch((err) => {
            dispatch(endLoading())
          })
        } else {
          onFailure && onFailure(err)
          dispatch(endLoading())
        }
      })
  }

}

export function getImageGuardian(userId, onApiSuccess, onFailure, updateNetworkOnResponse) {
  return (dispatch, getState) => {
    let network = getState().networkReducer && getState().networkReducer.networkReducer;

    Get(API.getImageGuardian + userId)
      .then((resp) => {
        if (!network){
          updateNetworkOnResponse && updateNetworkOnResponse(true)
        }
        storeImageData(resp.data, userId).then((res) => {
          onApiSuccess && onApiSuccess()
        })
.catch((err) => {
          onFailure && onFailure(err)
        })
        dispatch(getImageSuccess({ data: resp.data, id: userId }))
        dispatch(onSetGuardianUserImage({ ...resp.data, id: userId }))
      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR) {
          getOfflineImage(userId).then((resp) => {
            dispatch(getImageSuccess({ data: resp, id: userId }))
            dispatch(onSetGuardianUserImage({ ...resp, id: userId }))
          })
.catch((err) => {
            dispatch(endLoading())
          })
        } else {
          onFailure && onFailure(err)
          dispatch(endLoading())
        }
      })
  }
}

export const getPersonalDetailGuardianSuccess = (data) => ({
    type: PersonalDetails.getPersonalDetailGuardianSuccess,
    data
  })

export const changeAPIStatus = (data) => ({
    type: PersonalDetails.changeAPIStatus,
    data
  })

export function getPersonalDetail(params = {}, requestType, onApiSuccess, onFailure) {
  return (dispatch, getState) => {
    let currentState = getState().authState && getState().authState.userState
    let userType = !isEmpty(params) ? params && params.userType : currentState && currentState.userType
    let id = !isEmpty(params) ? params && params.id : currentState && currentState.patientId

    dispatch(changeAPIStatus(getStatusBasedOnRequestType(requestType)))
    let url = (userType === USER_TYPES.GUARDIAN) ? API.getAggregatedGuardianPersonalDetail : API.getAggregatedPersonalDetail;
    Get(url + id + "/" + userType)
      .then(resp => {
        let data = (userType !== USER_TYPES.GUARDIAN) ? resp.data.patientView : resp.data.guardian
        dispatch(getPersonalDetailSuccess({ data: (userType !== USER_TYPES.GUARDIAN) ? resp.data.patientView : resp.data.guardian, id: id }))
        resp.data.patientClinicalConditions && dispatch(getSelectedClinicalConditionDetails({ data: resp.data.patientClinicalConditions, id: id }))
        resp.data.patientLanguages && dispatch(getSelectedLanguageDetails({ data: resp.data.patientLanguages, id: id }))
        resp.data.patientAddresses && dispatch(getPointServiceSuccess({ data: resp.data.patientAddresses, id: id }))
        resp.data.userIndiviudal.users && dispatch(getManageConnectionSuccess({ data: resp.data.userIndiviudal.users, id: id }, manageConnection.getPatientGuardianList))
        resp.data.patientProgress && dispatch(getProfilePercentageSuccess({ data: resp.data.patientProgress, id: id }))
        dispatch(getHeightWeight())
        dispatch(changeAPIStatus(API_SUCCESS))

        storePersonalDetailData({data: userType !== USER_TYPES.GUARDIAN ? resp.data.patientView : resp.data.guardian}, id).then((res) => {
          storeSelectedClinicalCondition(resp.data.patientClinicalConditions, id).then((res) => {
            storeSelectedLanguages(resp.data.patientLanguages, id).then((res) => {
              storePointService(resp.data.patientAddresses, id).then((res) => {
                storeManageConnection(resp.data.userIndiviudal.users, id).then((res) => {
                  storeProfilePercentage(id, resp.data.patientProgress).then((res) => {
                    onApiSuccess && onApiSuccess()
                  })
                })
              })
            })
          })
        })
.catch((err) => {
          onFailure && onFailure(err);
        })

      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR) {
          getOfflinePersonalDetails(id).then((resp) => {
            dispatch(getPersonalDetailSuccess({ data: resp ? resp.data : null, id }))
            getOfflineSelectedClinicalCondition(id).then((res) => {
              res && dispatch(getSelectedClinicalConditionDetails({ data: res, id }))
              getOfflineSelectedLanguages(id).then((res) => {
                res && dispatch(getSelectedLanguageDetails({ data: res, id }))
                getOfflinePointService(id).then((resp) => {
                  resp && dispatch(getPointServiceSuccess({ data: resp, id }))
                  getOfflineMangeConnection(id).then((resp) => {
                    resp && dispatch(getManageConnectionSuccess({ data: resp.users, id }, manageConnection.getPatientGuardianList))
                    dispatch(changeAPIStatus(API_SUCCESS))
                    getOfflineSpProfilePercentage(id).then((resp) => {
                      dispatch(getProfilePercentageSuccess({ data: resp, id }))
                    })
                  })
                })
              })
            })
          })
.catch((err) => {
            dispatch(changeAPIStatus(API_FAILED))
          })
        } else {
          onFailure && onFailure(err);
          dispatch(changeAPIStatus(API_FAILED))
        }
      })
  }
}

export function getPersonalDetailIndividual(patientId) {
  return (dispatch) => {
    Get(`${API.getPersonalDetail + patientId}/PatientDetails`)
      .then((resp) => {
        storePersonalDetailData(resp.data, patientId);
        dispatch(getPersonalDetailSuccess({ data: resp.data, id: patientId }))
      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR) {
          getOfflinePersonalDetails(patientId).then((resp) => {
            dispatch(getPersonalDetailSuccess({ data: resp, id: patientId }))
          })
.catch((err) => {

          })
        } else {
        }
      })
  }
}

export function getPersonalDetailGuardian(userId) {
  return (dispatch) => {
    Get(API.getPersonalDetailGuardian + userId)
      .then((resp) => {
        dispatch(getPersonalDetailGuardianSuccess({ data: resp.data, id: userId }))
      })
      .catch((err) => {
      })
  }
}

export function updatePersonalDetail(data, onSuccess, guardianUserId) {
  return (dispatch, getState) => {
    let {userType} = getState().authState.userState.userInfo;
    if (guardianUserId && userType === USER_TYPES.GUARDIAN) {
      dispatch(updatePersonalDetailGuardian(data));
    } else {
      dispatch(updatePersonalDetailIndividual(data));
    }

  }
}
export function updatePersonalDetailIndividual(data, individualParams) {
  return (dispatch, getState) => {
    let modelData = getModal(data, ACTION_MODEL.UPDATE_DATA, getState),
     {userState} = getState().authState,
     {patientId} = userState

    if (userState.userType === USER_TYPES.CARE_TEAM){
      patientId = getSelectedPatientInfo().patientId
    }
    dispatch(isLoading(API_FETCHING))
    Put(API.updatePersonalDetail, modelData)
      .then((resp) => {
        let params = { id: patientId, userType: userState.userType }

        dispatch(getPersonalDetail(params))
        dispatch(getPersonalDetailIndividual(params))
        dispatch(getProfilePercentage(params))
        dispatch(onBack())
        dispatch(isLoading(API_SUCCESS))
       
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED))

      })
  }
}

export function updatePersonalDetailGuardian(data) {
  return (dispatch, getState) => {
    let modelData = getModal(data, ACTION_MODEL.UPDATE_DATA_GUARDIAN, getState)

    dispatch(isLoading(API_FETCHING))
    Put(API.updateGuardianDetail, modelData)
      .then((resp) => {
        let params = { id: getUserInfo().patientId, userType: getUserInfo().userType }
        dispatch(getPersonalDetail(params))
        dispatch(getProfilePercentage(params));
        dispatch(onBack())
        dispatch(isLoading(API_SUCCESS))

      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED))

      })
  }
}

export const getProfilePercentageSuccess = (data) => ({
    type: PersonalDetails.getProfilePercentageSuccess,
    data
  })

export function getProfilePercentage(data) {
  return (dispatch) => {
    if (!isPatientGuardian()) {
      dispatch(getProfilePercentageIndividual(data ? data.id : getPatientInfo().patientId));
    }
  }
}

export function getProfilePercentageIndividual(patientId) {
  return (dispatch) => {
    Get(API.getProfilePercentage + patientId)
      .then((resp) => {
        dispatch(getProfilePercentageSuccess({ data: resp.data, id: patientId }))
      })
.catch((err) => {
      })
  }
}
