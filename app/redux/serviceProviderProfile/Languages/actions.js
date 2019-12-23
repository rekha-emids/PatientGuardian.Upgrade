import { API, spURL } from '../../../services/api';
import {Get} from '../../../services/http';
import {API_FETCHING, API_SUCCESS, API_FAILED} from '../../../constants/AppAPIConstants';
import { storeSpSelectedLanguages, getOfflineSpSelectedLanguages } from '../../../offline/SPProfile/SpSelectedLanguages';
import { NETWORK_ERROR } from '../../../constants/error';

export const Languages = {
    getSelectedLanguageDetails: 'get_selected_language_details/spLanguages',
    changeAPIStatus: "changeAPIStatus/spLanguages",
    clearLanguagesState: 'clearLanguagesState/spLanguages'
};

export const clearLanguagesState = () => ({type: Languages.clearLanguagesState})

export const changeAPIStatus = (data) => ({
      type: Languages.changeAPIStatus,
      data
    })

export const getSelectedLanguageDetails = (data) => ({
        type: Languages.getSelectedLanguageDetails,
        data
    })

export function getSelectedLanguages(spId, onApiSuccess, onApiFailure) {
    return (dispatch) => {
        dispatch(changeAPIStatus(API_FETCHING))
        Get(`${API.spLanguages + spId}/Language`, spURL).then((resp) => {
            __DEV__ && console.log("resp for lang: ", resp.data)
            storeSpSelectedLanguages(resp.data).then((res) => {
                onApiSuccess && onApiSuccess()
            })
.catch((err) => {
                onApiFailure && onApiFailure()
            })
            dispatch(getSelectedLanguageDetails(resp.data))
            dispatch(changeAPIStatus(API_SUCCESS))
        })
.catch((err) => {
            if (err.message === NETWORK_ERROR){
                getOfflineSpSelectedLanguages(spId).then((res) => {
                    dispatch(getSelectedLanguageDetails(res))
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