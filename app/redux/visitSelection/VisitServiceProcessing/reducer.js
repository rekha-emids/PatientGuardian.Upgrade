import { combineReducers } from 'redux';
import PerformTasksState from './PerformTasks/reducer';
import FeedbackState from './Feedback/reducer';
import SummaryState from './Summary/reducer';
export const VisitServiceProcessingState = combineReducers({
    PerformTasksState,
    FeedbackState,
    SummaryState
});
