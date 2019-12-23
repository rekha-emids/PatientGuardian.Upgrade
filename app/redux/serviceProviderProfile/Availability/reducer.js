import { AvailabilityActions } from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    availableDays: {},
    getAvailabilityStatus: API_INITIAL,
    blackoutDays: []
},

 AvailabilityState = (state = defaultState, action) => {
    switch (action.type) {
        case AvailabilityActions.setAvailabilityDays:
            return {
                ...state,
                availableDays: action.data
            }
        case AvailabilityActions.changeAPIStatus:
            return {
              ...state,
              getAvailabilityStatus: action.data
            }
        case AvailabilityActions.setBlackoutDays:
            return {
                ...state,
                blackoutDays: action.data
            }
        case AvailabilityActions.clearAvailabilityState:
            return defaultState;
        default:
            return state;
    }
};

export default AvailabilityState;
