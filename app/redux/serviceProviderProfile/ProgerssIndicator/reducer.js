import {
    ProgressIndicator
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    profilePercentage: '',
    getProfilePercentageStatus: API_INITIAL
},

 progressIndicatorState = (state = defaultState, action) => {
    switch (action.type) {
        case ProgressIndicator.getProfilePercentageSuccess:
            return {
                ...state,
                profilePercentage: action.data
            };
        case ProgressIndicator.changeAPIStatus:
            return {
              ...state,
              getProfilePercentageStatus: action.data
            }
        case ProgressIndicator.clearProgressIndicatorState:
            return defaultState;
        default:
            return state;
    }
}

export default progressIndicatorState;