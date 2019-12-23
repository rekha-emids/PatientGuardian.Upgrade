import {
    Browse
} from './actions'
import { API_INITIAL, API_SUCCESS } from '../../../constants/AppAPIConstants';
import { SERVICE_CATEGORY_IDS } from '../../../constants/constants';

const defaultState = {
   serviceCategories: [],
   serviceProviders: {},
   getServiceCategoriesStatus: API_INITIAL,
   getServiceProviderStatus: API_INITIAL,
   getEngageServiceRequests: API_INITIAL,
   selectedServiceCategoryId: SERVICE_CATEGORY_IDS.ACTIVITY_OF_DAILY_LIVING,
   serviceRequests: null
},

 browseState = (state = defaultState, action) => {
    switch (action.type) {
        case Browse.getServiceCategorySuccess:
            return {
                ...state,
                serviceCategories: action.data,
                getServiceCategoriesStatus: API_SUCCESS
            }
        case Browse.getServiceProvidersSuccess:
            return {
                ...state,
                serviceProviders: {
                    ...state.serviceProviders,
                    [action.data.id]: action.data.data
                },
                getServiceProviderStatus: API_SUCCESS
            }
        case Browse.changeAPIStatus:
            return {
                ...state,
                [action.data.key]: action.data.status
            }
        case Browse.changeSelectedServiceCategoryId:
            return {
                ...state,
                selectedServiceCategoryId: action.data
            }
        case Browse.getEngageSPServiceRequestsSuccess:
            return {
                ...state,
                serviceRequests: action.data
            }
        default:
            return state;
    }
}

export default browseState;
