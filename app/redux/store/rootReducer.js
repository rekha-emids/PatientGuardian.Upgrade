import { combineReducers } from 'redux';
import {onboardingState} from '../onboarding/reducer';
import {authState} from '../auth/reducer';
import deviceInfo from '../device/reducer';
import loadingState from '../loading/reducer';
import {visitSelectionState} from '../visitSelection/reducer'
import { DashboardState } from '../dashboard/reducer';
import {visitHistoryState} from '../visitHistory/reducer'
import {servicerequestState} from '../servicerequest/reducer'
import {serviceProvidersTabState} from '../serviceProvidersTab/reducer'
import {manageConnectionState} from '../manageConnection/reducer'
import {careTeamState} from '../careTeam/reducer'
import {
	createNavigationReducer
} from 'react-navigation-redux-helpers';
import telehealthState from '../telehealth/reducer'
import {AppStackRoot} from '../../routes';
import {NotificationState} from '../Notifications/reducer';
import {menuState} from '../menu/reducer';
import { reducer as form } from 'redux-form';
import { profileState } from '../profile/reducer';
import { impersonateProfileState } from '../serviceProviderProfile/reducer';
import asyncMessageState from '../asyncMessages/reducer';
import {networkReducer} from "../network/reducer"
import {navigateToLoginReducer} from "../auth/navigatedToLogin/reducer";
import {syncServerState} from "../syncToServer/reducer"
import { LOGOUT } from '../auth/Logout/actions';
const navigationState = createNavigationReducer(AppStackRoot),

 appReducer = combineReducers({
	navigationState,
	deviceInfo,
	authState,
	form,
	profileState,
	onboardingState,
	loadingState,
	visitSelectionState,
	dashboardState: DashboardState,
	DashboardState,
	visitHistoryState,
	servicerequestState,
	serviceProvidersTabState,
	manageConnectionState,
	careTeamState,
	telehealthState,
	NotificationState,
	menuState,
	asyncMessageState,
	navigateToLoginReducer,
	networkReducer,
	impersonateProfileState,
	syncServerState
}),

 rootReducer = (state, action) => {
	if (action.type === LOGOUT.end){
		state = undefined
	}
	return appReducer(state, action)
}


export default rootReducer
