import { User } from './actions';
import { API_INITIAL } from '../../../constants/AppAPIConstants';
import { USER_TYPES } from '../../../constants/constants';

const defaultState = {
    userId: null,
    authData: {},
    userEmail: "",
    patientId: null,
    userType: "",
    autoLogoutTime: 0,
    patientImage: {},
    patientName: {},
    individualList: [],
    userInfo: {},
    roles: {},
    getPatientImageStatus: API_INITIAL,
    selectedPatientInfo: {},
    impersinated: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case User.setUserData:
            return {
                ...state,
                ...action.data,
                authData: action.data.authData,
                userEmail: action.data.emailId,
                patientId: action.data.patientId,
                userId: action.data.userId,
                userType: action.data.userType,
                userInfo: {
                    ...action.data.userInfo,
                    patientId: action.data.userType === USER_TYPES.GUARDIAN ? action.data.userInfo.coreoHomeUserId : action.data.userInfo.patientId
                }
            };
        case User.setAutoLogout:
            return {
                ...state,
                autoLogoutTime: action.data
            };
        case User.setSelectedPatient: {

            return {
                ...state,
                patientId: action.data.patientId ? action.data.patientId : state.patientId,
                patientName: {
                    firstName: action.data.firstName,
                    lastName: action.data.lastName
                },
                patientImage: {image: action.data.image},
                userId: action.data.coreoHomeUserId ? action.data.coreoHomeUserId : state.coreoHomeUserId,
                userEmail: action.data.email ? action.data.email : state.email,
                selectedPatientInfo: action.data,
                userType: action.data.userType ? action.data.userType : state.userType
            };

        }

        case User.setGuardianUserImage: {
            return {
                ...state,
                userImage: action.data.image
            };

        }

        case User.setPatientUserImage: {

            return {
                ...state,
                userImage: action.data.data.image,
                patientImage: {image: action.data.data.image}

            };

        }

        case User.getIndividualSuccess:
            return {
                ...state,
                individualList: action.data
                // patientId: action.data && action.data[0].patientId
            };
        case User.clearData:
            return defaultState;
        case User.getPatientImage:
            return {
                ...state,
                patientImage: action.data
            };

        case User.getPatientDetails:
            return {
                ...state,
                patientName: action.data
            }
        case User.setUserRoles:
            return {
                ...state,
                roles: action.data
            }
        case User.changeAPIStatus:
            return {
                ...state,
                getPatientImageStatus: action.data
            }
        case User.impersinated:
            return {
                ...state,
                impersinated: true
            }
        case User.clearImpersination:
            return {
                ...state,
                impersinated: false
            }
        case User.clearSelectedPatient:
            return {
                ...state,
                selectedPatientInfo: state.userInfo
            }
        case User.setCompleteData:
            return {
                ...state,
                userId: action.data.userId || state.userId,
                authData: action.data.authData || state.authData,
                userEmail: action.data.userEmail || state.userEmail,
                patientId: action.data.patientId || state.patientId,
                userType: action.data.userType || state.userType,
                autoLogoutTime: action.data.autoLogoutTime || state.autoLogoutTime,
                patientImage: action.data.patientImage || state.patientImage,
                patientName: action.data.patientName || state.patientName,
                individualList: action.data.individualList || state.individualList,
                userInfo: action.data.userInfo || state.userInfo,
                roles: action.data.roles || state.roles,
                getPatientImageStatus: API_INITIAL,
                selectedPatientInfo: action.data.selectedPatientInfo || state.selectedPatientInfo,
                impersinated: action.data.impersinated || state.impersinated

            }
        case User.introvideolink:
            return {
                ...state,
                introVideoUrl: action.data.introVideoLink,
                isVideoPlayed: action.data.isIntroVideoPlayed
            }
        case User.updateVideoPlayedStatus:
            return {
                ...state,
                isVideoPlayed: action.data
            }
        default:
            return state;
    }
}