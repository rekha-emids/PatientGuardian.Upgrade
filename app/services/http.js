import axios from 'axios';
import { store } from '../redux/store';
import { getTimeZoneOffset } from '../utils/momentUtil';
import { _ } from '../utils/validations'
import {performTasksForEsp} from '../utils/ApiDataHandler'
import { API } from './api';

// HMSA-UAT SERVER
// export const webUrl = "https://HMSA-UAT.coreodevserver.com/"
// export const attributeURL = "https://HMSA-UAT-gen-api.coreodevserver.com/api/";
// export const careteamUrl = "https://HMSA-UAT-ct-api.coreodevserver.com/api/";
// export const baseURL = "https://HMSA-UAT-gen-api.coreodevserver.com/api/";
// export const authURL = "https://HMSA-UAT-oauth-api.coreodevserver.com/";
// export const serviceUrl = "https://HMSA-UAT-sr-api.coreodevserver.com/api/";
// export const twilioUrl = "http://52.172.45.185:9000/api/";
// export const asyncURL = "https://HMSA-UAT-tp-api.coreodevserver.com/api/";
// export const signalRUrl = 'https://HMSA-UAT-tp-api.coreodevserver.com/signalR';
// export const spURL = "https://HMSA-UAT-sp-api.coreodevserver.com/api/"

// UAT SERVER
// export const webUrl = "https://uat-gen.coreodevserver.com/"
// export const attributeURL = "https://uat-gen-api.coreodevserver.com/api/";
// export const careteamUrl = "https://uat-ct-api.coreodevserver.com/api/";
// export const baseURL = "https://uat-gen-api.coreodevserver.com/api/";
// export const authURL = "https://uat-oauth-api.coreodevserver.com/";
// export const serviceUrl = "https://uat-sr-api.coreodevserver.com/api/";
// export const twilioUrl = "http://52.172.45.185:9000/api/";
// export const asyncURL = "https://uat-tp-api.coreodevserver.com/api/";
// export const signalRUrl = 'https://uat-tp-api.coreodevserver.com/signalR';
// export const spURL = "https://uat-sp-api.coreodevserver.com/api/"

//PFTSERVER
export const webUrl = "https://pftest-gen.coreoflowsandbox.com/"
export const attributeURL = "https://PFTest-gen-api.coreoflowsandbox.com/api/";
export const careteamUrl = "https://PFTest-ct-api.coreoflowsandbox.com/api/";
export const baseURL = "https://PFTest-gen-api.coreoflowsandbox.com/api/";
export const authURL = "https://PFTest-oauth-api.coreoflowsandbox.com/";
export const serviceUrl = "https://PFTest-sr-api.coreoflowsandbox.com/api/";
export const twilioUrl = "http://52.172.45.185:9000/api/";
export const asyncURL = "https://PFTest-tp-api.coreoflowsandbox.com/api/";
export const signalRUrl = 'https://PFTest-tp-api.coreoflowsandbox.com/signalR';
export const spURL = "https://PFTest-sp-api.coreoflowsandbox.com/api/"

// //QA Server
// export const webUrl = "https://chqa-gen-ui.coreoflowsandbox.com/"
// export const DEV_SERVICE_URL = "https://chqa-ui.coreoflowsandbox.com/api/" // "https://pftest-vp.coreoflowsandbox.com/api/"
// export const attributeURL = "https://chqa-api.coreoflowsandbox.com/api/";
// export const careteamUrl = "https://chqa-ct-api.coreoflowsandbox.com/api/";
// export const baseURL = "https://chqa-api.coreoflowsandbox.com/api/";
// export const authURL = "https://chqa-oauth-api.coreoflowsandbox.com/";
// export const serviceUrl = DEV_SERVICE_URL //"https://chqa-ui.coreoflowsandbox.com/api/";
// export const twilioUrl = "http://52.172.45.185:9000/api/";
// export const asyncURL = "https://chqa-vp-ui.coreoflowsandbox.com/api/";
// export const signalRUrl = 'https://chqa-vp-ui.coreoflowsandbox.com/signalR';
// export const spURL = "https://chqa-sp-api.coreoflowsandbox.com/api/"

//Dev Server 
// export const webUrl = "https://chdevdemo-gen.coreoflowsandbox.com/"
// export const attributeURL = "https://chdevdemo-gen-api.coreoflowsandbox.com/api/";
// export const careteamUrl = "https://chdevdemo-ct-api.coreoflowsandbox.com/api/";
// export const baseURL = "https://chdevdemo-gen-api.coreoflowsandbox.com/api/";
// export const authURL = "https://chdevdemo-oauth-api.coreoflowsandbox.com/";
// export const serviceUrl = "https://chdevdemo-sr-api.coreoflowsandbox.com/api/";
// export const twilioUrl = "https://chdevdemo-tp-api.coreoflowsandbox.com/api/";
// export const asyncURL = "https://chdevdemo-tp-api.coreoflowsandbox.com/api/";
// export const signalRUrl = 'https://chdevdemo-tp-api.coreoflowsandbox.com/signalR';
// export const spURL = "https://chdevdemo-sp-api.coreoflowsandbox.com/api/"

