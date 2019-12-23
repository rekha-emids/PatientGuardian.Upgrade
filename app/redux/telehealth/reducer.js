import {
    TeleHealth
} from './actions'
import { API_INITIAL } from '../../constants/AppAPIConstants';

const defaultState = {
    token: null,
    roomId: '',
    linkedParticipants: [],
    linkedPatients: [],
    conferenceId: 0,
    allParticipants: [],
    participantsByConferenceId: [],
    initiator: false,
    contextId: 0,
    isLoading: API_INITIAL,
    startedFromMenu: false
},

 telehealthState = (state = defaultState, action) => {
    switch (action.type) {
        case TeleHealth.generateTokenSuccess:
            return {
                ...state,
                token: action.data
            };
        case TeleHealth.setLinkedParticipants:
            return {
                ...state,
                linkedParticipants: action.data
            };
        case TeleHealth.setLinkedPatients:
            return {
                ...state,
                linkedPatients: action.data
            };
        case TeleHealth.clearLinkedParticipants:
            return {
                ...state,
                linkedParticipants: []
            };
        case TeleHealth.getRoomIdSuccess:
            return {
                ...state,
                roomId: action.data.roomNumber,
                conferenceId: action.data.videoConferenceId,
                initiator: true
            };
        case TeleHealth.getParticipantByConfernceIdSuccess:
            return {
                ...state,
                participantsByConferenceId: action.data
            };
        case TeleHealth.getAllParticipantsSuccess:
            return {
                ...state,
                linkedParticipants: action.data
            };
        case TeleHealth.setRoomId:
            return {
                ...state,
                roomId: action.data
            };
        case TeleHealth.deepLinkClick:
            return {
                ...state,
                roomId: action.data.roomId
            }
        case TeleHealth.setContext:
            return {
                ...state,
                contextId: action.data
            };
        case TeleHealth.clearState:
            return {
                ...state,
                roomId: '',
                conferenceId: 0,
                linkedParticipants: [],
                allParticipants: [],
                participantsByConferenceId: [],
                initiator: false,
                contextId: 0,
                isLoading: API_INITIAL
            };
        case TeleHealth.loadingStatus:
            return {
                ...state,
                isLoading: action.data
            }
        case TeleHealth.setStartedFromMenuStatus:
            return {
                ...state,
                startedFromMenu: action.data
            }
        default:
            return state;
    }
}

export default telehealthState;