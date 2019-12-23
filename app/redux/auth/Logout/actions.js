import { resetStack } from '../../navigation/actions';
import { clearUserData } from '../User/actions';
import { PATH } from '../../../routes';
import { Post} from '../../../services/http';
import { API } from '../../../services/api';
import {startLoading, endLoading} from '../../loading/actions';
import DeviceInfo from 'react-native-device-info';
import { USER_TYPES, PLATFORM } from '../../../constants/constants';
import { isIOS } from '../../../utils/appUtils';


export const LOGOUT = {
    start: 'fetch_start/logout',
    end: 'fetch_end/logout',
    success: 'fetch_success/logout',
    failed: 'fetch_failed/logout',
    updateToken: 'updateToken/login'

};

export const logoutStart = () => ({type: LOGOUT.start})

export const logoutEnd = () => ({type: LOGOUT.end})

export const logoutFail = () => ({type: LOGOUT.failed})

export const logoutSuccess = (userData) => ({
        type: LOGOUT.success,
        userData
    })

export function clearData() {
    return (dispatch) => {
        dispatch(removeToken())
        dispatch(clearUserData());
        dispatch(logoutSuccess(null))
        dispatch(logoutEnd());
    }
}

export function onLogout() {
    return (dispatch) => {
        global.isSyncing = false
        dispatch(clearData());
        dispatch(resetStack(PATH ? PATH.WELCOME_SCREEN : null));
    }
}

export function onTimeout() {
    return (dispatch) => {
        dispatch(clearData());
        dispatch(resetStack(PATH.LOGIN_SCREEN));
    }
}

function generateFirebaseRequestObject(getState, token) {
    let os = PLATFORM.ANDROID,
     userID = getState().authState && getState().authState.userState.userInfo.userId,
     {userType} = getState().authState && getState().authState.userState.userInfo || {},
     deviceId = DeviceInfo.getUniqueID();

    if (userType === USER_TYPES.PATIENT){
        userID = getState().authState.userState.userInfo.patientId
    }
    if (isIOS()){
        os = PLATFORM.IOS
    }
    return {
        deviceUserId: userID,
        deviceToken: token,
        userType,
        osType: os,
        deviceId
    }
}

export function sendToken(token) {
    
    return (dispatch, getState) => {
        dispatch({
            type: LOGOUT.updateToken,
            data: token
        })
        dispatch(startLoading());
        let data = generateFirebaseRequestObject(getState, token)

        return Post(API.sendDeviceToken, data).then((response) => {
            dispatch(endLoading());
        })
.catch((error) => {
            dispatch(endLoading());
        })
    }
}

export function removeToken(model) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        let data

        if (model){
            data = model
        } else {
            let {deviceToken} = getState().authState && getState().authState.logoutState || {}

            data = generateFirebaseRequestObject(getState, deviceToken)
        }
       
        Post(API.removeDeviceToken, data).then((response) => {
            dispatch(endLoading());
        })
.catch((error) => {
            dispatch(endLoading());
        })
    }
}

