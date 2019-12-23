import { API } from '../../../services/api';
import {spURL, Get} from '../../../services/http';
import {API_FETCHING, API_SUCCESS, API_FAILED} from '../../../constants/AppAPIConstants';
import { storeSpEducation, getOfflineSpEducation } from '../../../offline/SPProfile/SpEducation';
import { NETWORK_ERROR } from '../../../constants/error';

export const Education = {
    getEducationSuccess: 'get_education_success/spEducation',
    changeAPIStatus: "changeAPIStatus/spEducation",
    clearEducationState: 'clearEducationState/spEducation'
};

export const clearEducationState = () => ({type: Education.clearEducationState})

export const getEducationSuccess = (data) => ({
        type: Education.getEducationSuccess,
        data
    })

export const changeAPIStatus = (data) => ({
      type: Education.changeAPIStatus,
      data
    })

export function getEducation(spId, onApiSuccess, onApiFailure) {
    return (dispatch) => { 
        dispatch(changeAPIStatus(API_FETCHING))     
        Get(`${API.education + spId}/Education`, spURL).then((resp) => {
            __DEV__ && console.log("resp for education: ", resp.data)
            storeSpEducation(spId, resp.data).then((res) => {
                onApiSuccess && onApiSuccess()
            })
.catch((err) => {
                onApiFailure && onApiFailure()
            })
            dispatch(getEducationSuccess(resp.data))
            dispatch(changeAPIStatus(API_SUCCESS))
        })
.catch((err) => {
            if (err.message === NETWORK_ERROR){
                getOfflineSpEducation(spId).then((res) => {
                    dispatch(getEducationSuccess(res))
                    dispatch(changeAPIStatus(API_SUCCESS))
                })
.catch((err) => {
                    dispatch(changeAPIStatus(API_FAILED))
                })
            } else {
                dispatch(changeAPIStatus(API_FAILED))
            }
            
        })

    }
}
