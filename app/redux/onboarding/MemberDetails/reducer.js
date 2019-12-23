import {
    MemberDetails
} from './actions'

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
    }
},

 memberDetailsState = (state = defaultState, action) => {
    switch (action.type) {
        case MemberDetails.nextClick:
            return {
                ...state,
                planId: action.data.searchData.planId,
                lastName: action.data.searchData.lastname,
                memberId: action.data.searchData.memberId,
                dob: action.data.searchData.dob,
                profileData: action.data.profileData
            };
        case MemberDetails.getPlansSuccess:
            return {
                ...state,
                plans: action.data,
                getPlansSuccess: true,
                getPlansError: false
            };
        case MemberDetails.getPlansError:
            return {
                ...state,
                plans: [],
                getPlansSuccess: false,
                getPlansError: true
            };
        case MemberDetails.searchMembersSuccess:
            return {
                ...state,
                patientProfiles: action.data,
                searchMembersSuccess: true,
                searchMembersError: false
            };
        case MemberDetails.searchMembersError:
            return {
                ...state,
                patientProfiles: [],
                searchMembersSuccess: false,
                searchMembersError: true
            };
        case MemberDetails.formDirty:
            return {
                ...state,
                searchMembersSuccess: false,
                searchMembersError: false
            };
        case MemberDetails.resetClick:
            return {
                ...state,
                planId: null,
                lastName: '',
                memberId: '',
                dob: '',
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
        case MemberDetails.createPatientSuccess:
            return {
                ...state,
                createPatientSuccess: true,
                createPatientError: false
            };
        case MemberDetails.createPatientError:
            return {
                ...state,
                createPatientSuccess: false,
                createPatientError: true
            };
        case MemberDetails.cancelClick:
            return defaultState;
        case MemberDetails.clearState:
            return defaultState;
        default:
            return state;
    }
}

export default memberDetailsState;
