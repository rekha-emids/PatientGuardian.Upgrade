import {
    SetPassword
} from './actions'

const defaultState = {
    userId: null,
    emailId: '',
    token: '',
    patientId: null,
    setPasswordSuccess: false,
    setPasswordError: false,
    getEmailIdSuccess: false,
    getEmailIdError: false,
    setPasswordStatus: ''
},

 setPasswordState = (state = defaultState, action) => {
    switch (action.type) {
        case SetPassword.setPasswordSuccess:
            return {
                ...state,
                setPasswordSuccess: true,
                setPasswordError: false,
                userId: action.data
            };
        case SetPassword.setPasswordError:
            return {
                ...state,
                setPasswordStatus: 'Invalid',
                setPasswordSuccess: false,
                setPasswordError: true
            };
        case SetPassword.getEmailIdSuccess:
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
        case SetPassword.getEmailIdError:
            return {
                ...state,
                emailId: '',
                token: '',
                userId: null,
                setPasswordStatus: action.data.existResult,
                getEmailIdSuccess: false,
                getEmailIdError: true
            };
        case SetPassword.cancelClick:
            return defaultState;
        case SetPassword.clearState:
            return defaultState;
        
        case SetPassword.setUserInfo:
            return {
                ...state,
                emailId: action.data.emailId,
                userId: action.data.userId
            }
        default:
            return state;
    }
}

export default setPasswordState;
