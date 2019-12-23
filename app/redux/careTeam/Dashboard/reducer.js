import {
    CareTeam
} from './actions'
import { getFormatedDate } from '../../../utils/momentUtil';
import { API_INITIAL } from '../../../constants/AppAPIConstants';
import {addMonthsInFormat} from '../../../utils/momentUtil'
import { removeDuplicateElementsFromArray } from '../../../utils/appUtils';

export const defaultState = {
    fromDate: addMonthsInFormat(new Date(), -3, "MM/DD/YYYY"),
    toDate: getFormatedDate(new Date(), "MM/DD/YYYY"),
    individualCount: [],
    serviceProviderCount: [],
    serviceRequestCount: [],
    serviceVisitCount: [],
    selectedCount: null,
    dashboardDetail: [],
    serviceRequestDashboardDetail: [],
    serviceVisitDashboardDetail: [],
    serviceProviderDashboardDetail: [],
    itemDetail: [],
    selectedServiceProviderCount: null,
    cohorts: null,
    contracts: null,
    clinicalConditions: null,
    serviceRequestDetails: null,
    AuthorizationNumber: '',
    diagnosisCode: null,
    patientImageData: null,
    providerImageData: null,
    isLoading: API_INITIAL,
    gender: [],
    individualCountRequestObject: null,
    serviceProviderCountRequestObject: null,
    serviceVisitsCountRequestObject: null,
    serviceRequestCountRequestObject: null,
    selectedIcdCodes: [],
    feedbackAlerts: [],
    riskGroup:[]
};

 dashboardState = (state = defaultState, action) => {
    switch (action.type) {
        case CareTeam && CareTeam.updateDiagnosisCodeSuccess:
            const {diagnosisCode, selected} = action.data
            let existingDiagnosisCode = [...state.diagnosisCode]
            let existingSelectedIcdCodes = [...state.selectedIcdCodes]
            let updatedDiagnosisCode = existingDiagnosisCode.map((item, index) => {
            if (diagnosisCode === item.diagnosisCodes) {
            if (selected){
                existingSelectedIcdCodes.push(diagnosisCode.toString())
            } else {
                let index = existingSelectedIcdCodes.indexOf(diagnosisCode)

                if (index > -1){
                    existingSelectedIcdCodes.splice(index, 1)
                }
            }
            return {
                    ...item,
                   selected
                }
            } else {
                return item
            }
        });

        return {
            ...state,
            diagnosisCode: updatedDiagnosisCode,
            selectedIcdCodes: removeDuplicateElementsFromArray(existingSelectedIcdCodes)
        }
        case CareTeam && CareTeam.getDiagnosisCodeSuccess:
      return {
        ...state,
        diagnosisCode: action.data,
        selectedIcdCodes: removeDuplicateElementsFromArray(action.selectedIcdCodes)
      }

      case CareTeam && CareTeam.postAuthNoSuccess:
      const {serviceRequestId, authNo} = action.data
      let updatedServiceRequestDetails = state.serviceRequestDashboardDetail.map((request) => {
          if (request.serviceRequestId === serviceRequestId){
              return {
                  ...request,
                  authorizationNumber: authNo
              }
          }
          return request
      })

      return {
          ...state,
          serviceRequestDashboardDetail: updatedServiceRequestDetails,
          itemDetail: {
              ...state.itemDetail,
              authorizationNumber: action.data.authNo
          }
      }

        case CareTeam && CareTeam.setFromDate:
            return {
                ...state,
                fromDate: action.data
            }
        case CareTeam && CareTeam.setToDate:
            return {
                ...state,
                toDate: action.data
            }
        case CareTeam && CareTeam.getIndividualCount:
            return {
                ...state,
                individualCount: action.data,
                individualCountRequestObject: action.requestObject
            }
        case CareTeam && CareTeam.setSelectedCount:
            return {
                ...state,
                selectedCount: action.data
            }
        case  CareTeam && CareTeam.setSelectedDashboardDetail:
            return {
                ...state,
                setSelectedDashboardDetail: action.data
            }
        case CareTeam && CareTeam.getDashboardDetail:
            return {
                ...state,
                dashboardDetail: action.data
            }
        case CareTeam && CareTeam.setItemDetail:
            return {
                ...state,
                itemDetail: action.data
            }
        case CareTeam && CareTeam.getServiceProviderCount:
            return {
                ...state,
                serviceProviderCount: action.data,
                serviceProviderCountRequestObject: action.requestObject
            }
        case CareTeam && CareTeam.setSelectedServiceProviderCount:
            return {
                ...state,
                selectedServiceProviderCount: action.data
            }
        case CareTeam && CareTeam.getServiceRequestCount:
            return {
                ...state,
                serviceRequestCount: action.data,
                serviceRequestCountRequestObject: action.requestObject
            }
        case CareTeam && CareTeam.getServiceVisitCount:
            return {
                ...state,
                serviceVisitCount: action.data,
                serviceVisitsCountRequestObject: action.requestObject
            }
        case CareTeam && CareTeam.getServiceRequestDashboardDetail:
            return {
                ...state,
                serviceRequestDashboardDetail: action.data
            }
        case CareTeam && CareTeam.getServiceVisitDashboardDetail:
            return {
                ...state,
                serviceVisitDashboardDetail: action.data
            }
        case CareTeam && CareTeam.getServiceProviderDashboardDetail: 
            return {
                ...state,
                serviceProviderDashboardDetail: action.data
            }
        case CareTeam && CareTeam.getCohortsSuccess:
            return {
                ...state,
                cohorts: action.data
            }
        case CareTeam && CareTeam.getContractSuccess:
            return {
                ...state,
                contracts: action.data
            }
        case CareTeam && CareTeam.getCareTeamClinicalConditionsSuccess:
            return {
                ...state,
                clinicalConditions: action.data
            }
        case CareTeam && CareTeam.getServiceRequestDetailsSuccess:
            return {
                ...state,
                serviceRequestDetails: action.data
            }
        case CareTeam && CareTeam.getPatientImageSuccess:
            return {
                ...state,
                patientImageData: action.data
            }
        case CareTeam && CareTeam.getSPImageSuccess:
            return {
                ...state,
                providerImageData: action.data
            }
        case CareTeam && CareTeam.loadingStatus:
            return {
                ...state,
                isLoading: action.data
            }

        case CareTeam && CareTeam.clearDashboardDetailState: 
            return {
                ...state,
                dashboardDetail: [],
                serviceRequestDashboardDetail: [],
                serviceVisitDashboardDetail: [],
                serviceProviderDashboardDetail: [] 
}
        
        case CareTeam && CareTeam.updateGender:{
            return {
                ...state,
                gender: action.data
            }
        }
        case CareTeam && CareTeam.clearImageData:{
            return {
                ...state,
                providerImageData: null,
                patientImageData: null
            }
        }
        case CareTeam && CareTeam.resetSelectedIcdCodes: {
            return {
                ...state,
                selectedIcdCodes: []
            }
        }
        case CareTeam && CareTeam.getFeedbackAlertSuccess: {
                return {
                    ...state,
                    feedbackAlerts: action.data
                }
        }

        case CareTeam && CareTeam.getRiskGroupSuccess:{
            return {
                ...state,
                riskGroup:action.data
            }
        }
        default:
            return state;
    }
}

export default dashboardState;