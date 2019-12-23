import { resetStack } from '../../navigation/actions';
import { USER_DATA } from '../../../constants/constants';
import { AuthLogin } from '../../../services/http';
import { API } from '../../../services/api';
import {startLoading, endLoading} from '../../loading/actions';
import {getUserRelatedData} from '../User/actions'
import {PATH} from '../../../routes/index'
import { save, load } from '../../../utils/asyncStorageUtil';
import { NETWORK_ERROR, INITIAL_LOGIN_DURING_OFFLINE, INVALID_PASSWORD, WRONG_USER } from '../../../constants/error';
import { fetchLoginData, clearLoginData, storeLoginData } from '../../../offline/Login';
import { clearPersonalDeailCareTeam } from '../../../offline/PersonalDetailCareTeam';
import { clearUserRelatedData } from '../../../offline/UserRelatedDetail';
import { clearOfflineUserRolesData } from '../../../offline/UserRoles';
import { clearOfflineSelectedClinicalCondition } from '../../../offline/Profile/ClinicalCondition.js/SelectedClinicalCondition';
import { clearOfflineSelectedLanguages } from '../../../offline/Profile/Languages/SelectedLanguages';
import { clearOfflineCityDetails } from '../../../offline/Profile/PersonalDetails/CityDetail';
import { clearOfflineGenderDetails } from '../../../offline/Profile/PersonalDetails/GenderDetail';
import { clearOfflineImage } from '../../../offline/Profile/PersonalDetails/Image';
import { clearOfflinePersonalDetails } from '../../../offline/Profile/PersonalDetails/PersonalDetail';
import { clearOfflinePointService } from '../../../offline/Profile/PointService/PointService';
import { clearOfflinePatientImageData } from '../../../offline/Dashboard/PatientImage';
import { clearOfflinePatientVisitDetail } from '../../../offline/Dashboard/PatientVisitDetail';
import { clearOfflineServiceProviderDetail } from '../../../offline/Dashboard/ServiceProviderDetail';
import { clearOfflineServiceReqDetail } from '../../../offline/Dashboard/ServiceRequestDetail';
import { clearOfflineUserInfoData } from '../../../offline/Dashboard/UserInfo';
import { clearOfflineVisitServiceDetailData } from '../../../offline/Dashboard/VisitServiceDetails';
import { clearOfflineVisitServiceScheduleData } from '../../../offline/Dashboard/VisitServiceSchedule';
import { clearOfflinePatientVisitCount } from '../../../offline/Dashboard/PatientVisitCount';

export const LOGIN = {
    success: 'fetch_success/login',
    failed: 'fetch_failed/login',
    clearData: 'clear_data/login',
    clearFailFlag: 'clear_fail_flag/login'
};

export const loginFail = (errorMsg) => ({
        type: LOGIN.failed,
        data: errorMsg
    })

export const loginSuccess = (data) => ({
        type: LOGIN.success,
        data
    })

export const clearData = () => ({type: LOGIN.clearData})


export const clearFailFlag = () => ({type: LOGIN.clearFailFlag})

export function onLoginSuccess(data, response, credentails){
    return (dispatch) => {
        dispatch(loginSuccess(data))
        dispatch(getUserRelatedData(response.data, credentails.username));
    }
}

export function onBackWelcomeScreen(){
    return (dispatch) => {
        dispatch(clearData());
        dispatch(resetStack(PATH.WELCOME_SCREEN));
    }
}

export function onForgotPassordLinkClick(){
    return (dispatch) => {
        dispatch(clearData());
        dispatch(resetStack(PATH.FORGET_PASSWORD_SCREEN));
    }
}

export function saveUserData(data){
    return (dispatch) => {
        dispatch(loginSuccess(data.userData))
        save(USER_DATA, data);
    }
}

export function checkUserData(){
    return (dispatch, getState) => {
        let currstate = getState();

        if (currstate.authState && !currstate.authState.loginState.userData) {
            load(USER_DATA, saveUserData());
        }
    }
}



export async function compareCredentialsLocalDb(userTypedCredential){
    return fetchLoginData().then((localDbCredentials) => {
        if (!(localDbCredentials[0] && localDbCredentials[0].userName === userTypedCredential.username)){ //localdb user name and loggedin person are not same.Hence clearing localdb data
            clearLoginData(); //clear credentials
            clearPersonalDeailCareTeam(); // clear personal details careTeam
            clearUserRelatedData();
            clearOfflineUserRolesData();
            //clear dashboard data
            clearOfflinePatientImageData();
            clearOfflinePatientVisitDetail();
            clearOfflineServiceProviderDetail();
            clearOfflineServiceReqDetail();
            clearOfflineUserInfoData();
            clearOfflineVisitServiceDetailData();
            clearOfflineVisitServiceScheduleData();
            //clear profile data 
            clearOfflineSelectedClinicalCondition();
            clearOfflineSelectedLanguages();
            clearOfflineCityDetails();
            clearOfflineGenderDetails();
            clearOfflineImage();
            clearOfflinePersonalDetails();
            clearOfflinePointService();
            clearOfflinePatientVisitCount();
        }
    })
.catch((err) => {
        throw err;
    })
}

export function onLogin(data, onFailure) {
    __DEV__ && console.log("Data on LOGIN: ", data);
    return (dispatch) => {
        dispatch(startLoading());
        __DEV__ && console.log("data in onlogin: ", data)
        AuthLogin(API.Login, data).then((response) => {
            __DEV__ && console.log("respone for onlogin: ", response)
            compareCredentialsLocalDb(data)
            .then((res) => {
                storeLoginData(data.username, data.password, response.data);
            })
.catch((err) => {
                storeLoginData(data.username, data.password, response.data);
            })
            dispatch(onLoginSuccess({userData: {accessToken: response.data.access_token}}, response, data));
        })
        .catch((error) => {
            __DEV__ && console.log("ERROR", error)
            if (error.message === NETWORK_ERROR) {
                isConnected = false;
                fetchLoginData()
                    .then((response) => {
                        let localDbCredential = response[0];

                        if (localDbCredential && (data.username.toLowerCase() === localDbCredential.userName.toLowerCase() && data.password === localDbCredential.password)) {
                            dispatch(onLoginSuccess({userData: {accessToken: localDbCredential.access_token}}, localDbCredential, data));
                            // dispatch(navigateToScreenMainStack(PATH.HOME_SCREEN));
                            dispatch(endLoading());
                        } else if (localDbCredential === undefined) {
                            dispatch(loginFail(INITIAL_LOGIN_DURING_OFFLINE));
                            dispatch(endLoading());

                        } else if (localDbCredential && (data.username.toLowerCase() === localDbCredential.userName.toLowerCase() && data.password !== localDbCredential.password)){
                            dispatch(loginFail(INVALID_PASSWORD));
                            dispatch(endLoading());
                        } else {
                            dispatch(loginFail(WRONG_USER));
                                dispatch(endLoading());
                        }
                    })
                    .catch((error) => {
                        dispatch(loginFail(INVALID_PASSWORD));
                        dispatch(endLoading());
                    })
            } else {
                if (error.response && error.response.data && error.response.data.error_description){
                    onFailure && onFailure(error.response.data.error_description)
                }
                dispatch(loginFail(INVALID_PASSWORD));
                dispatch(endLoading());
            }
        });
    }
}