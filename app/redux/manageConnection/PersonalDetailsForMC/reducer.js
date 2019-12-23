import {
    PersonalDetailsForMCType
} from './actions'

const defaultState = {
    firstName: '',
    lastName: '',
    contactNumber: ''
},

 personalDetailsForMCState = (state = defaultState, action) => {
    switch (action.type) {
        case PersonalDetailsForMCType.nextClick:
            return {
                ...state,
                firstName: action.data.firstName,
                lastName: action.data.lastName,
                contactNumber: action.data.contactNumber
            };
        case PersonalDetailsForMCType.cancelClick:
            return defaultState;
        case PersonalDetailsForMCType.clearState:
            return defaultState;
        default:
            return state;
    }
}

export default personalDetailsForMCState;
