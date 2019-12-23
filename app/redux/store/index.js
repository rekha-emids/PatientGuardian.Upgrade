import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {
	createReactNavigationReduxMiddleware,
	reduxifyNavigator
} from 'react-navigation-redux-helpers';

import rootReducer from './rootReducer';
import { AppStackRoot } from '../../routes';
import {APP_NAME} from '../../constants/constants';

const loggerMiddleware = createLogger(),

 middleware = createReactNavigationReduxMiddleware(
	APP_NAME,
	(state) => state.navigationState,
);

export const navigator = reduxifyNavigator(AppStackRoot, APP_NAME);

export const store = configureStore({});

export function configureStore(preloadedState) {
	return createStore(
		rootReducer,
		preloadedState,
		applyMiddleware(thunkMiddleware,
			// loggerMiddleware,
			// middleware
		)
	);
}
