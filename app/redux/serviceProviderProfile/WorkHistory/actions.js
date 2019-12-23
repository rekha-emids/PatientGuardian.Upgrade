import { API, spURL } from '../../../services/api';
import {Get} from '../../../services/http';
import {API_FETCHING, API_SUCCESS, API_FAILED} from '../../../constants/AppAPIConstants';
import { storeSpWorkHistory, getOfflineSpWorkHistory } from '../../../offline/SPProfile/SpWorkHistory';
import { NETWORK_ERROR } from '../../../constants/error';

export const WorkHistory = {
    getWorkhistorySuccess: 'get_workhistory_success/spWorkhistory',
    changeAPIStatus: "changeAPIStatus/spWorkhistory",
    clearWorkHistoryState: 'clearWorkHistoryState/spWorkhistory'
};

export const clearWorkHistoryState = () => ({type: WorkHistory.clearWorkHistoryState})

export const getWorkhistorySuccess = (data) => ({
        type: WorkHistory.getWorkhistorySuccess,
        data
    })

export const changeAPIStatus = (data) => ({
      type: WorkHistory.changeAPIStatus,
      data
    })

export function getWorkHistory(spId, onApiSuccess, onApiFailure) {
    return (dispatch) => {
        dispatch(changeAPIStatus(API_FETCHING))
        Get(`${API.WorkHistory}${spId}/WorkHistory`, spURL).then((resp) => {
            __DEV__ && console.log("resp for workHistory: ", resp.data);
            storeSpWorkHistory(spId, resp.data).then((res) => {
                onApiSuccess && onApiSuccess()
            })
.catch((err) => {
                onApiFailure && onApiFailure()
            })
            dispatch(getWorkhistorySuccess(resp.data))
            dispatch(changeAPIStatus(API_SUCCESS))
        })
.catch((err) => {
            if (err.message === NETWORK_ERROR){
                getOfflineSpWorkHistory(spId).then((res) => {
                    dispatch(getWorkhistorySuccess(res))
                    dispatch(changeAPIStatus(API_SUCCESS))
                })
.catch((err) => {
                    dispatch(changeAPIStatus(API_FAILED))
                })
            } else {
                onApiFailure && onApiFailure()
                dispatch(changeAPIStatus(API_FAILED))
            }
            
        })
    }
}
