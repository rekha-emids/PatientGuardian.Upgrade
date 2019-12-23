import { API } from '../../../services/api';
import { Get } from '../../../services/http';
import { LOAD_MORE, API_FETCHING, API_SUCCESS, API_FAILED } from '../../../constants/AppAPIConstants';

export const NotificationList = {
    getNotificationListSuccess: 'get_notification_list_success/NotificationList',
    loadingStatus: 'notificationList/isLoading'
};

export const getNotificationListSuccess = (data) => ({
        type: NotificationList.getNotificationListSuccess,
        data
    })

export const isLoading = (data) => ({
        type: NotificationList.loadingStatus,
        data
    })

export function getNotificationList(requestObject) {
    return (dispatch, getState) => {
        let authState = getState().authState;
        let userId = authState && getState().authState.userState.userInfo.userId
        let userType = authState && getState().authState.userState.userInfo.userType

        if (userType === 'I'){
            userId = authState && getState().authState.userState.userInfo.patientId
        }
        dispatch(isLoading(API_FETCHING));
        Get(`${API.getNotificationList + userId}/${userType}/${requestObject.pageNumber}/${requestObject.pageSize}`).then((resp) => {
            let updatedData = [...resp.data]

            if (requestObject.requestType === LOAD_MORE){
                let existingData = [...getState().NotificationState.NotificationListState.notificationList]

                updatedData = existingData.concat(resp.data)
            }
            dispatch(getNotificationListSuccess(updatedData))
            dispatch(isLoading(API_SUCCESS));
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED));

        })
    }

}
