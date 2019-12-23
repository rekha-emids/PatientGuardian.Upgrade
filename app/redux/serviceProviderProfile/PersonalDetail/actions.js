import { API } from '../../../services/api';
import {SpGet} from '../../../services/http'
import {STATUS} from './reducer';
import { API_FAILED, API_FETCHING, API_SUCCESS } from '../../../constants/AppAPIConstants';
import { NETWORK_ERROR } from '../../../constants/error';
import { storeSpPersonalData, getOfflineSpPersonalData } from '../../../offline/SPProfile/SpPersonalDetails';
import { storeSpProfileImage, getOfflineSpImage } from '../../../offline/SPProfile/SpImage';
import { showSyncServerModal } from '../../syncToServer/actions';
import { isEmpty } from '../../../utils/EmptyObjCheck';

export const PersonalDetails = {
  GET_PERSONAL_DETAIL_SUCCESS: 'get_personal_details/spPersonalDetails',
  UPLOAD_IMG_SUCCESS: 'upload_image_success/spPersonalDetails',
  changeAPIStatus: "changeAPIStatus/spPersonalDetails",
  clearPersonalDetailsState: 'clearPersonalDetailsState/spPersonalDetails'
}

export const clearPersonalDetailsState = () => ({type: PersonalDetails.clearPersonalDetailsState})

export const getPersonalDetailSuccess = (data) => ({
    type: PersonalDetails.GET_PERSONAL_DETAIL_SUCCESS,
    data
  })

export const uploadImgSuccess = (data) => ({
    type: PersonalDetails.UPLOAD_IMG_SUCCESS,
    data
  })

export const changeAPIStatus = (data) => ({
    type: PersonalDetails.changeAPIStatus,
    data
  })

export function getImage (spId, onApiSuccess, onFailure) {
  return (dispatch) => {
    dispatch(changeAPIStatus({key: STATUS.getImageStatus, status: API_FETCHING}))
    SpGet(API.getSPImage + spId)
      .then((resp) => {
        __DEV__ && console.log("resp for SpImage: ", resp.data)
        storeSpProfileImage(resp.data).then((res) => {
          onApiSuccess && onApiSuccess()
        })
.catch((err) => {
          onFailure && onFailure();
        })
        dispatch(uploadImgSuccess(resp.data))
        dispatch(changeAPIStatus({key: STATUS.getImageStatus, status: API_SUCCESS}))
      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR){
          getOfflineSpImage(spId).then((res) => {
            dispatch(uploadImgSuccess(res))
            dispatch(changeAPIStatus({key: STATUS.getImageStatus, status: API_SUCCESS}))
          })
.catch((err) => {
            dispatch(changeAPIStatus({key: STATUS.getImageStatus, status: API_FAILED}))  
            throw err;
          })
        } else {
          onFailure && onFailure();
          dispatch(changeAPIStatus({key: STATUS.getImageStatus, status: API_FAILED}))  
        }
      })
  }
}

export function getPersonalDetail (spId, onApiSuccess, onApiFailure) {
  return (dispatch) => {
    dispatch(changeAPIStatus({key: STATUS.getPersonalDetailStatus, status: API_FETCHING}))
    SpGet(`${API.getSPPersonalDetail + spId}/ProfileView`)
      .then((resp) => {
        __DEV__ && console.log("resp for personalDetail: ", resp.data)
        storeSpPersonalData(resp.data).then((res) => {
          onApiSuccess && onApiSuccess();
        })
.catch((err) => {
          __DEV__ && console.log("ERROR FOR STORE SP PD: ", err)
          onApiFailure && onApiFailure(err);
          throw err;
        })
        dispatch(getPersonalDetailSuccess(resp.data))
        dispatch(changeAPIStatus({key: STATUS.getPersonalDetailStatus, status: API_SUCCESS}))
      })
      .catch((err) => {
        if (err.message === NETWORK_ERROR){
          getOfflineSpPersonalData(spId).then((res) => {
            __DEV__ && console.log("res for pd: ", res)
            if (!res || isEmpty(res)){
              dispatch(showSyncServerModal(true))
            }
            dispatch(getPersonalDetailSuccess(res))
            dispatch(changeAPIStatus({key: STATUS.getPersonalDetailStatus, status: API_SUCCESS}))
          })
.catch((err) => {
              dispatch(changeAPIStatus({key: STATUS.getPersonalDetailStatus, status: API_FAILED})) 
          })
        } else {
          onApiFailure && onApiFailure();
          dispatch(changeAPIStatus({key: STATUS.getPersonalDetailStatus, status: API_FAILED})) 
        }
      })
  }
}
