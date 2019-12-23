import {
    AddGuardianDetails
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
    isLoadingAddGuardian: API_INITIAL
},

 addGuardianDetailsState = (state = defaultState, action) => {
    switch (action.type) {
        case AddGuardianDetails.sendGuardianDetails:
            return {
                ...state,
                isInvitationSent: action.isSuccess,
                isInvitationSentError: !action.isSuccess,
                firstName: action.data.firstName,
                lastName: action.data.lastName
            };
        case AddGuardianDetails.getRelationship:
            return {
                ...state,
                relationship: action.data
            };
        case AddGuardianDetails.nextClick:
            return {...state};
        case AddGuardianDetails.cancelClick:
            return defaultState;
        case AddGuardianDetails.clearState:
            return defaultState;
        case AddGuardianDetails.loadingStatus:
            return {
                ...state,
                isLoadingAddGuardian: action.data
            }
        default:
            return state;
    }
}

export default addGuardianDetailsState;
