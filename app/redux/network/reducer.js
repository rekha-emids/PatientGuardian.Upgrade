import { UPDATE_CONNECTIVITY } from '../../constants/constants';

const defaultState = {network: true};

export function networkReducer (state = defaultState, action) {
    switch (action.type) {
        case UPDATE_CONNECTIVITY:
            return {
                ...state,
                network: action.isConnected
            };
        default:
            return state;
    }
}
