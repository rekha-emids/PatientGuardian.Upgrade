import {
    syncToServer
} from './actions'

const defaultState = {
    syncToServer: false,
    showSyncServerModal: false,
    isSyncComplete: null,
    isSyncSuccess: null
};

export function syncServerState(state = defaultState, action) {
    switch (action.type) {
        case syncToServer.setSync:
            return {
                ...state,
                syncToServer: action.data
            };

        case syncToServer.syncServerModal:
            return {
                ...state,
                showSyncServerModal: action.data
            }

        case syncToServer.syncComplete:
            return {
                ...state,
                isSyncComplete: action.data
            }
        case syncToServer.syncServerSuccess:
            return {
                ...state,
                isSyncSuccess: action.data
            }
        default:
            return state;
    }
}
