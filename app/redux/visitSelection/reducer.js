import { combineReducers } from 'redux';
import VisitServiceDetailsState from './VisitServiceDetails/reducer';
import { VisitServiceProcessingState } from '../visitSelection/VisitServiceProcessing/reducer';
import VisitServiceListState from './VisitServiceList/reducer';
export const visitSelectionState = combineReducers({
    VisitServiceListState,
    VisitServiceDetailsState,
    VisitServiceProcessingState
});
