import { combineReducers } from 'redux';
import dashboardState from './Dashboard/reducer';

export const careTeamState = combineReducers({dashboardState});