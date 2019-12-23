import { UserAgreement } from './actions'
import { API_INITIAL, API_SUCCESS } from '../../../constants/AppAPIConstants';

const defaultState = {
    isEulaUpdated: false,
    eulaContent: '',
    emailId: '',
    getEulaContentStatus: API_INITIAL,
    introVideoUrl: '',
    isVideoPlayed: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case UserAgreement.getUserInfoSuccess:
            return {
                ...state,
                isEulaUpdated: action.data.IsEulaUpdated === 'False',
                emailId: action.data.sub
            };
        case UserAgreement.getEulaContentSuccess:
            return {
                ...state,
                eulaContent: action.data.value,
                getEulaContentStatus: API_SUCCESS
            };
        case UserAgreement.updateEulaSuccess:
            return {
                ...state,
                isEulaUpdated: false
            };
        default:
            return state;
    }
}