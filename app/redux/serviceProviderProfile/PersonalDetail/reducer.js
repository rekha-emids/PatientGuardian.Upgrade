import { PersonalDetails } from './actions'
import {USER_SERVICE_PROVIDER_TYPE_ID, UserProfileType} from '../../../constants/constants'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

export const STATUS = {
  getImageStatus: "getImageStatus",
  getPersonalDetailStatus: "getPersonalDetailStatus"
}

const defaultState = {
  personalDetail: null,
  imageData: {},
  [STATUS.getImageStatus]: API_INITIAL,
  [STATUS.getPersonalDetailStatus]: API_INITIAL
},

 PersonalDetailState = (state = defaultState, action) => {
  switch (action.type) {
    case PersonalDetails.GET_PERSONAL_DETAIL_SUCCESS:
      return {
        ...state,
        personalDetail: {
          ...action.data,
          profileType: action.data.serviceProviderTypeId === USER_SERVICE_PROVIDER_TYPE_ID
            ? UserProfileType.Individual : UserProfileType.Organization
        }
      }

    case PersonalDetails.UPLOAD_IMG_SUCCESS:
      return {
        ...state,
        imageData: action.data
      }
    case PersonalDetails.changeAPIStatus:
      return {
        ...state,
        [action.data.key]: action.data.status
      }
    case PersonalDetails.clearPersonalDetailsState:
      return defaultState;
    default:
      return state
  }
}

export default PersonalDetailState
