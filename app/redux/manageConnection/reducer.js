import { combineReducers } from 'redux';
import manageConnectionDataState from './ManageConnectionData/reducer';
import profileTypeSelectionState from './ProfileSelection/reducer';
import memberDetailsForMCState from './MemberDetailsForMC/reducer';
import setPasswordForMCState from './SetPasswordForMC/reducer';
import addGuardianDetailsState from './AddGuardianDetails/reducer';
import personalDetailsForMCState from './PersonalDetailsForMC/reducer';

export const manageConnectionState = combineReducers({
    manageConnectionDataState,
    profileTypeSelectionState,
    memberDetailsForMCState,
    setPasswordForMCState,
    addGuardianDetailsState,
    personalDetailsForMCState
});