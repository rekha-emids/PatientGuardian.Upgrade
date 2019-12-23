import {PATH} from '../../../routes';
import {clearState as profileTypeClear} from '../ProfileSelection/actions';
import { navigateToScreenMainStack } from '../../navigation/actions';
import {clearState as memberDetailsClear} from '../MemberDetailsForMC/actions';

export const PersonalDetailsForMCType = {
    cancelClick: 'cancel_click/personaldetails',
    nextClick: 'next_click/personaldetails',
    clearState: 'clear_state/personaldetails'
};

export const clearState = () => ({type: PersonalDetailsForMCType.clearState})

export const nextClick = (data) => ({
        type: PersonalDetailsForMCType.nextClick,
        data
    })
export const cancelClick = () => ({type: PersonalDetailsForMCType.cancelClick})

export function onNextClick(data){
    return (dispatch) => {
        dispatch(nextClick(data));
        dispatch(navigateToScreenMainStack(PATH.SET_USERID_SCREEN));
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