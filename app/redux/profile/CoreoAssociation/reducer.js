import {
    CoreoAssociation
} from './actions'
import _ from 'lodash'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    CoreoAssociationData: {},   
    isLoading: API_INITIAL,
    heightWeightData: {}
},

 CoreoAssociationState = (state = defaultState, action) => {
    switch (action.type) {
        case CoreoAssociation.getCoreoAssociationSuccess:
            return {
                ...state,
                CoreoAssociationData: action.data
            }; 

        case CoreoAssociation.getHeightWeightSuccess:
            return {
                ...state,
                heightWeightData: action.data
        }; 
        default:
            return state;
    }
}

export default CoreoAssociationState;
