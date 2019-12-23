import {  navigateToScreenMainStack, replace } from '../../navigation/actions';
import {PATH} from '../../../routes';
import { setNavigateToLogin, EMPTY_SCREEN } from '../../auth/navigatedToLogin/action';
import { API } from '../../../services/api';
import { Get, AsyncGet } from '../../../services/http';

export const Welcome = {
    getStartedClick: 'get_started_click/welcome',
    loginClick: 'login_click/welcome',
    deepLinkClick: 'deeplink_click/welcome',
    getCanOnboardFlagSuccess: "getCanOnboardFlagSuccess/welcome"
};

export const getStartedClick = () => ({type: Welcome.getStartedClick})

export const loginClick = () => ({type: Welcome.loginClick})

export const onDeepLinkClick = (data) => ({
        type: Welcome.deepLinkClick,
        data
    })

export function onGetStartedClick(){
    return (dispatch) => {
        dispatch(getStartedClick());
        dispatch(navigateToScreenMainStack(PATH ? PATH.PROFILE_TYPE_SCREEN : null));
    }
}

export const getCanOnboardFlagSuccess = (data) => ({
    type: Welcome.getCanOnboardFlagSuccess,
    data
})

export function onLoginClick(){
    return (dispatch, getState) => {
        dispatch(loginClick());
        dispatch(navigateToScreenMainStack(PATH.LOGIN_SCREEN));
    }
}

export function deepLinkRoute(data){
    return (dispatch, getState) => {
        dispatch(onDeepLinkClick(data));
        dispatch(setNavigateToLogin(EMPTY_SCREEN))
        data.path === PATH && PATH.RESET_PASSWORD_SCREEN ? dispatch(replace(data.path)) : dispatch(navigateToScreenMainStack(data.path));
    }
}

export function getCanOnboardFlag(){
    return (dispatch, getState) => {
        AsyncGet(API.getCanOnboardFlag).then(resp => {
        resp.data && resp.data[0] && dispatch(getCanOnboardFlagSuccess(Number(resp.data[0].value)))
        }).catch(err => {

        })
    }
}    