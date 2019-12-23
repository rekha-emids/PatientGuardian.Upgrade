import {
    NotificationList
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    notificationList: [],
    isLoading: API_INITIAL
},

 NotificationListState = (state = defaultState, action) => {
    switch (action.type) {

        case NotificationList.getNotificationListSuccess:
            return {
                ...state,
                notificationList: action.data
            }

        case NotificationList.loadingStatus:
            return {
                ...state,
                isLoading: action.data
            }
        default:
            return state;
    }
}

export default NotificationListState;