import { combineReducers } from 'redux';
import requestsState from './requestsTab/reducer';
import browseState from './browseTab/reducer'
import favoriteState from './favouriteTab/reducer'
import recentState from './recentTab/reducer'

export const serviceProvidersTabState = combineReducers({
    requestsState,
    browseState,
    favoriteState,
    recentState
});