//Demo Server 
// export const webUrl = "https://chdemo-gen-ui.CoreoDevServer.com/"
// export const attributeURL = "https://chdemo-gen-api.CoreoDevServer.com/api/";
// export const careteamUrl = "https://chdemo-vp-api.CoreoDevServer.com/api/";
// export const baseURL = "https://chdemo-gen-api.coreodevserver.com/api/";
// export const authURL = "https://chdemo-oauth-api.coreodevserver.com/";
// export const serviceUrl = "https://chdemo-sr-api.coreodevserver.com/api/";
// export const twilioUrl = "https://chdemo-tp-api.coreodevserver.com/api/";
// export const asyncURL = "https://chdemo-tp-api.coreodevserver.com/api/";
// export const signalRUrl = 'https://chdemo-tp-api.coreodevserver.com/signalR';
// export const spURL = "https://chdemo-sp-api.coreodevserver.com/api/"


//HSMA Server
// export const webUrl = "https://HMSADemo-gen.coreodevserver.com/"
// export const attributeURL = "https://HMSADemo-gen-api.coreoDevServer.com/api/";
// export const careteamUrl = "https://HMSADemo-ct-api.coreodevserver.com/api/";
// export const baseURL = "https://HMSADemo-gen-api.coreodevserver.com/api/";
// export const authURL = "https://HMSADemo-oauth-api.coreodevserver.com/";
// export const serviceUrl = "https://HMSADemo-sr-api.coreodevserver.com/api/";
// export const twilioUrl = "https://HMSADemo-tp-api.coreodevserver.com/api/";
// export const asyncURL = "https://HMSADemo-tp-api.coreodevserver.com/api/";
// export const signalRUrl = 'https://HMSADemo-tp-api.coreodevserver.com/signalR';
// export const spURL = "https://HMSADemo-sp-api.coreodevserver.com/api/"

export const AuthLogin = (url, data) => {
    let bodyFormData = '';

    if (!_.isEmpty(data)) {
        bodyFormData = new FormData();

        bodyFormData.append('client_id', 'roclient');
        bodyFormData.append('client_secret', 'coreohomesecret');
        bodyFormData.append('grant_type', 'password');
        bodyFormData.append('username', data.username);
        bodyFormData.append('password', data.password);
    }

    return axios.post(authURL + url, bodyFormData, { headers: { 'Authorization': 'Basic Og==' } })
        .then((response) => response)
        .catch((error) => handleError(error, url, 'AuthLogin'))
}

export const getUserInfo = () => {
    let userState = store && store.getState().authState.userState;

    return userState && userState.userData && userState.userData.userInfo;
}

export const Post = (url, data, _baseURL = baseURL) => axios.post(_baseURL + url, data, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'Post');
    })

export const ServiceRequestGet = (url) => axios.get(serviceUrl + url, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'ServiceRequestGet');
    })

export const TwilioGet = (url) => axios.get(twilioUrl + url, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'TwilioGet');
    })

export const AsyncGet = (url) => axios.get(asyncURL + url, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'AsyncGet');
    });

export const AsyncPost = (url, data) => axios.post(asyncURL + url, data, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'AsyncPost');
    });

export const ServiceRequestPost = (url, data) => axios.post(serviceUrl + url, data, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'ServiceRequestPost');
    })

export const CareTeamPost = (url, data) => axios.post(careteamUrl + url, data, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'CareTeamPost');
    })

export const CareTeamGet = (url) => axios.get(careteamUrl + url, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'CareTeamGet');
    })


export const Put = (url, data, _baseURL = baseURL) => axios.put(_baseURL + url, data, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'Put');
    })

export const Get = (url, _baseURL = baseURL) => axios.get(_baseURL + url, getHeader()).then((resp) => {
        if (url && url.includes(API.getServicePlanPerformTasks)){
            let copiedData = Object.assign({}, resp.data)

            return {
                ...resp,
                data: performTasksForEsp(copiedData)
            }   
        } else if (url && url.includes(API.getServicePlanSummaryDetails)){
            let copiedData = Object.assign({}, resp.data)

            return {
                ...resp,
                data: performTasksForEsp(copiedData)
            }
        }
        return resp;
    }).catch((error) => {
        handleError(error, url, 'Get');
    })

export const Delete = (url, _baseURL = baseURL) => axios.delete(_baseURL + url, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'Delete');
    })

export const AuthPost = (url, data) => axios.post(authURL + url, data, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'AuthPost');
    })

export const AuthPut = (url, data) => axios.put(authURL + url, data, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'AuthPut');
    })

export const AuthGet = (url) => axios.get(authURL + url, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'AuthGet');
    })

export const AuthDelete = (url) => axios.delete(authURL + url, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'AuthDelete');
    })

export const handleError = (err, url, methodName) => {
    throw err;
}

export const getPatientDetails = () => {
    const storeState = store && store.getState() && store.getState().authState.userState &&
        store.getState().authState.userState.userData &&
        JSON.parse(store.getState().authState.userState.userData) &&
        JSON.parse(store.getState().authState.userState.userData).data.patientData;

    return {
        PATIENT_ID: storeState.patientId,
        USER_ID: storeState.userId
    }
}
export const getHeader = () => {
    let userState = store && store.getState() && store.getState().authState.loginState,
        token = userState && userState.userData && userState.userData.accessToken,
        authHeader = { offset: getTimeZoneOffset() }

    if (token) {
        authHeader.Authorization = `Bearer ${token}`,
        authHeader.authType = "oauth"
    }
    return {headers: authHeader}
}

export const AsyncPut = (url, data) => axios.put(asyncURL + url, data, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'AsyncPut');
    })

export const AsyncPutWithUrl = (url, data) => axios.put(asyncURL + url, data, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'AsyncPutWithUrl');
    })
export const SpGet = (url, data) => axios.get(spURL + url, getHeader()).then((resp) => resp)
    .catch((error) => {
        handleError(error, url, 'SpGet');
    })
