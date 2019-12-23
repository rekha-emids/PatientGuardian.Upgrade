import { PointService } from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
  PointServiceList: [],
  PointServiceFieldDetails: [],
  addPointServiceSuccess: false,
  addPointServiceFailure: false,
  impersonatedPOSDetails: {},
  isLoading: API_INITIAL
},

 PointServiceState = (state = defaultState, action) => {
  switch (action.type) {
    case PointService.getPointServiceSuccess:
      let details = {PointServiceList: action.data.data}
      let updatedPosDetails = details

      if (Number(action.data.id) !== Number(global.currentUserPatientId)){
          updatedPosDetails = {
          impersonatedPOSDetails: {
              ...state.impersonatedPOSDetails,
              [action.data.id]: {
              ...state.impersonatedPOSDetails[action.data.id],
              ...details
              }
              }
          }
      }

      return {
        ...state,
        ...updatedPosDetails
      }

    case PointService.getPointServiceFieldDetails:
      return {
        ...state,
        PointServiceFieldDetails: action.data
      }

    case PointService.addPointServiceSuccess:
      return {
        ...state,
        addPointServiceSuccess: action.isSuccess,
        PointServiceFieldDetails: {
          addressType: '',
          street: '',
          state_id: '',
          city: '',
          zip: ''
        }
      }
    case PointService.loadingStatus:
      return {
        ...state,
        isLoading: action.data
      }

    case PointService.addPointServiceFailure:
      return {
        ...state,
        addPointServiceFailure: action.isFailure
      }

    default:
      return state
  }
}

export default PointServiceState
