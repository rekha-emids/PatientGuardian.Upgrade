import { store } from '../redux/store';
import { USER_TYPES } from '../constants/constants';
import {_} from '../utils/validations'
export const getUserState = () => store && store.getState().authState.userState

export const getProfileState = () => store && store.getState().profileState.PersonalDetailState

export const getUserInfo = () => getUserState() && getUserState().userInfo

export const getSelectedPatientInfo = () => getUserState() && getUserState().selectedPatientInfo


export const getPatientInfo = () => {
    if (getUserInfo().userType === USER_TYPES.PATIENT || getUserInfo().userType === USER_TYPES.CARE_TEAM) {
        return getUserInfo();
    } else {
        return getSelectedPatientInfo();
    }
}

export const isPatientGuardian = () => getPatientInfo().userType === USER_TYPES.GUARDIAN

export const getCareTeamId = () => getUserInfo() && getUserInfo().careTeamId;

 export const getUserIdAndType = () => {
    let userId = getUserInfo() && getUserInfo().userId;
    let userType = getUserInfo() && getUserInfo().userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : getUserInfo() && getUserInfo().userType;
    let patientId = getUserInfo() && getUserInfo().patientId

    if (userType === USER_TYPES.CARE_TEAM || userType === USER_TYPES.GUARDIAN){
        if (!_.isNil(getSelectedPatientInfo().patientId)){
          userId = getSelectedPatientInfo().userId
          userType = getSelectedPatientInfo().userType ===  USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : getSelectedPatientInfo().userType;
         patientId = getSelectedPatientInfo().patientId
        }
      }
    return {userId, userType, patientId}
 }