import { AuthGet, AuthPut } from '../../../services/http';
import { API } from '../../../services/api';
import {API_FETCHING, API_SUCCESS, API_FAILED} from '../../../constants/AppAPIConstants';
import { USER_TYPES } from '../../../constants/constants';


export const UserAgreement = {
    getUserInfoSuccess: 'getUserInfoSuccess/userAgreement',
    getEulaContentSuccess: 'getEulaContentSuccess/userAgreement',
    updateEulaSuccess: 'updateEulaSuccess/userAgreement',
    changeAPIStatus: "changeAPIStatus/userAgreement"
};

export const changeAPIStatus = (data) => ({
      type: UserAgreement.changeAPIStatus,
      data
    })



export const getUserInfoSuccess = (data) => ({
        type: UserAgreement.getUserInfoSuccess,
        data
    })

export const getEulaContentSuccess = (data) => ({
        type: UserAgreement.getEulaContentSuccess,
        data
    })

export const updateEulaSuccess = (data) => ({
        type: UserAgreement.updateEulaSuccess,
        data
    })


export function getUserInfo() { 
    return (dispatch, getState) => { 
        const {userType} = getState().authState && getState().authState.userState || {}

        dispatch(changeAPIStatus(API_FETCHING))
        AuthGet(API.getLoginInfo)          
          .then((resp) => {
            dispatch(getUserInfoSuccess(resp.data));
            userType !== USER_TYPES.CARE_TEAM && dispatch(getEulaContent());
            dispatch(changeAPIStatus(API_SUCCESS))
          })
          .catch((err) => {
            dispatch(changeAPIStatus(API_FAILED))
          })
      }
}

export function getEulaContent() { 
    return (dispatch) => {
        AuthGet(API.getEulaContent)          
          .then((resp) => {
            dispatch(getEulaContentSuccess(resp.data));
            dispatch(getUserInfoSuccess())
            dispatch(changeAPIStatus(API_SUCCESS))
          })
          .catch((err) => {

            dispatch(changeAPIStatus(API_FAILED))
          })
      }
}


export function updateEula() { 
    return (dispatch, getState) => { 
        let subject = getState().authState.userAgreementState.emailId;

        AuthPut(API.updateEula, {subject})          
          .then((resp) => {
            dispatch(updateEulaSuccess(resp.data));
          })
          .catch((err) => {
          })
      }
}
