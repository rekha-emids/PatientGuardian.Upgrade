import { API } from '../../services/api';
import { AsyncPutWithUrl, AsyncGet, AsyncPost, CareTeamPost, AsyncPut } from '../../services/http';
import { navigateToScreenMainStack, onBack, resetStack } from '../navigation/actions';
import { PATH } from '../../routes';
import { USER_TYPES } from '../../constants/constants';
import moment from 'moment'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '../../constants/AppAPIConstants';
import { getCareTeamId, getSelectedPatientInfo, getUserInfo } from '../../utils/userUtil';
import { isActiveCall } from '../dashboard/Dashboard/actions';

export const TeleHealth = {
    generateTokenSuccess: 'generate_token_success/telehealth',
    setLinkedParticipants: 'set_linked_participants/telehealth',
    setLinkedPatients: 'set_linked_patients/telehealth',
    clearLinkedParticipants: 'clear_linked_participants/telehealth',
    getRoomIdSuccess: 'getRoomIdSuccess/telehealth',
    getParticipantByConfernceIdSuccess: 'get_participant_by_confernceId_success/telehealth',
    getAllParticipantsSuccess: 'get_all_participants_success/telehealth',
    setRoomId: 'set_roomId/telehealth',
    deepLinkClick: 'deep_link_click/telehealth',
    setContext: 'setContext/telehealth',
    clearState: 'clearState/telehealth',
    loadingStatus: 'telehealth/isLoading',
    setStartedFromMenuStatus: 'setStartedFromMenuStatus/telehealth'
};

export const setStartedFromMenuStatus = (data) => ({
        type: TeleHealth.setStartedFromMenuStatus,
        data
    });

export const clearState = () => ({type: TeleHealth.clearState});

export const generateTokenSuccess = (data) => ({
        type: TeleHealth.generateTokenSuccess,
        data
    });

export const setContext = (data) => ({
        type: TeleHealth.setContext,
        data
    });

export const isLoading = (data) => ({
        type: TeleHealth.loadingStatus,
        data
    })

export function generateToken() {
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING));
        const {userInfo} = getState().authState && getState().authState.userState || {};
        let identity = userInfo && userInfo.userId;

        AsyncGet(API.generateToken + identity).then((resp) => {
            if (resp && resp.data) {
                dispatch(generateTokenSuccess(resp.data));
                dispatch(GetParticipantByConferenceId())
            }
            dispatch(isLoading(API_SUCCESS));
        })
.catch(() => {
            dispatch(isLoading(API_FAILED));
        })
    }
}

export function getLinkedParticipantsByPatients(data, updateNetworkOnResponse) {
    return (dispatch, getState) => {
        let {network} = getState().networkReducer || {};
        const {userInfo} = getState().authState && getState().authState.userState || {};
        let patientId = getSelectedPatientInfo() && getSelectedPatientInfo().patientId ? getSelectedPatientInfo() && getSelectedPatientInfo().patientId : getUserInfo() && getUserInfo().patientId,
         userType = userInfo && userInfo.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.PATIENT : userInfo && userInfo.userType,
         state = getState(),
         searchText = data && data.searchText ? data.searchText : null,
         roomId = state.telehealthState && state.telehealthState.roomId ? state.telehealthState.roomId : 0,
         id = userInfo && userInfo.userId;

        dispatch(isLoading(API_FETCHING));
        AsyncGet(`${API.getTeleHealthAllParticipants +
            id}/${
             userType}/${
             data.patientId ? data.patientId : patientId}/${
             roomId}/${
             searchText}`).then((resp) => {
                if (!network){
                    updateNetworkOnResponse && updateNetworkOnResponse(true)
                }
                dispatch(onGetAllParticipantsSuccess(resp.data));
                dispatch(isLoading(API_SUCCESS));
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED));
        })
    }
}

