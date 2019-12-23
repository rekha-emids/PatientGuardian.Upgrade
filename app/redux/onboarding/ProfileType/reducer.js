import {
    ProfileType
} from './actions'

const defaultState = {
    profileType: '',
    selectedRelationId: null,
    selectedRelationValue: null
},

 profileTypeState = (state = defaultState, action) => {
    switch (action.type) {
        case ProfileType.nextClick:
            return {
                ...state,
                profileType: action.data.profileType,
                selectedRelationId: action.data.selectedRelationId,
                selectedRelationValue: action.data.selectedRelationValue
            };
        case ProfileType.setProfileType:
            return {
                ...state,
                profileType: action.data
            };
        case ProfileType.setRelationship:
            return {
                ...state,
                selectedRelationValue: action.data
            };
        case ProfileType.cancelClick:
            return defaultState;
        case ProfileType.clearState:
            return defaultState;
        default:
            return state;
    }
}

export default profileTypeState;
