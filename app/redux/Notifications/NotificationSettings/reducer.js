import {
    NotificationSettings
} from './actions'

const defaultState = {
    pushNotification: [],
    emailNotification: [],
    lastSyncedDate: ''
};

 NotificationSettingsState = (state = defaultState, action) => {
    switch (action.type) {

        case NotificationSettings.getVisitNotificationSettingsSuccess:

            return {
                ...state,
                pushNotification: action.data.pushNotification,
                emailNotification: action.data.emailNotification
            };
        case NotificationSettings.updateVisitNotificationSettingsSuccess:
            return {...state};
        case NotificationSettings.updateNotificationState:
            return {
                ...state,
                pushNotification: action.updatedNotificationList
            }
        case NotificationSettings.updateEmailState:
            return {
                ...state,
                emailNotification: action.updatedEmailList
            }
        case NotificationSettings.updateLastSyncedDate: 
            return {
                ...state,
                lastSyncedDate: action.lastSyncedDate
            }
        case NotificationSettings.updateLastSyncedDate: 
            return {
                ...state,
                lastSyncedDate: action.lastSyncedDate
            }
        default:
            return state;
    }
}

export default NotificationSettingsState;