export function createVideoConference(data, onSuccess) {
    return (dispatch, getState) => {
        let twilioData = {};

        if (getState() && getSelectedPatientInfo()){
            const userState = getState().authState.userState;
            let id = userState.userInfo.userId;
            const personalDetailState = getState().profileState.PersonalDetailState.personalDetail || {};
            let patientId = getSelectedPatientInfo().patientId ? getSelectedPatientInfo().patientId : getUserInfo().patientId;
            let context = getState().telehealthState.contextId ? getState().telehealthState.contextId : patientId;
            let userType = userState.userInfo.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : userState.userInfo.userType;
            let participantId = userState.userInfo.userType === USER_TYPES.CARE_TEAM ? getCareTeamId() : userState.userInfo.patientId;

            if (userState.userInfo.patientId === context && userType !== USER_TYPES.CARE_TEAM) {
                userType = USER_TYPES.PATIENT
            }
            twilioData = {
                createdBy: id,
                createdByType: userType,
                createdByFirstName: personalDetailState.firstName,
                createdByLastName: personalDetailState.lastName,
                context,
                participantList: [
                    {
                        userId: id,
                        participantType: userType,
                        firstName: personalDetailState.firstName,
                        lastName: personalDetailState.lastName,
                        thumbNail: getState().profileState.PersonalDetailState.imageData.image,
                        participantId
                    },
                    ...data
                ]
    
            }; 
        }
        
        dispatch(isLoading(API_FETCHING));
        AsyncPost(API.createRoomId, twilioData).then((resp) => {
            dispatch(getRoomIdSuccess(resp.data));
            dispatch(navigateToScreenMainStack(PATH.VIDEO_CONFERENCE_SCREEN));
            dispatch(isLoading(API_SUCCESS));
            onSuccess && onSuccess()

        })
.catch((err) => {
            dispatch(isLoading(API_FAILED));

        })
    }
}

const getRoomIdSuccess = (data) => ({
        type: TeleHealth.getRoomIdSuccess,
        data
    });

export const setRoomId = (data) => ({
        type: TeleHealth.setRoomId,
        data
    });

const getLinkedPatientsSuccess = (data) => ({
        type: TeleHealth.setLinkedPatients,
        data
    });

export function joinCall() {
    return (dispatch, getState) => {
        const {userInfo} = getState().authState.userState,
         {telehealthState} = getState();
        let id = userInfo.userId,
         userType = userInfo.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : userInfo.userType;

        dispatch(isLoading(API_FETCHING));
        AsyncPutWithUrl(`${API.joinVideoConference + 
            id}/${ 
             userType}/${ 
                telehealthState ? telehealthState.roomId : ''}`).then((resp) => {
            dispatch(navigateToScreenMainStack(PATH.VIDEO_CONFERENCE_SCREEN));
            dispatch(isLoading(API_SUCCESS));
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED));
        })
    }
}

export function joinVideoConference(onFailure) {
  return (dispatch, getState) => {
    const roomNumber = getState() && getState().telehealthState && getState().telehealthState.roomId;

    dispatch(isActiveCall(roomNumber, joinCall, onFailure))
  }
}

export function leaveVideoConference(checkRoute, onSuccess) {
    return (dispatch, getState) => {
        const {userState} = getState().authState;
        let selectedPatientInfo = getSelectedPatientInfo(),
         state = getState(),
         id = userState.userInfo.userId,
         userType = userState.userInfo.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : userState.userInfo.userType;

        dispatch(isLoading(API_FETCHING));
        AsyncPutWithUrl(`${API.leaveVideoConference + 
            id}/${ 
             userType}/${ 
             state.telehealthState.roomId}`).then((resp) => {
                dispatch(clearState())
                if (!checkRoute) {
                    if (state.telehealthState.startedFromMenu) {
                        dispatch(setStartedFromMenuStatus(false))
                        if (userInfo.userType === USER_TYPES.CARE_TEAM && selectedPatientInfo.userType !== USER_TYPES.INDIVIDUAL_GUARDIAN && selectedPatientInfo.userType !== USER_TYPES.GUARDIAN && selectedPatientInfo.userType !== USER_TYPES.PATIENT) {	
                            dispatch(resetStack(PATH.CARETEAM_SCREEN))	
                        } else if (userInfo.userType === USER_TYPES.CARE_TEAM && (selectedPatientInfo.userType === USER_TYPES.INDIVIDUAL_GUARDIAN || selectedPatientInfo.userType === USER_TYPES.GUARDIAN || selectedPatientInfo.userType === USER_TYPES.PATIENT)) {	
                            dispatch(navigateToScreenMainStack(PATH.INPERSONATE_HOME_SCREEN))	
                        } else {
                            dispatch(navigateToScreenMainStack(PATH.HOME_SCREEN))
                        }
                    } else {
                        dispatch(onBack())
                    }
                }
                dispatch(isLoading(API_SUCCESS));
                onSuccess && onSuccess();
            })
.catch((err) => {
                dispatch(isLoading(API_FAILED));
            })
    }
}


