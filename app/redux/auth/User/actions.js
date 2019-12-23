import { resetStack, navigateToScreenMainStack } from '../../navigation/actions';
import { save, load, remove } from '../../../utils/asyncStorageUtil';
import { USER_DATA, DEFAULT_AUTO_LOGOUT_TIME } from '../../../constants/constants';
import { PATH } from '../../../routes';
import { Get, CareTeamGet, Put } from '../../../services/http';
import { API } from '../../../services/api';
import {  endLoading } from '../../loading/actions';
import { USER_TYPES } from '../../../constants/constants';
import { objectCreationRoles } from '../../../utils/roleUtil';
import { API_FETCHING, API_SUCCESS, API_FAILED } from '../../../constants/AppAPIConstants';
import { NETWORK_ERROR } from '../../../constants/error';
import { storeUserRelatedData, getOfflineUserRelatedData } from '../../../offline/UserRelatedDetail';
import { storeUserRolesData, getOfflineUserRolesData } from '../../../offline/UserRoles';
import { storePatientImageData, getOfflinePatientImageData } from '../../../offline/Dashboard/PatientImage';
import { getUserInfo, getSelectedPatientInfo } from '../../../utils/userUtil';
import { setRelationship } from '../../onboarding/ProfileType/actions';
import { setUserInfo } from '../../onboarding/SetPassword/actions';
import { storePersonalDetailCareTeam, getOfflinePersonalDetailCareTeam } from '../../../offline/PersonalDetailCareTeam';
import { storeOfflineIndividualData, getOfflineIndividualData } from '../../../offline/IndividualsData';
import { getPersonalDetailSuccess } from '../../profile/PersonalDetail/actions';
import { storeIntroVideo, getIntroVideo, updateIntroVideoPlayedStatus } from '../../../offline/Dashboard/IntroVideo';

export const User = {
    setUserData: 'set_user_data/user',
    setAutoLogout: 'set_auto_logout/user',
    clearData: 'clear_data/user',
    getPatientDetails: "get_patient_details/user",
    getPatientImage: "get_patient_image/user",
    setSelectedPatient: 'set_selected_patient/user',
    getIndividualSuccess: 'get_individual_success/user',
    setUserRoles: 'set_user_roles/user',
    changeAPIStatus: "changeAPIStatus/user",
    impersinated: 'impersinated/user',
    clearImpersination: 'clearImpersination/user',
    setGuardianUserImage: 'set_guardian_user_image',
    setPatientUserImage: 'set_patient_user_image',
    clearSelectedPatient: 'clear_selected_patient/user',
    setCompleteData: "set_complete_data/user",
    introvideolink: 'introvideolink',
    updateVideoPlayedStatus: 'updateVideoPlayedStatus'
};

export const impersinated = () => ({type: User.impersinated})

export const clearImpersination = () => ({type: User.clearImpersination})

export const setUserRoles = (data) => ({
        type: User.setUserRoles,
        data
    })

export const setCompleteUserData = (data) => ({
        type: User.setCompleteData,
        data
    })

export const getIndividualSuccess = (data) => ({
        type: User.getIndividualSuccess,
        data
    })

export const getPatientDetailsSuccess = (data) => ({
        type: User.getPatientDetails,
        data
    })

export const getPatientImageSuccess = (data) => ({
        type: User.getPatientImage,
        data
    })

export const setUserData = (data) => ({
        type: User.setUserData,
        data
    })

export const setAutoLogout = (data) => ({
        type: User.setAutoLogout,
        data
    })

export const clearData = () => ({type: User.clearData})



export const setSelectedPatient = (data) => ({
        type: User.setSelectedPatient,
        data
    })

export const setGuardianUserImage = (data) => ({
        type: User.setGuardianUserImage,
        data
    })

export const setPatientUserImage = (data) => ({
        type: User.setPatientUserImage,
        data
    })

export function onSetSelectedPatient(data){
    return (dispatch) => {
        dispatch(clearImpersination())
        dispatch(setSelectedPatient(data));
        dispatch(impersinated())
    }
}

export function onSetGuardianUserImage(data){
    return (dispatch) => {
        dispatch(setGuardianUserImage(data))
    }
} 

export function onSetPatientUserImage(data){
    return (dispatch) => {
        dispatch(setPatientUserImage(data))
    }
}

