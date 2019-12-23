import { API } from '../../../services/api'
import { Post, Delete, SpGet } from '../../../services/http'
import { ACTION_MODEL, getModal } from './modal'
import { onBack } from '../../navigation/actions';
import { getProfilePercentage } from '../PersonalDetail/actions';
import { API_FETCHING, API_SUCCESS, API_FAILED } from '../../../constants/AppAPIConstants';
import { storeSpPointOfService, getOfflineSpPointOfService } from '../../../offline/SPProfile/SpPointOfService';
import { NETWORK_ERROR } from '../../../constants/error';

export const PointService = {
  getPointServiceSuccess: 'get_PointService_success/serviceProviderPointService',
  addPointServiceSuccess: 'add_PointService_success/PointService',
  changeAddingPointService: "changeAddingPointService/PointService",
  getPointServiceFieldDetails: 'get_PointService_field_details/PointService',
  loadingStatus: 'PointService/isLoading',
  clearPointServiceState: 'clearPointServiceState/spPointService'
}

export const clearPointServiceState = () => ({type: PointService.clearPointServiceState})

export const getPointServiceSuccess = (data) => ({
    type: PointService.getPointServiceSuccess,
    data
  })

export const addPointServiceSuccess = (isSuccess) => ({
    type: PointService.addPointServiceSuccess,
    isSuccess
  })

export const getPointServiceFieldDetails = (data) => ({
    type: PointService.getPointServiceFieldDetails,
    data
  })

export const changeAddingPointService = (data) => ({
    type: PointService.changeAddingPointService,
    data
  })

export function getPointService(spId, onApiSuccess, onApiFailure) {
  return (dispatch, getState) => {
    dispatch(isLoading(API_FETCHING))

      SpGet(API.getServiceArea + spId).then((response) => {
        __DEV__ && console.log("resp for point of serv: ", response.data)
        storeSpPointOfService(spId, response.data).then((res) => {
          onApiSuccess && onApiSuccess()
        })
.catch((err) => {
            onApiFailure && onApiFailure()
        })
          dispatch(getPointServiceSuccess(response.data))
          dispatch(isLoading(API_SUCCESS))

      })
.catch((error) => {
        if (error.message === NETWORK_ERROR){
          getOfflineSpPointOfService(spId).then((res) => {
            dispatch(getPointServiceSuccess(res))
            dispatch(isLoading(API_SUCCESS))
          })
.catch((err) => {
            dispatch(isLoading(API_FAILED))
          })
        } else {
          onApiFailure && onApiFailure()
          dispatch(isLoading(API_FAILED))
        }

      })
  }
}

export const isLoading = (data) => ({
    type: PointService.loadingStatus,
    data
  })

export function updatePointService(data) {
  return (dispatch, getState) => {
    let modelData = getModal(data, ACTION_MODEL.ADD_DATA, getState)

    dispatch(changeAddingPointService(API_FETCHING))
    dispatch(isLoading(API_FETCHING))
    Post(API.updateServiceArea, modelData).then((response) => {
        dispatch(getPointService())
        dispatch(getProfilePercentage())
        dispatch(changeAddingPointService(API_SUCCESS))
        dispatch(isLoading(API_SUCCESS))

        dispatch(onBack())
    })
.catch((error) => {
      dispatch(changeAddingPointService(API_FAILED))
      dispatch(isLoading(API_FAILED))
      dispatch(onBack())
    })
  }
}



export function deleteServiceArea(id) {
  return (dispatch, getState) => {
    const {serviceProviderId} = getState().authState.userState

    dispatch(isLoading(API_FETCHING))

    Delete(`${API.deleteServiceArea + serviceProviderId}/${id}`)
      .then((resp) => {
        dispatch(isLoading(API_SUCCESS))

        dispatch(getPointService())
        dispatch(getProfilePercentage())
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED))

      })
  }
}
