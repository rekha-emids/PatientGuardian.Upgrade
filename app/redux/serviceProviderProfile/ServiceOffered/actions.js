import { API } from '../../../services/api';
import {SpGet} from '../../../services/http';
import {API_FETCHING, API_SUCCESS, API_FAILED} from '../../../constants/AppAPIConstants';
import { NETWORK_ERROR } from '../../../constants/error';
import { storeSpServicesOffered, getOfflineSpServicesOffered } from '../../../offline/SPProfile/SpServicesOffered';

export const ServiceOffered = {
    getServicesOfferedSuccess: 'get_certification_success/spServiceoffered',
    changeAPIStatus: "changeAPIStatus/spServiceoffered",
    clearServiceOfferedState: 'clearServiceOfferedState/spServiceoffered'
};

export const clearServiceOfferedState = () => ({type: ServiceOffered.clearServiceOfferedState})

export const getServicesOfferedSuccess = (data) => ({
        type: ServiceOffered.getServicesOfferedSuccess,
        data
    })

export const changeAPIStatus = (data) => ({
      type: ServiceOffered.changeAPIStatus,
      data
    })

export function getServiceOffered(spId, onApiSuccess, onFailure) {
    return (dispatch) => {
        dispatch(changeAPIStatus(API_FETCHING))
        SpGet(`${API.getServiceOffered + spId}/Offer/Selected`).then((resp) => {
            __DEV__ && console.log("resp for services offered: ", resp.data)
            storeSpServicesOffered(spId, resp.data).then((res) => {
                onApiSuccess && onApiSuccess()
            })
.catch((err) => {
                onFailure && onFailure()
            })
            dispatch(getServicesOfferedSuccess(resp.data))
            dispatch(changeAPIStatus(API_SUCCESS))
        })
.catch((err) => {
            if (err.message === NETWORK_ERROR){
                getOfflineSpServicesOffered(spId).then((res) => {
                    dispatch(getServicesOfferedSuccess(res))
                    dispatch(changeAPIStatus(API_SUCCESS))
                })
.catch((err) => {
                    dispatch(changeAPIStatus(API_FAILED))
                })
            } else {
                onFailure && onFailure();
                dispatch(changeAPIStatus(API_FAILED))
            }
        })
    }
}
