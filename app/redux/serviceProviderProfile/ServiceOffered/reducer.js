import {
    ServiceOffered
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    serviceOfferedList: [],
    getServicesOfferedStatus: API_INITIAL
},

 serviceOfferedState = (state = defaultState, action) => {
    switch (action.type) {
        case ServiceOffered.getServicesOfferedSuccess:
            return {
                ...state,
                serviceOfferedList: action.data
            };
        case ServiceOffered.changeAPIStatus:
            return {
              ...state,
              getServicesOfferedStatus: action.data
            }
        case ServiceOffered.clearServiceOfferedState:
            return defaultState;
        default:
            return state;
    }
}

export default serviceOfferedState;
