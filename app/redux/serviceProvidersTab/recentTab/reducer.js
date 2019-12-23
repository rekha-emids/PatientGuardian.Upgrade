import {
    Recent
} from './actions'
import { API_INITIAL, API_SUCCESS } from '../../../constants/AppAPIConstants';

const defaultState = {
   serviceProviders: [],
   getRecentSpStatus: API_INITIAL
},

 recentState = (state = defaultState, action) => {
    switch (action.type) {
        case Recent.getRecentServiceProviderSuccess:
            return {
                ...state,
                serviceProviders: action.data,
                getRecentSpStatus: API_SUCCESS
            }
        case Recent.changeAPIStatus:
            return {
                ...state,
                [action.data.key]: action.data.status
            }
        default:
            return state;
    }
}

export default recentState;
