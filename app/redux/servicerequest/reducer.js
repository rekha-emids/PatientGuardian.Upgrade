import { combineReducers } from 'redux';
import requirementsState from './Requirements/reducer';
import schedulepreferencesState from './SchedulePreferences/reducer';
import reviewState from './Review/reducer';

export const servicerequestState = combineReducers({
    requirementsState,
    schedulepreferencesState,
    reviewState
});
