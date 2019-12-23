import {  NavigationActions } from "react-navigation";

import { AppStackRoot } from '../../routes';

const initialState = {...AppStackRoot.router.getStateForAction(NavigationActions.init()), immediate: true}

export default (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case 'Navigation/NAVIGATE':
      const { type, routeName } = action
      const lastRoute = state.routes[state.routes.length - 1]

      if (type == lastRoute.type && routeName == lastRoute.routeName) {
        return state
      } else {
        nextState = AppStackRoot.router.getStateForAction(action, state)
        return nextState || state;
      }
    case 'Navigation/BACK':
      nextState = AppStackRoot.router.getStateForAction(NavigationActions.back(), state)
      return nextState || state;
    case 'Navigation/RESET':
      nextState = AppStackRoot.router.getStateForAction(action, state);
      return nextState || state;
    case 'Navigation/REPLACE':
    nextState = AppStackRoot.router.getStateForAction(action, state);
      return nextState || state;
    default:
      return state;
  }
};








