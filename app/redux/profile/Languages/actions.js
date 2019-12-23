import { API } from '../../../services/api';
import {  endLoading } from '../../loading/actions';
import { Get, Post } from '../../../services/http';
import { getArrayFromNormalizedData } from '../../../utils/appUtils'
import { storeSelectedLanguages, getOfflineSelectedLanguages } from '../../../offline/Profile/Languages/SelectedLanguages';
import { NETWORK_ERROR } from '../../../constants/error';
import { USER_TYPES } from '../../../constants/constants';
import { getProfilePercentage } from '../PersonalDetail/actions';
import { isEmpty } from '../../../utils/EmptyObjCheck';
import { onBack } from '../../navigation/actions';
import { API_FETCHING, API_SUCCESS, API_FAILED } from '../../../constants/AppAPIConstants';


export const Languages = {
    getLanguagesSuccess: 'get_languages_success/languages',
    getSelectedLanguageDetails: 'get_selected_language_details/languages',
    addLanguages: 'add_languages/langugaes',
    resetUpdatedLanguages: 'reset_updated_languages/languages',
    loadingStatus: 'languages/isLoading'
};

export const isLoading = (data) => ({
        type: Languages.loadingStatus,
        data
    })

export const getLanguagesSuccess = (data) => ({
        type: Languages.getLanguagesSuccess,
        data
    })

export const getSelectedLanguageDetails = (data) => ({
        type: Languages.getSelectedLanguageDetails,
        data
    })

export const addLanguages = (data, params) => ({
        type: Languages.addLanguages,
        data: {
            data,
            params
        }
    })

export const resetUpdatedLanguages = (data) => ({
        type: Languages.resetUpdatedLanguages,
        data
    })

export function getLanguages() {
    return (dispatch) => {
        Get(API.getLanguages).then((resp) => {
            dispatch(getLanguagesSuccess(resp.data))
        })
.catch(() => {
        })
    }
}

export function updateLanguages(onSuccess, params) {
    return (dispatch, getState) => {
        let { updatedLanguagesList } = getState().profileState.LanguagesState,
         {patientId} = getState().authState.userState,
         languages = getArrayFromNormalizedData(updatedLanguagesList)

        if (params && params.id !== global.currentUserPatientId){
            patientId = params.id,
            languages = getArrayFromNormalizedData(getState().profileState.LanguagesState.impersonatedLanguages[params.id].updatedLanguagesList)
        }
        let modal = {
            patientId,
            languages
        };

        dispatch(isLoading(API_FETCHING))
        Post(`${API.addLanguages + patientId}/Language`, modal).then((resp) => {
            dispatch(getSelectedLanguages());
            dispatch(onBack())
            dispatch(getProfilePercentage());
            dispatch(isLoading(API_SUCCESS))

        })
.catch((err) => {
            dispatch(isLoading(API_FAILED))

        })
    }
}

export function getSelectedLanguages(params, onApiSuccess, onFailure) {
    return (dispatch, getState) => {
        if (isEmpty(params)) {
            let {userState} = getState().authState;

            if (userState.userType === USER_TYPES.GUARDIAN) {
                dispatch(getSelectedLanguagesGuardian(userState.userId, onApiSuccess, onFailure));
            } else {
                dispatch(getSelectedLanguagesIndividual(userState.patientId, onApiSuccess, onFailure));
            }
        } else if (params.userType === USER_TYPES.GUARDIAN) {
                dispatch(getSelectedLanguagesGuardian(params.id, onApiSuccess, onFailure));
            } else {
                dispatch(getSelectedLanguagesIndividual(params.id, onApiSuccess, onFailure));
            }
    }
}

export function getSelectedLanguagesIndividual(patientId, onApiSuccess, onFailure) {
    return (dispatch) => {
        Get(`${API.addLanguages + patientId}/Languages`).then((resp) => {
            storeSelectedLanguages(resp.data, patientId).then((res) => {
                onApiSuccess && onApiSuccess()
            })
.catch((err) => {
                onFailure && onFailure(err)
            })
            dispatch(getSelectedLanguageDetails({data: resp.data, id: patientId}))
        })
.catch((err) => {
            if (err.message === NETWORK_ERROR) {
                getOfflineSelectedLanguages(patientId).then((res) => {
                    dispatch(getSelectedLanguageDetails({data: res, id: patientId}))
                    dispatch(endLoading());
                })
.catch((err) => {
                    dispatch(endLoading());
                })
            } else {
                onFailure && onFailure(err)
                dispatch(endLoading());
            }
        })
    }
}

export function getSelectedLanguagesGuardian(userId, onApiSuccess, onFailure) {
    return (dispatch) => {
        Get(`${API.getLanguagesGuardian + userId}/UserLanguages`).then((resp) => {

            storeSelectedLanguages(resp.data, userId).then((res) => {
                onApiSuccess && onApiSuccess()
            })
.catch((err) => {
                onFailure && onFailure(err)
            })
            dispatch(getSelectedLanguageDetails({data: resp.data, id: userId}))
        })
.catch((err) => {
            if (err.message === NETWORK_ERROR) {
                getOfflineSelectedLanguages(userId).then((res) => {
                    dispatch(getSelectedLanguageDetails({data: res, id: userId}))
                    dispatch(endLoading());
                })
.catch((err) => {
                    dispatch(endLoading());
                })
            } else {
                onFailure && onFailure(err)
                dispatch(endLoading());
            }
        })
    }
}