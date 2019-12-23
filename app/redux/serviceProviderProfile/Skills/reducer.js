import {
    Skills
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    selectedSkillsList: [],
    getSkillStatus: API_INITIAL
},

 SkillsState = (state = defaultState, action) => {
    switch (action.type) {
        case Skills.getSelectedSkillsDetails:
            return {
                ...state,
                selectedSkillsList: action.data.skills
            };
        case Skills.changeAPIStatus:
            return {
              ...state,
              getSkillStatus: action.data
            }
        case Skills.clearSkillsState:
            return defaultState;
        default:
            return state;
    }
}

export default SkillsState;
