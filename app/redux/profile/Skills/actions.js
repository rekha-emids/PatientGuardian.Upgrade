
import { API, baseURL } from '../../../services/api';
import {getArrayFromNormalizedData} from '../../../utils/appUtils'
import {checkUserData} from '../../auth/Login/actions';
import { getProfilePercentage } from '../PersonalDetail/actions';
import { API_FETCHING, API_SUCCESS, API_FAILED } from '../../../constants/AppAPIConstants';
import { Get, Post } from '../../../services/http';


export const Skills = {
    getSkillsSuccess: 'get_skills_success/skills',
    getSelectedSkillsDetails: 'get_selected_skills_details/skills',
    addSkills: 'add_skills/skills',
    resetUpdatedSkills: 'reset_updated_skills/skills',
    loadingStatus: 'skills/isLoading'
};

export const isLoading = (data) => ({
        type: Skills.loadingStatus,
        data
    })

export const getSkillsSuccess = (data) => ({
        type: Skills.getSkillsSuccess,
        data
    })

export const getSelectedSkillsDetails = (data) => ({
        type: Skills.getSelectedSkillsDetails,
        data
    })

export const resetUpdatedSkills = (data) => ({
        type: Skills.resetUpdatedSkills,
        data
    })

export function getSkills() {
    return (dispatch, getState) => {
        dispatch(isLoading(API_FETCHING))
        Get(API.getAllClinicalCondition).then((resp) => {
            dispatch(getSkillsSuccess(resp.data))
            dispatch(isLoading(API_SUCCESS))
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}

export function updateSkills(onSuccess) {
    return (dispatch, getState) => {
        let {SkillsState} = getState().profileState,
         serviceProviderId = getState().authState.userState.patientId,
         modal = {
            serviceProviderId,
            skills: getArrayFromNormalizedData(SkillsState.updatedSkills)
        };

        dispatch(isLoading(API_FETCHING))
        Post(`${baseURL + API.addSkills + serviceProviderId}/Clinical`, modal).then((resp) => {
            dispatch(getSelectedSkills());
            dispatch(getProfilePercentage())
            dispatch(isLoading(API_SUCCESS))
            onSuccess && onSuccess();
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }  
}

export function addSkills(data) {
    return {
        type: Skills.addSkills,
        data
    }
}

export function getSelectedSkills() {
    return (dispatch, getState) => {
        dispatch(checkUserData());
        let serviceProviderId = getState().authState.userState.patientId;

        dispatch(isLoading(API_FETCHING))
        Get(`${baseURL + API.addSkills + serviceProviderId}/Clinical`).then((resp) => {
            dispatch(getSelectedSkillsDetails(resp.data))
            dispatch(isLoading(API_SUCCESS))
        })
.catch((err) => {
            dispatch(isLoading(API_FAILED))
        })
    }
}
