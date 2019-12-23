import {
    vistServiceHistoryDetails
} from './actions'
import { API_INITIAL, API_SUCCESS } from '../../../constants/AppAPIConstants';

const defaultState = {
    VisitServiceDetails: [],
    VisitServiceHistory: [],
    selectedFilterState: {
        selectedFilterKey: null,
        selectedServiceCategories: {},
        seletedDateRange: {
            fromDate: null,
            toDate: null
        },
        selectedServiceProviderIds: {}
    },
    serviceCategories: null,
    submittedResponse: null,
    serviceProviders: null,
    attributeProviders: null,
    getVisitServicesListStatus: API_INITIAL,
    questionsList: null
},

 vistServiceHistoryState = (state = defaultState, action) => {
    switch (action.type) {

        case vistServiceHistoryDetails.getVisitServiceHistoryDetailsSuccess:
            return {
                ...state,
                VisitServiceHistory: action.data,
                getVisitServicesListStatus: API_SUCCESS 
            };
        case vistServiceHistoryDetails.updateVisitHistoryFilter:
            return {
                ...state,
                selectedFilterState: action.data
            }
        case vistServiceHistoryDetails.getServiceCategoriesSuccess:
            return {
                ...state,
                serviceCategories: action.data
            }
        case vistServiceHistoryDetails.getSubmittedResponse:
            return {
                ...state,
                submittedResponse: action.data
            }
        case vistServiceHistoryDetails.getAllServiceProviders:
            return {
                ...state,
                serviceProviders: action.data
            }
        case vistServiceHistoryDetails.getAttributeProvidersSuccess:
            return {
                ...state,
                attributeProviders: action.data
            }
        case vistServiceHistoryDetails.changeAPIStatus:
            return {
                ...state,
                getVisitServicesListStatus: action.data
            }
        case vistServiceHistoryDetails.resetState:
            return {
                ...state,
                submittedResponse: null
            }
        case vistServiceHistoryDetails.getQuestionsListSuccess:
            return {
                ...state,
                questionsList: action.data
            };
        case vistServiceHistoryDetails.clearAssessmentState:
            return {
                ...state,
                questionsList: null
            }
        default:
            return state;
    }
}

export default vistServiceHistoryState;
