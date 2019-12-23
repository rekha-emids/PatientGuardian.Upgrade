import {
    Languages
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    selectedLanguagesList: [],
    getLanguageStatus: API_INITIAL
},

 LanguagesState = (state = defaultState, action) => {
    switch (action.type) {
        case Languages.getSelectedLanguageDetails:
            return {
                ...state,
                selectedLanguagesList: action.data.languages
            }; 
        case Languages.changeAPIStatus:
            return {
              ...state,
              getLanguageStatus: action.data
            }   
        case Languages.clearLanguagesState:
            return defaultState;
        default:
            return state;
    }
}

export default LanguagesState;
