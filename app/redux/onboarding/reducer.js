import { combineReducers } from 'redux';
import welcomeState from './Welcome/reducer';
import profileTypeState from './ProfileType/reducer';
import memberDetailsState from './MemberDetails/reducer';
import setUserIdState from './SetUserId/reducer';
import setPasswordState from './SetPassword/reducer';
import addGuardianState from './AddGuardian/reducer';
import personalDetailsState from './PersonalDetails/reducer';

export const onboardingState = combineReducers({
    welcomeState,
    profileTypeState,
    memberDetailsState,
    setUserIdState,
    setPasswordState,
    addGuardianState,
    personalDetailsState
});
