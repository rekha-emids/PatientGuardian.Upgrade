import { NavigationActions, StackActions } from 'react-navigation';
import { OFFLINE_SCREENS, VIDEO_CONFERENCE, ABOUT_US_TITLE, VISIT_HISTORY, CONVERSATION_SUMMARY, MY_CONNECTIONS, PAYMENTS_TITLE, NOTIFICATION_SETTINGS, SERVICE_REQUESTS, SERVICE_PROVIDERS, SUPPORT } from '../../constants/constants';
import { PATH } from '../../routes';
import {caseInsensitiveComparer} from '../../utils/appUtils'

export function navigateToScreenMainStack(screen, params = {}) {
  return (dispatch, getState) => {
    if (!NavigationActions) {
return null 
}
    let action =  NavigationActions.navigate({ routeName: screen, params })
    const routes = getState() && getState().navigationState && getState().navigationState.routes
    const lastRoute = routes && routes.length && routes[routes.length - 1]

    if (lastRoute && caseInsensitiveComparer(screen, lastRoute.routeName) && params && params.notificationAction) {
        action = StackActions.replace({ routeName: screen, params })
    }
    const network = getState().networkReducer.network

    if (network === false) {
      switch (screen) {
        case OFFLINE_SCREENS.ABOUT_US:
          params = { screen: ABOUT_US_TITLE }
          action = NavigationActions.navigate({ routeName: PATH.OFFLINESCREEN, params })
          dispatch(action);
          break;
        case OFFLINE_SCREENS.START_VIDEO_CONFERENCE:
          params = { screen: VIDEO_CONFERENCE }
          action = NavigationActions.navigate({ routeName: PATH.OFFLINESCREEN, params })
          dispatch(action);
          break;
        case OFFLINE_SCREENS.VISIT_HISTORY:
          params = { screen: VISIT_HISTORY }
          action = NavigationActions.navigate({ routeName: PATH.OFFLINESCREEN, params })
          dispatch(action);
          break;
        case OFFLINE_SCREENS.CONVERSATION_SUMMARY:
          params = { screen: CONVERSATION_SUMMARY }
          action = NavigationActions.navigate({ routeName: PATH.OFFLINESCREEN, params })
          dispatch(action);
          break;
          case OFFLINE_SCREENS.CONNECTIONS:
          params = { screen: MY_CONNECTIONS }
          action = NavigationActions.navigate({ routeName: PATH.OFFLINESCREEN, params })
          dispatch(action);
          break;
          case OFFLINE_SCREENS.HELP:
           params = {screen: SUPPORT}
           action = NavigationActions.navigate({ routeName: PATH.OFFLINESCREEN, params })
           dispatch(action);
           break;
          case OFFLINE_SCREENS.PAYMENTS:
          params = { screen: PAYMENTS_TITLE }
          action = NavigationActions.navigate({ routeName: PATH.OFFLINESCREEN, params })
          dispatch(action);
          break;

          case OFFLINE_SCREENS.SETTINGS:
          params = { screen: NOTIFICATION_SETTINGS }
          action = NavigationActions.navigate({ routeName: PATH.OFFLINESCREEN, params })
          dispatch(action);
          break;
        default:
          dispatch(action);
      }
    } else {
      dispatch(action);
    }
  };
}

export function replace(screen) {
  return (dispatch, getState) => {
    let network = getState().networkReducer && getState().networkReducer.network;
    let params = {}
    let action = StackActions.replace({ routeName: screen })

    if (network === false) {
      switch (screen) {
        case OFFLINE_SCREENS.REQUEST_SCREEN:
          params = { screen: SERVICE_REQUESTS }
          action = StackActions.replace({ routeName: PATH.OFFLINESCREEN, params })
          dispatch(action);
          break;
        case OFFLINE_SCREENS.CONVERSATION_SUMMARY:
          params = { screen: CONVERSATION_SUMMARY }
          action = StackActions.replace({ routeName: PATH.OFFLINESCREEN, params })
          dispatch(action);
          break;

          case OFFLINE_SCREENS.SERVICEPROVIDER_SCREEN:
          params = { screen: SERVICE_PROVIDERS }
          action = StackActions.replace({ routeName: PATH.OFFLINESCREEN, params })
          dispatch(action);
          break;
        default:
          dispatch(action);
      }
    } else {
      dispatch(action)
    }
  }
}

export function onBack() {
  return (dispatch, getState) => {
    NavigationActions ? dispatch(NavigationActions.back()) : null
  };
}

export function resetStack(screen) {
  return (dispatch, getState) => {
     resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: screen })]
    })

    dispatch(resetAction)
  }
}












