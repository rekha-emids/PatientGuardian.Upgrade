import { API } from '../../../services/api';
import { Get, spURL } from '../../../services/http';
import {API_FETCHING, API_SUCCESS, API_FAILED} from '../../../constants/AppAPIConstants';
import { storeProfilePercentage, getOfflineSpProfilePercentage } from '../../../offline/SPProfile/SpProfilePercentage';
import { NETWORK_ERROR } from '../../../constants/error';

export const ProgressIndicator = {
    getProfilePercentageSuccess: 'get_profile_percentage_success/spProgressIndicator',
    changeAPIStatus: "changeAPIStatus/spProgressIndicator",
    clearProgressIndicatorState: 'clearProgressIndicatorState/spProgressIndicator'
};

export const clearProgressIndicatorState = () => ({type: ProgressIndicator.clearProgressIndicatorState})

export const changeAPIStatus = (data) => ({
      type: ProgressIndicator.changeAPIStatus,
      data
    })

export const getProfilePercentageSuccess = (data) => ({
        type: ProgressIndicator.getProfilePercentageSuccess,
        data
    })

export function getProfilePercentage(spId, onApiSuccess, onFailure) {
    return (dispatch) => {
        dispatch(changeAPIStatus(API_FETCHING))
        Get(API.getSPProfilePercentage + spId, spURL).then((resp) => {
            dispatch(getProfilePercentageSuccess(resp.data))
            storeProfilePercentage(spId, resp.data).then((res) => {
                onApiSuccess && onApiSuccess()
            })
.catch((err) => {
                onFailure && onFailure()
                throw err;
            })
            dispatch(changeAPIStatus(API_SUCCESS))
        })
.catch((err) => {
            if (err.message === NETWORK_ERROR){
                getOfflineSpProfilePercentage(spId).then((res) => {
                    dispatch(getProfilePercentageSuccess(res))
                    dispatch(changeAPIStatus(API_SUCCESS))
                })
.catch((err) => {
                    dispatch(changeAPIStatus(API_FAILED)) 
                })
            } else {
                onFailure && onFailure()
                dispatch(changeAPIStatus(API_FAILED))
            }
            
        })
    }
}