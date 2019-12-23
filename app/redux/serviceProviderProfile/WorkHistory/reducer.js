import {
    WorkHistory
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    workhistoryList: [],
    getWorkHistoryStatus: API_INITIAL
},

 WorkHistoryState = (state = defaultState, action) => {
    switch (action.type) {
        case WorkHistory.getWorkhistorySuccess:
            return {
                ...state,
                workhistoryList: action.data
            };

        case WorkHistory.changeAPIStatus:
            return {
              ...state,
              getWorkHistoryStatus: action.data
            }
        case WorkHistory.clearWorkHistoryState:
            return defaultState;

        default:
            return state;
    }
}

export default WorkHistoryState;
