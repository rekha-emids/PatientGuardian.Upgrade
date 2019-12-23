import {
    VisitServiceDetails
} from './actions'
import { API_INITIAL, API_SUCCESS } from '../../../constants/AppAPIConstants';

export const defaultState = {
    VisitServiceDetails: null,
    VisitServiceSchedule: null,
    getServiceDetailsStatus: API_INITIAL,
    getServiceScheduleStatus: API_INITIAL,
    firstAndLastVisitDates: {},
    serviceProviderId: 0

};

 VisitServiceDetailsState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitServiceDetails && VisitServiceDetails.getVisitServiceDetailsSuccess:
            return {
                ...state,
                VisitServiceDetails: action.data,
                getServiceDetailsStatus: API_SUCCESS,
                serviceProviderId: action.data && action.data.serviceProviderId ? action.data.serviceProviderId : state.serviceProviderId
            };

        case VisitServiceDetails && VisitServiceDetails.getVisitServiceScheduleSuccess:
            return {
                ...state,
                VisitServiceSchedule: action.data,
                getServiceScheduleStatus: API_SUCCESS
            };
        case VisitServiceDetails && VisitServiceDetails.changeAPIStatus:
            return {
                ...state,
                [action.data.key]: action.data.value
            }
        case VisitServiceDetails && VisitServiceDetails.resetVisitServiceDetails:
            return defaultState
        case VisitServiceDetails && VisitServiceDetails.firstAndLastVisitDatesSuccess:
            return {
                ...state,
                firstAndLastVisitDates: action.data
            }
        case VisitServiceDetails && VisitServiceDetails.setSPDetails:
                return {
                    ...state,
                    serviceProviderId: action.data
                }
        default:
            return state;
    }
}

export default VisitServiceDetailsState;
