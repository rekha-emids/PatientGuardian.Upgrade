import {
    PersonalDetailsType
} from './actions'

const defaultState = {
    firstName: '',
    lastName: '',
    contactNumber: ''
},

 PersonalDetailsState = (state = defaultState, action) => {
    switch (action.type) {
        case PersonalDetailsType.nextClick:
            return {
                ...state,
                firstName: action.data.firstName,
                lastName: action.data.lastName,
                contactNumber: action.data.contactNumber
            };
        case PersonalDetailsType.cancelClick:
            return defaultState;
        case PersonalDetailsType.clearState:
            return defaultState;
        default:
            return state;
    }
}

export default PersonalDetailsState;
