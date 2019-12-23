import {
    Review
} from './actions';
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    serviceRequestID: '',
    postServiceRequestStatus: API_INITIAL
},

 reviewState = (state = defaultState, action) => {
    switch (action.type) {
        case Review.nextClick:
        return {
            ...state,
            serviceRequestID: action.data
        }
        case Review.previousClick:
            return state;
        case Review.cancelClick:
            return defaultState;
        case Review.changeAPIStatus:
            return {
                ...state,
                postServiceRequestStatus: action.data
            }
        default:
            return state;
    }
}

export default reviewState;
