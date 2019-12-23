import {
    manageConnection
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';


const defaultState = {
    connections: [],
    manageConnection: [],
    impersonatedManageConnections: {},
    isLoadingManageConnection: API_INITIAL
},

 manageConnectionDataState = (state = defaultState, action) => {
    let impersonatedManageConnections = {}

    switch (action.type) {
        case manageConnection.getAllConnections:
            return state;
        case manageConnection.getPatientGuardianList:
            let details = {manageConnection: action.data.data}
            let updatedManageConnectionData = details

            if (Number(action.data.id) !== Number(global.currentUserPatientId)){
                updatedManageConnectionData = {
                    impersonatedManageConnections: {
                        ...state.impersonatedManageConnections,
                        [action.data.id]: {
                            ...state.impersonatedManageConnections[action.data.id],
                            ...details
                        }
                    }
                }
            }
             return {
                ...state,
                ...updatedManageConnectionData
            }
        case manageConnection.loadingStatus:
            return {
                ...state,
                isLoadingManageConnection: action.data
            }
        default:
            return state;
    }
}

export default manageConnectionDataState;
