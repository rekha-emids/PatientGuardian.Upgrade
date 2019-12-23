import { ON_SAVE_DEVICE_INFO } from './actions';

const defaultState = {};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ON_SAVE_DEVICE_INFO:
            return {
                ...state,
                ...action.deviceInfo
            };
            default:
			return state;
    }
};
