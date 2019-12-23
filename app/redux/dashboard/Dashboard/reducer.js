import { DashboardDetail } from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';
import { ALL } from '../../../constants/constants';

export const STATUS = {
  getPatientVisitsStatus: "getPatientVisitsStatus",
  getPatientServiceRequestsStatus: "getPatientServiceRequestsStatus",
  getServiceProvidersStatus: "getServiceProvidersStatus"
}

const defaultState = {
  conversationDetail: [],
  unreadCounts: [],
  serviceProvider: [],
  patientServiceRequest: [],
  patientVisit: [],
  serviceStatusLookUp: [],
  tabNavigation: null,
  currentVisitList: [],
  morningVisits: [],
  eveningVisits: [],
  afternoonVisits: [],
  serviceVisitCount: [],
  [STATUS.getPatientVisitsStatus]: API_INITIAL,
  [STATUS.getPatientServiceRequestsStatus]: API_INITIAL,
  [STATUS.getServiceProvidersStatus]: API_INITIAL,
  lookupDetails: {},
  dashboardRequestObject: {},
  selectedStatusId: ALL,
  videoConferenceNotifications: null,
  menuVideoConferenceNotifications: null,
  visitCompleted: false,
  stages: null
}

 DashboardState = (state = defaultState, action) => {
  switch (action.type) {
    case DashboardDetail.GET_CONVERSATION_DETAIL_SUCCESS:
      return {
        ...state,
        conversationDetail: action.data
      }
    case DashboardDetail.SET_UNREAD_CONVERSATION_COUNT_DETAILS:
      return {
        ...state,
        unreadCounts: action.data
      }
    case DashboardDetail.GET_SERVICE_PROVIDER_DETAIL_SUCCESS:
      return {
        ...state,
        serviceProvider: action.data
      }
      case DashboardDetail.GET_PATIENT_SERVICE_REQUEST_DETAIL_SUCCESS:
      return {
        ...state,
        patientServiceRequest: action.data.data,
        selectedStatusId: action.data.statusId,
        dashboardRequestObject: {
          ...state.dashboardRequestObject,
          statusId: action.data.statusId
        }
      }
      case DashboardDetail.GET_PATIENT_VISIT_DETAIL_SUCCESS:
      return {
        ...state,
        patientVisit: action.data
      }
      case DashboardDetail.GET_SERVICE_REQUEST_SUCCESS:
      return {
        ...state,
        serviceStatusLookUp: action.data
      }
      case DashboardDetail.CURRENT_VISIT_LIST:
      return {
        ...state,
        ...action.data,
        dashboardRequestObject: {
          ...state.dashboardRequestObject,
          ...action.data.dashboardRequestObject
        },
        selectedStatusId: action.data.dashboardRequestObject.statusId || state.selectedStatusId,
        patientVisit: action.data.patientVisitList
      }

      case DashboardDetail.MORNING_VISIT_LIST:
      return {
        ...state,
        morningVisits: action.data
      }

      case DashboardDetail.EVENING_VISIT_LIST:
      return {
        ...state,
        eveningVisits: action.data
      }

      case DashboardDetail.AFTERNOON_VISIT_LIST:
      return {
        ...state,
        afternoonVisits: action.data
      }

      case DashboardDetail.UPDATE_TAB_NAVIGATOR:
      return {
        ...state,
        tabNavigation: action.data
      }
      case DashboardDetail.changeAPIStatus:
        return {
          ...state,
          [action.data.key]: action.data.status
        }
      case DashboardDetail.get_service_visit_count:
        return {
          ...state,
          serviceVisitCount: action.data
        }
      case DashboardDetail.getLookupSuccess:
        return {
            ...state,
            lookupDetails: action.data
        }
      case DashboardDetail.getVideoConferenceNotificationsSuccess:
        return {
          ...state,
          videoConferenceNotifications: action.data
        }
      case DashboardDetail.resetVideoConferenceNotifications:
        return {
          ...state,
          videoConferenceNotifications: null,
          menuVideoConferenceNotifications: null
        }
      case DashboardDetail.getMenuVideoConferencesSuccess:
        return {
          ...state,
          menuVideoConferenceNotifications: action.data
        }
      case DashboardDetail.clearPatientVisit: 
        return {
            ...state,
            patientVisit: []
        }
      case DashboardDetail.updateVisitCompletion:
        return {
          ...state,
          visitCompleted: action.data
        }
      case DashboardDetail.getPatientStagesSuccess:
        return {
          ...state,
          stages: action.data
        }
    default:
      return state
  }
}

export default DashboardState
