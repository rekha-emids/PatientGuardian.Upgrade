import {
    AddGuardian
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    isInvitationSent: false,
    isInvitationSentError: false,
    relationship: [
        {
            id: 0,
            name: 'Select Plan'
        }
    ],
    firstName: '',
    lastName: '',
    isLoading: API_INITIAL
},

 addGuardianState = (state = defaultState, action) => {
    switch (action.type) {
        case AddGuardian.sendGuardianDetails:
            return {
                ...state,
                isInvitationSent: action.isSuccess,
                isInvitationSentError: !action.isSuccess,
                firstName: action.data.firstName,
                lastName: action.data.lastName
            };
        case AddGuardian.getRelationship:
            return {
                ...state,
                relationship: action.data
            };
        case AddGuardian.nextClick:
            return {...state};
        case AddGuardian.cancelClick:
            return defaultState;
        case AddGuardian.clearState:
            return defaultState;
        case AddGuardian.loadingStatus:
            return {
                ...state,
                isLoading: action.data
            }
        default:
            return state;
    }
}

export default addGuardianState;
