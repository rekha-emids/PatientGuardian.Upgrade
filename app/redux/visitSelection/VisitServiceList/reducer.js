import {
    VisitServiceList
} from './actions'
import { API_INITIAL, API_SUCCESS } from '../../../constants/AppAPIConstants';

const defaultState = {
    visitServiceList: [],
    getServiceRequestsStatus: API_INITIAL
},

 VisitServiceListState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitServiceList.getVisitServiceListSuccess:
            return {
                ...state,
                visitServiceList: action.data,
                getServiceRequestsStatus: API_SUCCESS
            };
        case VisitServiceList.seviceProvidersClick:
            return {...state};
        case VisitServiceList.profileClick:
            return {...state};
        case VisitServiceList.newServiceRequestClick:
            return {...state};
        case VisitServiceList.changeStatus:
            return {
                ...state,
                getServiceRequestsStatus: action.data
            }
        default:
            return state;
    }
}

export default VisitServiceListState;