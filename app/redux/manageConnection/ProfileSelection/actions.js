import { navigateToScreenMainStack, onBack } from '../../navigation/actions';
import {PATH} from '../../../routes';
import { UserProfileType } from '../../../constants/constants';

export const ProfileTypeSelection = {
    nextClick: 'next_click/profiletypeSelection',
    cancelClick: 'cancel_click/profiletypeSelection',
    clearState: 'clear_state/profiletypeSelection',
    setProfileType: 'set_profile_type/profiletypeSelection',
    setRelationship: 'set_relationship/profiletypeSelection'
};

export const setRelationship = (data) => ({
        type: ProfileTypeSelection.setRelationship,
        data
    })

export const nextClick = (data) => ({
        type: ProfileTypeSelection.nextClick,
        data
    })

export const cancelClick = () => ({type: ProfileTypeSelection.cancelClick})

export const clearState = () => ({type: ProfileTypeSelection.clearState})

export const setProfileType = (data) => ({
        type: ProfileTypeSelection.setProfileType,
        data
    })

export function onNextClick(data){
    return (dispatch, getState) => {
        dispatch(nextClick(data));
        if (data.profileType === UserProfileType.Individual) {
            dispatch(navigateToScreenMainStack(PATH.ADD_MEMBER_DETAILS));
        } else if (data.profileType === UserProfileType.Guardian) {
            dispatch(navigateToScreenMainStack(PATH.ADD_MEMBER_DETAILS));
        }
    }
}

export function onCancelClick(){
    return (dispatch, getState) => {
        dispatch(cancelClick());
        dispatch(onBack())
    }
}


    
