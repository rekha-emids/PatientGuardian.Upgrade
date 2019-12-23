import {
    MemberDetailsForMC
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    plans: [],
    planId: null,
    lastName: '',
    memberId: '',
    dob: null,
    patientProfiles: [],
    getPlansSuccess: false,
    getPlansError: false,
    searchMembersSuccess: false,
    searchMembersError: false,
    createPatientSuccess: false,
    createPatientError: false,
    profileData: {
        firstname: '',
        lastname: '',
        memberId: '',
        mpi: '',
        dob: '',
        gender: ''
    },
    isLoadingMemberDetails: API_INITIAL
},

 memberDetailsForMCState = (state = defaultState, action) => {
    switch (action.type) {
        case MemberDetailsForMC.nextClick:
            return {
                ...state,
                planId: action.data.searchData.planId,
                lastName: action.data.searchData.lastname,
                memberId: action.data.searchData.memberId,
                dob: action.data.searchData.dob,
                profileData: action.data.profileData
            };
        case MemberDetailsForMC.getPlansSuccess:
            return {
                ...state,
                plans: action.data,
                getPlansSuccess: true,
                getPlansError: false
            };
        case MemberDetailsForMC.getPlansError:
            return {
                ...state,
                plans: [],
                getPlansSuccess: false,
                getPlansError: true
            };
        case MemberDetailsForMC.searchMembersSuccess:
            return {
                ...state,
                patientProfiles: action.data,
                searchMembersSuccess: true,
                searchMembersError: false
            };
        case MemberDetailsForMC.searchMembersError:
            return {
                ...state,
                patientProfiles: [],
                searchMembersSuccess: false,
                searchMembersError: true
            };
        case MemberDetailsForMC.formDirty:
            return {
                ...state,
                searchMembersSuccess: false,
                searchMembersError: false
            };
        case MemberDetailsForMC.resetClick:
            return {
                ...state,
                planId: null,
                lastName: '',
                memberId: '',
                dob: null,
                patientProfiles: [],
                getPlansSuccess: false,
                getPlansError: false,
                searchMembersSuccess: false,
                searchMembersError: false,
                profileData: {
                    firstName: '',
                    lastName: '',
                    memberId: '',
                    mpi: '',
                    dob: '',
                    gender: ''
                }
            };
        case MemberDetailsForMC.createPatientSuccess:
            return {
                ...state,
                createPatientSuccess: true,
                createPatientError: false
            };
        case MemberDetailsForMC.createPatientError:
            return {
                ...state,
                createPatientSuccess: false,
                createPatientError: true
            };
        case MemberDetailsForMC.cancelClick:
            return defaultState;
        case MemberDetailsForMC.clearState:
            return defaultState;

        case MemberDetailsForMC.loadingStatus:
            return {
                ...state,
                isLoadingMemberDetails: action.data
            }
        default:
            return state;
    }
}

export default memberDetailsForMCState;
