import { LOGOUT } from './actions';

const defaultState = {
    userData: {},
    loading: false,
    error: {
        message: '',
        code: ''
    }
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGOUT.start:
            return {
                ...state,
                loading: true
            };

        case LOGOUT.end:
            return {
                ...state,
                loading: false
            };

        case LOGOUT.success:
            return {
                ...state,
                userData: null
            };


        case LOGOUT.failed:
            return {
                ...state,
                error: {
                    message: '',
                    code: ''
                }
            };

        case LOGOUT.updateToken:
            return {
                ...state,
                deviceToken: action.data
            }


        default:
            return state;
    }
}
