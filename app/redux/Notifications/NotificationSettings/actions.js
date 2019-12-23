import { API } from '../../../services/api';
import { Get, Post } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import {getUserInfo} from '../../../utils/userUtil'
import { getLastSyncedDateTime } from '../../../offline/SyncingDataWithServer/LastSyncedDate';

export const NotificationSettings = {
    getVisitNotificationSettingsSuccess: 'get_visit_notification_list_success/VisitNotificationSettings',
    updateVisitNotificationSettingsSuccess: 'update_visit_notification_list_success/VisitNotificationSettings',
    updateNotificationState: 'update_notification_state/VisitNotificationSettings',
    updateEmailState: 'update_email_state/VisitNotificationSettings',
    updateLastSyncedDate: 'updateLastSyncedDate'
};

export const getVisitNotificationSettingsSuccess = (data) => ({
        type: NotificationSettings.getVisitNotificationSettingsSuccess,
        data
    })

export const updateVisitNotificationSettingsSuccess = (data) => ({
        type: NotificationSettings.updateVisitNotificationSettingsSuccess,
        data
    })

export function getVisitNotificationSettings(updateNetworkOnResponse) {
    return (dispatch, getState) => {
        const network = getState().networkReducer && getState().networkReducer.network;
        const userId = getUserInfo() && getUserInfo().userId 

        dispatch(startLoading());
        Get(API.getNotificationSettings + userId).then((resp) => {
            if (!network){
                updateNetworkOnResponse && updateNetworkOnResponse(true)
            }
            dispatch(getVisitNotificationSettingsSuccess(resp.data))
            dispatch(endLoading());

        })
.catch((err) => {
            dispatch(endLoading());

        })
    }
}

export function updateVisitNotificationSettings(data) {
    return (dispatch, getState) => {
        const userId = getUserInfo() && getUserInfo().userId 

        dispatch(startLoading());
        Post(API.updateNotificationSettings + userId, data).then((resp) => {
            dispatch(updateVisitNotificationSettingsSuccess(resp.data))
            dispatch(getVisitNotificationSettings())
            dispatch(endLoading());

        })
.catch((err) => {
            dispatch(endLoading());

        })
    }
}

export function updateNotificationState(id){
    return (dispatch, getState) => {
        let original = getState().NotificationState.NotificationSettingsState.pushNotification
        const updatedNotificationList = original.map((value) => {
            if (value.userPrefrencesApplicationModuleID === id){
                value.isChecked = !value.isChecked
            }
            return value
        })

        dispatch({
            type: NotificationSettings.updateNotificationState,
            updatedNotificationList
        })
    }
}

export function updateEmailState(id){
    return (dispatch, getState) => {
        let original = getState().NotificationState.NotificationSettingsState.emailNotification
        const updatedEmailList = original.map((value) => {
            if (value.userPrefrencesApplicationModuleID === id){
                value.isChecked = !value.isChecked
            }
            return value
        })

        dispatch({
            type: NotificationSettings.updateEmailState,
            updatedEmailList
        })
    }
}



export function updateLastSyncedDate() {
    return (dispatch, getState) => {
        getLastSyncedDateTime().then((lastSyncedDate) => {
            dispatch({
                type: NotificationSettings.updateLastSyncedDate,
                lastSyncedDate
            })
        }).catch((err) => {
 throw err; 
})
    }
}