export function GetParticipantByConferenceId() {
    return (dispatch, getState) => {
        const {userInfo} = getState().authState && getState().authState.userState || {};
        let state = getState(),
         id = userInfo && userInfo.userId,
         userType = userInfo && userInfo.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : userInfo && userInfo.userType,
         participantId = userInfo && userInfo.userType === USER_TYPES.CARE_TEAM ? getCareTeamId() : userInfo && userInfo.patientId;
        let roomId = state.telehealthState && state.telehealthState.roomId;

        dispatch(isLoading(API_FETCHING));
        AsyncGet(`${API.getParticipantByConferenceId +
            id}/${
             userType}/${
                roomId}`).then((resp) => {
                let data = resp.data && resp.data.filter((participant) => userInfo.userId !== participant.userId).map((participant) => ({...participant})),
                 participants = [
                    ...data,
                    {
                        userId: id,
                        participantType: '',
                        firstName: 'Me',
                        lastName: '',
                        status: 'Joined',
                        thumbNail: state.authState.userState.patientImage.image,
                        participantId
                    }
                ]

                dispatch(onGetParticipantByConfernceIdSuccess(participants));
                dispatch(isLoading(API_SUCCESS));
            })
.catch((err) => {
                dispatch(isLoading(API_FAILED));
            })
    }
}

export function GetAllParticipants(data) {
    return (dispatch, getState) => {
        const {userInfo} = getState().authState && getState().authState.userState || {};
        let state = getState(),
         patientId = getSelectedPatientInfo() && getSelectedPatientInfo().patientId ? getSelectedPatientInfo() && getSelectedPatientInfo().patientId : getUserInfo() && getUserInfo().patientId,
         searchText = data && data.searchText ? data.searchText : null,
         roomId = state.telehealthState && state.telehealthState.roomId ? state.telehealthState.roomId : 0,
         id = userInfo && userInfo.userId,
         userType = userInfo && userInfo.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.PATIENT : userInfo && userInfo.userType;
         let contextId = state.telehealthState && state.telehealthState.contextId; 

        dispatch(isLoading(API_FETCHING));
        AsyncGet(`${API.getTeleHealthAllParticipants +
            id}/${
             userType}/${
                contextId ? contextId : patientId}/${
             roomId}/${
             searchText}`).then((resp) => {
                dispatch(onGetAllParticipantsSuccess(resp.data));
                dispatch(isLoading(API_SUCCESS));
            })
.catch((err) => {
                dispatch(isLoading(API_FAILED));
            })
    };
}

export function getLinkedPatients() {
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING));
        let state = getState(),
         userState = state.authState.userState.userInfo;

        AsyncGet(API.getContext + userState.userId).then((resp) => {
            dispatch(getLinkedPatientsSuccess(resp.data));
            dispatch(isLoading(API_SUCCESS));
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED));
        })
      }
  }

export function clearLinkedParticipants() {
    return (dispatch) => {
        dispatch(onClearLinkedParticipants());
    }
}

const onClearLinkedParticipants = () => ({type: TeleHealth.clearLinkedParticipants}),

 onGetParticipantByConfernceIdSuccess = (data) => ({
        type: TeleHealth.getParticipantByConfernceIdSuccess,
        data
    }),

 onGetAllParticipantsSuccess = (data) => ({
        type: TeleHealth.getAllParticipantsSuccess,
        data
    });

export function AddParticipantsToVideoConference(data) {
    return (dispatch, getState) => {
        let state = getState();
        const personalDetailState = state.profileState.PersonalDetailState.personalDetail || {};
        let twilioData = {
            createdByFirstName: personalDetailState.firstName,
            createdByLastName: personalDetailState.lastName,
            roomNumber: state.telehealthState.roomId,
            conferenceId: state.telehealthState.conferenceId,
            participants: data
        };

        dispatch(isLoading(API_FETCHING));
        AsyncPost(API.addParticipants, twilioData).then((resp) => {
            dispatch(isLoading(API_SUCCESS));
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED));
        })
    }
}