export function clearUserData(){
    return (dispatch) => {
        dispatch(remove(USER_DATA));
        dispatch(clearData());
    }
}

export function saveUserData(data){
    return (dispatch) => {
        if (!data.error) {
            save(USER_DATA, data);
            dispatch(setUserData(data));
        } else {
            dispatch(resetStack(PATH.LOGIN_SCREEN));
        }
    }
}

export function checkUserData(){
    return (dispatch, getState) => {
        let currstate = getState();

        if (!(currstate.authState && currstate.authState.userState.authData && currstate.authState.userState.authData.access_token)) {
            load(USER_DATA, saveUserData);
        }
    }
}

export function getUserRelatedData(data, userData){
    let emailId = userData.username || userData;

    return (dispatch) => {
        dispatch(getUserInactiveTimeout(data, emailId))
    }
}

export function getUserDetails(data, emailId, autoLogoutTime){
    return (dispatch, getState) => {
        // dispatch(startLoading());
        dispatch(setAutoLogout(autoLogoutTime));
        Get(API.GetEmailIdByUserId + emailId).then((response) => {
            let userData = {
                authData: data,
                emailId,
                patientId: response.data.patientId,
                userId: response.data.userId,
                userType: response.data.userType,
                ...response.data,
                userInfo: {
                    ...response.data,
                    coreoHomeUserId: response.data.userId,
                    emailId,
                    email: emailId
                }
            }

            global.currentUserPatientId = Number(response.data.patientId)
            if (response.data.userType === USER_TYPES.GUARDIAN || response.data.userType === USER_TYPES.CARE_TEAM){
                global.currentUserPatientId = Number(response.data.userId) 
            }
            global.currentUserType = response.data.userType
            storeUserRelatedData(userData);
            if (userData.userInfo.isUserMapped){
                dispatch(saveUserData(userData));
                dispatch(getUserRoles());
            } else {
                dispatch(setRelationship(userData.userInfo.onBoardRelationShip))
                let data = {
                    emailId,
                    userId: userData.userInfo.onBoardUserId
                }

                dispatch(setUserInfo(data))
                dispatch(navigateToScreenMainStack(PATH.MEMBER_DETAILS_SCREEN, "Provide Member Details"))
                dispatch(endLoading());
            }
            dispatch(getPersonalDetailCareTeam(response.data.userId));
            dispatch(getImageCareTeam(response.data.userId));
            dispatch(getIntroVideoLink())         
        })
        .catch((error) => {
            if (error.message === NETWORK_ERROR) {
                getOfflineUserRelatedData().then((res) => {
                    dispatch(getIntroVideoLink())
                    let userData = JSON.parse(res[0].userRelatedData);

                    global.currentUserPatientId = userData.patientId
                    if (userData.userType === USER_TYPES.GUARDIAN || userData.userType === USER_TYPES.CARE_TEAM) {
                        global.currentUserPatientId = userData.userId
                    }
                    global.currentUserType = userData.userType
                    if (userData.userInfo.isUserMapped) {
                        dispatch(saveUserData(userData));
                        dispatch(getUserRoles());
                    } else {
                        dispatch(setRelationship(userData.userInfo.onBoardRelationShip))
                        let data = {
                            emailId,
                            userId: userData.userInfo.onBoardUserId
                        }

                        dispatch(setUserInfo(data))
                        dispatch(navigateToScreenMainStack(PATH.MEMBER_DETAILS_SCREEN))
                    }
                    dispatch(getPersonalDetailCareTeam(response.data.userId));
                    dispatch(getImageCareTeam(response.data.userId));
                    // dispatch(endLoading());
                })
.catch((err) => {
                    // dispatch(endLoading());
                })
            } else {
                // dispatch(endLoading());
            }
        });
    }
}

export function getIntroVideoLink() {
    return (dispatch) => {
      Get(API.introvideolink).then((res) => { 
          dispatch(updateVideoURL(res.data))
          storeIntroVideo(res.data.introVideoLink, res.data.isIntroVideoPlayed)
      }).catch((err) => {
          if (err.message === NETWORK_ERROR){
            getIntroVideo().then((res) => {
                dispatch(updateVideoURL(res))
            }).catch((err) => {
                dispatch(changeAPIStatus(API_FAILED))
            })
          }
        dispatch(changeAPIStatus(API_FAILED))
      })
    }
  }

