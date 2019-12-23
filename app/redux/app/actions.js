import { load } from '../../utils/asyncStorageUtil';
import { onLoginSuccess } from '../auth/Login/actions';
import { resetStack } from '../navigation/actions';
import { deviceInit } from '../device/actions';
import { USER_DATA } from '../../constants/constants';
import {PATH} from '../../routes';

export const APP_INIT = "APP_INIT";
export const APP_READY = "APP_READY";

export const appInit = () => ({type: APP_INIT})

export function checkPrevLogin() {
    return (dispatch, getState) => {
        dispatch(load(USER_DATA, onCheckPrevLogin))
    }
}

export function onCheckPrevLogin(userData) {
    return (dispatch, getState) => {
        if (userData.username) {
            dispatch(onLoginSuccess(userData))
        } else {
            dispatch(resetStack(PATH.LOGIN_SCREEN))
        }
    }
}

export function onAppReady() {
    return (dispatch, getState) => {
        dispatch(deviceInit())
        dispatch(checkPrevLogin())
    }
}


