import {
    Welcome
} from './actions'

const defaultState = {
    isLoading: '',
    canOnboard: false
},

 welcomeState = (state = defaultState, action) => {
    switch (action.type) {
        case Welcome.getStartedClick:
            return state;
        case Welcome.loginClick:
            return state;
        case Welcome.deepLinkClick:
            return {
                ...state,
                uid: action.data.uid,
                tokenkey: action.data.tokenkey,
                profiletype: action.data.profiletype
            };
        case Welcome.getCanOnboardFlagSuccess:
            return {
                ...state,
                canOnboard: action.data
            }
        default:
            return state;
    }
}

export default welcomeState;