export function updateIntroVideoLink(isIntroVideoPlayed){
    return (dispatch) => {
        Put(API.introvideolink, {isIntroVideoPlayed}).then((res) => {
            dispatch(updateVideoPlayedStatus(true))
            updateIntroVideoPlayedStatus(true);
        }).catch((err) => {
          dispatch(changeAPIStatus(API_FAILED))
        })
      } 
}

  export const updateVideoURL = (data) => ({
      type: User.introvideolink,
      data
    })

  export const updateVideoPlayedStatus = (data) => ({
      type: User.updateVideoPlayedStatus,
      data
    })

export function getIndividuals(flag) {
    return (dispatch) => {
        let userInfo = getUserInfo(),
         patientId = userInfo && userInfo.patientId ? userInfo.patientId : 0,
         userType = userInfo && userInfo.userType ? userInfo.userType : USER_TYPES.GUARDIAN;

      Get(`${API.getManageConnections + patientId}/${userType}`)
        .then((resp) => {
          storeOfflineIndividualData(resp.data);
          if (resp && resp.data.users) {
            const patients = resp.data.users.filter((user) => user.userType === USER_TYPES.PATIENT)

            dispatch(getIndividualSuccess(patients));
            if (patients && patients.length > 0) {
                dispatch(onSetSelectedPatient(patients[0]));
            }
          }
          if (userType === USER_TYPES.INDIVIDUAL_GUARDIAN ||
                userType === USER_TYPES.PATIENT) {
            dispatch(onSetSelectedPatient(userInfo));
          }
          if (!flag) {
            !global.isSyncing && dispatch(resetStack(PATH.HOME_SCREEN)); 
}
          dispatch(endLoading());        
        })
        .catch((err) => {

            if (err.message === NETWORK_ERROR){
                getOfflineIndividualData().then((res) => {
                    if (res && res.users) {
                        const patients = res.users.filter((user) => user.userType === USER_TYPES.PATIENT)

                        dispatch(getIndividualSuccess(patients));
                        if (patients && patients.length > 0) {
                            dispatch(onSetSelectedPatient(patients[0]));
                        }
                    }
                    if (userType === USER_TYPES.INDIVIDUAL_GUARDIAN ||
                        userType === USER_TYPES.PATIENT) {
                        dispatch(onSetSelectedPatient(userInfo));
                    }
                    if (!flag) {
dispatch(resetStack(PATH.HOME_SCREEN)); 
}
                    dispatch(endLoading())

                })
.catch((err) => {
                    dispatch(endLoading())
                })

            } else {
                dispatch(endLoading())
            }
        })
    }
  }

export function getUserInactiveTimeout(data, emailId) {
    return (dispatch) => {
        // dispatch(startLoading());
        Get(API.getTimeoutMilliseconds).then((response) => {
            dispatch(getUserDetails(data, emailId, parseInt(response.data[0].name)))
        })
        .catch((error) => {
            dispatch(getUserDetails(data, emailId, DEFAULT_AUTO_LOGOUT_TIME))
            if (error.message === NETWORK_ERROR) {
                dispatch(getUserDetails(data, emailId, 1209600000))
                dispatch(endLoading());
            } else {
                dispatch(endLoading());
            }
        });
    }
}

export function getUserRoles() {
    return (dispatch) => {
        let userInfo = getUserInfo();
        // dispatch(startLoading());

        CareTeamGet(API.getUserRoles).then((response) => {
            storeUserRolesData(response.data);
            if (response && response.data && response.data.length > 0) { 
                dispatch(setUserRoles(objectCreationRoles(response.data)));
            }
            if (userInfo.userType === USER_TYPES.CARE_TEAM) {
                dispatch(resetStack(PATH.CARETEAM_SCREEN))
                dispatch(endLoading());
            } else if (userInfo.userType === USER_TYPES.GUARDIAN ||
                userInfo.userType === USER_TYPES.INDIVIDUAL_GUARDIAN) {
                dispatch(getIndividuals())
            } else {
                !global.isSyncing && dispatch(resetStack(PATH.HOME_SCREEN))
                dispatch(endLoading());
            }
            // dispatch(endLoading());
        })
        .catch((error) => {
            if (error.message === NETWORK_ERROR) {
                getOfflineUserRolesData().then((resp) => {
                    dispatch(setUserRoles(objectCreationRoles(resp)));
                    if (userInfo.userType === USER_TYPES.CARE_TEAM) {
                        dispatch(resetStack(PATH.CARETEAM_SCREEN))
                    } else if (userInfo.userType === USER_TYPES.GUARDIAN ||
                        userInfo.userType === USER_TYPES.INDIVIDUAL_GUARDIAN) {
                        dispatch(getIndividuals())
                    } else {
                        dispatch(resetStack(PATH.HOME_SCREEN))
                        dispatch(endLoading());
                    }
                    dispatch(endLoading());
                })
.catch((err) => {
                    dispatch(endLoading());
                })

            }
            dispatch(endLoading());
        });
    }
}

