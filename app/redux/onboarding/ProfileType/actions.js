import { navigateToScreenMainStack } from '../../navigation/actions';
import {PATH} from '../../../routes';
import { UserProfileType } from '../../../constants/constants';

export const ProfileType = {
    nextClick: 'next_click/profiletype',
    cancelClick: 'cancel_click/profiletype',
    clearState: 'clear_state/profiletype',
    setProfileType: 'set_profile_type/profiletype',
    setRelationship: 'set_relationship/profiletype'
};

export const setRelationship = (data) => ({
        type: ProfileType.setRelationship,
        data
    })

export const nextClick = (data) => ({
        type: ProfileType.nextClick,
        data
    })

export const cancelClick = () => ({type: ProfileType.cancelClick})

export const clearState = () => ({type: ProfileType.clearState})

export const setProfileType = (data) => ({
        type: ProfileType.setProfileType,
        data
    })

export function onNextClick(data){
    return (dispatch, getState) => {
        dispatch(nextClick(data));
        if (data.profileType === UserProfileType.Individual) {
            dispatch(navigateToScreenMainStack(PATH.SET_USERID_SCREEN));
        } else if (data.profileType === UserProfileType.Guardian) {
            dispatch(navigateToScreenMainStack(PATH.PERSONAL_DETAILS_SCREEN));
        }
    }
}

export function onCancelClick(){
    return (dispatch, getState) => {
        dispatch(cancelClick());
        dispatch(navigateToScreenMainStack(PATH ? PATH.WELCOME_SCREEN : null));
    }
}


    