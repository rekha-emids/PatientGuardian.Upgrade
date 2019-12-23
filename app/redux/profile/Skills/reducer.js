import {
    Skills
} from './actions'

import {normalizeData} from '../../../utils/appUtils'
import _ from 'lodash'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    SkillsList: [],
    selectedSkillsList: [],
    updatedSkills: {},
    serviceProviderId: -1,
    isLoading: API_INITIAL
},

 SkillsState = (state = defaultState, action) => {
    switch (action.type) {

        case Skills.getSkillsSuccess:
            return {
                ...state,
                SkillsList: action.data
            }; 

        case Skills.getSelectedSkillsDetails:
            return {
                ...state,
                selectedSkillsList: action.data.skills,
                updatedSkills: normalizeData(action.data.skills, "id"),
                serviceProviderId: action.data.serviceProviderId
            };
        case Skills.addSkills:
            let skills = {...state.updatedSkills};

            if (_.isNil(skills[action.data.attributeId])) {
                skills = {
                    ...skills,
                    [action.data.attributeId]: action.data
                }
            } else {
                delete skills[action.data.attributeId]
            }
            return {
                ...state,
                updatedSkills: skills
            }
            case Skills.resetUpdatedSkills:
                return {
                    ...state,
                    updatedSkills: action.data
                }
            case Skills.loadingStatus:
                return {
                    ...state,
                    isLoading: action.data
                }
        default:
            return state;
    }
}

export default SkillsState;
