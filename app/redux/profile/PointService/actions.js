import { API } from '../../../services/api'
import { Get, Post, Delete } from '../../../services/http'
import {endLoading } from '../../loading/actions'
import { ACTION_MODEL, getModal } from './modal'
import { onBack } from '../../navigation/actions';
import { storePointService, getOfflinePointService } from '../../../offline/Profile/PointService/PointService';
import { NETWORK_ERROR, BAD_REQUEST } from '../../../constants/error';
import { USER_TYPES } from '../../../constants/constants';
import { getProfilePercentage } from '../PersonalDetail/actions';
import { isEmpty } from '../../../utils/EmptyObjCheck';
import { API_SUCCESS, API_FAILED, API_FETCHING } from '../../../constants/AppAPIConstants';
import FormConstants from '../../../screens/EditProfile/EditPointofService/FormConstants';

export const PointService = {
  getPointServiceSuccess: 'get_PointService_success/PointService',
  addPointServiceSuccess: 'add_PointService_success/PointService',
  getPointServiceFieldDetails: 'get_PointService_field_details/PointService',
  loadingStatus: 'pointOfService/isLoading',
  addPointServiceFailure: 'add_PointService_failure/PointService'
}

export const isLoading = (data) => ({
    type: PointService.loadingStatus,
    data
  })

export const getPointServiceSuccess = (data) => ({
    type: PointService.getPointServiceSuccess,
    data
  })

export const addPointServiceSuccess = (isSuccess) => ({
    type: PointService.addPointServiceSuccess,
    isSuccess
  })


export const addPointServiceFailure = (isFailure) => ({
    type: PointService.addPointServiceFailure,
    isFailure
  })

export const getPointServiceFieldDetails = (data) => ({
    type: PointService.getPointServiceFieldDetails,
    data
  })

export function getPointService(params, onApiSuccess, onFailure) {
  return (dispatch, getState) => {
    if (params === undefined || isEmpty(params)) {
      let {userState} = getState().authState;

      if (userState.userType === USER_TYPES.GUARDIAN) {

        dispatch(getPointServiceGuardian(userState.userId, onApiSuccess, onFailure));
      } else {
        dispatch(getPointServiceIndividual(userState.patientId, onApiSuccess, onFailure));
      }
    } else if (params.userType === USER_TYPES.GUARDIAN) {
        dispatch(getPointServiceGuardian(params.id, onApiSuccess, onFailure));
      } else {
        dispatch(getPointServiceIndividual(params.id, onApiSuccess, onFailure));
      }
  }
}

export function getPointServiceIndividual(patientId, onApiSuccess, onFailure) {
  return (dispatch) => {
    dispatch(isLoading(API_FETCHING))
    Get(`${API.getPatientAddress + patientId}/PatientAddress`)
      .then((resp) => {
        storePointService(resp.data, patientId).then((res) => {
          onApiSuccess && onApiSuccess()
        })
.catch((err) => {
          onFailure && onFailure(err);
        })
        dispatch(getPointServiceSuccess({data: resp.data, id: patientId}))
        dispatch(isLoading(API_SUCCESS))

      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR) {
          getOfflinePointService(patientId).then((resp) => {
            dispatch(getPointServiceSuccess({data: resp, id: patientId}))
            dispatch(isLoading(API_SUCCESS))

          })
.catch((err) => {
            dispatch(isLoading(API_FAILED))
          })
        } else {
          onFailure && onFailure(err);
          dispatch(isLoading(API_FAILED))
        }
      })
  }
}

