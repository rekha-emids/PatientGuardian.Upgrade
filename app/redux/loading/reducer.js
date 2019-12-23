import {
    Loading
} from './actions'

const defaultState = {isLoading: false},

 loadingState = (state = defaultState, action) => {
    switch (action.type) {
        case Loading.loadingStart:
            return {
                ...state,
                isLoading: true
            };
        case Loading.loadingEnd:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}

export default loadingState;
