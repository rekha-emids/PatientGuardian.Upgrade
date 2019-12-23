import {
    Languages
} from './actions'


import {normalizeData} from '../../../utils/appUtils'
import _ from 'lodash'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    LanguagesList: [],
    selectedLanguagesList: [],
    updatedLanguagesList: {},
    serviceProviderId: -1,
    impersonatedLanguages: {},
    isLoading: API_INITIAL
},

 LanguagesState = (state = defaultState, action) => {
    let impersonatedLanguages = {}

    switch (action.type) {
        case Languages.getLanguagesSuccess:
            return {
                ...state,
                LanguagesList: action.data
            }; 

        case Languages.getSelectedLanguageDetails:
        let details = {
            selectedLanguagesList: action.data.data.languages,
            updatedLanguagesList: normalizeData(action.data.data.languages, "id")
        }
        let updatedLanguages = details

            if (Number(action.data.id) !== Number(global.currentUserPatientId)){
                updatedLanguages = {
                impersonatedLanguages: {
                    ...state.impersonatedLanguages,
                    [action.data.id]: {
                    ...state.impersonatedLanguages[action.data.id],
                    ...details
                    }
                    }
                }
            }
            return {
                ...state,
               ...updatedLanguages
            }; 
            case Languages.addLanguages:
            const {params} = action.data
            let languages = {...state.updatedLanguagesList};

            if (params.id !== global.currentUserPatientId){
                languages = {...state.impersonatedLanguages[params.id].updatedLanguagesList}
            }
            if (_.isNil(languages[action.data.data.id])) {
                languages = {
                    ...languages,
                    [action.data.data.id]: action.data.data
                }
            } else {
                delete languages[action.data.data.id]
            }
            let updatedDetails = {updatedLanguagesList: languages}

            if (params.id !== global.currentUserPatientId){
                updatedDetails = {
                    impersonatedLanguages: {
                        [params.id]: {
                            ...state.impersonatedLanguages[params.id],
                            updatedLanguagesList: languages
                        }
                    }
                }
            }
            return {
                ...state,
                ...updatedDetails
            }
            case Languages.resetUpdatedLanguages:
                return {
                    ...state,
                    updatedLanguagesList: action.data
                }

            case Languages.loadingStatus:
                return {
                    ...state,
                    isLoading: action.data
                }
        default:
            return state;
    }
}

export default LanguagesState;
