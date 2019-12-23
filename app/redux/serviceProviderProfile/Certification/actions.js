import { API } from '../../../services/api';
import { Get, spURL} from '../../../services/http';
import {API_FETCHING, API_SUCCESS, API_FAILED} from '../../../constants/AppAPIConstants';
import { storeSpCertification, getOfflineSpCertifications } from '../../../offline/SPProfile/SpCertifications';
import { NETWORK_ERROR } from '../../../constants/error';

export const Certification = {
    getCertificationSuccess: 'get_certification_success/spCertification',
    changeAPIStatus: "changeAPIStatus/spCertification",
    clearCertificationState: 'clearCertificationState/spCertification'
};

export const clearCertificationState = () => ({type: Certification.clearCertificationState})

export const getCertificationSuccess = (data) => ({
        type: Certification.getCertificationSuccess,
        data
    })

export const changeAPIStatus = (data) => ({
      type: Certification.changeAPIStatus,
      data
    })

export function getCertification(spId, onApiSuccess, onApiFailure) {
    return (dispatch) => {
        dispatch(changeAPIStatus(API_FETCHING))
        Get(`${API.certification + spId}/Certification`, spURL).then((resp) => {
            __DEV__ && console.log("resp for certification: ", resp)
            storeSpCertification(spId, resp.data).then((res) => {
                onApiSuccess && onApiSuccess()
            })
.catch((err) => {
                onApiFailure && onApiFailure()
            })
            dispatch(getCertificationSuccess(resp.data))
            dispatch(changeAPIStatus(API_SUCCESS))
        })
.catch((err) => {
            if (err.message === NETWORK_ERROR){
                getOfflineSpCertifications(spId).then((res) => {
                    dispatch(getCertificationSuccess(res))
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
