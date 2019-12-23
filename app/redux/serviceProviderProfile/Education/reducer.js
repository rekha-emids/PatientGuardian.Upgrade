import {
    Education
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    educationList: [],
    getEducationStatus: API_INITIAL
},

 EducationState = (state = defaultState, action) => {
    switch (action.type) {

        case Education.getEducationSuccess:
            return {
                ...state,
                educationList: action.data
            };

        case Education.changeAPIStatus:
            return {
              ...state,
              getEducationStatus: action.data
            }

        case Education.clearEducationState:
            return defaultState;

        default:
            return state;
    }
}

export default EducationState;
