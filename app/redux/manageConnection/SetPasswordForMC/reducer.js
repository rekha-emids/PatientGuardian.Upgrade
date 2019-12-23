import {
    SetPasswordForMC
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    userId: null,
    emailId: '',
    token: '',
    patientId: null,
    setPasswordSuccess: false,
    setPasswordError: false,
    getEmailIdSuccess: false,
    getEmailIdError: false,
    setPasswordStatus: '',
    isLoadingSetpassword: API_INITIAL
},

 setPasswordForMCState = (state = defaultState, action) => {
    switch (action.type) {
        case SetPasswordForMC.setPasswordSuccess:
            return {
                ...state,
                setPasswordSuccess: true,
                setPasswordError: false,
                userId: action.data
            };
        case SetPasswordForMC.setPasswordError:
            return {
                ...state,
                setPasswordStatus: 'Invalid',
                setPasswordSuccess: false,
                setPasswordError: true
            };
        case SetPasswordForMC.getEmailIdSuccess:
            return {
                ...state,
                emailId: action.data.userName,
                token: action.data.token,
                userId: action.data.userId,
                patientId: action.data.patientId,
                setPasswordStatus: action.data.existResult,
                getEmailIdSuccess: true,
                getEmailIdError: false
            };
        case SetPasswordForMC.getEmailIdError:
            return {
                ...state,
                emailId: '',
                token: '',
                userId: null,
                setPasswordStatus: action.data.existResult,
                getEmailIdSuccess: false,
                getEmailIdError: true
            };
        case SetPasswordForMC.cancelClick:
            return defaultState;
        case SetPasswordForMC.clearState:
            return defaultState;
        case SetPasswordForMC.loadingStatus:
            return {
                ...state,
                isLoadingSetpassword: action.data
            }
        default:
            return state;
    }
}

export default setPasswordForMCState;
