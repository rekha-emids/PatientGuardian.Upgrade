import { LOGIN } from './actions';

const defaultState = {
    userData: {},
    error: {
        message: '',
        code: ''
    },
    isFailed: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN.success:
            return {
                ...state,
                userData: action.data.userData,
                isFailed: false
            };

        case LOGIN.failed:
            return {
                ...state,
                error: {
                    message: action.data || '',
                    code: ''
                },
                isFailed: true
            };
        case LOGIN.clearData:
            return defaultState;
        case LOGIN.clearFailFlag:
            return {
                ...state,
                isFailed: false
            };
        default:
            return state;
    }
}