import {
    Requests
} from './actions'
import {DEFAULT_SELECTED_FILTER_STATE} from '../../../constants/constants'
import { API_INITIAL, API_SUCCESS } from '../../../constants/AppAPIConstants';
import { normalizeData } from '../../../utils/appUtils';
const defaultState = {
  serviceRequests: null,
  serviceProviders: null,
  selectedServiceRequestId: null,
  skills: null,
  gender: null,
  timeSlots: null,
  pointOfServices: null,
  states: null,
  selectedFilterState: DEFAULT_SELECTED_FILTER_STATE,
  VisitServiceElibilityStatus: null,
  eligibilityAPIStatus: API_INITIAL,
  isLoading: API_INITIAL,
  normalizedPointOfServices: {}
},

 requestsState = (state = defaultState, action) => {
    switch (action.type) {
        case Requests && Requests.getPatientRequestsBypatientId:
            return {
                ...state,
                serviceRequests: action.data
            };
        case Requests && Requests.getServiceRequestsBySRId:
        let updatedServiceProviders = state.serviceProviders ? {...state.serviceProviders} : {}
        const {requestId, list} = action.data

            return {
                ...state,
                serviceProviders: {
                    ...updatedServiceProviders,
                    [requestId]: list
                },
                selectedServiceRequestId: requestId || state.selectedServiceRequestId
            }
        case Requests && Requests.changeSelectedServiceRequestId:
            return {
                ...state,
                selectedServiceRequestId: action.data
            }
        case Requests && Requests.getSkills:
            return {
                ...state,
                skills: action.data
            }
        case Requests && Requests.getGender:
            return {
                ...state,
                gender: action.data
            }
        case Requests && Requests.getTimeSlots:
            return {
                ...state,
                timeSlots: action.data
            }
        case Requests && Requests.getPointOfServices:
            return {
                ...state,
                pointOfServices: action.data,
                normalizedPointOfServices: normalizeData(action.data, "addressId")
            }
        case Requests && Requests.updatePointOfServices:
            let updatedPointOfServices = state.pointOfServices || []
            let updatedNormalizedPointOfServices = {...state.normalizedPointOfServices}

            updatedNormalizedPointOfServices = {
                ...updatedNormalizedPointOfServices,
                [action.addressId]: action.address
            }
            updatedPointOfServices ? updatedPointOfServices.push(action.address) : null
            return {
                ...state,
                pointOfServices: updatedPointOfServices,
                normalizedPointOfServices: updatedNormalizedPointOfServices
            }
        case Requests && Requests.getStates:
            return {
                ...state,
                states: action.data
            }
        case Requests && Requests.updateFilterState:
            return {
                ...state,
                selectedFilterState: action.data
            }
        case Requests && Requests.getVisitServiceEligibilityStatusSuccess:
            return {
                ...state,
                VisitServiceElibilityStatus: action.data,
                eligibilityAPIStatus: API_SUCCESS
            };
        case Requests && Requests.changeAPIStatus:
            return {
                ...state,
                eligibilityAPIStatus: action.data
            }
        case Requests && Requests.loadingStatus:
            return {
                ...state,
                isLoading: action.data
            }
        default:
            return state;
    }
}

export default requestsState;
