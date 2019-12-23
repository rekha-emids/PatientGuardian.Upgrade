import {
    ProfileTypeSelection
} from './actions'

const defaultState = {
    profileType: '',
    selectedRelationId: null,
    selectedRelationValue: null
},

 profileTypeSelectionState = (state = defaultState, action) => {
    switch (action.type) {
        case ProfileTypeSelection.nextClick:
            return {
                ...state,
                profileType: action.data.profileType,
                selectedRelationId: action.data.selectedRelationId,
                selectedRelationValue: action.data.selectedRelationValue
            };
        case ProfileTypeSelection.setProfileType:
            return {
                ...state,
                profileType: action.data
            };
        case ProfileTypeSelection.setRelationship:
            return {
                ...state,
                selectedRelationValue: action.data
            };
        case ProfileTypeSelection.cancelClick:
            return defaultState;
        case ProfileTypeSelection.clearState:
            return defaultState;
        default:
            return state;
    }
}

export default profileTypeSelectionState;
