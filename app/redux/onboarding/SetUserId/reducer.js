import {
    SetUserId
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    sendVerificationLinkSuccess: false,
    sendVerificationLinkError: false,
    isLoadingUserId: API_INITIAL
},

 setUserIdState = (state = defaultState, action) => {
    switch (action.type) {
        case SetUserId.sendVerificationLinkSuccess:
            return {
                ...state,
                sendVerificationLinkSuccess: true,
                sendVerificationLinkError: false
            };
        case SetUserId.sendVerificationLinkError:
            return {
                ...state,
                sendVerificationLinkSuccess: false,
                sendVerificationLinkError: true
            };
        case SetUserId.formDirty:
            return defaultState;
        case SetUserId.previousClick:
            return defaultState;
        case SetUserId.cancelClick:
            return defaultState;
        case SetUserId.clearState:
            return defaultState;
        case SetUserId.loadingStatus:
            return {
                ...state,
                isLoadingUserId: action.data
            }
        default:
            return state;
    }
}

export default setUserIdState;
