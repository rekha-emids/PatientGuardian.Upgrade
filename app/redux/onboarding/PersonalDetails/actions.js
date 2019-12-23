import {PATH} from '../../../routes';
import {clearState as profileTypeClear} from '../ProfileType/actions';
import { navigateToScreenMainStack } from '../../navigation/actions';
import {clearState as memberDetailsClear} from '../MemberDetails/actions';

export const PersonalDetailsType = {
    cancelClick: 'cancel_click/personaldetails',
    nextClick: 'next_click/personaldetails',
    clearState: 'clear_state/personaldetails'
};

export const clearState = () => ({type: PersonalDetailsType.clearState})

export const nextClick = (data) => ({
        type: PersonalDetailsType.nextClick,
        data
    })
export const cancelClick = () => ({type: PersonalDetailsType.cancelClick})

export function onNextClick(data){
    return (dispatch) => {
        dispatch(nextClick(data));
        dispatch(navigateToScreenMainStack(PATH ? PATH.SET_USERID_SCREEN : null));
    }
}

export function onCancelClick(){
    return (dispatch) => {
        dispatch(cancelClick());
        dispatch(profileTypeClear());
        dispatch(memberDetailsClear());
        dispatch(navigateToScreenMainStack(PATH.WELCOME_SCREEN));
    }
}