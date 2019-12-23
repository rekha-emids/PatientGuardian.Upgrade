import {
    Favourite
} from './actions'
import { API_INITIAL, API_SUCCESS } from '../../../constants/AppAPIConstants';

const defaultState = {
   serviceProviders: [],
   getFavSPStatus: API_INITIAL
},

 favoriteState = (state = defaultState, action) => {
    switch (action.type) {
        case Favourite.getFavouriteServiceProvidersSuccess:
            return {
                ...state,
                serviceProviders: action.data,
                getFavSPStatus: API_SUCCESS
            }
            case Favourite.changeAPIStatus:
            return {
                ...state,
                [action.data.key]: action.data.status
            }
        default:
            return state;
    }
}

export default favoriteState;
