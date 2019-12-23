import {
    SummaryDetails
} from './actions'
import { API_INITIAL } from '../../../../constants/AppAPIConstants';

const defaultState = {
    SummaryDetails: null,
    CalculationsData: {},
    actualTimeDiff: '',
    getSummaryDetailsStatus: API_INITIAL
},

 SummaryState = (state = defaultState, action) => {
    switch (action.type) {

        case SummaryDetails.getSummaryDetailsSuccess:
            return {
                ...state,
                SummaryDetails: action.data
            };

        case SummaryDetails.getCalculationsData:
            return {
                ...state,
                CalculationsData: action.data
            };
        case SummaryDetails.saveOriginalTimeDiff:
            return {
                ...state,
                originalTimeDiff: action.data.originalTimeDiff,
                actualTimeDiff: action.data.timediffms,
                hourlyRate: action.data.hourlyRate,
                taxPaid: action.data.taxPaid
            };
        case SummaryDetails.saveActualTimeDiff:
            return {
                ...state,
                actualTimeDiff: action.data
            }
        case SummaryDetails.changeAPIStatus:
            return {
                ...state,
                getSummaryDetailsStatus: action.data
            }
        default:
            return state;
    }
}

export default SummaryState;
