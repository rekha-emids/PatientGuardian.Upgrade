import { APP_INIT, APP_READY } from './actions';

const defaultState = {
    appStatus: false,
    loading: true
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_INIT:
            return {
                ...state,
                appStatus: false
            };

        case APP_READY:
            return {
                ...state,
                appStatus: true
            };

        default:
            return state;
    }
};
