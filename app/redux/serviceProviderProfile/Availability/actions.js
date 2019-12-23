import { API } from '../../../services/api';
import {SpGet} from '../../../services/http';
import {API_FETCHING, API_SUCCESS, API_FAILED} from '../../../constants/AppAPIConstants';
import { storeSpAvailableDays, getOfflineSpAvailableDays } from '../../../offline/SPProfile/SpAvailableDays';
import { NETWORK_ERROR } from '../../../constants/error';
import { storeSpBlockOutDays, getOfflineSpBlockoutDays } from '../../../offline/SPProfile/SpBlockOutDays';

export const AvailabilityActions = {
   setAvailabilityDays: 'set_available_days/spAvailability',
   setBlackoutDays: 'set_blackout_days/spBlackout',
   changeAPIStatus: "changeAPIStatus/spAvailability",
   clearAvailabilityState: 'clearAvailabilityState/spAvailability'
};

export const changeAPIStatus = (data) => ({
      type: AvailabilityActions.changeAPIStatus,
      data
    })

export const clearAvailabilityState = () => ({type: AvailabilityActions.clearAvailabilityState})

export const getAvailableDays = (spId, onApiSuccess, onApiFailure) => (dispatch) => {
        dispatch(changeAPIStatus(API_FETCHING))
        SpGet(`${API.getAvailableDays + spId}/Available`).then((resp) => {
            __DEV__ && console.log("resp for availableDays: ", resp.data)   
            storeSpAvailableDays(spId, resp.data).then((res) => {
                onApiSuccess && onApiSuccess();
            })
.catch((err) => {
                onApiFailure && onApiFailure();
            })
            dispatch(getAvailableDaysSuccess(resp.data[0]))
            dispatch(changeAPIStatus(API_SUCCESS))
        })
.catch((err) => {
            if (err.message === NETWORK_ERROR){
                getOfflineSpAvailableDays(spId).then((res) => {
                    dispatch(getAvailableDaysSuccess(res[0]))
                    dispatch(changeAPIStatus(API_SUCCESS))
                })
.catch((err) => {
                    dispatch(changeAPIStatus(API_FAILED))
                })
            } else {
                onApiFailure && onApiFailure();
                dispatch(changeAPIStatus(API_FAILED))
            }
        })
    }

export const getAvailableDaysSuccess = (data) => ({
        type: AvailabilityActions.setAvailabilityDays,
        data
    });

export const getBlackOutDays = (spId, onApiSuccess, onApiFailure) => (dispatch) => {
        dispatch(changeAPIStatus(API_FETCHING))
        SpGet(`${API.getBlackOutDays + spId}/BlockOutDay`).then((resp) => {  
            __DEV__ && console.log("resp for blockoutDay: ", resp.data) 
            storeSpBlockOutDays(spId, resp.data).then((res) => {
                onApiSuccess && onApiSuccess()
            })
.catch((err) => {
                onApiFailure && onApiFailure();
            })
            dispatch(getBlackOutDaysSuccess(resp.data))
            dispatch(changeAPIStatus(API_SUCCESS))
        })
.catch((err) => {
            if (err.message === NETWORK_ERROR){
                getOfflineSpBlockoutDays(spId).then((res) => {
                    __DEV__ && console.log("Res for BOD day: ", res)
                    dispatch(getBlackOutDaysSuccess(res))
                    dispatch(changeAPIStatus(API_SUCCESS))
                })
.catch((err) => {
                    dispatch(changeAPIStatus(API_FAILED))
                })
            } else {
                onApiFailure && onApiFailure();
                dispatch(changeAPIStatus(API_FAILED))
            }
        })
    }

export const getBlackOutDaysSuccess = (data) => ({
        type: AvailabilityActions.setBlackoutDays,
        data
    });