import { combineReducers } from 'redux';
import NotificationSettingsState from './NotificationSettings/reducer';
import NotificationListState from './NotificationList/reducer'

export const NotificationState = combineReducers({
    NotificationSettingsState,
    NotificationListState
});