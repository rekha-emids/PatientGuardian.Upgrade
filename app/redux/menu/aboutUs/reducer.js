import {
    aboutUsReducer
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    contentCode: null,
    buildVersion: null,
    loadingStatus: API_INITIAL
},

 aboutUsState = (state = defaultState, action) => {
    switch (action.type) {
        case aboutUsReducer.getAboutUsSuccess:
            return {
                ...state,
                contentCode: action.data.aboutUsContent,
                buildVersion: action.data.buildVersion
            }
        case aboutUsReducer.changeLoadingStatus:
            return {
                ...state,
                loadingStatus: action.data
            }
        default:
            return state;
    }
}

export default aboutUsState