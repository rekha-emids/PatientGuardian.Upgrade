import { API } from '../../../services/api';
import { Get,  Delete } from '../../../services/http';
import {  endLoading } from '../../loading/actions';
import { navigateToScreenMainStack } from '../../navigation/actions';
import { getSelectedPatientInfo, getUserInfo } from '../../../utils/userUtil';
import { USER_TYPES } from '../../../constants/constants'
// import { clearState as profileTypeClear } from '../ProfileType/actions';
import { PATH } from '../../../routes';
import { isEmpty } from '../../../utils/EmptyObjCheck';
import { API_SUCCESS, API_FAILED, API_FETCHING } from '../../../constants/AppAPIConstants';
import { storeManageConnection, getOfflineMangeConnection } from '../../../offline/Profile/ManageConnection/ManageConnection';
import { NETWORK_ERROR } from '../../../constants/error';

export const manageConnection = {
  getAllConnections: 'next_click/memberdetails',
  getPatientGuardianList: 'GET_PATIENT_GUARDIAN_LIST',
  loadingStatus: 'memberDetails/isLoading'
};

export const isLoading = (data) => ({
    type: manageConnection.loadingStatus,
    data
  })

export function goToManageConnection() {
  return (dispatch) => {
    dispatch(navigateToScreenMainStack(PATH ? PATH.MANAGE_CONNECTION : null));
  }
}
export const getManageConnectionSuccess = (data, type) => ({
    type,
    data
  })

export const onAddIndividualDetails = (params) => (dispatch) => {
    dispatch(navigateToScreenMainStack(PATH ? PATH.PROFILE_SELECTION : null, params));
  }

export const onAddGuardianDetails = (params) => (dispatch) => {
    dispatch(navigateToScreenMainStack(PATH ? PATH.ADD_GUARDIAN_DETAILS : null, params));
  }


export function deleteRelationship(id, params, onSuccess) {
  return (dispatch, getState) => {
    let PATIENT_ID = getState().authState.userState.patientId;

    dispatch(isLoading(API_FETCHING))
    Delete(`${API.getManageConnections + PATIENT_ID}/${id}`)
      .then((resp) => {
       onSuccess && onSuccess()
        dispatch(isLoading(API_SUCCESS))
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED))
      })
  }
}

export function deleteRelationshipIndividual (data, onSuccess) {
  return (dispatch, getState) => {
    dispatch(isLoading(API_FETCHING))
    const userId = getUserInfo() && getUserInfo().userId;
    Delete(`${API.deleteIndividual + userId}/${data}`).
      then((resp) => {
        onSuccess && onSuccess()
        dispatch(endLoading(API_SUCCESS))
      })
      .catch((err) => {
        dispatch(endLoading(API_FAILED))
      })
  }
}

export function getManageConnection(userType, params, updateNetworkOnResponse) {
  return (dispatch, getState) => {
    if (userType === USER_TYPES.GUARDIAN) {
      dispatch(getMyConnections(userType, params, null, null, updateNetworkOnResponse))
    } else {
      dispatch(getPatientConnections(userType, params, updateNetworkOnResponse))
    }
  }
}

export function getMyConnections(data, params, onApiSuccess, onFailure, updateNetworkOnResponse) {
  return (dispatch, getState) => {
    let {network} = getState().networkReducer

    dispatch(isLoading(API_FETCHING))
    let userType = data ? data : getState().authState.userState.userType,
     userId = !isEmpty(params) ? params.id : getState().authState.userState.userId

    Get(`${API.getManageConnections + userId}/${userType}`)
      .then((resp) => {
        if (!network){
          updateNetworkOnResponse && updateNetworkOnResponse(true)
        }
        storeManageConnection(resp.data, userId).then((res) => {
          onApiSuccess && onApiSuccess()
        })
.catch((err) => {
          onFailure && onFailure(err)
        })
        dispatch(getManageConnectionSuccess({ data: resp.data.users, id: userId }, manageConnection.getPatientGuardianList))
        dispatch(isLoading(API_SUCCESS))

      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR) {
          getOfflineMangeConnection(userId).then((res) => {
            res && dispatch(getManageConnectionSuccess({ data: res.users, id: userId }, manageConnection.getPatientGuardianList))
            dispatch(isLoading(API_SUCCESS))
          })
.catch((err) => {

          })
        } else {
          onFailure && onFailure(err);
          dispatch(isLoading(API_FAILED))
        }
      })
  }
}

export function getPatientConnections(data, params, updateNetworkOnResponse) {
  return (dispatch, getState) => {
    let network = getState().networkReducer && getState().networkReducer.network;

    dispatch(isLoading(API_FETCHING))
    let PATIENT_ID;

    if (isEmpty(params)) {
      PATIENT_ID = getState().authState && getState().authState.userState.patientId;
    } else {
      PATIENT_ID = params && params.id;
    }
    let userType = data ? data : getSelectedPatientInfo() && getSelectedPatientInfo().userType;

    Get(`${API.getPatientConnections + PATIENT_ID}/${userType}`)
      .then((resp) => {
        if (!network){
          updateNetworkOnResponse && updateNetworkOnResponse(true)
        }
        dispatch(getManageConnectionSuccess({ data: resp.data.users, id: params.id }, manageConnection.getPatientGuardianList))
        dispatch(isLoading(API_SUCCESS))

      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED))

      })
  }
}