export function endConference(onSuccess) {
    return (dispatch, getState) => {
        const {userInfo} = getState().authState.userState;
        let selectedPatientInfo = getSelectedPatientInfo(),
         state = getState().telehealthState;

        dispatch(isLoading(API_FETCHING));
        AsyncPost(API.endConference + state.roomId).then((resp) => {
            dispatch(clearState())
            dispatch(isLoading(API_SUCCESS));
            if (state.startedFromMenu) {
                dispatch(setStartedFromMenuStatus(false))
                if (userInfo.userType === USER_TYPES.CARE_TEAM && selectedPatientInfo.userType !== USER_TYPES.INDIVIDUAL_GUARDIAN && selectedPatientInfo.userType !== USER_TYPES.GUARDIAN && selectedPatientInfo.userType !== USER_TYPES.PATIENT) {	
                    dispatch(resetStack(PATH.CARETEAM_SCREEN))	
                } else if (userInfo.userType === USER_TYPES.CARE_TEAM && (selectedPatientInfo.userType === USER_TYPES.INDIVIDUAL_GUARDIAN || selectedPatientInfo.userType === USER_TYPES.GUARDIAN || selectedPatientInfo.userType === USER_TYPES.PATIENT)) {	
                    dispatch(navigateToScreenMainStack(PATH.INPERSONATE_HOME_SCREEN))	
                } else {
                    dispatch(navigateToScreenMainStack(PATH.HOME_SCREEN))
                }
            } else {
                dispatch(onBack())
            }
            onSuccess && onSuccess()
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED));
        })
    }
}

export const onDeepLinkClick = (data) => ({
        type: TeleHealth.deepLinkClick,
        data
    })
export function setLinkedPatients() {
    return (dispatch, getState) => {
        const patientData = getState().authState.userState.selectedPatientInfo,
         currentPatient = {
            coreoHomeUserId: null,
            firstName: patientData.fullName,
            image: null,
            lastName: '',
            middleName: null,
            participantType: 'I',
            thumbNail: patientData.image,
            thumbNailByte: null,
            userId: patientData.userId,
            userName: null,
            participantId: patientData.patientId
        }

        dispatch(getLinkedPatientsSuccess([currentPatient]));
    }
}

export function deepLinkRoute(data){
    return (dispatch) => {
        dispatch(onDeepLinkClick(data));
        dispatch(navigateToScreenMainStack(data.path));
    }
}

export function getCareTeamIndividualsList() {
    return (dispatch) => {
        const data = {
            attributeProviders: [],
            careTeamId: getCareTeamId(),
            clinicalConditions: [],
            cohorts: [],
            contracts: [],
            fromDate: "01/01/1999",
            gender: 0,
            maximumAge: 0,
            memberContractId: 0,
            minimumAge: 0,
            pageNumber: 1,
            pageSize: 1000000,
            rating: 0,
            sortName: "ModifiedDate",
            sortOrder: "asc",
            statusName: "All",
            toDate: moment(moment().toDate()).format('l')
        }

        dispatch(isLoading(API_FETCHING));
        CareTeamPost(API.getIndividualsList, data).then((resp) => {
            let patients = resp.data && resp.data.map((patient) => ({
                    coreoHomeUserId: patient.coreoHomeUserId,
                    firstName: patient.individualName,
                    image: null,
                    lastName: '',
                    middleName: null,
                    participantType: 'I',
                    thumbNail: patient.thumbNail,
                    thumbNailByte: null,
                    userId: patient.individualId,
                    userName: null
                }));

            dispatch(getLinkedPatientsSuccess(patients));
            dispatch(isLoading(API_SUCCESS));
        })
.catch(() => {
            dispatch(isLoading(API_FAILED));
        })
    }
  }

export function rejectConference(roomId) {
    return (dispatch, getState) => {
          let {userInfo} = getState().authState.userState,
           id = userInfo.userId,
           userType = userInfo.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : userInfo.userType,
           participantId = userInfo.userType === USER_TYPES.CARE_TEAM ? getCareTeamId() : userInfo.patientId,
           data = {
            participantId,
            participantType: userType,
            roomNumber: roomId,
            coreoHomeuserId: id
          };

          dispatch(isLoading(API_FETCHING));
          AsyncPut(API.rejectConference, data).then((resp) => {
            dispatch(isLoading(API_SUCCESS));
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED));
        })
      }
}

export function checkTeleHealth(data) {
    return (dispatch, getState) => {
        const teleHealthState = getState().telehealthState;

        if (data.messageType === 'Ended' && teleHealthState.roomId === data.roomID && teleHealthState.token && !teleHealthState.initiator) {
            dispatch(leaveVideoConference())
        }
    }
}