export function changeAPIStatus(data){
    return {
        type: User.changeAPIStatus,
        data
    }
}

export function getPatientImage() {
    return (dispatch, getState) => {
        dispatch(changeAPIStatus(API_FETCHING))
        let patientId = getState().authState && getState().authState.userState.patientId

        Get(API.getPatientImage + patientId).then((response) => {
            storePatientImageData(response.data);
            dispatch(getPatientImageSuccess(response.data));
            dispatch(changeAPIStatus(API_SUCCESS))
        })
        .catch((error) => {
            if (error.message === NETWORK_ERROR) {
                getOfflinePatientImageData().then((res) => {
                    dispatch(getPatientImageSuccess(res));
                    dispatch(changeAPIStatus(API_SUCCESS))
                    dispatch(endLoading())
                })
.catch((err) => {
                    dispatch(endLoading());
                    dispatch(changeAPIStatus(API_FAILED))
                })
            } else {
                dispatch(endLoading());
                dispatch(changeAPIStatus(API_FAILED))
            }
        });
    }
}

export function getPatientDetails() {
    return (dispatch, getState) => {
        // dispatch(startLoading());
        let {patientId} = getState().authState && getState().authState.userState || {}

        Get(`${API.getPatientDetails + patientId}/PatientDetails`).then((response) => {
            dispatch(getPatientDetailsSuccess(response.data));
            // dispatch(endLoading())
        })
        .catch((error) => {
            dispatch(endLoading());
        });
    }
}

export function getPersonalDetailCareTeam(userId) {
    return (dispatch, getState) => {
        let userData = getSelectedPatientInfo(),
         userInfo = getUserInfo()
        // dispatch(startLoading())

        CareTeamGet(`${API.getPersonalDetailCareTeam + userId}/CareTeamDetails`)
            .then((resp) => {
               let selectedPatientInfo = {
                    ...userData,
                    ...resp.data
                }

                storePersonalDetailCareTeam(selectedPatientInfo);
               userInfo.userType === USER_TYPES.CARE_TEAM && dispatch(getPersonalDetailSuccess({data: selectedPatientInfo, id: userId}))
                // dispatch(onSetSelectedPatient(selectedPatientInfo));
                dispatch(getImageCareTeam(userId))
                // dispatch(endLoading())
            })
            .catch((err) => {
                if (error.message === NETWORK_ERROR) {
                    getOfflinePersonalDetailCareTeam().then((selectedPatientInfo) => {
                        dispatch(onSetSelectedPatient(selectedPatientInfo));
                        dispatch(getImageCareTeam(userId))
                        dispatch(endLoading())
                    })
.catch((err) => {
                        dispatch(endLoading())
                    })
                } else {
                    dispatch(endLoading())
                }
            })
    }
}

export function getImageCareTeam(userId) {
    return (dispatch) => {
        let userData = getSelectedPatientInfo();
        // dispatch(startLoading())

        CareTeamGet(API.getImageCareTeam + userId)
        .then((resp) => {
            let selectedPatientInfo = {
                ...userData,
                imageData: resp.data
            }
            // dispatch(onSetSelectedPatient(selectedPatientInfo));
            // dispatch(endLoading())
        })
        .catch((err) => {
            // dispatch(endLoading())
        })
    }
}


export function clearSelectedPatientInfo(data){
    return {
        type: User.clearSelectedPatient,
        data
    }
}