export function getPointServiceGuardian(userId, onApiSuccess, onFailure) {
  return (dispatch) => {
    Get(`${API.getGuardianAddress + userId}/CoreoHomeUserAddress`)
      .then((resp) => {
        storePointService(resp.data, userId).then((res) => {
          onApiSuccess && onApiSuccess();
        })
.catch((err) => {
          onFailure && onFailure(err)
        })
        dispatch(getPointServiceSuccess({data: resp.data, id: userId}))
      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR) {
          getOfflinePointService(userId).then((resp) => {
            dispatch(getPointServiceSuccess({data: resp, id: userId}))
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

export function addPointService(data) {
  return (dispatch, getState) => {
    let {userState} = getState().authState;

    if (userState.userType === USER_TYPES.GUARDIAN) {
      dispatch(addPointServiceGuardian(data, userState.userId));
    } else {
      dispatch(addPointServiceIndividual(data, userState.patientId));
    }
  }
}

export function addPointServiceIndividual(data) {
  return (dispatch, getState) => {
    let modelData = getModal(data, ACTION_MODEL.ADD_DATA, getState),
     {patientId} = getState().authState.userState

    dispatch(isLoading(API_FETCHING))

    Post(
      `${API.addPatientAddress + patientId}/PatientAddress`,
      modelData
    )
      .then((resp) => {
        dispatch(updatePrimaryAddress(data, ACTION_MODEL.ADD_DATA))
        dispatch(addPointServiceSuccess(true))
        dispatch(getPointServiceIndividual(patientId))
        dispatch(getProfilePercentage())
        dispatch(isLoading(API_SUCCESS))

      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED))

      })
  }
}

export function addPointServiceGuardian(data, userId) {
  return (dispatch, getState) => {
    let modelData = getModal(data, ACTION_MODEL.ADD_DATA_GUARDIAN, getState)

    dispatch(isLoading(API_FETCHING))
    Post(
      `${API.addPatientAddressGuardian + userId}/CoreoHomeUserAddress`,
      modelData
    )
      .then((resp) => {
        dispatch(updatePrimaryAddress(data, ACTION_MODEL.ADD_DATA_GUARDIAN))
        dispatch(addPointServiceSuccess(true))
        dispatch(getPointServiceGuardian(userId))
        dispatch(getProfilePercentage())
        dispatch(isLoading(API_SUCCESS))

      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED))

      })
  }
}


export function updatePrimaryAddress(data, actionModal) {
  return (dispatch, getState) => {
    if (data.Primaryaddress) {
      let addresses = getState().profileState.PointServiceState.PointServiceList,
       primaryAddress = addresses.filter((address) => address.isPrimaryAddress);

      if (primaryAddress && primaryAddress.length > 0) {
        let requestObject = {
          Primaryaddress: false,
          [FormConstants.ADDRESS_TYPE]: primaryAddress[0].addressTypeId,
          [FormConstants.STATE]: primaryAddress[0].stateId,
          [FormConstants.CITY]: primaryAddress[0].city,
          [FormConstants.ZIP_CODE]: primaryAddress[0].zip,
          [FormConstants.STREET]: primaryAddress[0].street,
          addressId: primaryAddress[0].addressId
        },
         modelData = getModal(requestObject, actionModal, getState);

        dispatch(isLoading(API_FETCHING))

        Post(
          `${API.addPatientAddress + getState().authState.userState.patientId}/PatientAddress`,
          modelData
        )
          .then((resp) => {
            dispatch(isLoading(API_SUCCESS))

          })
          .catch((err) => {
            dispatch(isLoading(API_FAILED))

          })
      }
    }
  }
}

export function updatePointService(data) {
  return (dispatch, getState) => {
    let {userState} = getState().authState;

      dispatch(updatePointServiceIndividual(data, userState.patientId));
  }
}

export function updatePointServiceIndividual(data, patientId) {
  return (dispatch, getState) => {
    let modelData = getModal(data, ACTION_MODEL.ADD_DATA, getState)

    dispatch(isLoading(API_FETCHING))
    Post(
      `${API.addPatientAddress + patientId}/PatientAddress`,
      modelData
    )
      .then((resp) => {
        dispatch(updatePrimaryAddress(data, ACTION_MODEL.ADD_DATA))
        dispatch(addPointServiceSuccess(true))
        dispatch(getPointServiceIndividual(patientId))
        dispatch(getProfilePercentage())
        dispatch(onBack())
        dispatch(isLoading(API_SUCCESS))

      })
      .catch((err) => {
        if (err.message === BAD_REQUEST){

          dispatch(addPointServiceFailure(true))
        }
        dispatch(isLoading(API_FAILED))

      })
  }
}

export function updatePointServiceGuardian(data, userId) {
  return (dispatch, getState) => {
    let modelData = getModal(data, ACTION_MODEL.ADD_DATA_GUARDIAN, getState)

    dispatch(isLoading(API_FETCHING))
    Post(
      `${API.addPatientAddress + userId}/PatientAddress`,
      modelData
    )
      .then((resp) => {
        dispatch(updatePrimaryAddress(data, ACTION_MODEL.ADD_DATA_GUARDIAN))
        dispatch(addPointServiceSuccess(true))
        dispatch(getPointServiceGuardian(userId))
        dispatch(getProfilePercentage())
        dispatch(onBack())
        dispatch(isLoading(API_SUCCESS))

      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED))

      })
  }
}

export function deletePointService(data, onSuccess) {
  return (dispatch, getState) => {
    let userState = getState().authState && getState().authState.userState;

    dispatch(isLoading(API_FETCHING))
    if (userState && userState.userType === USER_TYPES.GUARDIAN) {
      let userId = userState && userState.userId;

      dispatch(deletePointServiceGuardian(data, onSuccess, userId));
      dispatch(isLoading(API_SUCCESS))

    } else {
      let patientId = userState && userState.patientId

      dispatch(deletePointServiceIndividual(data, onSuccess, patientId));
      dispatch(isLoading(API_FAILED))

    }
  }
}

export function deletePointServiceIndividual(data, onSuccess, patientId) {
  return (dispatch) => {
    dispatch(isLoading(API_FETCHING))

    Delete(`${API.deletePatientAddress + patientId}/PatientAddress/${data}`)
      .then((resp) => {
        dispatch(getPointServiceIndividual(patientId))
        dispatch(getProfilePercentage())
        dispatch(isLoading(API_SUCCESS))

        onSuccess && onSuccess()
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED))

      })
  }
}

export function deletePointServiceGuardian(data, onSuccess, userId) {
  return (dispatch) => {
    dispatch(isLoading(API_FETCHING))
    Delete(`${API.deletePatientAddressGuardian + userId}/CoreoHomeUserAddress/${data}`)
      .then((resp) => {
        dispatch(getPointServiceGuardian(userId))
        dispatch(getProfilePercentage())
        dispatch(isLoading(API_SUCCESS))

        onSuccess && onSuccess()
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED))

      })
  }
}
