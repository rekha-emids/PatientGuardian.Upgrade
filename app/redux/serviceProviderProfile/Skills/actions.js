import { API } from '../../../services/api';
import {SpGet} from '../../../services/http';
import {API_FETCHING, API_SUCCESS, API_FAILED} from '../../../constants/AppAPIConstants';
import { NETWORK_ERROR } from '../../../constants/error';
import { storeSpSelectedSkills, getOfflineSpSelectedSkills } from '../../../offline/SPProfile/spSelectedSkills';

export const Skills = {
    getSelectedSkillsDetails: 'get_selected_skills_details/spSkills',
    changeAPIStatus: "changeAPIStatus/spSkills",
    clearSkillsState: 'clearSkillsState/spSkills'
};

export const clearSkillsState = () => ({type: Skills.clearSkillsState})

export const getSelectedSkillsDetails = (data) => ({
        type: Skills.getSelectedSkillsDetails,
        data
    })

export const changeAPIStatus = (data) => ({
      type: Skills.changeAPIStatus,
      data
    })

export function getSelectedSkills(spId, onApiSuccess, onFailure) {
    return (dispatch) => {
        dispatch(changeAPIStatus(API_FETCHING))
        SpGet(`${API.addSPSkills + spId}/Skills`).then((resp) => {
            __DEV__ && console.log("selected skills is: ", resp.data)
            storeSpSelectedSkills(resp.data).then((res) => {
                onApiSuccess && onApiSuccess()
            })
.catch((err) => {
                onFailure && onFailure()
            })
            dispatch(getSelectedSkillsDetails(resp.data))
            dispatch(changeAPIStatus(API_SUCCESS))
        })
.catch((err) => {
            if (err.message === NETWORK_ERROR){
                getOfflineSpSelectedSkills(spId).then((res) => {
                    dispatch(getSelectedSkillsDetails(res))
                    dispatch(changeAPIStatus(API_SUCCESS))
                })
.catch((err) => {
                    dispatch(changeAPIStatus(API_FAILED))
                })
            } else {
                onFailure && onFailure()
                dispatch(changeAPIStatus(API_FAILED))
            }
            
        })
    }
}
