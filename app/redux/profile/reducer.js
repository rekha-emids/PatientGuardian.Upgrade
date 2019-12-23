import { combineReducers } from 'redux';
import SkillsState from './Skills/reducer';
import LanguagesState from './Languages/reducer';
import PersonalDetailState from './PersonalDetail/reducer'
import ClinicalConditionState from './ClinicalCondition/reducer'
import PointServiceState from './PointService/reducer'
import CoreoAssociationState from './CoreoAssociation/reducer'

export const profileState = combineReducers({
    PointServiceState,
    LanguagesState,
    SkillsState,
    ClinicalConditionState,
    PersonalDetailState,
    CoreoAssociationState
});
