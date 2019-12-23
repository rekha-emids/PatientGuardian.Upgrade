import {
    PerformTasks
} from './actions'
import { API_INITIAL, API_SUCCESS } from '../../../../constants/AppAPIConstants';

const defaultState = {
    PerformTasksList: null,
    getPerformTasksStatus: API_INITIAL
},

 PerformTasksState = (state = defaultState, action) => {
    switch (action.type) {

        case PerformTasks.getPerformTasksListSuccess:
            return {
                ...state,
                PerformTasksList: action.data,
                getPerformTasksStatus: API_SUCCESS
            };
        case PerformTasks.resetPerformTasksState:
            return defaultState

        default:
            return state;
    }
}

export default PerformTasksState;
