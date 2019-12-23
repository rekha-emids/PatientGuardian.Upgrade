import { PointService } from './actions'
import {API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
  PointServiceList: [],
  PointServiceFieldDetails: [],
  addPointServiceSuccess: false,
  addingPointService: API_INITIAL,
  isLoading: API_INITIAL
},

 PointServiceState = (state = defaultState, action) => {
  switch (action.type) {
    case PointService.getPointServiceSuccess:
      return {
        ...state,
        PointServiceList: action.data
      }
    case PointService.changeAddingPointService:
      return {
        ...state,
        addingPointService: action.data
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

    case PointService.clearPointServiceState:
    return defaultState;
    
    default:
      return state
  }
}

export default PointServiceState
