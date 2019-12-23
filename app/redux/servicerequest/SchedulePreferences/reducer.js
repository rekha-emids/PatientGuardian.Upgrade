import {
    SchedulePreferences
} from './actions';
import { API_INITIAL, API_SUCCESS } from '../../../constants/AppAPIConstants';

const defaultState = {
    scheduleType: [],
    genderType: [],
    recurringpatternType: [],
    slotType: [],
    singleslotType: [],
    daysType: [],
    statesType: [],
    patientAddressType: [],
    sendpatientAddressType: [],
    schedulePreferencesObj: {},
    getPatientAddressStatus: API_INITIAL
},

 schedulepreferencesState = (state = defaultState, action) => {
    switch (action.type) {
        case SchedulePreferences.nextClick:
            return {
                ...state,
                schedulePreferencesObj: action.data
            };
        case SchedulePreferences.previousClick:
            return state;

        case SchedulePreferences.cancelClick:
            return {
                ...state,
                schedulePreferencesObj: {}
            };
        case SchedulePreferences.getScheduleTypeSuccess:
            return {
                ...state,
                scheduleType: action.data
            };
        case SchedulePreferences.getGenderSuccess:
            return {
                ...state,
                genderType: action.data
            };
       
        case SchedulePreferences.getRecurringPatternSuccess:
            return {
                ...state,
                recurringpatternType: action.data
            };
        case SchedulePreferences.getSlotSuccess:
            return {
                ...state,
                slotType: action.data
            };
        case SchedulePreferences.getsingleSlotSuccess:
            return {
                ...state,
                singleslotType: action.data
            };
        case SchedulePreferences.getDaysSuccess:
            return {
                ...state,
                daysType: action.data
            };
        case SchedulePreferences.getStatesSuccess:
            return {
                ...state,
                statesType: action.data
            };
        case SchedulePreferences.getPatientSuccess:
            return {
                ...state,
                patientAddressType: action.data,
                getPatientAddressStatus: API_SUCCESS
            };
        case SchedulePreferences.sendPatientSuccess:
            return {
                ...state,
                sendpatientAddressType: action.data
            };
        case SchedulePreferences.changeAPIStatus:
            return {
                ...state,
                getPatientAddressStatus: action.data
            }
        default:
         return state;
    }
}

export default schedulepreferencesState;
